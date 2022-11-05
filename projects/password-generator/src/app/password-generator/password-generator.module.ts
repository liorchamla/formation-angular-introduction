import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordControlsComponent } from './password-controls.component';
import { PasswordDisplayComponent } from './password-display.component';
import { PasswordGeneratorService } from './password-generator.service';
import { PasswordSettingsComponent } from './password-settings.component';

/**
 * Ce module permet de mettre en commun l'ensemble des composants
 * ainsi que le provider qui permettra aux devs qui utiliseront ce module
 * de ne pas avoir à se soucier du PasswordGeneratorService
 */

@NgModule({
  /**
   * Les déclarations correspondent aux pipes, directives ou composants
   * qui existent au sein de ce module
   */
  declarations: [
    PasswordControlsComponent,
    PasswordDisplayComponent,
    PasswordSettingsComponent,
  ],
  /**
   * Les exports représentent les pipes, directives et composants que les devs
   * qui utilisent ce module pourront utiliser au sein de leur propre HTML
   */
  exports: [
    PasswordControlsComponent,
    PasswordDisplayComponent,
    PasswordSettingsComponent,
  ],
  imports: [
    /**
     * On importe le CommonModule car on utilise des directives qui en sont
     * issues comme ngIf ou ngFor, voire même ngStyle, ngClass etc
     */
    CommonModule,
    /**
     * On importe le FormsModule car on utilise des directives qui en sont issues
     * comme ngModel ou ngForm par exemple
     */
    FormsModule,
  ],
  providers: [PasswordGeneratorService],
})
export class PasswordGeneratorModule {}
