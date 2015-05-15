/* global imagesLoaded */
import Ember from 'ember';

var getOptions = function (keys) {
  var properties = this.getProperties(keys);

  Object.keys(properties).forEach(function (key) {
    if (properties[key] === "null") {
      properties[key] = null;
    }

    if (properties[key] === undefined) {
      delete properties[key];
    }
  });

  return properties;
};

export default Ember.Component.extend({
  classNames: ['masonry-grid'],

  options: null,
  items: null,

  masonryInitialized: false,

  initializeMasonry: Ember.on('didInsertElement', function () {
    this.set('options', getOptions.call(this, [
      'containerStyle',
      'columnWidth',
      'gutter',
      'hiddenStyle',
      'isFitWidth',
      'isInitLayout',
      'isOriginLeft',
      'isOriginTop',
      'isResizeBound',
      'itemSelector',
      'stamp',
      'transitionDuration',
      'visibleStyle'
    ]));

    this.layoutMasonry();
  }),

  tearDownMasonry: Ember.on('willDestroyElement', function () {
    var _this = this;

    if (_this.get('masonryInitialized')) {
      _this.$().masonry('destroy');
    }
  }),

  layoutMasonry: Ember.observer('items.@each', function () {
    var _this = this;

    if (this.items.then) {
        this.items.then(fulfill, reject);
    } else {
        fulfill();
    }

    function fulfill(answer) {

      if (_this.get('masonryInitialized')) {
        _this.$().masonry();
      }

      _this.$().masonry(_this.get('options'));
      _this.set('masonryInitialized', true);

    }

    function reject(reason) {
        console.log(reason);
    }
  })
});
