import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AutoContentIdDirective,
  AutoContentIdOptions,
} from './autoContentId.directive';

@Component({
  template: `
    <div autoContentId>
      <h1>Test Heading</h1>
      <h2>Special &#64;#$% Characters!</h2>
      <h3 id="existing-id">Existing ID</h3>
      <p>This is a paragraph</p>
    </div>
  `,
  standalone: true,
  imports: [AutoContentIdDirective],
})
class DefaultTestComponent {}

@Component({
  template: `
    <div autoContentId [autoContentIdOptions]="options">
      <h1>Test Heading</h1>
      <h2 id="existing-id">Test Heading</h2>
      <h3>Test Heading</h3>
    </div>
  `,
  standalone: true,
  imports: [AutoContentIdDirective],
})
class CustomTagsTestComponent {
  options: AutoContentIdOptions = {
    tags: ['h1', 'h2'],
  };
}

@Component({
  template: `
    <div autoContentId [autoContentIdOptions]="options">
      <h1>Test Heading</h1>
      <h2 id="existing-id">Test Heading</h2>
      <h3>Test Heading</h3>
    </div>
  `,
  standalone: true,
  imports: [AutoContentIdDirective],
})
class CustomTextIdFnTestComponent {
  options: AutoContentIdOptions = {
    customTextIdFn: () => 'custom-id',
  };
}

@Component({
  template: `
    <div autoContentId [autoContentIdOptions]="options">
      <h1>Test Heading</h1>
      <h2 id="existing-id">Test Heading</h2>
      <h3>Test Heading</h3>
    </div>
  `,
  standalone: true,
  imports: [AutoContentIdDirective],
})
class CustomIdGeneratorFnTestComponent {
  options: AutoContentIdOptions = {
    customIdGeneratorFn: () => 'custom-id',
  };
}

describe('AutoContentIdDirective', () => {
  describe('Default behavior', () => {
    let component: DefaultTestComponent;
    let fixture: ComponentFixture<DefaultTestComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DefaultTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DefaultTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set IDs on specified elements based on their text content', () => {
      const h1 = fixture.nativeElement.querySelector('h1');
      expect(h1.getAttribute('id')).toBe('test-heading');
    });

    it('should handle special characters in text content', () => {
      const h2 = fixture.nativeElement.querySelector('h2');
      expect(h2.getAttribute('id')).toBe('special-characters');
    });

    it('should not set IDs on elements not in the autoContentIdTags list', () => {
      const p = fixture.nativeElement.querySelector('p');
      expect(p.getAttribute('id')).toBeNull();
    });

    it('should not override existing IDs', () => {
      const h3 = fixture.nativeElement.querySelector('h3');
      expect(h3.getAttribute('id')).toBe('existing-id');
    });

    it('should ignore tags not in the tag list', () => {
      const p = fixture.nativeElement.querySelector('p');
      expect(p.getAttribute('id')).toBeNull();
    });
  });

  describe('with custom tags', () => {
    let component: CustomTagsTestComponent;
    let fixture: ComponentFixture<CustomTagsTestComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CustomTagsTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(CustomTagsTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set IDs on specified elements based on their text content', () => {
      const h1 = fixture.nativeElement.querySelector('h1');
      expect(h1.getAttribute('id')).toBe('test-heading');
    });

    it('should ignore tags not in the tag list', () => {
      const h3 = fixture.nativeElement.querySelector('h3');
      expect(h3.getAttribute('id')).toBeNull();
    });
  });

  describe('with custom text id function', () => {
    let component: CustomTextIdFnTestComponent;
    let fixture: ComponentFixture<CustomTextIdFnTestComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CustomTextIdFnTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(CustomTextIdFnTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should use the custom text id function', () => {
      const h1 = fixture.nativeElement.querySelector('h1');
      expect(h1.getAttribute('id')).toBe('custom-id');
    });
  });

  describe('with custom id generator function', () => {
    let component: CustomIdGeneratorFnTestComponent;
    let fixture: ComponentFixture<CustomIdGeneratorFnTestComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CustomIdGeneratorFnTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(CustomIdGeneratorFnTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should use the custom id generator function', () => {
      const h1 = fixture.nativeElement.querySelector('h1');
      expect(h1.getAttribute('id')).toBe('custom-id');
    });
  });
});
