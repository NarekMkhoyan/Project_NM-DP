import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";

export const btnClickAnimation = trigger("click", [
  state(
    "false",
    style({
      "background-color": "var(--nm-datepicker-background-color)",
    })
  ),
  state(
    "true",
    style({
      "background-color": "var(--nm-datepicker-background-color)",
    })
  ),
  transition("* <=> *", [
    animate(
      300,
      keyframes([style({ filter: "opacity(1)" }), style({ filter: "opacity(0.5)" }), style({ filter: "opacity(1)" })])
    ),
  ]),
]);

export const fadeInDownwardsAnimation = trigger("fadeInDownwards", [
  transition("void => *", [
    animate(
      200,
      keyframes([
        style({
          transform: "translateY(-20px)",
          opacity: 0,
        }),
        style({ transform: "translateY(0)", opacity: 1 }),
      ])
    ),
  ]),
]);

export const fadeInUpwardsAnimation = trigger("fadeInUpwards", [
  transition("* => void", [
    animate(
      200,
      keyframes([
        style({
          transform: "translateY(0)",
          opacity: 1,
        }),
        style({
          transform: "translateY(-20px)",
          opacity: 0,
        }),
      ])
    ),
  ]),
]);

export const labelSlideUpAnimation = trigger("labelSlideUp", [
  state("1", style({ transform: "translateY(0) scale(1)" })),
  state("0", style({ transform: "translateY(-20px) translateX(0px) scale(0.9)" })),
  transition("1 => 0", [
    animate(
      200,
      keyframes([
        style({
          transform: "translateY(0) scale(1)",
        }),
        style({
          transform: "translateY(-20px) translateX(0px) scale(0.9)",
        }),
      ])
    ),
  ]),
  transition("0 => 1", [
    animate(
      200,
      keyframes([
        style({
          transform: "translateY(-20px) translateX(0px) scale(0.9)",
        }),
        style({
          transform: "translateY(0) scale(1)",
        }),
      ])
    ),
  ]),
]);

export const boxShadowDropAnimation = trigger("boxShadowDrop", [
  state("*", style({ "box-shadow": "0 5px 15px 0px rgba(0, 0, 0, 0.35)" })),
  transition("* <=> void", [
    animate(
      200,
      keyframes([
        style({
          "box-shadow": "0 0 0 0 rgba(0, 0, 0, 0)",
        }),
        style({
          "box-shadow": "0 5px 15px 0px rgba(0, 0, 0, 0.35)",
        }),
      ])
    ),
  ]),
]);
