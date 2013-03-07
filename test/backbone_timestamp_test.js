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

  var Library = Backbone.Collection.extend({
    model: Book,
    url: 'api/library'
  });

  var currentDate = new Date();
  sinon.stub(window, 'Date').returns(currentDate);
  sinon.stub(Backbone, 'sync');

  describe('on save model', function() {
    it('sets createdAt and updatedAt automatically', function() {
      var book      = new Book()
        , updatedAt = '2013-03-07T10:05:45.260Z';

      book.save({ title: 'War and Peace', updatedAt: updatedAt });

      expect(book.get('title')).equal('War and Peace');
      expect(book.get('author')).equal('unknown');

      expect(book.get('createdAt')).equal(currentDate);
      expect(book.get('updatedAt')).equal(updatedAt);
    });

    it('updates only not changed attributes', function() {
      var createdAt = '2013-03-07T08:54:31.170Z'
        , updatedAt = '2013-03-07T10:05:45.260Z'
        , book      = new Book({ id: 1, content: 'Romeo & Juliet', createdAt: createdAt });

      book.save();
      expect(book.get('createdAt')).equal(createdAt);
      expect(book.get('updatedAt')).equal(currentDate);

      book.save({ updatedAt: updatedAt });
      expect(book.get('createdAt')).equal(createdAt);
      expect(book.get('updatedAt')).equal(updatedAt);
    });
  });

  describe('on create model to collection', function() {
    it('sets necessary attributes', function() {
      var library   = new Library()
        , createdAt = '2013-03-07T08:54:31.170Z'
        , book      = library.create({ title: 'Moby dick', author: 'Herman Melville', createdAt: createdAt });

      expect(book.get('createdAt')).equal(createdAt);
      expect(book.get('updatedAt')).equal(currentDate);
    });
  });

  describe('Options', function() {
    it('allows to change names of attributes', function() {
      var Car = Backbone.Model.extend({});
      Backbone.Timestamp(Car, { updatedAt: 'updated', createdAt: 'created_at' });

      var car = new Car({ name: 'bmw x1' });
      car.save();

      expect(car.get('name')).equal('bmw x1');
      expect(_.keys(car.attributes)).length(3);
      expect(car.get('created_at')).equal(currentDate);
      expect(car.get('updated')).equal(currentDate);
    });
  });
});
