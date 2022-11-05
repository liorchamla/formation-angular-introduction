import { Component } from '@angular/core';
import { TaxesService } from '../services/taxes.service';

@Component({
  selector: 'declaration',
  template: `
    <h3>Déclaration des revenus :</h3>
    <input type="number" #revenu placeholder="Déclarez vos revenus" />
    <button (click)="onDeclare(revenu.valueAsNumber)">Déclarer !</button>
    <article>Vos impots : {{ resultats }}</article>
  `,
  providers: [
    // {
    //   provide: TaxesService,
    //   useFactory: () => {
    //     return new TaxesService
    //   }
    // },
    // Equivalent à :
    // {
    //   provide: TaxesService,
    //   useClass: TaxesService
    // },
    // Equivalent à :
    // TaxesService
  ],
})
export class DeclarationComponent {
  resultats = 0;

  constructor(private service: TaxesService) {}

  onDeclare(revenu: number) {
    this.resultats = this.service.calculate(revenu);
  }
}
