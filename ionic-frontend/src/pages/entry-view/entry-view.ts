import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, ModalController, NavController, Navbar, ToastController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing'

import { Entry } from '../../models/entry';
import { Entries } from '../../providers/entries/entries'

declare var google;

@IonicPage()
@Component({
    selector: 'page-entry-view',
    templateUrl: 'entry-view.html'
})
export class EntryViewPage {
    @ViewChild(Navbar) navBar: Navbar;
    @ViewChild('map') mapElement: ElementRef;

    callback: any;
    displayMap: boolean;
    entry: Entry;
    map: any;

    constructor(public navCtrl: NavController,
        public params: NavParams,
        public modalCtrl: ModalController,
        private entries: Entries,
        private socialSharing: SocialSharing,
        private toastCtrl: ToastController) {
        if (params.get('entry')) {
            this.entry = params.get('entry')
            this.callback = params.get('callback');
            this.displayMap = !!(this.entry.lat && this.entry.lng);
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
    ionViewDidLoad() {
        this._loadMap();
        this.navBar.backButtonClick = (e:UIEvent)=>{
            this.callback(this.entry).then(() => { this.navCtrl.pop() });
        }
    }

    _loadMap() {
        if (this.displayMap) {
            let latLng = new google.maps.LatLng(this.entry.lat, this.entry.lng);

            let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            let marker = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: latLng
            });
            marker.setMap(this.map);
        }
    }

    editEntry() {
        let entryCopy = Object.assign({}, this.entry);
        let addModal = this.modalCtrl.create('EntryCreatePage', { 'entry': entryCopy });
        addModal.onDidDismiss(entryCopy => {
            if (entryCopy) {
                this.entry = entryCopy;
            }
        })
        addModal.present();
    }

    shareEntry() {
        let entryCopy = Object.assign({}, this.entry);
        entryCopy.isShared = 1;
        this.entries.edit(entryCopy).subscribe(resp => {
            this.entry = entryCopy;
            this.socialSharing.share("Sharing My Journal Entry!", "Sharing My Journal Entry with You!", null, "https://nuproject.tech/api/entry/shared/" + this.entry.id)
        }, err => {
            let message = "Could not share Entry.";
            let toast = this.toastCtrl.create({
                message: message,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        })
    }

    makePrivate() {
        let entryCopy = Object.assign({}, this.entry);
        entryCopy.isShared = 0;
        this.entries.edit(entryCopy).subscribe(resp => {
            this.entry = entryCopy;
        }, err => {
            let message = "Could not make entry private.";
            let toast = this.toastCtrl.create({
                message: message,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        })
    }
}
