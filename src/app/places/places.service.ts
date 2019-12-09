import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private authService: AuthService, private http: HttpClient) {}

  get places() {
    return this.http.get<Place[]>('http://localhost:5000/api/place');
  }
  getPlace(placeId: string) {
    return this.http.get<Place>('http://localhost:5000/api/place/' + placeId);
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://www.theindianiris.com/wp-content/uploads/2016/06/230-2.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.UserId
    );
    return this.http.post('http://localhost:5000/api/place', {});
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.http.post('http://localhost:5000/api/place', {});
  }
}
