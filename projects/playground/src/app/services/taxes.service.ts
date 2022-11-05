import { Inject, Injectable, InjectionToken } from '@angular/core';

export const TAUX_TVA = new InjectionToken(
  "Token d'injection pour configurer la TVA"
);

// @Injectable({
//     providedIn: 'root'
// })

@Injectable()
export class TaxesService {
  total = 0;

  constructor(@Inject(TAUX_TVA) private tauxDeTVA: number) {
    console.log('La TVA est : ', this.tauxDeTVA);
  }

  calculate(revenu: number) {
    // 500 lignes et 5 appels HTTP
    console.log('5 appels HTTP et 500 lignes');

    this.total += revenu;

    return revenu + 500;
  }
}
