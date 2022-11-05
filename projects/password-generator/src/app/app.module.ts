import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PasswordGeneratorModule } from './password-generator/password-generator.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PasswordGeneratorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
