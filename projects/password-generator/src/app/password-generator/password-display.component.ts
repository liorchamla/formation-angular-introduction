import { Component, Input } from '@angular/core';

/**
 * Ce composant aura la responsabilité d'afficher le mot de passe généré ou alors
 * une phrase qui indique à l'utilisateur la marche à suivre
 *
 * Il est stupide, donc facile à tester :)
 */
@Component({
  selector: 'password-display',
  template: `
    <div>
      <h3>Votre futur mot de passe :</h3>
      <article *ngIf="!password">Cliquez sur le bouton "Générer"</article>
      <article *ngIf="password">{{ password }}</article>
    </div>
  `,
  styles: [],
})
export class PasswordDisplayComponent {
  @Input() password = '';
}
