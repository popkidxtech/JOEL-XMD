import moment from "moment-timezone";
import config from "../../config.cjs";

const joelcmd = async (m, sock) => {
  if (!config.STATUS) {
    return m.reply("Status messages are currently disabled.");
  }

  const prefix = config.PREFIX || "!";
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  if (cmd !== "status") return;

  const now = moment().tz("Africa/Dar_es_Salaam").startOf('day');
  const deployDate = moment.tz(config.DEPLOY_DATE, "YYYY-MM-DD", "Africa/Dar_es_Salaam").startOf('day');
  const daysPassed = now.diff(deployDate, "days");

  let messageToSend = null;
  if (daysPassed === 30) {
    messageToSend = "\`\`\`hello lord joel joel it has been one month since you deployed a bot\`\`\`";
  } else if (daysPassed === 60) {
    messageToSend = "```hello lord joel joel it has been two month since you deployed a bot```";
  }

  if (messageToSend) {
    await sock.sendMessage(`${config.TARGET_NUMBER}@s.whatsapp.net`, { text: messageToSend });
    await m.reply(`Status message sent to ${config.TARGET_NUMBER}: "${messageToSend}"`);
  } else {
    await m.reply(`\`\`\`It has been ${daysPassed} day(s) since deployment.\`\`\``);
  }
};

export default joelcmd;
