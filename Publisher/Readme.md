docker run -p 9092:9092 apache/kafka:3.7.1


docker exec -it containerid /bin/bash

cd /opt/kafka/bin

./kafka-topics.sh --create --topic workflow-events --bootstrap-server localhost:9092