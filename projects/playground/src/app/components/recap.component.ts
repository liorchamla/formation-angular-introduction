import { Component } from '@angular/core';
import { TaxesService } from '../services/taxes.service';

@Component({
  selector: 'recap',
  template: `
    <h3>Récapitulatif des déclarations</h3>
    <p>Vous avez déclaré {{ total | currency: 'EUR' }}</p>
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
export class RecapComponent {
  get total() {
    return this.service.total;
  }

  constructor(private service: TaxesService) {}
}
