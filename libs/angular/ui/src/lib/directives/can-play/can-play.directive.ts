import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { DehubMoralisService } from '@dehub/angular/moralis';
import { Subject, Subscription, tap, withLatestFrom } from 'rxjs';

@Directive({
  selector: '[dhbCanPlay]',
})
export class CanPlayDirective implements OnInit, OnDestroy {
  div = this.renderer.createElement('div');
  private readonly clicks$ = new Subject<Event>();
  private canPlay$ = this.clicks$.pipe(
    withLatestFrom(this.dehubMoralis.canPlay$),
    tap(([event, canPlay]) => {
      if (!canPlay) {
        event.preventDefault();
        this.renderer.removeClass(this.div, 'opacity-0');
        this.router.navigate(['/stream/access-wall']);
        setTimeout(() => {
          this.renderer.addClass(this.div, 'opacity-0');
        }, 3000);
      }
    })
  );
  private sub: Subscription;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private dehubMoralis: DehubMoralisService,
    private router: Router
  ) {
    this.sub = this.canPlay$.subscribe();
  }

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
    this.clicks$.next(event);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
