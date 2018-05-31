import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform } from 'ionic-angular';

import { LoginPage, MainPage } from '../pages';
import { User } from '../providers';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;

  @ViewChild(Nav) nav: Nav;
  
  constructor(platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private user: User) {
    // If User is logged in, send to Main Page
    platform.ready().then(() => {
      this.user.isLoggedIn().then(() => {
        this.rootPage = MainPage;
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }).catch((err) => {
        this.rootPage = LoginPage;
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      })
    });
  }
}
