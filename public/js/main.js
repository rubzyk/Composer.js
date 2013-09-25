// Generated by CoffeeScript 1.6.3
(function() {
  require.config({
    paths: {
      jquery: 'vendors/jquery-1.10.2.min',
      underscore: 'vendors/underscore',
      backbone: 'vendors/backbone'
    },
    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ["underscore", "jquery"],
        exports: "Backbone"
      }
    }
  });

  window.AC = {};

  window.AC.Core = {};

  window.AC.MIDI = {};

  window.AC.Utils = {};

  window.AC.GUI = {};

  require(["lib/core/index", "lib/GUI/index", "lib/midi/index", "lib/utils/index", "jquery"], function() {
    window.rat = function(n, d) {
      return new AC.Utils.Rational(n, d);
    };
    return jQuery(function($) {
      var Bar, Directive, Mode, Position, RGen, RVal, TimeLine, Track, bar, track1;
      RGen = AC.Core.RGen;
      TimeLine = AC.Core.TimeLine;
      RVal = AC.Core.RVal;
      Mode = AC.Core.Mode;
      Bar = AC.Core.Bar;
      Track = AC.Core.Track;
      Directive = AC.Core.Directive;
      Position = AC.Core.Position;
      window.timeline = new TimeLine({
        cycle: true
      });
      bar = new Bar({
        beats: 4,
        beat_val: new RVal(1),
        bpm: 60,
        resolution: new RVal(1, 4)
      });
      timeline.insert_bar(bar, 0, 2);
      track1 = new Track({
        midi_channel: 1,
        directives: [
          new Directive({
            position: new Position({
              cycle: 0,
              bar: 0,
              sub: new RVal(0)
            }),
            type: "rythmic",
            method_name: "set_prob_array",
            args: [
              [
                {
                  rval: new RVal(1, 6),
                  occ: 1
                }, {
                  rval: new RVal(1, 8),
                  occ: 1
                }
              ]
            ]
          }), new Directive({
            position: new Position({
              cycle: 0,
              bar: 0,
              sub: new RVal(0)
            }),
            type: "harmonic",
            method_name: "abs_move",
            args: ["T", 1]
          }), new Directive({
            position: new Position({
              cycle: 0,
              bar: 1,
              sub: new RVal(0)
            }),
            type: "harmonic",
            method_name: "abs_move",
            args: ["SD-", 1]
          })
        ]
      });
      return timeline.tracks.push(track1);
    });
    /* UI RT Version*/

  });

}).call(this);
