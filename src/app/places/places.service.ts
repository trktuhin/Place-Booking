import { Injectable } from "@angular/core";
import { Place } from "./place.model";
import { AuthService } from "../auth/auth.service";
import { BehaviorSubject } from "rxjs";
import { take, map, tap, delay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      "p1",
      "Manhattan Mansion",
      "In the heart of new York city",
      "http://ecdn.banglatribune.com/contents/cache/images/825x0x1/uploads/media/2019/01/27/01a004d6b06c99ffe91179412963af67-5c4ca0b3a9865.jpg",
      149.99,
      new Date("2019,01,01"),
      new Date("2022,12,31"),
      "user1"
    ),
    new Place(
      "p2",
      "Dhaka Mansion",
      "In the heart of new Dhaka city",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8hwipUgKnnxc3qUDCfDNDTih9ydhdZKhWyyPUdBHZhNuJSwF5",
      159.99,
      new Date("2019,01,01"),
      new Date("2022,12,31"),
      "user1"
    ),
    new Place(
      "p3",
      "Chittagong Mansion",
      "In the heart of Chittagong city",
      "https://www.theindianiris.com/wp-content/uploads/2016/06/230-2.jpg",
      169.99,
      new Date("2019,01,01"),
      new Date("2022,12,31"),
      "user2"
    ),
    new Place(
      "p4",
      "Tangail Mansion",
      "In the heart of Tangail city",
      "https://static1.squarespace.com/static/5423f995e4b01248b3c04a4a/t/54465deae4b01a543eeb9140/1413897707903/",
      189.99,
      new Date("2019,01,01"),
      new Date("2022,12,31"),
      "user1"
    )
  ]);

  get places() {
    return this._places.asObservable();
  }
  constructor(private authService: AuthService) {}

  getPlace(placeId: string) {
    return this.places.pipe(
      take(1),
      map(places => {
        return { ...places.find(p => p.id === placeId) };
      })
    );
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
      "https://www.theindianiris.com/wp-content/uploads/2016/06/230-2.jpg",
      price,
      dateFrom,
      dateTo,
      this.authService.UserId
    );
    return this.places.pipe(
      take(1),
      delay(2000),
      tap(places => {
        this._places.next(places.concat(newPlace));
      })
    );
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(2000),
      tap(places => {
        const existingIndex = places.findIndex(f => f.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[existingIndex];
        updatedPlaces[existingIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availabeFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );

        this._places.next(updatedPlaces);
      })
    );
  }
}
