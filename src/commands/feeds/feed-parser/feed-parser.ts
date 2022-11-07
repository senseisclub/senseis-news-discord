import Parser from 'rss-parser';

class FeedParser {
  private readonly parser = new Parser({ customFields: { item: [] } });
  private readonly url;

  constructor(url: string) {
    this.url = url;
  }

  async getItems() {
    let items: Parser.Item[] = [];

    try {
      const feed = await this.parser.parseURL(this.url);

      items = feed.items;
    } catch (e) {
      console.log(`Could not get items from ${this.url}`);
      console.error(e);
    }

    return items;
  }
}

export default FeedParser;
