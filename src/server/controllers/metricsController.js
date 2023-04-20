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
        `http://${broker}/api/v1/query?query=sum(rate(kafka_server_brokertopicmetrics_bytesin_total[1m]))`
      );
      const bytesOutMetric = await axios.get(
        `http://${broker}/api/v1/query?query=sum(rate(kafka_server_brokertopicmetrics_bytesout_total[1m]))`
      );
      const ramUsage = await axios.get(
        `http://${broker}/api/v1/query?query=sum(rate(process_resident_memory_bytes[1m]))`
      );
      const latency = await axios.get(
        `http://${broker}/api/v1/query?query=sum(rate(kafka_network_requestmetrics_totaltimems{}[1m]) - rate(kafka_network_requestmetrics_localtimems{}[1m]))`
      )
      res.locals.metric = {
        cpumetric: cpuMetric.data,
        bytesintotalmetric: bytesintotalmetric.data,
        bytesOutMetric: bytesOutMetric.data,
        ramUsageMetric: ramUsage.data,
        latency: latency.data,
      };
      return next();
    } catch (error) {
      console.log(error, 'Error in getMetrics');
      return next();
    }
  },
};

module.exports = metricsController;
