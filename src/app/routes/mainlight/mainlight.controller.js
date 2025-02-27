import { Router } from "express";
import { sendDevboardKey } from "./mainlight.model.js";
import devboardCommands from "../../services/devboard/devboardCommands.js";

const router = Router();
const commands = devboardCommands.mainLight;

const presetsDictionary = {
    "job" : commands.presetJob,
    "reading" : commands.presetReading,
    "lunch" : commands.presetLunch,
    "evening" : commands.presetEvening,
}

router.post('/power/toggle', async (req, res) => {
    res.send(await sendDevboardKey(commands.powerSwitch, req));
});
router.post('/brigthness/auto/up', async (req, res) => {
    res.send(await sendDevboardKey(commands.brightnessAutoUp, req));
});
router.post('/brigthness/auto/down', async (req, res) => {
    res.send(await sendDevboardKey(commands.brightnessAutoDown, req));
});
router.post('/temperature/auto/warmer', async (req, res) => {
    res.send(await sendDevboardKey(commands.temperatureAutoWarmer, req));
});
router.post('/temperature/auto/colder', async (req, res) => {
    res.send(await sendDevboardKey(commands.temperatureAutoColder, req));
});
router.post('/preset/activate', async (req, res) => {
    const mode = req.body.mode;
    if (mode in presetsDictionary) {
        res.send(await sendDevboardKey(presetsDictionary[mode], req));
    }
    else {
        res.send(false);
    }
});

export default Router().use('/mainlight', router);