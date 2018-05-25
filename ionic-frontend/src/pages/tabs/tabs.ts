import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { JournalsPage, SettingsPage } from '../';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = JournalsPage;
  tab2Root: any = SettingsPage;

  tab1Title = "Journals";
  tab2Title = "Settings";

  constructor(public navCtrl: NavController) {

  }
}
