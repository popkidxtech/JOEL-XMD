import axios from "axios";
import config from '../../config.cjs';

const cooldowns = new Set();

const pairHandler = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  const args = m.body.trim().split(/\s+/).slice(1);
  const textnumber = args[0];

  const validCommands = ["pair", "paircode", "code"];
  if (!validCommands.includes(cmd)) return;

  if (!textnumber) {
    return m.reply("```Please provide a phone number.\nExample: .pair 255714595078```");
  }

  const sanitizedNumber = textnumber.replace(/[^0-9]/g, "");
  if (!/^\d{5,15}$/.test(sanitizedNumber)) {
    return m.reply("```Invalid phone number format. Only digits allowed (5–15 characters).```");
  }

  // Cooldown check
  if (cooldowns.has(m.sender)) {
    return m.reply("```Please wait a few seconds before using this command again.```");
  }
  cooldowns.add(m.sender);
  setTimeout(() => cooldowns.delete(m.sender), 10 * 1000); // 10 sec cooldown

  try {
    m.reply("```Fetching pair code from Joel XMD...```");

    const apiUrl = `https://joel-xmd-bot.onrender.com/code?number=${encodeURIComponent(sanitizedNumber)}`;
    const response = await axios.get(apiUrl);

    if (response.status !== 200 || !response.data?.code) {
      console.warn(`[PAIR CMD FAIL] Status: ${response.status} - ${response.statusText}`);
      return m.reply("```Failed to retrieve code. Server may be down or number invalid.```");
    }

    const code = response.data.code;

    const thumbBuffer = await axios.get("https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/Xstarting.jpg", { responseType: "arraybuffer" });

    await gss.sendMessage(m.from, {
      text: `${code}*`,
      buttons: [
        {
          buttonId: "https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K",
          buttonText: { displayText: "join my channel" },
          type: 1
        }
      ],
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
          jpegThumbnail: thumbBuffer.data,
          mediaUrl: "https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/Xstarting.jpg"
        }
      }
    }, { quoted: m });

  } catch (err) {
    console.error("joel xmd Pair Cmd Error:", err);
    m.reply("```An error occurred while retrieving pair code:\n```" + err.message);
  }
};

export default pairHandler;
