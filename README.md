# Retail Payment Application

A web application for processing retail payments using Checkout.com's payment processing API.

## Features

- Product catalog display
- Shopping cart functionality
- Secure checkout process
- Multiple payment method support
- Order confirmation and receipt generation

## Technologies Used

- Node.js
- Express.js
- Checkout.com Payment API
- HTML/CSS/JavaScript

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/retail-payment-app.git
   cd retail-payment-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   CHECKOUT_SECRET_KEY=your_checkout_secret_key
   PROCESSING_CHANNEL_ID=your_processing_channel_id
   PORT=3001
   ```

4. Start the application:
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3001`

## Deployment

This application is configured for deployment on Render.com:

1. Push your code to GitHub
2. Create a new Web Service on Render.com
3. Connect your GitHub repository
4. Set the build command to `npm install`
5. Set the start command to `npm start`
6. Add the environment variables in the Render dashboard

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 