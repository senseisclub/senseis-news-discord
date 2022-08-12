import { getXmlFromUrl } from './get-xml-from-url';
import R from 'ramda';

class FeedValidator {
  readonly W3C_VALIDATOR_URL: string = 'https://validator.w3.org/feed/check.cgi';
  readonly OUTPUT: string = 'soap12';

  async checkUrl(url: string) {
    const response = await getXmlFromUrl(`${this.W3C_VALIDATOR_URL}?output=${this.OUTPUT}&url=${url}`);

    const validity = this.extractValidity(response);

    if (!validity || validity !== 'true') {
      throw new Error('Xml type not expected!');
    }
  }

  private extractValidity = R.path(['env:Envelope', 'env:Body', 0, 'm:feedvalidationresponse', 0, 'm:validity', 0]);
}

export default new FeedValidator();
