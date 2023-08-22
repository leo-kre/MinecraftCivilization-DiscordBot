const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

async function createVC(oldState, newState) {
      const member = newState.member;

      if (oldState.channelId !== newState.channelId && newState.channelId) {
            const category = newState.channel.parent;

            if (category) {
                  try {
                        const newChannel = await newState.guild.channels.create({
                              type: ChannelType.GuildVoice,
                              parent: category,
                              name: member.displayName + "'s VC",
                        });

                        await member.voice.setChannel(newChannel);
                  } catch (error) {}
            }
      }
}

function deleteVC(oldState, newState) {
      oldState.channel.delete();
}

function inviteToVC(interaction) {
      const user = interaction.member;
      const userToInvite = interaction.options.getMember("user");

      if (!user.voice.channel) {
            const embed = new EmbedBuilder().setTitle("You must be in a Voice Channel to invite another user!").setColor("#FF0000");

            interaction.reply({ embeds: [embed] });
      } else {
            const embed = new EmbedBuilder("VC invite").setDescription(`You have been invited to join ${user.voice.channel.name}'s VC ${userToInvite}`).setColor("#13ed4a");

            const buttonId = user.id + "-" + user.voice.channel.id + "-" + userToInvite.id + "-" + new Date().getTime();
            const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId(buttonId).setLabel("Join").setStyle(ButtonStyle.Primary));
            interaction.reply({ embeds: [embed], components: [row] });
      }
}

module.exports = { createVC, deleteVC, inviteToVC };
