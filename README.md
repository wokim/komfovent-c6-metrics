# Komfovent C6 metrics

A Node.js server that exposes status and metrics of the Komfovent C6M ventilation unit.

## Getting Started

```
export MODBUS_TCP_IP=<Your device IP>
export MODBUS_TCP_PORT=<Your device Port>
export SERVER_PORT=<Server Port>

npm run build
node ./dist/index.js
```

## Build

```
docker buildx create --use
docker buildx build --platform=linux/arm/v7,linux/arm64,linux/amd64 -t komfovent-c6-metrics .
docker tag komfovent-c6-metrics wokim/komfovent-c6-metrics
docker push wokim/komfovent-c6-metrics
```
