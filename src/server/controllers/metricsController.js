const axios = require('axios');

// const cpuQuery =
//   'http://localhost:9090/api/v1/query?query=sum(rate(process_cpu_seconds_total[1m])) * 100';

const metricsController = {
  async getCPUMetrics(req, res, next) {
    const { broker } = req.body;
    // console.log('this is the req body -->', req.body);
    try {
      const cpuMetric = await axios.get(
        `http://${broker}/api/v1/query?query=sum(rate(process_cpu_seconds_total[1m])) * 100`
      );
      const bytesintotalmetric = await axios.get(
        `http://${broker}/api/v1/query?query=kafka_server_brokertopicmetrics_bytesin_total`
      );
      res.locals.metric = {
        cpumetric: cpuMetric.data,
        bytesintotalmetric: bytesintotalmetric.data,
      };
      return next();
    } catch (error) {
      console.log(error, 'Error in getMetrics');
    }
  },
};

module.exports = metricsController;
