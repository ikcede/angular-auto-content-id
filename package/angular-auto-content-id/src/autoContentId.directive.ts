import { Directive, ElementRef, Input, OnInit } from '@angular/core';

export const DefaultTagList = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

/**
 * Directive that automatically sets ids on elements.
 *
 * Only elements with text content will be given an id generated
 * from the text content.
 */
@Directive({
  selector: '[autoContentId]',
  standalone: true,
})
export class AutoContentIdDirective implements OnInit {
  @Input() autoContentIdTags: string[] = DefaultTagList;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const elements = this.el.nativeElement.querySelectorAll(
      this.autoContentIdTags || []
    );
    elements.forEach((element: HTMLElement) => {
      const currentId = element.getAttribute('id');
      if (!currentId) {
        const text = element.textContent;
        if (text) {
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          const cleanId = id.replace(/^\-|\-$/g, '');
          element.setAttribute('id', cleanId);
        }
      }
    });
  }
}
