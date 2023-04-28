const axios = require('axios');
const Alert = require('../models/alertModel'); 
const User = require('../models/userModel'); 
const ZAPIER_HOOK_URL = 'https://hooks.zapier.com/hooks/catch/15123291/3uedfdp/';


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
	async checkRanges(req, res, next) {
		const {userId} = req.body; 
		const metrics = res.locals.metric;
		console.log('checking ranges of ' + metrics)
		let outOfRangeMessage = '';
	
		try {
			// Fetch the user object using the user ID
			const user = await User.findById(userId);

			console.log('number: ', user.phoneNumber)
	
			// Fetch the alerts associated with the user
			const userAlerts = await Alert.find({ owner: userId });
			console.log('userAlerts: ', userAlerts)
			// Iterate through the user alerts and check if any metric is out of range
			for (const alert of userAlerts) {
				const metricKey = alert.metric;
				const metricValue = metrics[metricKey];
	
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
			console.log(outOfRangeMessage)
			next();
		} catch (error) {
			next(error);
		}
	}
};

module.exports = alertController;
