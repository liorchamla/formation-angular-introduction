import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FormsModule } from '@angular/forms';
import { PasswordControlsComponent } from './components/password-controls.component';
import { PasswordSettingsComponent } from './components/password-settings.component';
import { PasswordDisplayComponent } from './components/password-display.component';

describe('AppComponent (avec Spectator)', () => {
  let spectator: Spectator<AppComponent>;
  let component: AppComponent;

  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [
      PasswordControlsComponent,
      PasswordSettingsComponent,
      PasswordDisplayComponent,
    ],
    imports: [FormsModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should work', () => {
    expect(spectator.query('article')).toHaveText(
      'Cliquez sur le bouton "Générer"'
    );
  });

  it('should change message when user clicks generate button', () => {
    spectator.click('button');

    expect(spectator.query('article')).toHaveText('MON_MOT_DE_PASSE');
  });

  it('should update settings when user clicks on checkboxes', () => {
    spectator.click('#uppercase');
    expect(component.settings.uppercase).toBeTrue();

    spectator.click('#symbols');
    expect(component.settings.symbols).toBeTrue();

    spectator.click('#numbers');
    expect(component.settings.numbers).toBeTrue();

    spectator.typeInElement('33', '#length');

    expect(component.settings.length).toBe(33);
  });
});

describe('AppComponent (avec TestBed)', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PasswordControlsComponent,
        PasswordSettingsComponent,
        PasswordDisplayComponent,
      ],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.autoDetectChanges();

    component = fixture.componentInstance;
  });

  it('should work', () => {
    const article = fixture.nativeElement.querySelector('article');
    expect(article.textContent).toBe('Cliquez sur le bouton "Générer"');
  });

  it('should change message when user clicks generate button', () => {
    fixture.nativeElement.querySelector('button').click();

    const article = fixture.nativeElement.querySelector('article');
    expect(article.textContent).toBe('MON_MOT_DE_PASSE');
  });

  it('should update settings when user clicks on checkboxes', () => {
    fixture.nativeElement.querySelector('#uppercase').click();
    expect(component.settings.uppercase).toBeTrue();

    fixture.nativeElement.querySelector('#symbols').click();
    expect(component.settings.symbols).toBeTrue();

    fixture.nativeElement.querySelector('#numbers').click();
    expect(component.settings.numbers).toBeTrue();

    const lengthInput = fixture.nativeElement.querySelector(
      '#length'
    ) as HTMLInputElement;
    lengthInput.value = '33';
    lengthInput.dispatchEvent(new Event('input'));

    expect(component.settings.length).toBe(33);
  });
});
