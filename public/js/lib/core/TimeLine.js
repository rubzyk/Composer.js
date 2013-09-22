// Generated by CoffeeScript 1.6.3
(function() {
  define(["vendors/EventEmitter", "lib/core/RVal", "lib/utils/Rational", "lib/core/Position", "lib/midi/play"], function(EventEmitter) {
    var Note, Position, RVal, Rational, root;
    if (typeof global !== "undefined" && global !== null) {
      root = global.AC.Core;
    } else {
      root = window.AC.Core;
    }
    Rational = AC.Utils.Rational;
    RVal = AC.Core.RVal;
    Position = AC.Core.Position;
    Note = AC.Core.Note;
    window.ee = new EventEmitter;
    return root.TimeLine = (function() {
      function TimeLine(opt) {
        var _this = this;
        this.origin_point = null;
        this.position = new Position({
          cycle: 0,
          bar: 0,
          sub: new RVal(0, 1),
          timeline: this
        });
        this.resolution = opt.resolution || new Rational(1, 4);
        this.grid = opt.grid || [];
        this.cycle = opt.cycle || false;
        this.is_on = false;
        this.emitter = new EventEmitter;
        this.rgen = opt.rgen;
        this.on_tic = function() {
          return console.log("" + (_this.position.bar + '>' + _this.position.sub.numer + '/' + _this.position.sub.denom + ' mode: ' + _this.current_bar().h_dir_at(_this.position.sub).name));
        };
        this.emitter.addListeners({
          tic: [this.rgen.tic, this.on_tic],
          start: this.rgen.start
        });
      }

      TimeLine.prototype.start = function(position) {
        var instance,
          _this = this;
        if (position) {
          this.position = position;
        } else {
          this.position = new Position({
            cycle: 0,
            bar: 0,
            sub: new RVal(0, 1),
            timeline: this
          });
        }
        this.origin_point = window.performance.now();
        this.is_on = true;
        this.speed = (60000 / this.current_bar().bpm) * this.current_bar().resolution.toFloat();
        this.emitter.trigger('start', [this]);
        this.emitter.trigger('tic');
        instance = function() {
          var diff;
          _this.position.sub.add(_this.current_bar().resolution);
          if (_this.position.sub.eq(_this.current_bar().duration())) {
            _this.position.bar++;
            if (_this.cycle && _this.position.bar === _this.grid.length) {
              _this.position.bar = 0;
              _this.position.cycle++;
            }
            _this.speed = (60000 / _this.current_bar().bpm) * _this.current_bar().resolution.toFloat();
            _this.position.sub = new RVal(0, 1);
          }
          _this.emitter.trigger('tic');
          diff = _this.check_precision();
          if (_this.is_on) {
            return setTimeout(instance, _this.speed - diff);
          }
        };
        setTimeout(instance, this.speed);
      };

      TimeLine.prototype.stop = function() {};

      TimeLine.prototype.check_precision = function() {
        var computed, real, result;
        real = window.performance.now() - this.origin_point;
        computed = this.position.total_time();
        result = real - computed;
        return result;
      };

      TimeLine.prototype.positioned_rval_to_ms = function(pos, rval) {
        return pos.rval_to_ms(rval);
      };

      TimeLine.prototype.current_bar = function() {
        return this.grid[this.position.bar];
      };

      TimeLine.prototype.play_line = function(line, midi_chan) {
        var cn, n, _i, _len, _results;
        if (!(line instanceof Array)) {
          line = [line];
        }
        _results = [];
        for (_i = 0, _len = line.length; _i < _len; _i++) {
          n = line[_i];
          if (n instanceof Note) {
            _results.push(AC.MIDI.simple_play({
              channel: midi_chan || 1,
              pitch: n.pitch.value,
              velocity: n.velocity,
              duration: this.positioned_rval_to_ms(n.position, n.duration),
              at: n.position.to_performance_time()
            }));
          } else {
            _results.push((function() {
              var _j, _len1, _results1;
              _results1 = [];
              for (_j = 0, _len1 = n.length; _j < _len1; _j++) {
                cn = n[_j];
                _results1.push(AC.MIDI.simple_play({
                  channel: midi_chan || 1,
                  pitch: cn.pitch.value,
                  velocity: cn.velocity,
                  duration: this.positioned_rval_to_ms(cn.position, cn.duration),
                  at: cn.position.to_performance_time()
                }));
              }
              return _results1;
            }).call(this));
          }
        }
        return _results;
      };

      return TimeLine;

    })();
  });

}).call(this);
