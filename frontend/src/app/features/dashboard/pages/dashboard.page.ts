import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../core/services/event.service';
import { EventResponse } from '../../../core/models/event.model';
import { PublishDialogComponent } from '../components/publish-dialog/publish-dialog';
import { ButtonComponent } from '../../../shared/components/button.component';
import { CardComponent } from '../../../shared/components/card.component';
import { BadgeComponent } from '../../../shared/components/badge.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state.component';

@Component({
  standalone: true,
  imports: [RouterLink, CommonModule, PublishDialogComponent, ButtonComponent, CardComponent, BadgeComponent, EmptyStateComponent],
  template: `
    <div class="min-h-screen bg-bg-cream p-6 md:p-8">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h2 class="font-heading text-4xl text-text-primary">Your Events</h2>
          <app-button routerLink="/events/new" variant="primary" icon="fa-solid fa-plus">Create New Event</app-button>
        </div>
        
        @if (loading()) {
          <div class="flex justify-center items-center h-64">
            <p class="text-text-secondary font-medium">Loading your events...</p>
          </div>
        } @else if (events().length === 0) {
          <app-empty-state 
            title="You don't have any events yet." 
            description="Create your first event to start managing RSVPs, sending invitations, and collecting guest information." 
            [icon]="true">
            <i icon class="fa-regular fa-calendar-plus text-4xl text-text-secondary"></i>
            <app-button actions routerLink="/events/new" variant="primary">Create your first Event</app-button>
          </app-empty-state>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (event of events(); track event.slug) {
              <app-card customClass="flex flex-col h-full">
                <div class="h-40 bg-cover bg-center"
                     [style.background-image]="event.heroImageUrl ? 'url(' + event.heroImageUrl + ')' : 'none'"
                     [ngClass]="{'bg-bg-surface': !event.heroImageUrl}">
                </div>
                <div class="p-6 flex-1 flex flex-col">
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="font-heading text-2xl text-text-primary m-0">{{ event.coupleNames || event.name }}</h3>
                    <app-badge [status]="event.status === 'Published' ? 'published' : 'draft'">{{ event.status }}</app-badge>
                  </div>
                  <p class="text-text-secondary text-sm mb-4">{{ event.eventDate | date }}</p>
                  
                  <p class="text-text-secondary text-sm mb-6 flex-1">
                    {{ event.guestCount || 0 }} guests &middot; {{ (event.confirmedRsvps || 0) + (event.pendingRsvps || 0) + (event.declinedRsvps || 0) }} RSVPs
                  </p>
                  
                  <div class="mt-auto grid grid-cols-2 gap-3">
                    <app-button [routerLink]="['/events', event.slug, 'edit']" variant="primary" icon="fa-solid fa-pencil">Edit</app-button>
                    <app-button [routerLink]="['/events', event.slug, 'guests']" variant="secondary">Guests</app-button>
                    <app-button [routerLink]="['/events', event.slug, 'dashboard']" variant="secondary">Stats</app-button>
                    
                    @if (event.status === 'Published' && event.micrositeUrl) {
                      <app-button variant="secondary" (onClick)="openMicrosite(event.micrositeUrl)">View Site</app-button>
                      <app-button variant="secondary" (onClick)="regenerateMicrosite(event)">Regen Site</app-button>
                    }
                    @if (event.status === 'Draft') {
                      <app-button variant="primary" icon="fa-solid fa-rocket" (onClick)="openPublishDialog(event)">Publish</app-button>
                    }
                  </div>
                </div>
              </app-card>
            }
          </div>
        }

        <app-publish-dialog 
          *ngIf="selectedEventToPublish"
          [eventSlug]="selectedEventToPublish.slug"
          (close)="selectedEventToPublish = null"
          (published)="onPublished()">
        </app-publish-dialog>
      </div>
    </div>
  `
})
export default class DashboardPage implements OnInit {
  private readonly eventService = inject(EventService);
  
  events = signal<EventResponse[]>([]);
  loading = signal(true);
  selectedEventToPublish: EventResponse | null = null;

  ngOnInit() {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load events', err);
        this.loading.set(false);
      }
    });
  }

  openPublishDialog(event: EventResponse) {
    this.selectedEventToPublish = event;
  }

  onPublished() {
    this.selectedEventToPublish = null;
    this.ngOnInit();
  }

  regenerateMicrosite(event: EventResponse) {
    this.eventService.regenerateMicrosite(event.slug).subscribe({
      next: () => {
        alert('Microsite regeneration queued. It may take a few seconds.');
      },
      error: (err) => {
        console.error('Failed to regenerate microsite', err);
        alert('Failed to regenerate microsite. Please try again.');
      }
    });
  }

  openMicrosite(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

