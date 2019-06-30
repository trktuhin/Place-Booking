import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  ModalController,
  NavController,
  ActionSheetController,
  LoadingController
} from "@ionic/angular";
import { CreateBookingComponent } from "../../../bookings/create-booking/create-booking.component";
import { Place } from "../../place.model";
import { ActivatedRoute, Router } from "@angular/router";
import { PlacesService } from "../../places.service";
import { Subscription } from "rxjs";
import { BookingService } from "src/app/bookings/booking.service";
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: "app-place-detail",
  templateUrl: "./place-detail.page.html",
  styleUrls: ["./place-detail.page.scss"]
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  private placeSub: Subscription;
  isBookable=false;
  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private bookingService: BookingService,
    private router:Router,
    private authService:AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("placeId")) {
        this.navCtrl.navigateBack("/places/tabs/offers");
        return;
      }
      this.placeSub = this.placesService
        .getPlace(paramMap.get("placeId"))
        .subscribe(place => {
          this.place = place;
          this.isBookable=place.userId!==this.authService.UserId;
        });
    });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

  onBookPlace() {
    this.actionSheetCtrl
      .create({
        header: "choose an action",
        buttons: [
          {
            text: "select date",
            handler: () => {
              this.openBookingModal("select");
            }
          },
          {
            text: "random date",
            handler: () => {
              this.openBookingModal("random");
            }
          },
          {
            text: "Cancel",
            role: "cancel"
          }
        ]
      })
      .then(sheetEl => {
        sheetEl.present();
      });
  }

  openBookingModal(mode: "select" | "random") {
    //console.log(mode);
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place, selectedMode: mode }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === "confirm") {
          this.loadingCtrl
            .create({
              message: "Booking your place..."
            })
            .then(loadingEl => {
              const data = resultData.data.bookingData;
              loadingEl.present();
              this.bookingService.addBooking(
                this.place.id,
                this.place.title,
                this.place.imageUrl,
                data.firstName,
                data.lastName,
                data.startDate,
                data.endDate,
                data.guestNumber
              ).subscribe(()=>{
                loadingEl.dismiss();
                this.router.navigateByUrl("/bookings");
              })
            });
        }
      });
  }
}
