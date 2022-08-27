import { InteractionResponse, SelectMenuInteraction } from 'discord.js';
import { FeedModel } from '../../databases/mongo/models/feeds';
import { BotSelectMenu } from '../types/BotSelectMenu';

class DelSelectMenu implements BotSelectMenu {
  customId: string;

  constructor() {
    this.customId = 'remove-feed';
  }

  async execute(interaction: SelectMenuInteraction): Promise<InteractionResponse<boolean> | undefined> {
    const deletedFeed = await FeedModel.findByIdAndRemove(interaction.values[0]);

    let content = ':warning: Sorry, not found link!';
    if (deletedFeed) {
      content = `${deletedFeed.link} has been deleted!`;
    }

    return interaction.update({ content, components: [] });
  }
}

export default new DelSelectMenu();
