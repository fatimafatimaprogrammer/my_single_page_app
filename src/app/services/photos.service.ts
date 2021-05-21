import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(
    private http: HttpClient
  ) { }

  getAlbums() {
    return this.http.get('https://jsonplaceholder.typicode.com/albums');
  }

  getPhoto(albumId:any) {
    return this.http.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
  }

  addPhoto(photoData:any) {
    const url = 'https://jsonplaceholder.typicode.com/photos';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    };

    return this.http.post(url, photoData, httpOptions);
  }

  deletePhoto(photo:any) {
    const url = `https://jsonplaceholder.typicode.com/photos/${photo.id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    };
    return this.http.delete(url, httpOptions);
  }

  editPhoto(photoData:any) {
    const url = `https://jsonplaceholder.typicode.com/photos/${photoData.id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    };

    return this.http.put(url, photoData, httpOptions);
  }
}
