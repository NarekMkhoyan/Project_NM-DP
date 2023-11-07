import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxNmDatePickerModule } from 'ngx-nm-date-picker';
import { NmImageBlurModule } from 'projects/ngx-nm-image-blur/src/public-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxNmDatePickerModule,
    NmImageBlurModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
