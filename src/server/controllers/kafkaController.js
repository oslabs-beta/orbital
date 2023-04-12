const { Kafka } = require('kafkajs');

const KafkaController = {
	async getMetrics(req, res, next) {
    try {
			const { brokers } = req.body;
			const kafka = new Kafka({
				clientId: 'my-app',
				brokers
		  });
			const admin = kafka.admin();
			await admin.connect();
		
			const topics = await admin.listTopics();
			const offsets = await admin.fetchTopicOffsets(topics[1]);
			const topicMeta = await admin.fetchTopicMetadata({ topics: [topics[1]] });
			const consumerGroups = await admin.fetchOffsets({ groupId: 'my-app', topics: [topics[1]] });
			
			// console.log('these are the topics -->', topics);
			// console.log('these are the offsets -->',offsets);
			// console.log('these are metadata -->', topicMeta.topics[0]);
			// console.log('these are the consumer groups -->', consumerGroups[0].partitions);
			
			res.locals.metrics = {topics, offsets, topicMeta, consumerGroups};
			await admin.disconnect();
			return next();
	  } catch(e) {
		  return next(e);
	  }
	}
}

module.exports = KafkaController;