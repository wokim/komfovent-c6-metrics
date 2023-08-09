import ModbusRTU from '@widesky/modbus-serial';
import { Mode } from './status';
import { find } from 'lodash';

export enum Fan {
  Supply = 0,
  Extract = 1,
}

export const flowAddress = [
  { mode: Mode.Away, register: { supply: 99, extract: 101 } },
  { mode: Mode.Normal, register: { supply: 105, extract: 107 } },
  { mode: Mode.Intensive, register: { supply: 111, extract: 113 } },
  { mode: Mode.Boost, register: { supply: 117, extract: 119 } },
  { mode: Mode.Kitchen, register: { supply: 123, extract: 125 } },
  { mode: Mode.Fireplace, register: { supply: 130, extract: 132 } },
  { mode: Mode.Override, register: { supply: 137, extract: 139 } },
];

export async function updateFanSpeed(
  client: ModbusRTU,
  mode: Mode,
  fan: Fan,
  value: number
) {
  if (value > 100 || value < 0) return;

  const address = find(flowAddress, { mode });
  if (address) {
    if (fan === Fan.Supply) {
      await client.writeRegisters(address.register.supply, [0, value]);
    } else {
      await client.writeRegisters(address.register.extract, [0, value]);
    }
  }
}

export async function getFanSpeed(client: ModbusRTU, mode: Mode, fan: Fan) {
  const address = find(flowAddress, { mode });
  if (address) {
    if (fan === Fan.Supply) {
      return (
        await client.readHoldingRegisters(address.register.supply, 2)
      ).buffer.readUInt32BE(0);
    } else {
      return (
        await client.readHoldingRegisters(address.register.extract, 2)
      ).buffer.readUInt32BE(0);
    }
  }
  return 0;
}

export async function getFlow(client: ModbusRTU) {
  const flow = {
    normal: { supply: 0, extract: 0 },
    override: { supply: 0, extract: 0 },
  };
  flow.normal.supply = await getFanSpeed(client, Mode.Normal, Fan.Supply);
  flow.normal.extract = await getFanSpeed(client, Mode.Normal, Fan.Extract);
  flow.override.supply = await getFanSpeed(client, Mode.Override, Fan.Supply);
  flow.override.extract = await getFanSpeed(client, Mode.Override, Fan.Extract);

  return flow;
}
