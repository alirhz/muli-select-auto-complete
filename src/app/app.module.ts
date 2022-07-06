import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatAutocompleteOptionsScrollDirective } from './shared/bottom.directive';
import { DataService } from './service/data.service';
import { MultiSelectAutoCompleteComponent } from './multi-select-auto-complete/multi-select-auto-complete.component';
import { MapComponent } from './map/map.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MarkerDialogComponent } from './map/marker dialog/marker.dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MultiSelectAutoCompleteComponent,
    MatAutocompleteOptionsScrollDirective,
    MarkerDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    LeafletModule,
    BrowserAnimationsModule
  ],
  providers: [DataService,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
