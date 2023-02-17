import { Injectable } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor(
        private translateService: TranslateService,
        private alertController: AlertController,
        private modalCtrl: ModalController
    ) { }
    
    dismiss() {
        this.modalCtrl.dismiss();
    }

    showConfirmationModal(message: string) {
        return new Promise(async (resolve) => {
            const alert = await this.alertController.create({
                cssClass: 'confirmation-modal',
                header: message,
                buttons: [
                    {
                        text: this.translateService.instant('Basic.no'),
                        role: 'cancel',
                        handler: (_) => {
                            resolve(false);
                        }
                    }, {
                        text: this.translateService.instant('Basic.yes'),
                        handler: () => {
                            resolve(true);
                        }
                    }
                ]
            });
    
            await alert.present();
        });
    }
}
