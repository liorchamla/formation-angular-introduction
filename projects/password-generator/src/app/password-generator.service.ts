import * as Generator from 'generate-password-browser';
import { Settings } from './types';

export class PasswordGeneratorService {
  generate(settings: Settings) {
    return Generator.generate(settings);
  }
}
