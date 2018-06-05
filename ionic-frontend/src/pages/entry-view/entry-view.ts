import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, AlertController, ToastController, NavParams } from 'ionic-angular';

import { Entry } from '../../models/entry';

@IonicPage()
@Component({
    selector: 'page-entry-view',
    templateUrl: 'entry-view.html'
})
export class EntryViewPage {
    entry: Entry;

    constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController, private alertCtrl: AlertController, private toastCtrl: ToastController) {
        if (params.get('entry')) {
            this.entry = params.get('entry')
        } else {
            let message = "Error reading entry";
            let toast = this.toastCtrl.create({
                message: message,
                duration: 3000,
                position: 'top'
            });
            toast.present();

            navCtrl.pop();
        }
    }

    editEntry(entry: Entry) {
        this.navCtrl.push('EntryCreatePage', {
            entry: entry
        });
    }
}
