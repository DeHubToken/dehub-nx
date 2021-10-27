import {
  animate,
  animation,
  group,
  keyframes,
  query,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';

const moveFromBottomFade = animation(
  [
    query(
      ':enter, :leave',
      style({
        position: 'fixed',
        overflow: 'hidden',
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
      }),
      { optional: true }
    ),
    group([
      query(
        ':enter',
        [
          animate(
            '{{enterTiming}}s {{enterDelay}}s ease',
            keyframes([
              style({
                transform: 'translateY(100%)',
                offset: 0,
                'z-index': '9999',
              }),
              style({ transform: 'translateY(0%)', offset: 1 }),
            ])
          ),
        ],
        { optional: true }
      ),

      query(
        ':leave',
        [
          animate(
            '{{leaveTiming}}s {{leaveDelay}}s ease',
            keyframes([
              style({ opacity: '1', offset: 0 }),
              style({ opacity: '0.3', offset: 1 }),
            ])
          ),
        ],
        { optional: true }
      ),
    ]),
  ],
  {
    params: {
      enterTiming: '.6',
      leaveTiming: '0.7',
      enterDelay: '0',
      leaveDelay: '0',
    },
  }
);

/**
 * Courtesy for ngx-router-animations
 * Source: https://github.com/vugar005/ngx-router-animations#demo
 */
export const routeAnimation = trigger('routeAnimations', [
  transition('* => *', useAnimation(moveFromBottomFade)),
]);
