import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[dhbComingSoon]',
})
export class ComingSoonDirective implements OnInit {
  div = this.renderer.createElement('div');

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    const span = this.renderer.createElement('span');
    const text = this.renderer.createText('Coming Soon!');

    this.renderer.appendChild(span, text);
    this.renderer.appendChild(this.div, span);
    this.renderer.appendChild(this.el.nativeElement, this.div);
    this.renderer.addClass(this.div, 'coming-soon');
    this.renderer.addClass(this.div, 'opacity-0');
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    event.preventDefault();
    this.renderer.removeClass(this.div, 'opacity-0');
    setTimeout(() => {
      this.renderer.addClass(this.div, 'opacity-0');
    }, 3000);
  }
}
