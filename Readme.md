1. get kafka up 

> docker run -p 9092:9092 apache/kafka:3.7.1

> docker exec -it containerid /bin/bash

> cd /opt/kafka/bin

> ./kafka-topics.sh --create --topic workflow-events --bootstrap-server localhost:9092

2. get the webhooks project up to get entries into the DB and kafka outbox

3. get the publisher up to read from kafka outbox and publish to kafka

4. get worker up to read from kafka, do the work and send acknowledgement to kafka
