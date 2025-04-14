import { Component, Input } from '@angular/core';
import { Trip, TripDataService } from '../trip-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() trip!: Trip;
  editing: boolean = false;
  editedTrip: Trip = { ...this.trip };

  constructor(private tripService: TripDataService) { }

  enableEdit() {
    this.editing = true;
    this.editedTrip = { ...this.trip };
  }

  saveEdit() {
    if (!this.trip._id) return;
    this.tripService.updateTrip(this.trip._id, this.editedTrip).subscribe(updated => {
      Object.assign(this.trip, updated);
      this.editing = false;
    });
  }

  deleteTrip() {
    if (!this.trip._id) return;
    this.tripService.deleteTrip(this.trip._id).subscribe(() => {
      alert('Trip deleted (refresh to see changes)');
    });
  }
}
