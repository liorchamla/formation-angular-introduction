import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { PasswordControlsComponent } from './password-controls.component';

@Component({
  selector: '',
  template: `
    <password-controls (generate)="onGenerate()"></password-controls>
  `,
})
class TestComponent {
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
});

describe('PasswordControlsComponent (avec TestBed)', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, PasswordControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
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
});
