import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Voici notre première directive structurelle !
 * Elle permet de décider de l'existance ou non d'un block de code HTML dans la page
 * en fonction d'une condition (un boolean) passé en @Input !
 */
@Directive({
  selector: '[if]',
})
export class IfDirective {
  /**
   * Cet input reçoit le résultat d'une comparaison ou toute autre valeur
   * et servira à déterminer si oui ou non on veut projeter le template dans le container
   * associé
   *
   * Exemple : <div *if="age > 18">...</div>
   * Ou : <ng-template [if]="age > 18">...</ng-template>
   */
  @Input('if') condition = false;
  /**
   * Cet input reçoit (éventuellement) une référence à un élément <ng-template>
   * qui a été désigné pour apparaitre si la condition n'est pas remplie
   *
   * Exemple :
   *   <div *if="age > 18; else autre">...</div>
   *   <ng-template #autre>...</ng-template>
   *
   * Ou :
   *   <ng-template [if]="age > 18" [ifElse]="autre">...</ng-template>
   *   <ng-template #autre>...</ng-template>
   */
  @Input('ifElse') elseTemplate?: TemplateRef<any>;

  /**
   * Dans une directive structurelle (placée sur un <ng-template>), on reçoit
   * une référence au template lui-même, ainsi qu'une référence à l'endroit où se
   * trouve ce template sur la page.
   */
  constructor(
    private template: TemplateRef<any>,
    private container: ViewContainerRef
  ) {}

  ngOnChanges() {
    // A chaque fois que la condition change, on efface le contenu du container
    this.container.clear();

    // Et si la condition est "truthy"
    if (this.condition) {
      // On injecte le template dans le container
      this.container.createEmbeddedView(this.template);
      // Et on arrête
      return;
    }

    // Si la condition est falsy ET qu'on a un template alternatif
    if (this.elseTemplate) {
      // Alors on injecte le template alternatif dans le container
      this.container.createEmbeddedView(this.elseTemplate);
    }
  }
}
