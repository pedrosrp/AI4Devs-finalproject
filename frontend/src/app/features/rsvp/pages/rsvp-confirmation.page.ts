import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RsvpConfirmationResponse, RsvpInfoResponse } from '../../../core/services/rsvp.service';
import { ButtonComponent } from '../../../shared/components/button.component';
import { CardComponent } from '../../../shared/components/card.component';

@Component({
  selector: 'app-rsvp-confirmation-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent],
  template: `
    <div class="min-h-screen bg-bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div *ngIf="!confirmation" class="text-center">
          <p class="text-text-muted font-body">Loading confirmation details...</p>
        </div>

        <app-card *ngIf="confirmation" customClass="p-8 text-center bg-card-bg shadow-md">
          <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-success-bg mb-4">
            <svg class="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold font-heading text-text-primary">Thank You, {{ confirmation.guestName }}!</h2>
          <p class="mt-2 text-lg font-body text-text-secondary">Your RSVP for <strong>{{ confirmation.eventName }}</strong> has been received.</p>
          
          <div class="mt-6 border-t border-border-light pt-6">
            <h3 class="text-lg font-medium font-body text-text-primary">Your Response:</h3>
            <p class="mt-2 text-2xl font-bold font-heading text-primary">
              <span *ngIf="confirmation.attendance === 'Yes'">Joyfully Accepts</span>
              <span *ngIf="confirmation.attendance === 'No'">Regretfully Declines</span>
              <span *ngIf="confirmation.attendance === 'Maybe'">Not Sure Yet</span>
            </p>
          </div>

          <div class="mt-8 space-y-4">
            <app-button variant="primary" customClass="w-full" (onClick)="addToCalendar()">
              Add to Calendar
            </app-button>
            <app-button variant="secondary" customClass="w-full" (onClick)="getDirections()">
              Get Directions
            </app-button>
          </div>
        </app-card>
      </div>
    </div>
  `
})
export class RsvpConfirmationPageComponent implements OnInit {
  confirmation: RsvpConfirmationResponse | null = null;
  eventInfo: RsvpInfoResponse | null = null;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state) {
      if (nav.extras.state['confirmation']) {
        this.confirmation = nav.extras.state['confirmation'];
      }
      if (nav.extras.state['eventInfo']) {
        this.eventInfo = nav.extras.state['eventInfo'];
      }
    }
  }

  ngOnInit() {
    if (!this.confirmation) {
      // In a real app we might fetch it from the backend using the token if state is lost on refresh
      // For MVP, we can just show a generic success message or redirect back to form
    }
  }

  addToCalendar() {
    if (!this.confirmation || !this.eventInfo) return;
    
    const title = encodeURIComponent(`Wedding: ${this.eventInfo.coupleNames}`);
    
    const startDate = new Date(this.eventInfo.eventDate);
    // Add 4 hours for the event duration
    const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); 

    const formatGoogleDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const dates = `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`;
    
    const details = encodeURIComponent(`RSVP completed for ${this.eventInfo.eventName}`);
    const location = encodeURIComponent(`${this.eventInfo.venueName}, ${this.eventInfo.venueAddress}`);
    
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  }

  getDirections() {
    if (!this.eventInfo?.venueAddress) return;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(this.eventInfo.venueAddress)}`;
    window.open(url, '_blank');
  }
}
