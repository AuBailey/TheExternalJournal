import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NgxEditorModule } from 'ngx-editor';

import { EntryCreatePage } from './entry-create';

@NgModule({
  declarations: [
    EntryCreatePage,
  ],
  imports: [
    NgxEditorModule,
    IonicPageModule.forChild(EntryCreatePage)
  ],
  exports: [
    EntryCreatePage
  ]
})
export class EntryCreatePageModule { }
