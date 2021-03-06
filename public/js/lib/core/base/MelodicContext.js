// Generated by CoffeeScript 1.6.3
(function() {
  define(["lib/core/base/Constants", "lib/core/base/Mode", "vendors/ruby", "lib/utils/Utils", "lib/utils/Array_adds"], function() {
    var MK, Mode, root;
    if (typeof global !== "undefined" && global !== null) {
      root = global.AC.Core;
    } else {
      root = window.AC.Core;
    }
    Mode = AC.Core.Mode;
    MK = AC.Core.MK;
    return root.MelodicContext = (function() {
      function MelodicContext(opt) {
        var k, v, _ref;
        if (opt.mode) {
          if (opt.mode instanceof Mode) {
            this.mode = opt.mode;
          } else {
            this.mode = new Mode(opt);
          }
        } else {
          this.mode = new Mode("C Lyd");
        }
        this.degrees_functions = {};
        if (!(opt.degrees_functions || opt.main_degrees)) {
          this.default_degrees_functions_init();
        } else {
          _ref = this.mode.degrees;
          for (k in _ref) {
            v = _ref[k];
            if (opt.degrees_functions) {
              this.set_degrees_functions(opt.degrees_functions);
            } else if (opt.main_degrees && opt.main_degrees.indexOf(v.generic_name) >= 0) {
              v.melodic_function = "main";
            } else if (opt.disabled_degrees && opt.disabled_degrees.indexOf(v.generic_name) >= 0) {
              v.melodic_function = "disabled";
            } else {
              v.melodic_function = "passing";
            }
            this.degrees_functions[k] = v;
          }
        }
        this.passing_profile = this.passing_profile_calc();
      }

      MelodicContext.prototype.default_degrees_functions_init = function() {
        var k, v, _ref, _results;
        _ref = this.mode.degrees;
        _results = [];
        for (k in _ref) {
          v = _ref[k];
          if (this.mode.prio.slice(0, 4).indexOf(v.dist) >= 0) {
            v.melodic_function = "main";
            _results.push(this.degrees_functions[k] = v);
          } else {
            v.melodic_function = "passing";
            _results.push(this.degrees_functions[k] = v);
          }
        }
        return _results;
      };

      MelodicContext.prototype.set_degrees_functions = function(degrees_functions) {
        var k, v, _ref, _results;
        _ref = this.mode.degrees;
        _results = [];
        for (k in _ref) {
          v = _ref[k];
          if (degrees_functions[k]) {
            v.melodic_function = degrees_functions[k];
          } else {
            v.melodic_function = "passing";
          }
          _results.push(this.degrees_functions[k] = v);
        }
        return _results;
      };

      MelodicContext.prototype.passing_profile_calc = function() {
        var current_degree, k, length, main_degrees, res, v;
        res = {};
        main_degrees = this.main_degrees();
        length = main_degrees.length;
        for (k in main_degrees) {
          v = main_degrees[k];
          res[v.name] = {
            main_up: this.main_up(v),
            step_up: this.step_up(v),
            diat_up: this.diat_up(v),
            chrom_up: void 0,
            main_down: this.main_down(v),
            step_down: this.step_down(v),
            diat_down: this.diat_down(v),
            chrom_down: void 0
          };
          current_degree = res[v.name];
          if (current_degree.main_up.eq(current_degree.diat_up)) {
            current_degree.step_up = null;
          }
          if (current_degree.main_down.eq(current_degree.diat_down)) {
            current_degree.step_down = null;
          }
          current_degree.passing_combinations = this.passing_combinations_calc(current_degree);
        }
        return res;
      };

      MelodicContext.prototype.passing_combinations_calc = function(degree_passing_env) {
        var chunked_types, comb, current, final_result, prev, size, sub_group_combinations, type, x, _i, _j, _k, _l, _len, _len1, _len2, _ref, _ref1, _ref2;
        chunked_types = [];
        final_result = {};
        prev = null;
        _ref = ["main_up", "step_up", "diat_up", "diat_down", "step_down", "main_down"];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          type = _ref[_i];
          if (degree_passing_env[type]) {
            current = new AC.Core.Degree(degree_passing_env[type].name);
            if (prev && prev.eq(current)) {
              _a.last(chunked_types).push(type);
            } else {
              chunked_types.push([type]);
            }
            prev = current;
          }
        }
        for (size = _j = 2, _ref1 = chunked_types.length; 2 <= _ref1 ? _j <= _ref1 : _j >= _ref1; size = 2 <= _ref1 ? ++_j : --_j) {
          sub_group_combinations = _a.combination(chunked_types, size);
          final_result[size] = [];
          for (_k = 0, _len1 = sub_group_combinations.length; _k < _len1; _k++) {
            x = sub_group_combinations[_k];
            _ref2 = _a.comb_zip(x);
            for (_l = 0, _len2 = _ref2.length; _l < _len2; _l++) {
              comb = _ref2[_l];
              final_result[size].push(comb);
            }
          }
        }
        return final_result;
      };

      MelodicContext.prototype.passing_set_to_dist_from_target_array = function(target_degree, passing_set) {
        var degree_profile, result, type, _i, _len;
        degree_profile = this.passing_profile[target_degree.name];
        result = [];
        for (_i = 0, _len = passing_set.length; _i < _len; _i++) {
          type = passing_set[_i];
          if (type[type.length - 1] === "n") {
            result.push(target_degree.dist_down_to(degree_profile[type]) * -1);
          } else if (type[type.length - 1] === "p") {
            result.push(target_degree.dist_up_to(degree_profile[type]));
          } else {
            result.push(0);
          }
        }
        return result;
      };

      MelodicContext.prototype.main_up = function(degree) {
        var index, md;
        md = this.main_degrees_array();
        index = this.find_degree(degree, md);
        if (index !== -1) {
          return md[(index + 1) % md.length];
        } else {
          return false;
        }
      };

      MelodicContext.prototype.step_up = function(degree) {
        var ad, index;
        ad = this.available_degrees_array();
        index = this.find_degree(degree, ad);
        if (index !== -1) {
          return ad[(index + 2) % ad.length];
        } else {
          return false;
        }
      };

      MelodicContext.prototype.diat_up = function(degree) {
        var ad, index;
        ad = this.available_degrees_array();
        index = this.find_degree(degree, ad);
        if (index !== -1) {
          return ad[(index + 1) % ad.length];
        } else {
          return false;
        }
      };

      MelodicContext.prototype.main_down = function(degree) {
        var index, md;
        md = this.main_degrees_array();
        index = this.find_degree(degree, md);
        if (index !== -1) {
          return md[(index - 1 + md.length) % md.length];
        } else {
          return false;
        }
      };

      MelodicContext.prototype.step_down = function(degree) {
        var ad, index;
        ad = this.available_degrees_array();
        index = this.find_degree(degree, ad);
        if (index !== -1) {
          return ad[(index - 2 + ad.length) % ad.length];
        } else {
          return false;
        }
      };

      MelodicContext.prototype.diat_down = function(degree) {
        var ad, index;
        ad = this.available_degrees_array();
        index = this.find_degree(degree, ad);
        if (index !== -1) {
          return ad[(index - 1 + ad.length) % ad.length];
        } else {
          return false;
        }
      };

      MelodicContext.prototype.find_degree = function(degree, degree_array) {
        var d, i, index, _i, _len;
        index = -1;
        for (i = _i = 0, _len = degree_array.length; _i < _len; i = ++_i) {
          d = degree_array[i];
          if (d.eq(degree)) {
            index = i;
            break;
          }
        }
        return index;
      };

      MelodicContext.prototype.main_degrees = function() {
        var k, result, v, _ref;
        result = {};
        _ref = this.degrees_functions;
        for (k in _ref) {
          v = _ref[k];
          if (v.melodic_function === "main") {
            result[k] = v;
          }
        }
        return result;
      };

      MelodicContext.prototype.passing_degrees = function() {
        var k, result, v, _ref;
        result = {};
        _ref = this.degrees_functions;
        for (k in _ref) {
          v = _ref[k];
          if (v.melodic_function === "passing") {
            result[k] = v;
          }
        }
        return result;
      };

      MelodicContext.prototype.disabled_degrees = function() {
        var k, result, v, _ref;
        result = {};
        _ref = this.degrees_functions;
        for (k in _ref) {
          v = _ref[k];
          if (v.melodic_function === "disabled") {
            result[k] = v;
          }
        }
        return result;
      };

      MelodicContext.prototype.available_degrees = function() {
        return AC.Utils.merge(this.main_degrees(), this.passing_degrees());
      };

      MelodicContext.prototype.main_degrees_array = function() {
        return this.degrees_array_from_melodic_function("main");
      };

      MelodicContext.prototype.passing_degrees_array = function() {
        return this.degrees_array_from_melodic_function("passing");
      };

      MelodicContext.prototype.disabled_degrees_array = function() {
        return this.degrees_array_from_melodic_function("disabled");
      };

      MelodicContext.prototype.available_degrees_array = function() {
        return this.degrees_array_from_melodic_function("disabled", false);
      };

      MelodicContext.prototype.degrees_array_from_melodic_function = function(type, select) {
        var deg, gen_deg, result, _i, _len, _ref;
        if (select == null) {
          select = true;
        }
        result = [];
        _ref = MK.ABSTRACT_DEGREES;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          gen_deg = _ref[_i];
          deg = this.degrees_functions[gen_deg];
          if (select) {
            if (deg.melodic_function === type) {
              result.push(deg);
            }
          } else {
            if (deg.melodic_function !== type) {
              result.push(deg);
            }
          }
        }
        return result;
      };

      MelodicContext.prototype.main_concrete = function() {
        var _this = this;
        return this.main_degrees_array().map(function(x) {
          return _this.mode.degree_int(x);
        });
      };

      MelodicContext.prototype.passing_concrete = function() {
        var _this = this;
        return this.passing_degrees_array().map(function(x) {
          return _this.mode.degree_int(x);
        });
      };

      MelodicContext.prototype.disabled_concrete = function() {
        var _this = this;
        return this.disabled_degrees_array().map(function(x) {
          return _this.mode.degree_int(x);
        });
      };

      MelodicContext.prototype.available_concrete = function() {
        var _this = this;
        return this.available_degrees_array().map(function(x) {
          return _this.mode.degree_int(x);
        });
      };

      return MelodicContext;

    })();
  });

}).call(this);
