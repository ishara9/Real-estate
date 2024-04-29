import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from './../housing-location';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FilterPipe } from '../filter-pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, FormsModule, ReactiveFormsModule, FilterPipe],
  template: `
    <section>
      <!-- <form (submit)="filterResults(filter.value); $event.preventDefault()">
        <input type="text" placeholder="Filter by city" #filter/>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search!</button>
      </form> -->
    </section>
    <section>
      <input type="text" [(ngModel)]="searchText" placeholder="Search...">
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of housingLocationList| filter: searchText" [housingLocation]="housingLocation">
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];
  searchText: any;
  items: any;

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) this.filteredLocationList = this.housingLocationList;

    this.filteredLocationList = this.housingLocationList.filter((location: HousingLocation) => {
      return location?.city.toLowerCase().includes(text.toLowerCase());
    });
  }

}
