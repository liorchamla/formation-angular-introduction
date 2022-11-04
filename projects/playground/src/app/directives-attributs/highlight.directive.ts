import { Directive, HostBinding, HostListener, Input } from '@angular/core';

/**
 * Cette directive permet de faire changer la couleur du background d'un élément HTML
 * lorsque la souris passe dessus, puis de remettre la couleur initiale
 * lorsque la souris en ressort
 */

@Directive({
  // Elle cible tous les élément <p> qui ont un attribut "highlight"
  selector: 'p[highlight]',
})
export class HighlightDirective {
  /**
   * La propriété `color` sera liée en permanence à la propriété
   * `style.backgroundColor` de l'élément HTML, cette notation revient à écrire :
   *
   * p.style.backgroundColor = this.color;
   */
  @HostBinding('style.backgroundColor')
  color = 'transparent';

  /**
   * On ira chercher cette information dans l'attribut "background-color" de l'élément HTML
   * auquel la directive est greffée.
   *
   * Exemple : <p highlight background-color="green">...</p>
   *
   * Permet de dire quelle est la couleur souhaitée lorsque la souris passe sur l'élément
   */
  @Input('background-color')
  backgroundColor = 'yellow';

  /**
   * On ira chercher cette information dans l'attribut "base-color" de l'élément HTML
   * auquel la directive est greffée.
   *
   * Exemple : <p highlight base-color="green">...</p>
   *
   * Permet de dire quelle est la couleur souhaitée par défaut (lorsque la souris n'est pas
   * au dessus de l'élément HTML)
   */
  @Input('base-color')
  baseColor = 'transparent';

  /**
   * La méthode onMouseEnter() sera appelée à chaque fois que la souris passe par dessus
   * l'élément HTML
   *
   * Cette notation revient à écrire :
   *
   * p.addEventListener('mouseenter', ($event) => {
   *    this.onMouseEnter();
   * })
   */
  @HostListener('mouseenter')
  onMouseEnter() {
    this.color = this.backgroundColor;
  }

  /**
   * La méthode onMouseOut() sera appelée à chaque fois que la souris sort de
   * l'élément HTML
   *
   * Cette notation revient à écrire :
   *
   * p.addEventListener('mouseout', ($event) => {
   *    this.onMouseOut();
   * })
   */
  @HostListener('mouseout')
  onMouseOut() {
    this.color = this.baseColor;
  }

  /**
   * La méthode ngOnInit est un `Lifecycle hook` : une méthode appelée automatiquement
   * par Angular à un certain moment de la vie de la directive.
   *
   * ngOnInit est appelée automatiquement une fois que les @Input et autres bindings ont été faits.
   */
  ngOnInit() {
    this.color = this.baseColor;
  }
}
