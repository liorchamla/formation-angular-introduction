import { Directive, HostListener } from '@angular/core';

/**
 * Cette directive permet de s'assurer qu'un lien ne sera pas ouvert si
 * l'utilisateur clique sur le lien
 */

@Directive({
  // On cible tous les <a> qui ont l'attribut "no-open"
  selector: 'a[no-open]',
})
export class NoOpenDirective {
  /**
   * La méthode onClickLink sera appelée à chaque fois qu'un utilisateur
   * click sur l'élément HTML affecté par cette directive
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
    // Retourner `false` dans un HostListener revient à faire un
    // `event.preventDefault()`
    return false;
  }
}
