import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(
        private readonly toastController: ToastController
    ) { }

    async presentToast(message: string, duration: number = 2000) {
        const toast = await this.toastController.create({
            message,
            duration
        });

        toast.present();
    }
}
