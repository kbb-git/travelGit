// App.js
const { useState, useEffect, useRef } = React;

/** SHIPPING ADDRESSES MAPPING */
const shippingAddresses = {
  NL: { address_line1: "Kerkstraat 1", city: "Amsterdam", state: "", zip: "1012JS", country: "NL" },
  SA: { address_line1: "King Fahd Road", city: "Riyadh", state: "Riyadh", zip: "11564", country: "SA" },
  FR: { address_line1: "10 Rue de Rivoli", city: "Paris", state: "", zip: "75001", country: "FR" },
  PL: { address_line1: "ul. Marszałkowska 1", city: "Warsaw", state: "", zip: "00-001", country: "PL" },
  PT: { address_line1: "Av. da Liberdade 100", city: "Lisbon", state: "", zip: "1250-096", country: "PT" },
  BE: { address_line1: "Rue Neuve 1", city: "Brussels", state: "", zip: "1000", country: "BE" },
  // CN: { address_line1: "No.1 Zhongshan Road", city: "Shanghai", state: "", zip: "200000", country: "CN" },
  // HK: { address_line1: "1 Queen's Road Central", city: "Hong Kong", state: "", zip: "", country: "HK" },
  "United Kingdom": { address_line1: "221B Baker Street", city: "London", zip: "NW1 6XE", country: "GB" },
  AT: { address_line1: "Stephansplatz 1", city: "Vienna", state: "", zip: "1010", country: "AT" }
};

/** THEME CONFIGS */
const themeConfigs = {
  default: {
    name: "Default",
    colorBackground: "#ffffff",
    colorAction: "#007BFF",
    colorText: "#333333",
    colorFormBackground: "#ffffff",
    colorFormBorder: "#e0e0e0",
    colorBorder: "#e0e0e0",
    colorDisabled: "#c0c0c0",
    colorError: "#ff3b30",
    colorSuccess: "#34c759",
    colorInverse: "#ffffff",
    colorOutline: "#dcdcdc",
    colorSecondary: "#8e8e93",
    borderRadius: ["0.75rem", "0.75rem"],
    button: { fontFamily: "'Roboto', sans-serif", fontSize: "16px", fontWeight: 500, transition: "background 0.3s ease" },
    input: { fontFamily: "'Roboto', sans-serif", fontSize: "16px", fontWeight: 400 },
    label: { fontFamily: "'Roboto', sans-serif", fontSize: "14px", fontWeight: 500 }
  },
  midnight: {
    name: "Midnight",
    colorBackground: "#0A0A0C",
    colorFormBackground: "#1F1F1F",
    colorFormBorder: "#1F1F1F",
    colorBorder: "#68686C",
    colorText: "#F9F9FB",
    colorSecondary: "#828388",
    colorAction: "#5E48FC",
    colorOutline: "#ADA4EC",
    colorSuccess: "#2ECC71",
    colorError: "#FF3300",
    colorDisabled: "#64646E",
    colorInverse: "#F9F9FB",
    borderRadius: ["8px", "8px"],
    button: {
      fontFamily:
        "'Roboto Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 700
    },
    input: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "20px",
      fontWeight: 400
    },
    label: {
      fontFamily:
        "'Roboto Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: 400
    }
  },
  simplicity: {
    name: "Simplicity",
    colorBackground: "#ffffff",
    colorBorder: "#CED0D1",
    colorText: "#09182B",
    colorSecondary: "#828687",
    colorAction: "#000000",
    colorOutline: "#FFFFFF",
    colorSuccess: "#3CB628",
    colorError: "#8B3232",
    colorDisabled: "#AAAAAA",
    colorInverse: "#ffffff",
    colorFormBackground: "#F5F5F5",
    colorFormBorder: "#F5F5F5",
    borderRadius: ["0px", "0px"],
    button: {
      fontFamily:
        "'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 500,
      letterSpacing: 0,
      transition: "background 0.3s ease"
    },
    input: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "20px",
      fontWeight: 400,
      letterSpacing: 0
    },
    label: {
      fontFamily:
        "'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: 500,
      letterSpacing: 0
    }
  },
  grapefruit: {
    name: "Grapefruit",
    colorBackground: "#F7F7F5",
    colorBorder: "#F2F2F2",
    colorText: "#000000",
    colorSecondary: "#000000",
    colorAction: "#E05650",
    colorOutline: "#E1AAA8",
    colorSuccess: "#06DDB2",
    colorError: "#ff0000",
    colorDisabled: "#BABABA",
    colorInverse: "#F2F2F2",
    colorFormBackground: "#FFFFFF",
    colorFormBorder: "#DFDFDF",
    borderRadius: ["8px", "50px"],
    button: {
      fontFamily:
        "Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 700
    },
    input: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "20px",
      fontWeight: 400
    },
    label: {
      fontFamily:
        "Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: 400
    }
  }
};

/** Helper Functions for Localisation **/
function getCurrency(localisation) {
  switch (localisation) {
    case "NL":
    case "FR":
    case "PL":
    case "PT":
    case "BE":
    case "AT":
      return "EUR";
    case "SA":
      return "SAR";
    // case "CN":
    //   return "CNY";
    // case "HK":
    //   return "HKD";
    default:
      return "GBP";
  }
}

function getLocale(localisation) {
  switch (localisation) {
    case "NL":
      return "nl";
    case "SA":
      return "ar";
    case "FR":
      return "fr";
    case "PL":
      return "pl";
    case "PT":
      return "pt";
    case "BE":
      return "nl";
    case "AT":
      return "de-AT";
    default:
      return "en-GB";
  }
}

function getDeliveryFee(localisation) {
  // Returns fee in cents
  switch (localisation) {
    case "NL":
    case "FR":
    case "PL":
    case "PT":
    case "BE":
    case "AT":
      return 500;
    case "SA":
      return 2000;
    // case "CN":
    // case "HK":
    //   return 1000;
    default:
      return 450;
  }
}

/** Build Flow appearance */
function buildFlowAppearance(theme) {
  return {
    colorAction: theme.colorAction,
    colorBackground: theme.colorFormBackground,
    colorBorder: theme.colorBorder,
    colorDisabled: theme.colorDisabled,
    colorError: theme.colorError,
    colorFormBackground: theme.colorFormBackground,
    colorFormBorder: theme.colorFormBorder,
    colorInverse: theme.colorInverse,
    colorOutline: theme.colorOutline,
    colorPrimary: theme.colorText,
    colorSecondary: theme.colorSecondary || theme.colorText,
    colorSuccess: theme.colorSuccess || "#2ECC71",
    button: theme.button,
    input: theme.input,
    label: theme.label,
    borderRadius: theme.borderRadius
  };
}

/** PRODUCTS */
const products = [
  { 
    id: 1, 
    name: "Paris Weekend Getaway", 
    price: 299.99, 
    rating: 4.5, 
    image: "/images/paris.jpg", 
    description: "Experience the romance of Paris with this 3-day weekend package including hotel and flights.",
    location: "Paris, France",
    duration: "3 days, 2 nights",
    departureDate: "2023-12-15",
    returnDate: "2023-12-17",
    includes: ["Return flights", "Hotel accommodation", "Breakfast", "City tour"],
    type: "package"
  },
  { 
    id: 2, 
    name: "Luxury Bali Retreat", 
    price: 899.99, 
    rating: 5, 
    image: "/images/bali.jpg", 
    description: "Indulge in luxury with this all-inclusive Bali retreat featuring private villa accommodation.",
    location: "Bali, Indonesia",
    duration: "7 days, 6 nights",
    departureDate: "2023-12-20",
    returnDate: "2023-12-27",
    includes: ["Return flights", "Private villa", "All meals", "Spa treatment", "Airport transfers"],
    type: "package"
  },
  { 
    id: 3, 
    name: "New York City Break", 
    price: 599.99, 
    rating: 4, 
    image: "/images/newyork.jpg", 
    description: "Explore the Big Apple with this exciting city break including Broadway show tickets.",
    location: "New York, USA",
    duration: "5 days, 4 nights",
    departureDate: "2024-01-10",
    returnDate: "2024-01-15",
    includes: ["Return flights", "Hotel accommodation", "Broadway show tickets", "City pass"],
    type: "package"
  },
  { 
    id: 4, 
    name: "Tokyo Adventure", 
    price: 1299.99, 
    rating: 4.8, 
    image: "/images/tokyo.jpg", 
    description: "Discover the wonders of Tokyo with this comprehensive cultural experience package.",
    location: "Tokyo, Japan",
    duration: "10 days, 9 nights",
    departureDate: "2024-02-05",
    returnDate: "2024-02-15",
    includes: ["Return flights", "Hotel accommodation", "Guided tours", "Bullet train experience", "Traditional tea ceremony"],
    type: "package"
  },
  { 
    id: 5, 
    name: "Barcelona City Escape", 
    price: 349.99, 
    rating: 4.2, 
    image: "/images/barcelona.jpg", 
    description: "Enjoy the vibrant culture and stunning architecture of Barcelona with this city escape package.",
    location: "Barcelona, Spain",
    duration: "4 days, 3 nights",
    departureDate: "2024-01-20",
    returnDate: "2024-01-24",
    includes: ["Return flights", "Boutique hotel", "Tapas tour", "Sagrada Familia tickets"],
    type: "package"
  },
  { 
    id: 6, 
    name: "Caribbean Cruise", 
    price: 1499.99, 
    rating: 4.7, 
    image: "/images/caribbean_unique.jpg", 
    description: "Set sail on a luxury Caribbean cruise visiting multiple stunning islands.",
    location: "Caribbean Islands",
    duration: "7 days, 6 nights",
    departureDate: "2024-03-15",
    returnDate: "2024-03-22",
    includes: ["Luxury cabin", "All meals", "Entertainment", "Island excursions", "Port fees"],
    type: "cruise"
  },
  { 
    id: 7, 
    name: "Swiss Alps Ski Holiday", 
    price: 899.99, 
    rating: 4.6, 
    image: "/images/switzerland_unique.jpg", 
    description: "Hit the slopes with this premium ski package in the breathtaking Swiss Alps.",
    location: "Swiss Alps, Switzerland",
    duration: "6 days, 5 nights",
    departureDate: "2024-01-15",
    returnDate: "2024-01-21",
    includes: ["Return flights", "Chalet accommodation", "Ski pass", "Equipment rental", "Ski lessons"],
    type: "activity"
  },
  { 
    id: 8, 
    name: "Rome Cultural Tour", 
    price: 449.99, 
    rating: 4.4, 
    image: "/images/rome.jpg", 
    description: "Immerse yourself in the rich history and culture of Rome with this guided tour package.",
    location: "Rome, Italy",
    duration: "5 days, 4 nights",
    departureDate: "2024-02-20",
    returnDate: "2024-02-25",
    includes: ["Return flights", "Hotel accommodation", "Vatican tour", "Colosseum entry", "Roman Forum visit"],
    type: "package"
  },
  { 
    id: 9, 
    name: "Santorini Island Escape", 
    price: 799.99, 
    rating: 4.9, 
    image: "/images/santorini.jpg", 
    description: "Relax in paradise with this stunning Santorini getaway featuring iconic white-washed villages and breathtaking sunsets.",
    location: "Santorini, Greece",
    duration: "6 days, 5 nights",
    departureDate: "2024-04-10",
    returnDate: "2024-04-16",
    includes: ["Return flights", "Cliffside hotel", "Breakfast daily", "Sunset cruise", "Wine tasting"],
    type: "package"
  },
  { 
    id: 10, 
    name: "Maldives Overwater Villa", 
    price: 2499.99, 
    rating: 5, 
    image: "/images/maldives.jpg", 
    description: "Experience ultimate luxury in an overwater villa in the crystal-clear waters of the Maldives.",
    location: "Maldives",
    duration: "7 days, 6 nights",
    departureDate: "2024-03-01",
    returnDate: "2024-03-08",
    includes: ["Return flights", "Overwater villa", "All-inclusive meals", "Snorkeling equipment", "Spa treatment"],
    type: "package"
  },
  { 
    id: 11, 
    name: "Kyoto Cultural Journey", 
    price: 1099.99, 
    rating: 4.7, 
    image: "/images/kyoto.jpg", 
    description: "Discover traditional Japan with this immersive cultural experience in historic Kyoto.",
    location: "Kyoto, Japan",
    duration: "8 days, 7 nights",
    departureDate: "2024-04-05",
    returnDate: "2024-04-13",
    includes: ["Return flights", "Traditional ryokan stay", "Temple visits", "Tea ceremony", "Kimono experience"],
    type: "package"
  },
  { 
    id: 12, 
    name: "Dubai Luxury Getaway", 
    price: 1299.99, 
    rating: 4.6, 
    image: "/images/dubai.jpg", 
    description: "Experience the height of luxury in the ultramodern city of Dubai with this premium vacation package.",
    location: "Dubai, UAE",
    duration: "6 days, 5 nights",
    departureDate: "2024-02-15",
    returnDate: "2024-02-21",
    includes: ["Return flights", "5-star hotel", "Desert safari", "Burj Khalifa entry", "Yacht cruise"],
    type: "package"
  },
  { 
    id: 13, 
    name: "London Explorer Pass", 
    price: 549.99, 
    rating: 4.3, 
    image: "/images/london.jpg", 
    description: "Discover the best of London with this comprehensive city break including major attractions.",
    location: "London, UK",
    duration: "5 days, 4 nights",
    departureDate: "2024-03-20",
    returnDate: "2024-03-25",
    includes: ["Return flights", "Central hotel", "London Pass", "West End show", "Afternoon tea"],
    type: "package"
  },
  { 
    id: 14, 
    name: "Sydney & Great Barrier Reef", 
    price: 1899.99, 
    rating: 4.8, 
    image: "/images/sydney.jpg", 
    description: "Experience the best of Australia with this dual-destination package featuring Sydney and the Great Barrier Reef.",
    location: "Sydney & Cairns, Australia",
    duration: "12 days, 11 nights",
    departureDate: "2024-05-10",
    returnDate: "2024-05-22",
    includes: ["Return flights", "Hotels", "Sydney Harbour cruise", "Reef snorkeling", "Blue Mountains tour"],
    type: "package"
  },
  { 
    id: 15, 
    name: "Istanbul Discovery Tour", 
    price: 699.99, 
    rating: 4.5, 
    image: "/images/istanbul.jpg", 
    description: "Explore the meeting point of Europe and Asia with this cultural tour of historic Istanbul.",
    location: "Istanbul, Turkey",
    duration: "6 days, 5 nights",
    departureDate: "2024-04-15",
    returnDate: "2024-04-21",
    includes: ["Return flights", "Boutique hotel", "Bosphorus cruise", "Food tour", "Guided visits to major sites"],
    type: "package"
  },
  { 
    id: 17, 
    name: "Cape Town Adventure", 
    price: 1199.99, 
    rating: 4.7, 
    image: "/images/capetown_unique.jpg", 
    description: "Experience the spectacular beauty of Cape Town with this adventure-filled South African journey.",
    location: "Cape Town, South Africa",
    duration: "8 days, 7 nights",
    departureDate: "2024-02-15",
    returnDate: "2024-02-23",
    includes: ["Return flights", "Boutique hotel", "Table Mountain tour", "Cape Peninsula drive", "Wine tasting"],
    type: "package"
  },
  { 
    id: 21, 
    name: "Peru Machu Picchu Trek", 
    price: 1799.99, 
    rating: 4.9, 
    image: "/images/machupicchu.jpg", 
    description: "Embark on a once-in-a-lifetime journey to the ancient Incan citadel of Machu Picchu.",
    location: "Cusco & Machu Picchu, Peru",
    duration: "9 days, 8 nights",
    departureDate: "2024-05-15",
    returnDate: "2024-05-24",
    includes: ["Return flights", "Hotel and lodge stays", "Guided trek", "Archaeological site entries", "Train journey"],
    type: "activity"
  },
  { 
    id: 23, 
    name: "Scottish Highlands Tour", 
    price: 849.99, 
    rating: 4.7, 
    image: "/images/scotland_unique.jpg", 
    description: "Journey through the majestic Scottish Highlands, exploring castles, lochs, and whisky distilleries.",
    location: "Edinburgh & Highlands, Scotland",
    duration: "7 days, 6 nights",
    departureDate: "2024-06-10",
    returnDate: "2024-06-17",
    includes: ["Return flights", "Boutique accommodations", "Guided tours", "Whisky tasting", "Loch Ness cruise"],
    type: "package"
  },
  { 
    id: 24, 
    name: "Costa Rica Eco Adventure", 
    price: 1399.99, 
    rating: 4.8, 
    image: "/images/costarica_unique.jpg", 
    description: "Experience the incredible biodiversity and natural wonders of Costa Rica on this eco-friendly adventure.",
    location: "San Jose & Arenal, Costa Rica",
    duration: "8 days, 7 nights",
    departureDate: "2024-02-08",
    returnDate: "2024-02-16",
    includes: ["Return flights", "Eco-lodges", "Rainforest treks", "Volcano tour", "Wildlife sanctuary visits"],
    type: "activity"
  },
  { 
    id: 25, 
    name: "Portuguese Riviera", 
    price: 749.99, 
    rating: 4.6, 
    image: "/images/portugal.jpg", 
    description: "Discover the charming coastal towns and beautiful beaches of the Portuguese Riviera.",
    location: "Lisbon & Cascais, Portugal",
    duration: "6 days, 5 nights",
    departureDate: "2024-05-20",
    returnDate: "2024-05-26",
    includes: ["Return flights", "Seafront hotel", "Sintra palace tour", "Wine tasting", "Coastal excursions"],
    type: "package"
  }
];

// Recommended product IDs and items (for the Product Details page)
const recommendedIds = [2, 3, 4];
const recommendedItems = recommendedIds.map(id => products.find(p => p.id === id));

/**
 * Express Checkout enabled methods.
 */
function getExpressEnabledMethods(localisation) {
  if (localisation === "NL") {
    return ["googlepay", "ideal", "klarna"];
  } else if (localisation === "SA") {
    return ["googlepay", "tamara", "stcpay"];
  } else if (localisation === "FR") {
    return ["googlepay", "alma", "sepa"];
  } else if (localisation === "PL") {
    return ["googlepay", "p24"];
  } else if (localisation === "PT") {
    return ["googlepay", "multibanco", "mbway"];
  } else if (localisation === "BE") {
    return ["googlepay", "bancontact"];
  } else if (localisation === "AT") {
    return ["googlepay", "eps"];
  } else {
    return ["googlepay"];
  }
}

/**
 * ProductDetailPage Component
 */
function ProductDetailPage({ productId, theme, themeConfig, onAddToCart, onViewDetail, onBackToProducts, globalLocalisation }) {
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const checkoutRef = useRef(null);
  const localCurrency = getCurrency(globalLocalisation);
  const localLocale = getLocale(globalLocalisation);

  useEffect(() => {
    const found = products.find(p => p.id === productId);
    setProduct(found);
    return () => {
      if (checkoutRef.current && typeof checkoutRef.current.destroy === "function") {
        checkoutRef.current.destroy();
      }
    };
  }, [productId]);

  useEffect(() => {
    if (!product) return;
    initializeExpressCheckout();
    return () => {
      if (checkoutRef.current && typeof checkoutRef.current.destroy === "function") {
        checkoutRef.current.destroy();
      }
    };
  }, [product, theme, globalLocalisation]);

  async function initializeExpressCheckout() {
    try {
      const amount = Math.round(product.price * 100);
      const items = [{
        name: product.name,
        quantity: 1,
        reference: "SKU-" + product.id,
        unit_price: amount,
        total_amount: amount
      }];
      const billingAddress = shippingAddresses[globalLocalisation] || shippingAddresses["United Kingdom"];
      const enabledMethods = getExpressEnabledMethods(globalLocalisation);
      const response = await fetch("/api/create-payment-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: items[0].total_amount,
          currency: localCurrency,
          items,
          customer: { email: "john.doe@example.com", name: "John Doe" },
          billing: { address: billingAddress },
          description: "Your order from MyStore",
          payment_method_configuration: {},
          enabled_payment_methods: enabledMethods,
          disabled_payment_methods: []
        })
      });
      if (!response.ok) throw new Error("Failed to create payment session");
      const paymentSession = await response.json();
      const appearance = buildFlowAppearance(themeConfig);
      const checkout = await CheckoutWebComponents({
        publicKey: "pk_sbox_e5v4rg3sztzmdusp47pvdg53kmc",
        environment: "sandbox",
        paymentSession,
        locale: localLocale,
        appearance,
        onReady: () => { console.log("Express Checkout ready (product detail)."); },
        onPaymentCompleted: (_component, result) => {
          console.log("Payment completed, full result:", result);
          
          try {
            // Get the session ID directly from the paymentSession object
            const responseToSave = {
              ...result,
              session_id: paymentSession.id  // This is the ps_xxx ID from the session creation
            };
            
            console.log("Saving payment response with session ID:", responseToSave);
            
            // Store in both storages
            sessionStorage.setItem("paymentResponse", JSON.stringify(responseToSave));
            localStorage.setItem("paymentResponse", JSON.stringify(responseToSave));
            
            // Redirect with session ID in URL
            window.location.href = `/success?session_id=${paymentSession.id}`;
          } catch (error) {
            console.error("Error saving payment data:", error);
            window.location.href = "/success";
          }
        },
        onError: (err) => {
          console.error("Express checkout error:", err);
          setErrorMessage(err.message || "Express checkout failed.");
        }
      });
      checkoutRef.current = checkout;
      const flow = checkout.create("flow");
      flow.mount("#express-checkout-container");
    } catch (err) {
      console.error("init error:", err);
      setErrorMessage("Could not initialize express checkout.");
    }
  }

  if (!product) {
    return (
      <div style={{ padding: "2rem" }}>
        <p style={{ fontStyle: "italic" }}>Product not found.</p>
        <button onClick={onBackToProducts} style={{ background: "none", border: "none", color: themeConfig.colorSecondary, textDecoration: "underline", cursor: "pointer" }}>
          Return to all products
        </button>
      </div>
    );
  }

  const ratingStars = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);
  const pageStyle = { backgroundColor: themeConfig.colorBackground, color: themeConfig.colorText, minHeight: "100vh", padding: "2rem" };
  const containerStyle = { maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" };
  const mainButtonStyle = {
    backgroundColor: themeConfig.colorAction,
    border: "none",
    color: themeConfig.colorInverse,
    borderRadius: themeConfig.borderRadius[0],
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "background 0.3s ease"
  };

  // Adjust the container style based on the number of express checkout methods
  const enabledMethods = getExpressEnabledMethods(globalLocalisation);
  const checkoutContainerStyle = {
    marginTop: "1.5rem",
    minHeight: enabledMethods.length === 1 ? "120px" : "200px",
    backgroundColor: themeConfig.colorFormBackground,
    borderRadius: themeConfig.borderRadius[0],
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
  };

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <button style={{ background: "none", border: "none", color: themeConfig.colorSecondary, marginBottom: "1rem", cursor: "pointer", fontSize: "0.9rem", textDecoration: "underline" }} onClick={onBackToProducts}>
          ← Back to all products
        </button>
      </div>
      <div style={containerStyle}>
        <div style={{ textAlign: "center" }}>
          <img src={product.image} alt={product.name} style={{ maxWidth: "100%", height: "auto", borderRadius: "0.75rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
        </div>
        <div>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>{product.name}</h1>
          <div style={{ color: "#fbbf24", marginBottom: "0.75rem" }}>{ratingStars}</div>
          <p style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
            {getCurrency(globalLocalisation)}{product.price.toFixed(2)}
          </p>
          <p style={{ marginBottom: "1rem", color: themeConfig.colorSecondary }}>{product.description}</p>
          <button style={mainButtonStyle} onClick={() => onAddToCart(product)}>Add to cart</button>
          {errorMessage && (
            <div style={{ marginTop: "1rem", backgroundColor: "#fee2e2", color: "#dc2626", padding: "0.75rem", borderRadius: "0.5rem" }}>
              {errorMessage}
            </div>
          )}
          <div id="express-checkout-container" style={checkoutContainerStyle}></div>
        </div>
      </div>
      {/* Recommended Products Section */}
      <div style={{ maxWidth: "1000px", margin: "2rem auto" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: themeConfig.colorText }}>
          Recommended Products
        </h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {recommendedItems.map(item => (
            <div
              key={item.id}
              onClick={() => { onViewDetail(item.id); }}
              style={{
                cursor: "pointer",
                flex: "1 1 30%",
                border: `1px solid ${themeConfig.colorFormBorder}`,
                borderRadius: themeConfig.borderRadius[0],
                padding: "1rem",
                textAlign: "center"
              }}
            >
              <img src={item.image} alt={item.name} style={{ width: "100%", height: "auto", borderRadius: "0.75rem", marginBottom: "0.5rem" }} />
              <h4 style={{ fontSize: "1rem", color: themeConfig.colorText }}>{item.name}</h4>
              <p style={{ color: themeConfig.colorSecondary }}>
                {getCurrency(globalLocalisation)}{item.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * CartPage Component
 */
function CartPage({ items, onRemoveOne, onCheckout, onBackToProducts, themeConfig, globalLocalisation }) {
  const [errorMessage, setErrorMessage] = useState("");
  const checkoutRef = useRef(null);
  const localCurrency = getCurrency(globalLocalisation);
  const localLocale = getLocale(globalLocalisation);

  function getPaymentMethodConfig(selected) {
    if (globalLocalisation === "NL") {
      // Updated to include Klarna
      switch (selected) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
        case "ideal":
          return { enabled_payment_methods: ["ideal"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "ideal", "klarna"] };
        case "klarna":
          return { enabled_payment_methods: ["klarna"], disabled_payment_methods: ["card", "ideal", "googlepay"] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "ideal", "klarna"], disabled_payment_methods: [] };
      }
    } else if (globalLocalisation === "SA") {
      switch (selected) {
        case "tamara":
          return { enabled_payment_methods: ["tamara"], disabled_payment_methods: [] };
        case "stcpay":
          return { enabled_payment_methods: ["stcpay"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "tamara", "stcpay"] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "tamara", "stcpay"], disabled_payment_methods: [] };
      }
    } else if (globalLocalisation === "FR") {
      switch (selected) {
        case "alma":
          return { enabled_payment_methods: ["alma"], disabled_payment_methods: ["sepa"] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "alma", "sepa"] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "alma", "sepa"], disabled_payment_methods: [] };
      }
    } else if (globalLocalisation === "PL") {
      switch (selected) {
        case "p24":
          return { enabled_payment_methods: ["p24"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "p24"] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "p24"], disabled_payment_methods: [] };
      }
    } else if (globalLocalisation === "PT") {
      switch (selected) {
        case "multibanco":
          return { enabled_payment_methods: ["multibanco"], disabled_payment_methods: [] };
        case "mbway":
          return { enabled_payment_methods: ["mbway"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "multibanco", "mbway"] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "multibanco", "mbway"], disabled_payment_methods: [] };
      }
    } else if (globalLocalisation === "BE") {
      switch (selected) {
        case "bancontact":
          return { enabled_payment_methods: ["bancontact"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "bancontact"] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "bancontact"], disabled_payment_methods: [] };
      }
    } else if (globalLocalisation === "CN") {
      switch (selected) {
        case "alipay_cn":
          return { enabled_payment_methods: ["alipay_cn"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "alipay_cn"] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "alipay_cn"], disabled_payment_methods: [] };
      }
    } else if (globalLocalisation === "HK") {
      switch (selected) {
        case "alipay_hk":
          return { enabled_payment_methods: ["alipay_hk"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "alipay_hk"] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "alipay_hk"], disabled_payment_methods: [] };
      }
    } else if (globalLocalisation === "AT") {
      switch (selected) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: ["eps"] };
        case "eps":
          return { enabled_payment_methods: ["eps"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "eps"] };
        case "all":
        default:
          return { enabled_payment_methods: ["card", "googlepay", "eps"], disabled_payment_methods: [] };
      }
    } else {
      switch (selected) {
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "klarna"] };
        case "klarna":
          return { enabled_payment_methods: ["klarna"], disabled_payment_methods: ["card", "googlepay"] };
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
        case "all":
        default:
          return { enabled_payment_methods: ["card", "googlepay", "klarna"], disabled_payment_methods: [] };
      }
    }
  }
  const paymentConfig = getPaymentMethodConfig("all");
  const showStoreForFuture = paymentConfig.enabled_payment_methods.includes("card");

  useEffect(() => {
    if (checkoutRef.current && typeof checkoutRef.current.destroy === "function") {
      checkoutRef.current.destroy();
      checkoutRef.current = null;
    }
    if (items.length > 0) {
      initializeCartExpressCheckout();
    }
  }, [items, themeConfig, globalLocalisation]);

  async function initializeCartExpressCheckout() {
    try {
      const cartItems = items.map(it => ({
        name: it.name,
        quantity: it.quantity,
        reference: "SKU-" + it.id,
        unit_price: Math.round(it.price * 100),
        total_amount: Math.round(it.price * it.quantity * 100)
      }));
      cartItems.push({
        name: "Delivery Fee",
        quantity: 1,
        reference: "DELIV-FEE",
        unit_price: getDeliveryFee(globalLocalisation),
        total_amount: getDeliveryFee(globalLocalisation)
      });
      const amount = cartItems.reduce((sum, x) => sum + x.total_amount, 0);
      const { enabled_payment_methods, disabled_payment_methods } = paymentConfig;
      const response = await fetch("/api/create-payment-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: localCurrency,
          items: cartItems,
          customer: { email: "john.doe@example.com", name: "John Doe" },
          billing: { address: shippingAddresses[globalLocalisation] || shippingAddresses["United Kingdom"] },
          payment_method_configuration: {},
          enabled_payment_methods,
          disabled_payment_methods
        })
      });
      if (!response.ok) throw new Error("Failed to create cart express checkout session");
      const paymentSession = await response.json();
      const appearance = buildFlowAppearance(themeConfig);
      const checkout = await CheckoutWebComponents({
        publicKey: "pk_sbox_e5v4rg3sztzmdusp47pvdg53kmc",
        environment: "sandbox",
        paymentSession,
        locale: localLocale,
        appearance,
        onReady: () => { console.log("Cart Express Checkout ready"); },
        onPaymentCompleted: (_component, result) => {
          console.log("Cart express payment completed:", result);
          if (result && Object.keys(result).length > 0) {
            localStorage.setItem("paymentResponse", JSON.stringify(result));
            console.log("Payment response saved to localStorage.");
          } else {
            console.warn("No payment response data found to save.");
          }
          setTimeout(() => {
            window.location.href = "/success";
          }, 100);
        },
        onError: (err) => {
          console.error("Cart express error:", err);
          setErrorMessage(err.message || "Cart express checkout failed.");
        }
      });
      checkoutRef.current = checkout;
      // Flow creation removed per instructions.
    } catch (err) {
      console.error("Cart express checkout init error:", err);
      setErrorMessage("Could not initialize cart express checkout");
    }
  }

  const calculateSubtotal = () => items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const pageStyle = { backgroundColor: themeConfig.colorBackground, color: themeConfig.colorText, minHeight: "100vh", paddingBottom: "2rem" };
  const containerStyle = { backgroundColor: themeConfig.colorFormBackground, color: themeConfig.colorText, borderColor: themeConfig.colorFormBorder, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", borderRadius: themeConfig.borderRadius[0] };
  const buttonStyle = { backgroundColor: themeConfig.colorAction, border: "none", color: themeConfig.colorInverse, borderRadius: themeConfig.borderRadius[0], padding: "0.75rem 1rem", transition: "background 0.3s ease" };

  return (
    <div style={{ 
      backgroundColor: themeConfig.colorBackground, 
      color: themeConfig.colorText, 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ flex: "1 0 auto" }}>
        <StepsIndicator currentStep={1} themeConfig={themeConfig} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">  {/* Reduced padding */}
          <h1 className="text-2xl font-bold mb-8">Cart</h1>
          <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "flex-start" }}>
            <button onClick={onBackToProducts} style={buttonStyle}>Back to Homepage</button>
          </div>
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p style={{ color: themeConfig.colorDisabled }} className="mb-4">Your cart is empty</p>
              <button onClick={onBackToProducts} style={buttonStyle}>Continue Shopping</button>
            </div>
          ) : (
            <div className="rounded-lg shadow-sm" style={containerStyle}>
              <div className="divide-y" style={{ borderColor: themeConfig.colorBorder }}>
                {items.map((it) => (
                  <div key={it.id} className="flex items-center p-6">
                    <img src={it.image} alt={it.name} className="w-20 h-20 object-cover rounded-md" style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }} />
                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-medium" style={{ color: themeConfig.colorText }}>{it.name}</h3>
                      <p style={{ color: themeConfig.colorSecondary }}>
                        {getCurrency(globalLocalisation)}{it.price.toFixed(2)} × {it.quantity} = {getCurrency(globalLocalisation)}{(it.price * it.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button onClick={() => onRemoveOne(it.id)} style={{ color: themeConfig.colorDisabled }} className="flex items-center space-x-2 hover:opacity-80">
                      <span data-lucide="trash-2" className="w-5 h-5"></span>
                      <span>Remove one</span>
                    </button>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t" style={{ borderColor: themeConfig.colorFormBorder }}>
                <div className="flex justify-between text-lg font-medium">
                  <span>Subtotal:</span>
                  <span>{getCurrency(globalLocalisation)}{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-medium mt-2">
                  <span>Delivery:</span>
                  <span>{getCurrency(globalLocalisation)}{(getDeliveryFee(globalLocalisation) / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-2">
                  <span>Total:</span>
                  <span>
                    {getCurrency(globalLocalisation)}
                    {((calculateSubtotal() * 100 + getDeliveryFee(globalLocalisation)) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="mt-6">
                  <button onClick={onCheckout} style={buttonStyle} className="w-full">Continue to Checkout</button>
                </div>
              </div>
            </div>
          )}
          {errorMessage && (
            <div style={{ marginTop: "1rem", backgroundColor: "#fee2e2", color: "#dc2626", padding: "0.75rem", borderRadius: "0.5rem" }}>
              {errorMessage}
            </div>
          )}
        </div>
      </div>
      {/* Footer will automatically stay at bottom */}
    </div>
  );
}

/**
 * CheckoutPage Component
 */
function CheckoutPage({ items, theme, themeConfig, onPaymentSuccess, onRemoveOneItem, globalLocalisation, onLocalisationChange, onBackToCart, selectedExtras, onAddExtra, onRemoveExtra }) {
  const [saveCard, setSaveCard] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [selectedPaymentMethods, setSelectedPaymentMethods] = React.useState("all");
  const [selectedLocalisation, setSelectedLocalisation] = React.useState("United Kingdom");
  const [contactInfo, setContactInfo] = React.useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+44123456789"
  });
  const [address, setAddress] = React.useState({
    address_line1: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });
  const [travelerDetails, setTravelerDetails] = React.useState([]);
  // Change from 3 steps to 4 steps: 1: Contact Info, 2: Passengers, 3: Extras, 4: Payment
  const [step, setStep] = React.useState(1);
  const checkoutRef = React.useRef(null);
  
  // Available extras that can be added to booking
  const [availableExtras] = React.useState([
    { id: 1, name: 'Travel Insurance', price: 49.99, image: '/images/insurance.jpg', description: 'Comprehensive travel insurance for your peace of mind.' },
    { id: 2, name: 'Airport Transfer', price: 29.99, image: '/images/transfer.jpg', description: 'Convenient airport pickup and drop-off service.' },
    { id: 3, name: 'Priority Boarding', price: 15.99, image: '/images/boarding.jpg', description: 'Skip the lines with priority boarding.' },
    { id: 4, name: 'Extra Luggage', price: 39.99, image: '/images/luggage.jpg', description: 'Additional 23kg checked baggage allowance.' },
    { id: 5, name: 'Premium Seat Selection', price: 24.99, image: '/images/premium_seat_v2.jpg', description: 'Choose premium seats with extra legroom.' },
    { id: 6, name: 'Travel Adapter', price: 19.99, image: '/images/transfer.jpg', description: 'Universal travel adapter for all your devices.' }
  ]);

  // Initialize traveler details based on booking items with dummy data
  React.useEffect(() => {
    const totalTravelers = items.reduce((sum, item) => sum + item.travelers, 0);
    const initialTravelers = Array(totalTravelers).fill().map((_, i) => ({
      id: i + 1,
      firstName: `Traveler ${i + 1}`,
      lastName: "Smith",
      dob: "1985-06-15",
      passport: `P${Math.floor(10000000 + Math.random() * 90000000)}`,
      nationality: "GB"
    }));
    setTravelerDetails(initialTravelers);
  }, [items]);

  React.useEffect(() => {
    if (globalLocalisation && globalLocalisation !== selectedLocalisation) {
      setSelectedLocalisation(globalLocalisation);
      autoPopulateAddress(globalLocalisation);
    }
  }, [globalLocalisation]);

  React.useEffect(() => {
      autoPopulateAddress(selectedLocalisation);
  }, [selectedLocalisation]);

  // Update to use 5 steps instead of 4
  React.useEffect(() => {
    // Update to use step 5 for payment
    if (step === 5) {
      if (checkoutRef.current && typeof checkoutRef.current.destroy === "function") {
        checkoutRef.current.destroy();
        checkoutRef.current = null;
      }
      initializeCheckout();
    }
  }, [saveCard, selectedPaymentMethods, items, theme, selectedLocalisation, step]);

  const isAddressValid = (addr) => {
    if (!selectedLocalisation) return false;
    if (selectedLocalisation === "United Kingdom") {
      return addr.address_line1 && addr.city && addr.zip && addr.country;
    } else if (selectedLocalisation === "HK") {
      return addr.address_line1 && addr.city && addr.country;
    } else {
      return addr.address_line1 && addr.city && addr.zip && addr.country;
    }
  };

  const isContactInfoValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\s()-]{8,15}$/;
    
    return (
      contactInfo.firstName.trim() !== "" &&
      contactInfo.lastName.trim() !== "" &&
      emailRegex.test(contactInfo.email) &&
      phoneRegex.test(contactInfo.phone)
    );
  };

  const areTravelerDetailsValid = () => {
    return travelerDetails.every(traveler => 
      traveler.firstName.trim() !== "" && 
      traveler.lastName.trim() !== "" && 
      traveler.dob.trim() !== ""
    );
  };

  function autoPopulateAddress(loc = selectedLocalisation) {
    setAddress(shippingAddresses[loc] || shippingAddresses["United Kingdom"]);
  }

  function getPaymentMethodConfig() {
    // Get available payment methods for the current localization
    const availablePaymentMethods = getPaymentMethods(selectedLocalisation);
    
    // Handle specific country configurations
    switch (selectedLocalisation) {
      case "NL":
        switch (selectedPaymentMethods) {
          case "card":
            return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
          case "ideal":
            return { enabled_payment_methods: ["ideal"], disabled_payment_methods: [] };
          case "googlepay":
            return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "ideal", "klarna"] };
          case "klarna":
            return { enabled_payment_methods: ["klarna"], disabled_payment_methods: ["card", "ideal", "googlepay"] };
          case "all":
          default:
            return { enabled_payment_methods: ["card", "googlepay", "ideal", "klarna"], disabled_payment_methods: [] };
        }
        
      case "SA":
        switch (selectedPaymentMethods) {
          case "card":
            return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
          case "tamara":
            return { enabled_payment_methods: ["tamara"], disabled_payment_methods: [] };
          case "stcpay":
            return { enabled_payment_methods: ["stcpay"], disabled_payment_methods: [] };
          case "googlepay":
            return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "tamara", "stcpay"] };
          case "all":
          default:
            return { enabled_payment_methods: ["card", "googlepay", "tamara", "stcpay"], disabled_payment_methods: [] };
        }
        
      case "FR":
        switch (selectedPaymentMethods) {
          case "card":
            return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
          case "googlepay":
            return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "sepa", "alma"] };
          case "sepa":
            return { enabled_payment_methods: ["sepa"], disabled_payment_methods: [] };
          case "alma":
            return { enabled_payment_methods: ["alma"], disabled_payment_methods: [] };
          case "all":
          default:
            return { enabled_payment_methods: ["card", "googlepay", "sepa", "alma"], disabled_payment_methods: [] };
        }
        
      case "PL":
        switch (selectedPaymentMethods) {
          case "card":
            return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
          case "googlepay":
            return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "p24"] };
          case "p24":
            return { enabled_payment_methods: ["p24"], disabled_payment_methods: [] };
          case "all":
          default:
            return { enabled_payment_methods: ["card", "googlepay", "p24"], disabled_payment_methods: [] };
        }
        
      case "PT":
        switch (selectedPaymentMethods) {
          case "card":
            return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
          case "googlepay":
            return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "multibanco", "mbway"] };
          case "multibanco":
            return { enabled_payment_methods: ["multibanco"], disabled_payment_methods: [] };
          case "mbway":
            return { enabled_payment_methods: ["mbway"], disabled_payment_methods: [] };
          case "all":
          default:
            return { enabled_payment_methods: ["card", "googlepay", "multibanco", "mbway"], disabled_payment_methods: [] };
        }
        
      case "BE":
        switch (selectedPaymentMethods) {
          case "card":
            return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
          case "googlepay":
            return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "bancontact"] };
          case "bancontact":
            return { enabled_payment_methods: ["bancontact"], disabled_payment_methods: [] };
          case "all":
          default:
            return { enabled_payment_methods: ["card", "googlepay", "bancontact"], disabled_payment_methods: [] };
        }
        
      case "GB":
      case "United Kingdom":
        switch (selectedPaymentMethods) {
          case "card":
            return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
          case "googlepay":
            return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "klarna"] };
          case "klarna":
            return { enabled_payment_methods: ["klarna"], disabled_payment_methods: ["card", "googlepay"] };
          case "all":
          default:
            return { enabled_payment_methods: ["card", "googlepay", "klarna"], disabled_payment_methods: [] };
        }
        
      case "AT":
        switch (selectedPaymentMethods) {
          case "card":
            return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
          case "googlepay":
            return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "eps"] };
          case "eps":
            return { enabled_payment_methods: ["eps"], disabled_payment_methods: [] };
          case "all":
          default:
            return { enabled_payment_methods: ["card", "googlepay", "eps"], disabled_payment_methods: [] };
        }
        
      default:
        // Default (GB and others)
        switch (selectedPaymentMethods) {
          case "card":
            return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
          case "googlepay":
            return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card"] };
          case "all":
          default:
            return { enabled_payment_methods: ["card", "googlepay"], disabled_payment_methods: [] };
        }
    }
  }

  const paymentConfig = getPaymentMethodConfig();
  const showStoreForFuture = paymentConfig.enabled_payment_methods.includes("card");

  // Common style for inputs and selects
  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    fontSize: "0.875rem",
    borderRadius: themeConfig.borderRadius[0],
    border: `1px solid ${themeConfig.colorFormBorder}`,
    backgroundColor: themeConfig.colorFormBackground,
    color: themeConfig.colorText,
    transition: "border 0.3s ease"
  };

  const buttonStyle = {
    backgroundColor: themeConfig.colorAction,
    color: themeConfig.colorInverse,
    border: "none",
    borderRadius: themeConfig.borderRadius[0],
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.3s ease"
  };

  const secondaryButtonStyle = {
    backgroundColor: "transparent",
    color: themeConfig.colorAction,
    border: `1px solid ${themeConfig.colorAction}`,
    borderRadius: themeConfig.borderRadius[0],
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease"
  };

  const sectionStyle = {
    backgroundColor: themeConfig.colorFormBackground,
    borderRadius: themeConfig.borderRadius[0],
    padding: "1.5rem",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
  };

  async function initializeCheckout() {
    try {
      // Guard against empty items array
      if (!items || items.length === 0) {
        setErrorMessage("No items in your booking. Please add items before checkout.");
        return;
      }
      
      // Format items for the payment session
      const cartItemsFormatted = items.map(it => ({
        name: it.name,
        quantity: 1,
        reference: "TRIP-" + it.id,
        unit_price: Math.round(it.price * it.travelers * 100),
        total_amount: Math.round(it.price * it.travelers * 100),
        // Add required fields for API validation
        wxpay_goods_id: "GOOD_" + Math.floor(Math.random() * 10000),
        category: "travel",
        type: "physical"
      }));
      
      // Add extras if any
      const selectedExtrasList = selectedExtras || [];
      if (selectedExtrasList.length > 0) {
        selectedExtrasList.forEach(extra => {
      cartItemsFormatted.push({
            name: extra.name,
        quantity: 1,
            reference: "EXTRA-" + extra.id,
            unit_price: Math.round(extra.price * 100),
            total_amount: Math.round(extra.price * 100),
            wxpay_goods_id: "GOOD_EXTRA_" + Math.floor(Math.random() * 10000),
            category: "travel_extras",
            type: "physical"
          });
        });
      }
      
      // Calculate total amount
      const amount = cartItemsFormatted.reduce((sum, x) => sum + x.total_amount, 0);
      
      // Double-check amount
      if (!amount || amount <= 0) {
        setErrorMessage("Invalid total amount. Please try again with valid items.");
        return;
      }
      
      console.log("Creating payment session with amount:", amount);
      
      // Get payment method configuration
      const { enabled_payment_methods, disabled_payment_methods } = getPaymentMethodConfig();
      
      // Get currency and locale
      const localCurrency = getCurrency(selectedLocalisation);
      const localLocale = getLocale(selectedLocalisation);
      
      // Create payment session
      const response = await fetch("/api/create-payment-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: localCurrency,
          items: cartItemsFormatted,
          customer: { 
            email: contactInfo.email || "john.doe@example.com", 
            name: `${contactInfo.firstName} ${contactInfo.lastName}` || "John Doe" 
          },
          billing: { address },
          description: "Your travel booking with TravelEase",
          payment_method_configuration: {
            card: { store_payment_details: saveCard ? "enabled" : "disabled" }
          },
          enabled_payment_methods,
          disabled_payment_methods
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create payment session");
      }
      
      const paymentSession = await response.json();
      const appearance = buildFlowAppearance(themeConfig);
      
      const checkout = await CheckoutWebComponents({
        publicKey: "pk_sbox_e5v4rg3sztzmdusp47pvdg53kmc",
        environment: "sandbox",
        paymentSession,
        locale: localLocale,
        appearance,
        componentOptions: {
          card: {
            displayCardholderName: "top"
          },
          flow: {
            expandFirstPaymentMethod: false
          }
        },
        onPaymentCompleted: (_component, result) => {
          console.log("Payment completed, full result:", result);
          
          try {
            // Create a comprehensive booking record
            const bookingRecord = {
              ...result,
              session_id: result.session_id || paymentSession.id,
              booking_details: {
                items: items.map(item => ({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  travelers: item.travelers,
                  location: item.location,
                  duration: item.duration,
                  departureDate: item.departureDate,
                  returnDate: item.returnDate
                })),
                extras: selectedExtras || [],
                contact: contactInfo,
                travelers: travelerDetails,
                billing: address,
                total: amount / 100
              }
            };
            
            // Store booking record
            sessionStorage.setItem("bookingRecord", JSON.stringify(bookingRecord));
            localStorage.setItem("bookingRecord", JSON.stringify(bookingRecord));
            
            // Store a flag to indicate we're coming from a payment
            sessionStorage.setItem("bookingJustCompleted", "true");
            
            console.log("Booking data saved, redirecting...");
            
            if (onPaymentSuccess) {
              onPaymentSuccess(bookingRecord);
            } else {
              // Redirect to success page
              window.location.href = "/success";
            }
          } catch (error) {
            console.error("Error saving booking data:", error);
            window.location.href = "/success";
          }
        },
        onError: (err) => {
          console.error("Payment error:", err);
          setErrorMessage(err.message || "Payment failed. Please try again.");
        }
      });
      
      checkoutRef.current = checkout;
      const flow = checkout.create("flow");
      flow.mount("#flow-container");
    } catch (error) {
      console.error("Checkout init error:", error);
      setErrorMessage("Unable to initialize checkout. Please try again later.");
    }
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.travelers), 0);
  };
  
  const calculateExtrasTotal = () => {
    return selectedExtras ? selectedExtras.reduce((sum, extra) => sum + extra.price, 0) : 0;
  };
  
  const calculateTaxes = () => {
    return (calculateSubtotal() + calculateExtrasTotal()) * 0.1; // 10% tax
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateExtrasTotal() + calculateTaxes();
  };

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTravelerChange = (index, field, value) => {
    const updatedTravelers = [...travelerDetails];
    updatedTravelers[index] = {
      ...updatedTravelers[index],
      [field]: value
    };
    setTravelerDetails(updatedTravelers);
  };

  const handleNextStep = () => {
    if (step === 1 && isContactInfoValid()) {
      setStep(2);
    } else if (step === 2 && areTravelerDetailsValid()) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4 && isAddressValid(address)) {
      setStep(5);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Render Contact Information Form
  const renderContactInfoForm = () => {
  return (
      <div style={sectionStyle}>
        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
        <p className="text-sm mb-4" style={{ color: themeConfig.colorSecondary }}>
          We'll use this information to send your booking confirmation and updates.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={contactInfo.firstName}
              onChange={handleContactInfoChange}
              style={inputStyle}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={contactInfo.lastName}
              onChange={handleContactInfoChange}
              style={inputStyle}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              value={contactInfo.email}
              onChange={handleContactInfoChange}
              style={inputStyle}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={contactInfo.phone}
              onChange={handleContactInfoChange}
              placeholder="+44 123 456 7890"
              style={inputStyle}
              required
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={handleNextStep}
            disabled={!isContactInfoValid()}
                  style={{
              ...buttonStyle,
              backgroundColor: isContactInfoValid() ? themeConfig.colorAction : themeConfig.colorDisabled,
              cursor: isContactInfoValid() ? "pointer" : "not-allowed"
            }}
            className="w-full"
          >
            Continue to Passenger Details
          </button>
              </div>
      </div>
    );
  };

  // Render Passenger Details Form
  const renderPassengersForm = () => {
    return (
      <div style={sectionStyle}>
        <h2 className="text-xl font-bold mb-4">Passenger Details</h2>
        <p className="text-sm mb-4" style={{ color: themeConfig.colorSecondary }}>
          Please provide details for all passengers as they appear on their ID/passport.
        </p>
        
        {travelerDetails.map((traveler, index) => (
          <div key={traveler.id} className="mb-6 pb-6 border-b last:border-b-0">
            <h3 className="font-bold mb-3">Passenger {index + 1}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name *</label>
                  <input
                    type="text"
                  value={traveler.firstName}
                  onChange={(e) => handleTravelerChange(index, "firstName", e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Last Name *</label>
                <input
                  type="text"
                  value={traveler.lastName}
                  onChange={(e) => handleTravelerChange(index, "lastName", e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date of Birth *</label>
                <input
                  type="date"
                  value={traveler.dob}
                  onChange={(e) => handleTravelerChange(index, "dob", e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Passport Number (Optional)</label>
                <input
                  type="text"
                  value={traveler.passport}
                  onChange={(e) => handleTravelerChange(index, "passport", e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
                </div>
              ))}
        
        <div className="flex justify-between mt-6">
                <button
            onClick={handlePrevStep}
            style={secondaryButtonStyle}
          >
            Back
          </button>
          
          <button
            onClick={handleNextStep}
            disabled={!areTravelerDetailsValid()}
                  style={{
              ...buttonStyle,
              backgroundColor: areTravelerDetailsValid() ? themeConfig.colorAction : themeConfig.colorDisabled,
              cursor: areTravelerDetailsValid() ? "pointer" : "not-allowed"
            }}
          >
            Continue to Extras
                </button>
              </div>
            </div>
    );
  };

  // Render Travel Extras Form
  const renderExtrasForm = () => {
    return (
      <div style={sectionStyle}>
        <h2 className="text-xl font-bold mb-4">Travel Extras</h2>
        <p className="text-sm mb-4" style={{ color: themeConfig.colorSecondary }}>
          Enhance your travel experience with these optional extras.
        </p>
        
        <div className="space-y-4">
          {availableExtras.map(extra => {
            const isSelected = selectedExtras && selectedExtras.some(e => e.id === extra.id);
            
            return (
              <div 
                key={extra.id} 
                className="flex items-center p-4 border rounded-md"
              style={{
                  borderColor: isSelected ? themeConfig.colorAction : themeConfig.colorBorder,
                  backgroundColor: isSelected ? `${themeConfig.colorAction}10` : themeConfig.colorFormBackground
                }}
              >
                <div className="flex-shrink-0 mr-4">
                  <img 
                    src={extra.image} 
                    alt={extra.name} 
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-medium">{extra.name}</h3>
                  <p className="text-sm" style={{ color: themeConfig.colorSecondary }}>{extra.description}</p>
                  <p className="font-medium mt-1" style={{ color: themeConfig.colorAction }}>
                    {getCurrency(selectedLocalisation)}{extra.price.toFixed(2)}
                  </p>
            </div>
                
                <div className="ml-4">
                  {isSelected ? (
                    <button
                      onClick={() => onRemoveExtra(extra.id)}
                      className="px-3 py-1 rounded-md"
                      style={{
                        border: `1px solid ${themeConfig.colorAction}`,
                        color: themeConfig.colorAction,
                        backgroundColor: 'transparent'
                      }}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => onAddExtra(extra)}
                      className="px-3 py-1 rounded-md"
                      style={{
                        backgroundColor: themeConfig.colorAction,
                        color: themeConfig.colorInverse
                      }}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevStep}
            style={secondaryButtonStyle}
          >
            Back to Passenger Details
          </button>
          
          <button
            onClick={handleNextStep}
            style={buttonStyle}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    );
  };

  // Render Address Form (new function)
  const renderAddressForm = () => {
    return (
      <div style={sectionStyle}>
        <h2 className="text-xl font-bold mb-4">Billing Address</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Shipping Location</label>
          <select
            value={selectedLocalisation}
            onChange={(e) => {
              const newLoc = e.target.value;
              setSelectedLocalisation(newLoc);
              onLocalisationChange(newLoc);
              autoPopulateAddress(newLoc);
            }}
            style={inputStyle}
          >
            <option value="United Kingdom">United Kingdom</option>
            <option value="NL">Netherlands</option>
            <option value="FR">France</option>
            <option value="BE">Belgium</option>
            <option value="PL">Poland</option>
            <option value="PT">Portugal</option>
            <option value="AT">Austria</option>
            <option value="SA">Saudi Arabia</option>
          </select>
          <p className="text-sm text-gray-500">Select your country to automatically fill address information</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Street Address</label>
          <input
            type="text"
            value={address.address_line1}
            disabled
            placeholder="Enter street address"
            style={{...inputStyle, backgroundColor: themeConfig.colorDisabled + '20'}}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              value={address.city}
              disabled
              placeholder="Enter city"
              style={{...inputStyle, backgroundColor: themeConfig.colorDisabled + '20'}}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Postal Code</label>
            <input
              type="text"
              value={address.zip}
              disabled
              placeholder="Enter postal code"
              style={{...inputStyle, backgroundColor: themeConfig.colorDisabled + '20'}}
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Country</label>
          <input
            type="text"
            value={address.country}
            disabled
            style={{...inputStyle, backgroundColor: themeConfig.colorDisabled + '20'}}
          />
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevStep}
            style={secondaryButtonStyle}
          >
            Back
          </button>
          
          <button
            onClick={handleNextStep}
            disabled={!isAddressValid(address)}
            style={{
              ...buttonStyle,
              backgroundColor: isAddressValid(address) ? themeConfig.colorAction : themeConfig.colorDisabled,
              cursor: isAddressValid(address) ? "pointer" : "not-allowed"
            }}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    );
  };

  // Render Payment Form
  const renderPaymentForm = () => {
    return (
      <div style={sectionStyle}>
        <h2 className="text-xl font-bold mb-4">Payment</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Payment Methods</label>
          <select
            value={selectedPaymentMethods}
            onChange={(e) => setSelectedPaymentMethods(e.target.value)}
            style={inputStyle}
          >
            <option value="all">All Available Methods</option>
            <option value="card">Cards Only</option>
            <option value="googlepay">Google Pay Only</option>
            {selectedLocalisation === "NL" && <option value="ideal">iDeal Only</option>}
            {selectedLocalisation === "NL" && <option value="klarna">Klarna Only</option>}
            {(selectedLocalisation === "GB" || selectedLocalisation === "United Kingdom") && <option value="klarna">Klarna Only</option>}
            {selectedLocalisation === "SA" && <option value="tamara">Tamara Only</option>}
            {selectedLocalisation === "SA" && <option value="stcpay">STC Pay Only</option>}
            {selectedLocalisation === "FR" && <option value="alma">Alma Only</option>}
            {selectedLocalisation === "FR" && <option value="sepa">SEPA Only</option>}
            {selectedLocalisation === "PL" && <option value="p24">P24 Only</option>}
            {selectedLocalisation === "PT" && <option value="multibanco">Multibanco Only</option>}
            {selectedLocalisation === "PT" && <option value="mbway">MB Way Only</option>}
            {selectedLocalisation === "BE" && <option value="bancontact">Bancontact Only</option>}
            {selectedLocalisation === "AT" && <option value="eps">EPS Only</option>}
          </select>
        </div>
        
        {showStoreForFuture && (
          <div className="mb-4">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Save card for future bookings</span>
            </label>
          </div>
        )}
        
        <div id="flow-container" className="min-h-[300px] mb-4"></div>
        
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
            {errorMessage}
          </div>
        )}
        
        <button
          onClick={handlePrevStep}
          style={secondaryButtonStyle}
        >
          Back to Address
        </button>
      </div>
    );
  };

  return (
    <div style={{ 
      backgroundColor: themeConfig.colorBackground, 
      color: themeConfig.colorText, 
      minHeight: "100vh",
      paddingBottom: "2rem"
    }}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        <div className="mb-6">
          <button 
            onClick={onBackToCart} 
            className="flex items-center text-sm font-medium"
            style={{ color: themeConfig.colorAction }}
          >
            <i data-lucide="arrow-left" className="w-4 h-4 mr-1"></i>
            Back to Booking
          </button>
              </div>
        
        {/* Checkout Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -z-10"></div>
            
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div 
                key={stepNumber} 
                className="flex flex-col items-center"
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center mb-2"
                  style={{ 
                    backgroundColor: step >= stepNumber ? themeConfig.colorAction : themeConfig.colorFormBackground,
                    color: step >= stepNumber ? themeConfig.colorInverse : themeConfig.colorText,
                    border: `2px solid ${step >= stepNumber ? themeConfig.colorAction : themeConfig.colorBorder}`
                  }}
                >
                  {stepNumber}
                </div>
                <div className="text-xs font-medium">
                  {stepNumber === 1 ? "Contact" : 
                   stepNumber === 2 ? "Passengers" : 
                   stepNumber === 3 ? "Extras" : 
                   stepNumber === 4 ? "Address" :
                   "Payment"}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && renderContactInfoForm()}
            {step === 2 && renderPassengersForm()}
            {step === 3 && renderExtrasForm()}
            {step === 4 && renderAddressForm()}
            {step === 5 && renderPaymentForm()}
          </div>
          
          <div className="lg:col-span-1">
            {/* Booking Summary */}
            <div style={sectionStyle}>
              <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
              
              <div className="space-y-4 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="pb-4 border-b">
                    <div className="flex items-start">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded-md mr-3"
                      />
                          <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm" style={{ color: themeConfig.colorSecondary }}>{item.location}</p>
                        <div className="flex items-center text-sm" style={{ color: themeConfig.colorSecondary }}>
                          <i data-lucide="calendar" className="w-3 h-3 mr-1"></i>
                          <span>{item.duration}</span>
                          </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-between mt-2">
                      <span className="text-sm">{item.travelers} {item.travelers === 1 ? 'passenger' : 'passengers'}</span>
                      <span>{getCurrency(selectedLocalisation)}{(item.price * item.travelers).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                    </div>
              
              {/* Travel Extras Summary */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Travel Extras</h3>
                    </div>
                
                {selectedExtras && selectedExtras.length > 0 ? (
                  <div className="space-y-2">
                    {selectedExtras.map(extra => (
                      <div key={extra.id} className="flex justify-between items-center py-2 border-b">
                        <div className="flex items-center">
                          <img 
                            src={extra.image} 
                            alt={extra.name} 
                            className="w-8 h-8 object-cover rounded-md mr-2"
                          />
                          <span>{extra.name}</span>
                    </div>
                        <span>{getCurrency(selectedLocalisation)}{extra.price.toFixed(2)}</span>
                  </div>
                    ))}
                </div>
                ) : (
                  <p className="text-sm italic" style={{ color: themeConfig.colorSecondary }}>No extras added</p>
                )}
              </div>
              
              {/* Price Summary */}
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{getCurrency(selectedLocalisation)}{calculateSubtotal().toFixed(2)}</span>
            </div>
                
                <div className="flex justify-between">
                  <span>Extras</span>
                  <span>{getCurrency(selectedLocalisation)}{calculateExtrasTotal().toFixed(2)}</span>
        </div>
                
                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span>{getCurrency(selectedLocalisation)}{calculateTaxes().toFixed(2)}</span>
      </div>
                
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span style={{ color: themeConfig.colorAction }}>
                    {getCurrency(selectedLocalisation)}{calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * MyAccountPage Component
 */
function MyAccountPage({ themeConfig, globalLocalisation }) {
  const address = shippingAddresses[globalLocalisation] || shippingAddresses["United Kingdom"];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      paddingBottom: '80px' // Add some space at the bottom
    }}>
      {/* Main content */}
      <div style={{ 
        flex: '0 1 auto',  // Changed from flex: 1 to prevent stretching
        padding: '2rem'
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          marginBottom: '2rem',
          textAlign: 'center',
          color: themeConfig.colorText 
        }}>My Account</h1>

        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '2rem',
          background: themeConfig.colorFormBackground,
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '1.25rem', 
            marginBottom: '1rem',
            color: themeConfig.colorText 
          }}>Saved Address</h2>
          
          <div style={{
            padding: '1.5rem',
            border: `1px solid ${themeConfig.colorFormBorder}`,
            borderRadius: '6px',
            background: 'white'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '1rem' 
            }}>
              <strong style={{ color: themeConfig.colorText }}>Default</strong>
              <div>
                <button style={{
                  padding: '0.5rem 1rem',
                  marginLeft: '0.5rem',
                  background: themeConfig.colorAction,
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>Edit</button>
              </div>
            </div>
            <div style={{ 
              color: themeConfig.colorText,
              lineHeight: '1.5'
            }}>
              <div>{address.address_line1}</div>
              <div>{address.city}</div>
              <div>{address.zip}</div>
              <div>{address.country === "GB" ? "United Kingdom" : address.country}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * PaymentSuccessPage Component
 * Displays the full payment authorisation response.
 */
function PaymentSuccessPage({ paymentResponse, themeConfig, onBackToProducts }) {
  return (
    <div style={{ backgroundColor: themeConfig.colorBackground, color: themeConfig.colorText, minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Payment Successful!</h1>
      <p style={{ marginBottom: "1rem" }}>Payment Authorization Response:</p>
      <pre style={{ background: themeConfig.colorFormBackground, padding: "1rem", borderRadius: themeConfig.borderRadius[0], overflowX: "auto" }}>
        {JSON.stringify(paymentResponse, null, 2)}
      </pre>
      <button onClick={onBackToProducts} style={{ marginTop: "1rem", backgroundColor: themeConfig.colorAction, border: "none", color: themeConfig.colorInverse, borderRadius: themeConfig.borderRadius[0], padding: "0.75rem 1.5rem", cursor: "pointer" }}>
        Back to Products
      </button>
    </div>
  );
}

// Update the StepsIndicator component's progress bar calculation
function StepsIndicator({ currentStep, themeConfig }) {
  const steps = [
    { number: 1, title: "Contact" },
    { number: 2, title: "Passengers" },
    { number: 3, title: "Extras" },
    { number: 4, title: "Address" },
    { number: 5, title: "Payment" }
  ];

  return (
    <div style={{ 
      maxWidth: "700px",  
      margin: "0 auto 1.5rem",  
      padding: "0.75rem"  
    }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative"
      }}>
        {/* Connecting Line Background */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "8%",
          right: "8%",
          height: "2px",
          background: themeConfig.colorBorder,
          zIndex: 0
        }}/>
        
        {/* First segment (Contact to Passengers) */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "8%",
          width: "28%",
          height: "2px",
          background: currentStep >= 2 ? themeConfig.colorAction : themeConfig.colorBorder,
          zIndex: 0,
          transition: "background-color 0.3s ease"
        }}/>
        
        {/* Second segment (Passengers to Extras) */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "36%",
          width: "28%",
          height: "2px",
          background: currentStep >= 3 ? themeConfig.colorAction : themeConfig.colorBorder,
          zIndex: 0,
          transition: "background-color 0.3s ease"
        }}/>
        
        {/* Third segment (Extras to Payment) */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "64%",
          width: "28%",
          height: "2px",
          background: currentStep >= 4 ? themeConfig.colorAction : themeConfig.colorBorder,
          zIndex: 0,
          transition: "background-color 0.3s ease"
        }}/>
        
        {/* Fourth segment (Address to Payment) */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "92%",
          width: "28%",
          height: "2px",
          background: currentStep >= 5 ? themeConfig.colorAction : themeConfig.colorBorder,
          zIndex: 0,
          transition: "background-color 0.3s ease"
        }}/>

        {/* Steps */}
        {steps.map((step) => (
          <div key={step.number} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1,
            background: themeConfig.colorBackground,
            padding: "0 1rem"
          }}>
            <div style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "0.5rem",
              background: step.number <= currentStep ? themeConfig.colorAction : themeConfig.colorBackground,
              border: `2px solid ${step.number <= currentStep ? themeConfig.colorAction : themeConfig.colorBorder}`,
              color: step.number <= currentStep ? themeConfig.colorInverse : themeConfig.colorText,
              transition: "all 0.3s ease",
              fontWeight: "500"
            }}>
              {step.number}
            </div>
            <div style={{
              fontSize: "0.75rem",
              fontWeight: step.number === currentStep ? "600" : "400",
              color: step.number === currentStep ? themeConfig.colorText : themeConfig.colorSecondary,
              transition: "all 0.3s ease"
            }}>
              {step.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * App Component
 */
function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [bookingItems, setBookingItems] = useState([]);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('selectedTheme') || 'grapefruit';
  });
  const [globalLocalisation, setGlobalLocalisation] = useState("United Kingdom");
  const [detailProductId, setDetailProductId] = useState(null);
  const [showBookingNotification, setShowBookingNotification] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Add state for mobile menu

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookingItems") || "[]");
    setBookingItems(saved);
  }, []);

  function saveBooking(items) {
    localStorage.setItem("bookingItems", JSON.stringify(items));
    setBookingItems(items);
  }

  function triggerBookingNotification() {
    setShowBookingNotification(true);
    setTimeout(() => {
      setShowBookingNotification(false);
    }, 2500);
  }

  function addToBooking(trip, travelers = 1) {
    const idx = bookingItems.findIndex(x => x.id === trip.id);
    if (idx >= 0) {
      const updated = [...bookingItems];
      updated[idx].travelers = travelers;
      saveBooking(updated);
    } else {
      saveBooking([...bookingItems, { ...trip, travelers }]);
    }
    triggerBookingNotification();
  }

  function directBookNow(trip, travelers = 1) {
    // Clear any existing items and just add this one
    saveBooking([{ ...trip, travelers }]);
    // Go directly to checkout
    setCurrentPage("checkout");
  }

  function removeFromBooking(id) {
    const updated = bookingItems.filter(it => it.id !== id);
    saveBooking(updated);
  }

  function handlePaymentSuccess(response) {
    setPaymentResponse(response);
    localStorage.setItem("bookingItems", JSON.stringify([]));
    setBookingItems([]);
    setSelectedExtras([]);
    setCurrentPage("success");
  }

  function handleSearch(params) {
    setSearchParams(params);
    
    // Filter products based on search parameters
    let results = [...products];
    
    if (params.destination) {
      const searchTerm = params.destination.toLowerCase();
      results = results.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.location.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (params.type && params.type !== 'all') {
      results = results.filter(p => p.type === params.type);
    }
    
    setSearchResults(results);
    setCurrentPage("results");
  }

  function addExtra(extra) {
    if (!selectedExtras.some(e => e.id === extra.id)) {
      setSelectedExtras([...selectedExtras, extra]);
    }
  }

  function removeExtra(extraId) {
    setSelectedExtras(selectedExtras.filter(e => e.id !== extraId));
  }

  const themeConfig = themeConfigs[theme] || themeConfigs.default;

  // Add effect to save theme changes
  useEffect(() => {
    localStorage.setItem('selectedTheme', theme);
  }, [theme]);

  // Initialize icons whenever the component updates
  React.useEffect(() => {
    // Use a small delay to ensure DOM elements are fully rendered
    const timer = setTimeout(() => {
      if (window.lucide) {
        console.log("Initializing Lucide icons after page change");
        window.lucide.createIcons();
      }
    }, 150);
    
    return () => clearTimeout(timer);
  }, [currentPage, detailProductId]); // Re-run when page changes or product details change

  // Initialize icons after component mounts
  useEffect(() => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }, []);

  // Initialize icons after updates that might add new icons
  useEffect(() => {
    if (typeof lucide !== 'undefined') {
      setTimeout(() => {
        lucide.createIcons();
      }, 100);
    }
  }, [currentPage]);

  // Initialize Lucide icons after component renders or updates
  useEffect(() => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }, [currentPage, mobileMenuOpen]); // Re-run when page or menu state changes

  // Render Homepage
  function renderHomepage() {
    return (
      <div style={{ backgroundColor: themeConfig.colorBackground, color: themeConfig.colorText, minHeight: "100vh" }}>
        <HeroSection themeConfig={themeConfig} />
        
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-5xl mx-auto">
            <SearchForm onSearch={handleSearch} themeConfig={themeConfig} />
                  </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 6).map(product => (
                <DestinationCard 
                  key={product.id}
                  product={product}
                  onClick={() => { setDetailProductId(product.id); setCurrentPage("detail"); }}
                  themeConfig={themeConfig}
                />
              ))}
                </div>
              </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mt-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Featured Deals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="relative">
                    <img src="/images/bali.jpg" alt="Bali Special" className="w-full h-64 object-cover" />
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full font-bold">
                      20% OFF
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2" style={{ color: themeConfig.colorText }}>Bali Summer Special</h3>
                    <p className="text-gray-600 mb-4">Experience the beauty of Bali with our exclusive summer package.</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-bold" style={{ color: themeConfig.colorAction }}>£719.99</p>
                        <p className="text-sm line-through text-gray-500">£899.99</p>
                      </div>
                      <button 
                        className="btn-primary px-4 py-2"
                        onClick={() => { setDetailProductId(2); setCurrentPage("detail"); }}
                        style={{
                          backgroundColor: themeConfig.colorAction,
                          color: themeConfig.colorInverse,
                          borderRadius: themeConfig.borderRadius[0]
                        }}
                      >
                        View Deal
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="relative">
                    <img src="/images/santorini.jpg" alt="Santorini Special" className="w-full h-64 object-cover" />
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full font-bold">
                      15% OFF
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2" style={{ color: themeConfig.colorText }}>Santorini Luxury Escape</h3>
                    <p className="text-gray-600 mb-4">Enjoy breathtaking views and luxury accommodations in Santorini.</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-bold" style={{ color: themeConfig.colorAction }}>£1,104.99</p>
                        <p className="text-sm line-through text-gray-500">£1,299.99</p>
                      </div>
                      <button 
                        className="btn-primary px-4 py-2"
                        onClick={() => { setDetailProductId(9); setCurrentPage("detail"); }}
                        style={{
                          backgroundColor: themeConfig.colorAction,
                          color: themeConfig.colorInverse,
                          borderRadius: themeConfig.borderRadius[0]
                        }}
                      >
                        View Deal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Why Choose TravelEase</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full" style={{ backgroundColor: themeConfig.colorAction + '20' }}>
                  <i data-lucide="shield-check" className="w-8 h-8" style={{ color: themeConfig.colorAction }}></i>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: themeConfig.colorText }}>Secure Booking</h3>
                <p style={{ color: themeConfig.colorSecondary }}>Your payments and personal information are always protected.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full" style={{ backgroundColor: themeConfig.colorAction + '20' }}>
                  <i data-lucide="tag" className="w-8 h-8" style={{ color: themeConfig.colorAction }}></i>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: themeConfig.colorText }}>Best Price Guarantee</h3>
                <p style={{ color: themeConfig.colorSecondary }}>We promise you'll get the best rates on all bookings.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full" style={{ backgroundColor: themeConfig.colorAction + '20' }}>
                  <i data-lucide="headphones" className="w-8 h-8" style={{ color: themeConfig.colorAction }}></i>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: themeConfig.colorText }}>24/7 Support</h3>
                <p style={{ color: themeConfig.colorSecondary }}>Our travel experts are available around the clock to assist you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Search Results
  function renderSearchResults() {
    return (
      <div style={{ backgroundColor: themeConfig.colorBackground, color: themeConfig.colorText, minHeight: "100vh", paddingBottom: "2rem" }}>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Search Results</h1>
            {searchParams && (
              <div className="text-sm" style={{ color: themeConfig.colorSecondary }}>
                {searchParams.destination && <span>Destination: <strong>{searchParams.destination}</strong> | </span>}
                <span>Dates: <strong>{searchParams.departureDate} to {searchParams.returnDate}</strong> | </span>
                <span>Travelers: <strong>{searchParams.travelers}</strong></span>
                {searchParams.type !== 'all' && <span> | Type: <strong>{searchParams.type.charAt(0).toUpperCase() + searchParams.type.slice(1)}</strong></span>}
              </div>
            )}
          </div>
          
          {searchResults.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <i data-lucide="search-x" className="w-16 h-16 mx-auto mb-4" style={{ color: themeConfig.colorSecondary }}></i>
              <h2 className="text-xl font-bold mb-2" style={{ color: themeConfig.colorText }}>No Results Found</h2>
              <p className="mb-4" style={{ color: themeConfig.colorSecondary }}>We couldn't find any trips matching your search criteria.</p>
              <button 
                onClick={() => setCurrentPage("home")}
                className="btn-primary px-4 py-2"
                style={{
                  backgroundColor: themeConfig.colorAction,
                  color: themeConfig.colorInverse,
                  borderRadius: themeConfig.borderRadius[0]
                }}
              >
                Back to Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(product => (
                <DestinationCard 
                  key={product.id}
                  product={product}
                  onClick={() => { setDetailProductId(product.id); setCurrentPage("detail"); }}
                  themeConfig={themeConfig}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="site-header">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-16 px-4">
            <button 
              onClick={() => { setDetailProductId(null); setCurrentPage("home"); }} 
              style={{ 
                color: themeConfig.colorAction,
                fontSize: "1.5rem",
                fontWeight: "700",
                letterSpacing: "1px",
                padding: "0.5rem 0.75rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Poppins', sans-serif",
                display: "flex",
                alignItems: "center",
                transition: "all 0.2s ease",
                position: "relative"
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
              onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
            >
              <span style={{
                display: "inline-block",
                transform: "translateY(1px)"
              }}>
                TravelEase
              </span>
            </button>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a 
                href="#" 
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setCurrentPage("home"); }}
              >
                Home
              </a>
              <a 
                href="#" 
                className={`nav-link ${currentPage === 'destinations' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setCurrentPage("results"); setSearchResults(products); }}
              >
                Destinations
              </a>
              <a 
                href="#" 
                className={`nav-link ${currentPage === 'deals' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setCurrentPage("deals"); }}
              >
                Deals
              </a>
              <a 
                href="#" 
                className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setCurrentPage("about"); }}
              >
                About
              </a>
              <a 
                href="#" 
                className="nav-link"
                onClick={(e) => { e.preventDefault(); }}
              >
                Contact
              </a>
            </nav>
            
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button 
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <span data-lucide={mobileMenuOpen ? "x" : "menu"} className="w-6 h-6"></span>
              </button>
              
              <button 
                onClick={() => { setCurrentPage("account"); }} 
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
                style={{ color: themeConfig.colorAction }}
                aria-label="My Account"
              >
                <span data-lucide="user" className="w-6 h-6"></span>
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white shadow-lg rounded-b-lg overflow-hidden">
              <nav className="flex flex-col py-2">
                <a 
                  href="#" 
                  className={`nav-link mobile-nav-link px-4 py-2 ${currentPage === 'home' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setCurrentPage("home"); setMobileMenuOpen(false); }}
                >
                  Home
                </a>
                <a 
                  href="#" 
                  className={`nav-link mobile-nav-link px-4 py-2 ${currentPage === 'destinations' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setCurrentPage("results"); setSearchResults(products); setMobileMenuOpen(false); }}
                >
                  Destinations
                </a>
                <a 
                  href="#" 
                  className={`nav-link mobile-nav-link px-4 py-2 ${currentPage === 'deals' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setCurrentPage("deals"); setMobileMenuOpen(false); }}
                >
                  Deals
                </a>
                <a 
                  href="#" 
                  className={`nav-link mobile-nav-link px-4 py-2 ${currentPage === 'about' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setCurrentPage("about"); setMobileMenuOpen(false); }}
                >
                  About
                </a>
                <a 
                  href="#" 
                  className="nav-link mobile-nav-link px-4 py-2"
                  onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }}
                >
                  Contact
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {currentPage === "home" && renderHomepage()}
      {currentPage === "results" && renderSearchResults()}
      {currentPage === "detail" && detailProductId && (
        <TripDetailPage
          productId={detailProductId}
          theme={theme}
          themeConfig={themeConfigs[theme] || themeConfigs.default}
          onAddToBooking={addToBooking}
          onDirectBookNow={directBookNow}
          onViewDetail={(rid) => { setDetailProductId(rid); setCurrentPage("detail"); }}
          onBackToResults={() => { 
            if (searchResults.length > 0) {
              setCurrentPage("results");
            } else {
              setDetailProductId(null); 
              setCurrentPage("home"); 
            }
          }}
          globalLocalisation={globalLocalisation}
        />
      )}
      {currentPage === "deals" && (
        <DealsPage 
          themeConfig={themeConfigs[theme] || themeConfigs.default} 
          onViewDetail={(id) => { setDetailProductId(id); setCurrentPage("detail"); }}
        />
      )}
      {currentPage === "about" && (
        <AboutPage 
          themeConfig={themeConfigs[theme] || themeConfigs.default}
        />
      )}
      {currentPage === "booking" && (
        <BookingPage
          items={bookingItems}
          onRemoveItem={removeFromBooking}
          onCheckout={() => setCurrentPage("checkout")}
          onBackToHome={() => { setDetailProductId(null); setCurrentPage("home"); }}
          themeConfig={themeConfigs[theme] || themeConfigs.default}
          globalLocalisation={globalLocalisation}
        />
      )}
      {currentPage === "checkout" && (
        <CheckoutPage
          items={bookingItems}
          theme={theme}
          themeConfig={themeConfigs[theme] || themeConfigs.default}
          onPaymentSuccess={handlePaymentSuccess}
          onRemoveOneItem={removeFromBooking}
          selectedExtras={selectedExtras}
          onAddExtra={addExtra}
          onRemoveExtra={removeExtra}
          globalLocalisation={globalLocalisation}
          onLocalisationChange={(newLoc) => setGlobalLocalisation(newLoc)}
          onBackToCart={() => setCurrentPage("booking")}
        />
      )}
      {currentPage === "account" && (
        <MyAccountPage themeConfig={themeConfigs[theme] || themeConfigs.default} globalLocalisation={globalLocalisation} />
      )}
      {currentPage === "success" && paymentResponse && (
        <PaymentSuccessPage
          paymentResponse={paymentResponse}
          themeConfig={themeConfigs[theme] || themeConfigs.default}
          onBackToHome={() => { setCurrentPage("home"); setPaymentResponse(null); }}
        />
      )}

      <footer
        style={{
          backgroundColor: themeConfig.colorAction,
          color: themeConfig.colorInverse,
          padding: "3rem 0 1rem"
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">TravelEase</h3>
              <p className="text-sm opacity-80 mb-4">Your trusted partner for unforgettable travel experiences. Discover the world with confidence and ease.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-white/80">
                  <i data-lucide="facebook" className="w-5 h-5"></i>
                </a>
                <a href="#" className="text-white hover:text-white/80">
                  <i data-lucide="twitter" className="w-5 h-5"></i>
                </a>
                <a href="#" className="text-white hover:text-white/80">
                  <i data-lucide="instagram" className="w-5 h-5"></i>
                </a>
                <a href="#" className="text-white hover:text-white/80">
                  <i data-lucide="youtube" className="w-5 h-5"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Destinations</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Europe</a></li>
                <li><a href="#" className="hover:underline">Asia</a></li>
                <li><a href="#" className="hover:underline">North America</a></li>
                <li><a href="#" className="hover:underline">South America</a></li>
                <li><a href="#" className="hover:underline">Africa</a></li>
                <li><a href="#" className="hover:underline">Australia & Oceania</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Travel Types</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Beach Holidays</a></li>
                <li><a href="#" className="hover:underline">City Breaks</a></li>
                <li><a href="#" className="hover:underline">Adventure Travel</a></li>
                <li><a href="#" className="hover:underline">Luxury Escapes</a></li>
                <li><a href="#" className="hover:underline">Family Vacations</a></li>
                <li><a href="#" className="hover:underline">Cruises</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Contact Us</a></li>
                <li><a href="#" className="hover:underline">FAQs</a></li>
                <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/20 text-sm">
            <p>© 2023 TravelEase. All rights reserved.</p>
            
            <div className="flex items-center mt-4 md:mt-0">
            <label
                className="font-medium mr-2"
            >
              Theme:
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="rounded-md border-none p-1 text-sm"
              style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "none",
                padding: "0.5rem",
                borderRadius: themeConfig.borderRadius[0]
              }}
            >
              <option value="default">Default</option>
              <option value="midnight">Midnight</option>
              <option value="simplicity">Simplicity</option>
              <option value="grapefruit">Grapefruit</option>
            </select>
              
            <label
                className="font-medium ml-6 mr-2"
            >
                Region:
            </label>
            <select
              value={globalLocalisation}
              onChange={(e) => setGlobalLocalisation(e.target.value)}
              className="rounded-md border-none p-1 text-sm"
              style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "none",
                padding: "0.5rem",
                borderRadius: themeConfig.borderRadius[0]
              }}
            >
              <option value="United Kingdom">United Kingdom</option>
              <option value="NL">Netherlands</option>
              <option value="FR">France</option>
              <option value="BE">Belgium</option>
              <option value="PL">Poland</option>
              <option value="PT">Portugal</option>
              <option value="AT">Austria</option>
              <option value="SA">Saudi Arabia</option>
            </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Render the app
ReactDOM.render(
  <App />,
  document.getElementById('root')
);