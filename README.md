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
docker buildx build --platform=linux/arm/v7 -t komfovent-c6-metrics .
docker buildx build --platform=linux/arm64 -t komfovent-c6-metrics .
docker buildx build --platform=linux/amd64 -t komfovent-c6-metrics .
```
