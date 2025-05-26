import moment from "moment-timezone";
import config from "../../config.cjs";

const joelcmd = async (m, sock) => {
  const prefix = config.PREFIX || "!";
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  if (cmd !== "status") return;

  const timezone = "Africa/Dar_es_Salaam";
  const deployDate = moment.tz(config.DEPLOY_DATE, "YYYY-MM-DD", timezone).startOf('day');
  if (!deployDate.isValid()) return;

  const now = moment().tz(timezone);
  const daysPassed = now.clone().startOf('day').diff(deployDate, "days");
  const formattedTime = now.format("dddd, MMMM Do YYYY [at] hh:mm A");

  const imageUrl = "https://raw.githubusercontent.com/jokathanjoka/joel-v1/refs/heads/main/media/chrono.webp";
  const replyText = `\`\`\`It has been ${daysPassed} day(s) since deployment.\n\nCurrent time: ${formattedTime}\`\`\``;

  // Send to user with image
  await sock.sendMessage(m.key.remoteJid, {
    image: { url: imageUrl },
    caption: replyText
  }, { quoted: m });

  // Milestone check
  let messageToSend = null;
  if (daysPassed === 30) {
    messageToSend = "```hello lord joel, it has been a month since deployment and the bot is working perfectly```";
  } else if (daysPassed === 60) {
    messageToSend = "```hello lord joel, it has been two months since your deployment, I'm enjoying using it```";
  }

  // Send milestone message if applicable
  if (messageToSend) {
    await sock.sendMessage(`${config.TARGET_NUMBER}@s.whatsapp.net`, {
      image: { url: imageUrl },
      caption: messageToSend
    });
  }
};
//CREDITS TO LORD JOEL
export default joelcmd;
