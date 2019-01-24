import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPassword]'
})
export class AppPasswordDirective {
  private _shown = false;
constructor(private el: ElementRef) {
    this.setup();
  }
toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.innerHTML =  "<button class='fa fa-2x btn text-white' style='background-color:#5cb85c'>&#xf070;</button>";
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.innerHTML =  "<button class='fa fa-2x btn text-white' style='background-color:#5cb85c'>&#xf06e;</button>";
    }
  }
  setup() {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.innerHTML = "<button class='fa fa-2x btn text-white' style='background-color:#5cb85c'>&#xf06e;</button>";
    span.addEventListener('click', (event) => {
      this.toggle(span);
    });
    parent.appendChild(span);
  }
}