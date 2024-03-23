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
  powerConsumptionGague,
  heaterPowerGauge,
  heatExchangerRecoveryGague,
  heatExchangerEfficiencyGauge,
  energySavingGauge,
  SPIGauge,
  AHUConsumptionDayGauge,
  AHUConsumptionMonthGauge,
  AHUConsumptionTotalGauge,
  additionalAirHeaterConsumptionDayGauge,
  additionalAirHeaterConsumptionMonthGauge,
  additionalAirHeaterConsumptionTotalGauge,
  recoveredEnergyDayGauge,
  recoveredEnergyMonthGauge,
  recoveredEnergyTotalGauge,
  SPIPerDayGauge,
  normalSetPointGauge,
  normalHeatingGauge,
  overrideSetPointGauge,
  overrideHeatingGauge,
  minimumSupplyAirTemperatureGauge,
  maximumSupplyAirTemperatureGauge,
  freeHeatingOrCoolingGauge,
  heatingEnableDeniedGauge,
  coolingEnableDeniedGauge,
  heatRecoveryControlGauge,
} from './metrics';
import { getFirmwareVersion } from './c6/firmware';
import { getEcoStatus } from './c6/eco';

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

    // 환기장치의 Air Quality 기능을 끄고 센서에 연결된 온습도만 읽는다
    // OA온도를 측정하기 위해 Air quality sensor type B8과 B9에 0-10V 온습도계를 장착
    await client.writeRegister(204, 0);
    // B8, B9센서를 CO2로 해석한다. 값의 범위는 0~2000이다.
    await client.writeRegister(212, 1);
    await client.writeRegister(213, 1);

    const status = await getStatus(client);
    const flow = await getFlow(client);
    const monitor = await getMonitorInfo(client);
    const panel = await getPanelInfo(client);
    const firmware = await getFirmwareVersion(client);
    const eco = await getEcoStatus(client);
    await new Promise<void>((resolve) => client.close(resolve));

    res.set('Content-Type', 'application/json');
    res.json({
      status,
      flow,
      monitor,
      panel,
      firmware,
      eco,
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

    const firmware = await getFirmwareVersion(client);

    const status = await getStatus(client);
    powerStatusGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(status.power);
    ecoModeGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(status.eco);
    autoModeGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(status.auto);
    currentModeGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(status.mode);
    statusIconStartingGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(status.icon.starting);
    statusIconStopingGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(status.icon.stoping);
    statusIconFanGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(status.icon.fan);
    statusIconRotorGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(status.icon.rotor);
    statusIconHeatingGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(status.icon.heating);
    statusIconCoolingGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(status.icon.cooling);
    statusIconHeatingDeniedGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(status.icon.heatingDenied);
    statusIconCoolingDeniedGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(status.icon.coolingDenied);
    statusIconFlowDownGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(status.icon.flowDown);
    statusIconFreeHeatingGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(status.icon.freeHeating);
    statusIconFreeCoolingGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(status.icon.freeCooling);
    statusIconAlarmFGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(status.icon.alarmF);
    statusIconAlarmWGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(status.icon.alarmW);

    const flow = await getFlow(client);
    normalSupplyFlowGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(flow.normal.supply);
    normalExtractFlowGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(flow.normal.extract);
    normalSetPointGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(flow.normal.setpoint);
    normalHeatingGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(flow.normal.heating);
    overrideSupplyFlowGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(flow.override.supply);
    overrideExtractFlowGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(flow.override.extract);
    overrideSetPointGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(flow.override.setpoint);
    overrideHeatingGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(flow.override.heating);

    const monitor = await getMonitorInfo(client);
    supplyTemperatureGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.supplyTemperature);
    extractTemperatureGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.extractTemperature);
    outdoorTemperatureGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.outdoorTemperature);
    supplyFlowGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.supplyFlow);
    extractFlowGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.extractFlow);
    supplyFanIntensivityGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.supplyFanIntensivity);
    extractFanIntensivityGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.extractFanIntensivity);
    heatExchangerGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.heatExchanger);
    electricHeaterGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.electricHeater);
    dxUnitGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.dxUnit);
    filtersImupurityGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.filtersImupurity);
    airDampersGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.airDampers);
    heatExchangeTypeGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.heatExchangeType);
    powerConsumptionGague
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.powerConsumption);
    heaterPowerGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.heaterPower);
    heatExchangerRecoveryGague
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.heatExchangerRecovery);
    heatExchangerEfficiencyGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.heatExchangerEfficiency);
    energySavingGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.energySaving);
    SPIGauge.labels(firmware.version, firmware.panelVersion).set(monitor.SPI);
    AHUConsumptionDayGauge.labels(firmware.version, firmware.panelVersion).set(
      monitor.AHUConsumptionDay
    );
    AHUConsumptionMonthGauge.labels(
      firmware.version,
      firmware.panelVersion
    ).set(monitor.AHUConsumptionMonth);
    AHUConsumptionTotalGauge.labels(
      firmware.version,
      firmware.panelVersion
    ).set(monitor.AHUConsumptionTotal);
    additionalAirHeaterConsumptionDayGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.additionalAirHeaterConsumptionDay);
    additionalAirHeaterConsumptionMonthGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.additionalAirHeaterConsumptionMonth);
    additionalAirHeaterConsumptionTotalGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.additionalAirHeaterConsumptionTotal);
    recoveredEnergyDayGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.recoveredEnergyDay);
    recoveredEnergyMonthGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.recoveredEnergyMonth);
    recoveredEnergyTotalGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(monitor.recoveredEnergyTotal);
    SPIPerDayGauge.labels(firmware.version, firmware.panelVersion).set(
      monitor.SPIPerDay
    );

    const panel = await getPanelInfo(client);
    panelTemperatureGague
      .labels(firmware.version, firmware.panelVersion)
      .set(panel.temperature);
    panelHimidityGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(panel.humidity);

    const eco = await getEcoStatus(client);
    minimumSupplyAirTemperatureGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(eco.minimumSupplyAirTemperature);
    maximumSupplyAirTemperatureGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(eco.maximumSupplyAirTemperature);
    freeHeatingOrCoolingGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(eco.freeHeatingOrCooling);
    heatingEnableDeniedGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(eco.heatingEnableDenied);
    coolingEnableDeniedGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(eco.coolingEnableDenied);
    heatRecoveryControlGauge
      .labels(firmware.version, firmware.panelVersion)
      .set(eco.heatRecoveryControl);

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
