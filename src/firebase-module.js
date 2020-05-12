import firebase from 'firebase/app'
import 'firebase/firestore'
import { uuid } from 'vue-uuid'

let database = null;

function initApp() {
    firebase.initializeApp({
        apiKey: "AIzaSyAAXIiC_DegCBCenzfp_ZDE7toy5TMkLJo",
        authDomain: "music-hall-1.firebaseapp.com",
        databaseURL: "https://music-hall-1.firebaseio.com",
        projectId: "music-hall-1",
        storageBucket: "music-hall-1.appspot.com",
        messagingSenderId: "246916228889",
        appId: "1:246916228889:web:dc353887a2d0d298304788",
        measurementId: "G-0SKSS7CFGR"
    })
    database = firebase.firestore();
}

function save(collectionName, data) {
    data.id = uuid.v1();
    return database.collection(collectionName).doc(data.id ).set(data).then(response => {
        return true
    }).catch(response => {
        return false
    })
}

function getById(collectionName, id) {
    return database.collection(collectionName).doc(id).get().then(response=>{
        return response.data()
    })
}

function get(collectionName) {
    return database.collection(collectionName).get();
}

export {
    initApp,
    get,
    save,
    getById
}