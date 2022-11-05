import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { PasswordControlsComponent } from './password-controls.component';

@Component({
  selector: '',
  template: `
    <password-controls
      [password]="password"
      (generate)="onGenerate()"
    ></password-controls>
  `,
})
class TestComponent {
  password = '';

  onGenerate() {}
}

describe('PasswordControlsComponent (avec Spectator)', () => {
  let spectator: Spectator<TestComponent>;
  let component: TestComponent;

  const createComponent = createComponentFactory({
    component: TestComponent,
    declarations: [PasswordControlsComponent],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should emit an event when user clicks the button', () => {
    // On créé un espion sur la fonction onGenerate() de notre composant
    // Si elle est appelée, c'est qu'on a bien un @Output sur le canal "generate"
    const spy = spyOn(component, 'onGenerate');

    spectator.click('button');

    expect(spy).toHaveBeenCalled();
  });

  it('should show a copy button if a password exists', () => {
    spectator.setInput('password', 'MOCK_PASSWORD');

    expect(spectator.query('#copy')).toExist();
  });

  it('should not show a copy button if no password is given', () => {
    expect(spectator.query('#copy')).not.toExist();
  });

  it('should copy the password when user clicks the copy button', () => {
    const copySpy = spyOn(navigator.clipboard, 'writeText');

    // Pour avoir un bouton #copy, il faut qu'il y ait un password
    spectator.setInput('password', 'MOCK_PASSWORD');

    spectator.click('#copy');

    expect(copySpy).toHaveBeenCalledWith('MOCK_PASSWORD');
  });

  it('should show a message only after the user has click on copy button', () => {
    const copySpy = spyOn(navigator.clipboard, 'writeText');

    // Pour avoir un bouton #copy, il faut qu'il y ait un password
    spectator.setInput('password', 'MOCK_PASSWORD');

    spectator.click('#copy');

    expect(spectator.query('#copy-message')).toExist();
  });

  it('should remove the copy message if a new password is given', () => {
    const copySpy = spyOn(navigator.clipboard, 'writeText');

    // Pour avoir un bouton #copy, il faut qu'il y ait un password
    spectator.setInput('password', 'MOCK_PASSWORD');

    spectator.click('#copy');

    expect(spectator.query('#copy-message')).toExist();

    // Si un nouveau password est donné :
    spectator.setInput('password', 'NEW_MOCK_PASSWORD');
    // Alors on n'a plus de message
    expect(spectator.query('#copy-message')).not.toExist();

    // Si on click sur le bouton copy
    spectator.click('#copy');
    // Le message revient
    expect(spectator.query('#copy-message')).toExist();
  });
});

describe('PasswordControlsComponent (avec TestBed)', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let document: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, PasswordControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    document = fixture.nativeElement;
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should emit an event when user clicks the button', () => {
    // On créé un espion sur la fonction onGenerate() de notre composant
    // Si elle est appelée, c'est qu'on a bien un @Output sur le canal "generate"
    const spy = spyOn(component, 'onGenerate');

    fixture.nativeElement.querySelector('button').click();

    expect(spy).toHaveBeenCalled();
  });

  it('should show a copy button if a password exists', () => {
    fixture.componentInstance.password = 'MOCK_PASSWORD';
    fixture.detectChanges();

    expect(document.querySelector('#copy')).toBeTruthy();
  });

  it('should not show a copy button if no password is given', () => {
    expect(document.querySelector('#copy')).toBeNull();
  });

  it('should copy the password when user clicks the copy button', () => {
    const copySpy = spyOn(navigator.clipboard, 'writeText');

    // Pour avoir un bouton #copy, il faut qu'il y ait un password
    fixture.componentInstance.password = 'MOCK_PASSWORD';
    fixture.detectChanges();

    (document.querySelector('#copy') as HTMLButtonElement).click();

    expect(copySpy).toHaveBeenCalledWith('MOCK_PASSWORD');
  });

  it('should show a message only after the user has click on copy button', () => {
    const copySpy = spyOn(navigator.clipboard, 'writeText');

    // Pour avoir un bouton #copy, il faut qu'il y ait un password
    fixture.componentInstance.password = 'MOCK_PASSWORD';
    fixture.detectChanges();

    (document.querySelector('#copy') as HTMLButtonElement).click();

    expect(document.querySelector('#copy-message')).toBeTruthy();
  });

  it('should remove the copy message if a new password is given', () => {
    const copySpy = spyOn(navigator.clipboard, 'writeText');

    // Pour avoir un bouton #copy, il faut qu'il y ait un password

    // Pour avoir un bouton #copy, il faut qu'il y ait un password
    fixture.componentInstance.password = 'MOCK_PASSWORD';
    fixture.detectChanges();

    (document.querySelector('#copy') as HTMLButtonElement).click();

    expect(document.querySelector('#copy-message')).toBeTruthy();

    // Si un nouveau password est donné :
    fixture.componentInstance.password = 'NEW_MOCK_PASSWORD';
    fixture.detectChanges();

    // Alors on n'a plus de message
    expect(document.querySelector('#copy-message')).toBeNull();

    // Si on click sur le bouton copy
    (document.querySelector('#copy') as HTMLButtonElement).click();
    // Le message revient
    expect(document.querySelector('#copy-message')).toBeTruthy();
  });
});
