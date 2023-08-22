const { inviteToVC } = require("./tempVC");

function handleSlashCommand(interaction) {
      const user = interaction.user;
      switch (interaction.commandName) {
            case "ping":
                  const time = new Date() - interaction.createdTimestamp;
                  interaction.reply("🏓 - Pong: " + time + "ms");
                  break;
            case "invite":
                  inviteToVC(interaction);
                  break;
      }
}

module.exports = { handleSlashCommand };
