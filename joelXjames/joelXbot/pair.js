import axios from "axios"; import config from '../../config.cjs';

const pairHandler = async (m, gss) => { const prefix = config.PREFIX; const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : ""; const args = m.body.trim().split(/\s+/).slice(1); const textnumber = args[0];

const validCommands = ["pair", "paircode", "code"]; if (!validCommands.includes(cmd)) return;

if (!textnumber) { return m.reply("Please provide a phone number.\nExample: .pair 255714595078"); }

if (!/^\d{5,15}$/.test(textnumber)) { return m.reply("Invalid phone number format. Only digits allowed (5–15 characters)."); }

try { m.reply("Fetching pair code from joel Xmd");

const apiUrl = `https://joel-xmd-bot.onrender.com/code?number=${encodeURIComponent(textnumber)}`;
const response = await axios.get(apiUrl);
const data = response.data;

if (!data?.code) {
  return m.reply("```Failed to retrieve pair code. Try again later or check the number.```");
}

await gss.sendMessage(m.from, {
  text: `${data.code}`,
  contextInfo: {
    isForwarded: true,
    forwardingScore: 777,
    externalAdReply: {
      title: "JOEL XMD PAIR CODE",
      body: "joel Xmd is now GA",
      thumbnailUrl: "https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg",
      mediaType: 1,
      previewType: "PHOTO",
      renderLargerThumbnail: false,
      sourceUrl: "https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K",
      showAdAttribution: true,
      jpegThumbnail: await (await axios.get("https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/Xstarting.jpg", { responseType: "arraybuffer" })).data,
      mediaUrl: "https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/Xstarting.jpg"
    }
  }
}, { quoted: m });

} catch (err) { console.error("Pair Cmd Error:", err.message); m.reply("An error occurred while retrieving pair code:\n" + err.message); } };

export default pairHandler;

