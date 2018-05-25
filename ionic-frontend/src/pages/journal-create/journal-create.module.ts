import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { JournalCreatePage } from './journal-create';

@NgModule({
  declarations: [
    JournalCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(JournalCreatePage)
  ],
  exports: [
    JournalCreatePage
  ]
})
export class JournalCreatePageModule { }
