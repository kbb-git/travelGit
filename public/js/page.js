function CartPage({ items, onRemoveItem, onCheckout, onBackToProducts }) {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold mb-8">Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <button 
            onClick={onBackToProducts}
            className="text-blue-600 hover:text-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm">
          {/* Cart Items */}
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="flex items-center p-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="mt-1 text-gray-600">£{item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <span data-lucide="trash-2" className="w-5 h-5"></span>
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-between text-lg font-medium">
              <span>Total:</span>
              <span>£{calculateTotal().toFixed(2)}</span>
            </div>

            <div className="mt-6">
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  I want to have Click to Pay as a payment method option
                </span>
              </label>

              <button
                onClick={onCheckout}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Continue to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}