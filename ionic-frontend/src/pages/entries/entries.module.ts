import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PipesModule } from '../../pipes/pipes.module'
import { EntriesPage } from './entries';

@NgModule({
  declarations: [
    EntriesPage,
  ],
  imports: [
    IonicPageModule.forChild(EntriesPage),
    PipesModule
  ],
  exports: [
    EntriesPage
  ]
})
export class EntriesPageModule { }
