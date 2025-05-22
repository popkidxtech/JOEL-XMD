
import axios from 'axios';
import config from '../../config.cjs';

const playHandler = async (m, sock) => {
  try {
    if (!m?.from || !m?.body || !sock) {
      console.error('Invalid message or socket object');
      return;
    }

    const joel = 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/thumbnail.jpg';
    const prefix = config.PREFIX || '!';
    const body = m.body || '';

    if (!body.startsWith(prefix)) return;

    const cmd = body.slice(prefix.length).split(' ')[0].toLowerCase();
    const text = body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['sing', 'ytmp3', 'song', 'audio', 'play', 'p'];
    if (!validCommands.includes(cmd)) return;

    if (!text) {
      await sock.sendMessage(m.from, {
        text: "```ops! Please provide a song name or artist!```",
      }, { quoted: m });

      if (typeof m.React === 'function') await m.React('❌');
      return;
    }

    if (typeof m.React === 'function') await m.React('⏳');

    try {
      const apiUrl = `https://api.nexoracle.com/downloader/yt-play2?apikey=33241c3a8402295fdc&q=${encodeURIComponent(text)}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data?.status || !data?.result || !data.result.title) {
        await sock.sendMessage(m.from, {
          text: "```Uh-oh! No results found for that song!```",
        }, { quoted: m });

        if (typeof m.React === 'function') await m.React('❌');
        return;
      }

      const {
        title = 'Unknown',
        audio,
      } = data.result;

      // 1. Send song info
      await sock.sendMessage(m.from, {
        image: { url: joel },
        caption: `\`\`\`╭─❍「 ᴍᴜsɪᴄ ᴅᴇᴛᴀɪʟs 」❍
│  🎵 *Title:* ${result.title}
╰───────────────━⊷
ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ\`\`\``,
        contextInfo: {
          externalAdReply: {
            title: title,
            body: "ᴘʟᴀʏɪɴɢ ᴠɪᴀ ᴊᴏᴇʟ xmᴅ ʙᴏᴛ",
            thumbnailUrl: joel,
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        },
      }, { quoted: m });

      // 2. Send audio
      await sock.sendMessage(m.from, {
        audio: { url: result.audio },
        mimetype: "audio/mpeg",
        ptt: false,
        caption: `now playing ↻ ◁ II ▷ ↺`,
        thumbnail: joel,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter',
            newsletterName: "ᴊᴏᴇʟ xmᴅ ʙᴏᴛ ",
            serverMessageId: -1,
          },
          externalAdReply: {
            title: "ᴊᴏᴇʟ xmᴅ ʙᴏᴛ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
            body: "ᴘʟᴀʏɪɴɢ ɴᴏᴡ ↻ ◁ II ▷ ↺",
            thumbnailUrl: joel,
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      }, { quoted: m });

      if (typeof m.React === 'function') await m.React('🎵');
    } catch (error) {
      console.error("Error in play command:", error);
      const errMsg = error.response?.data?.message || "Oh no! Something went wrong!";
      await sock.sendMessage(m.from, {
        text: `❌ ${errMsg} 😢`,
      }, { quoted: m });

      if (typeof m.React === 'function') await m.React('❌');
    }
  } catch (error) {
    console.error('Critical error in playHandler:', error);
    await sock.sendMessage(m.from, {
      text: "```❌ Uh-oh! An unexpected error occurred! 😣 Try using *song2* as fallback.```",
    }, { quoted: m });

    if (typeof m.React === 'function') await m.React('❌');
  }
};

export default playHandler;
