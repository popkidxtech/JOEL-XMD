import axios from 'axios';

const joelThumbnail = 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/thumbnail.jpg';

export async function playHandler(m, sock, prefix) {
  try {
    if (!m?.from || !m?.body || !sock) {
      console.error('Invalid message or socket object');
      return;
    }

    const body = m.body || '';

    if (!body.startsWith(prefix)) return;

    const cmd = body.slice(prefix.length).split(' ')[0].toLowerCase();
    const text = body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['sing', 'ytmp3', 'song', 'audio', 'play', 'p'];
    if (!validCommands.includes(cmd)) return;

    if (!text) {
      await sock.sendMessage(m.from, {
        text: "```Oops! Please provide a song name or artist!```",
      }, { quoted: m });
      if (typeof m.React === 'function') await m.React('❌');
      return;
    }

    if (typeof m.React === 'function') await m.React('⏳');

    const apiUrl = `https://my-rest-pi.vercel.app/api/play?query=${encodeURIComponent(text)}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data?.status || !data.download_url) {
      await sock.sendMessage(m.from, {
        text: "```No results found for that song!```",
      }, { quoted: m });
      if (typeof m.React === 'function') await m.React('❌');
      return;
    }

    const {
      title = 'Unknown',
      author = 'Unknown',
      duration = '0:00',
      views = 'N/A',
      url,
      thumbnail,
      download_url,
    } = data;

    // Info message
    await sock.sendMessage(m.from, {
      image: { url: thumbnail },
      caption: `\`\`\`╭─❍「 ᴍᴜsɪᴄ ᴅᴇᴛᴀɪʟs 」❍
│  Title: ${title}
│  Duration: ${duration}
│  Views: ${views}
│  Published: N/A
╰───────────────━⊷
Powered by LORD JOEL\`\`\``,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: "Playing via JOEL XMD Bot",
          thumbnailUrl: joelThumbnail,
          sourceUrl: url,
          mediaType: 1,
          renderLargerThumbnail: false,
        },
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363317462952356@newsletter',
          newsletterName: "JOEL XMD BOT",
          serverMessageId: -1,
        },
      },
    }, { quoted: m, isForwarded: true, forwardingScore: 999 });

    // Audio message
    await sock.sendMessage(m.from, {
      audio: { url: download_url },
      mimetype: "audio/mpeg",
      ptt: false,
      caption: "```now playing ↻ ◁ II ▷ ↺```",
      thumbnail: joelThumbnail,
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363317462952356@newsletter',
          newsletterName: "JOEL XMD BOT",
          serverMessageId: -1,
        },
        externalAdReply: {
          title: "JOEL XMD BOT by LORD JOEL",
          body: "Playing now ↻ ◁ II ▷ ↺",
          thumbnailUrl: thumbnail,
          sourceUrl: url,
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: m, isForwarded: true, forwardingScore: 999 });

    if (typeof m.React === 'function') await m.React('🎵');
  } catch (error) {
    console.error('Error in playHandler:', error);
    await sock.sendMessage(m.from, {
      text: "```An unexpected error occurred! Try using *song2* as fallback.```",
    }, { quoted: m });
    if (typeof m.React === 'function') await m.React('❌');
  }
}
