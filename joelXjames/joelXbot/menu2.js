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
\`\`\`│ *👑 mode: ${config.MODE}\`\`\`
\`\`\`│ *👑 prefix: ${joel}\`\`\`
\`\`\`│ *💸 uptime: ${botUptime}\`\`\`
\`\`\`│ *🌟 theme: joelXtech\`\`\`
\`\`\`╰─┬────❍\`\`\`${readmore}
\`\`\`╭─┴❍「 ɢᴇɴᴇʀᴀʟ 」❍\`\`\`
\`\`\`│${joel} ping\`\`\`
\`\`\`│${joel} alive\`\`\`
\`\`\`│${joel} owner\`\`\`
\`\`\`│${joel} sudo\`\`\`
\`\`\`│${joel} infobot\`\`\`
\`\`\`│${joel} menu\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ᴀɪ ᴄʜᴀᴛ 」❍\`\`\`
\`\`\`│${joel} ai\`\`\`
\`\`\`│${joel} gpt\`\`\`
\`\`\`│${joel} bot\`\`\`
\`\`\`│${joel} chatbot\`\`\`
\`\`\`│${joel} lydea\`\`\`
\`\`\`│${joel} lydia\`\`\`
\`\`\`│${joel} autoreply\`\`\`
\`\`\`│${joel} chat\`\`\`
\`\`\`│${joel} remini\`\`\`
\`\`\`│${joel} voicechat\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ᴛᴏᴏʟs 」❍\`\`\`
\`\`\`│${joel} calculator\`\`\`
\`\`\`│${joel} tempfile\`\`\`
\`\`\`│${joel} checkmail\`\`\`
\`\`\`│${joel} trt\`\`\`
\`\`\`│${joel} tts\`\`\`
\`\`\`│${joel} ss\`\`\`
\`\`\`│${joel} qr\`\`\`
\`\`\`│${joel} readqr\`\`\`
\`\`\`│${joel} shortenerurl\`\`\`
\`\`\`│${joel} profile\`\`\`
\`\`\`│${joel} sapk\`\`\`
\`\`\`│${joel} url\`\`\`
\`\`\`│${joel} url2\`\`\`
\`\`\`│${joel} tourl\`\`\`
\`\`\`│${joel} support\`\`\`
\`\`\`│${joel} inc\`\`\`
\`\`\`│${joel} i\`\`\`
\`\`\`│${joel} app\`\`\`
\`\`\`│${joel} appsearch\`\`\`
\`\`\`│${joel} playstore\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ᴄᴏɴᴠᴇʀᴛᴇʀꜱ 」❍\`\`\`
\`\`\`│${joel} attp\`\`\`
\`\`\`│${joel} binary\`\`\`
\`\`\`│${joel} ebinary\`\`\`
\`\`\`│${joel} emomix\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ɢᴀᴍᴇꜱ+ꜰᴜɴ 」❍\`\`\`
\`\`\`│${joel} ttt\`\`\`
\`\`\`│${joel} resetttt\`\`\`
\`\`\`│${joel} wcg\`\`\`
\`\`\`│${joel} resetwcg\`\`\`
\`\`\`│${joel} connect4\`\`\`
\`\`\`│${joel} resetc4\`\`\`
\`\`\`│${joel} score\`\`\`
\`\`\`│${joel} joke\`\`\`
\`\`\`│${joel} advice\`\`\`
\`\`\`│${joel} meme\`\`\`
\`\`\`│${joel} rank\`\`\`
\`\`\`│${joel} roast\`\`\`
\`\`\`│${joel} quote\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ᴅᴏᴡɴʟᴏᴀᴅꜱ 」❍\`\`\`
\`\`\`│${joel} apk\`\`\`
\`\`\`│${joel} facebook\`\`\`
\`\`\`│${joel} insta\`\`\`
\`\`\`│${joel} tiktok\`\`\`
\`\`\`│${joel} mediafire\`\`\`
\`\`\`│${joel} pinterestdl\`\`\`
\`\`\`│${joel} gdrive\`\`\`
\`\`\`│${joel} play\`\`\`
\`\`\`│${joel} song\`\`\`
\`\`\`│${joel} video\`\`\`
\`\`\`│${joel} smedia\`\`\`
\`\`\`│${joel} movie\`\`\`
\`\`\`│${joel} image\`\`\`
\`\`\`│${joel} yts\`\`\`
\`\`\`│${joel} lyrics\`\`\`
\`\`\`│${joel} twitter\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ʀᴇʟɪɢɪᴏɴ 」❍\`\`\`
\`\`\`│${joel} bible\`\`\`
\`\`\`│${joel} biblebooks\`\`\`
\`\`\`│${joel} surahmenu\`\`\`
\`\`\`│${joel} quranvid\`\`\`
\`\`\`│${joel} qvid\`\`\`
\`\`\`│${joel} qimg\`\`\`
\`\`\`│${joel} surahaudio\`\`\`
\`\`\`│${joel} surahurdu\`\`\`
\`\`\`│${joel} asmaulhusna\`\`\`
\`\`\`│${joel} prophetname\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ɢʀᴏᴜᴘ 」❍\`\`\`
\`\`\`│${joel} linkgroup\`\`\`
\`\`\`│${joel} setppg\`\`\`
\`\`\`│${joel} setname\`\`\`
\`\`\`│${joel} setdesc\`\`\`
\`\`\`│${joel} group\`\`\`
\`\`\`│${joel} groupinfo\`\`\`
\`\`\`│${joel} welcome\`\`\`
\`\`\`│${joel} kick\`\`\`
\`\`\`│${joel} kickall\`\`\`
\`\`\`│${joel} add\`\`\`
\`\`\`│${joel} promote\`\`\`
\`\`\`│${joel} demote\`\`\`
\`\`\`│${joel} pick\`\`\`
\`\`\`│${joel} tagall\`\`\`
\`\`\`│${joel} tagadmin\`\`\`
\`\`\`│${joel} tagnotadmin\`\`\`
\`\`\`│${joel} hidetag\`\`\`
\`\`\`│${joel} antilink\`\`\`
\`\`\`│${joel} antisticker\`\`\`
\`\`\`│${joel} antibot\`\`\`
\`\`\`│${joel} antileft\`\`\`
\`\`\`│${joel} gcsetting\`\`\`
\`\`\`│${joel} vcf\`\`\`
\`\`\`│${joel} poll\`\`\`
\`\`\`│${joel} getbio\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ꜱᴛᴀʟᴋᴇʀ ᴛᴏᴏʟꜱ 」❍\`\`\`
\`\`\`│${joel} truecaller\`\`\`
\`\`\`│${joel} instastalk\`\`\`
\`\`\`│${joel} tiktokstalk\`\`\`
\`\`\`│${joel} githubstalk\`\`\`
\`\`\`│${joel} npmstalk\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ᴡᴀʟʟᴘᴀᴘᴇʀꜱ 」❍\`\`\`
\`\`\`│${joel} anime\`\`\`
\`\`\`│${joel} uchicha\`\`\`
\`\`\`│${joel} naruto\`\`\`
\`\`\`│${joel} sasuke\`\`\`
\`\`\`│${joel} abstract\`\`\`
\`\`\`│${joel} random\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ʜᴇɴᴛᴀɪ 」❍\`\`\`
\`\`\`│${joel} hwaifu\`\`\`
\`\`\`│${joel} trap\`\`\`
\`\`\`│${joel} blowjob\`\`\`
\`\`\`│${joel} neko\`\`\`
\`\`\`│${joel} hneko\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ᴡᴀɪғᴜ 」❍\`\`\`
\`\`\`│${joel} neko\`\`\`
\`\`\`│${joel} couplepp\`\`\`
\`\`\`│${joel} cosplay\`\`\`
\`\`\`│${joel} megumin\`\`\`
\`\`\`│${joel} shinobu\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ʀᴇᴀᴄᴛɪᴏɴꜱ 」❍\`\`\`
\`\`\`│${joel} highfive\`\`\`
\`\`\`│${joel} glomp\`\`\`
\`\`\`│${joel} handhold\`\`\`
\`\`\`│${joel} shinobu\`\`\`
\`\`\`│${joel} cuddle\`\`\`
\`\`\`│${joel} cringe\`\`\`
\`\`\`│${joel} sad\`\`\`
\`\`\`│${joel} happy\`\`\`
\`\`\`│${joel} dance\`\`\`
\`\`\`│${joel} smug\`\`\`
\`\`\`│${joel} blush\`\`\`
\`\`\`│${joel} awo\`\`\`
\`\`\`│${joel} wave\`\`\`
\`\`\`│${joel} smile\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ᴘᴏᴋᴇɴᴏᴍ 」❍\`\`\`
\`\`\`│${joel} pokemon\`\`\`
\`\`\`│${joel} wallet\`\`\`
\`\`\`│${joel} buy\`\`\`
\`\`\`│${joel} winmoney\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ᴀᴜᴅɪᴏ ᴇᴅɪᴛ 」❍\`\`\`
\`\`\`│${joel} say\`\`\`
\`\`\`│${joel} tts\`\`\`
\`\`\`│${joel} bass\`\`\`
\`\`\`│${joel} blowin\`\`\`
\`\`\`│${joel} deep\`\`\`
\`\`\`│${joel} earrape\`\`\`
\`\`\`│${joel} fast\`\`\`
\`\`\`│${joel} fat\`\`\`
\`\`\`│${joel} nighttime\`\`\`
\`\`\`│${joel} reverse\`\`\`
\`\`\`│${joel} robot\`\`\`
\`\`\`│${joel} slow\`\`\`
\`\`\`│${joel} smooth\`\`\`
\`\`\`│${joel} typai\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ʟᴏɢᴏ ᴍᴀᴋᴇʀ 」❍\`\`\`
\`\`\`│${joel} logo\`\`\`
\`\`\`│${joel} logo1\`\`\`
\`\`\`│${joel} logo2\`\`\`
\`\`\`│${joel} logo3\`\`\`
\`\`\`│${joel} logo4\`\`\`
\`\`\`│${joel} logo5\`\`\`
\`\`\`│${joel} logo6\`\`\`
\`\`\`│${joel} logo7\`\`\`
\`\`\`│${joel} logo8\`\`\`
\`\`\`│${joel} logo9\`\`\`
\`\`\`│${joel} logo10\`\`\`
\`\`\`│${joel} logo11\`\`\`
\`\`\`│${joel} logo12\`\`\`
\`\`\`│${joel} logo13\`\`\`
\`\`\`│${joel} logo14\`\`\`
\`\`\`│${joel} logo15\`\`\`
\`\`\`│${joel} logo16\`\`\`
\`\`\`│${joel} logo17\`\`\`
\`\`\`│${joel} logo18\`\`\`
\`\`\`│${joel} logo19\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ᴏᴡɴᴇʀ ᴘᴀɴᴇʟ 」❍\`\`\`
\`\`\`│${joel} send\`\`\`
\`\`\`│${joel} vv\`\`\`
\`\`\`│${joel} vv1\`\`\`
\`\`\`│${joel} vv2\`\`\`
\`\`\`│${joel} vv3\`\`\`
\`\`\`│${joel} restart\`\`\`
\`\`\`│${joel} update\`\`\`
\`\`\`│${joel} pair\`\`\`
\`\`\`│${joel} forward\`\`\`
\`\`\`│${joel} getall\`\`\`
\`\`\`│${joel} jid\`\`\`
\`\`\`│${joel} join\`\`\`
\`\`\`│${joel} leave\`\`\`
\`\`\`│${joel} block\`\`\`
\`\`\`│${joel} unblock\`\`\`
\`\`\`│${joel} allcmds\`\`\`
\`\`\`│${joel} anticall\`\`\`
\`\`\`│${joel} setstatus\`\`\`
\`\`\`│${joel} autobio\`\`\`
\`\`\`│${joel} autotyping\`\`\`
\`\`\`│${joel} alwaysonline\`\`\`
\`\`\`│${joel} autoread\`\`\`
\`\`\`│${joel} autosview\`\`\`
\`\`\`│${joel} allvar\`\`\`
\`\`\`│${joel} antidelete\`\`\`
\`\`\`│${joel} addpremium\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ᴘʀᴇᴍɪᴜᴍ ᴜꜱᴇʀꜱ 」❍\`\`\`
\`\`\`│${joel} hentaivid\`\`\`
\`\`\`│${joel} xnx\`\`\`
\`\`\`│${joel} xxvideo\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ᴇᴄᴏɴᴏᴍʏ 」❍\`\`\`
\`\`\`│${joel} economy\`\`\`
\`\`\`│${joel} balance\`\`\`
\`\`\`│${joel} daily\`\`\`
\`\`\`│${joel} leaderboard\`\`\`
\`\`\`│${joel} earn\`\`\`
\`\`\`│${joel} spend\`\`\`
\`\`\`│${joel} deposit\`\`\`
\`\`\`│${joel} withdraw\`\`\`
\`\`\`│${joel} transfer\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ᴘʀᴇᴍɪᴜᴍ ʙᴜɢꜱ 」❍\`\`\`
\`\`\`│${joel} bugmenu\`\`\`
\`\`\`│${joel} docbug\`\`\`
\`\`\`│${joel} lockcrash\`\`\`
\`\`\`│${joel} amountbug\`\`\`
\`\`\`│${joel} pmbug\`\`\`
\`\`\`│${joel} delbug\`\`\`
\`\`\`│${joel} trollbug\`\`\`
\`\`\`│${joel} docubug\`\`\`
\`\`\`│${joel} unlimitedbug\`\`\`
\`\`\`│${joel} bombbug\`\`\`
\`\`\`│${joel} lagbug\`\`\`
\`\`\`│${joel} gcbug\`\`\`
\`\`\`│${joel} delgcbug\`\`\`
\`\`\`│${joel} trollgcbug\`\`\`
\`\`\`│${joel} labug\`\`\`
\`\`\`│${joel} bombgcbug\`\`\`
\`\`\`│${joel} unlimitedgcbug\`\`\`
\`\`\`│${joel} docugcbug\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ᴀɴɪᴍᴇ 」❍\`\`\`
\`\`\`│${joel} neko\`\`\`
\`\`\`│${joel} husbu\`\`\`
\`\`\`│${joel} lol\`\`\`
\`\`\`│${joel} shota\`\`\`
\`\`\`│${joel} waifu\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ɴꜱꜰᴡ 」❍\`\`\`
\`\`\`│${joel} blowjob\`\`\`
\`\`\`│${joel} cuckold\`\`\`
\`\`\`│${joel} eba\`\`\`
\`\`\`│${joel} foot\`\`\`
\`\`\`│${joel} milf\`\`\`
\`\`\`│${joel} pussy\`\`\`
\`\`\`│${joel} yuri\`\`\`
\`\`\`│${joel} zettai\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ᴛɪᴋᴛᴏᴋ ᴘɪᴄꜱ 」❍\`\`\`
\`\`\`│${joel} china\`\`\`
\`\`\`│${joel} hijabu\`\`\`
\`\`\`│${joel} indonesia\`\`\`
\`\`\`│${joel} japan\`\`\`
\`\`\`│${joel} korea\`\`\`
\`\`\`│${joel} malaysia\`\`\`
\`\`\`│${joel} thailand\`\`\`
\`\`\`│${joel} vietnam\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴──❍「 ᴛɪᴋᴛᴏᴋ ᴠɪᴅᴇᴏ 」❍\`\`\`
\`\`\`│${joel} bocil\`\`\`
\`\`\`│${joel} gheayub\`\`\`
\`\`\`│${joel} kayes\`\`\`
\`\`\`│${joel} notnot\`\`\`
\`\`\`│${joel} panrika\`\`\`
\`\`\`│${joel} santuy\`\`\`
\`\`\`│${joel} tiktokgirl\`\`\`
\`\`\`│${joel} ukihty\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ʀᴀɴᴅᴏᴍ ᴘɪᴄ 」❍\`\`\`
\`\`\`│${joel} aesthetic\`\`\`
\`\`\`│${joel} antiwork\`\`\`
\`\`\`│${joel} bike\`\`\`
\`\`\`│${joel} blackpink\`\`\`
\`\`\`│${joel} boneka\`\`\`
\`\`\`│${joel} car\`\`\`
\`\`\`│${joel} cat\`\`\`
\`\`\`│${joel} cosplay\`\`\`
\`\`\`│${joel} dogo\`\`\`
\`\`\`│${joel} justina\`\`\`
\`\`\`│${joel} kayes\`\`\`
\`\`\`│${joel} kpop\`\`\`
\`\`\`│${joel} notnot\`\`\`
\`\`\`│${joel} ppcouple\`\`\`
\`\`\`│${joel} profile\`\`\`
\`\`\`│${joel} pubg\`\`\`
\`\`\`│${joel} rose\`\`\`
\`\`\`│${joel} ryujin\`\`\`
\`\`\`│${joel} wallhp\`\`\`
\`\`\`│${joel} wallml\`\`\`
\`\`\`│${joel} ulzzangboy\`\`\`
\`\`\`│${joel} ulizzanggirl\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ɪᴍᴀɢᴇ ᴇꜰꜰᴇᴄᴛꜱ 」❍\`\`\`
\`\`\`│${joel} wanted\`\`\`
\`\`\`│${joel} ad\`\`\`
\`\`\`│${joel} beautiful\`\`\`
\`\`\`│${joel} blur\`\`\`
\`\`\`│${joel} rip\`\`\`
\`\`\`│${joel} jail\`\`\`
\`\`\`│${joel} crown\`\`\`
\`\`\`╰─┬────❍\`\`\`
\`\`\`╭─┴❍「 ɢғx ᴍᴀᴋᴇʀ 」❍\`\`\`
\`\`\`│${joel} carbon\`\`\`
\`\`\`│${joel} gfx\`\`\`
\`\`\`│${joel} gfx1\`\`\`
\`\`\`│${joel} gfx2\`\`\`
\`\`\`│${joel} gfx3\`\`\`
\`\`\`│${joel} gfx4\`\`\`
\`\`\`│${joel} gfx5\`\`\`
\`\`\`│${joel} gfx6\`\`\`
\`\`\`│${joel} gfx7\`\`\`
\`\`\`│${joel} gfx8\`\`\`
\`\`\`│${joel} gfx9\`\`\`
\`\`\`│${joel} gfx10\`\`\`
\`\`\`│${joel} gfx11\`\`\`
\`\`\`╰─────────────❍\`\`\`
\`\`\`ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ\`\`\`
`;

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
            renderLargerThumbnail: false,
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
