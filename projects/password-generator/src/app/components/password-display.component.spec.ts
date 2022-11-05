import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator';

import { PasswordDisplayComponent } from './password-display.component';

/**
 * Ce composant n'est là que pour les tests unitaires, c'est un composant
 * inutile mais qui permet d'appeler le password-display en conditions réelles
 * et en lui passant un message en @Input
 *
 * Cela va nous permettre de vérifier que l'@Input est bel et bien fonctionnel
 *
 * Notez que ce TestComponent n'est pas du tout nécessaire si on utilise SpectatorHost
 */

@Component({
  selector: '',
  template: ` <password-display password="MOCK_PASSWORD"></password-display> `,
})
class TestComponent {}

@Component({
  selector: '',
  template: ` <password-display></password-display> `,
})
class TestDefaultComponent {}

/**
 * SpectatorHost me permet de tester un composant en intégration d'un autre
 * sans avoir à créer le composant hôte (comme le TestComponent ci dessus)
 */
describe('PasswordDisplayComponent (avec SpectatorHost)', () => {
  let spectator: SpectatorHost<PasswordDisplayComponent>;

  const createComponent = createHostFactory({
    component: PasswordDisplayComponent,
  });

  it('should display the input password', () => {
    spectator = createComponent(
      `<password-display password="MOCK_PASSWORD"></password-display>`
    );
    expect(spectator.query('article')).toHaveText('MOCK_PASSWORD');
  });

  it('should display a default text if no password input is given', () => {
    spectator = createComponent(`<password-display></password-display>`);
    expect(spectator.query('article')).toHaveText(
      'Cliquez sur le bouton "Générer"'
    );
  });
});

describe('PasswordDisplayComponent (avec TestBed)', () => {
  let fixture: ComponentFixture<TestComponent>;

  it('should emit an event when user clicks the button', async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, PasswordDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();

    expect(fixture.nativeElement.querySelector('article').textContent).toBe(
      'MOCK_PASSWORD'
    );
  });

  it('should display a default text if no password input is given', async () => {
    await TestBed.configureTestingModule({
      declarations: [TestDefaultComponent, PasswordDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestDefaultComponent);
    fixture.autoDetectChanges();

    expect(fixture.nativeElement.querySelector('article').textContent).toBe(
      'Cliquez sur le bouton "Générer"'
    );
  });
});
