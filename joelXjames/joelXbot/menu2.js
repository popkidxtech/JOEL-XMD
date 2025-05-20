import config from '../../config.cjs';
import moment from 'moment-timezone';

const LogoCmd = async (m, sock) => {
  const prefix = config.PREFIX;
  const pushName = m.pushName || 'User';

  // Extract the command
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  // Define necessary variables
  const joel = config.PREFIX;
  const readmore = String.fromCharCode(8206).repeat(4001);

  // Format uptime in hh:mm:ss
  const formatUptime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}h ${mins}m ${secs}s`;
  };

  // Get greeting based on Tanzania time zone
  const getTimeWish = () => {
    const hour = moment().tz('Africa/Dar_es_Salaam').hour();
    if (hour < 12) return '🌄 Good Morning';
    if (hour < 17) return '☀️ Good Afternoon';
    if (hour < 20) return '🌇 Good Evening';
    return '🌙 Good Night';
  };

  const botUptime = formatUptime(process.uptime());
  const timewisher = getTimeWish();

  const sendCommandMessage = async (messageContent) => {
    const messagePayload = {
      text: messageContent,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363317462952356@newsletter',
          newsletterName: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
          serverMessageId: -1,
        },
        externalAdReply: {
          title: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
          body: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
          thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    };

    await sock.sendMessage(m.from, messagePayload, { quoted: m });
  };

  if (cmd === "menu") {
    try {
      await sock.sendMessage(m.from, { react: { text: "⏳", key: m.key } });

      const logoUrl = 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg';
      const caption = `
\`\`\`╭──❍「JOEL XMD BOT」❍\`\`\`
\`\`\`│ ✨ Hi! 👋\`\`\`
\`\`\`│ 🏷️ Name : ${pushName}\`\`\`
\`\`\`│ 🎉 ${timewisher}\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「BOT STATUS」❍\`\`\`
\`\`\`│ 👑 mode: botmode\`\`\`
\`\`\`│ 👑 prefix: ${joel}\`\`\`
\`\`\`│ 💸 uptime: ${botUptime}\`\`\`
\`\`\`│ 🌟 theme: joelXtech\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍\`\`\`
\`\`\`│JOEL XMD BOT PRO VISION\`\`\`
\`\`\`╰─────────────❍\`\`\`
${readmore}
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*`;

      const messagePayload = {
        image: { url: logoUrl },
        caption,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter',
            newsletterName: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ",
            serverMessageId: -1,
          },
          externalAdReply: {
            title: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
            body: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
            thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXtec.jpg',
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      };

      await sock.sendMessage(m.from, messagePayload, { quoted: m });
      await sock.sendMessage(m.from, { react: { text: "✅", key: m.key } });

    } catch (error) {
      console.error(error);
      await sendCommandMessage("⚠️ An error occurred while sending the menu. Please try again later!");
    }
  }
};

export default LogoCmd;
