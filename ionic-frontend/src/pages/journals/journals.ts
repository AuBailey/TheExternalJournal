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
  journals$: Journal[];

  constructor(public navCtrl: NavController, public journals: Journals, public modalCtrl: ModalController, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.isLoading = true;
    this.journals.getAll().subscribe(res => {
      this.isLoading = false;
      this.journals$ = res['data']['journals']; 
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
        this.journals.add(journal).subscribe(resp => {
          journal.id = resp['data']['journalId'];
          this.journals$.push(journal);
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
    let addModal = this.modalCtrl.create('JournalCreatePage', {'journal': journalCopy});
    addModal.onDidDismiss(journalCopy => {
      if (journalCopy && (journalCopy.name !== journal.name)) {
        this.journals.edit(journalCopy).subscribe(resp => {
          this.journals$.splice(this.journals$.indexOf(journal), 1, journalCopy);
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
      slidingItem.close();
    })
    addModal.present();
  }

  deleteJournal(journal: Journal, slidingItem: ItemSliding) {
    //TODO: Prompt if sure they want to delete
    let alert = this.alertCtrl.create({
      title: 'Confirm delete Journal',
      message: 'Are you sure you want to permanently delete this Journal and all it\'s Entries?',
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
            this.journals.delete(journal).subscribe(resp => {
              if (resp['success']) {
                this.journals$.splice(this.journals$.indexOf(journal), 1);
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
  openJournal(journal: Journal) {
    this.navCtrl.push('EntriesPage', {
      journal: journal
    });
  }
}
