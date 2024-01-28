import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'dhb-back-button',
  standalone: true,
  imports: [
    // PrimeNG
    ButtonModule,
  ],
  template: `
    <p-button
      label="Back"
      icon="fas fa-long-arrow-left"
      styleClass="p-button-link p-button-lg mb-2"
    >
    </p-button>
  `,
})
export class BackButtonComponent implements OnInit {
  ngOnInit() {}
}
