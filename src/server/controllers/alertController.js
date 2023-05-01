const axios = require('axios');
const Alert = require('../models/alertModel');
const User = require('../models/userModel');
const ZAPIER_HOOK_URL =
  'https://hooks.zapier.com/hooks/catch/15123291/3uedfdp/';

const alertController = {
  async getUserAlerts(req, res, next) {
    const { id } = req.params;

    try {
      const alerts = await Alert.find({ owner: id });
      res.locals.alerts = alerts;
      return next();
    } catch (e) {
      return next(e);
    }
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

  async deleteAlert(req, res, next) {
    const { id } = req.params;

    try {
      res.locals.deleted = await Alert.findOneAndDelete({ _id: id });
      return next();
    } catch (error) {
      return next(error);
    }
  },

  async sendAlert(req, res, next) {
    const { phoneNumber, message } = req.body;
    await axios.post('https://hooks.zapier.com/hooks/catch/15123291/3uedfdp/', {
      phoneNumber,
      message,
    });
    return next();
  },
  async checkRanges(req, res, next) {
    const { userId } = req.body;
    const metrics = res.locals.metric;

    let outOfRangeMessage = '';

    try {
      // Fetch the user object using the user ID
      const user = await User.findById(userId);
      if (!user.phoneNumber) {
        return next();
      } else {
        // Fetch the alerts associated with the user
        const userAlerts = await Alert.find({ owner: userId });

        // Iterate through the user alerts and check if any metric is out of range
        for (const alert of userAlerts) {
          if (alert.lastSent > Date.now() - 60000 * 120) {
            continue;
          }
          const metricKey = alert.metric;
          const metricValue = metrics[metricKey];
          if (!metricValue) {
            continue;
          }
          if (metricValue < alert.under || metricValue > alert.over) {
            outOfRangeMessage += `Metric "${metricKey}" is out of range with a value of ${metricValue}. `;
          }
        }
        if (outOfRangeMessage) {
          res.locals.outOfRangeMessage = outOfRangeMessage;
          const phoneNumber = user.phoneNumber;
          await axios.post(ZAPIER_HOOK_URL, {
            phoneNumber: phoneNumber,
            message: outOfRangeMessage,
          });
        }
        next();
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = alertController;
