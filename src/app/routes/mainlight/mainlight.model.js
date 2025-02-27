import Devboard from "../../services/devboard/devboard.js";

export async function sendDevboardKey(key = "", req) {
    const devboard = Devboard.fromReq(req);
    return await devboard.sendKey(key);
}