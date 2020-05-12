import { UrlConfig } from '../../src/assets/configuration/config';
import db from '../../db.json';
import { get, save, getById } from '../firebase-module'

let baseurl = UrlConfig.baseurl;
export default class ShowService {

    getGenre() {
        return db.genre;
    }

    getFaqs() {
        return db.faq;
    }

    getArtist() {
        return db.artist;
    }

    getArtistById(Id) {
        return db.artist.filter(art => art.nArtistId == Id);
    }

    getArtistByGenre(Id) {
        return db.artist.filter(art => art.nGenreId == Id);
    }

    getInterviewsData() {
        return db.interview;
    }

    getProducts() {
        return db.product;
    }

    //Dynamic data
    saveSubscription(objRequest) {
        return save("subscription", objRequest).then(response => {
            return response
        });
    }

    saveShow(objRequest) {
        return save("post", objRequest).then(response => {
            return response
        });
    }
    getPosts() {
        return get('post').then(response => {
            return response.docs;
        });
    }

    getPostById(Id) {
        return getById('post', Id);
    }
}
