import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Découverte Angular</h1>

    <nav>
      <a href="#" *repeat="pagesCount; let page">Page {{ page + 1 }}</a>
    </nav>
    <button (click)="pagesCount = pagesCount + 1">Ajouter une page</button>

    <ul>
      <li *ngFor="let personne of personnes; let numero = index">
        {{ personne.prenom }} {{ personne.nom }} (Numéro {{ numero + 1 }})
      </li>
    </ul>
    <button (click)="ajouterUnePersonne()">Ajouter Joseph</button>

    <div *ngIf="age > 18; else autre">
      <h2>Vous êtes majeur !</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, maxime.
      </p>
      <button>Accéder au site</button>
    </div>

    <ng-template #autre>
      <h2>Vous ne pouvez pas entrer dans le site</h2>
      <button>Me ramener sur Google!</button>
    </ng-template>
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
  pagesCount = 3;

  personnes = [
    { prenom: 'Lior', nom: 'Chamla' },
    { prenom: 'Magali', nom: 'Pernin' },
  ];

  ajouterUnePersonne() {
    this.personnes.push({
      prenom: 'Joseph',
      nom: 'Dupont',
    });
  }
}
