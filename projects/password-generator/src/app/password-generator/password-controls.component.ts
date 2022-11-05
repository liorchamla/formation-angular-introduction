import { Component, EventEmitter, OnInit, Output } from '@angular/core';

/**
 * Ce composant aura la responsabilité d'afficher les boutons de notre page
 *
 * Il est stupide, donc facile à tester :)
 */

@Component({
  selector: 'password-controls',
  template: ` <button (click)="onClickGenerate()">Générer</button> `,
  styles: [],
})
export class PasswordControlsComponent {
  @Output('generate') onGenerateEvent = new EventEmitter();

  onClickGenerate() {
    this.onGenerateEvent.emit();
  }
}
