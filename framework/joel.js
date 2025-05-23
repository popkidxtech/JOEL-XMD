import axios from 'axios';
import yts from 'yt-search';

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

    // Try Vreden API first
    let data = null;
    try {
      const vredenApi = `https://api.vreden.my.id/api/ytplaymp3?query=${encodeURIComponent(text)}`;
      const res = await axios.get(vredenApi);
      if (res.data?.result?.status && res.data.result.download?.url) {
        data = {
          title: res.data.result.metadata.title,
          url: res.data.result.metadata.url,
          thumbnail: res.data.result.metadata.thumbnail,
          duration: res.data.result.metadata.duration?.timestamp || 'N/A',
          views: res.data.result.metadata.views?.toLocaleString() || 'N/A',
          author: res.data.result.metadata.author?.name || 'Unknown',
          download_url: res.data.result.download.url,
        };
      }
    } catch (e) {
      console.warn("Primary API failed, trying fallback...");
    }

    // Fallback using yt-search + Gifted API
    if (!data) {
      const search = await yts(text);
      const video = search.videos[0];
      if (!video) throw new Error("No video found for fallback");

      const giftedApi = `https://api.giftedtech.web.id/api/download/ytmusic?apikey=gifted&url=${encodeURIComponent(video.url)}`;
      const fallbackRes = await axios.get(giftedApi);
      if (!fallbackRes.data?.success) throw new Error("joelXtech API failed");

      data = {
        title: video.title,
        url: video.url,
        thumbnail: video.thumbnail,
        duration: video.timestamp,
        views: video.views.toLocaleString(),
        author: video.author.name,
        download_url: fallbackRes.data.result.download_url,
      };
    }

    const {
      title, url, thumbnail, duration, views, author, download_url
    } = data;

    // Info message
    await sock.sendMessage(m.from, {
      image: { url: thumbnail },
      caption: `\`\`\`╭─❍「 ᴍᴜꜱɪᴄ ᴅᴇᴛᴀɪʟꜱ 」❍
│  ᴛɪᴛʟᴇ: ${title}
│  ᴅᴜʀᴀᴛɪᴏɴ: ${duration}
│  ᴠɪᴇᴡꜱ: ${views}
│  ᴀʀᴛɪꜱᴛ: ${author}
╰───────────────❍
ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ\`\`\``,
      contextInfo: {
        externalAdReply: {
          title: `JOEL XMD YT PLAY MENU`,
          body: "joel Xmd bot by joelXtech",
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
      caption: "```ɴᴏᴡ ᴘʟᴀʏɪɴɢ ↻ ◁ II ▷ ↺```",
      thumbnail: joelThumbnail,
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363317462952356@newsletter',
          newsletterName: "JOEL XMD BOT",
          serverMessageId: -1,
        },
        externalAdReply: {
          title: "ᴊᴏᴇʟ ᴘʟᴀʏᴇʀ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
          body: "ɴᴏᴡ ᴘʟᴀʏɪɴɢ ↻ ◁ II ▷ ↺",
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
      text: "```An unexpected error occurred! Please try again later.```",
    }, { quoted: m });
    if (typeof m.React === 'function') await m.React('❌');
  }
}
