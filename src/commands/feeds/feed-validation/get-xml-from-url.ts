import https from 'https';
import xml2js from 'xml2js';

export function getXmlFromUrl(url: string) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (!res.statusCode || res.statusCode < 200 || res.statusCode > 299) {
        res.resume();

        reject(new Error('No successful response!'));
      }

      const chunks: string[] = [];

      res.on('data', (chunk) => chunks.push(chunk));
      res.on('error', reject);
      res.on('end', () => {
        const body = chunks.join('');

        xml2js.parseString(body, { mergeAttrs: true }, (err, bodyXml) => {
          if (err || !bodyXml) {
            reject(new Error('No data returned!'));
          }

          resolve(bodyXml);
        });
      });
    });

    req.on('error', reject);
    req.end();
  });
}
