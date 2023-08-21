import ModbusRTU from '@widesky/modbus-serial';

export async function getEcoStatus(client: ModbusRTU) {
  const eco = {
    minimumSupplyAirTemperature: 0,
    maximumSupplyAirTemperature: 0,
    freeHeatingOrCooling: 0, // Off = 0, On = 1
    heatingEnableDenied: 0, // Off = 0, On = 1
    coolingEnableDenied: 0, // Off = 0, On = 1
    heatRecoveryControl: 0, // Auto = 0, Constant = 1, Non stop = 2
  };

  eco.minimumSupplyAirTemperature =
    (await client.readHoldingRegisters(199, 1)).buffer.readUint16BE(0) / 10;
  eco.maximumSupplyAirTemperature =
    (await client.readHoldingRegisters(200, 1)).buffer.readUint16BE(0) / 10;
  eco.freeHeatingOrCooling = (
    await client.readHoldingRegisters(201, 1)
  ).buffer.readUint16BE(0);
  eco.heatingEnableDenied = (
    await client.readHoldingRegisters(202, 1)
  ).buffer.readUint16BE(0);
  eco.coolingEnableDenied = (
    await client.readHoldingRegisters(203, 1)
  ).buffer.readUint16BE(0);
  eco.heatRecoveryControl = (
    await client.readHoldingRegisters(216, 1)
  ).buffer.readUint16BE(0);

  return eco;
}
