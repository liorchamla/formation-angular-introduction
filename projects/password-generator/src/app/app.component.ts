import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Générez un mot de passe fort !</h1>
      <div class="grid">
        <div>
          <h3>Votre futur mot de passe :</h3>
          <article>{{ message }}</article>
        </div>
        <div>
          <label for="length">Longueur du mot de passe : {{ length }}</label>
          <input
            type="range"
            name="length"
            min="10"
            max="50"
            id="length"
            [(ngModel)]="length"
          />

          <label for="uppercase">
            <input
              role="switch"
              type="checkbox"
              name="uppercase"
              id="uppercase"
              [(ngModel)]="uppercase"
            />
            Contiendra des majuscules
          </label>
          <label for="symbols">
            <input
              role="switch"
              [(ngModel)]="symbols"
              type="checkbox"
              name="symbols"
              id="symbols"
            />
            Contiendra des caractères spéciaux
          </label>
          <label for="numbers">
            <input
              role="switch"
              [(ngModel)]="numbers"
              type="checkbox"
              name="numbers"
              id="numbers"
            />
            Contiendra des nombres
          </label>
          <hr />
          <button (click)="onClickGenerate()">Générer</button>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent {
  message = 'Cliquez sur le bouton "Générer"';

  length = 20;
  uppercase = false;
  numbers = false;
  symbols = false;

  onChangeSetting(settingName: string, settingValue: boolean) {
    if (
      settingName !== 'uppercase' &&
      settingName !== 'numbers' &&
      settingName !== 'symbols'
    ) {
      return;
    }

    this[settingName] = settingValue;
  }

  onChangeLength(value: number) {
    this.length = value;
  }

  onClickGenerate() {
    this.message = 'MON_MOT_DE_PASSE';

    console.table({
      length: this.length,
      symbols: this.symbols,
      uppercase: this.uppercase,
      numbers: this.numbers,
    });
  }
}
