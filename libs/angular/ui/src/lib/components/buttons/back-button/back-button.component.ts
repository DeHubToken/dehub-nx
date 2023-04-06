import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'dhb-back-button',
  template: `
    <p-button
      label="Back"
      icon="fas fa-long-arrow-left"
      styleClass="p-button-link p-button-lg mb-2"
    >
    </p-button>
  `,
  standalone: true,
  imports: [ButtonModule],
})
export class BackButtonComponent implements OnInit {
  ngOnInit() {}
}
