import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('AppComponent (avec Spectator)', () => {
  let spectator: Spectator<AppComponent>;
  let component: AppComponent;

  const createComponent = createComponentFactory({
    component: AppComponent,
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
    expect(component.uppercase).toBeTrue();

    spectator.click('#symbols');
    expect(component.symbols).toBeTrue();

    spectator.click('#numbers');
    expect(component.numbers).toBeTrue();

    spectator.typeInElement('33', '#length');

    expect(component.length).toBe(33);
  });
});

describe('AppComponent (avec TestBed)', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
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
    expect(component.uppercase).toBeTrue();

    fixture.nativeElement.querySelector('#symbols').click();
    expect(component.symbols).toBeTrue();

    fixture.nativeElement.querySelector('#numbers').click();
    expect(component.numbers).toBeTrue();

    const lengthInput = fixture.nativeElement.querySelector(
      '#length'
    ) as HTMLInputElement;
    lengthInput.value = '33';
    lengthInput.dispatchEvent(new Event('input'));

    expect(component.length).toBe(33);
  });
});
