import Parser from 'rss-parser';

class FeedParser {
  private readonly parser = new Parser({ customFields: { item: [] } });
  private readonly url;

  constructor(url: string) {
    this.url = url;
  }

  async getItems() {
    const feed = await this.parser.parseURL(this.url);

    return feed.items;
  }
}

export default FeedParser;
