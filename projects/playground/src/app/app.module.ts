import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ConfirmDirective } from './directives-attributs/confirm.directive';
import { CounterComponent } from './components/counter.component';
import { HighlightDirective } from './directives-attributs/highlight.directive';
import { NoOpenDirective } from './directives-attributs/no-open.directive';
import { UserProfileComponent } from './components/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    NoOpenDirective,
    ConfirmDirective,
    UserProfileComponent,
    CounterComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
