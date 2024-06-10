const axios = require('axios');

module.exports = {
	config: {
	name: "gettoken",
	version: "1.0.1",
	role: 1,
	author: "Kaizenji",
	shortDescription: {
			en: "( 𝙂𝙚𝙩 𝙏𝙤𝙠𝙚𝙣 )"
		},
		longDescription: {
			en: ""
		},
	category: "utility",
	usage: { en: "( get [uid] [password] )"
				 },
	cooldowns: 3,
},

onChat: async function ({ api, event }) {
  const message = event.body;
  const command = "get";

  if (message.indexOf(command) === 0 || message.indexOf(command.charAt(0).toUpperCase() + command.slice(1)) === 0) {
    const args = message.split(/\s+/);
    args.shift();

    if (args.length === 2) {
      const username = args[0];
      const password = args[1];

      api.sendMessage(`🕟 | 𝙶𝚎𝚝𝚝𝚒𝚗𝚐 𝚝𝚘𝚔𝚎𝚗 𝚏𝚘𝚛 𝚞𝚜𝚎𝚛: '${username}', 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...`, event.threadID);

      try {
        const response = await axios.get('https://combineapi-7fa2b2874c53.herokuapp.com/api/token', {
          params: {
            username: username,
            password: password,
          },
        });

        if (response.data.status) {
          const token = response.data.data.access_token;
          const token2 = response.data.data.access_token_eaad6v7; 
          const cookies = response.data.data.cookies;

          api.sendMessage(`✨ 𝚃𝚘𝚔𝚎𝚗 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚎𝚍 ✨\n\n[ 🎟 𝚃𝚘𝚔𝚎𝚗 ]\n\n${token}\n\n${token2}\n\n[ 🍪 𝙲𝚘𝚘𝚔𝚒𝚎𝚜 ]\n\n${cookies}`, event.threadID);
          console.log("✨ 𝚃𝚘𝚔𝚎𝚗 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚛𝚎𝚌𝚎𝚒𝚟𝚎𝚍:", token);
        } else {
          api.sendMessage(`🔴 𝖤𝗋𝗋𝗈𝗋: ${response.data.message}`, event.threadID);
        }
      } catch (error) {
        console.error("🔴 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚝𝚘𝚔𝚎𝚗", error);
        api.sendMessage("🔴 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚝𝚘𝚔𝚎𝚗, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛.", event.threadID);
      }
    } else {
      api.sendMessage("✨ 𝚄𝚜𝚊𝚐𝚎: get [ uid ] [ password ]", event.threadID);
    }
  }
},

onStart: async function ({ api, event }) {

}
};
