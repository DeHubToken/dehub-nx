import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TeamMember } from '../landing-team-member/landing-team-member.component';

@Component({
  selector: 'dhb-landing-team',
  template: `
    <div class="grid">
      <div *ngFor="let teamMember of teamMembers" class="col-12 md:col-3">
        <dhb-landing-team-member
          [teamMember]="teamMember"
        ></dhb-landing-team-member>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingTeamComponent implements OnInit {
  teamMembers: TeamMember[] = [
    {
      name: 'Malik Jan',
      title: 'CEO',
      social: [
        { icon: 'pi pi-user', link: 'https://twitter.com/Malikjan_t' },
        {
          icon: 'pi pi-user',
          link: 'https://www.linkedin.com/in/malik-jan-turkistani-842b4b195/',
        },
      ],
      avatar: 'malik',
    },
    {
      name: 'Ahmad',
      title: 'CEO',
      social: [
        { icon: 'pi pi-user', link: 'https://twitter.com/Malikjan_t' },
        {
          icon: 'pi pi-user',
          link: 'https://www.linkedin.com/in/malik-jan-turkistani-842b4b195/',
        },
      ],
      avatar: 'ahmad',
    },
    {
      name: 'Rani',
      title: 'CEO',
      social: [
        { icon: 'pi pi-user', link: 'https://twitter.com/Malikjan_t' },
        {
          icon: 'pi pi-user',
          link: 'https://www.linkedin.com/in/malik-jan-turkistani-842b4b195/',
        },
      ],
      avatar: 'rani',
    },
    {
      name: 'Indi',
      title: 'CEO',
      social: [
        { icon: 'pi pi-user', link: 'https://twitter.com/Malikjan_t' },
        {
          icon: 'pi pi-user',
          link: 'https://www.linkedin.com/in/malik-jan-turkistani-842b4b195/',
        },
      ],
      avatar: 'indi',
    },
    {
      name: 'Aleksandr',
      title: 'CEO',
      social: [
        { icon: 'pi pi-user', link: 'https://twitter.com/Malikjan_t' },
        {
          icon: 'pi pi-user',
          link: 'https://www.linkedin.com/in/malik-jan-turkistani-842b4b195/',
        },
      ],
      avatar: 'aleksandr',
    },
    {
      name: 'Diana',
      title: 'CEO',
      social: [
        { icon: 'pi pi-user', link: 'https://twitter.com/Malikjan_t' },
        {
          icon: 'pi pi-user',
          link: 'https://www.linkedin.com/in/malik-jan-turkistani-842b4b195/',
        },
      ],
      avatar: 'diana',
    },
    {
      name: 'Mike',
      title: 'CEO',
      social: [
        { icon: 'pi pi-user', link: 'https://twitter.com/Malikjan_t' },
        {
          icon: 'pi pi-user',
          link: 'https://www.linkedin.com/in/malik-jan-turkistani-842b4b195/',
        },
      ],
      avatar: 'mike',
    },
    {
      name: 'Jasmine',
      title: 'CEO',
      social: [
        { icon: 'pi pi-user', link: 'https://twitter.com/Malikjan_t' },
        {
          icon: 'pi pi-user',
          link: 'https://www.linkedin.com/in/malik-jan-turkistani-842b4b195/',
        },
      ],
      avatar: 'jasmine',
    },
    {
      name: 'Jamie',
      title: 'CEO',
      social: [
        { icon: 'pi pi-user', link: 'https://twitter.com/Malikjan_t' },
        {
          icon: 'pi pi-user',
          link: 'https://www.linkedin.com/in/malik-jan-turkistani-842b4b195/',
        },
      ],
      avatar: 'jamie',
    },
    {
      name: 'Angel',
      title: 'CEO',
      social: [
        { icon: 'pi pi-user', link: 'https://twitter.com/Malikjan_t' },
        {
          icon: 'pi pi-user',
          link: 'https://www.linkedin.com/in/malik-jan-turkistani-842b4b195/',
        },
      ],
      avatar: 'angel',
    },
    {
      name: 'Sumit',
      title: 'CEO',
      social: [
        { icon: 'pi pi-user', link: 'https://twitter.com/Malikjan_t' },
        {
          icon: 'pi pi-user',
          link: 'https://www.linkedin.com/in/malik-jan-turkistani-842b4b195/',
        },
      ],
      avatar: 'sumit',
    },
    {
      name: 'Martyusha',
      title: 'CEO',
      social: [
        { icon: 'pi pi-user', link: 'https://twitter.com/Malikjan_t' },
        {
          icon: 'pi pi-user',
          link: 'https://www.linkedin.com/in/malik-jan-turkistani-842b4b195/',
        },
      ],
      avatar: 'martyusha',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
