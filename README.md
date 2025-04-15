# Angular Auto Id Directive

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

# Development

## Testing

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
# Testing for angular-auto-content-id package:
ng test package

# Testing for demo:
ng test demo
```

## Development server

To start a local development server, run:

```bash
npm start
```

This will automatically compile the package and link it to demo before serving demo.

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files, but you will need to
restart the server if you make changes to the package code.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.
