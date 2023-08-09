import ModbusRTU from '@widesky/modbus-serial';
import { getMonitorInfo, getPanelInfo } from './c6/monitor';
import { getStatus } from './c6/status';
import { getFlow } from './c6/flow';

import express from 'express';
import { register } from 'prom-client';
import {
  powerStatusGauge,
  ecoModeGauge,
  autoModeGauge,
  currentModeGauge,
  statusIconStartingGauge,
  statusIconStopingGauge,
  statusIconFanGauge,
  statusIconRotorGauge,
  statusIconHeatingGauge,
  statusIconCoolingGauge,
  statusIconHeatingDeniedGauge,
  statusIconCoolingDeniedGauge,
  statusIconFlowDownGauge,
  statusIconFreeCoolingGauge,
  statusIconFreeHeatingGauge,
  statusIconAlarmFGauge,
  statusIconAlarmWGauge,
  normalSupplyFlowGauge,
  normalExtractFlowGauge,
  overrideSupplyFlowGauge,
  overrideExtractFlowGauge,
  supplyTemperatureGauge,
  extractTemperatureGauge,
  outdoorTemperatureGauge,
  supplyFlowGauge,
  extractFlowGauge,
  supplyFanIntensivityGauge,
  extractFanIntensivityGauge,
  heatExchangerGauge,
  electricHeaterGauge,
  dxUnitGauge,
  filtersImupurityGauge,
  airDampersGauge,
  heatExchangeTypeGauge,
  panelTemperatureGague,
  panelHimidityGauge,
} from './metrics';

const app = express();

app.get('/info', async (req, res) => {
  try {
    const client = new ModbusRTU();
    await client.connectTCP(process.env.MODBUS_TCP_IP || '192.168.1.26', {
      port: parseInt(process.env.MODBUS_TCP_PORT || '502', 10),
    });

    // set the client's unit id (default: 1)
    client.setID(1);
    client.setTimeout(1000);

    const status = await getStatus(client);
    const flow = await getFlow(client);
    const monitor = await getMonitorInfo(client);
    const panel = await getPanelInfo(client);
    await new Promise<void>((resolve) => client.close(resolve));

    res.set('Content-Type', 'application/json');
    res.json({
      status,
      flow,
      monitor,
      panel,
    });
  } catch (e) {
    console.error(e);
  }
});

// API endpoint to expose Prometheus metrics
app.get('/metrics', async (req, res) => {
  try {
    const client = new ModbusRTU();
    await client.connectTCP(process.env.MODBUS_TCP_IP || '192.168.1.26', {
      port: parseInt(process.env.MODBUS_TCP_PORT || '502', 10),
    });

    // set the client's unit id (default: 1)
    client.setID(1);
    client.setTimeout(1000);

    const status = await getStatus(client);
    powerStatusGauge.set(status.power);
    ecoModeGauge.set(status.eco);
    autoModeGauge.set(status.auto);
    currentModeGauge.set(status.mode);
    statusIconStartingGauge.set(status.icon.starting);
    statusIconStopingGauge.set(status.icon.stoping);
    statusIconFanGauge.set(status.icon.fan);
    statusIconRotorGauge.set(status.icon.rotor);
    statusIconHeatingGauge.set(status.icon.heating);
    statusIconCoolingGauge.set(status.icon.cooling);
    statusIconHeatingDeniedGauge.set(status.icon.heatingDenied);
    statusIconCoolingDeniedGauge.set(status.icon.coolingDenied);
    statusIconFlowDownGauge.set(status.icon.flowDown);
    statusIconFreeHeatingGauge.set(status.icon.freeHeating);
    statusIconFreeCoolingGauge.set(status.icon.freeCooling);
    statusIconAlarmFGauge.set(status.icon.alarmF);
    statusIconAlarmWGauge.set(status.icon.alarmW);

    const flow = await getFlow(client);
    normalSupplyFlowGauge.set(flow.normal.supply);
    normalExtractFlowGauge.set(flow.normal.extract);
    overrideSupplyFlowGauge.set(flow.override.supply);
    overrideExtractFlowGauge.set(flow.override.extract);

    const monitor = await getMonitorInfo(client);
    supplyTemperatureGauge.set(monitor.supplyTemperature);
    extractTemperatureGauge.set(monitor.extractTemperature);
    outdoorTemperatureGauge.set(monitor.outdoorTemperature);
    supplyFlowGauge.set(monitor.supplyFlow);
    extractFlowGauge.set(monitor.extractFlow);
    supplyFanIntensivityGauge.set(monitor.supplyFanIntensivity);
    extractFanIntensivityGauge.set(monitor.extractFanIntensivity);
    heatExchangerGauge.set(monitor.heatExchanger);
    electricHeaterGauge.set(monitor.electricHeater);
    dxUnitGauge.set(monitor.dxUnit);
    filtersImupurityGauge.set(monitor.filtersImupurity);
    airDampersGauge.set(monitor.airDampers);
    heatExchangeTypeGauge.set(monitor.heatExchangeType);

    const panel = await getPanelInfo(client);
    panelTemperatureGague.set(panel.temperature);
    panelHimidityGauge.set(panel.humidity);

    await new Promise<void>((resolve) => client.close(resolve));
  } catch (e) {
    console.error(e);
  }

  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
});

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
