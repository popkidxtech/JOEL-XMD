import moment from "moment-timezone";
import config from "../../config.cjs";
import { createCanvas, loadImage } from "canvas";

async function createThumbnailWithText(deployDateText) {
  const width = 500;
  const height = 200;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Load base image
  const baseImage = await loadImage(
    "https://raw.githubusercontent.com/jokathanjoka/joel-v1/refs/heads/main/media/chrono.webp"
  );

  // Draw base image covering entire canvas
  ctx.drawImage(baseImage, 0, 0, width, height);

  // Text styles
  ctx.fillStyle = "white";
  ctx.font = "bold 28px Arial";
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(0,0,0,0.7)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  // Draw text: little DEPLOYED SINCE (top)
  ctx.fillText("little DEPLOYED SINCE", width / 2, 50);

  // Draw deploy date text below
  ctx.fillText(deployDateText, width / 2, 100);

  return canvas.toBuffer(); // returns image buffer (PNG by default)
}

const joelcmd = async (m, sock) => {
  const prefix = config.PREFIX || "!";
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(" ")[0].toLowerCase()
    : "";
  if (cmd !== "status") return;

  const timezone = "Africa/Dar_es_Salaam";
  const deployDate = moment
    .tz(config.DEPLOY_DATE, "YYYY-MM-DD", timezone)
    .startOf("day");
  if (!deployDate.isValid()) return;

  const now = moment().tz(timezone);
  const daysPassed = now.clone().startOf("day").diff(deployDate, "days");
  const formattedTime = now.format("dddd, MMMM Do YYYY [at] hh:mm A");

  const deployDateText = deployDate.format("MMMM Do YYYY");

  // Create dynamic thumbnail image buffer with overlay text
  const imageBuffer = await createThumbnailWithText(deployDateText);

  const contextInfo = {
    isForwarded: true,
    forwardingScore: 999,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363317462952356@newsletter",
      newsletterName: "Joel Tech News",
      serverMessageId: 143,
    },
    externalAdReply: {
      title: "JOEL XMD BOT",
      body: "POWERED BY LORD JOEL",
      thumbnailUrl: "https://raw.githubusercontent.com/jokathanjoka/joel-v1/refs/heads/main/media/chrono.webp", // thumbnailUrl ignored if you send image buffer
      sourceUrl: "https://github.com/joeljamestech2",
      mediaType: 1,
      renderLargerThumbnail: false,
    },
  };

  const replyText = `\`\`\`BOT STATUS

DEPLOYED SINCE: ${deployDateText}
DAYS ACTIVE   : ${daysPassed} day(s)
CURRENT TIME  : ${formattedTime}\`\`\``;

  // Send newsletter-style status message with dynamic image buffer
  await sock.sendMessage(
    m.key.remoteJid,
    {
      image: imageBuffer,
      caption: replyText,
      contextInfo,
    },
    { quoted: m }
  );

  // Milestone message text
  let messageToSend = null;
  if (daysPassed === 30) {
    messageToSend = `\`\`\`Hello Lord Joel,\nIt has been a month since deployment and the bot is working perfectly.\n\nDeployed Since: ${deployDateText}\`\`\``;
  } else if (daysPassed === 60) {
    messageToSend = `\`\`\`Hello Lord Joel,\nTwo months have passed since deployment. I’m still functioning flawlessly.\n\nDeployed Since: ${deployDateText}\`\`\``;
  }

  // Send milestone as forwarded text message with contextInfo
  if (messageToSend) {
    await sock.sendMessage(
      `${config.TARGET_NUMBER}@s.whatsapp.net`,
      {
        text: messageToSend,
        contextInfo: {
          isForwarded: false,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363317462952356@newsletter",
            newsletterName: "Joel Tech News",
            serverMessageId: 143,
          },
          externalAdReply: {
            title: "JOEL XMD BOT ",
            body: "POWERED BY LORD JOEL",
            thumbnailUrl: "https://raw.githubusercontent.com/jokathanjoka/joel-v1/refs/heads/main/media/chrono.webp", // no url, image buffer only for main msg
            sourceUrl: "https://github.com/joeljamestech2",
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        },
      },
      { quoted: m }
    );
  }
};

export default joelcmd;
