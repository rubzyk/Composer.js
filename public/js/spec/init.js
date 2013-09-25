// Generated by CoffeeScript 1.6.3
(function() {
  define(["lib/core/index"], function() {
    var Bar, Directive, Mode, Position, RGen, RVal, TimeLine, Track, init_tl;
    TimeLine = AC.Core.TimeLine;
    Bar = AC.Core.Bar;
    RVal = AC.Core.RVal;
    Mode = AC.Core.Mode;
    Position = AC.Core.Position;
    RGen = AC.Core.RGen;
    Track = AC.Core.Track;
    Directive = AC.Core.Directive;
    init_tl = function() {
      var bar, track1;
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
    };
    return init_tl();
  });

}).call(this);
