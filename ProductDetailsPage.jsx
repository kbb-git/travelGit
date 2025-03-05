// ProductDetailPage.jsx

function ProductDetailPage({
    product,
    themeConfig,
    onPaymentSuccess
  }) {
    const [errorMessage, setErrorMessage] = React.useState("");
    const checkoutRef = React.useRef(null);
  
    // Only Google Pay (PayPal removed)
    const enabledMethods = ["googlepay"];
    const disabledMethods = ["card", "klarna"];
  
    React.useEffect(() => {
      // Destroy old instance if re-render
      return () => {
        if (checkoutRef.current && typeof checkoutRef.current.destroy === "function") {
          checkoutRef.current.destroy();
        }
      };
    }, []);
  
    React.useEffect(() => {
      initializeExpressCheckout();
    }, [product]);
  
    const initializeExpressCheckout = async () => {
      try {
        // Single item in minor units
        const amount = Math.round(product.price * 100);
  
        // Build item object (including required reference)
        const items = [{
          name: product.name,
          quantity: 1,
          reference: "SKU-" + product.id,
          unit_price: amount,
          total_amount: amount
        }];
  
        // Create payment session request
        const response = await fetch("/api/create-payment-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            currency: "GBP",
            items,
            customer: { email: "john.doe@example.com", name: "John Doe" },
            billing: {
              address: {
                address_line1: "123 Test Street",
                city: "London",
                state: "LDN",
                zip: "W1T 4TJ",
                country: "GB"
              }
            },
            description: "Your order from MyStore",
            payment_method_configuration: {},
            enabled_payment_methods: enabledMethods,
            disabled_payment_methods: disabledMethods
          })
        });
  
        if (!response.ok) {
          throw new Error("Failed to create payment session");
        }
  
        const paymentSession = await response.json();
        const appearance = {
          colorAction: themeConfig.colorAction,
          colorBackground: themeConfig.colorFormBackground,
          colorBorder: themeConfig.colorBorder,
          colorPrimary: themeConfig.colorText,
          // ...additional styling if needed
        };
  
        const checkout = await CheckoutWebComponents({
          publicKey: "pk_sbox_e5v4rg3sztzmdusp47pvdg53kmc",
          environment: "sandbox",
          paymentSession,
          locale: "en-GB",
          appearance,
          onReady: () => {
            console.log("Express Checkout (Google Pay) ready");
          },
          onPaymentCompleted: (_component, result) => {
            console.log("Express payment completed:", result);
            if (onPaymentSuccess) onPaymentSuccess();
            window.location.href = "/success";
          },
          onError: (err) => {
            console.error("Express checkout error:", err);
            setErrorMessage(err.message || "Express checkout failed.");
          }
        });
  
        checkoutRef.current = checkout;
        const flow = checkout.create("flow");
        flow.mount("#express-checkout-container");
      } catch (error) {
        console.error("Express Checkout init error:", error);
        setErrorMessage("Could not initialize express checkout.");
      }
    };
  
    // Basic styling for the page and container
    const pageStyle = {
      backgroundColor: themeConfig.colorBackground,
      color: themeConfig.colorText,
      minHeight: "100vh",
      padding: "2rem"
    };
  
    const containerStyle = {
      backgroundColor: themeConfig.colorFormBackground,
      border: `1px solid ${themeConfig.colorBorder}`,
      borderRadius: themeConfig.borderRadius[0] || "4px",
      padding: "1rem"
    };
  
    return (
      <div style={pageStyle}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            {product.name}
          </h1>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              borderRadius: "8px"
            }}
          />
          <p style={{ marginTop: "1rem", color: themeConfig.colorSecondary }}>
            Price: £{product.price.toFixed(2)}
          </p>
          <div style={containerStyle}>
            <h2>Express Checkout</h2>
            <div
              id="express-checkout-container"
              style={{
                marginTop: "0.5rem",      // Reduced margin from 1.5rem to 0.5rem
                minHeight: "10px",        // Reduced minHeight from 200px to 100px
                backgroundColor: themeConfig.colorFormBackground,
                borderRadius: themeConfig.borderRadius && themeConfig.borderRadius[0]
                  ? themeConfig.borderRadius[0]
                  : "4px"
              }}
            ></div>
            {errorMessage && (
              <div style={{ color: "red", marginTop: "1rem" }}>
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default ProductDetailPage;
  