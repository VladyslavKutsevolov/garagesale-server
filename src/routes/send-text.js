const router = require("express").Router();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = () => {
  router.get('/', (req, res) => {
    //Welcome Message
    res.send('Hello to the Twilio Server')
  
    //_GET Variables
    const { recipient, textMessage } = req.query;
  
    
    //Send Text
    client.messages.create({
        body: textMessage,
        to: recipient,  // Text this number
        from: process.env.TWILIO_PHONE_NUMBER // From a valid Twilio number
    }).then((message) => console.log(message.body));
  })

  return router;
};
