import ModbusRTU from '@widesky/modbus-serial';

export enum Status {
  Off = 0,
  On = 1,
}

export enum Mode {
  Stanby = 0,
  Away = 1,
  Normal = 2,
  Intensive = 3,
  Boost = 4,
  Kitchen = 5,
  Fireplace = 6,
  Override = 7,
  Holiday = 8,
  AirQuality = 9,
  Off = 10,
}

export async function getStatus(client: ModbusRTU) {
  const status = {
    power: Status.Off,
    eco: Status.Off,
    auto: Status.Off,
    mode: Mode.Off,
    icon: {
      starting: Status.Off,
      stoping: Status.Off,
      fan: Status.Off,
      rotor: Status.Off,
      heating: Status.Off,
      cooling: Status.Off,
      heatingDenied: Status.Off,
      coolingDenied: Status.Off,
      flowDown: Status.Off,
      freeHeating: Status.Off,
      freeCooling: Status.Off,
      alarmF: Status.Off,
      alarmW: Status.Off,
    },
  };

  const modes = await client.readHoldingRegisters(0, 5);

  status.power = modes.buffer.readUint16BE(0);
  status.eco = modes.buffer.readUint16BE(4);
  status.auto = modes.buffer.readUint16BE(6);
  status.mode = modes.buffer.readUint16BE(8);

  const icon = (await client.readHoldingRegisters(899, 1)).buffer.readUInt16BE(
    0
  );
  for (let i = 0; i < 13; ++i) {
    if ((icon >> i) & 0x01) {
      switch (i) {
        case 0:
          status.icon.starting = Status.On;
          break;
        case 1:
          status.icon.stoping = Status.On;
          break;
        case 2:
          status.icon.fan = Status.On;
          break;
        case 3:
          status.icon.rotor = Status.On;
          break;
        case 4:
          status.icon.heating = Status.On;
          break;
        case 5:
          status.icon.cooling = Status.On;
          break;
        case 6:
          status.icon.heatingDenied = Status.On;
          break;
        case 7:
          status.icon.coolingDenied = Status.On;
          break;
        case 8:
          status.icon.flowDown = Status.On;
          break;
        case 9:
          status.icon.freeHeating = Status.On;
          break;
        case 10:
          status.icon.freeCooling = Status.On;
          break;
        case 11:
          status.icon.alarmF = Status.On;
          break;
        case 12:
          status.icon.alarmW = Status.On;
          break;
      }
    }
  }

  return status;
}
