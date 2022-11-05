import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Spectator,
  createComponentFactory,
  SpectatorHost,
  createHostFactory,
} from '@ngneat/spectator';

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
  template: ` <password-display message="MOCK_MESSAGE"></password-display> `,
})
class TestComponent {
  onGenerate() {}
}

/**
 * SpectatorHost me permet de tester un composant en intégration d'un autre
 * sans avoir à créer le composant hôte (comme le TestComponent ci dessus)
 */
describe('PasswordDisplayComponent (avec SpectatorHost)', () => {
  let spectator: SpectatorHost<PasswordDisplayComponent>;
  let component: PasswordDisplayComponent;

  const createComponent = createHostFactory({
    component: PasswordDisplayComponent,
  });

  beforeEach(() => {
    spectator = createComponent(
      `<password-display message="MOCK_MESSAGE"></password-display>`
    );
    component = spectator.component;
  });

  it('should display the input message', () => {
    expect(spectator.query('article')).toHaveText('MOCK_MESSAGE');
  });
});

describe('PasswordDisplayComponent (avec Spectator)', () => {
  let spectator: Spectator<TestComponent>;
  let component: TestComponent;

  const createComponent = createComponentFactory({
    component: TestComponent,
    declarations: [PasswordDisplayComponent],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should display the input message', () => {
    expect(spectator.query('article')).toHaveText('MOCK_MESSAGE');
  });
});

describe('PasswordDisplayComponent (avec TestBed)', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, PasswordDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should emit an event when user clicks the button', () => {
    expect(fixture.nativeElement.querySelector('article').textContent).toBe(
      'MOCK_MESSAGE'
    );
  });
});
