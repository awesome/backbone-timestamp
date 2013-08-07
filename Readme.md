[![Build Status](https://secure.travis-ci.org/ask11/backbone-timestamp.png?branch=master)](https://travis-ci.org/ask11/backbone-timestamp)

# Backbone.Timestamp

  Simple [Backbone](http://documentcloud.github.io/backbone/) plugin, which generates timestamps attributes automatically.

## Installation

    $ bower install backbone-timestamp --save

## Example

```js
var Book = Backbone.Model.extend({
  urlRoot: '/api/books'
});

// apply plugin to model
Backbone.Timestamp(Book);

var book = new Book({ id: 1, content: 'Romeo & Juliet' });
book.get('createdAt'); // Date()
book.get('updatedAt'); // Date()
```

## API

### Backbone.Timestamp(Model, [options])

  Patch Model with timestamp functionlity. With options you can specify custom names of `updatedAt` and `createdAt` date attributes.

```js
var Car = Backbone.Model.extend({});
Backbone.Timestamp(Car, { updatedAt: 'updated_at', createdAt: 'created_at' });
```

## Development

  - `npm install` to install development dependencies: bower & testem;
  - `npm test` to ensure that all tests pass;
  - `npm start` to run test watcher on [localhost:7357](http://localhost:7357/).

## Licence

  Aleksey Kulikov, [MIT](http://ask11.mit-license.org/)
