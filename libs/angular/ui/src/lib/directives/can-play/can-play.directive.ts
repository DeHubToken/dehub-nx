import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { DehubMoralisService } from '@dehub/angular/moralis';
import { WINDOW } from '@ng-web-apis/common';
import { first } from 'rxjs/operators';

@Directive({
  selector: '[dhbCanPlay]',
})
export class CanPlayDirective implements OnInit {
  @Input() dhbCanPlay?: string;

  div = this.renderer.createElement('div');

  constructor(
    @Inject(WINDOW) private readonly windowRef: Window,
    private renderer: Renderer2,
    private el: ElementRef,
    private dehubMoralis: DehubMoralisService,
    private router: Router
  ) {}

  ngOnInit() {
    const span = this.renderer.createElement('span');
    const text = this.renderer.createText('Please, get access first!');

    this.renderer.appendChild(span, text);
    this.renderer.appendChild(this.div, span);
    this.renderer.appendChild(this.el.nativeElement, this.div);
    this.renderer.addClass(this.div, 'access-cover');
    this.renderer.addClass(this.div, 'opacity-0');
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    event.preventDefault();
    this.dehubMoralis.canPlay$.pipe(first()).subscribe(canPlay => {
      if (canPlay) {
        this.windowRef.open(this.dhbCanPlay, '_blank', 'noopener,noreferrer');
      } else {
        this.renderer.removeClass(this.div, 'opacity-0');
        this.router.navigate(['/stream/access-wall']);
        setTimeout(() => {
          this.renderer.addClass(this.div, 'opacity-0');
        }, 3000);
      }
    });
  }
}
