import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForceLowerDirective } from './force-lower.directive';
import {
  Spectator,
  createComponentFactory,
  SpectatorDirective,
  createDirectiveFactory,
} from '@ngneat/spectator';

/**
 * Ce composant n'est là que pour qu'on puisse tester notre directive "force-lower"
 * en action.
 *
 * Il ne sera pas utile pour la suite utilisant SpectatorDirective, mais uniquement
 * pour la suite avec le TestBed et celle avec Spectator
 */
@Component({
  selector: '',
  template: `<input type="text" force-lower value="MOCK_VALUE" />`,
})
class TestComponent {}

describe('ForceLowerDirective (avec SpectatorDirective)', () => {
  /**
   * La classe SpectatorDirective nous permet de tester facilement une directive
   * sans avoir à créer de faux composant pour faire ces tests, c'est Spectator
   * qui s'en charge derrière le rideau
   */
  let spectator: SpectatorDirective<ForceLowerDirective>;

  const createDirective = createDirectiveFactory({
    directive: ForceLowerDirective,
  });

  beforeEach(
    () =>
      (spectator = createDirective(
        `<input type="text" force-lower value="MOCK_VALUE" />`
      ))
  );

  it('should lower initial input value', () => {
    expect(spectator.query('input')).toHaveValue('mock_value');
  });

  it('should lower new input values', () => {
    spectator.typeInElement('TEST_VALUE', 'input');

    expect(spectator.query('input')).toHaveValue('test_value');
  });
});

describe('ForceLowerDirective (avec Spectator)', () => {
  let spectator: Spectator<TestComponent>;

  const createComponent = createComponentFactory({
    component: TestComponent,
    declarations: [ForceLowerDirective],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should lower initial input value', () => {
    expect(spectator.query('input')).toHaveValue('mock_value');
  });

  it('should lower new input values', () => {
    spectator.typeInElement('TEST_VALUE', 'input');

    expect(spectator.query('input')).toHaveValue('test_value');
  });
});

describe('ForceLowerDirective (avec TestBed)', () => {
  let fixture: ComponentFixture<TestComponent>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ForceLowerDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();

    input = fixture.nativeElement.querySelector('input');
  });

  it('should lower initial input value', () => {
    expect(input.value).toBe('mock_value');
  });

  it('should lower new input values', () => {
    input.value = 'TEST_VALUE';
    input.dispatchEvent(new Event('input'));

    expect(input.value).toBe('test_value');
  });
});
