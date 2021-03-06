import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, AlertController, ToastController, ItemSliding } from 'ionic-angular';

import { Journal } from '../../models/journal';
import { Journals } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-journals',
  templateUrl: 'journals.html'
})
export class JournalsPage {
  isLoading: boolean;
  journals: Journal[];

  constructor(public navCtrl: NavController, public journalProvider: Journals, public modalCtrl: ModalController, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.isLoading = true;
    this.journalProvider.getAll().subscribe(res => {
      this.isLoading = false;
      this.journals = res['data']['journals'];
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
  }

  /**
   * Prompt the user to add a new Journal. This shows our JournalCreatePage in a
   * modal and then adds the new Journal to our data source if the user created one.
   */
  addJournal() {
    let addModal = this.modalCtrl.create('JournalCreatePage');
    addModal.onDidDismiss(journal => {
      if (journal) {
        this.journalProvider.add(journal).subscribe(resp => {
          journal.id = resp['data']['journalId'];
          this.journals.push(journal);
        }, (err) => {
          let message = (err.error.message) ? err.error.message : "An error occured.";
          let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        })
      }
    })
    addModal.present();
  }

  editJournal(journal: Journal, slidingItem: ItemSliding) {
    let journalCopy = Object.assign({}, journal);
    let addModal = this.modalCtrl.create('JournalCreatePage', { 'journal': journalCopy });
    addModal.onDidDismiss(journalCopy => {
      if (journalCopy && (journalCopy.name !== journal.name)) {
        journal.isBeingModified = true;
        this.journalProvider.edit(journalCopy).subscribe(resp => {
          this.journals.splice(this.journals.indexOf(journal), 1, journalCopy);
          journal.isBeingModified = false;
        }, (err) => {
          let message = (err.error.message) ? err.error.message : "An error occured.";
          let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
          });
          toast.present();
          journal.isBeingModified = false;
        })
      }
      slidingItem.close();
    })
    addModal.present();
  }

  deleteJournal(journal: Journal, slidingItem: ItemSliding) {
    //TODO: Prompt if sure they want to delete
    let alert = this.alertCtrl.create({
      title: 'Confirm delete Journal',
      message: 'Are you sure you want to permanently delete this Journal and all of it\'s Entries?',
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
            this.journalProvider.delete(journal).subscribe(resp => {
              this.journals.splice(this.journals.indexOf(journal), 1);
            }, err => {
              let message = (err.error.message) ? err.error.message : "An error occured.";
              let toast = this.toastCtrl.create({
                message: message,
                duration: 3000,
                position: 'top'
              });
              toast.present();
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
  openJournal(journal: Journal) {
    this.navCtrl.push('EntriesPage', {
      journalId: journal.id
    });
  }
}
