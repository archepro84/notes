export interface EnvironmentVariable {
  KAFKA_BROKERS: string;
  KAFKA_CLIENT_ID: string;
  KAFKA_CONSUMER_GROUP_ID: string;
  KAFKA_CONSUME_TOPIC: string;
  KAFKA_PRODUCE_TOPIC: string;
  KAFKA_ENABLE_MSK: string;
  KAFKA_MSK_REGION: string;
}

export type EnvironmentKey = keyof EnvironmentVariable;
