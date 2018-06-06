import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, AlertController, ToastController, ItemSliding } from 'ionic-angular';

import { Entry } from '../../models/entry';
import { Entries } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-entries',
  templateUrl: 'entries.html'
})
export class EntriesPage {
  journalId: number;
  isLoading: boolean;
  entries$: Entry[];
  private currentEntry: Entry;

  constructor(public navCtrl: NavController, public params: NavParams, public entries: Entries, public modalCtrl: ModalController, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    if (params.get('journalId')) {
      this.isLoading = true;
      this.journalId = params.get('journalId');
      this.entries.getAll(this.journalId).subscribe(res => {
        this.isLoading = false;
        this.entries$ = res['data']['entries'];
      }, (err) => {
        this.isLoading = false;

        let message = (err.error.message) ? err.error.message : "An error occured.";
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
    } else {
      this.navCtrl.pop();
    }
  }

  /**
   * Prompt the user to add a new entry. This shows our EntryCreatePage in a
   * modal and then adds the new entry to our data source if the user created one.
   */
  addEntry() {
    let addModal = this.modalCtrl.create('EntryCreatePage', { 'journalId': this.journalId });
    addModal.onDidDismiss(entry => {
      if (entry) {
        this.entries$.push(entry);
      }
    })
    addModal.present();
  }

  editEntry(entry: Entry, slidingItem: ItemSliding) {
    let entryCopy = Object.assign({}, entry);
    let addModal = this.modalCtrl.create('EntryCreatePage', { 'entry': entryCopy });
    addModal.onDidDismiss(entryCopy => {
      if (entryCopy) {
        this.entries$.splice(this.entries$.indexOf(entry), 1, entryCopy);
      }
      slidingItem.close();
    })
    addModal.present();
  }

  deleteEntry(entry: Entry, slidingItem: ItemSliding) {
    //TODO: Prompt if sure they want to delete
    let alert = this.alertCtrl.create({
      title: 'Confirm delete Entry',
      message: 'Are you sure you want to permanently delete this entry?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.entries.delete(entry).subscribe(resp => {
              if (resp['success']) {
                this.entries$.splice(this.entries$.indexOf(entry), 1);
              }
            });
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * Navigate to the Entries Page
   */
  openEntry(entry: Entry) {
    this.currentEntry = entry;
    this.navCtrl.push('EntryViewPage', {
      entry: entry,
      callback: this.getData
    });
  }

  getData = entry => {
    return new Promise((resolve, reject) => {
      this.entries$.splice(this.entries$.indexOf(this.currentEntry), 1, entry);
      this.currentEntry = null;
      resolve();
    });
  };
}
