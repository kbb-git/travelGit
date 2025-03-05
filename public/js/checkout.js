// Cart data
const cart = [
    {
        id: 1,
        name: "Classic T-Shirt",
        price: 2500, // in cents
        quantity: 1,
        size: "M",
        color: "Black"
    }
];

// Initialize with default localization
let currentLocalization = 'GB';

document.addEventListener('DOMContentLoaded', function() {
    // Add localization selector to the page
    addLocalizationSelector();
    
    // Initialize the checkout
    initializeCheckout().catch(error => {
        console.error('Checkout initialization error:', error);
        showError('Unable to initialize checkout. Please try again later.');
    });

    // Add event listener for save card checkbox
    const saveCardCheckbox = document.getElementById('save-card-checkbox');
    if (saveCardCheckbox) {
        saveCardCheckbox.addEventListener('change', async () => {
            try {
                await initializeCheckout(); // Reinitialize with new save card preference
            } catch (error) {
                console.error('Failed to update save card preference:', error);
            }
        });
    }

    // Initialize Lucide icons if not already done
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
});

/**
 * Add localization selector to the page
 */
function addLocalizationSelector() {
    const headerElement = document.querySelector('header') || document.querySelector('.header');
    
    if (!headerElement) {
        console.warn('Could not find header element to add localization selector');
        return;
    }
    
    const selectorContainer = document.createElement('div');
    selectorContainer.className = 'ml-auto flex items-center space-x-4';
    
    const selectLabel = document.createElement('label');
    selectLabel.textContent = 'Region:';
    selectLabel.className = 'text-sm text-gray-600';
    
    const select = document.createElement('select');
    select.id = 'localization-selector';
    select.value = currentLocalization;
    select.className = 'rounded-md border-none p-1 text-sm';
    select.innerHTML = `
        <option value="GB">United Kingdom</option>
        <option value="NL">Netherlands</option>
        <option value="FR">France</option>
        <option value="BE">Belgium</option>
        <option value="PL">Poland</option>
        <option value="PT">Portugal</option>
        <option value="AT">Austria</option>
        <option value="SA">Saudi Arabia</option>
    `;
    
    select.addEventListener('change', async (e) => {
        currentLocalization = e.target.value;
        console.log(`Localization changed to: ${currentLocalization}`);
        
        // Set the page direction for RTL languages
        const locale = Localization.getLocale(currentLocalization);
        document.documentElement.dir = Localization.isRTL(locale) ? 'rtl' : 'ltr';
        
        // Reinitialize checkout with new localization
        try {
            // Clean up existing checkout if it exists
            const flowContainer = document.getElementById('flow-container');
            if (flowContainer) {
                flowContainer.innerHTML = '';
                flowContainer.classList.add('loading');
            }
            
            await initializeCheckout();
            updateOrderSummary();
        } catch (error) {
            console.error('Failed to update localization:', error);
            showError('Failed to update region settings. Please try again.');
        }
    });
    
    selectorContainer.appendChild(selectLabel);
    selectorContainer.appendChild(select);
    
    // Add the selector to the header
    headerElement.appendChild(selectorContainer);
}

async function initializeCheckout() {
    try {
        // Update order summary first
        updateOrderSummary();

        // Get save card checkbox state
        const saveCardCheckbox = document.getElementById('save-card-checkbox');
        const saveCard = saveCardCheckbox ? saveCardCheckbox.checked : false;
        
        // Calculate total amount
        const amount = calculateTotal();
        
        // Get the billing address for the current country
        const billingAddress = Localization.addressesByCountry[currentLocalization] || Localization.addressesByCountry["GB"];
        
        // Make sure country in the billing address matches the current localization
        // This is critical - the country in the billing address MUST match the localization country
        billingAddress.country = currentLocalization;
        
        // Get localized settings based on the BILLING ADDRESS country (not just currentLocalization)
        const currency = Localization.getCurrency(billingAddress.country);
        const locale = Localization.getLocale(billingAddress.country);
        
        // Get payment methods based on the billing address country
        const localizationData = {
            country: billingAddress.country,
            currency: currency,
            locale: locale || Localization.getLocale({ country: billingAddress.country, currency: currency })
        };
        const methods = Localization.getPaymentMethods(localizationData);
        console.log('Billing Country:', billingAddress.country);
        console.log('Localization Data:', localizationData);
        console.log('Payment Methods:', JSON.stringify(methods));
        
        console.log(`Checkout initialization details:`);
        console.log(`Currency: ${currency}`);
        console.log(`Locale: ${locale}`);
        console.log(`Country code: ${billingAddress.country}`);
        console.log(`Enabled Payment Methods: ${JSON.stringify(methods)}`);
        console.log(`Billing Address:`, billingAddress);
        
        // Create the payment session
        const flowContainer = document.getElementById('flow-container');
        if (flowContainer) {
            flowContainer.classList.add('loading');
        }
        
        const paymentSession = await createPaymentSession(
            amount,
            currency,
            saveCard,
            locale,
            methods,
            billingAddress
        );

        if (!paymentSession || !paymentSession.payment_session_token) {
            throw new Error('Failed to create payment session. Please try again.');
        }

        // Initialize CheckoutWebComponents with modern styling
        const checkout = await CheckoutWebComponents({
            publicKey: 'pk_sbox_e5v4rg3sztzmdusp47pvdg53kmc',
            paymentSession: paymentSession,
            environment: 'sandbox',
            locale: locale, // Use localized locale
            appearance: {
                theme: 'light',
                variables: {
                    colorPrimary: '#2563eb',
                    colorBackground: '#ffffff',
                    colorText: '#1f2937',
                    colorDanger: '#dc2626',
                    borderRadius: '0.5rem',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: '14px',
                    fontWeightNormal: '400',
                    fontWeightMedium: '500',
                    fontWeightBold: '600',
                    spacingUnit: '4px',
                    borderWidth: '1px'
                },
                rules: {
                    '.Input': {
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.375rem',
                        padding: '0.75rem',
                        fontSize: '14px'
                    },
                    '.Input:focus': {
                        borderColor: '#2563eb',
                        boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.2)',
                        outline: 'none'
                    },
                    '.Button': {
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        borderRadius: '0.375rem',
                        padding: '0.75rem 1.5rem',
                        fontSize: '14px',
                        fontWeight: '500',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                    },
                    '.Button:hover': {
                        backgroundColor: '#1d4ed8'
                    },
                    '.Button:disabled': {
                        backgroundColor: '#93c5fd',
                        cursor: 'not-allowed'
                    }
                }
            },
            onReady: () => {
                console.log('Payment components ready');
                flowContainer.classList.remove('loading');
            },
            onPaymentCompleted: async (component, paymentResponse) => {
                console.log('Payment completed:', paymentResponse);
                showSuccess('Payment completed successfully! Redirecting...');
                
                // Redirect to success page after a short delay
                setTimeout(() => {
                    window.location.href = '/success';
                }, 1500);
            },
            onError: (component, error) => {
                console.error('Payment error:', error);
                showError(error.message || 'Payment failed. Please try again.');
                flowContainer.classList.remove('loading');
            }
        });

        // Create and mount the flow component
        const flowComponent = checkout.create('flow');
        await flowComponent.mount('#flow-container');

    } catch (error) {
        console.error('Checkout initialization error:', error);
        showError('Unable to initialize checkout. Please try again later.');
        throw error;
    }
}

async function createPaymentSession(amount, currency, saveCard, locale, enabledMethods, billingAddress) {
    try {
        // Get the country code from billing address
        const countryCode = billingAddress.country;
        console.log(`Billing country: ${countryCode}`);
        
        // IMPORTANT: Get payment methods directly from Localization for the billing country
        // We will NOT use the enabledMethods parameter which might be getting modified somewhere
        const methodsForCountry = Localization.getPaymentMethods(countryCode);
        console.log(`Payment methods from localization for ${countryCode}:`, JSON.stringify(methodsForCountry));
        
        // Important: Don't modify the methods at all, use exactly what comes from localization
        const requestBody = {
            amount,
            currency,
            saveCard,
            locale: locale, // Pass the locale correctly
            reference: 'ORD-' + Math.random().toString(36).substr(2, 9),
            customer: {
                email: 'john.doe@example.com',
                name: 'John Doe'
            },
            success_url: window.location.origin + '/success',
            failure_url: window.location.origin + '/failure',
            billing: {
                address: billingAddress
            },
            // Use exactly the methods from localization - no modifications
            enabled_payment_methods: methodsForCountry,
            items: [{
                name: "Classic T-Shirt",
                quantity: 1,
                unit_price: amount,
                total_amount: amount,
                reference: "SHIRT-123"
            }]
        };
        
        console.log('Creating payment session with:', {
            amount: requestBody.amount,
            currency: requestBody.currency,
            enabled_payment_methods: requestBody.enabled_payment_methods
        });
        
        // Make the API call
        const response = await fetch('/api/create-payment-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        // Handle the response
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create payment session');
        }
        
        const result = await response.json();
        console.log('Received response from Checkout.com:', result);
        return result;
    } catch (error) {
        console.error('Error creating payment session:', error);
        throw error;
    }
}

function calculateTotal() {
    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Add delivery cost (450 = £4.50)
    const deliveryCost = 450;
    
    // Return total in cents
    return subtotal + deliveryCost;
}

function formatPrice(amount) {
    // Use the localized price formatter if available
    if (window.Localization && typeof Localization.formatLocalizedPrice === 'function') {
        return Localization.formatLocalizedPrice(amount, currentLocalization);
    }
    
    // Fallback to original format
    return `£${(amount / 100).toFixed(2)}`;
}

function updateOrderSummary() {
    try {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const deliveryCost = 450; // £4.50 in cents

        // Update subtotal, delivery, and total displays
        const elements = {
            subtotal: document.querySelector('[data-summary="subtotal"]'),
            delivery: document.querySelector('[data-summary="delivery"]'),
            total: document.querySelector('[data-summary="total"]')
        };

        if (elements.subtotal) {
            elements.subtotal.textContent = formatPrice(subtotal);
        }
        
        if (elements.delivery) {
            elements.delivery.textContent = formatPrice(deliveryCost);
        }
        
        if (elements.total) {
            elements.total.textContent = formatPrice(subtotal + deliveryCost);
        }

    } catch (error) {
        console.error('Error updating order summary:', error);
    }
}

function showError(message) {
    const errorElement = document.getElementById('error-message');
    const successElement = document.getElementById('success-message');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
    
    if (successElement) {
        successElement.classList.add('hidden');
    }

    // Scroll error into view
    errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showSuccess(message) {
    const errorElement = document.getElementById('error-message');
    const successElement = document.getElementById('success-message');
    
    if (successElement) {
        successElement.textContent = message;
        successElement.classList.remove('hidden');
    }
    
    if (errorElement) {
        errorElement.classList.add('hidden');
    }

    // Scroll success message into view
    successElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideMessages() {
    const errorElement = document.getElementById('error-message');
    const successElement = document.getElementById('success-message');
    
    if (errorElement) {
        errorElement.classList.add('hidden');
    }
    
    if (successElement) {
        successElement.classList.add('hidden');
    }
}