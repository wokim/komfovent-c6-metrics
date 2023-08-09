import ModbusRTU from '@widesky/modbus-serial';

export async function getMonitorInfo(client: ModbusRTU) {
  const monitor = {
    supplyTemperature: 0,
    extractTemperature: 0,
    outdoorTemperature: 0,
    supplyFlow: 0,
    extractFlow: 0,
    supplyFanIntensivity: 0,
    extractFanIntensivity: 0,
    heatExchanger: 0,
    electricHeater: 0,
    dxUnit: 0,
    filtersImupurity: 0,
    airDampers: 0,
    heatExchangeType: 0, // 0: Plate, 1: Rotary
  };

  const buffer = (await client.readHoldingRegisters(900, 20)).buffer;

  monitor.supplyTemperature = buffer.readInt16BE(2) / 10;
  monitor.extractTemperature = buffer.readInt16BE(4) / 10;
  monitor.outdoorTemperature = buffer.readInt16BE(6) / 10;
  monitor.supplyFlow = buffer.readUint32BE(10);
  monitor.extractFlow = buffer.readUint32BE(14);

  monitor.supplyFanIntensivity = buffer.readUInt16BE(18) / 10;
  monitor.extractFanIntensivity = buffer.readUInt16BE(20) / 10;
  monitor.heatExchanger = buffer.readUInt16BE(22) / 10;
  monitor.electricHeater = buffer.readUInt16BE(24) / 10;
  monitor.dxUnit = buffer.readInt16BE(30) / 10;
  monitor.filtersImupurity = buffer.readUInt16BE(32);
  monitor.airDampers = buffer.readUInt16BE(34);
  monitor.heatExchangeType = (
    await client.readHoldingRegisters(954, 1)
  ).buffer.readUint16BE(0);

  return monitor;
}

export async function getPanelInfo(client: ModbusRTU) {
  const panel = {
    temperature: 0,
    humidity: 0,
  };

  let buffer;
  const connected = (
    await client.readHoldingRegisters(953, 1)
  ).buffer.readUint16BE(0);
  if (connected === 1) {
    buffer = (await client.readHoldingRegisters(945, 6)).buffer;
  } else {
    buffer = (await client.readHoldingRegisters(948, 6)).buffer;
  }

  panel.temperature = buffer.readInt16BE(0) / 10;
  panel.humidity = buffer.readInt16BE(2);

  return panel;
}
