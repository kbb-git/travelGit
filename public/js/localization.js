// Localization System for Payment Methods with Checkout.com Flow

/**
 * Currency Mapping Function
 * Maps country code to currency
 */
function getCurrency(localization) {
  switch (localization) {
    case "NL":
    case "FR":
    case "PL":
    case "PT":
    case "BE":
    case "AT":
      return "EUR";
    case "SA":
      return "SAR";
    default:
      return "GBP";
  }
}

/**
 * Locale Mapping Function
 * Maps country code to locale
 */
function getLocale(localization) {
  switch (localization) {
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

/**
 * Payment Methods Configuration
 * Maps country code to available payment methods
 */
function getPaymentMethods(localization) {
  // Handle both cases: when localization is a country code string or an object
  let countryCode;
  
  if (typeof localization === 'string') {
    // If localization is just a country code string
    countryCode = localization;
  } else if (localization && localization.country) {
    // If localization is an object with country property
    countryCode = localization.country;
  } else {
    // Default to GB if no valid country is provided
    countryCode = 'GB';
  }
  
  // Ensure countryCode is uppercase
  countryCode = countryCode.toUpperCase();
  
  // Return the correct payment methods for each country
  switch (countryCode) {
    case "NL":
      return ["card", "googlepay", "ideal", "klarna"];
    case "SA":
      return ["card", "googlepay", "tamara", "stcpay"];
    case "FR":
      return ["card", "googlepay", "sepa", "alma"];
    case "PL":
      return ["card", "googlepay", "p24"];
    case "PT":
      return ["card", "googlepay", "multibanco", "mbway"];
    case "BE":
      return ["card", "googlepay", "bancontact"];
    case "AT":
      return ["card", "googlepay", "eps"];
    case "GB":
      return ["card", "googlepay", "klarna"];
    default:
      return ["card", "googlepay", "klarna"];
  }
}

/**
 * Default Billing/Shipping Addresses
 * Maps country code to default addresses
 */
const addressesByCountry = {
  GB: { address_line1: "221B Baker Street", city: "London", zip: "NW1 6XE", country: "GB" },
  NL: { address_line1: "Kerkstraat 1", city: "Amsterdam", state: "", zip: "1012JS", country: "NL" },
  SA: { address_line1: "King Fahd Road", city: "Riyadh", state: "Riyadh", zip: "11564", country: "SA" },
  FR: { address_line1: "10 Rue de Rivoli", city: "Paris", state: "", zip: "75001", country: "FR" },
  PL: { address_line1: "ul. Marszałkowska 1", city: "Warsaw", state: "", zip: "00-001", country: "PL" },
  PT: { address_line1: "Av. da Liberdade 100", city: "Lisbon", state: "", zip: "1250-096", country: "PT" },
  BE: { address_line1: "Rue Neuve 1", city: "Brussels", state: "", zip: "1000", country: "BE" },
  AT: { address_line1: "Stephansplatz 1", city: "Vienna", state: "", zip: "1010", country: "AT" }
};

/**
 * Format Price Information
 * Formats prices according to localization
 */
function formatLocalizedPrice(amount, localization) {
  const currency = getCurrency(localization);
  const locale = getLocale(localization);
  
  try {
    return new Intl.NumberFormat(locale, { 
      style: 'currency', 
      currency: currency 
    }).format(amount / 100);
  } catch (e) {
    // Fallback formatting if Intl is not supported
    const currencySymbol = getCurrencySymbol(currency);
    return `${currencySymbol}${(amount / 100).toFixed(2)}`;
  }
}

/**
 * Get Currency Symbol
 * Helper function to get currency symbol
 */
function getCurrencySymbol(currency) {
  switch (currency) {
    case "EUR": return "€";
    case "SAR": return "﷼";
    case "GBP": return "£";
    default: return currency + " ";
  }
}

/**
 * Check if locale is Right-to-Left
 * Helper function for RTL languages
 */
function isRTL(locale) {
  return ['ar', 'he'].includes(locale.split('-')[0]);
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getCurrency,
    getLocale,
    getPaymentMethods,
    addressesByCountry,
    formatLocalizedPrice,
    isRTL
  };
} else {
  // For browser environment
  window.Localization = {
    getCurrency,
    getLocale,
    getPaymentMethods,
    addressesByCountry,
    formatLocalizedPrice,
    isRTL
  };
} 