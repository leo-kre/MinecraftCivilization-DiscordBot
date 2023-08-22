const { SlashCommandBuilder } = require("discord.js");
const commandArray = [];

async function register(client) {
      const ping = new SlashCommandBuilder().setName("ping").setDescription("This is a ping command");
      commandArray.push(ping);

      const inviteToVC = new SlashCommandBuilder()
            .setName("invite")
            .setDescription("Invite member to your Voice Channel!")
            .addUserOption((option) => option.setName("user").setDescription("User to invite to Voice Channel").setRequired(true));
      commandArray.push(inviteToVC);

      commandArray.forEach((command) => {
            client.application.commands.create(command);
      });
}

module.exports = { registerCommands: register };
