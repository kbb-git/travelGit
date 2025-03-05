// server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

// Get API keys from environment variables
const CHECKOUT_SECRET_KEY = process.env.CHECKOUT_SECRET_KEY;
// Default Processing Channel ID
const PROCESSING_CHANNEL_ID = process.env.PROCESSING_CHANNEL_ID;

// Add this new endpoint to get the latest session ID
let latestSessionId = null;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/create-payment-session", async (req, res) => {
  try {
    const {
      amount,
      currency,
      items,
      customer,
      billing,
      shipping,
      payment_method_configuration,
      enabled_payment_methods,
      disabled_payment_methods,
      locale
    } = req.body;

    // Log the localization details
    console.log("Payment Session Localization Details:");
    console.log(`Currency: ${currency}`);
    console.log(`Locale: ${locale}`);
    console.log(`Enabled Payment Methods: ${JSON.stringify(enabled_payment_methods)}`);
    console.log(`Billing Country: ${billing?.address?.country}`);
    
    // Determine locale based on billing country if not provided
    let finalLocale = locale;
    if (!finalLocale && billing?.address?.country) {
      // Simple mapping function to get locale from country code
      const getLocaleFromCountry = (country) => {
        switch (country) {
          case "NL": return "nl";
          case "SA": return "ar";
          case "FR": return "fr";
          case "PL": return "pl";
          case "PT": return "pt";
          case "BE": return "nl";
          case "AT": return "de-AT";
          default: return "en-GB";
        }
      };
      
      finalLocale = getLocaleFromCountry(billing.address.country);
      console.log(`No locale provided, derived from country: ${finalLocale}`);
    }

    // IMPORTANT: Ensure amount is a valid number - this fixes the amount_invalid error
    if (!amount || amount <= 0) {
      console.warn("Invalid amount provided:", amount);
      return res.status(400).json({
        error: "Invalid amount. Amount must be a positive number.",
        details: "The 'amount' parameter is required and must be greater than zero."
      });
    }

    let fallbackBilling;
    if (currency === "SAR") {
      fallbackBilling = {
        address: {
          address_line1: "King Fahd Road",
          city: "Riyadh",
          state: "Riyadh",
          zip: "11564",
          country: "SA"
        }
      };
    } else if (currency === "CNY") {
      fallbackBilling = {
        address: {
          address_line1: "No.1 Zhongshan Road",
          city: "Shanghai",
          state: "",
          zip: "200000",
          country: "CN"
        }
      };
    } else if (currency === "HKD") {
      fallbackBilling = {
        address: {
          address_line1: "1 Queen's Road Central",
          city: "Hong Kong",
          state: "",
          zip: "",
          country: "HK"
        }
      };
    } else if (currency === "EUR") {
      if (locale) {
        const loc = locale.toLowerCase();
        if (loc.startsWith("fr")) {
          fallbackBilling = {
            address: {
              address_line1: "10 Rue de Rivoli",
              city: "Paris",
              state: "",
              zip: "75001",
              country: "FR"
            }
          };
        } else if (loc.startsWith("pl")) {
          fallbackBilling = {
            address: {
              address_line1: "ul. Marszałkowska 1",
              city: "Warsaw",
              state: "",
              zip: "00-001",
              country: "PL"
            }
          };
        } else if (loc.startsWith("pt")) {
          fallbackBilling = {
            address: {
              address_line1: "Av. da Liberdade 100",
              city: "Lisbon",
              state: "",
              zip: "1250-096",
              country: "PT"
            }
          };
        } else if (loc.startsWith("be")) {
          fallbackBilling = {
            address: {
              address_line1: "Rue Neuve 1",
              city: "Brussels",
              state: "",
              zip: "1000",
              country: "BE"
            }
          };
        } else if (loc.startsWith("cn")) {
          fallbackBilling = {
            address: {
              address_line1: "No.1 Zhongshan Road",
              city: "Shanghai",
              state: "",
              zip: "200000",
              country: "CN"
            }
          };
        } else if (loc.startsWith("zh-hk")) {
          fallbackBilling = {
            address: {
              address_line1: "1 Queen's Road Central",
              city: "Hong Kong",
              state: "",
              zip: "",
              country: "HK"
            }
          };
        } else if (loc.startsWith("de-at")) {
          fallbackBilling = {
            address: {
              address_line1: "Stephansplatz 1",
              city: "Vienna",
              state: "",
              zip: "1010",
              country: "AT"
            }
          };
        } else {
          fallbackBilling = {
            address: {
              address_line1: "Kerkstraat 1",
              city: "Amsterdam",
              state: "",
              zip: "1012JS",
              country: "NL"
            }
          };
        }
      } else {
        fallbackBilling = {
          address: {
            address_line1: "Kerkstraat 1",
            city: "Amsterdam",
            state: "",
            zip: "1012JS",
            country: "NL"
          }
        };
      }
    } else {
      fallbackBilling = {
        address: {
          address_line1: "123 Test Street",
          city: "London",
          state: "LDN",
          zip: "W1T 4TJ",
          country: "GB"
        }
      };
    }

    let processingChannelId = PROCESSING_CHANNEL_ID;
    if (
      (billing && billing.address && (billing.address.country === "FR" || billing.address.country === "PT" || billing.address.country === "SA")) ||
      (!billing && fallbackBilling && fallbackBilling.address && (fallbackBilling.address.country === "FR" || fallbackBilling.address.country === "PT" || fallbackBilling.address.country === "SA"))
    ) {
      processingChannelId = "pc_cvw6lv3jnsduhpqewkoum2eugi";
    }

    console.log("Creating payment session with:", {
      amount,
      currency,
      processingChannelId,
      enabled_payment_methods
    });

    // Fix items array to ensure it meets the API requirements
    const formattedItems = items ? items.map(item => ({
      name: item.name || "Product",
      quantity: item.quantity || 1, // Ensure quantity is set
      unit_price: item.unit_price || 0,
      reference: item.reference || `ITEM-${Date.now()}`,
      total_amount: item.total_amount || item.unit_price * (item.quantity || 1),
      // Add required fields for specific payment methods
      wxpay_goods_id: item.wxpay_goods_id || "GOOD_" + Math.floor(Math.random() * 10000),
      category: item.category || "general",
      type: item.type || "physical" // Add product type
    })) : [];

    // Ensure we have at least one item
    if (formattedItems.length === 0) {
      formattedItems.push({
        name: "Default Item",
        quantity: 1,
        unit_price: amount,
        total_amount: amount,
        reference: `DEFAULT-${Date.now()}`,
        wxpay_goods_id: "GOOD_DEFAULT",
        category: "general", 
        type: "physical"
      });
    }

    const sessionRequest = {
      amount,
      currency,
      payment_type: "Regular",
      display_name: "TravelEase",
      reference: "ORD-" + Date.now(),
      description: "Your order from TravelEase",
      billing: billing || fallbackBilling,
      shipping: shipping || fallbackBilling,
      customer: {
        email: customer && customer.email ? customer.email : "john.doe@example.com",
        name: customer && customer.name ? customer.name : "John Doe"
      },
      success_url: "http://localhost:3001/success.html",
      failure_url: "http://localhost:3001/failure.html",
      capture: true,
      locale: finalLocale || "en-GB",
      processing_channel_id: processingChannelId,
      "3ds": {
        enabled: true,
        attempt_n3d: false
      },
      items: formattedItems,
      enabled_payment_methods: enabled_payment_methods || ["card"],
      disabled_payment_methods: disabled_payment_methods || [],
      payment_method_configuration: payment_method_configuration || {}
    };

    console.log("Sending request to Checkout.com");
    
    const response = await axios.post(
      "https://api.sandbox.checkout.com/payment-sessions",
      sessionRequest,
      {
        headers: {
          Authorization: `Bearer ${CHECKOUT_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Store the latest session ID
    latestSessionId = response.data.id;
    
    console.log("Received response from Checkout.com:", response.data);
    console.log("Payment session ID:", response.data.id);
    res.json(response.data);

  } catch (error) {
    console.error("Payment session error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    res.status(500).json({
      error: "Failed to create payment session",
      details: error.response?.data || error.message
    });
  }
});

app.get("/success", (req, res) => {
  console.log("Success route hit with query params:", req.query);
  res.sendFile(path.join(__dirname, "public", "success.html"));
});

app.get("/success.html", (req, res) => {
  console.log("Success.html route hit with query params:", req.query);
  res.sendFile(path.join(__dirname, "public", "success.html"));
});

app.get("/failure", (req, res) => {
  console.log("Failure route hit with query params:", req.query);
  res.sendFile(path.join(__dirname, "public", "failure.html"));
});

app.get("/failure.html", (req, res) => {
  console.log("Failure.html route hit with query params:", req.query);
  res.sendFile(path.join(__dirname, "public", "failure.html"));
});

app.post("/success", (req, res) => {
  console.log("POST Success route hit with body:", req.body);
  res.sendFile(path.join(__dirname, "public", "success.html"));
});

app.post("/failure", (req, res) => {
  console.log("POST Failure route hit with body:", req.body);
  res.sendFile(path.join(__dirname, "public", "failure.html"));
});

app.get("/api/payment-session/:sessionId", async (req, res) => {
  try {
    console.log(`Fetching session details for session ID: ${req.params.sessionId}`);
    
    const response = await axios.get(
      `https://api.sandbox.checkout.com/payment-sessions/${req.params.sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${CHECKOUT_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Log the session details response
    console.log("Session details response from Checkout.com:");
    console.log(JSON.stringify(response.data, null, 2));
    console.log("\n");

    res.json(response.data);
  } catch (error) {
    console.error("Session fetch error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch session details" });
  }
});

app.get("/api/payment/:paymentId", async (req, res) => {
  try {
    console.log(`Fetching payment details for payment ID: ${req.params.paymentId}`);
    
    const response = await axios.get(
      `https://api.sandbox.checkout.com/payments/${req.params.paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${CHECKOUT_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("\nPayment Details Response from Checkout.com:");
    console.log(JSON.stringify(response.data, null, 2));
    console.log("\n");

    res.json(response.data);
  } catch (error) {
    console.error("Payment fetch error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch payment details" });
  }
});

// Add new endpoint to get the latest session ID
app.get("/api/latest-session", (req, res) => {
  if (latestSessionId) {
    res.json({ id: latestSessionId });
  } else {
    res.status(404).json({ error: "No session ID found" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});