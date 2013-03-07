// ...
// https://github.com/Ask11/backbone.timestamp
//
// (c) 2013, Aleksey Kulikov
// May be freely distributed according to MIT license.

;(function(Backbone, _) {
  'use strict';

  Backbone.Timestamp = function(Model, options) {
    var save = Model.prototype.save;

    if (!options) options = {};
    options = _.defaults(options, { createdAt: 'createdAt', updatedAt: 'updatedAt' });

    Model.prototype.save = function() {
      var currentDate = new Date();

      if (!this.hasChanged(options.updatedAt)) {
        this.set(options.updatedAt, currentDate, { silent: true });
      }

      if (this.isNew() && !this.get(options.createdAt)) {
        this.set(options.createdAt, currentDate, { silent: true });
      }

      return save.apply(this, arguments);
    };
  };
}).call(this, Backbone, _);
