import { Component, OnInit, inject, signal, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject, Subscription, debounceTime, tap, catchError, of, switchMap } from 'rxjs';
import { ButtonComponent } from '../../../shared/components/button.component';
import { CardComponent } from '../../../shared/components/card.component';
import { EventService } from '../../../core/services/event.service';
import { TemplateService } from '../../../core/services/template.service';
import { EventResponse } from '../../../core/models/event.model';
import { Template } from '../../../core/models/template.model';

export type EditTab = 'details' | 'design' | 'hero' | 'post-event' | 'actions';

@Component({
  selector: 'app-edit-event-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, CardComponent, RouterLink],
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.css']
})
export default class EditEventPage implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly eventService = inject(EventService);
  private readonly templateService = inject(TemplateService);

  eventSlug = signal<string>('');
  eventData = signal<EventResponse | null>(null);
  templates = signal<Template[]>([]);

  activeTab = signal<EditTab>('details');

  // Save state: 'saved' | 'saving' | 'unsaved' | 'error'
  saveState = signal<'saved' | 'saving' | 'unsaved' | 'error'>('saved');
  errorMessage = signal<string | null>(null);
  isUploading = signal(false);

  editorForm: FormGroup;
  private formChangeSub?: Subscription;

  // We use a Subject to push form values and debounce them before saving
  private autoSaveSubject = new Subject<any>();

  readonly tabs: { id: EditTab; label: string }[] = [
    { id: 'details', label: 'Details' },
    { id: 'design', label: 'Design' },
    { id: 'hero', label: 'Hero' },
    { id: 'post-event', label: 'Post-Event' },
    { id: 'actions', label: 'Actions' }
  ];

  constructor() {
    this.editorForm = this.fb.group({
      coupleNames: ['', Validators.required],
      name: ['', Validators.required],
      eventDate: ['', Validators.required],
      venueName: ['', Validators.required],
      venueAddress: ['', Validators.required],
      templateId: ['', Validators.required],
      primaryColor: ['#000000', Validators.required],
      secondaryColor: ['#ffffff', Validators.required],
      fontFamily: ['Inter', Validators.required],
      heroImageUrl: [''],
      thankYouMessage: [''],
      photoGalleryUrl: ['']
    });

    // Auto-save logic
    this.autoSaveSubject.pipe(
      tap(() => this.saveState.set('saving')),
      debounceTime(2000),
      switchMap(formValues => {
        const currentEvent = this.eventData();
        if (!currentEvent) return of(null);

        return this.eventService.updateEvent(this.eventSlug(), this.buildUpdateRequest(formValues)).pipe(
          catchError(err => {
            console.error('Auto-save failed', err);
            this.saveState.set('error');
            return of(null);
          })
        );
      })
    ).subscribe(result => {
      if (result) {
        this.saveState.set('saved');
      }
    });
  }

  ngOnInit() {
    this.loadTemplates();

    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.eventSlug.set(slug);
        this.loadEvent(slug);
      }
    });

    // Track form changes for UI unsaved state and triggering auto-save
    this.formChangeSub = this.editorForm.valueChanges.subscribe(values => {
      if (this.editorForm.valid) {
        this.saveState.set('unsaved');
        this.autoSaveSubject.next(values);
      }
    });
  }

  ngOnDestroy() {
    if (this.formChangeSub) {
      this.formChangeSub.unsubscribe();
    }
    this.autoSaveSubject.complete();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.hasUnsavedChanges()) {
      $event.returnValue = true;
    }
  }

  hasUnsavedChanges(): boolean {
    return this.saveState() === 'unsaved' || this.saveState() === 'saving';
  }

  setActiveTab(tab: EditTab) {
    this.activeTab.set(tab);
  }

  private buildUpdateRequest(formValues: any): any {
    return {
      ...formValues,
      eventDate: this.toIsoDateTime(formValues.eventDate)
    };
  }

  private toDateInputValue(isoDate: string | null | undefined): string {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private toIsoDateTime(dateInputValue: string | null | undefined): string {
    if (!dateInputValue) return '';
    const date = new Date(dateInputValue);
    if (isNaN(date.getTime())) return '';
    return date.toISOString();
  }

  forceSave(): import('rxjs').Observable<any> {
    const currentEvent = this.eventData();
    if (!currentEvent) return of(true);

    const formValues = this.editorForm.value;
    return this.eventService.updateEvent(this.eventSlug(), this.buildUpdateRequest(formValues)).pipe(
      tap(() => this.saveState.set('saved')),
      catchError(() => of(true))
    );
  }

  forceSaveClicked() {
    this.forceSave().subscribe();
  }

  publishEvent() {
    const event = this.eventData();
    if (!event) return;
    alert('Please go to the dashboard to publish your event.');
  }

  regenerateMicrosite() {
    const slug = this.eventSlug();
    if (!slug) return;
    this.eventService.regenerateMicrosite(slug).subscribe({
      next: () => alert('Microsite regenerated successfully.'),
      error: (err) => {
        console.error('Failed to regenerate microsite', err);
        alert('Failed to regenerate microsite.');
      }
    });
  }

  private loadTemplates() {
    this.templateService.getTemplates().subscribe({
      next: (data) => this.templates.set(data),
      error: (err) => console.error('Failed to load templates', err)
    });
  }

  private loadEvent(slug: string) {
    this.eventService.getEvent(slug).subscribe({
      next: (event) => {
        this.eventData.set(event);
        this.editorForm.patchValue({
          coupleNames: event.coupleNames || '',
          name: event.name || '',
          eventDate: this.toDateInputValue(event.eventDate),
          venueName: event.venueName || '',
          venueAddress: event.venueAddress || '',
          templateId: event.templateId || '',
          primaryColor: event.primaryColor || '#000000',
          secondaryColor: event.secondaryColor || '#ffffff',
          fontFamily: event.fontFamily || 'Inter',
          heroImageUrl: event.heroImageUrl || '',
          thankYouMessage: event.thankYouMessage || '',
          photoGalleryUrl: event.photoGalleryUrl || ''
        }, { emitEvent: false });
      },
      error: (err) => {
        this.errorMessage.set('Event not found or access denied.');
        console.error(err);
      }
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.uploadHeroImage(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.uploadHeroImage(file);
    }
  }

  private uploadHeroImage(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB');
      return;
    }
    if (!file.type.match(/image\/(jpeg|png)/)) {
      alert('Only JPG and PNG files are allowed.');
      return;
    }

    this.isUploading.set(true);
    this.eventService.uploadHeroImage(this.eventSlug(), file).subscribe({
      next: (response) => {
        this.editorForm.patchValue({ heroImageUrl: response.url });
        this.isUploading.set(false);
      },
      error: (err) => {
        console.error('Upload failed', err);
        alert('Failed to upload image.');
        this.isUploading.set(false);
      }
    });
  }

  // Helper for preview
  getPreviewStyles(): { [key: string]: string } {
    const values = this.editorForm.value;
    const styles: { [key: string]: string } = {
      '--primary-color': values.primaryColor,
      '--secondary-color': values.secondaryColor,
      'font-family': values.fontFamily,
    };
    return styles;
  }

  getSelectedTemplateName(): string {
    const id = this.editorForm.get('templateId')?.value;
    const tpl = this.templates().find(t => t.id === id);
    return tpl ? tpl.name : 'Default';
  }

  getPreviewHeroImage(): string {
    return this.editorForm.get('heroImageUrl')?.value;
  }

  getPreviewEventDate(): string {
    const dateInput = this.editorForm.get('eventDate')?.value;
    if (!dateInput) return 'Event Date';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return 'Event Date';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
