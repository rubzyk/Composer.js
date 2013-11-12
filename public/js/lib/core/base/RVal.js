// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["lib/utils/Rational", "lib/utils/Utils", "vendors/ruby", "vendors/underscore", "lib/utils/underscore_adds"], function() {
    var Rational, Utils, root;
    if (typeof global !== "undefined" && global !== null) {
      root = global.AC.Core;
    } else {
      root = window.AC.Core;
    }
    Rational = AC.Utils.Rational;
    Utils = AC.Utils;
    return root.RVal = (function(_super) {
      __extends(RVal, _super);

      function RVal(num, den) {
        if (den == null) {
          den = 1;
        }
        RVal.__super__.constructor.call(this, num, den);
      }

      RVal.prototype.clone = function() {
        return new root.RVal(this.numer, this.denom);
      };

      RVal.prototype.to_ms = function(bpm) {
        return this.times(new Rational(60, bpm)).toFloat() * 1000;
      };

      RVal.prototype.polyrythmic_base = function() {
        var ret;
        ret = _.filter(_.factorise(this.denom), function(x) {
          return x !== 2 && x !== 1;
        });
        if (_.isEmpty(ret)) {
          return 2;
        } else {
          return _.product(ret);
        }
      };

      RVal.prototype.rythmn_bases = function() {
        return _.factorise(this.denom);
      };

      RVal.prototype.binary_base = function() {
        var pb;
        pb = this.polyrythmic_base();
        if (pb === 2) {
          return new Rational(1, this.denom);
        } else {
          return new Rational(this.numer, this.denom / pb);
        }
      };

      RVal.prototype.multiplier = function() {
        return this.numer;
      };

      RVal.prototype.allowed_subs = function() {
        var e, i, primes, results, subset, _i, _j, _len, _ref;
        primes = Utils.factorise(this.denom);
        results = [1];
        for (i = _i = 1, _ref = primes.length; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
          subset = _a.combination(primes, i);
          for (_j = 0, _len = subset.length; _j < _len; _j++) {
            e = subset[_j];
            results.push(e.reduce(function(a, b) {
              return a * b;
            }));
          }
        }
        return _a.uniq(results);
      };

      RVal.prototype.show_bases = function() {
        return console.log("poly: " + this.polyrythmic_base() + " \nbinary: " + this.binary_base() + " \nmultiplier: " + this.multiplier());
      };

      RVal.prototype.times = function(rat) {
        return RVal.__super__.times.call(this, rat).toRVal();
      };

      RVal.prototype.div = function(rat) {
        return RVal.__super__.div.call(this, rat).toRVal();
      };

      RVal.prototype.plus = function(rat) {
        return RVal.__super__.plus.call(this, rat).toRVal();
      };

      RVal.prototype.minus = function(rat) {
        return RVal.__super__.minus.call(this, rat).toRVal();
      };

      RVal.prototype.is_allowed_at = function(position) {
        return this.allowed_subs().indexOf(position.sub.denom) >= 0;
      };

      return RVal;

    })(Rational);
  });

}).call(this);
