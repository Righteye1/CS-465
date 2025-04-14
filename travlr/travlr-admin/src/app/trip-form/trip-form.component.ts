import { Component } from '@angular/core';
import { TripDataService, Trip } from '../trip-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TripFormComponent {
  newTrip: Trip = {
    title: '',
    price: 0,
    description: '',
    location: '',
    _id: ''
  };

  constructor(private tripService: TripDataService) { }

  addTrip() {
    this.tripService.addTrip(this.newTrip).subscribe(() => {
      alert('Trip added!');
    });
  }
}
