import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

export const DefaultTagList = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export type AutoContentIdOptions = {
  /**
   * The tags to apply the directive to.
   */
  tags?: string[];

  /**
   * A function that can be used to customize the id generation from text content.
   */
  customTextIdFn?: (text: string) => string;

  /**
   * A function that can be used to customize the id generation a given element.
   */
  customIdGeneratorFn?: (element: HTMLElement) => string;
};

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
export class AutoContentIdDirective implements AfterContentInit {
  @Input() autoContentIdOptions: AutoContentIdOptions = {
    tags: DefaultTagList,
  };

  constructor(private el: ElementRef) {}

  /** Helper method to get the elements to apply the directive to. */
  private _getElements() {
    const { tags } = this.autoContentIdOptions;

    if (!tags || tags.length === 0) {
      return this.el.nativeElement.querySelectorAll(DefaultTagList);
    }

    return this.el.nativeElement.querySelectorAll(tags);
  }

  /** Helper method to generate an id from text content. */
  private _defaultTextIdFn(text: string) {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const cleanId = id.replace(/^\-|\-$/g, '');
    return cleanId;
  }

  ngAfterContentInit() {
    const elements = this._getElements();

    elements.forEach((element: HTMLElement) => {
      const currentId = element.getAttribute('id');
      if (!currentId) {
        let id;
        if (this.autoContentIdOptions.customIdGeneratorFn) {
          id = this.autoContentIdOptions.customIdGeneratorFn(element);
        } else {
          const text = element.textContent;

          if (text === null) {
            return;
          }

          if (this.autoContentIdOptions.customTextIdFn) {
            id = this.autoContentIdOptions.customTextIdFn(text);
          } else {
            id = this._defaultTextIdFn(text);
          }
        }

        element.setAttribute('id', id);
      }
    });
  }
}
