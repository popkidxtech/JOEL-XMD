import moment from "moment-timezone";
import config from "../../config.cjs";

const joelcmd = async (m, sock) => {
  const prefix = config.PREFIX || "!";
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  if (cmd !== "status") return;

  const deployDate = moment.tz(config.DEPLOY_DATE, "YYYY-MM-DD", "Africa/Dar_es_Salaam").startOf('day');
  if (!deployDate.isValid()) return; // silently ignore invalid date

  const now = moment().tz("Africa/Dar_es_Salaam").startOf('day');
  const daysPassed = now.diff(deployDate, "days");

  // Always reply with the number of days passed
  await m.reply(`It has been ${daysPassed} day(s) since deployment.`);

  // Check for milestone and send message regardless of config.STATUS
  let messageToSend = null;
  if (daysPassed === 30) {
    messageToSend = "hello lord joel joel it has been one month since you deployed a bot";
  } else if (daysPassed === 60) {
    messageToSend = "hello lord joel joel it has been two month since you deployed a bot";
  }

  if (messageToSend) {
    await sock.sendMessage(`${config.TARGET_NUMBER}@s.whatsapp.net`, { text: messageToSend });
  }
};

export default joelcmd;
