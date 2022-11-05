import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FormsModule } from '@angular/forms';
import { PasswordControlsComponent } from './password-generator/password-controls.component';
import { PasswordSettingsComponent } from './password-generator/password-settings.component';
import { PasswordDisplayComponent } from './password-generator/password-display.component';
import { PasswordGeneratorService } from './password-generator/password-generator.service';
import { PasswordGeneratorModule } from './password-generator/password-generator.module';

describe('AppComponent (avec Spectator)', () => {
  let spectator: Spectator<AppComponent>;
  let component: AppComponent;

  const createComponent = createComponentFactory({
    component: AppComponent,
    mocks: [PasswordGeneratorService],
    imports: [PasswordGeneratorModule],
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
    // Configurons l'espion sur la méthode "generate" du PasswordGeneratorService
    spectator
      .inject(PasswordGeneratorService)
      .generate.and.returnValue('MOCK_PASSWORD');

    spectator.click('button');

    expect(spectator.query('article')).toHaveText('MOCK_PASSWORD');
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
      declarations: [AppComponent],
      providers: [],
      imports: [PasswordGeneratorModule],
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
    // Créons un espion sur le PasswordGeneratorService :
    const spy = spyOn(TestBed.inject(PasswordGeneratorService), 'generate');
    // La fonction retournera désormais "MOCK_PASSWORD"
    spy.and.returnValue('MOCK_PASSWORD');

    // Quand je click sur le bouton
    fixture.nativeElement.querySelector('button').click();

    const article = fixture.nativeElement.querySelector('article');
    expect(article.textContent).toBe('MOCK_PASSWORD');
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
