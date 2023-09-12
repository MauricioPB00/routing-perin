import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[custom]',
})
export class CustomElement {
  constructor(private _elem: ElementRef, private _renderer: Renderer2) {}

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'F2') {
      event.preventDefault();
      console.log('Tecla F2 pressionada globalmente');
      window.open('https://www.google.com/', '_blank');
    }
    if (event.key === 'F3') {
        event.preventDefault();
        console.log('Tecla F3 pressionada globalmente');
        window.open('https://www.google.com/', '_blank');
      }
  }
}
