import { InteractionResponse, SelectMenuInteraction } from 'discord.js';
import { TagModel } from '../../databases/mongo/models/tags';
import { BotSelectMenu } from '../types/BotSelectMenu';

class DelSelectMenu implements BotSelectMenu {
  customId: string;

  constructor() {
    this.customId = 'remove-tag';
  }

  async execute(interaction: SelectMenuInteraction): Promise<InteractionResponse<boolean> | undefined> {
    const deletedTag = await TagModel.findByIdAndRemove(interaction.values[0]);

    let content = ':warning: Sorry, tag not found!';
    if (deletedTag) {
      content = `**${deletedTag.tag}** has been deleted!`;
    }

    return interaction.update({ content, components: [] });
  }
}

export default new DelSelectMenu();
