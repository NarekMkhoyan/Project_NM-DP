import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { NgxNmDatePickerModule } from "ngx-nm-date-picker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgxNmDatePickerModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
  // providers: [provideClientHydration()],
})
export class AppModule {}
