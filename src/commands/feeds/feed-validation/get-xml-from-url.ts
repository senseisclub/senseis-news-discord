import https from 'https';
import xml2js from 'xml2js';

export function getXmlFromUrl(url: string) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        reject(() => {
          throw new Error('Status code is not 200!');
        });
      }

      let data = '';

      res.on('data', (chunk) => {
        data += chunk.toString();
      });

      res.on('end', () => {
        xml2js.parseString(data, { mergeAttrs: true }, (err, xmlResponse) => {
          if (!xmlResponse) {
            reject(() => {
              throw new Error('No data returned!');
            });
          }

          resolve(xmlResponse);
        });
      });

      res.on('error', reject);
    });
  });
}
