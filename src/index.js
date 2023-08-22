require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const { registerCommands } = require("./registerSlashCommand");
const { handle, handleSlashCommand } = require("./SlashCommandHandler");
const { createVC, deleteVC } = require("./tempVC");
const { handleButton } = require("./ButtonHandler");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });
const TOKEN = process.env.TOKEN;

client.on("ready", async () => {
      console.log("Bot started");
      client.user.setActivity("Coding 💻");

      await registerCommands(client);
});

client.on("voiceStateUpdate", async (oldState, newState) => {
      if (oldState.channel != null && oldState.channel.members.size == 0 && oldState.channel.name != process.env.VC_NAME) {
            deleteVC(oldState, newState);
      }

      if (newState.channel != null && newState.channel.name == process.env.VC_NAME) {
            await createVC(oldState, newState);
      }
});

client.on("interactionCreate", (interaction) => {
      if (interaction.isChatInputCommand()) {
            handleSlashCommand(interaction);
            return;
      }

      if (interaction.isButton) {
            handleButton(interaction);
            return;
      }
});

client.login(TOKEN);

module.exports = { client };
