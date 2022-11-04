import { Directive, HostListener, Input } from '@angular/core';

/**
 * Cette directive permet de faire confirmer à l'utilisateur qu'il veut vraiment
 * se rendre sur un autre site web
 */

@Directive({
  // On cible tous les <a> qui ont un attribut "confirm"
  selector: 'a[confirm]',
})
export class ConfirmDirective {
  /**
   * On va chercher cette information dans un attribut "confirm-message"
   *
   * Exemple : <a href="..." confirm confirm-message="Mon message de confirmation">..</a>
   *
   * Par défaut : "Êtes vous sûr ?"
   */
  @Input('confirm-message')
  message = 'Êtes vous sûr ?';

  /**
   * La méthode onClickLink() sera appelée dès qu'on click sur l'élément HTML
   * affecté par cette directive
   *
   * Cette notation revient à écrire :
   *
   * a.addEventListener('click', ($event) => {
   *    this.onClickLink();
   * })
   *
   * @returns boolean
   */
  @HostListener('click')
  onClickLink() {
    // On retourne true | false en fonction de la réponse à la demande
    // de confirmation.
    return window.confirm(this.message);
    // Retourner `false` dans un HostListener revient à faire un
    // `event.preventDefault()`
  }
}
