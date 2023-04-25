import { NgFor, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dhb-wallet-button',
  standalone: true,
  imports: [
    // Angular
    NgFor,
    NgStyle,
  ],
  template: `
    <button class="p-button flex justify-content-between text-500">
      <!-- Label -->
      <div>{{ label }}</div>

      <!-- Icons -->
      <div class="flex flex-row align-items-center">
        <img
          *ngFor="let imageSource of imageSources"
          [alt]="label"
          [src]="imageSource"
          [ngStyle]="{
            width: '32px',
            height: '16px',
            paddingRight: '10px'
          }"
        />
      </div>
    </button>
  `,
})
export class WalletButtonComponent implements OnInit {
  @Input() label?: string;
  @Input() imageSources?: string[];

  constructor() {}

  ngOnInit() {}
}
