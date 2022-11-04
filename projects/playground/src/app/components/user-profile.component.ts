import { Component, ElementRef, Input, ViewChild } from '@angular/core';

/**
 * Ce composant sert à afficher le profil d'un utilisateur de façon prédictible
 * et répétable à l'infini via une balise dédiée : <user-profile>
 *
 * Il permet de voir les notions suivantes :
 * - interpolations ({{ variable }})
 * - pipes ({{ variable | pipe }})
 * -- uppercase : formatte la valeur en majuscules avant affichage
 * -- currency : formatte la valeur en montant monétaire avant affichage
 * - property binding : <img [src]="avatar">
 * - class binding : <h3 [class.hired]="isHired">
 * - event binding : <button (click)="..">
 * - event filtering : <input (keydown.control.enter)="..." />
 */

@Component({
  selector: 'user-profile',
  template: `
    <h3 [class.hired]="isHired">{{ firstName }} {{ lastName | uppercase }}</h3>
    <img [src]="avatar" alt="Avatar de {{ firstName }}" />
    Métier :
    <strong>{{ job }} ({{ revenue | currency: 'EUR':'symbol' }} / mois)</strong>
    <button (click)="onClickButton($event.clientX)">Embaucher</button>
    <input
      #prenom
      type="text"
      (keydown.enter)="onFrappeAuClavier($event)"
      placeholder="Nouveau prénom"
    />
    <button (click)="changePrenom()">Changer le prénom</button>
  `,
  styles: [
    `
      .hired {
        background-color: green;
      }

      h3 {
        color: blue;
      }
    `,
  ],
})
export class UserProfileComponent {
  /**
   * On va récupérer l'élément qui porte l'attribut #prenom dans la vue
   * La vue est le template du Composant une fois qu'Angular l'a affiché à l'écran et
   * que les éléments HTML existent bel et bien.
   *
   * On ne peut donc travailler avec la propriété "prenom" qu'une fois que la vue a été
   * affichée (donc avec le hook ngAfterViewInit). Avant cela, le @ViewChild ne fonctionne pas
   *
   * Ce que la propriété "prenom" contient n'est pas DIRECTEMENT l'élément HTML mais plutôt
   * une référence à l'élément HTML (ElementRef)
   */
  @ViewChild('prenom')
  prenom?: ElementRef<HTMLInputElement>;

  /**
   * On va récupérer cette information dans l'attribut "first-name" de la baslie
   * <user-profile>
   *
   * Exemple : <user-profile first-name="Lior"></user-profile>
   */
  @Input('first-name')
  firstName = '';

  /**
   * On va récupérer cette information dans l'attribut "last-name" de la baslie
   * <user-profile>
   *
   * Exemple : <user-profile last-name="Chamla"></user-profile>
   */
  @Input('last-name')
  lastName = '';

  /**
   * On va récupérer cette information dans l'attribut "job" de la baslie
   * <user-profile>
   *
   * Exemple : <user-profile job="Formateur"></user-profile>
   */
  @Input()
  job = '';

  /**
   * On va récupérer cette information dans l'attribut "hired" de la baslie
   * <user-profile>
   *
   * Exemple : <user-profile [hired]="true"></user-profile>
   *
   * Les crochets (property binding) seront obligatoire sinon "true" sera considéré
   * comme une string et pas un véritable booléen
   */
  @Input('hired')
  isHired = false;

  avatar = 'https://via.placeholder.com/30';
  revenue = 1200;

  /**
   * La méthode onFrappeAuClavier() sera appelée uniquement lorsque l'utilisateur
   * tapera CTRL+ENTREE dans l'<input>.
   *
   * Ca se fait grâce à l'Event Binding <input (keydown.control.enter)="...">
   *
   * C'est un exemple de ce qu'on appelle l'Event Filtering et cela ne fonctionne qu'avec
   * les événements keydown et keyup
   */
  onFrappeAuClavier(event: Event) {
    console.log("L'<input> a été touché !");
  }

  /**
   * La méthode onClickButton() est liée à l'événement click sur le bouton "Embaucher"
   *
   * Cela se fait grâce à l'Event Binding <button (click)="...">
   *
   * @param coordX La coordonnée en X de la souris au moment du click
   */
  onClickButton(coordX: number) {
    console.log('Le click a eu lieu ici : ', coordX);
    this.isHired = true;
  }

  /**
   * La méthode changePrenom() sera appelée lors du click sur le bouton "Changer le prénom"
   */
  changePrenom() {
    // Si il n'y a rien dans notre ElementRef
    if (!this.prenom) {
      // On ne fait rien
      return;
    }

    // Sinon, on prend sa valeur et on met à jour la propriété firstName avec
    this.firstName = this.prenom.nativeElement.value;
  }

  /**
   * Cette méthode est "Lifecycle Hook" d'Angular, c'est une méthode du cycle de vie
   * des composants et directives qu'Angular appellera automatiquement dès lors que
   * le template aura été affiché dans la page, et donc que les éléments HTML existeront
   * véritablement.
   *
   * C'est à partir de ce moment là qu'on peut exploiter un @ViewChild ou un @ViewChildren
   * puisqu'avant ce moment, les éléments HTML n'existent pas, et on ne peut donc pas aller
   * en chercher un grâce à une variable de template ou autrement.
   */
  ngAfterViewInit() {
    // Si il n'y a rien dans notre ElementRef
    if (!this.prenom) {
      // On ne fait rien
      return;
    }

    // On prend l'<input> ciblé par l'ElementRef et on lui donne en valeur notre firstName
    this.prenom.nativeElement.value = this.firstName;
  }
}
