import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[nmImageBlur]',
})
export class NmImageBlurDirective {
  @Input('nmImageBlur') set src(value: string) {
    setTimeout(() => {
      this.test(value);

    }, 2000);
  };

  constructor(private el: ElementRef<HTMLDivElement>) {
    // setTimeout(() => {
    //   this.test();
    // }, 100);
  }

  test(src: string) {
    if (!this.el.nativeElement.clientWidth || !this.el.nativeElement.clientHeight) {
      // this.el.nativeElement.src = 'undefined';
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 320;
    const context = canvas.getContext('2d');

    const base_image = new Image();
    base_image.width = 320;
    base_image.height = 320;
    base_image.src = src;

    console.log(base_image);


    base_image.onload = function () {
      context!.filter = 'blur(20px)';
      context!.drawImage(base_image, 0, 0);
    };

    this.el.nativeElement.replaceWith(canvas);
  }
}
