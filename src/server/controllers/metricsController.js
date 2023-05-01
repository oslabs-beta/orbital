const axios = require("axios");

// const cpuQuery =
//   'http://localhost:9090/api/v1/query?query=sum(rate(process_cpu_seconds_total[1m])) * 100';

const metricsController = {
  async getCoreMetrics(req, res, next) {
    const { broker } = req.body;
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
      );
      res.locals.metric = {
        cpumetric: cpuMetric.data.data.result[0].value[1],
        bytesintotalmetric: bytesintotalmetric.data.data.result[0].value[1],
        bytesOutMetric: bytesOutMetric.data.data.result[0].value[1],
        ramUsageMetric: ramUsage.data.data.result[0].value[1],
        latency: latency.data.data.result[0].value[1],
      };
      return next();
    } catch (error) {
      console.log(error, 'Error in getMetrics');
      return next();
    }
  },


    async getAllTopics(req, res, next) {
        try {
            const { broker } = req.body;
            const topicMetrics = await axios.get(
                `http://${broker}/api/v1/query?query=count(kafka_topic_partition_current_offset) by (topic)`
            );
            res.locals.topics = topicMetrics.data;
            return next();
        } catch (e) {
            return next(e);
        }
    },

    async getTopicMetrics(req, res, next) {
        try {
            const { topic, broker } = req.body;
            const topicMetrics = await axios.get(
                `http://${broker}/api/v1/query?query=kafka_topic_partition_current_offset{topic="${topic}"}`
            );
            res.locals.metric = topicMetrics.data;
            return next();
        } catch (e) {
            e.message = "Error in getTopicMetrics controller";
            return next(e);
        }
    },

    async getProducerConsumerMetrics(req, res, next) {
      try {
        const { broker } = req.body;
        const producerRequestsTotal = await axios.get(
          `http://${broker}/api/v1/query?query=rate(kafka_server_brokertopicmetrics_totalproducerequests_total[1m])`
        );
        const producersMessagesInTotal = await axios.get(
          `http://${broker}/api/v1/query?query=rate(kafka_server_brokertopicmetrics_messagesin_total[1m])`
        );
        const producerConversionsTotal = await axios.get(
          `http://${broker}/api/v1/query?query=rate(kafka_server_brokertopicmetrics_producemessageconversions_total[1m])`
        );
        const consumerRequestsTotal = await axios.get(
          `http://${broker}/api/v1/query?query=rate(kafka_server_brokertopicmetrics_totalfetchrequests_total[1m])`
        );
        const consumerFailedRequestsTotal = await axios.get(
          `http://${broker}/api/v1/query?query=rate(kafka_server_brokertopicmetrics_failedfetchrequests_total[1m])`
        );
        const consumerConversionsTotal = await axios.get(
          `http://${broker}/api/v1/query?query=rate(kafka_server_brokertopicmetrics_fetchmessageconversions_total[1m])`
        );
        res.locals.metric = {
          producerConversionsTotal:
            producerConversionsTotal.data.data.result[0].value[1],
          producerRequestsTotal:
            producerRequestsTotal.data.data.result[0].value[1],
          producersMessagesInTotal:
            producersMessagesInTotal.data.data.result[0].value[1],
          consumerConversionsTotal:
            consumerConversionsTotal.data.data.result[0].value[1],
          consumerFailedRequestsTotal:
            consumerFailedRequestsTotal.data.data.result[0].value[1],
          consumerRequestsTotal:
            consumerRequestsTotal.data.data.result[0].value[1],
        };
        return next();
      } catch (e) {
        e.message = 'Error in getProducerMetricsController';
        return next(e);
      }
    },
};

module.exports = metricsController;