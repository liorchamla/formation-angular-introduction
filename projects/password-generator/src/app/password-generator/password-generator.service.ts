import * as Generator from 'generate-password-browser';
import { Settings } from '../types';

/**
 * Cette classe permet d'externaliser la logique de création de mot de passe
 * de nos composants.
 *
 * Désoramis, dans nos tests, on pourra remplacer cette classe là par une fausse
 * ou tout simplement faire du spy ou du mock plus facilement
 */
export class PasswordGeneratorService {
  generate(settings: Settings) {
    return Generator.generate(settings);
  }
}
