import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatAutocompleteOptionsScrollDirective } from './shared/bottom.directive';
import { DataService } from './service/data.service';
import { MultiSelectAutoCompleteComponent } from './multi-select-auto-complete/multi-select-auto-complete.component';

@NgModule({
  declarations: [
    AppComponent,
    MultiSelectAutoCompleteComponent,
    MatAutocompleteOptionsScrollDirective
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
