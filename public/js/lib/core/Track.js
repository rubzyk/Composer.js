// Generated by CoffeeScript 1.6.3
(function() {
  define(["lib/core/Position", "lib/core/Composer"], function() {
    var Composer, Position, root;
    if (typeof global !== "undefined" && global !== null) {
      root = global.AC.Core;
    } else {
      root = window.AC.Core;
    }
    Position = AC.Core.Position;
    Composer = AC.Core.Composer;
    return root.Track = (function() {
      function Track(opt) {
        this.midi_channel = opt.midi_channel || 1;
        this.directives = opt.directives || [];
        this.sort_directives();
        this.composer = opt.composer || new Composer;
        this.score = [];
      }

      Track.prototype.tic = function() {
        while (this.directives[0].position.le(this.composer.head_position())) {
          this.composer.apply_directive(this.directives[0]);
          this.directives[0].position.cycle++;
          this.directives = _a.rotate(this.directives, 1);
        }
        return this.composer.tic();
      };

      Track.prototype.sort_directives = function() {
        return this.directives.sort(function(a, b) {
          return a.position.ge(b.position);
        });
      };

      Track.prototype.add_directive = function(d) {
        var dir, i, _i, _len, _ref, _results;
        _ref = this.directives;
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          dir = _ref[i];
          if (d.position.lt(dir.position)) {
            debugger;
            _a.insert(this.directives, i, d);
            break;
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      return Track;

    })();
  });

}).call(this);
