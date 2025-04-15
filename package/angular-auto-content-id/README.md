# Angular Auto Content Id

A directive for quickly generating ids for headings based on text content.
This makes it easier to link to content by hash:

```html
<!-- Initial heading -->
<h1>Sample Heading!</h1>

<!-- After using [autoContentId] -->
<h1 id="sample-heading">Sample Heading!</h1>
```

Then, you can navigate to `/page#sample-heading`.

## Installation

```sh
npm install angular-auto-content-id --save
```

## Usage

First add `AutoContentIdDirective` to your component:

```ts
@Component({
  imports: [AutoContentIdDirective],
})
export class Component {}
```

Then, include it as an attribute on any element and it will generate
ids for that element's children.

```html
<article autoContentId>
  <h1>Angular Auto Content Id</h1>
  <h2>Demo</h2>
</article>
```
