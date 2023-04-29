const { Kafka } = require('kafkajs');

const KafkaController = {
  async getMetrics(req, res, next) {
    try {
      const { brokers } = req.body;
      const kafka = new Kafka({
        clientId: 'my-app',
        brokers,
      });
      const admin = kafka.admin();
      await admin.connect();
      const topics = await admin.listTopics();
      const offsets = await admin.fetchTopicOffsets(topics[4]);
      const consumerGroups = await admin.fetchOffsets({
        groupId: 'my-app',
        topics: [topics[4]],
      });
      const describedCluster = await admin.describeCluster();
      res.locals.metrics = {
        topics,
        offsets,
        consumerGroups,
        describedCluster,
      };
      await admin.disconnect();
      return next();
    } catch (e) {
      return next(e);
    }
  },
};

module.exports = KafkaController;