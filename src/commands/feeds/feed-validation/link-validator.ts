class LinkValidator {
  execute(link: string | null) {
    if (!link) {
      throw new Error('No link informed!');
    }

    try {
      const url = new URL(link);

      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        throw new Error('Malformed link!');
      }
    } catch (e) {
      throw new Error('Link is not a URL!');
    }
  }
}

export default LinkValidator;
