export = ignore;

import * as debugModule from 'debug';
import stripVersions = require('./strip-versions');

const debug = debugModule('snyk');
const oneDay = 1000 * 60 * 60 * 24;

function ignore(data) {
  return new Promise((resolve) => {
    const config: any = {};
    config.ignore = data
      .map((res) => {
        const vuln = res.vuln;
        const days = res.meta.days || 30;
        const ignoreRule: any = {};
        ignoreRule[stripVersions(vuln.from.slice(1)).join(' > ')] = {
          reason: res.meta.reason,
          expires: new Date(Date.now() + oneDay * days).toJSON(),
        };
        ignoreRule.vulnId = vuln.id;
        return ignoreRule;
      })
      .reduce((acc, curr) => {
        if (!acc[curr.vulnId]) {
          acc[curr.vulnId] = [];
        }

        const id = curr.vulnId;
        delete curr.vulnId;
        acc[id].push(curr);

        return acc;
      }, {});

    // final format looks like test/fixtures/protect-interactive-config.json
    debug('ignore config', config);

    resolve(config);
  });
}
