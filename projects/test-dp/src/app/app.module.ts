import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxNmDatePickerModule } from 'ngx-nm-date-picker';
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
