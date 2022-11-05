import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1 [ngClass]="{ red: age > 18, bold: nationalite === 'France' }">
      Découverte Angular
    </h1>

    <card title="Mon titre">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid saepe
        id facilis magnam iure nisi.
      </p>

      <footer>
        <p>Lorem ipsum dolor sit amet.</p>
      </footer>
    </card>

    <newsletter
      title="Recevez nos courriers !"
      button-text="Confirmer !"
      placeholder="Votre adresse email svp"
      (confirm)="onConfirm($event)"
    >
      <p>Vous recevrez l'ensemble de nos informations</p>
      <h2>Hourra c'est super la vie !</h2>
      <p>Lorem ipsum dolor sit amet.</p>
      <a href="#">En savoir plus</a>
    </newsletter>

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

  /**
   * La méthode onConfirm() sera liée à l'événement "confirm" du composant
   * <newsletter> et sera donc appelée à chaque fois que le composant émettra un
   * signal sur ce canal via son EventEmitter !
   */
  onConfirm(email: string) {
    console.log("Depuis l'extérieur du composant", email);
  }

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
