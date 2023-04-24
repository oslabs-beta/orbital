const axios = require('axios');

const alertController = {
  async sendAlert(req, res, next) {
    const { phoneNumber, message } = req.body;
    await axios.post('https://hooks.zapier.com/hooks/catch/15123291/3uedfdp/', {
      phoneNumber,
      message,
    });
    return next();
  },
};

module.exports = alertController;
