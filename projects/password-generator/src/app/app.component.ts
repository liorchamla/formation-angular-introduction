import { Component } from '@angular/core';
import { Settings } from './types';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Générez un mot de passe fort !</h1>
      <div class="grid">
        <password-display [password]="password"></password-display>
        <div>
          <password-settings
            [default-settings]="settingsCopy"
            (settings-change)="onSettingsChange($event)"
          ></password-settings>
          <hr />
          <password-controls (generate)="onGenerate()"></password-controls>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent {
  password = '';

  settings: Settings = {
    length: 20,
    uppercase: false,
    numbers: false,
    symbols: false,
  };

  get settingsCopy() {
    return { ...this.settings };
  }

  onSettingsChange(settings: Settings) {
    this.settings = settings;
  }

  onGenerate() {
    this.password = 'MON_MOT_DE_PASSE';

    console.table(this.settings);
  }
}
