// Travel Website Components

/**
 * DestinationSelector Component
 * This component displays destinations grouped by regions/continents for easy selection
 */
function DestinationSelector({ themeConfig, onDestinationSelect }) {
  // Group destinations by regions/continents
  const destinationsByRegion = {
    "Europe": [
      { name: "Paris, France", id: 1 },
      { name: "Barcelona, Spain", id: 5 },
      { name: "Rome, Italy", id: 8 },
      { name: "Santorini, Greece", id: 9 },
      { name: "London, UK", id: 13 },
      { name: "Istanbul, Turkey", id: 15 },
      { name: "Vienna, Austria", id: 18 },
      { name: "Scottish Highlands, Scotland", id: 23 },
      { name: "Lisbon & Cascais, Portugal", id: 25 }
    ],
    "Asia": [
      { name: "Bali, Indonesia", id: 2 },
      { name: "Tokyo, Japan", id: 4 },
      { name: "Kyoto, Japan", id: 11 },
      { name: "Dubai, UAE", id: 12 },
      { name: "Maldives", id: 10 },
      { name: "Phuket & Phi Phi, Thailand", id: 20 }
    ],
    "Americas": [
      { name: "New York, USA", id: 3 },
      { name: "Cusco & Machu Picchu, Peru", id: 21 },
      { name: "San Jose & Arenal, Costa Rica", id: 24 }
    ],
    "Africa & Middle East": [
      { name: "Cape Town, South Africa", id: 17 }
    ],
    "Oceania": [
      { name: "Sydney & Cairns, Australia", id: 14 }
    ],
    "Polar Regions": [
      { name: "Reykjavik, Iceland", id: 19 }
    ]
  };

  // Styling
  const regionStyle = {
    marginBottom: '2rem'
  };

  const regionTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
    color: themeConfig.colorText,
    borderBottom: `2px solid ${themeConfig.colorAction}`,
    paddingBottom: '0.5rem'
  };

  const destinationItemStyle = {
    padding: '0.75rem',
    borderRadius: themeConfig.borderRadius[0],
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  };
  
  const hoverDestinationStyle = {
    backgroundColor: `${themeConfig.colorAction}15`
  };

  return (
    <div style={{ 
      backgroundColor: themeConfig.colorFormBackground,
      borderRadius: themeConfig.borderRadius[0],
      padding: '1.5rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    }}>
      <h2 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginBottom: '1.5rem',
        color: themeConfig.colorText
      }}>
        Select Your Destination
      </h2>
      
      {Object.entries(destinationsByRegion).map(([region, destinations]) => (
        <div key={region} style={regionStyle}>
          <h3 style={regionTitleStyle}>
            {region}
          </h3>
          <div>
            {destinations.map(destination => (
              <div 
                key={destination.id} 
                style={destinationItemStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = hoverDestinationStyle.backgroundColor;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                }}
                onClick={() => onDestinationSelect(destination.id)}
              >
                <i 
                  data-lucide="map-pin" 
                  style={{ 
                    color: themeConfig.colorAction,
                    marginRight: '0.5rem',
                    width: '1rem',
                    height: '1rem'
                  }}
                ></i>
                {destination.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Search Form Component for the homepage
 */
function SearchForm({ onSearch, themeConfig }) {
  const [searchParams, setSearchParams] = React.useState({
    destination: '',
    departureDate: '',
    returnDate: '',
    travelers: 2,
    type: 'all'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };
  
  // Get tomorrow's date for min departure date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  
  // Get min return date based on departure date
  const getMinReturnDate = () => {
    if (!searchParams.departureDate) return tomorrowStr;
    
    const departureDate = new Date(searchParams.departureDate);
    departureDate.setDate(departureDate.getDate() + 1);
    return departureDate.toISOString().split('T')[0];
  };
  
  const formStyle = {
    backgroundColor: themeConfig.colorFormBackground,
    borderRadius: themeConfig.borderRadius[0],
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  };
  
  const inputStyle = {
    borderColor: themeConfig.colorBorder,
    borderRadius: themeConfig.borderRadius[0],
    color: themeConfig.colorText,
    backgroundColor: themeConfig.colorFormBackground
  };
  
  const buttonStyle = {
    backgroundColor: themeConfig.colorAction,
    color: themeConfig.colorInverse,
    borderRadius: themeConfig.borderRadius[0],
    fontWeight: 500
  };
  
  return (
    <form onSubmit={handleSubmit} className="search-form" style={formStyle}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium mb-1" style={{ color: themeConfig.colorText }}>
            Where do you want to go?
          </label>
          <input
            type="text"
            name="destination"
            value={searchParams.destination}
            onChange={handleChange}
            placeholder="Search destinations"
            className="w-full px-4 py-2 border focus:ring-2 focus:ring-opacity-50 focus:outline-none"
            style={{ ...inputStyle, focusRing: themeConfig.colorAction }}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: themeConfig.colorText }}>
            Departure Date
          </label>
          <input
            type="date"
            name="departureDate"
            value={searchParams.departureDate}
            onChange={handleChange}
            min={tomorrowStr}
            className="w-full px-4 py-2 border focus:ring-2 focus:ring-opacity-50 focus:outline-none"
            style={inputStyle}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: themeConfig.colorText }}>
            Return Date
          </label>
          <input
            type="date"
            name="returnDate"
            value={searchParams.returnDate}
            onChange={handleChange}
            min={getMinReturnDate()}
            className="w-full px-4 py-2 border focus:ring-2 focus:ring-opacity-50 focus:outline-none"
            style={inputStyle}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: themeConfig.colorText }}>
            Travelers
          </label>
          <div className="flex">
            <select
              name="travelers"
              value={searchParams.travelers}
              onChange={handleChange}
              className="w-full px-4 py-2 border focus:ring-2 focus:ring-opacity-50 focus:outline-none"
              style={inputStyle}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
              ))}
            </select>
            
            <button 
              type="submit" 
              className="ml-2 px-6 py-2 transition-colors duration-200"
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = themeConfig.colorAction + 'dd'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = themeConfig.colorAction}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-3">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="type"
            value="all"
            checked={searchParams.type === 'all'}
            onChange={handleChange}
            className="form-radio text-blue-600"
          />
          <span className="ml-2 text-sm" style={{ color: themeConfig.colorText }}>All</span>
        </label>
        
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="type"
            value="package"
            checked={searchParams.type === 'package'}
            onChange={handleChange}
            className="form-radio text-blue-600"
          />
          <span className="ml-2 text-sm" style={{ color: themeConfig.colorText }}>Packages</span>
        </label>
        
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="type"
            value="flight"
            checked={searchParams.type === 'flight'}
            onChange={handleChange}
            className="form-radio text-blue-600"
          />
          <span className="ml-2 text-sm" style={{ color: themeConfig.colorText }}>Flights</span>
        </label>
        
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="type"
            value="hotel"
            checked={searchParams.type === 'hotel'}
            onChange={handleChange}
            className="form-radio text-blue-600"
          />
          <span className="ml-2 text-sm" style={{ color: themeConfig.colorText }}>Hotels</span>
        </label>
        
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="type"
            value="activity"
            checked={searchParams.type === 'activity'}
            onChange={handleChange}
            className="form-radio text-blue-600"
          />
          <span className="ml-2 text-sm" style={{ color: themeConfig.colorText }}>Activities</span>
        </label>
        
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="type"
            value="cruise"
            checked={searchParams.type === 'cruise'}
            onChange={handleChange}
            className="form-radio text-blue-600"
          />
          <span className="ml-2 text-sm" style={{ color: themeConfig.colorText }}>Cruises</span>
        </label>
      </div>
    </form>
  );
}

/**
 * Destination Card Component
 */
function DestinationCard({ product, onClick, themeConfig }) {
  return (
    <div 
      className="destination-card cursor-pointer" 
      onClick={onClick}
    >
      <img 
        src={product.image} 
        alt={product.name} 
        className="destination-image"
      />
      <div className="destination-content">
        <h3 className="destination-title">{product.name}</h3>
        <p className="destination-location">
          <i data-lucide="map-pin" className="w-4 h-4 inline-block mr-1"></i>
          {product.location}
        </p>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <i 
              key={i}
              data-lucide="star" 
              className="w-4 h-4 inline-block" 
              style={{ 
                fill: i < Math.floor(product.rating) ? 'gold' : 'none',
                color: i < Math.floor(product.rating) ? 'gold' : 'rgba(255,255,255,0.5)'
              }}
            ></i>
          ))}
          <span className="ml-1 text-sm text-white">
            {product.rating.toFixed(1)}
          </span>
        </div>
        <div className="flex justify-between items-end mt-2">
          <div>
            <p className="text-white font-bold">{getCurrency()} {product.price.toFixed(2)}</p>
            <p className="text-white text-sm opacity-80">{product.duration}</p>
          </div>
          <button 
            className="bg-white text-sm px-3 py-1 rounded font-medium"
            style={{
              color: themeConfig.colorAction,
              borderRadius: themeConfig.borderRadius[0]
            }}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Hero Section Component
 */
function HeroSection({ themeConfig }) {
  return (
    <div 
      className="hero-section" 
      style={{ 
        backgroundImage: 'url("/images/hero-travel.jpg")',
      }}
    >
      <div className="hero-content text-center">
        <h1 
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
        >
          Discover Your Dream Destination
        </h1>
        <p className="text-xl mb-8">Find and book the perfect trip for your next adventure</p>
      </div>
    </div>
  );
}

/**
 * DealsPage Component
 */
function DealsPage({ themeConfig, onViewDetail }) {
  // Get special deals - products with discounted prices
  const specialDeals = [
    { originalProduct: products.find(p => p.id === 2), discountPercent: 20 }, // Bali
    { originalProduct: products.find(p => p.id === 9), discountPercent: 15 }, // Santorini
    { originalProduct: products.find(p => p.id === 12), discountPercent: 25 }, // Dubai
    { originalProduct: products.find(p => p.id === 4), discountPercent: 10 }, // Tokyo
    { originalProduct: products.find(p => p.id === 10), discountPercent: 12 }, // Maldives
    { originalProduct: products.find(p => p.id === 19), discountPercent: 18 }  // Iceland
  ];

  // Calculate discounted price
  const calculateDiscountedPrice = (originalPrice, discountPercent) => {
    return originalPrice * (1 - discountPercent / 100);
  };

  // Format prices with correct currency
  const formatPrice = (price) => {
    return `${getCurrency()}${price.toFixed(2)}`;
  };

  return (
    <div style={{ backgroundColor: themeConfig.colorBackground, color: themeConfig.colorText, minHeight: "100vh" }}>
      {/* Hero Section for Deals Page */}
      <div 
        className="hero-section" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url("/images/bali.jpg")',
          height: '500px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="hero-content text-center relative z-10 px-4">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
            style={{ textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}
          >
            Exclusive Travel Deals
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
            Limited-time offers on our most popular destinations
          </p>
          <button 
            className="px-6 py-3 text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105"
            onClick={() => document.getElementById('featured-deals') && document.getElementById('featured-deals').scrollIntoView({ behavior: 'smooth' })}
            style={{
              backgroundColor: themeConfig.colorAction,
              color: themeConfig.colorInverse,
              borderRadius: themeConfig.borderRadius[0]
            }}
          >
            View Deals
          </button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12" id="featured-deals">
          <h2 className="text-3xl font-bold mb-4">Featured Deals</h2>
          <p className="text-lg" style={{ color: themeConfig.colorSecondary }}>
            Book now and save big on these exclusive limited-time offers
          </p>
        </div>
        
        {/* Featured Deals Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative">
              <img src="/images/bali.jpg" alt="Bali Special" className="w-full h-64 object-cover" />
              <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full font-bold">
                20% OFF
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2" style={{ color: themeConfig.colorText }}>Bali Summer Special</h3>
              <p className="text-gray-600 mb-4">Experience the beauty of Bali with our exclusive summer package including private villa accommodation and all meals.</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold" style={{ color: themeConfig.colorAction }}>{formatPrice(calculateDiscountedPrice(899.99, 20))}</p>
                  <p className="text-sm line-through text-gray-500">{formatPrice(899.99)}</p>
                </div>
                <button 
                  className="px-4 py-2 rounded"
                  onClick={() => onViewDetail(2)}
                  style={{
                    backgroundColor: themeConfig.colorAction,
                    color: themeConfig.colorInverse,
                    borderRadius: themeConfig.borderRadius[0]
                  }}
                >
                  Book Now
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
              <p className="text-gray-600 mb-4">Enjoy breathtaking views and luxury accommodations in Santorini with our exclusive cliffside hotel package.</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold" style={{ color: themeConfig.colorAction }}>{formatPrice(calculateDiscountedPrice(799.99, 15))}</p>
                  <p className="text-sm line-through text-gray-500">{formatPrice(799.99)}</p>
                </div>
                <button 
                  className="px-4 py-2 rounded"
                  onClick={() => onViewDetail(9)}
                  style={{
                    backgroundColor: themeConfig.colorAction,
                    color: themeConfig.colorInverse,
                    borderRadius: themeConfig.borderRadius[0]
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Deals Grid */}
        <h2 className="text-2xl font-bold mb-6">All Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {specialDeals.map(deal => {
            const { originalProduct, discountPercent } = deal;
            if (!originalProduct) return null;
            
            const discountedPrice = calculateDiscountedPrice(originalProduct.price, discountPercent);
            
            return (
              <div key={originalProduct.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={originalProduct.image} 
                    alt={originalProduct.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-yellow-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                    {discountPercent}% OFF
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1" style={{ color: themeConfig.colorText }}>{originalProduct.name}</h3>
                  <div className="flex items-center mb-2">
                    <i data-lucide="map-pin" className="w-4 h-4 mr-1" style={{ color: themeConfig.colorSecondary }}></i>
                    <span className="text-sm" style={{ color: themeConfig.colorSecondary }}>{originalProduct.location}</span>
                  </div>
                  <p className="text-sm mb-3 line-clamp-2" style={{ color: themeConfig.colorSecondary }}>
                    {originalProduct.description}
                  </p>
                  <div className="flex items-center text-sm mb-2" style={{ color: themeConfig.colorSecondary }}>
                    <i data-lucide="calendar" className="w-4 h-4 mr-1"></i>
                    <span>{originalProduct.duration}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="font-bold" style={{ color: themeConfig.colorAction }}>{formatPrice(discountedPrice)}</p>
                      <p className="text-xs line-through" style={{ color: themeConfig.colorSecondary }}>{formatPrice(originalProduct.price)}</p>
                    </div>
                    <button 
                      className="px-3 py-1 text-sm rounded"
                      onClick={() => onViewDetail(originalProduct.id)}
                      style={{
                        backgroundColor: themeConfig.colorAction,
                        color: themeConfig.colorInverse,
                        borderRadius: themeConfig.borderRadius[0]
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Last Minute Deals Section */}
        <h2 className="text-2xl font-bold mb-6">Last Minute Deals</h2>
        <div className="bg-white rounded-lg p-6 shadow-md mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 flex flex-col justify-between">
              <div>
                <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-white bg-red-500 rounded-full">
                  48 HOURS ONLY
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: themeConfig.colorText }}>
                  Dubai Luxury Getaway - Flash Sale
                </h3>
                <p className="mb-4" style={{ color: themeConfig.colorSecondary }}>
                  Experience the height of luxury in Dubai with our premium flash sale package. 
                  Includes 5-star accommodation, desert safari, Burj Khalifa entry, and yacht cruise.
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <i data-lucide="calendar" className="w-4 h-4 mr-1" style={{ color: themeConfig.colorSecondary }}></i>
                    <span className="text-sm" style={{ color: themeConfig.colorSecondary }}>6 days, 5 nights</span>
                  </div>
                  <div className="flex items-center">
                    <i data-lucide="map-pin" className="w-4 h-4 mr-1" style={{ color: themeConfig.colorSecondary }}></i>
                    <span className="text-sm" style={{ color: themeConfig.colorSecondary }}>Dubai, UAE</span>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold" style={{ color: themeConfig.colorAction }}>{formatPrice(974.99)}</p>
                  <p className="text-base line-through" style={{ color: themeConfig.colorSecondary }}>{formatPrice(1299.99)}</p>
                </div>
                <button 
                  className="px-5 py-2 rounded"
                  onClick={() => onViewDetail(12)}
                  style={{
                    backgroundColor: themeConfig.colorAction,
                    color: themeConfig.colorInverse,
                    borderRadius: themeConfig.borderRadius[0]
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
            <div className="relative">
              <img src="/images/dubai.jpg" alt="Dubai Last Minute Deal" className="w-full h-full object-cover rounded-lg" />
              <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                25% OFF
              </div>
            </div>
          </div>
        </div>

        {/* Seasonal Promotions */}
        <h2 className="text-2xl font-bold mb-6">Winter Escapes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative">
              <img src="/images/iceland.jpg" alt="Northern Lights Iceland" className="w-full h-56 object-cover" />
              <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full font-bold">
                18% OFF
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold mb-2" style={{ color: themeConfig.colorText }}>Northern Lights Adventure</h3>
              <p className="text-sm mb-3" style={{ color: themeConfig.colorSecondary }}>
                Chase the magical Northern Lights and explore Iceland's stunning winter landscapes.
                Package includes Northern Lights tour, Golden Circle tour, and Blue Lagoon entry.
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-bold" style={{ color: themeConfig.colorAction }}>{formatPrice(calculateDiscountedPrice(1399.99, 18))}</p>
                  <p className="text-xs line-through" style={{ color: themeConfig.colorSecondary }}>{formatPrice(1399.99)}</p>
                </div>
                <button 
                  className="px-3 py-1 text-sm rounded"
                  onClick={() => onViewDetail(19)}
                  style={{
                    backgroundColor: themeConfig.colorAction,
                    color: themeConfig.colorInverse,
                    borderRadius: themeConfig.borderRadius[0]
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative">
              <img src="/images/tokyo.jpg" alt="Tokyo Winter Special" className="w-full h-56 object-cover" />
              <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full font-bold">
                10% OFF
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold mb-2" style={{ color: themeConfig.colorText }}>Tokyo Winter Discovery</h3>
              <p className="text-sm mb-3" style={{ color: themeConfig.colorSecondary }}>
                Experience Tokyo's unique winter charm with fewer crowds. 
                Package includes guided city tours, bullet train experience, and traditional tea ceremony.
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-bold" style={{ color: themeConfig.colorAction }}>{formatPrice(calculateDiscountedPrice(1299.99, 10))}</p>
                  <p className="text-xs line-through" style={{ color: themeConfig.colorSecondary }}>{formatPrice(1299.99)}</p>
                </div>
                <button 
                  className="px-3 py-1 text-sm rounded"
                  onClick={() => onViewDetail(4)}
                  style={{
                    backgroundColor: themeConfig.colorAction,
                    color: themeConfig.colorInverse,
                    borderRadius: themeConfig.borderRadius[0]
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust signals and newsletter */}
        <div className="bg-white rounded-lg p-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: themeConfig.colorText }}>Why Book With Us</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <i data-lucide="shield-check" className="w-5 h-5" style={{ color: 'green' }}></i>
                  </div>
                  <div>
                    <h4 className="font-bold" style={{ color: themeConfig.colorText }}>Best Price Guarantee</h4>
                    <p className="text-sm" style={{ color: themeConfig.colorSecondary }}>
                      Find a lower price elsewhere? We'll match it and give you an extra 10% off.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <i data-lucide="calendar" className="w-5 h-5" style={{ color: 'blue' }}></i>
                  </div>
                  <div>
                    <h4 className="font-bold" style={{ color: themeConfig.colorText }}>Free Cancellation</h4>
                    <p className="text-sm" style={{ color: themeConfig.colorSecondary }}>
                      Flexible bookings with free cancellation up to 48 hours before departure.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <i data-lucide="headphones" className="w-5 h-5" style={{ color: 'purple' }}></i>
                  </div>
                  <div>
                    <h4 className="font-bold" style={{ color: themeConfig.colorText }}>24/7 Support</h4>
                    <p className="text-sm" style={{ color: themeConfig.colorSecondary }}>
                      Our travel experts are available around the clock to assist you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: themeConfig.colorText }}>Get Exclusive Deals</h3>
              <p className="mb-4" style={{ color: themeConfig.colorSecondary }}>
                Subscribe to our newsletter and be the first to know about our special offers and promotions.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-2 border rounded-l"
                  style={{ 
                    borderColor: themeConfig.colorBorder,
                    color: themeConfig.colorText
                  }}
                />
                <button 
                  className="px-4 py-2 rounded-r"
                  style={{
                    backgroundColor: themeConfig.colorAction,
                    color: themeConfig.colorInverse,
                  }}
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs mt-2" style={{ color: themeConfig.colorSecondary }}>
                We respect your privacy. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * AboutPage Component
 */
function AboutPage({ themeConfig }) {
  return (
    <div style={{ backgroundColor: themeConfig.colorBackground, color: themeConfig.colorText, minHeight: "100vh" }}>
      {/* Hero Section for About Page */}
      <div 
        className="hero-section" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url("/images/swiss-alps.jpg")',
          height: '450px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="hero-content text-center relative z-10">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
            style={{ textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}
          >
            About TravelEase
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
            Your trusted partner for unforgettable travel experiences
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-lg mb-4" style={{ color: themeConfig.colorSecondary }}>
            Founded in 2010, TravelEase began with a simple mission: to make travel planning as enjoyable as the journey itself.
          </p>
          <p className="mb-4" style={{ color: themeConfig.colorSecondary }}>
            What started as a small operation with a handful of destinations has grown into a global travel platform offering thousands of curated experiences across all seven continents. Despite our growth, we've remained committed to our founding principles of exceptional service, transparency, and creating unforgettable travel memories.
          </p>
          <p className="mb-4" style={{ color: themeConfig.colorSecondary }}>
            Our team of passionate travelers and industry experts work tirelessly to source the best accommodations, tours, and experiences around the world. We personally visit and vet each destination we offer, ensuring that every TravelEase customer receives an authentic and high-quality travel experience.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-4 text-center">Our Team</h2>
          <p className="mb-4" style={{ color: themeConfig.colorSecondary }}>
            Behind TravelEase is a diverse team of travel enthusiasts, tech experts, and customer service specialists united by a common passion for exploration and discovery.
          </p>
          <p className="mb-4" style={{ color: themeConfig.colorSecondary }}>
            Our team members come from over 20 different countries and collectively speak more than 15 languages, bringing global perspectives and local insights to every aspect of our service.
          </p>
          <p className="mb-4" style={{ color: themeConfig.colorSecondary }}>
            We believe that travel has the power to transform lives, broaden horizons, and create meaningful connections across cultures. This belief drives everything we do, from the destinations we feature to the user experience we design.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-8 mb-16" style={{ backgroundColor: `${themeConfig.colorAction}15` }}>
          <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full" 
                style={{ backgroundColor: `${themeConfig.colorAction}25` }}>
                <i data-lucide="heart" className="w-8 h-8" style={{ color: themeConfig.colorAction }}></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Passion for Travel</h3>
              <p style={{ color: themeConfig.colorSecondary }}>
                We're travelers first and foremost, bringing authentic enthusiasm to every trip we plan.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full" 
                style={{ backgroundColor: `${themeConfig.colorAction}25` }}>
                <i data-lucide="shield" className="w-8 h-8" style={{ color: themeConfig.colorAction }}></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Trust & Reliability</h3>
              <p style={{ color: themeConfig.colorSecondary }}>
                Your safety and satisfaction are our top priorities, guiding every decision we make.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full" 
                style={{ backgroundColor: `${themeConfig.colorAction}25` }}>
                <i data-lucide="globe" className="w-8 h-8" style={{ color: themeConfig.colorAction }}></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Sustainability</h3>
              <p style={{ color: themeConfig.colorSecondary }}>
                We're committed to promoting responsible tourism and minimizing our environmental impact.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Recognition</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="h-16 w-16 mx-auto mb-2 flex items-center justify-center rounded-full bg-blue-50">
                <i data-lucide="award" className="w-8 h-8 text-blue-500"></i>
              </div>
              <p className="font-medium">Best Travel Platform 2023</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="h-16 w-16 mx-auto mb-2 flex items-center justify-center rounded-full bg-green-50">
                <i data-lucide="star" className="w-8 h-8 text-green-500"></i>
              </div>
              <p className="font-medium">Customer Service Excellence</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="h-16 w-16 mx-auto mb-2 flex items-center justify-center rounded-full bg-teal-50">
                <i data-lucide="leaf" className="w-8 h-8 text-teal-500"></i>
              </div>
              <p className="font-medium">Sustainable Tourism Award</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="h-16 w-16 mx-auto mb-2 flex items-center justify-center rounded-full bg-purple-50">
                <i data-lucide="lightbulb" className="w-8 h-8 text-purple-500"></i>
              </div>
              <p className="font-medium">Top 10 Travel Innovators</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <img 
              src="/images/barcelona.jpg" 
              alt="TravelEase Office" 
              className="rounded-lg shadow-md w-full h-auto object-cover"
              style={{ height: "300px" }}
            />
          </div>
          <div>
            <img 
              src="/images/santorini.jpg" 
              alt="Happy Travelers" 
              className="rounded-lg shadow-md w-full h-auto object-cover"
              style={{ height: "300px" }}
            />
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Join Us on Your Next Adventure</h2>
          <p className="mb-6" style={{ color: themeConfig.colorSecondary }}>
            Whether you're dreaming of a relaxing beach getaway, an exciting urban exploration, or an adventurous trek through untamed wilderness, TravelEase is here to make your travel dreams a reality.
          </p>
          <button 
            className="px-6 py-3 rounded-lg"
            style={{
              backgroundColor: themeConfig.colorAction,
              color: themeConfig.colorInverse,
              borderRadius: themeConfig.borderRadius[0]
            }}
          >
            Explore Our Destinations
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * TravelExtras Component
 */
function TravelExtras({ onAddExtra, themeConfig }) {
  const extras = [
    { id: 1, name: 'Travel Insurance', price: 49.99, image: '/images/insurance.jpg', description: 'Comprehensive travel insurance for your peace of mind.' },
    { id: 2, name: 'Airport Transfer', price: 29.99, image: '/images/transfer.jpg', description: 'Convenient airport pickup and drop-off service.' },
    { id: 3, name: 'Priority Boarding', price: 15.99, image: '/images/boarding.jpg', description: 'Skip the lines with priority boarding.' },
    { id: 4, name: 'Extra Luggage', price: 39.99, image: '/images/luggage.jpg', description: 'Additional 23kg checked baggage allowance.' }
  ];
  
  return (
    <div className="extras-section">
      <h3 className="extras-title" style={{ color: themeConfig.colorText }}>Enhance Your Trip</h3>
      <div className="space-y-4">
        {extras.map(extra => (
          <div key={extra.id} className="extra-item">
            <img src={extra.image} alt={extra.name} className="extra-item-image" />
            <div className="extra-item-content">
              <h4 className="extra-item-title" style={{ color: themeConfig.colorText }}>{extra.name}</h4>
              <p className="text-sm" style={{ color: themeConfig.colorSecondary }}>{extra.description}</p>
              <p className="extra-item-price">{getCurrency()} {extra.price.toFixed(2)}</p>
            </div>
            <button 
              className="btn-outline text-sm px-3 py-1"
              onClick={() => onAddExtra(extra)}
              style={{
                borderColor: themeConfig.colorAction,
                color: themeConfig.colorAction,
                borderRadius: themeConfig.borderRadius[0]
              }}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Booking Summary Component
 */
function BookingSummary({ booking, extras, themeConfig }) {
  const calculateSubtotal = () => {
    const bookingPrice = booking.price * booking.travelers;
    const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0);
    return bookingPrice + extrasTotal;
  };
  
  const calculateTaxes = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTaxes();
  };
  
  return (
    <div className="booking-summary">
      <h3 className="text-lg font-semibold mb-4" style={{ color: themeConfig.colorText }}>Booking Summary</h3>
      
      <div className="summary-item">
        <span style={{ color: themeConfig.colorText }}>Package ({booking.travelers} {booking.travelers === 1 ? 'traveler' : 'travelers'})</span>
        <span style={{ color: themeConfig.colorText }}>{getCurrency()} {(booking.price * booking.travelers).toFixed(2)}</span>
      </div>
      
      {extras.length > 0 && extras.map(extra => (
        <div key={extra.id} className="summary-item">
          <span style={{ color: themeConfig.colorText }}>{extra.name}</span>
          <span style={{ color: themeConfig.colorText }}>{getCurrency()} {extra.price.toFixed(2)}</span>
        </div>
      ))}
      
      <div className="summary-item">
        <span style={{ color: themeConfig.colorText }}>Taxes & Fees</span>
        <span style={{ color: themeConfig.colorText }}>{getCurrency()} {calculateTaxes().toFixed(2)}</span>
      </div>
      
      <div className="summary-total">
        <span style={{ color: themeConfig.colorText }}>Total</span>
        <span style={{ color: themeConfig.colorAction }}>{getCurrency()} {calculateTotal().toFixed(2)}</span>
      </div>
    </div>
  );
}

/**
 * Trip Detail Page Component
 */
function TripDetailPage({ productId, theme, themeConfig, onAddToBooking, onDirectBookNow, onViewDetail, onBackToResults, globalLocalisation }) {
  const [product, setProduct] = React.useState(null);
  const [travelers, setTravelers] = React.useState(2);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showItinerary, setShowItinerary] = React.useState(false);
  const checkoutRef = React.useRef(null);
  
  React.useEffect(() => {
    const found = products.find(p => p.id === productId);
    if (found) {
      setProduct(found);
      setSelectedDate(found.departureDate);
    }
    
    return () => {
      if (checkoutRef.current && typeof checkoutRef.current.destroy === "function") {
        checkoutRef.current.destroy();
      }
    };
  }, [productId]);

  // Add an effect to explicitly initialize icons when the component renders
  React.useEffect(() => {
    // Use a small delay to ensure DOM elements are fully rendered
    const timer = setTimeout(() => {
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [product]); // Re-run when product changes

  React.useEffect(() => {
    if (!product) return;
    initializeExpressCheckout();
    
    return () => {
      if (checkoutRef.current && typeof checkoutRef.current.destroy === "function") {
        checkoutRef.current.destroy();
      }
    };
  }, [product, travelers, selectedDate, theme, globalLocalisation]);

  async function initializeExpressCheckout() {
    try {
      const amount = Math.round(product.price * travelers * 100);
      const items = [{
        name: product.name,
        quantity: 1,
        reference: "TRIP-" + product.id,
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
          currency: getCurrency(globalLocalisation),
          items,
          customer: { email: "john.doe@example.com", name: "John Doe" },
          billing: { address: billingAddress },
          description: `${product.name} for ${travelers} travelers`,
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
        locale: getLocale(globalLocalisation),
        appearance,
        onReady: () => { console.log("Express Checkout ready (trip detail)."); },
        onPaymentCompleted: (_component, result) => {
          console.log("Payment completed, full result:", result);
          
          try {
            // Get the session ID directly from the paymentSession object
            const responseToSave = {
              ...result,
              session_id: paymentSession.id,
              trip_details: {
                name: product.name,
                travelers: travelers,
                departureDate: selectedDate,
                returnDate: product.returnDate,
                price: product.price
              }
            };
            
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
      console.error("Express checkout init error:", err);
      setErrorMessage("Could not initialize express checkout.");
    }
  }

  if (!product) {
    return (
      <div style={{ padding: "2rem" }}>
        <p style={{ fontStyle: "italic" }}>Trip not found.</p>
        <button 
          onClick={onBackToResults} 
          style={{ 
            background: "none", 
            border: "none", 
            color: themeConfig.colorAction, 
            textDecoration: "underline", 
            cursor: "pointer" 
          }}
        >
          ← Back to search results
        </button>
      </div>
    );
  }

  // Generate fake itinerary based on duration
  const generateItinerary = () => {
    const days = parseInt(product.duration.split(' ')[0]);
    const itinerary = [];
    
    for (let i = 1; i <= days; i++) {
      let dayActivity = "";
      
      if (i === 1) {
        dayActivity = "Arrival at your destination. Check-in to your accommodation and welcome dinner.";
      } else if (i === days) {
        dayActivity = "Check-out and departure. Transfer to airport for your return flight.";
      } else {
        const activities = [
          "Guided city tour exploring the main attractions and landmarks.",
          "Free day to explore at your own pace or relax at your accommodation.",
          "Excursion to nearby natural attractions with lunch included.",
          "Cultural experience with local workshops and traditional dinner.",
          "Beach day with optional water activities and seafood lunch."
        ];
        dayActivity = activities[Math.floor(Math.random() * activities.length)];
      }
      
      itinerary.push({ day: i, activity: dayActivity });
    }
    
    return itinerary;
  };
  
  const itinerary = generateItinerary();
  
  // Generate fake reviews
  const reviews = [
    { id: 1, author: "Sarah M.", date: "October 2023", rating: 5, content: "Absolutely amazing experience! The accommodations were perfect and the itinerary was well-planned. Would definitely book again!" },
    { id: 2, author: "James L.", date: "September 2023", rating: 4, content: "Great trip overall. The guides were knowledgeable and friendly. Only minor issue was a slight delay with one of the transfers." },
    { id: 3, author: "Emma T.", date: "August 2023", rating: 5, content: "Exceeded all expectations! The perfect balance of guided activities and free time to explore on our own." }
  ];

  const pageStyle = { 
    backgroundColor: themeConfig.colorBackground, 
    color: themeConfig.colorText, 
    minHeight: "100vh", 
    paddingBottom: "2rem" 
  };
  
  const sectionStyle = { 
    backgroundColor: themeConfig.colorFormBackground,
    borderRadius: themeConfig.borderRadius[0],
    padding: "1.5rem",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
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
  
  const outlineButtonStyle = {
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
  
  // Format dates for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div style={pageStyle}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button 
            onClick={onBackToResults} 
            className="flex items-center text-sm font-medium"
            style={{ color: themeConfig.colorAction }}
          >
            <i data-lucide="arrow-left" className="w-4 h-4 mr-1"></i>
            Back to search results
          </button>
        </div>
        
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-8" style={{ height: "400px" }}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-2">
                <i data-lucide="map-pin" className="w-5 h-5 mr-1"></i>
                <span>{product.location}</span>
              </div>
              <div className="flex items-center">
                <div className="flex mr-4">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i}
                      data-lucide="star" 
                      className="w-4 h-4" 
                      style={{ 
                        fill: i < Math.floor(product.rating) ? "#fbbf24" : "none",
                        color: "#fbbf24"
                      }}
                    ></i>
                  ))}
                </div>
                <span>{product.rating.toFixed(1)} ({reviews.length} reviews)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview Section */}
            <div style={sectionStyle}>
              <h2 className="text-xl font-bold mb-4">Overview</h2>
              <p className="mb-4">{product.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <i data-lucide="calendar" className="w-6 h-6 mx-auto mb-2" style={{ color: themeConfig.colorAction }}></i>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-sm">{product.duration}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <i data-lucide="users" className="w-6 h-6 mx-auto mb-2" style={{ color: themeConfig.colorAction }}></i>
                  <p className="text-sm font-medium">Group Size</p>
                  <p className="text-sm">Up to 15 people</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <i data-lucide="home" className="w-6 h-6 mx-auto mb-2" style={{ color: themeConfig.colorAction }}></i>
                  <p className="text-sm font-medium">Accommodation</p>
                  <p className="text-sm">Hotel</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <i data-lucide="utensils" className="w-6 h-6 mx-auto mb-2" style={{ color: themeConfig.colorAction }}></i>
                  <p className="text-sm font-medium">Meals</p>
                  <p className="text-sm">Breakfast included</p>
                </div>
              </div>
            </div>
            
            {/* Includes Section */}
            <div style={sectionStyle}>
              <h2 className="text-xl font-bold mb-4">What's Included</h2>
              <ul className="space-y-2">
                {product.includes.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <i data-lucide="check-circle" className="w-5 h-5 mr-2 flex-shrink-0" style={{ color: themeConfig.colorSuccess }}></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Itinerary Section */}
            <div style={sectionStyle}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Itinerary</h2>
                <button 
                  onClick={() => setShowItinerary(!showItinerary)}
                  className="text-sm font-medium"
                  style={{ color: themeConfig.colorAction }}
                >
                  {showItinerary ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
              
              {showItinerary ? (
                <div className="space-y-4">
                  {itinerary.map((day) => (
                    <div key={day.day} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <h3 className="font-bold mb-2">Day {day.day}</h3>
                      <p>{day.activity}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Click 'Show Details' to view the full day-by-day itinerary.</p>
              )}
            </div>
            
            {/* Reviews Section */}
            <div style={sectionStyle}>
              <h2 className="text-xl font-bold mb-4">Reviews</h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{review.author}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i}
                          data-lucide="star" 
                          className="w-4 h-4" 
                          style={{ 
                            fill: i < review.rating ? "#fbbf24" : "none",
                            color: "#fbbf24"
                          }}
                        ></i>
                      ))}
                    </div>
                    <p>{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div style={sectionStyle} className="sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{getCurrency(globalLocalisation)}{product.price.toFixed(2)}</h3>
                <span className="text-sm text-gray-500">per person</span>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Departure Date</label>
                <select 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  style={{ 
                    borderColor: themeConfig.colorBorder,
                    color: themeConfig.colorText
                  }}
                >
                  <option value={product.departureDate}>{formatDate(product.departureDate)}</option>
                  {/* Add more date options if needed */}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Number of Travelers</label>
                <select 
                  value={travelers}
                  onChange={(e) => setTravelers(parseInt(e.target.value))}
                  className="w-full p-2 border rounded-md"
                  style={{ 
                    borderColor: themeConfig.colorBorder,
                    color: themeConfig.colorText
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between mb-2">
                  <span>Trip Price</span>
                  <span>{getCurrency(globalLocalisation)}{product.price.toFixed(2)} x {travelers}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{getCurrency(globalLocalisation)}{(product.price * travelers).toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                onClick={() => onDirectBookNow(product, travelers)}
                style={buttonStyle}
                className="w-full mb-3"
              >
                Book Now
              </button>
              
              <div id="express-checkout-container" className="mt-4"></div>
              
              {errorMessage && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Recommended Trips */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedItems.map(item => (
              <DestinationCard 
                key={item.id}
                product={item}
                onClick={() => { onViewDetail(item.id); }}
                themeConfig={themeConfig}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Booking Page Component
 */
function BookingPage({ items, onRemoveItem, onCheckout, onBackToHome, themeConfig, globalLocalisation }) {
  const [errorMessage, setErrorMessage] = React.useState("");
  
  const pageStyle = { 
    backgroundColor: themeConfig.colorBackground, 
    color: themeConfig.colorText, 
    minHeight: "100vh", 
    paddingBottom: "2rem" 
  };
  
  const containerStyle = { 
    backgroundColor: themeConfig.colorFormBackground, 
    color: themeConfig.colorText, 
    borderRadius: themeConfig.borderRadius[0], 
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)" 
  };
  
  const buttonStyle = { 
    backgroundColor: themeConfig.colorAction, 
    color: themeConfig.colorInverse, 
    border: "none", 
    borderRadius: themeConfig.borderRadius[0], 
    padding: "0.75rem 1.5rem", 
    cursor: "pointer", 
    transition: "background 0.3s ease" 
  };
  
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.travelers), 0);
  };
  
  return (
    <div style={pageStyle}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
        
        <div className="mb-4">
          <button 
            onClick={onBackToHome} 
            className="flex items-center text-sm font-medium"
            style={{ color: themeConfig.colorAction }}
          >
            <i data-lucide="arrow-left" className="w-4 h-4 mr-1"></i>
            Continue Browsing
          </button>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center py-12" style={containerStyle}>
            <i data-lucide="briefcase" className="w-16 h-16 mx-auto mb-4" style={{ color: themeConfig.colorSecondary }}></i>
            <h2 className="text-xl font-bold mb-2">Your Booking List is Empty</h2>
            <p className="mb-6" style={{ color: themeConfig.colorSecondary }}>You haven't added any trips to your booking list yet.</p>
            <button 
              onClick={onBackToHome} 
              style={buttonStyle}
            >
              Browse Destinations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div style={containerStyle} className="p-6">
                <h2 className="text-xl font-bold mb-4">Your Selected Trips</h2>
                
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row border-b pb-6 last:border-b-0 last:pb-0">
                      <div className="md:w-1/3 mb-4 md:mb-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div className="md:w-2/3 md:pl-6">
                        <div className="flex justify-between mb-2">
                          <h3 className="text-lg font-bold">{item.name}</h3>
                          <button 
                            onClick={() => onRemoveItem(item.id)}
                            className="text-sm flex items-center"
                            style={{ color: themeConfig.colorSecondary }}
                          >
                            <i data-lucide="trash-2" className="w-4 h-4 mr-1"></i>
                            Remove
                          </button>
                        </div>
                        
                        <div className="flex items-center text-sm mb-2" style={{ color: themeConfig.colorSecondary }}>
                          <i data-lucide="map-pin" className="w-4 h-4 mr-1"></i>
                          <span>{item.location}</span>
                        </div>
                        
                        <div className="flex items-center text-sm mb-2" style={{ color: themeConfig.colorSecondary }}>
                          <i data-lucide="calendar" className="w-4 h-4 mr-1"></i>
                          <span>{item.duration}</span>
                        </div>
                        
                        <div className="flex items-center text-sm mb-4" style={{ color: themeConfig.colorSecondary }}>
                          <i data-lucide="users" className="w-4 h-4 mr-1"></i>
                          <span>{item.travelers} {item.travelers === 1 ? 'Traveler' : 'Travelers'}</span>
                        </div>
                        
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-sm" style={{ color: themeConfig.colorSecondary }}>Price per person</p>
                            <p className="font-bold">{getCurrency(globalLocalisation)}{item.price.toFixed(2)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm" style={{ color: themeConfig.colorSecondary }}>Total</p>
                            <p className="font-bold">{getCurrency(globalLocalisation)}{(item.price * item.travelers).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div style={containerStyle} className="p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
                
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm" style={{ color: themeConfig.colorSecondary }}>{item.travelers} {item.travelers === 1 ? 'traveler' : 'travelers'}</p>
                      </div>
                      <p>{getCurrency(globalLocalisation)}{(item.price * item.travelers).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{getCurrency(globalLocalisation)}{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={onCheckout}
                  style={buttonStyle}
                  className="w-full mt-6"
                >
                  Proceed to Checkout
                </button>
                
                {errorMessage && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Travel Checkout Page Component
 */
function CheckoutPage({ items, theme, themeConfig, onPaymentSuccess, extras, onAddExtra, onRemoveExtra, globalLocalisation, onLocalisationChange, onBackToBooking }) {
  const [saveCard, setSaveCard] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [selectedPaymentMethods, setSelectedPaymentMethods] = React.useState("all");
  const [selectedLocalisation, setSelectedLocalisation] = React.useState("United Kingdom");
  const [contactInfo, setContactInfo] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });
  const [address, setAddress] = React.useState({
    address_line1: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });
  const [travelerDetails, setTravelerDetails] = React.useState([]);
  // Updated to use 4 steps: 1: Contact Info, 2: Traveler Details, 3: Address, 4: Payment
  const [step, setStep] = React.useState(1);
  const checkoutRef = React.useRef(null);

  // Initialize traveler details based on booking items
  React.useEffect(() => {
    const totalTravelers = items.reduce((sum, item) => sum + item.travelers, 0);
    const initialTravelers = Array(totalTravelers).fill().map((_, i) => ({
      id: i + 1,
      firstName: "",
      lastName: "",
      dob: "",
      passport: "",
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

  React.useEffect(() => {
    // Update to use step 4 for payment
    if (step === 4) {
      if (checkoutRef.current && typeof checkoutRef.current.destroy === "function") {
        checkoutRef.current.destroy();
        checkoutRef.current = null;
      }
      initializeCheckout();
    }
  }, [step, selectedPaymentMethods, selectedLocalisation]);

  // Style definitions
  const sectionStyle = { 
    backgroundColor: themeConfig.colorFormBackground, 
    borderRadius: themeConfig.borderRadius[0], 
    border: `1px solid ${themeConfig.colorFormBorder}`,
    padding: "1.5rem"
  };
  
  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    borderRadius: themeConfig.borderRadius[0],
    backgroundColor: themeConfig.colorAction,
    color: themeConfig.colorInverse,
    fontWeight: themeConfig.button.fontWeight,
    fontSize: themeConfig.button.fontSize,
    fontFamily: themeConfig.button.fontFamily,
    border: "none",
    cursor: "pointer",
    transition: themeConfig.button.transition
  };
  
  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "transparent",
    color: themeConfig.colorAction,
    border: `1px solid ${themeConfig.colorAction}`
  };
  
  const inputStyle = {
    padding: "0.75rem",
    borderRadius: themeConfig.borderRadius[0],
    border: `1px solid ${themeConfig.colorFormBorder}`,
    width: "100%",
    fontFamily: themeConfig.input.fontFamily,
    fontSize: themeConfig.input.fontSize,
    marginBottom: "1rem"
  };

  const isAddressValid = (addr) => {
    if (!addr) return false;
    
    return (
      addr.address_line1 && 
      addr.address_line1.trim() !== "" && 
      addr.city && 
      addr.city.trim() !== "" && 
      addr.zip && 
      addr.zip.trim() !== "" && 
      addr.country && 
      addr.country.trim() !== ""
    );
  };

  const isContactInfoValid = () => {
    return (
      contactInfo.firstName.trim() !== "" &&
      contactInfo.lastName.trim() !== "" &&
      contactInfo.email.trim() !== "" &&
      contactInfo.phone.trim() !== ""
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
    if (selectedLocalisation === "NL") {
      switch (selectedPaymentMethods) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
        case "ideal":
          return { enabled_payment_methods: ["ideal"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["ideal", "klarna"] };
        case "klarna":
          return { enabled_payment_methods: ["klarna"], disabled_payment_methods: ["ideal", "googlepay"] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "ideal", "klarna"], disabled_payment_methods: [] };
      }
    } else if (selectedLocalisation === "SA") {
      switch (selectedPaymentMethods) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
        case "tamara":
          return { enabled_payment_methods: ["tamara"], disabled_payment_methods: [] };
        case "stcpay":
          return { enabled_payment_methods: ["stcpay"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["tamara", "stcpay"] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "tamara", "stcpay"], disabled_payment_methods: [] };
      }
    } else if (selectedLocalisation === "FR") {
      switch (selectedPaymentMethods) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["alma", "sepa"] };
        case "alma":
          return { enabled_payment_methods: ["alma"], disabled_payment_methods: [] };
        case "sepa":
          return { enabled_payment_methods: ["sepa"], disabled_payment_methods: [] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "alma", "sepa"], disabled_payment_methods: [] };
      }
    } else if (selectedLocalisation === "PL") {
      switch (selectedPaymentMethods) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["p24"] };
        case "p24":
          return { enabled_payment_methods: ["p24"], disabled_payment_methods: [] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "p24"], disabled_payment_methods: [] };
      }
    } else if (selectedLocalisation === "PT") {
      switch (selectedPaymentMethods) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["multibanco", "mbway"] };
        case "multibanco":
          return { enabled_payment_methods: ["multibanco"], disabled_payment_methods: [] };
        case "mbway":
          return { enabled_payment_methods: ["mbway"], disabled_payment_methods: [] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "multibanco", "mbway"], disabled_payment_methods: [] };
      }
    } else if (selectedLocalisation === "BE") {
      switch (selectedPaymentMethods) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["bancontact"] };
        case "bancontact":
          return { enabled_payment_methods: ["bancontact"], disabled_payment_methods: [] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "bancontact"], disabled_payment_methods: [] };
      }
    } else if (selectedLocalisation === "AT") {
      switch (selectedPaymentMethods) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["eps"] };
        case "eps":
          return { enabled_payment_methods: ["eps"], disabled_payment_methods: [] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "eps"], disabled_payment_methods: [] };
      }
    } else if (selectedLocalisation === "GB" || selectedLocalisation === "United Kingdom") {
      switch (selectedPaymentMethods) {
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "klarna"] };
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
        case "klarna":
          return { enabled_payment_methods: ["klarna"], disabled_payment_methods: [] };
        case "all":
        default:
          return { enabled_payment_methods: ["card", "googlepay", "klarna"], disabled_payment_methods: [] };
      }
    } else {
      switch (selectedPaymentMethods) {
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card"] };
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
        case "all":
        default:
          return { enabled_payment_methods: ["card", "googlepay"], disabled_payment_methods: [] };
      }
    }
  }

  const paymentConfig = getPaymentMethodConfig();
  const showStoreForFuture = paymentConfig.enabled_payment_methods.includes("card");

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
      if (extras && extras.length > 0) {
        extras.forEach(extra => {
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
      
      // Make sure we have a valid billing address from the address step
      if (!isAddressValid(address)) {
        setErrorMessage("Invalid billing address. Please complete the address form correctly.");
        setStep(3); // Go back to address step
        return;
      }
      
      console.log("Using billing address:", address);
      console.log("Selected localization:", selectedLocalisation);
      console.log("Payment methods:", enabled_payment_methods);
      
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
          // Use the address collected from the address form
          billing: { address },
          shipping: { address },
          locale: localLocale,
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
                extras: extras || [],
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
    return extras ? extras.reduce((sum, extra) => sum + extra.price, 0) : 0;
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
    } else if (step === 3 && isAddressValid(address)) {
      setStep(4);
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
            Continue to Traveler Details
          </button>
        </div>
      </div>
    );
  };

  // Render Traveler Details Form
  const renderTravelerDetailsForm = () => {
    return (
      <div style={sectionStyle}>
        <h2 className="text-xl font-bold mb-4">Traveler Details</h2>
        <p className="text-sm mb-4" style={{ color: themeConfig.colorSecondary }}>
          Please provide details for all travelers as they appear on their ID/passport.
        </p>
        
        {travelerDetails.map((traveler, index) => (
          <div key={traveler.id} className="mb-6 pb-6 border-b last:border-b-0">
            <h3 className="font-bold mb-3">Traveler {index + 1}</h3>
            
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
            Continue to Payment
          </button>
        </div>
      </div>
    );
  };

  // Render Address Form
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
            onChange={(e) => setAddress({...address, address_line1: e.target.value})}
            placeholder="Enter street address"
            style={inputStyle}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              value={address.city}
              onChange={(e) => setAddress({...address, city: e.target.value})}
              placeholder="Enter city"
              style={inputStyle}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Postal Code</label>
            <input
              type="text"
              value={address.zip}
              onChange={(e) => setAddress({...address, zip: e.target.value})}
              placeholder="Enter postal code"
              style={inputStyle}
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
            onClick={onBackToBooking} 
            className="flex items-center text-sm font-medium"
            style={{ color: themeConfig.colorAction }}
          >
            <i data-lucide="arrow-left" className="w-4 h-4 mr-1"></i>
            Back to Booking
          </button>
        </div>
        
        {/* Checkout Progress - Updated for 4 steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -z-10"></div>
            
            {[1, 2, 3, 4].map((stepNumber) => (
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
                   stepNumber === 2 ? "Travelers" : 
                   stepNumber === 3 ? "Address" : "Payment"}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && renderContactInfoForm()}
            {step === 2 && renderTravelerDetailsForm()}
            {step === 3 && renderAddressForm()}
            {step === 4 && renderPaymentForm()}
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
                      <span className="text-sm">{item.travelers} {item.travelers === 1 ? 'traveler' : 'travelers'}</span>
                      <span>{getCurrency(globalLocalisation)}{(item.price * item.travelers).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Travel Extras */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Travel Extras</h3>
                  {step === 1 && (
                    <button 
                      className="text-xs"
                      style={{ color: themeConfig.colorAction }}
                      onClick={() => {
                        // Show extras selection modal or expand section
                        // For simplicity, we'll just add a sample extra
                        if (!extras.some(e => e.id === 1)) {
                          onAddExtra({ 
                            id: 1, 
                            name: 'Travel Insurance', 
                            price: 49.99, 
                            image: '/images/insurance.jpg', 
                            description: 'Comprehensive travel insurance for your peace of mind.' 
                          });
                        }
                      }}
                    >
                      Add extras
                    </button>
                  )}
                </div>
                
                {extras && extras.length > 0 ? (
                  <div className="space-y-2">
                    {extras.map(extra => (
                      <div key={extra.id} className="flex justify-between items-center py-2 border-b">
                        <div className="flex items-center">
                          <img 
                            src={extra.image} 
                            alt={extra.name} 
                            className="w-8 h-8 object-cover rounded-md mr-2"
                          />
                          <span>{extra.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-3">{getCurrency(globalLocalisation)}{extra.price.toFixed(2)}</span>
                          {step === 1 && (
                            <button 
                              onClick={() => onRemoveExtra(extra.id)}
                              className="text-sm"
                              style={{ color: themeConfig.colorSecondary }}
                            >
                              <i data-lucide="x" className="w-4 h-4"></i>
                            </button>
                          )}
                        </div>
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
                  <span>{getCurrency(globalLocalisation)}{calculateSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Extras</span>
                  <span>{getCurrency(globalLocalisation)}{calculateExtrasTotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span>{getCurrency(globalLocalisation)}{calculateTaxes().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span style={{ color: themeConfig.colorAction }}>
                    {getCurrency(globalLocalisation)}{calculateTotal().toFixed(2)}
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
 * Payment Success Page Component
 * Displays the booking confirmation details.
 */
function PaymentSuccessPage({ paymentResponse, themeConfig, onBackToHome }) {
  const [bookingDetails, setBookingDetails] = React.useState(null);
  
  React.useEffect(() => {
    // Try to get booking details from the payment response or localStorage
    if (paymentResponse && paymentResponse.booking_details) {
      setBookingDetails(paymentResponse.booking_details);
    } else {
      // Try to get from localStorage as fallback
      const storedBooking = localStorage.getItem("bookingRecord");
      if (storedBooking) {
        try {
          const parsedBooking = JSON.parse(storedBooking);
          if (parsedBooking.booking_details) {
            setBookingDetails(parsedBooking.booking_details);
          }
        } catch (error) {
          console.error("Error parsing stored booking:", error);
        }
      }
    }
  }, [paymentResponse]);
  
  const pageStyle = { 
    backgroundColor: themeConfig.colorBackground, 
    color: themeConfig.colorText, 
    minHeight: "100vh", 
    paddingBottom: "2rem" 
  };
  
  const sectionStyle = { 
    backgroundColor: themeConfig.colorFormBackground,
    borderRadius: themeConfig.borderRadius[0],
    padding: "1.5rem",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
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
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div style={pageStyle}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i data-lucide="check" className="w-10 h-10" style={{ color: themeConfig.colorSuccess }}></i>
            </div>
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-lg" style={{ color: themeConfig.colorSecondary }}>
              Thank you for booking with TravelEase. Your trip is confirmed and ready to go!
            </p>
          </div>
          
          {bookingDetails ? (
            <div>
              {/* Booking Reference */}
              <div style={sectionStyle} className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Booking Reference</h2>
                  <button className="text-sm flex items-center" style={{ color: themeConfig.colorAction }}>
                    <i data-lucide="printer" className="w-4 h-4 mr-1"></i>
                    Print
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Booking ID:</span>
                    <span>{paymentResponse?.session_id || "TRV-" + Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Booking Date:</span>
                    <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>
              
              {/* Trip Details */}
              {bookingDetails.items && bookingDetails.items.map((item, index) => (
                <div key={index} style={sectionStyle} className="mb-6">
                  <h2 className="text-xl font-bold mb-4">Trip Details</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Destination:</span>
                      <span>{item.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Package:</span>
                      <span>{item.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Duration:</span>
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Departure Date:</span>
                      <span>{formatDate(item.departureDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Return Date:</span>
                      <span>{formatDate(item.returnDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Travelers:</span>
                      <span>{item.travelers}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Traveler Information */}
              {bookingDetails.travelers && bookingDetails.travelers.length > 0 && (
                <div style={sectionStyle} className="mb-6">
                  <h2 className="text-xl font-bold mb-4">Traveler Information</h2>
                  <div className="space-y-4">
                    {bookingDetails.travelers.map((traveler, index) => (
                      <div key={index} className="pb-3 border-b last:border-b-0 last:pb-0">
                        <h3 className="font-medium mb-2">Traveler {index + 1}</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="block text-gray-500">Name</span>
                            <span>{traveler.firstName} {traveler.lastName}</span>
                          </div>
                          <div>
                            <span className="block text-gray-500">Date of Birth</span>
                            <span>{formatDate(traveler.dob)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Contact Information */}
              {bookingDetails.contact && (
                <div style={sectionStyle} className="mb-6">
                  <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-gray-500">Name</span>
                      <span>{bookingDetails.contact.firstName} {bookingDetails.contact.lastName}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Email</span>
                      <span>{bookingDetails.contact.email}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Phone</span>
                      <span>{bookingDetails.contact.phone}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Payment Summary */}
              <div style={sectionStyle} className="mb-6">
                <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
                <div className="space-y-3">
                  {bookingDetails.items && bookingDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.name} ({item.travelers} {item.travelers === 1 ? 'traveler' : 'travelers'})</span>
                      <span>£{(item.price * item.travelers).toFixed(2)}</span>
                    </div>
                  ))}
                  
                  {bookingDetails.extras && bookingDetails.extras.length > 0 && (
                    <div className="extras-container">
                      {bookingDetails.extras.map((extra, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{extra.name}</span>
                          <span>£{extra.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between pt-3 border-t">
                    <span className="font-medium">Total Paid</span>
                    <span className="font-bold" style={{ color: themeConfig.colorAction }}>
                      £{bookingDetails.total ? bookingDetails.total.toFixed(2) : '0.00'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={sectionStyle} className="text-center py-8">
              <i data-lucide="info" className="w-12 h-12 mx-auto mb-4" style={{ color: themeConfig.colorSecondary }}></i>
              <h2 className="text-xl font-bold mb-2">Booking Details Not Available</h2>
              <p className="mb-4" style={{ color: themeConfig.colorSecondary }}>
                We couldn't retrieve the details of your booking. Please check your email for the booking confirmation.
              </p>
            </div>
          )}
          
          <div className="text-center mt-8">
            <button 
              onClick={onBackToHome} 
              style={buttonStyle}
            >
              Return to Homepage
            </button>
          </div>
          
          {/* Technical Details (Collapsible) */}
          {paymentResponse && (
            <div className="mt-8">
              <details className="bg-gray-50 rounded-md overflow-hidden">
                <summary className="p-4 cursor-pointer font-medium">
                  Technical Payment Details
                </summary>
                <div className="p-4 border-t">
                  <pre className="text-xs overflow-auto p-4 bg-gray-100 rounded" style={{ maxHeight: "300px" }}>
                    {JSON.stringify(paymentResponse, null, 2)}
                  </pre>
                </div>
              </details>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to get currency symbol
function getCurrency(localisation) {
  switch (localisation) {
    case "NL":
    case "FR":
    case "PL":
    case "PT":
    case "BE":
    case "AT":
      return "€";
    case "SA":
      return "﷼";
    default:
      return "£";
  }
} 