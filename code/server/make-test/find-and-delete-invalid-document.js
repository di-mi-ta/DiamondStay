const Message = require('../models/message');

Message.findByIdAndDelete('5ce127a6cc933e1b6edc77ed', (err, message) => {
    if (err) {
        console.log('Error', err);
    }
    console.log('message', message);
});