import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NgxEditorModule } from 'ngx-editor';

import { SettingsPage } from './settings';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    NgxEditorModule,
    IonicPageModule.forChild(SettingsPage)
  ],
  exports: [
    SettingsPage
  ]
})
export class SettingsPageModule { }
