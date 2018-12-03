const v = require('./verbose');

class https {
    static get(url) {
        return new Promise((resolve, reject) => {
          const lib = url.startsWith('https') ? require('https') : require('http');
          const request = lib.get(url, (response) => {
            if (response.statusCode < 200 || response.statusCode > 299) {
               reject(new Error(`${response.statusCode} - ${response.statusMessage}`));
            }
            const body = [];
            response.on('data', (chunk) => body.push(chunk));
            // we are done, resolve promise with those joined chunks
            response.on('end', () => resolve(body.join('')));
          });
          // handle connection errors of the request
          request.on('error', (err) => reject(err))
          })
      };
}
module.exports = https;