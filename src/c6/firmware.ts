import ModbusRTU from '@widesky/modbus-serial';

function numberToVersion(number: number) {
  const first = (number >> 24) & 0xff;
  const second = (number >> 20) & 0xf;
  const third = (number >> 12) & 0xff;
  const fourth = number & 0xfff;

  return `${first}.${second}.${third}.${fourth}`;
}

export async function getFirmwareVersion(client: ModbusRTU) {
  const firmware = {
    version: '0.0.0.0',
    panelVersion: '0.0.0.0',
  };

  const firmwareVersion = (
    await client.readHoldingRegisters(999, 2)
  ).buffer.readUint32BE(0);

  let panelFirmwareVersion = 0;
  const connected = (
    await client.readHoldingRegisters(953, 1)
  ).buffer.readUint16BE(0);
  if (connected === 1) {
    panelFirmwareVersion = (
      await client.readHoldingRegisters(1001, 2)
    ).buffer.readUint32BE(0);
  } else {
    panelFirmwareVersion = (
      await client.readHoldingRegisters(1003, 2)
    ).buffer.readUint32BE(0);
  }

  firmware.version = numberToVersion(firmwareVersion);
  firmware.panelVersion = numberToVersion(panelFirmwareVersion);

  return firmware;
}
