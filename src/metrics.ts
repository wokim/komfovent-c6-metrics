import { Counter, Gauge } from 'prom-client';

// Register Prometheus default metrics (e.g., CPU usage, memory usage)
// collectDefaultMetrics();

export const powerStatusGauge = new Gauge({
  name: 'power',
  help: 'Power status of the ventilation unit (0 for off, 1 for on)',
});

export const ecoModeGauge = new Gauge({
  name: 'eco',
  help: 'Eco mode status of the ventilation unit (0 for off, 1 for on)',
});

export const autoModeGauge = new Gauge({
  name: 'auto',
  help: 'Auto mode status of the ventilation unit (0 for off, 1 for on)',
});

export const currentModeGauge = new Gauge({
  name: 'current_mode',
  help: 'Current mode of of the ventilation unit. Stanby = 0, Away = 1, Normal = 2, Intensive = 3, Boost = 4, Kitchen = 5, Fireplace = 6, Override = 7, Holiday = 8, Air quality = 9, Off = 10',
});

export const statusIconStartingGauge = new Gauge({
  name: 'status_icon_starting',
  help: 'starting',
});

export const statusIconStopingGauge = new Gauge({
  name: 'status_icon_stoping',
  help: 'stoping',
});

export const statusIconFanGauge = new Gauge({
  name: 'status_icon_fan',
  help: 'fan',
});

export const statusIconRotorGauge = new Gauge({
  name: 'status_icon_rotor',
  help: 'rotor',
});

export const statusIconHeatingGauge = new Gauge({
  name: 'status_icon_heating',
  help: 'heating',
});

export const statusIconCoolingGauge = new Gauge({
  name: 'status_icon_cooling',
  help: 'cooling',
});

export const statusIconHeatingDeniedGauge = new Gauge({
  name: 'status_icon_heating_denied',
  help: 'heating denied',
});

export const statusIconCoolingDeniedGauge = new Gauge({
  name: 'status_icon_cooling_denied',
  help: 'cooling denied',
});

export const statusIconFlowDownGauge = new Gauge({
  name: 'status_icon_flow_down',
  help: 'flow down',
});

export const statusIconFreeHeatingGauge = new Gauge({
  name: 'status_icon_free_heating',
  help: 'free heating',
});

export const statusIconFreeCoolingGauge = new Gauge({
  name: 'status_icon_free_cooling',
  help: 'free cooling',
});

export const statusIconAlarmFGauge = new Gauge({
  name: 'status_icon_alarm_f',
  help: 'alarm F',
});

export const statusIconAlarmWGauge = new Gauge({
  name: 'status_icon_alarm_w',
  help: 'alarm W',
});

export const normalSupplyFlowGauge = new Gauge({
  name: 'normal_supply_flow',
  help: 'normal_supply_flow',
});

export const normalExtractFlowGauge = new Gauge({
  name: 'normal_extract_flow',
  help: 'normal_extract_flow',
});

export const overrideSupplyFlowGauge = new Gauge({
  name: 'override_supply_flow',
  help: 'override_supply_flow',
});

export const overrideExtractFlowGauge = new Gauge({
  name: 'override_extract_flow',
  help: 'override_extract_flow',
});

export const supplyTemperatureGauge = new Gauge({
  name: 'supply_temperature',
  help: 'supply_temperature',
});

export const extractTemperatureGauge = new Gauge({
  name: 'extract_temperature',
  help: 'extract_temperature',
});

export const outdoorTemperatureGauge = new Gauge({
  name: 'outdoor_temperature',
  help: 'outdoor_temperature',
});

export const supplyFlowGauge = new Gauge({
  name: 'supply_flow',
  help: 'supply_flow',
});

export const extractFlowGauge = new Gauge({
  name: 'extract_flow',
  help: 'extract_flow',
});

export const supplyFanIntensivityGauge = new Gauge({
  name: 'supply_fan_sntensivity',
  help: 'supply_fan_sntensivity',
});

export const extractFanIntensivityGauge = new Gauge({
  name: 'extract_fan_sntensivity',
  help: 'extract_fan_sntensivity',
});

export const heatExchangerGauge = new Gauge({
  name: 'heat_exchanger',
  help: 'heat_exchanger',
});

export const electricHeaterGauge = new Gauge({
  name: 'electric_heater',
  help: 'electric_heater',
});

export const dxUnitGauge = new Gauge({
  name: 'dx_unit',
  help: 'dx_unit',
});

export const filtersImupurityGauge = new Gauge({
  name: 'filters_imupurity',
  help: 'filters_imupurity',
});

export const airDampersGauge = new Gauge({
  name: 'air_dampers',
  help: 'air_dampers',
});

export const heatExchangeTypeGauge = new Gauge({
  name: 'heat_exchange_type',
  help: 'heat_exchange_type',
});

export const panelTemperatureGague = new Gauge({
  name: 'panel_temperature',
  help: 'panel_temperature',
});

export const panelHimidityGauge = new Gauge({
  name: 'panel_humidity',
  help: 'panel_humidity',
});
