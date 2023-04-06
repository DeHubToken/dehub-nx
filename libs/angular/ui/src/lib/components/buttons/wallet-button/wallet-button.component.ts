import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgStyle } from '@angular/common';

@Component({
  selector: 'dhb-wallet-button',
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
  standalone: true,
  imports: [NgFor, NgStyle],
})
export class WalletButtonComponent implements OnInit {
  @Input() label?: string;
  @Input() imageSources?: string[];

  constructor() {}

  ngOnInit() {}
}
