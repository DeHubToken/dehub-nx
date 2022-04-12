import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// Iframe embed for now, until we establish our go to platform.
// Then we can implement reactive forms instead.
@Component({
  template: `
    <iframe
      src="https://cdn.forms-content.sg-form.com/3a1d06d6-b4e6-11ec-8569-de313ea3f353"
      loading="lazy"
      title="Newsletter Subscribe Form"
      width="100%"
      height="100%"
      class="border-none"
    >
    </iframe>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailingListFormComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
