import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../../core/services/payment.service';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

@Component({
  selector: 'app-publish-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publish-dialog.html',
  styleUrls: ['./publish-dialog.scss']
})
export class PublishDialogComponent implements OnInit, OnDestroy {
  @Input() eventSlug!: string;
  @Output() close = new EventEmitter<void>();
  @Output() published = new EventEmitter<void>();

  @ViewChild('paymentElement') paymentElementRef!: ElementRef;

  selectedTier: number | null = null;
  loading = false;
  processing = false;
  error: string | null = null;
  clientSecret: string | null = null;

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  cardElement: StripeCardElement | null = null;

  constructor(
    private paymentService: PaymentService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.paymentService.getConfig().subscribe({
      next: async (config) => {
        this.stripe = await loadStripe(config.publishableKey);
      },
      error: () => {
        this.error = 'Failed to load payment configuration.';
      }
    });
  }

  ngOnDestroy() {
    if (this.cardElement) {
      this.cardElement.destroy();
    }
  }

  selectTier(tier: number) {
    this.selectedTier = tier;
    this.fetchClientSecret();
  }

  fetchClientSecret() {
    if (this.selectedTier === null) return;
    this.loading = true;
    this.error = null;

    this.paymentService.publishEvent(this.eventSlug, this.selectedTier).subscribe({
      next: (res) => {
        this.clientSecret = res.clientSecret;
        this.loading = false;
        this.cdr.detectChanges();
        setTimeout(() => this.mountCardElement(), 0);
      },
      error: (err) => {
        this.error = err?.error?.error || 'Failed to initialize payment. Please try again.';
        this.loading = false;
      }
    });
  }

  mountCardElement() {
    if (!this.stripe || !this.clientSecret || !this.paymentElementRef) return;

    if (!this.elements) {
      this.elements = this.stripe.elements();
    }

    if (this.cardElement) {
      this.cardElement.destroy();
    }

    this.cardElement = this.elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#32325d',
          '::placeholder': { color: '#aab7c4' }
        },
        invalid: { color: '#fa755a' }
      }
    });

    this.cardElement.mount(this.paymentElementRef.nativeElement);
  }

  async submitPayment() {
    if (!this.stripe || !this.cardElement || !this.clientSecret) return;

    this.processing = true;
    this.error = null;

    const { error, paymentIntent } = await this.stripe.confirmCardPayment(this.clientSecret, {
      payment_method: {
        card: this.cardElement
      }
    });

    if (error) {
      this.error = error.message || 'Payment failed.';
      this.processing = false;
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      this.processing = false;
      this.published.emit();
    } else {
      this.error = 'Payment was not completed. Please try again.';
      this.processing = false;
    }
  }

  onClose() {
    this.close.emit();
  }
}
