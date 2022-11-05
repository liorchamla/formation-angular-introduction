import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Settings } from '../types';

/**
 * Ce composant aura la responsabilité d'afficher les paramètres de notre mot de passe
 *
 * Il est stupide, donc facile à tester :)
 */

@Component({
  selector: 'password-settings',
  template: `
    <label for="length"
      >Longueur du mot de passe : {{ defaultSettings.length }}</label
    >
    <input
      type="range"
      name="length"
      min="10"
      max="50"
      id="length"
      [(ngModel)]="defaultSettings.length"
      (input)="onSettingsChange()"
      [defaultValue]="defaultSettings.length"
    />

    <label for="uppercase">
      <input
        role="switch"
        type="checkbox"
        name="uppercase"
        id="uppercase"
        [(ngModel)]="defaultSettings.uppercase"
        (change)="onSettingsChange()"
      />
      Contiendra des majuscules
    </label>
    <label for="symbols">
      <input
        role="switch"
        [(ngModel)]="defaultSettings.symbols"
        (change)="onSettingsChange()"
        type="checkbox"
        name="symbols"
        id="symbols"
      />
      Contiendra des caractères spéciaux
    </label>
    <label for="numbers">
      <input
        role="switch"
        [(ngModel)]="defaultSettings.numbers"
        (change)="onSettingsChange()"
        type="checkbox"
        name="numbers"
        id="numbers"
      />
      Contiendra des nombres
    </label>
  `,
  styles: [],
})
export class PasswordSettingsComponent {
  @Input('default-settings')
  defaultSettings: Settings = {
    length: 20,
    uppercase: false,
    numbers: false,
    symbols: false,
  };

  @Output('settings-change') onSettingsChangeEvent =
    new EventEmitter<Settings>();

  onSettingsChange() {
    this.onSettingsChangeEvent.emit(this.defaultSettings);
  }
}
