import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { createComponentFactory } from '@ngneat/spectator';
import { Settings } from '../types';

import { PasswordSettingsComponent } from './password-settings.component';

@Component({
  selector: '',
  template: `
    <password-settings
      (settings-change)="onSettingsChange($event)"
    ></password-settings>
  `,
})
class TestDefaultComponent {
  onSettingsChange(settings: Settings) {}
}

@Component({
  selector: '',
  template: `
    <password-settings [default-settings]="mockSettings"></password-settings>
  `,
})
class TestInputComponent {
  mockSettings: Settings = {
    length: 30,
    numbers: true,
    symbols: true,
    uppercase: true,
  };
}

describe('PasswordSettingsComponent (avec Spectator)', () => {
  const createDefaultComponent = createComponentFactory({
    component: TestDefaultComponent,
    declarations: [PasswordSettingsComponent],
    imports: [FormsModule],
  });

  const createInputComponent = createComponentFactory({
    component: TestInputComponent,
    declarations: [PasswordSettingsComponent],
    imports: [FormsModule],
  });

  it('should represents settings in the HTML tags', async () => {
    const spectator = createDefaultComponent();

    await spectator.fixture.whenStable();

    expect(spectator.query('#length')).toHaveValue('20');
    expect(spectator.query('#numbers')).not.toBeChecked();
    expect(spectator.query('#symbols')).not.toBeChecked();
    expect(spectator.query('#uppercase')).not.toBeChecked();
  });

  it('should accept initial settings from the outside', async () => {
    const spectator = createInputComponent();

    await spectator.fixture.whenStable();

    expect(spectator.query('#length')).toHaveValue('30');
    expect(spectator.query('#numbers')).toBeChecked();
    expect(spectator.query('#symbols')).toBeChecked();
    expect(spectator.query('#uppercase')).toBeChecked();
  });

  it('should emit an event with settings each time user changes HTML inputs', async () => {
    const spectator = createDefaultComponent();

    const spy = spyOn(spectator.component, 'onSettingsChange');

    const expectCheckboxWorks = (
      checkboxId: string,
      expectedSettings: Settings
    ) => {
      const checkbox: HTMLInputElement = document.querySelector(
        checkboxId
      ) as HTMLInputElement;
      checkbox.click();

      expect(spy).toHaveBeenCalledWith(expectedSettings);
    };

    await spectator.fixture.whenStable();

    expectCheckboxWorks('#uppercase', {
      length: 20,
      numbers: false,
      uppercase: true,
      symbols: false,
    });

    expectCheckboxWorks('#numbers', {
      length: 20,
      numbers: true,
      uppercase: true,
      symbols: false,
    });

    expectCheckboxWorks('#symbols', {
      length: 20,
      numbers: true,
      uppercase: true,
      symbols: true,
    });

    spectator.typeInElement('42', '#length');
    expect(spy).toHaveBeenCalledWith({
      length: 42,
      numbers: true,
      uppercase: true,
      symbols: true,
    });
  });
});

describe('PasswordSettingsComponent (avec TestBed)', () => {
  it('should represents settings in the HTML tags', async () => {
    await TestBed.configureTestingModule({
      declarations: [TestDefaultComponent, PasswordSettingsComponent],
      imports: [FormsModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestDefaultComponent);
    const document = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();

    await fixture.whenStable();

    expect(document.querySelector<HTMLInputElement>('#length')?.value).toBe(
      '20'
    );
    expect(
      document.querySelector<HTMLInputElement>('#uppercase')?.checked
    ).toBe(false);
    expect(document.querySelector<HTMLInputElement>('#symbols')?.checked).toBe(
      false
    );
    expect(document.querySelector<HTMLInputElement>('#numbers')?.checked).toBe(
      false
    );
  });

  it('should accept initial settings from the outside', async () => {
    await TestBed.configureTestingModule({
      declarations: [TestInputComponent, PasswordSettingsComponent],
      imports: [FormsModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestInputComponent);
    const document = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();

    await fixture.whenStable();

    expect(document.querySelector<HTMLInputElement>('#length')?.value).toBe(
      '30'
    );
    expect(
      document.querySelector<HTMLInputElement>('#uppercase')?.checked
    ).toBe(true);
    expect(document.querySelector<HTMLInputElement>('#symbols')?.checked).toBe(
      true
    );
    expect(document.querySelector<HTMLInputElement>('#numbers')?.checked).toBe(
      true
    );
  });

  it('should emit an event with settings each time user changes HTML inputs', async () => {
    await TestBed.configureTestingModule({
      declarations: [TestDefaultComponent, PasswordSettingsComponent],
      imports: [FormsModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestDefaultComponent);
    const document = fixture.nativeElement as HTMLElement;
    const component = fixture.componentInstance;

    const spy = spyOn(component, 'onSettingsChange');

    const expectCheckboxWorks = (
      checkboxId: string,
      expectedSettings: Settings
    ) => {
      const checkbox: HTMLInputElement = document.querySelector(
        checkboxId
      ) as HTMLInputElement;
      checkbox.click();

      expect(spy).toHaveBeenCalledWith(expectedSettings);
    };

    fixture.autoDetectChanges();

    expectCheckboxWorks('#uppercase', {
      length: 20,
      numbers: false,
      uppercase: true,
      symbols: false,
    });

    expectCheckboxWorks('#numbers', {
      length: 20,
      numbers: true,
      uppercase: true,
      symbols: false,
    });

    expectCheckboxWorks('#symbols', {
      length: 20,
      numbers: true,
      uppercase: true,
      symbols: true,
    });

    const lengthInput = document.querySelector('#length') as HTMLInputElement;
    lengthInput.value = '42';
    lengthInput.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalledWith({
      length: 42,
      numbers: true,
      uppercase: true,
      symbols: true,
    });
  });
});
