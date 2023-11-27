import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NgxNmDatePickerModule } from "ngx-nm-date-picker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule, provideClientHydration } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgxNmDatePickerModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
  providers: [provideClientHydration()],
})
export class AppModule {}
