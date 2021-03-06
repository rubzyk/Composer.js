// Generated by CoffeeScript 1.6.3
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define([], function() {
    var moduleKeywords, root;
    if (typeof global !== "undefined" && global !== null) {
      root = global.AC.Utils;
    } else {
      root = window.AC.Utils;
    }
    moduleKeywords = ['extended', 'included'];
    return root.Module = (function() {
      function Module() {}

      Module.extend = function(obj) {
        var key, value, _ref;
        for (key in obj) {
          value = obj[key];
          if (__indexOf.call(moduleKeywords, key) < 0) {
            this[key] = value;
          }
        }
        if ((_ref = obj.extended) != null) {
          _ref.apply(this);
        }
        return this;
      };

      Module.include = function(obj) {
        var key, value, _ref;
        for (key in obj) {
          value = obj[key];
          if (__indexOf.call(moduleKeywords, key) < 0) {
            this.prototype[key] = value;
          }
        }
        if ((_ref = obj.included) != null) {
          _ref.apply(this);
        }
        return this;
      };

      Module.mixOf = function() {
        var Mixed, base, method, mixin, mixins, name, _i, _ref, _ref1;
        base = arguments[0], mixins = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        Mixed = (function(_super) {
          __extends(Mixed, _super);

          function Mixed() {
            _ref = Mixed.__super__.constructor.apply(this, arguments);
            return _ref;
          }

          return Mixed;

        })(base);
        for (_i = mixins.length - 1; _i >= 0; _i += -1) {
          mixin = mixins[_i];
          _ref1 = mixin.prototype;
          for (name in _ref1) {
            method = _ref1[name];
            Mixed.prototype[name] = method;
          }
        }
        return Mixed;
      };

      return Module;

    })();
  });

}).call(this);
