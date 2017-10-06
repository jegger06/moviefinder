import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

export const moviesTrigger = trigger('movies', [
    transition(':enter', [
        animate('500ms ease-out', keyframes([
            style({
                opacity: 0,
                transform: 'translateY(100%)',
                offset: 0
            }),
            style({
                opacity: 0.4,
                transform: 'translateY(15%)',
                offset: 0.3
            }),
            style({
                opacity: 1,
                transform: 'translateY(0)',
                offset: 1
            })
        ]))
    ])
]);

export const searchTrigger = trigger('search', [
    transition(':enter', [
        animate('600ms ease-out', keyframes([
            style({
                opacity: 0,
                transform: 'translateY(-100%)',
                offset: 0
            }),
            style({
                opacity: 0.4,
                transform: 'translateY(15%)',
                offset: 0.9
            }),
            style({
                opacity: 1,
                transform: 'translateY(0)',
                offset: 1
            })
        ]))
    ]),
    transition(':leave', [
        style({
            transform: 'translateX(0)',
            opacity: 1
        }),
        animate('300ms ease-out', style({
            transform: 'translateX(100%)',
            opacity: 0
        }))
    ])
]);

export const movieListTrigger = trigger('movieList', [
    transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger(50, [
            animate('1s ease-in', keyframes([
                style({ opacity: 0, transform: 'translateY(-100px)', offset: 0}),
                style({opacity: 0.5, transform: 'translateY(25px)', offset: 0.3}),
                style({opacity: 1, transform: 'translateY(0)', offset: 1}),
            ]))
        ]), {optional: true}),

        query(':leave', stagger(50, [
            animate('1s ease-in', keyframes([
                style({ opacity: 1, transform: 'translateY(0)', offset: 0}),
                style({opacity: 0.5, transform: 'translateY(25px)', offset: 0.3}),
                style({opacity: 0, transform: 'translateY(-100px)', offset: 1}),
            ]))
        ]), {optional: true}),
    ])
]);

export const movieImageTrigger = trigger('movieImage', [
    transition(':enter', [
        style({
            opacity: 0,
            offset: 0
        }),
        animate('1000ms ease-out', style({
            opacity: 1,
            offset: 1
        }))
    ]),
    transition(':leave', [
        style({
            opacity: 1,
            offset: 0
        }),
        animate('100ms ease-out', style({
            opacity: 0,
            offset: 1
        }))
    ])
]);