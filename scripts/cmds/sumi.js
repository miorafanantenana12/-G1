const axios = require('axios');

module.exports = { 
	config: { 
		name: "sumi",
		version: "1.0.0",
		credits: "LiANE @nealianacagara",
		hasPermission: 0,
		commandCategory: "utility",
		usage: "[ prefix ]sumi [prompt]",
		usePrefix: true,
		cooldown: 0
	},

	onStart: async ({ api, event, args }) => {
		try {
			const query = args.join(" ");
			if (query) {
				const processingMessage = await api.sendMessage(`Asking 🎀 Sumi. Please wait a moment...`, event.threadID);
				const response = await axios.get(`https://lianeapi.onrender.com/@LianeAPI_Reworks/api/sumi?query=${encodeURIComponent(query)}`);
				
				if (response.data && response.data.message) {
					await api.sendMessage({ body: response.data.message.trim() }, event.threadID, event.messageID);
					console.log(`Sent 🎀 Sumi's response to the user`);
				} else {
					throw new Error(`Invalid or missing response from 🎀 Sumi API`);
				}
				await api.unsendMessage(processingMessage.messageID);
			}
		} catch (error) {
			console.error(`❌ | Failed to get 🎀 Sumi's response: ${error.message}`);
			api.sendMessage(`❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`, event.threadID);
		}
	}
};
