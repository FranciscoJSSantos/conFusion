import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';

import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
