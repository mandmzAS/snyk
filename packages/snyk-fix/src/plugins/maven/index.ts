import * as debugLib from 'debug';
import * as ora from 'ora';

const debug = debugLib('snyk-fix:maven');

import { EntityToFix, FixOptions } from '../../types';
import { FixHandlerResultByPlugin, PluginFixResponse } from '../types';

export async function mavenFix(
  entities: EntityToFix[],
  options: FixOptions,
): Promise<FixHandlerResultByPlugin> {
  const spinner = ora({ isSilent: options.quiet, stream: process.stdout });
  spinner.text = 'Looking for supported Python items';
  spinner.start();

  const handlerResult: FixHandlerResultByPlugin = {
    maven: {
      succeeded: [],
      failed: [],
      skipped: [],
    },
  };
  const results = handlerResult.maven;

  spinner.succeed();
  spinner.text = `Processing ${entities.length} maven items.`;
  const { failed, skipped, succeeded } = await handler(entities, options);
  results.failed.push(...failed);
  results.skipped.push(...skipped);
  results.succeeded.push(...succeeded);

  spinner.succeed();

  return handlerResult;
}

function handler(
  entities: EntityToFix[],
  options: FixOptions,
):
  | { failed: any; skipped: any; succeeded: any }
  | PromiseLike<{ failed: any; skipped: any; succeeded: any }> {
  // throw new Error('Function not implemented.');
  console.log(`options: ${JSON.stringify(options)}`);

  debug(`Preparing to fix ${entities.length} Python requirements.txt projects`);
  const handlerResult: PluginFixResponse = {
    succeeded: [],
    failed: [],
    skipped: [],
  };
  for (const entity of entities) {
    try {
      const targetFile = entity.scanResult.identity.targetFile;
      console.log({
        targetFile,
        remediation: entity.testResult.remediation?.upgrade,
      });

      // TODO: fix
    } catch (e) {
      handlerResult.failed.push({ original: entity, error: e });
    }
  }
  return handlerResult;
}
