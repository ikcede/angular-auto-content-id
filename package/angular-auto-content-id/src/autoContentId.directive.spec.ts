import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoContentIdDirective } from './autoContentId.directive';

@Component({
  template: `
    <div autoContentId [autoContentIdTags]="tags">
      <h1>Test Heading</h1>
      <h2>Special &#64;#$% Characters!</h2>
      <h3 id="existing-id">Existing ID</h3>
      <p>This is a paragraph</p>
    </div>
  `,
  standalone: true,
  imports: [AutoContentIdDirective],
})
class TestComponent {
  tags = ['h1', 'h2', 'h3'];
}

describe('AutoContentIdDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
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
