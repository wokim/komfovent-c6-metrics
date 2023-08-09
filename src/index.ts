import ModbusRTU from '@widesky/modbus-serial';
import { getMonitorInfo, getPanelInfo } from './monitor';
import { getStatus } from './status';
import { getFlow } from './flow';

(async () => {
  try {
    const client = new ModbusRTU();
    await client.connectTCP(process.env.HOST || '192.168.1.26', {
      port: parseInt(process.env.PORT || '502', 10),
    });

    // set the client's unit id (default: 1)
    client.setID(1);
    client.setTimeout(1000);

    const status = await getStatus(client);
    const flow = await getFlow(client);
    const monitor = await getMonitorInfo(client);
    const panel = await getPanelInfo(client);

    console.log(status, flow, monitor, panel);

    return new Promise<void>((resolve) => client.close(resolve));
  } catch (e) {
    console.error(e);
  }
})();
