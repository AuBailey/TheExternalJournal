import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { EntryViewPage } from './entry-view';

@NgModule({
  declarations: [
    EntryViewPage,
  ],
  imports: [
    IonicPageModule.forChild(EntryViewPage)
  ],
  exports: [
    EntryViewPage
  ]
})
export class EntryViewPageModule { }
