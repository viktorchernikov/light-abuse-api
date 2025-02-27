
import { SerialPort } from 'serialport';

class Devboard
{
    constructor() {
        this.initialized = false;
        this.serialPort = new SerialPort({ path: 'COM1', baudRate: 9600, autoOpen: false });
    }

    async connect() {
        if (this.initialized)
        {
            console.error("Devboard: Already connected, but still tried to connect!");
            return false;
        }
        return await new Promise((resolve, reject) => {
            const path = process.env.DEVBOARD_SERIAL_PATH || "COM1";
            const baudRate = parseInt(process.env.DEVBOARD_SERIAL_BAUDRATE || 9600);
            const resetTime = parseInt(process.env.DEVBOARD_RESET_TIME || 5000);

            const port = new SerialPort({
                path: path, 
                baudRate: baudRate
            }, (error) => {
                if (error) {
                    console.error(`Devboard: Serial port (${path}) experienced initialization error - ${error.message}`);
                    reject(false);
                }
            });

            port.on('error', (error) => {
                console.error(`Devboard: Experienced error - ${error.message}`);
            });
            port.on('open', () => {
                console.info(`Devboard: Serial port (${path}) successfully opened. Baud rate is ${baudRate}`);
                console.info(`Devboard: Waiting for reset..`);
                setTimeout(() => {
                    console.info(`Devboard: Successfully reset`);
                    console.info(`Devboard: Ready for communication!`);
                    this.serialPort = port;
                    this.initialized = true;
                    resolve(true);
                }, resetTime)
            });
        });
    }
    async sendKey(key = "P") {
        let success = true;
        this.serialPort.write(Buffer.from(key), (error) => {
            if (error) {
                success = false;
                console.error(`Devboard: Experienced error - ${error.message}`);
            }
        });
        return success;
    }
    static fromReq(req) {
        return req.app.locals.devboard;
    }
}

export default Devboard;