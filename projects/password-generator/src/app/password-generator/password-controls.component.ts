import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * Ce composant aura la responsabilité d'afficher les boutons de notre page
 *
 * Il est stupide, donc facile à tester :)
 */

@Component({
  selector: 'password-controls',
  template: `
    <button id="generate" (click)="onClickGenerate()">Générer</button>
    <button id="copy" (click)="onClickCopy()" *ngIf="password">
      Copier le mot de passe
    </button>
    <strong id="copy-message" *ngIf="hasBeenCopied"
      >Le mot de passe a été copié</strong
    >
  `,
  styles: [],
})
export class PasswordControlsComponent {
  @Input() password = '';
  @Output('generate') onGenerateEvent = new EventEmitter();
  hasBeenCopied = false;

  onClickGenerate() {
    this.onGenerateEvent.emit();
  }

  onClickCopy() {
    if (!this.password) {
      return;
    }

    navigator.clipboard.writeText(this.password);

    this.hasBeenCopied = true;
  }

  ngOnChanges() {
    this.hasBeenCopied = false;
  }
}
