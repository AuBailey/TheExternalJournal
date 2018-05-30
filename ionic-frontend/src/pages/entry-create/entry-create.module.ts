import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { EntryCreatePage } from './entry-create';

@NgModule({
  declarations: [
    EntryCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(EntryCreatePage)
  ],
  exports: [
    EntryCreatePage
  ]
})
export class EntryCreatePageModule { }
