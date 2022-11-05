import { TestBed } from '@angular/core/testing';
import { TAUX_TVA, TaxesService } from '../services/taxes.service';
import { DeclarationComponent } from './declaration.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

/**
 * Dans nos tests, comme dans la vraie vie d'ailleurs, on peut tout à fait demander
 * aux injecteurs de fournir un simple objet existant quand les composants ou les
 * directives leur demanderont un service
 *
 * Ici par exemple on pourrait créer un provider tel que :
 *
 * {
 *  provide: TaxesService,
 *  useValue: mockService
 * }
 *
 */
const mockService = {
  calculate(revenu: number) {
    return revenu + 500;
  },
};

/**
 * Dans nos tests, comme dans la vraie vie d'ailleurs, on peut tout à fait demander
 * aux injecteurs de fournir une instance d'une AUTRE CLASSE quand les composants ou les
 * directives leur demanderont un service
 *
 * Ici par exemple on pourrait créer un provider tel que :
 *
 * {
 *  provide: TaxesService,
 *  useClass: FakeService
 * }
 *
 * Ce qui serait équivalent à :
 *
 * {
 *  provide: TaxesService,
 *  useFactory: () => {
 *   return new FakeService();
 *  }
 * }
 *
 */
class FakeService {
  calculate(revenu: number) {
    return revenu + 500;
  }
}

describe('DeclarationComponent (avec TestBed)', () => {
  it('should show taxes results', async () => {
    await TestBed.configureTestingModule({
      declarations: [DeclarationComponent],
      providers: [
        // {
        //   provide: TaxesService,
        //   useFactory: () => {
        //     return new FakeService
        //   }
        // },
        // Equivalent à :
        // {
        //   provide: TaxesService,
        //   useClass: FakeService
        // },
        TaxesService,
        { provide: TAUX_TVA, useValue: 0.2 },
      ],
    }).compileComponents();

    // Si l'on souhaite redéfinir les providers au niveau du composant DeclarationComponent
    // il faut le faire ainsi :

    // TestBed.overrideComponent(DeclarationComponent, {
    //   set: {
    //     providers: [TaxesService],
    //   },
    // });

    const fixture = TestBed.createComponent(DeclarationComponent);
    const document = fixture.nativeElement as HTMLElement;

    fixture.autoDetectChanges();

    // On peut demander au TestBed de nous donner l'instance de TaxesService qu'il a
    // créé lors de la création du composant
    const service = TestBed.inject(TaxesService);
    // Puis on peut faire un espion pour remplacer sa fonction "calculate"
    const spy = spyOn(service, 'calculate');
    // Enfin, on peut piloter la façon dont l'espion pourra travailler
    spy.and.callFake((revenu) => revenu + 500);

    // Quand je donne un montant dans l'<input>
    const input = document.querySelector('input') as HTMLInputElement;
    input.value = '1000';

    // Si je click sur le bouton
    document.querySelector('button')?.click();

    // Alors je devrais voir le résultat dans <article>
    expect(document.querySelector('article')?.textContent).toContain('1500');
  });
});

describe('DeclarationComponent (avec Specatator)', () => {
  let spectator: Spectator<DeclarationComponent>;
  const createComponent = createComponentFactory({
    component: DeclarationComponent,
    // componentProviders: [TaxesService],
    providers: [
      // Avec Spectator, si le TaxesService est placé dans les "mocks"
      // il n'y a plus besoin d'écrire un provider
      //   TaxesService,
      { provide: TAUX_TVA, useValue: 0.2 },
    ],
    // Le tableau des "mocks" permet de dire à Spectator qu'on va
    // effacer toutes les méthodes des service de telle ou telle classe
    // et les remplacer d'office par des spy (spyOn)
    mocks: [TaxesService],
  });

  it('should show taxes results', () => {
    spectator = createComponent();

    // On peut demander à Spectator de nous donner l'instance de TaxesService qu'il a créé
    // afin de modifier le fonctionnement du spy qu'il a aussi créé sur la méthode
    // calculate()
    spectator
      .inject(TaxesService)
      .calculate.and.callFake((revenu) => revenu + 500);

    // Quand je donne un montant dans l'<input>
    spectator.typeInElement('1000', 'input');

    // Si je click sur le bouton
    spectator.click('button');

    // Alors je devrais voir le résultat dans <article>
    expect(document.querySelector('article')).toHaveText('1500');
  });
});
