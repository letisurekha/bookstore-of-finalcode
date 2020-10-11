const User = require('../models/user');
const braintree = require('braintree');
require('dotenv').config();

// const gateway = braintree.connect({
//     environment: braintree.Environment.Sandbox, // Production
//     merchantId: process.env.BRAINTREE_MERCHANT_ID,
//     publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//     privateKey: process.env.BRAINTREE_PRIVATE_KEY
// });

var gateway = new braintree.BraintreeGateway({
    // environment: braintree.Environment.Sandbox,
    // merchantId: 'your_merchant_id',
    // publicKey: 'your_public_key',
    // privateKey: 'your_private_key'
    environment: braintree.Environment.Sandbox, // Production
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
  }); 

exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, function(error, response) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(response);
        }
    });
};

// exports.processPayment = (req, res) => {
//     let nonceFromTheClient = req.body.paymentMethodNonce;
//     let amountFromTheClient = req.body.amount;
//     // charge
//     let newTransaction = gateway.transaction.sale(
//         {
//             amount: amountFromTheClient,
//             paymentMethodNonce: nonceFromTheClient,
//             options: {
//                 submitForSettlement: true
//             }
//         },
//         (error, result) => {
//             if (error) {
//                 res.status(500).json(error);
//             } else {
//                 res.json(result);
//             }
//         }
//     );
// };
