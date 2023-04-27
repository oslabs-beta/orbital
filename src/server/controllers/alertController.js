const axios = require('axios');
const Alert = require('../models/alertModel');

const alertController = {
  async getUserAlerts(req, res, next) {
    const { id } = req.body;
    const metrics = res.locals.metric;
    const alerts = await Alert.find({ _id: id });
    for (const alert of alerts) {
      const metric = alert.metric;
      if (metric in metrics) {
        console.log(metric);
      }
    }
    return next();
  },
  async createAlert(req, res, next) {
    console.log('creating');
    const { id, metric, over, under } = req.body;
    const alert = new Alert({
      metric,
      over,
      under,
      owner: id,
    });
    try {
      await alert.save();
    } catch (e) {
      return next(e);
    }
    return next();
  },
  async sendAlert(req, res, next) {
    const { phoneNumber, message } = req.body;
    await axios.post('https://hooks.zapier.com/hooks/catch/15123291/3uedfdp/', {
      phoneNumber,
      message,
    });
    return next();
  },
  checkMetrics(req, res, next) {
    const { id } = res.body;
    const metrics = res.locals.metric;
    if (!metrics) {
      return next({ message: 'no metrics found' });
    }
  },
};

module.exports = alertController;
