import { Component, Input } from '@angular/core';

/**
 * Correction de l'exercice sur la création d'un composant CounterComponent
 */

@Component({
  selector: 'counter',
  template: `
    Compteur : {{ count }}
    <button (click)="increment()">+ Incrémenter</button>
    <button (click)="decrement()">- Décrémenter</button>
  `,
})
export class CounterComponent {
  /**
   * On va récupérer cette information dans l'attribut "initial-value" de la balise
   * <counter>
   *
   * Exemple : <counter [initial-value]="20"></counter>
   *
   * On utilise ici le property binding sinon "20" sera considéré comme une string
   * et non comme un véritable number
   */
  @Input('initial-value')
  count = 0;

  /**
   * On va récupérer cette information dans l'attribut "step" de la balise
   * <counter>
   *
   * Exemple : <counter [step]="5"></counter>
   *
   * On utilise ici le property binding sinon "5" sera considéré comme une string
   * et non comme un véritable number
   */
  @Input()
  step = 1;

  /**
   * La méthode increment() sera appelée dès que l'utilisateur cliquera sur le bouton "Incrémenter"
   * grâce à l'Event Binding <button (click)="...">
   */
  increment() {
    this.count += this.step;
  }

  /**
   * La méthode decrement() sera appelée dès que l'utilisateur cliquera sur le bouton "Décrémenter"
   * grâce à l'Event Binding <button (click)="...">
   */
  decrement() {
    this.count -= this.step;
  }
}
