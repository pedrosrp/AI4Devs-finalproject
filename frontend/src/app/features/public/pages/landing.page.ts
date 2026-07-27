import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-[var(--color-bg-cream)] font-body text-[var(--color-text-primary)]">
      
      <!-- Header -->
      <nav class="flex items-center justify-between px-6 py-4 md:px-12 bg-white/50 backdrop-blur-sm fixed w-full top-0 z-50 border-b border-[var(--color-border-light)]">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white"></div>
          <span class="font-heading font-semibold text-xl tracking-tight">Aura</span>
        </div>
        <div class="hidden md:flex items-center space-x-8 text-sm font-medium text-[var(--color-text-secondary)]">
          <a href="#" class="hover:text-[var(--color-text-primary)] text-black font-semibold">Home</a>
          <a href="#" class="hover:text-[var(--color-text-primary)]">About</a>
          <a href="#" class="hover:text-[var(--color-text-primary)]">Features</a>
          <a href="#" class="hover:text-[var(--color-text-primary)]">Pricing</a>
        </div>
        <div class="flex items-center space-x-4">
          <a routerLink="/login" class="bg-[var(--color-bg-surface)] hover:bg-[#ebe1d3] text-[var(--color-text-primary)] px-5 py-2 rounded-full text-sm font-medium transition-colors">
            Log In
          </a>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="pt-32 pb-20 px-4 md:px-8 text-center max-w-4xl mx-auto flex flex-col items-center">
        <span class="bg-[var(--color-success-bg)] text-[var(--color-success)] px-4 py-1.5 rounded-full text-[10px] font-bold mb-8 uppercase tracking-widest mt-8">
          Wedding Planning Made Simple
        </span>
        <h1 class="text-4xl md:text-6xl font-heading font-medium leading-tight mb-6 text-[var(--color-text-primary)]">
          Plan Your Perfect Day with <br/> Aura
        </h1>
        <p class="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Aura Planning helps couples create beautiful invitations, manage guest lists, track RSVPs, and keep everyone informed — all in one elegant platform.
        </p>
        <div class="flex flex-col sm:flex-row items-center gap-4 justify-center w-full">
          <a routerLink="/login" class="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-8 py-3 rounded-md font-medium transition-colors flex items-center justify-center w-full sm:w-auto shadow-sm">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            Start Planning Free
          </a>
          <button class="bg-[#F0EEEB] hover:bg-[#E5E2DE] text-[var(--color-text-primary)] px-8 py-3 rounded-md font-medium transition-colors flex items-center justify-center w-full sm:w-auto">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            See How It Works
          </button>
        </div>
      </section>

      <!-- About Section -->
      <section class="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <h3 class="text-[var(--color-accent)] text-xs font-bold tracking-widest uppercase mb-6">Who We Are</h3>
            <h2 class="text-3xl md:text-5xl font-heading font-medium leading-[1.2] mb-8">
              We believe every celebration deserves to feel effortless
            </h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed mb-12">
              Aura Planning was born from a simple idea: wedding planning should be joyful, not overwhelming. We built a platform that combines elegant design with powerful tools — so you can focus on what matters most: sharing your special day with the people you love.
            </p>
            
            <div class="grid grid-cols-3 gap-6 border-t border-[var(--color-border-light)] pt-8">
              <div>
                <div class="text-2xl font-heading text-[var(--color-primary)] mb-1">10,000+</div>
                <div class="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">Events Planned</div>
              </div>
              <div>
                <div class="text-2xl font-heading text-[var(--color-primary)] mb-1">500,000+</div>
                <div class="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">Invitations Sent</div>
              </div>
              <div>
                <div class="text-2xl font-heading text-[var(--color-primary)] mb-1">98%</div>
                <div class="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">Happy Couples</div>
              </div>
            </div>
          </div>
          
          <div class="bg-[var(--color-bg-surface)] rounded-2xl aspect-square flex items-center justify-center relative overflow-hidden">
            <svg class="w-32 h-32 text-[#D3BDBB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-24 px-6 md:px-12 bg-white border-y border-[var(--color-border-light)] mt-12">
        <div class="max-w-7xl mx-auto text-center mb-16">
          <h3 class="text-[var(--color-accent)] text-xs font-bold tracking-widest uppercase mb-6">What We Do</h3>
          <h2 class="text-3xl md:text-5xl font-heading font-medium leading-tight max-w-2xl mx-auto text-[var(--color-text-primary)]">
            Everything you need to plan, invite, and delight your guests
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div class="p-8 rounded-2xl bg-[#FCFBF8] border border-[var(--color-border-light)] hover:shadow-md transition-shadow">
            <div class="w-10 h-10 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center mb-6">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <h4 class="text-xl font-heading mb-3">Beautiful Invitations</h4>
            <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed">Choose from elegant templates and customize colors, fonts, and photos to match your style.</p>
          </div>
          
          <div class="p-8 rounded-2xl bg-[#FCFBF8] border border-[var(--color-border-light)] hover:shadow-md transition-shadow">
            <div class="w-10 h-10 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center mb-6">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <h4 class="text-xl font-heading mb-3">Guest Management</h4>
            <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed">Import guests via CSV, organize by categories, and track invitations at a glance.</p>
          </div>

          <div class="p-8 rounded-2xl bg-[#FCFBF8] border border-[var(--color-border-light)] hover:shadow-md transition-shadow">
            <div class="w-10 h-10 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center mb-6">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h4 class="text-xl font-heading mb-3">RSVP Tracking</h4>
            <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed">Get real-time RSVP updates, dietary preferences, and transport needs in your dashboard.</p>
          </div>

          <div class="p-8 rounded-2xl bg-[#FCFBF8] border border-[var(--color-border-light)] hover:shadow-md transition-shadow">
            <div class="w-10 h-10 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center mb-6">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </div>
            <h4 class="text-xl font-heading mb-3">Live Updates</h4>
            <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed">Empower your accomplices to send instant WhatsApp updates during the event.</p>
          </div>

          <div class="p-8 rounded-2xl bg-[#FCFBF8] border border-[var(--color-border-light)] hover:shadow-md transition-shadow">
            <div class="w-10 h-10 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center mb-6">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <h4 class="text-xl font-heading mb-3">Venue & Maps</h4>
            <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed">Share venue details with embedded maps and one-tap directions for your guests.</p>
          </div>

          <div class="p-8 rounded-2xl bg-[#FCFBF8] border border-[var(--color-border-light)] hover:shadow-md transition-shadow">
            <div class="w-10 h-10 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center mb-6">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h4 class="text-xl font-heading mb-3">Privacy First</h4>
            <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed">Your data is encrypted and automatically deleted 30 days after your event.</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="bg-[var(--color-primary)] text-white py-24 px-6 text-center">
        <h2 class="text-3xl md:text-5xl font-heading font-medium mb-6">
          Ready to plan your dream event?
        </h2>
        <p class="mb-10 text-white/90 text-lg max-w-xl mx-auto">
          Create your first event for free. No credit card required.
        </p>
        <a routerLink="/login" class="bg-white text-[var(--color-primary)] hover:bg-gray-50 px-8 py-3 rounded-md font-medium transition-colors inline-flex items-center shadow-md">
          Get Started for Free
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </a>
      </section>

      <!-- Footer -->
      <footer class="bg-[var(--color-bg-dark)] text-[var(--color-text-inverse)] py-16 px-6 text-center">
        <div class="flex items-center justify-center space-x-2 mb-6">
          <div class="w-6 h-6 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center text-white"></div>
          <span class="font-heading font-semibold text-xl tracking-tight">Aura</span>
        </div>
        <p class="text-white/60 mb-6 text-sm">
          Elegant planning for unforgettable moments.
        </p>
        <p class="text-white/40 text-xs">
          © 2026 Aura Planning. All rights reserved.
        </p>
      </footer>

    </div>
  `
})
export default class LandingPage {}
