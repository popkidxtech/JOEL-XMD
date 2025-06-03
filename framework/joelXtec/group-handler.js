import moment from 'moment-timezone';
import config from '../../config.cjs';

export default async function GroupParticipants(sock, { id, participants, action }) {
  try {
    const metadata = await sock.groupMetadata(id);

    for (const jid of participants) {
      let profile;
      try {
        profile = await sock.profilePictureUrl(jid, "image");
      } catch {
        profile = "https://lh3.googleusercontent.com/proxy/esjjzRYoXlhgNYXqU8Gf_3lu6V-eONTnymkLzdwQ6F6z0MWAqIwIpqgq_lk4caRIZF_0Uqb5U8NWNrJcaeTuCjp7xZlpL48JDx-qzAXSTh00AVVqBoT7MJ0259pik9mnQ1LldFLfHZUGDGY=w1200-h630-p-k-no-nu";
      }

      const userName = jid.split('@')[0];
      const leaveTime = moment.tz('Africa/Tanzania').format('HH:mm:ss');
      const leaveDate = moment.tz('Africa/Tanzania').format('DD/MM/YYYY');
      const membersCount = metadata.participants.length;

      if (action === "add" && config.WELCOME) {
        sock.sendMessage(id, {
          text: `
┌─❖
│『  *Hi..!! 🐦*  』
└┬
 ◎ 「  @${userName} 」
 │ ➪  *Wᴇʟᴄᴏᴍᴇ Tᴏ*
 ◎      ${metadata.subject} 
 │ ➪  *Mᴇᴍʙᴇʀ :*
 ◎      ${membersCount}th
 │ ➪  *Jᴏɪɴᴇᴅ :*
 ◎      ${leaveTime} ${leaveDate}
 │ ➪  *Support by Subscribe My Channel :*
 ◎      youtube.com/@joeljamestech255
 └─────────────||`,
          contextInfo: {
            mentionedJid: [jid],
            externalAdReply: {
              title: `ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ᴏᴜʀ ɢʀᴏᴜᴘ`,
              mediaType: 1,
              previewType: 0,
              renderLargerThumbnail: true,
              thumbnailUrl: profile,
              sourceUrl: 'https://github.com/joeljamestech2/JOEL-XMD'
            }
          }
        });
      } else if (action === "remove" && config.WELCOME) {
        sock.sendMessage(id, {
          text: `
┌─❖
│『  *Gᴏᴏᴅʙʏᴇ..!! 🍁*  』 
└┬
 ◎ 「  @${userName}   」
 │ ➪  *Lᴇғᴛ ғʀᴏᴍ*
 ◎      ${metadata.subject} 
 │ ➪  *Mᴇᴍʙᴇʀ :*
 ◎      ${membersCount}th
 │ ➪  *Tɪᴍᴇ :*
 ◎      ${leaveTime} ${leaveDate}
 │ ➪  *Support by Subscribe My Channel :*
 ◎      youtube.com/@joeljamestech255
 └─────────────||`,
          contextInfo: {
            mentionedJid: [jid],
            externalAdReply: {
              title: `ɢᴏᴏᴅʙʏᴇ ᴀ ғᴏʟʟᴇɴ sᴏʟᴅɪᴇʀ`,
              mediaType: 1,
              previewType: 0,
              renderLargerThumbnail: true,
              thumbnailUrl: profile,
              sourceUrl: 'https://github.com/joeljamestech2/JOEL-XMD'
            }
          }
        });

        // 🛑 Anti-left feature
        if (config.ANTILEFT) {
          try {
            // Attempt to add user back
            await sock.groupParticipantsUpdate(id, [jid], 'add');

            // Calculate 90-day leave allowance
            const leaveAfter = moment().add(90, 'days').tz('Africa/Tanzania').format('DD/MM/YYYY');

            // Send profile with warning
            await sock.sendMessage(id, {
              image: { url: profile },
              caption: `👋 *hEllo .. @${userName}*\n🚫 *Don't leave the group* _${metadata.subject}_\n⏳ *Before 90 days*, else your account will be *banned permanently*.\n📅 *You may leave after:* ${leaveAfter}`,
              mentions: [jid]
            });

          } catch (err) {
            console.error('❌ Anti-left error:', err);
          }
        }
      }
    }
  } catch (e) {
    console.error('GroupParticipants Error:', e);
  }
}
