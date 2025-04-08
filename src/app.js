require("dotenv").config(); // dotenv whatever


const fs = require("node:fs");
const path = require("node:path");
const { Client, Events, GatewayIntentBits, SlashCommandBuilder, Collection } = require("discord.js");


const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

bot.commands = new Collection();


// all this code was from some tutorial

const foldersPath = path.join(__dirname, 'commands-js');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			bot.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

bot.once(Events.ClientReady, c => { // on ready for the bot
    console.log(`logged in as ${c.user.tag}!`);

});

bot.on(Events.InteractionCreate, async interaction => {

    if (!interaction.isChatInputCommand()) {
        return;
    }

    // COPIED BTW!!!!
    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});

bot.login(process.env.BOT_TOKEN);