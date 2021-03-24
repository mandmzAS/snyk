import { UnsupportedTypeError } from '../lib/errors/unsupported-type-error';
import { mavenFix } from './maven';
import { pythonFix } from './python';
import { FixHandler } from './types';

export function loadPlugin(type: string): FixHandler {
  switch (type) {
    case 'pip': {
      return pythonFix;
    }
    case 'maven': {
      return mavenFix;
    }
    default: {
      throw new UnsupportedTypeError(type);
    }
  }
}
