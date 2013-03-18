describe('Backbone.Timestamp', function() {
  var expect = chai.expect;

  var Book = Backbone.Model.extend({
    urlRoot: '/api/books',
    defaults: {
      title: 'Red Book',
      author: 'unknown'
    }
  });

  Backbone.Timestamp(Book);

  // Test stubs
  var currentDate = (new Date()).toJSON();
  Date.prototype.toJSON = function() { return currentDate; };
  Backbone.sync = function() {};

  describe('on save model', function() {
    var createdAt = '2013-03-07T08:54:31.170Z'
      , updatedAt = '2013-03-07T10:05:45.260Z';

    it('sets createdAt and updatedAt automatically', function() {
      var book = new Book();

      book.save({ title: 'War and Peace', updatedAt: updatedAt });
      expect(book.get('title')).equal('War and Peace');
      expect(book.get('author')).equal('unknown');
      expect(book.get('createdAt')).equal(currentDate);
      expect(book.get('updatedAt')).equal(updatedAt);
    });

    it('updates only not changed attributes', function() {
      var book = new Book({ id: 1, content: 'Romeo & Juliet', createdAt: createdAt });

      book.save();
      expect(book.get('createdAt')).equal(createdAt);
      expect(book.get('updatedAt')).equal(currentDate);

      book.save({ updatedAt: updatedAt });
      expect(book.get('createdAt')).equal(createdAt);
      expect(book.get('updatedAt')).equal(updatedAt);
    });
  });

  describe('on create model to collection', function() {
    var Library = Backbone.Collection.extend({
      model: Book,
      url: 'api/library'
    });

    it('sets necessary attributes', function() {
      var library   = new Library()
        , createdAt = '2013-03-07T08:54:31.170Z'
        , book      = library.create({ title: 'Moby dick', author: 'Herman Melville', createdAt: createdAt });

      expect(book.get('createdAt')).equal(createdAt);
      expect(book.get('updatedAt')).equal(currentDate);
    });
  });

  describe('options', function() {
    it('allows to change names of attributes', function() {
      var Car = Backbone.Model.extend({});
      Backbone.Timestamp(Car, { updatedAt: 'updated', createdAt: 'created_at' });

      var car = new Car({ name: 'bmw x1' });
      car.save();

      expect(car.get('name')).equal('bmw x1');
      expect(Object.keys(car.attributes)).length(3);
      expect(car.get('created_at')).equal(currentDate);
      expect(car.get('updated')).equal(currentDate);
    });
  });
});
