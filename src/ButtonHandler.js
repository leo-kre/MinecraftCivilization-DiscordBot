require("dotenv").config();
const { EmbedBuilder } = require("@discordjs/builders");

function handleButton(interaction) {
      handleInviteButton(interaction);
}

function handleInviteButton(interaction) {
      const args = interaction.customId.split("-");
      const userId = args[0];
      const voiceChannelD = args[1];
      const invitedUserId = args[2];
      const buttonTimestamp = args[3];

      if (new Date() - buttonTimestamp > process.env.INVITE_TIMEOUT_MIN * 60 * 1000) {
            const embed = new EmbedBuilder().setTitle("The invite has expired").setDescription("An invite only lasts for " + process.env.INVITE_TIMEOUT_MIN + "min");
            interaction.reply({ embeds: [embed] });
            return;
      }

      const wrongIdEmbed = new EmbedBuilder().setTitle("This invite wasn't made for you!");
      const validCredentialsEmbed = new EmbedBuilder().setTitle("Joining...");
      const userNeedsToBeInVoiceChannel = new EmbedBuilder().setTitle("You need to be in a Voice Channel in order to join!");

      if (interaction.user.id != invitedUserId) {
            interaction.reply({ embeds: [wrongIdEmbed] });
            return;
      }

      const member = interaction.guild?.members.cache.get(userId);
      if (member?.voice.channel) {
            if (member.voice.channel.id != voiceChannelD) {
                  const embed = new EmbedBuilder().setTitle("The user who invited you switched the voice channel. You need a new invite");
                  interaction.reply({ embeds: [embed] });
            } else {
                  const interactionUser = interaction.guild?.members.cache.get(interaction.user.id);

                  if (interactionUser?.voice.channel) {
                        interactionUser.voice.setChannel(voiceChannelD);
                        interaction.reply({ embeds: [validCredentialsEmbed] });
                  } else {
                        interaction.reply({ embeds: [userNeedsToBeInVoiceChannel] });
                  }
            }
      }
}

module.exports = { handleButton };
