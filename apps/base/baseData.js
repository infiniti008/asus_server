let serviceAccountPath = 'apps/base/alfabot-firebase.json';
if(process.env.NODE_ENV === 'prod') {
    serviceAccountPath = '/home/node/app/alfabot-firebase.json'
}

import admin from 'firebase-admin';
import fs from 'fs';
import CONFIG from './config.js';

let serviceAccount = {};

try {
  console.log('serviceAccountPath', serviceAccountPath)
  serviceAccount = fs.readFileSync(serviceAccountPath).toString();
  serviceAccount = JSON.parse(serviceAccount);
} catch(e) {
  console.log(e);
}

class BaseData {
    constructor(){
        this.credential = admin.credential.cert(serviceAccount);
        this.databaseURL = `${CONFIG.baseHost}?ns=${CONFIG.baseName}`;
        this.initBase();
    }
    initBase(){
        this.app = admin.initializeApp({
            credential: this.credential,
            databaseURL: this.databaseURL,
        });
    }

    closeBase(){
        this.app.delete();
    }

    async getKurses(){
        try{
            const snapshot = await this.app.database().ref('/kurses').get();

            return snapshot.val();
        }
        catch(e){
            return null;
        }
    }

    async getKursesKeys(){
        try{
            const snapshot = await this.app.database().ref('/kurses').get();
            return Object.keys(snapshot.val());
        }
        catch(e){
            return [];
        }
    }

    async getSubscribers(){
        try{
            const snapshot = await this.app.database().ref('/subscribers').get();

            return snapshot.val();
        }
        catch(e){
            return null;
        }
    }

    async getAllSubscriptionsById(id){
        try{
            let subscribersSnapshot = await this.app.database().ref('/subscribers').get();
            if(!subscribersSnapshot && typeof subscribersSnapshot === 'object'){
                return [];
            }
            subscribersSnapshot = subscribersSnapshot.val();
            const map = {};
            for (const key in subscribersSnapshot) {
                if(subscribersSnapshot[key] && typeof subscribersSnapshot[key] === 'object'){
                    for (const p in subscribersSnapshot[key]) {
                        if(subscribersSnapshot[key][p] == id){
                            map[key] = true;
                        }
                    }
                }
            }

            return Object.keys(map);
        }
        catch(e){
            return null;
        }
    }

    async removeSubscriptionByKey(id, key){
        try{
            let subscribersSnapshot = await this.app.database().ref('/subscribers/' + key).orderByValue().equalTo(id).ref.remove();
        }
        catch(e){
            console.log(e)
            return null;
        }
    }

    async addSubscriber(key, id){
        return await this.app.database().ref('/subscribers/' + key).push(id.toString());
    }

    async setKursByKey(key, val){
        try{
            await this.app.database().ref('/kurses/' + key).set(val);
        }
        catch(e){
        }
    }

    async addUserToBase(id) {
        return await this.app.database().ref('/subscribers').push(id.toString());
    }
}

export default BaseData;
