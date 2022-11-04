import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1 [ngClass]="{ red: age > 18, bold: nationalite === 'France' }">
      Découverte Angular
    </h1>

    Mon revenu : {{ revenuDeBase }}

    <input [(ngModel)]="revenuDeBase" type="number" placeholder="Vos revenus" />

    <button (click)="calculImpots()">Calcul des impots</button>

    <p
      #paragraphe="hl"
      highlight
      base-color="green"
      background-color="purple"
      (color-change)="onColorChange($event)"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam laudantium
      inventore nostrum eligendi quas quod cupiditate cum necessitatibus placeat
      pariatur. Quod quisquam mollitia quia quos!
    </p>
    <button (click)="paragraphe.onMouseEnter()">Changer la couleur</button>
  `,
  styles: [
    `
      .red {
        color: red;
      }
      .bold {
        font-weight: bold;
      }
    `,
  ],
})
export class AppComponent {
  age = 35;
  nationalite = 'France';
  revenuDeBase = 100;

  calculImpots() {
    const impots = this.revenuDeBase + 500;
    console.log('Impots calculés :', impots);
  }
  /**
   * La méthode onColorChange() sera appelée à chaque fois que la couleur de fond
   * du paragraphe change, grâce à l'événement custom que nous avons créé (color-change)
   */
  onColorChange(color: string) {
    console.log('La couleur a changé : ', color);
  }
}
