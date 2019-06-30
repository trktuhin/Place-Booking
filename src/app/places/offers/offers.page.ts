import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit,OnDestroy {
  loadedPlaces:Place[];
  private placeSub:Subscription;
  constructor(private placeService:PlacesService,private router:Router) { }

  ngOnInit() {
    this.placeSub=this.placeService.places.subscribe(places=>{
      this.loadedPlaces=places;
    })
  }

  ngOnDestroy() {
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }

  onEdit(placeId:string,slidingItem:IonItemSliding){
    slidingItem.close();
    this.router.navigate(['/places/tabs/offers/edit',placeId]);
    //console.log('Editing item ',placeId);
  }
}
