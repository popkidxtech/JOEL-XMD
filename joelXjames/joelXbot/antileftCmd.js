// commands/group/antileft.js import fs from 'fs'; import moment from 'moment-timezone';

const antileftPath = './antileft.json'; const antileftData = fs.existsSync(antileftPath) ? JSON.parse(fs.readFileSync(antileftPath)) : {};

const antileftCmd = async (m, Matrix) => { if (!m.isGroup) return m.reply('👥 This command only works in groups!');

const groupId = m.from; const metadata = await Matrix.groupMetadata(groupId); const senderIsAdmin = metadata.participants.some(p => p.id === m.sender && p.admin !== null); if (!senderIsAdmin) return m.reply('🚫 Only group admins can use this command!');

const cmd = m.body.toLowerCase();

if (cmd.includes('antileft on')) { antileftData[groupId] = true; fs.writeFileSync(antileftPath, JSON.stringify(antileftData, null, 2)); return m.reply('✅ Anti-left has been enabled in this group!'); }

if (cmd.includes('antileft off')) { delete antileftData[groupId]; fs.writeFileSync(antileftPath, JSON.stringify(antileftData, null, 2)); return m.reply('❌ Anti-left has been disabled in this group.'); }

return m.reply('⚙️ Usage: #antileft on / #antileft off'); };

export default antileftCmd;

// events/groupParticipantsUpdate.js import fs from 'fs'; import moment from 'moment-timezone';

const antileftPath = './antileft.json'; const antileftData = fs.existsSync(antileftPath) ? JSON.parse(fs.readFileSync(antileftPath)) : {};

const groupParticipantsUpdate = async (sock, update) => { const { participants, id: groupId } = update;

if (!antileftData[groupId]) return;

const metadata = await sock.groupMetadata(groupId);

for (const jid of participants) { try { await sock.groupParticipantsUpdate(groupId, [jid], 'add');

let profile;
  try {
    profile = await sock.profilePictureUrl(jid, 'image');
  } catch {
    profile = 'https://lh3.googleusercontent.com/proxy/esjjzRYoXlhgNYXqU8Gf_3lu6V-eONTnymkLzdwQ6F6z0MWAqIwIpqgq_lk4caRIZF_0Uqb5U8NWNrJcaeTuCjp7xZlpL48JDx-qzAXSTh00AVVqBoT7MJ0259pik9mnQ1LldFLfHZUGDGY=w1200-h630-p-k-no-nu';
  }

  const userName = jid.split('@')[0];
  const now = moment.tz('Africa/Tanzania');
  const leaveTime = now.format('HH:mm:ss');
  const leaveDate = now.format('DD/MM/YYYY');
  const validLeaveDate = now.clone().add(90, 'days').format('DD/MM/YYYY');
  const membersCount = metadata.participants.length;
  const groupName = metadata.subject;

  await sock.sendMessage(groupId, {
    image: { url: profile },
    caption: `👤 Hello .. @${userName}\n\n🚫 Don't leave the group *${groupName}*!\nYou must stay for at least *90 days*.\n\n❌ If you leave before then, your account will be *banned permanently*.\n\n📅 Leave date: ${leaveDate}\n🕒 Leave time: ${leaveTime}\n✅ You may leave safely after: *${validLeaveDate}*\n👥 Group members: ${membersCount}`,
    mentions: [jid],
  });
} catch (err) {
  console.error('Anti-left error:', err);
}

} };

export default groupParticipantsUpdate;

