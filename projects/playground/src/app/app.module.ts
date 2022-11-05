import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ConfirmDirective } from './directives-attributs/confirm.directive';
import { CounterComponent } from './components/counter.component';
import { HighlightDirective } from './directives-attributs/highlight.directive';
import { NoOpenDirective } from './directives-attributs/no-open.directive';
import { UserProfileComponent } from './components/user-profile.component';
import { ModelDirective } from './directives-attributs/model.directive';
import { SetClassesDirective } from './directives-attributs/set-classes.directive';
import { FormsModule } from '@angular/forms';
import { ForceLowerDirective } from './directives-attributs/force-lower.directive';
import { NewsletterComponent } from './components/newsletter.component';
import { CardComponent } from './components/card.component';
import { IfDirective } from './directives-structurelles/if.directive';
import { LoopDirective } from './directives-structurelles/loop.directive';
import { RepeatDirective } from './directives-structurelles/repeat.directive';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    NoOpenDirective,
    ConfirmDirective,
    UserProfileComponent,
    CounterComponent,
    ModelDirective,
    SetClassesDirective,
    ForceLowerDirective,
    NewsletterComponent,
    CardComponent,
    IfDirective,
    LoopDirective,
    RepeatDirective,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
