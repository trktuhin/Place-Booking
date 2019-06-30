import { Component, OnInit, OnDestroy } from "@angular/core";
import { PlacesService } from "../places.service";
import { Place } from "../place.model";
import { SegmentChangeEventDetail } from "@ionic/core";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.page.html",
  styleUrls: ["./discover.page.scss"]
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  allPlaces: Place[];
  releventPlaces: Place[];

  private placeSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.placeSub = this.placesService.places.subscribe(places => {
      this.allPlaces = places;
      this.releventPlaces = this.allPlaces;
      this.loadedPlaces = this.releventPlaces.slice(1);
    });
  }
  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === "all") {
      this.releventPlaces = this.allPlaces;
      this.loadedPlaces = this.releventPlaces.slice(1);
    } else {
      this.releventPlaces = this.allPlaces.filter(
        place => place.userId !== this.authService.UserId
      );
      this.loadedPlaces = this.releventPlaces.slice(1);
    }
  }
}
