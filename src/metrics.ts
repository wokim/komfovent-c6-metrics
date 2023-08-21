import { Counter, Gauge } from 'prom-client';

// Register Prometheus default metrics (e.g., CPU usage, memory usage)
// collectDefaultMetrics();

export const powerStatusGauge = new Gauge({
  name: 'power',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'Power status of the ventilation unit (0 for off, 1 for on)',
});

export const ecoModeGauge = new Gauge({
  name: 'eco',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'Eco mode status of the ventilation unit (0 for off, 1 for on)',
});

export const autoModeGauge = new Gauge({
  name: 'auto',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'Auto mode status of the ventilation unit (0 for off, 1 for on)',
});

export const currentModeGauge = new Gauge({
  name: 'current_mode',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'Current mode of of the ventilation unit. Stanby = 0, Away = 1, Normal = 2, Intensive = 3, Boost = 4, Kitchen = 5, Fireplace = 6, Override = 7, Holiday = 8, Air quality = 9, Off = 10',
});

export const statusIconStartingGauge = new Gauge({
  name: 'status_icon_starting',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'starting',
});

export const statusIconStopingGauge = new Gauge({
  name: 'status_icon_stoping',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'stoping',
});

export const statusIconFanGauge = new Gauge({
  name: 'status_icon_fan',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'fan',
});

export const statusIconRotorGauge = new Gauge({
  name: 'status_icon_rotor',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'rotor',
});

export const statusIconHeatingGauge = new Gauge({
  name: 'status_icon_heating',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'heating',
});

export const statusIconCoolingGauge = new Gauge({
  name: 'status_icon_cooling',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'cooling',
});

export const statusIconHeatingDeniedGauge = new Gauge({
  name: 'status_icon_heating_denied',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'heating denied',
});

export const statusIconCoolingDeniedGauge = new Gauge({
  name: 'status_icon_cooling_denied',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'cooling denied',
});

export const statusIconFlowDownGauge = new Gauge({
  name: 'status_icon_flow_down',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'flow down',
});

export const statusIconFreeHeatingGauge = new Gauge({
  name: 'status_icon_free_heating',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'free heating',
});

export const statusIconFreeCoolingGauge = new Gauge({
  name: 'status_icon_free_cooling',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'free cooling',
});

export const statusIconAlarmFGauge = new Gauge({
  name: 'status_icon_alarm_f',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'alarm F',
});

export const statusIconAlarmWGauge = new Gauge({
  name: 'status_icon_alarm_w',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'alarm W',
});

export const normalSupplyFlowGauge = new Gauge({
  name: 'normal_supply_flow',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'normal_supply_flow',
});

export const normalExtractFlowGauge = new Gauge({
  name: 'normal_extract_flow',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'normal_extract_flow',
});

export const normalSetPointGauge = new Gauge({
  name: 'normal_setpoint',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'normal_setpoint (C)',
});

export const normalHeatingGauge = new Gauge({
  name: 'normal_heating',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'normal_heating (0: off, 1: on)',
});

export const overrideSupplyFlowGauge = new Gauge({
  name: 'override_supply_flow',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'override_supply_flow',
});

export const overrideExtractFlowGauge = new Gauge({
  name: 'override_extract_flow',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'override_extract_flow',
});

export const overrideSetPointGauge = new Gauge({
  name: 'override_setpoint',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'override_setpoint (C)',
});

export const overrideHeatingGauge = new Gauge({
  name: 'override_heating',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'override_heating (0: off, 1: on)',
});

export const supplyTemperatureGauge = new Gauge({
  name: 'supply_temperature',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'supply_temperature',
});

export const extractTemperatureGauge = new Gauge({
  name: 'extract_temperature',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'extract_temperature',
});

export const outdoorTemperatureGauge = new Gauge({
  name: 'outdoor_temperature',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'outdoor_temperature',
});

export const supplyFlowGauge = new Gauge({
  name: 'supply_flow',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'supply_flow',
});

export const extractFlowGauge = new Gauge({
  name: 'extract_flow',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'extract_flow',
});

export const supplyFanIntensivityGauge = new Gauge({
  name: 'supply_fan_sntensivity',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'supply_fan_sntensivity',
});

export const extractFanIntensivityGauge = new Gauge({
  name: 'extract_fan_sntensivity',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'extract_fan_sntensivity',
});

export const heatExchangerGauge = new Gauge({
  name: 'heat_exchanger',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'heat_exchanger',
});

export const electricHeaterGauge = new Gauge({
  name: 'electric_heater',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'electric_heater',
});

export const dxUnitGauge = new Gauge({
  name: 'dx_unit',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'dx_unit',
});

export const filtersImupurityGauge = new Gauge({
  name: 'filters_imupurity',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'filters_imupurity',
});

export const airDampersGauge = new Gauge({
  name: 'air_dampers',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'air_dampers',
});

export const heatExchangeTypeGauge = new Gauge({
  name: 'heat_exchange_type',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'heat_exchange_type',
});

export const powerConsumptionGague = new Gauge({
  name: 'power_consumption',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'power_consumption (W)',
});

export const heaterPowerGauge = new Gauge({
  name: 'heater_power',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'heater_power (W)',
});

export const heatExchangerRecoveryGague = new Gauge({
  name: 'heat_exchanger_recovery',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'heat_exchanger_recovery (W)',
});

export const heatExchangerEfficiencyGauge = new Gauge({
  name: 'heat_exchanger_efficiency',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'heat_exchanger_efficiency (%)',
});

export const energySavingGauge = new Gauge({
  name: 'energy_saving',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'energy_saving (%)',
});

export const SPIGauge = new Gauge({
  name: 'spi',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'spi W/(m3/h)',
});

export const AHUConsumptionDayGauge = new Gauge({
  name: 'ahu_consumption_day',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'ahu_consumption_day (Wh)',
});

export const AHUConsumptionMonthGauge = new Gauge({
  name: 'ahu_consumption_month',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'ahu_consumption_month (Wh)',
});

export const AHUConsumptionTotalGauge = new Gauge({
  name: 'ahu_consumption_total',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'ahu_consumption_total (Wh)',
});

export const additionalAirHeaterConsumptionDayGauge = new Gauge({
  name: 'additional_air_heater_consumption_day',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'additional_air_heater_consumption_day (Wh)',
});

export const additionalAirHeaterConsumptionMonthGauge = new Gauge({
  name: 'additional_air_heater_consumption_month',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'additional_air_heater_consumption_month (Wh)',
});

export const additionalAirHeaterConsumptionTotalGauge = new Gauge({
  name: 'additional_air_heater_consumption_total',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'additional_air_heater_consumption_total (Wh)',
});

export const recoveredEnergyDayGauge = new Gauge({
  name: 'recovered_energy_day',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'recovered_energy_day (Wh)',
});

export const recoveredEnergyMonthGauge = new Gauge({
  name: 'recovered_energy_month',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'recovered_energy_month (Wh)',
});

export const recoveredEnergyTotalGauge = new Gauge({
  name: 'recovered_energy_total',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'recovered_energy_total (Wh)',
});

export const SPIPerDayGauge = new Gauge({
  name: 'spi_per_day',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'spi_per_day W/(m3/h)',
});

export const panelTemperatureGague = new Gauge({
  name: 'panel_temperature',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'panel_temperature',
});

export const panelHimidityGauge = new Gauge({
  name: 'panel_humidity',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'panel_humidity',
});

export const minimumSupplyAirTemperatureGauge = new Gauge({
  name: 'minimum_supply_air_temperature',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'eco - minimum_supply_air_temperature',
});

export const maximumSupplyAirTemperatureGauge = new Gauge({
  name: 'maximum_supply_air_temperature',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'eco - maximum_supply_air_temperature',
});

export const freeHeatingOrCoolingGauge = new Gauge({
  name: 'free_heating_or_cooling',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'eco - free_heating_or_cooling (Off = 0, On = 1)',
});

export const heatingEnableDeniedGauge = new Gauge({
  name: 'heating_enable_denied',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'eco - heating_enable_denied (Off = 0, On = 1)',
});

export const coolingEnableDeniedGauge = new Gauge({
  name: 'cooling_enable_denied',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'eco - cooling_enable_denied (Off = 0, On = 1)',
});

export const heatRecoveryControlGauge = new Gauge({
  name: 'heat_recovery_control',
  labelNames: ['firmware_version', 'panel_firmware_version'],
  help: 'eco - heat_recovery_control (Auto = 0, Constant = 1, Non stop = 2)',
});
