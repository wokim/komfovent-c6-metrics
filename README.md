# Komfovent C6 metrics

A Node.js server that exposes status and metrics of the Komfovent C6M ventilation unit.

## Overview

```mermaid
sequenceDiagram
    participant A as Prometheus<br>(Local)
    participant B as Komfovent C6 metrics Agent<br>(This repo, Local)
    participant C as Komfovent ventilation unit<br>(Local)
    box rgb(33,66,99) External Network
    participant D as Prometheus Cloud
    participant E as Grafana Cloud
    end

    loop Scrape every 15 secs
        A->>+B: GET /metrics
        B->>+C: Read registers<br>(Modbus TCP)
        C-->>-B: temperature, air flow, etc.
        B->>B: Process with Prometheus metrics
        B-->>-A: metrics
        A-->>D: remote write
    end
    E->>D: Query
    D-->>E: Result
    E->>E: Rendering Dashboard
```

## Getting Started

```sh
cd prometheus

# Open the docker-compose.yaml file and modify MODBUS_TCP_IP and MODBUS_TCP_PORT appropriately."

# Set up `remote_write` Prometheus config to send metric data to a remote system.

# Run
docker compose up -d
```

## For Developers

### Getting Started

```sh
export MODBUS_TCP_IP=<Your device IP>
export MODBUS_TCP_PORT=<Your device Port>
export SERVER_PORT=<Server Port>

npm run build
node ./dist/index.js
```

### APIs

- `GET /metrics`: An API that returns various ventilation unit metrics as Prometheus format.
- `GET /info`: An API that returns various ventilation unit metrics as JSON format.

### Build

```sh
docker buildx create --use
docker buildx build --platform=linux/arm/v7,linux/arm64,linux/amd64 -t wokim/komfovent-c6-metrics:latest --target release --push .
docker buildx build --platform=linux/arm/v7,linux/arm64,linux/amd64 -t wokim/komfovent-c6-metrics:0.0.1 --target release --push .
```
