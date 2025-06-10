import axios from 'axios'; 
import yts from 'yt-search';

const joelThumbnail = 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/thumbnail.jpg';

export async function playHandler(m, sock, prefix) { try { if (!m?.from || !m?.body || !sock) { console.error('Invalid message or socket object'); return; }

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

let data;
try {
  const apiUrl = `https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(text)}`;
  const response = await axios.get(apiUrl);
  if (response.data?.status && response.data?.result?.download_url) {
    data = response.data.result;
  } else {
    throw new Error('Primary API failed');
  }
} catch (err) {
  const yt = await yts(text);
  const vid = yt.videos?.[0];
  if (!vid) throw new Error("No fallback result found");
  const fallbackRes = await axios.get(`https://api.giftedtech.web.id/api/download/ytmp3?apikey=gifted&url=${encodeURIComponent(vid.url)}`);
  const result = fallbackRes.data?.result;
  if (!result?.download_url) throw new Error("Fallback API failed");
  data = {
    title: result.title,
    duration: vid.timestamp,
    views: vid.views,
    published: vid.ago,
    video_url: vid.url,
    thumbnail: result.thumbnail,
    download_url: result.download_url,
  };
}

const {
  title = 'Unknown',
  duration = '0:00',
  views = 'N/A',
  published = 'N/A',
  video_url,
  thumbnail,
  download_url,
} = data;

await sock.sendMessage(m.from, {
  image: { url: thumbnail },
  caption: `

│  Title: ${title}
│  Duration: ${duration}
│  Views: ${views}
│  Published: ${published}
╰───────────────━⊷
Powered by lord joel`,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: "Playing via JOEL XMD Bot",
          thumbnailUrl: joelThumbnail,
          sourceUrl: video_url,
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
          title: "JOEL XMD BOT ",
          body: "Playing now ↻ ◁ II ▷ ↺",
          thumbnailUrl: thumbnail,
          sourceUrl: video_url,
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: m, isForwarded: false, forwardingScore: 0 });

    if (typeof m.React === 'function') await m.React('🎵');
  } catch (error) {
    console.error('Error in playHandler:', error);
    await sock.sendMessage(m.from, {
      text: "```An unexpected error occurred! Try using *song2* as fallback.```",
    }, { quoted: m });
    if (typeof m.React === 'function') await m.React('❌');
  }
}

