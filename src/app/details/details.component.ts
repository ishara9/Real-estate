import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from './../housing-location';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo">
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="listing-heading">About Location</h2>
        <ul>
          <li>Units Available: {{housingLocation?.availableUnits}}</li>
          <li *ngIf="housingLocation?.wifi">Wifi</li>
          <li *ngIf="housingLocation?.laundry">Laundry</li>
        </ul>       
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here!</h2>
      </section>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">First Name</label>
        <input id="first-name" type="text" formControlName="firstName">

        <label for="last-name">Last Name</label>
        <input id="last-name" type="text" formControlName="lastName">

        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email">

        <button type="submit" class="primary">Apply now!</button>
      </form>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  })

  //event binding to submit form
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '')
  }

  constructor() {
    const housingLocationId = Number(this.route.snapshot.paramMap.get('id'));
    this.housingService.getHousingLocationById(housingLocationId).then((location: HousingLocation | undefined) => {
      this.housingLocation = location;
    });
  }

}
