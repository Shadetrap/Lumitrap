var __extends = this && this.__extends || function(t, e) {
        function n() {
            this.constructor = t
        }
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
    },
    beepbox;
! function(t) {
    function e(t, e) {
        for (var n = 0; n < t.length; n++) t[n] *= e
    }

    function n(t) {
        return !(!t || t & t - 1)
    }

    function i(t) {
        if (!n(t)) throw new Error("FFT array length must be a power of 2.");
        return Math.round(Math.log(t) / Math.log(2))
    }

    function s(t) {
        var e = t.length,
            n = i(e);
        if (n > 16) throw new Error("FFT array length must not be greater than 2^16.");
        for (var s = 16 - n, a = 0; e > a; a++) {
            var r = void 0;
            if (r = (43690 & a) >> 1 | (21845 & a) << 1, r = (52428 & r) >> 2 | (13107 & r) << 2, r = (61680 & r) >> 4 | (3855 & r) << 4, r = (r >> 8 | (255 & r) << 8) >> s, r > a) {
                var o = t[a];
                t[a] = t[r], t[r] = o
            }
        }
    }

    function a(t) {
        var e = t.length,
            n = i(e);
        if (4 > e) throw new Error("FFT array length must be at least 4.");
        for (var a = n - 1; a >= 2; a--)
            for (var r = 1 << a, o = r >> 1, h = r << 1, l = 2 * Math.PI / h, c = Math.cos(l), u = Math.sin(l), p = 2 * c, d = 0; e > d; d += h) {
                var f = d,
                    g = f + o,
                    m = f + r,
                    b = m + o,
                    v = m + r,
                    C = t[f],
                    y = t[m];
                t[f] = C + y, t[g] *= 2, t[m] = C - y, t[b] *= 2;
                for (var w = c, x = -u, Q = 1, N = 0, A = 1; o > A; A++) {
                    var E = f + A,
                        P = m - A,
                        M = m + A,
                        k = v - A,
                        B = t[E],
                        S = t[P],
                        L = t[M],
                        I = t[k],
                        G = B - S,
                        D = L + I;
                    t[E] = B + S, t[P] = I - L, t[M] = G * w - D * x, t[k] = D * w + G * x;
                    var R = p * w - Q,
                        T = p * x - N;
                    Q = w, N = x, w = R, x = T
                }
            }
        for (var A = 0; e > A; A += 4) {
            var F = A + 1,
                U = A + 2,
                V = A + 3,
                B = t[A],
                S = 2 * t[F],
                Z = t[U],
                Y = 2 * t[V],
                G = B + Z,
                D = B - Z;
            t[A] = G + S, t[F] = G - S, t[U] = D + Y, t[V] = D - Y
        }
        s(t)
    }
    t.scaleElementsByFactor = e, t.inverseRealFourierTransform = a
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    function e(t, e, n) {
        return {
            interval: t,
            time: e,
            volume: n
        }
    }

    function n(t, n, i, s, a) {
        return void 0 === a && (a = !1), {
            pitches: [t],
            pins: [e(0, 0, s), e(0, i - n, a ? 0 : s)],
            start: n,
            end: i
        }
    }
    var i = 0,
        s = 0,
        a = function() {
            function e() {}
            return e.a = function(t) {
                for (var e = 0, n = 0; n < t.length; n++) e += t[n];
                for (var i = e / t.length, n = 0; n < t.length; n++) t[n] -= i;
                return new Float64Array(t)
            }, e.getDrumWave = function(n) {
                var i = e.c[n];
                if (null == i)
                    if (i = new Float32Array(32768), e.c[n] = i, 0 == n)
                        for (var s = 1, a = 0; 32768 > a; a++) {
                            i[a] = 2 * (1 & s) - 1;
                            var r = s >> 1;
                            1 == (s + r & 1) && (r += 16384), s = r
                        } else if (1 == n)
                            for (var a = 0; 32768 > a; a++) i[a] = 2 * Math.random() - 1;
                        else if (2 == n)
                    for (var s = 1, a = 0; 32768 > a; a++) {
                        i[a] = 2 * (1 & s) - 1;
                        var r = s >> 1;
                        1 == (s + r & 1) && (r += 32768), s = r
                    } else if (3 == n)
                        for (var s = 1, a = 0; 32768 > a; a++) {
                            i[a] = 2 * (1 & s) - 1;
                            var r = s >> 1;
                            1 == (s + r & 1) && (r += 40), s = r
                        } else {
                            if (4 != n) throw new Error("Unrecognized drum index: " + n);
                            e.drawNoiseSpectrum(i, 10, 11, 1, 1, 0), e.drawNoiseSpectrum(i, 11, 14, -2, -2, 0), t.inverseRealFourierTransform(i), t.scaleElementsByFactor(i, 1 / Math.sqrt(i.length))
                        }
                    return i
            }, e.drawNoiseSpectrum = function(t, e, n, i, s, a) {
                for (var r = 11, o = 1 << r, h = 0 | Math.pow(2, e), l = 0 | Math.pow(2, n), c = Math.log(2), u = h; l > u; u++) {
                    var p = Math.pow(2, i + (s - i) * (Math.log(u) / c - e) / (n - e));
                    p *= Math.pow(u / o, a);
                    var d = Math.random() * Math.PI * 2;
                    t[u] = Math.cos(d) * p, t[32768 - u] = Math.sin(d) * p
                }
            }, e.generateSineWave = function() {
                for (var t = new Float64Array(e.sineWaveLength + 1), n = 0; n < e.sineWaveLength + 1; n++) t[n] = Math.sin(n * Math.PI * 2 / e.sineWaveLength);
                return t
            }, e
        }();
    a.scaleNames = ["easy :)", "easy :(", "island :)", "island :(", "blues :)", "blues :(", "normal :)", "normal :(", "dbl harmonic :)", "dbl harmonic :(", "enigma", "expert"], a.scaleFlags = [
        [!0, !1, !0, !1, !0, !1, !1, !0, !1, !0, !1, !1],
        [!0, !1, !1, !0, !1, !0, !1, !0, !1, !1, !0, !1],
        [!0, !1, !1, !1, !0, !0, !1, !0, !1, !1, !1, !0],
        [!0, !0, !1, !0, !1, !1, !1, !0, !0, !1, !1, !1],
        [!0, !1, !0, !0, !0, !1, !1, !0, !1, !0, !1, !1],
        [!0, !1, !1, !0, !1, !0, !0, !0, !1, !1, !0, !1],
        [!0, !1, !0, !1, !0, !0, !1, !0, !1, !0, !1, !0],
        [!0, !1, !0, !0, !1, !0, !1, !0, !0, !1, !0, !1],
        [!0, !0, !1, !1, !0, !0, !1, !0, !0, !1, !1, !0],
        [!0, !1, !0, !0, !1, !1, !0, !0, !0, !1, !1, !0],
        [!0, !1, !0, !1, !0, !1, !0, !1, !0, !1, !0, !1],
        [!0, !0, !0, !0, !0, !0, !0, !0, !0, !0, !0, !0]
    ], a.pianoScaleFlags = [!0, !1, !0, !1, !0, !0, !1, !0, !1, !0, !1, !0], a.blackKeyNameParents = [-1, 1, -1, 1, -1, 1, -1, -1, 1, -1, 1, -1], a.pitchNames = ["C", null, "D", null, "E", "F", null, "G", null, "A", null, "B"], a.keyNames = ["B", "Aâ™¯", "A", "Gâ™¯", "G", "Fâ™¯", "F", "E", "Dâ™¯", "D", "Câ™¯", "C"], a.keyTransposes = [23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12], a.tempoSteps = 15, a.reverbRange = 4, a.beatsPerBarMin = 3, a.beatsPerBarMax = 16, a.barCountMin = 1, a.barCountMax = 128, a.patternsPerChannelMin = 1, a.patternsPerChannelMax = 64, a.instrumentsPerChannelMin = 1, a.instrumentsPerChannelMax = 10, a.partNames = ["Ã·3 (triplets)", "Ã·4 (standard)", "Ã·6", "Ã·8"], a.partCounts = [3, 4, 6, 8], a.waveNames = ["triangle", "square", "pulse wide", "pulse narrow", "sawtooth", "double saw", "double pulse", "spiky", "plateau"], a.waveVolumes = [1, .5, .5, .5, .65, .5, .4, .4, .94], a.drumNames = ["retro", "white", "clang", "buzz", "hollow"], a.drumVolumes = [.25, 1, .4, .3, 1.5], a.drumBasePitches = [69, 69, 69, 69, 96], a.drumPitchFilterMult = [100, 8, 100, 100, 1], a.drumWaveIsSoft = [!1, !0, !1, !1, !0], a.c = [null, null, null, null, null], a.filterNames = ["none", "bright", "medium", "soft", "decay bright", "decay medium", "decay soft"], a.filterBases = [0, 2, 3.5, 5, 1, 2.5, 4], a.filterDecays = [0, 0, 0, 0, 10, 7, 4], a.filterVolumes = [.2, .4, .7, 1, .5, .75, 1], a.transitionNames = ["seamless", "sudden", "smooth", "slide"], a.effectNames = ["none", "vibrato light", "vibrato delayed", "vibrato heavy", "tremolo light", "tremolo heavy"], a.effectVibratos = [0, .15, .3, .45, 0, 0], a.effectTremolos = [0, 0, 0, 0, .25, .5], a.effectVibratoDelays = [0, 0, 3, 0, 0, 0], a.chorusNames = ["union", "shimmer", "hum", "honky tonk", "dissonant", "fifths", "octaves", "bowed", "custom harmony"], a.chorusIntervals = [0, .02, .05, .1, .25, 3.5, 6, .02, .05], a.chorusOffsets = [0, 0, 0, 0, 0, 3.5, 6, 0, 0], a.chorusVolumes = [.7, .8, 1, 1, .9, .9, .8, 1, 1], a.chorusSigns = [1, 1, 1, 1, 1, 1, 1, -1, 1], a.chorusHarmonizes = [!1, !1, !1, !1, !1, !1, !1, !1, !0], a.volumeNames = ["loudest", "loud", "medium", "quiet", "quietest", "mute"], a.volumeValues = [0, .5, 1, 1.5, 2, -1], a.operatorCount = 4, a.operatorAlgorithmNames = ["1â†(2â€‚3â€‚4)", "1â†(2â€‚3â†4)", "1â†2â†(3â€‚4)", "1â†(2â€‚3)â†4", "1â†2â†3â†4", "1â†3â€ƒ2â†4", "1â€ƒ2â†(3â€‚4)", "1â€ƒ2â†3â†4", "(1â€‚2)â†3â†4", "(1â€‚2)â†(3â€‚4)", "1â€ƒ2â€ƒ3â†4", "(1â€‚2â€‚3)â†4", "1â€ƒ2â€ƒ3â€ƒ4"], a.midiAlgorithmNames = ["1<(2 3 4)", "1<(2 3<4)", "1<2<(3 4)", "1<(2 3)<4", "1<2<3<4", "1<3 2<4", "1 2<(3 4)", "1 2<3<4", "(1 2)<3<4", "(1 2)<(3 4)", "1 2 3<4", "(1 2 3)<4", "1 2 3 4"], a.operatorModulatedBy = [
        [
            [2, 3, 4],
            [],
            [],
            []
        ],
        [
            [2, 3],
            [],
            [4],
            []
        ],
        [
            [2],
            [3, 4],
            [],
            []
        ],
        [
            [2, 3],
            [4],
            [4],
            []
        ],
        [
            [2],
            [3],
            [4],
            []
        ],
        [
            [3],
            [4],
            [],
            []
        ],
        [
            [],
            [3, 4],
            [],
            []
        ],
        [
            [],
            [3],
            [4],
            []
        ],
        [
            [3],
            [3],
            [4],
            []
        ],
        [
            [3, 4],
            [3, 4],
            [],
            []
        ],
        [
            [],
            [],
            [4],
            []
        ],
        [
            [4],
            [4],
            [4],
            []
        ],
        [
            [],
            [],
            [],
            []
        ]
    ], a.operatorAssociatedCarrier = [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 2, 1, 2],
        [1, 2, 2, 2],
        [1, 2, 2, 2],
        [1, 2, 2, 2],
        [1, 2, 2, 2],
        [1, 2, 3, 3],
        [1, 2, 3, 3],
        [1, 2, 3, 4]
    ], a.operatorCarrierCounts = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 4], a.operatorCarrierChorus = [0, .04, -.073, .091], a.operatorAmplitudeMax = 15, a.operatorFrequencyNames = ["1Ã—", "~1Ã—", "2Ã—", "~2Ã—", "3Ã—", "4Ã—", "5Ã—", "6Ã—", "7Ã—", "8Ã—", "9Ã—", "11Ã—", "13Ã—", "16Ã—", "20Ã—"], a.midiFrequencyNames = ["1x", "~1x", "2x", "~2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "11x", "13x", "16x", "20x"], a.operatorFrequencies = [1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13, 16, 20], a.operatorHzOffsets = [0, 1.5, 0, -1.3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], a.operatorAmplitudeSigns = [1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], a.operatorEnvelopeNames = ["custom", "steady", "punch", "flare 1", "flare 2", "flare 3", "pluck 1", "pluck 2", "pluck 3", "swell 1", "swell 2", "swell 3", "tremolo1", "tremolo2", "tremolo3"], a.operatorEnvelopeType = [0, 1, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5], a.operatorEnvelopeSpeed = [0, 0, 0, 32, 8, 2, 32, 8, 2, 32, 8, 2, 4, 2, 1], a.operatorEnvelopeInverted = [!1, !1, !1, !1, !1, !1, !1, !1, !1, !0, !0, !0, !1, !1, !1], a.operatorFeedbackNames = ["1âŸ²", "2âŸ²", "3âŸ²", "4âŸ²", "1âŸ²â€ƒ2âŸ²", "3âŸ²â€ƒ4âŸ²", "1âŸ²â€ƒ2âŸ²â€ƒ3âŸ²", "2âŸ²â€ƒ3âŸ²â€ƒ4âŸ²", "1âŸ² 2âŸ² 3âŸ² 4âŸ²", "1â†’2", "1â†’3", "1â†’4", "2â†’3", "2â†’4", "3â†’4", "1â†’3â€ƒ2â†’4", "1â†’4â€ƒ2â†’3", "1â†’2â†’3â†’4"], a.midiFeedbackNames = ["1", "2", "3", "4", "1 2", "3 4", "1 2 3", "2 3 4", "1 2 3 4", "1>2", "1>3", "1>4", "2>3", "2>4", "3>4", "1>3 2>4", "1>4 2>3", "1>2>3>4"], a.operatorFeedbackIndices = [
        [
            [1],
            [],
            [],
            []
        ],
        [
            [],
            [2],
            [],
            []
        ],
        [
            [],
            [],
            [3],
            []
        ],
        [
            [],
            [],
            [],
            [4]
        ],
        [
            [1],
            [2],
            [],
            []
        ],
        [
            [],
            [],
            [3],
            [4]
        ],
        [
            [1],
            [2],
            [3],
            []
        ],
        [
            [],
            [2],
            [3],
            [4]
        ],
        [
            [1],
            [2],
            [3],
            [4]
        ],
        [
            [],
            [1],
            [],
            []
        ],
        [
            [],
            [],
            [1],
            []
        ],
        [
            [],
            [],
            [],
            [1]
        ],
        [
            [],
            [],
            [2],
            []
        ],
        [
            [],
            [],
            [],
            [2]
        ],
        [
            [],
            [],
            [],
            [3]
        ],
        [
            [],
            [],
            [1],
            [2]
        ],
        [
            [],
            [],
            [2],
            [1]
        ],
        [
            [],
            [1],
            [2],
            [3]
        ]
    ], a.pitchChannelTypeNames = ["chip", "FM (expert)"], a.instrumentTypeNames = ["chip", "FM", "noise"], a.pitchChannelColorsDim = ["#0099a1", "#a1a100", "#c75000", "#00a100", "#d020d0", "#7777b0"], a.pitchChannelColorsBright = ["#25f3ff", "#ffff25", "#ff9752", "#50ff50", "#ff90ff", "#a0a0ff"], a.pitchNoteColorsDim = ["#00bdc7", "#c7c700", "#ff771c", "#00c700", "#e040e0", "#8888d0"], a.pitchNoteColorsBright = ["#92f9ff", "#ffff92", "#ffcdab", "#a0ffa0", "#ffc0ff", "#d0d0ff"], a.drumChannelColorsDim = ["#6f6f6f", "#996633"], a.drumChannelColorsBright = ["#aaaaaa", "#ddaa77"], a.drumNoteColorsDim = ["#aaaaaa", "#cc9966"], a.drumNoteColorsBright = ["#eeeeee", "#f0d0bb"], a.midiPitchChannelNames = ["cyan channel", "yellow channel", "orange channel", "green channel", "purple channel", "blue channel"], a.midiDrumChannelNames = ["gray channel", "brown channel"], a.midiSustainInstruments = [71, 80, 70, 68, 81, 81, 81, 81, 74], a.midiDecayInstruments = [46, 46, 6, 24, 25, 25, 106, 106, 33], a.drumInterval = 6, a.drumCount = 12, a.pitchCount = 37, a.maxPitch = 84, a.pitchChannelCountMin = 1, a.pitchChannelCountMax = 6, a.drumChannelCountMin = 0, a.drumChannelCountMax = 2, a.waves = [a.a([1 / 15, .2, 5 / 15, 7 / 15, .6, 11 / 15, 13 / 15, 1, 1, 13 / 15, 11 / 15, .6, 7 / 15, 5 / 15, .2, 1 / 15, -1 / 15, -0.2, -5 / 15, -7 / 15, -0.6, -11 / 15, -13 / 15, -1, -1, -13 / 15, -11 / 15, -0.6, -7 / 15, -5 / 15, -0.2, -1 / 15]), a.a([1, -1]), a.a([1, -1, -1, -1]), a.a([1, -1, -1, -1, -1, -1, -1, -1]), a.a([1 / 31, 3 / 31, 5 / 31, 7 / 31, 9 / 31, 11 / 31, 13 / 31, 15 / 31, 17 / 31, 19 / 31, 21 / 31, 23 / 31, 25 / 31, 27 / 31, 29 / 31, 1, -1, -29 / 31, -27 / 31, -25 / 31, -23 / 31, -21 / 31, -19 / 31, -17 / 31, -15 / 31, -13 / 31, -11 / 31, -9 / 31, -7 / 31, -5 / 31, -3 / 31, -1 / 31]), a.a([0, -.2, -.4, -.6, -.8, -1, 1, -.8, -.6, -.4, -.2, 1, .8, .6, .4, .2]), a.a([1, 1, 1, 1, 1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1]), a.a([1, -1, 1, -1, 1, 0]), a.a([0, .2, .4, .5, .6, .7, .8, .85, .9, .95, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, .95, .9, .85, .8, .7, .6, .5, .4, .2, 0, -.2, -.4, -.5, -.6, -.7, -.8, -.85, -.9, -.95, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -.95, -.9, -.85, -.8, -.7, -.6, -.5, -.4, -.2])], a.sineWaveLength = 256, a.sineWaveMask = a.sineWaveLength - 1, a.sineWave = a.generateSineWave(), t.Config = a;
    var r = function() {
            function t(t, e, n, i) {
                this.e = [], this.f = 0;
                for (var s = n; i > s; s++) {
                    var a = t[e.charCodeAt(s)];
                    this.e.push(a >> 5 & 1), this.e.push(a >> 4 & 1), this.e.push(a >> 3 & 1), this.e.push(a >> 2 & 1), this.e.push(a >> 1 & 1), this.e.push(1 & a)
                }
            }
            return t.prototype.read = function(t) {
                for (var e = 0; t > 0;) e <<= 1, e += this.e[this.f++], t--;
                return e
            }, t.prototype.readLongTail = function(t, e) {
                for (var n = t, i = e; this.e[this.f++];) n += 1 << i, i++;
                for (; i > 0;) i--, this.e[this.f++] && (n += 1 << i);
                return n
            }, t.prototype.readPartDuration = function() {
                return this.readLongTail(1, 2)
            }, t.prototype.readPinCount = function() {
                return this.readLongTail(1, 0)
            }, t.prototype.readPitchInterval = function() {
                return this.read(1) ? -this.readLongTail(1, 3) : this.readLongTail(1, 3)
            }, t
        }(),
        o = function() {
            function t() {
                this.e = []
            }
            return t.prototype.write = function(t, e) {
                for (t--; t >= 0;) this.e.push(e >>> t & 1), t--
            }, t.prototype.writeLongTail = function(t, e, n) {
                if (t > n) throw new Error("value out of bounds");
                n -= t;
                for (var i = e; n >= 1 << i;) this.e.push(1), n -= 1 << i, i++;
                for (this.e.push(0); i > 0;) i--, this.e.push(n >>> i & 1)
            }, t.prototype.writePartDuration = function(t) {
                this.writeLongTail(1, 2, t)
            }, t.prototype.writePinCount = function(t) {
                this.writeLongTail(1, 0, t)
            }, t.prototype.writePitchInterval = function(t) {
                0 > t ? (this.write(1, 1), this.writeLongTail(1, 3, -t)) : (this.write(1, 0), this.writeLongTail(1, 3, t))
            }, t.prototype.concat = function(t) {
                this.e = this.e.concat(t.e)
            }, t.prototype.encodeBase64 = function(t, e) {
                for (var n = 0; n < this.e.length; n += 6) {
                    var i = this.e[n] << 5 | this.e[n + 1] << 4 | this.e[n + 2] << 3 | this.e[n + 3] << 2 | this.e[n + 4] << 1 | this.e[n + 5];
                    e.push(t[i])
                }
                return e
            }, t.prototype.lengthBase64 = function() {
                return Math.ceil(this.e.length / 6)
            }, t
        }();
    t.makeNotePin = e, t.makeNote = n;
    var h = function() {
        function t() {
            this.notes = [], this.instrument = 0
        }
        return t.prototype.cloneNotes = function() {
            for (var t = [], i = 0, s = this.notes; i < s.length; i++) {
                var a = s[i],
                    r = n(-1, a.start, a.end, 3);
                r.pitches = a.pitches.concat(), r.pins = [];
                for (var o = 0, h = a.pins; o < h.length; o++) {
                    var l = h[o];
                    r.pins.push(e(l.interval, l.time, l.volume))
                }
                t.push(r)
            }
            return t
        }, t.prototype.reset = function() {
            this.notes.length = 0, this.instrument = 0
        }, t
    }();
    t.Pattern = h;
    var l = function() {
        function t(t) {
            this.frequency = 0, this.amplitude = 0, this.envelope = 0, this.reset(t)
        }
        return t.prototype.reset = function(t) {
            this.frequency = 0, this.amplitude = 1 >= t ? a.operatorAmplitudeMax : 0, this.envelope = 0 == t ? 0 : 1
        }, t.prototype.copy = function(t) {
            this.frequency = t.frequency, this.amplitude = t.amplitude, this.envelope = t.envelope
        }, t
    }();
    t.Operator = l;
    var c = function() {
        function t() {
            this.type = 0, this.wave = 1, this.filter = 1, this.transition = 1, this.effect = 0, this.chorus = 0, this.volume = 0, this.algorithm = 0, this.feedbackType = 0, this.feedbackAmplitude = 0, this.feedbackEnvelope = 1, this.operators = [];
            for (var t = 0; t < a.operatorCount; t++) this.operators.push(new l(t))
        }
        return t.prototype.reset = function() {
            this.type = 0, this.wave = 1, this.filter = 1, this.transition = 1, this.effect = 0, this.chorus = 0, this.volume = 0, this.algorithm = 0, this.feedbackType = 0, this.feedbackAmplitude = 0, this.feedbackEnvelope = 1;
            for (var t = 0; t < this.operators.length; t++) this.operators[t].reset(t)
        }, t.prototype.setTypeAndReset = function(t) {
            switch (this.type = t, t) {
                case 0:
                    this.wave = 1, this.filter = 1, this.transition = 1, this.effect = 0, this.chorus = 0, this.volume = 0;
                    break;
                case 1:
                    this.wave = 1, this.transition = 1, this.volume = 0;
                    break;
                case 2:
                    this.transition = 1, this.effect = 0, this.algorithm = 0, this.feedbackType = 0, this.feedbackAmplitude = 0, this.feedbackEnvelope = 1;
                    for (var e = 0; e < this.operators.length; e++) this.operators[e].reset(e)
            }
        }, t.prototype.copy = function(t) {
            this.type = t.type, this.wave = t.wave, this.filter = t.filter, this.transition = t.transition, this.effect = t.effect, this.chorus = t.chorus, this.volume = t.volume, this.algorithm = t.algorithm, this.feedbackType = t.feedbackType, this.feedbackAmplitude = t.feedbackAmplitude, this.feedbackEnvelope = t.feedbackEnvelope;
            for (var e = 0; e < this.operators.length; e++) this.operators[e].copy(t.operators[e])
        }, t
    }();
    t.Instrument = c;
    var u = function() {
        function t() {
            this.octave = 0, this.instruments = [], this.patterns = [], this.bars = []
        }
        return t
    }();
    t.Channel = u;
    var p = function() {
        function t(t) {
            this.channels = [], this.g = [], void 0 != t ? this.fromBase64String(t) : this.initToDefault(!0)
        }
        return t.prototype.getChannelCount = function() {
            return this.pitchChannelCount + this.drumChannelCount
        }, t.prototype.getChannelIsDrum = function(t) {
            return t >= this.pitchChannelCount
        }, t.prototype.getChannelColorDim = function(t) {
            return t < this.pitchChannelCount ? a.pitchChannelColorsDim[t] : a.drumChannelColorsDim[t - this.pitchChannelCount]
        }, t.prototype.getChannelColorBright = function(t) {
            return t < this.pitchChannelCount ? a.pitchChannelColorsBright[t] : a.drumChannelColorsBright[t - this.pitchChannelCount]
        }, t.prototype.getNoteColorDim = function(t) {
            return t < this.pitchChannelCount ? a.pitchNoteColorsDim[t] : a.drumNoteColorsDim[t - this.pitchChannelCount]
        }, t.prototype.getNoteColorBright = function(t) {
            return t < this.pitchChannelCount ? a.pitchNoteColorsBright[t] : a.drumNoteColorsBright[t - this.pitchChannelCount]
        }, t.prototype.initToDefault = function(t) {
            if (void 0 === t && (t = !0), this.scale = 0, this.key = a.keyNames.length - 1, this.loopStart = 0, this.loopLength = 4, this.tempo = 7, this.reverb = 0, this.beatsPerBar = 8, this.barCount = 16, this.patternsPerChannel = 8, this.partsPerBeat = 4, this.instrumentsPerChannel = 1, t) {
                this.pitchChannelCount = 3, this.drumChannelCount = 1;
                for (var e = 0; e < this.getChannelCount(); e++) {
                    this.channels.length <= e && (this.channels[e] = new u);
                    var n = this.channels[e];
                    n.octave = 3 - e;
                    for (var i = 0; i < this.patternsPerChannel; i++) n.patterns.length <= i ? n.patterns[i] = new h : n.patterns[i].reset();
                    n.patterns.length = this.patternsPerChannel;
                    for (var s = 0; s < this.instrumentsPerChannel; s++) n.instruments.length <= s ? n.instruments[s] = new c : n.instruments[s].reset();
                    n.instruments.length = this.instrumentsPerChannel;
                    for (var r = 0; r < this.barCount; r++) n.bars[r] = 1;
                    n.bars.length = this.barCount
                }
                this.channels.length = this.getChannelCount()
            }
        }, t.prototype.toBase64String = function() {
            var e, n = [],
                i = t.h;
            n.push(i[t.i]), n.push(110, i[this.pitchChannelCount], i[this.drumChannelCount]), n.push(115, i[this.scale]), n.push(107, i[this.key]), n.push(108, i[this.loopStart >> 6], i[63 & this.loopStart]), n.push(101, i[this.loopLength - 1 >> 6], i[this.loopLength - 1 & 63]), n.push(116, i[this.tempo]), n.push(109, i[this.reverb]), n.push(97, i[this.beatsPerBar - 1]), n.push(103, i[this.barCount - 1 >> 6], i[this.barCount - 1 & 63]), n.push(106, i[this.patternsPerChannel - 1]), n.push(105, i[this.instrumentsPerChannel - 1]), n.push(114, i[a.partCounts.indexOf(this.partsPerBeat)]), n.push(111);
            for (var s = 0; s < this.getChannelCount(); s++) n.push(i[this.channels[s].octave]);
            for (var s = 0; s < this.getChannelCount(); s++)
                for (var r = 0; r < this.instrumentsPerChannel; r++) {
                    var h = this.channels[s].instruments[r];
                    if (s < this.pitchChannelCount)
                        if (n.push(84, i[h.type]), 0 == h.type) n.push(119, i[h.wave]), n.push(102, i[h.filter]), n.push(100, i[h.transition]), n.push(99, i[h.effect]), n.push(104, i[h.chorus]), n.push(118, i[h.volume]);
                        else {
                            if (1 != h.type) throw new Error("Unknown instrument type.");
                            n.push(100, i[h.transition]), n.push(99, i[h.effect]), n.push(65, i[h.algorithm]), n.push(70, i[h.feedbackType]), n.push(66, i[h.feedbackAmplitude]), n.push(86, i[h.feedbackEnvelope]), n.push(81);
                            for (var l = 0; l < a.operatorCount; l++) n.push(i[h.operators[l].frequency]);
                            n.push(80);
                            for (var l = 0; l < a.operatorCount; l++) n.push(i[h.operators[l].amplitude]);
                            n.push(69);
                            for (var l = 0; l < a.operatorCount; l++) n.push(i[h.operators[l].envelope])
                        } else n.push(84, i[2]), n.push(119, i[h.wave]), n.push(100, i[h.transition]), n.push(118, i[h.volume])
                }
            n.push(98), e = new o;
            for (var c = 0; 1 << c < this.patternsPerChannel + 1;) c++;
            for (var s = 0; s < this.getChannelCount(); s++)
                for (var r = 0; r < this.barCount; r++) e.write(c, this.channels[s].bars[r]);
            e.encodeBase64(i, n), n.push(112), e = new o;
            for (var u = 0; 1 << u < this.instrumentsPerChannel;) u++;
            for (var s = 0; s < this.getChannelCount(); s++) {
                for (var p = this.getChannelIsDrum(s), d = p ? 0 : 12 * this.channels[s].octave, f = (p ? 4 : 12) + d, g = p ? [4, 6, 7, 2, 3, 8, 0, 10] : [12, 19, 24, 31, 36, 7, 0], m = [], r = 0; r < g.length; r++) g[r] += d;
                for (var b = 0, v = this.channels[s].patterns; b < v.length; b++) {
                    var C = v[b];
                    if (e.write(u, C.instrument), C.notes.length > 0) {
                        e.write(1, 1);
                        for (var y = 0, w = 0, x = C.notes; w < x.length; w++) {
                            var Q = x[w];
                            Q.start > y && (e.write(2, 0), e.writePartDuration(Q.start - y));
                            for (var N = new o, r = 1; r < Q.pitches.length; r++) N.write(1, 1);
                            Q.pitches.length < 4 && N.write(1, 0), N.writePinCount(Q.pins.length - 1), N.write(2, Q.pins[0].volume);
                            for (var A = 0, E = Q.pitches[0], P = E, M = [], r = 1; r < Q.pins.length; r++) {
                                var k = Q.pins[r],
                                    B = E + k.interval;
                                P != B ? (N.write(1, 1), M.push(B), P = B) : N.write(1, 0), N.writePartDuration(k.time - A), A = k.time, N.write(2, k.volume)
                            }
                            var S = String.fromCharCode.apply(null, N.encodeBase64(i, [])),
                                L = m.indexOf(S); - 1 == L ? (e.write(2, 1), e.concat(N)) : (e.write(1, 1), e.writeLongTail(0, 0, L), m.splice(L, 1)), m.unshift(S), m.length > 10 && m.pop();
                            for (var I = Q.pitches.concat(M), r = 0; r < I.length; r++) {
                                var G = I[r],
                                    D = g.indexOf(G);
                                if (-1 == D) {
                                    var R = 0,
                                        T = f;
                                    if (G > T)
                                        for (; T != G;) T++, -1 == g.indexOf(T) && R++;
                                    else
                                        for (; T != G;) T--, -1 == g.indexOf(T) && R--;
                                    e.write(1, 0), e.writePitchInterval(R)
                                } else e.write(1, 1), e.write(3, D), g.splice(D, 1);
                                g.unshift(G), g.length > 8 && g.pop(), f = r == Q.pitches.length - 1 ? Q.pitches[0] : G
                            }
                            y = Q.end
                        }
                        y < this.beatsPerBar * this.partsPerBeat && (e.write(2, 0), e.writePartDuration(this.beatsPerBar * this.partsPerBeat - y))
                    } else e.write(1, 0)
                }
            }
            for (var F = e.lengthBase64(), U = []; F > 0;) U.unshift(i[63 & F]), F >>= 6;
            if (n.push(i[U.length]), Array.prototype.push.apply(n, U), e.encodeBase64(i, n), n.length >= 65535) throw new Error("Song hash code too long.");
            return String.fromCharCode.apply(null, n)
        }, t.prototype.fromBase64String = function(i) {
            if (null == i || "" == i) return void this.initToDefault(!0);
            for (var s = 0; i.charCodeAt(s) <= 32;) s++;
            if (35 == i.charCodeAt(s) && s++, 123 == i.charCodeAt(s)) return void this.fromJsonObject(JSON.parse(0 == s ? i : i.substring(s)));
            var o = t.j[i.charCodeAt(s++)];
            if (!(-1 == o || o > t.i || o < t.k)) {
                var l = 3 > o,
                    p = 4 > o,
                    d = 5 > o,
                    f = 6 > o,
                    g = t.j;
                if (this.initToDefault(f), l) {
                    for (var m = 0, b = this.channels; m < b.length; m++) {
                        var v = b[m];
                        v.instruments[0].transition = 0
                    }
                    this.channels[3].instruments[0].wave = 0
                }
                for (var C = 0, y = -1; s < i.length;) {
                    var w = i.charCodeAt(s++),
                        v = void 0;
                    if (110 == w) {
                        this.pitchChannelCount = g[i.charCodeAt(s++)], this.drumChannelCount = g[i.charCodeAt(s++)], this.pitchChannelCount = t.l(a.pitchChannelCountMin, a.pitchChannelCountMax + 1, this.pitchChannelCount), this.drumChannelCount = t.l(a.drumChannelCountMin, a.drumChannelCountMax + 1, this.drumChannelCount);
                        for (var x = this.channels.length; x < this.getChannelCount(); x++) this.channels[x] = new u;
                        this.channels.length = this.getChannelCount()
                    } else if (115 == w) this.scale = g[i.charCodeAt(s++)], l && 10 == this.scale && (this.scale = 11);
                    else if (107 == w) this.key = g[i.charCodeAt(s++)];
                    else if (108 == w) d ? this.loopStart = g[i.charCodeAt(s++)] : this.loopStart = (g[i.charCodeAt(s++)] << 6) + g[i.charCodeAt(s++)];
                    else if (101 == w) d ? this.loopLength = g[i.charCodeAt(s++)] : this.loopLength = (g[i.charCodeAt(s++)] << 6) + g[i.charCodeAt(s++)] + 1;
                    else if (116 == w) p ? this.tempo = [1, 4, 7, 10][g[i.charCodeAt(s++)]] : this.tempo = g[i.charCodeAt(s++)], this.tempo = t.l(0, a.tempoSteps, this.tempo);
                    else if (109 == w) this.reverb = g[i.charCodeAt(s++)], this.reverb = t.l(0, a.reverbRange, this.reverb);
                    else if (97 == w) l ? this.beatsPerBar = [6, 7, 8, 9, 10][g[i.charCodeAt(s++)]] : this.beatsPerBar = g[i.charCodeAt(s++)] + 1, this.beatsPerBar = Math.max(a.beatsPerBarMin, Math.min(a.beatsPerBarMax, this.beatsPerBar));
                    else if (103 == w) {
                        this.barCount = (g[i.charCodeAt(s++)] << 6) + g[i.charCodeAt(s++)] + 1, this.barCount = Math.max(a.barCountMin, Math.min(a.barCountMax, this.barCount));
                        for (var Q = 0; Q < this.getChannelCount(); Q++) {
                            for (var N = this.channels[Q].bars.length; N < this.barCount; N++) this.channels[Q].bars[N] = 1;
                            this.channels[Q].bars.length = this.barCount
                        }
                    } else if (106 == w) {
                        this.patternsPerChannel = g[i.charCodeAt(s++)] + 1, this.patternsPerChannel = Math.max(a.patternsPerChannelMin, Math.min(a.patternsPerChannelMax, this.patternsPerChannel));
                        for (var A = 0; A < this.getChannelCount(); A++) {
                            for (var E = this.channels[A].patterns.length; E < this.patternsPerChannel; E++) this.channels[A].patterns[E] = new h;
                            this.channels[A].patterns.length = this.patternsPerChannel
                        }
                    } else if (105 == w) {
                        this.instrumentsPerChannel = g[i.charCodeAt(s++)] + 1, this.instrumentsPerChannel = Math.max(a.instrumentsPerChannelMin, Math.min(a.instrumentsPerChannelMax, this.instrumentsPerChannel));
                        for (var P = 0; P < this.getChannelCount(); P++) {
                            for (var M = this.channels[P].instruments.length; M < this.instrumentsPerChannel; M++) this.channels[P].instruments[M] = new c;
                            this.channels[P].instruments.length = this.instrumentsPerChannel
                        }
                    } else if (114 == w) this.partsPerBeat = a.partCounts[g[i.charCodeAt(s++)]];
                    else if (111 == w)
                        if (l) v = g[i.charCodeAt(s++)], this.channels[v].octave = t.l(0, 5, g[i.charCodeAt(s++)]);
                        else
                            for (v = 0; v < this.getChannelCount(); v++) this.channels[v].octave = t.l(0, 5, g[i.charCodeAt(s++)]);
                    else if (84 == w) {
                        y++, y >= this.instrumentsPerChannel && (C++, y = 0);
                        var M = this.channels[C].instruments[y];
                        M.setTypeAndReset(t.l(0, 2, g[i.charCodeAt(s++)]))
                    } else if (119 == w)
                        if (l) v = g[i.charCodeAt(s++)], this.channels[v].instruments[0].wave = t.l(0, a.waveNames.length, g[i.charCodeAt(s++)]);
                        else if (f)
                        for (v = 0; v < this.getChannelCount(); v++)
                            for (var k = v >= this.pitchChannelCount, B = 0; B < this.instrumentsPerChannel; B++) this.channels[v].instruments[B].wave = t.l(0, k ? a.drumNames.length : a.waveNames.length, g[i.charCodeAt(s++)]);
                    else {
                        var k = C >= this.pitchChannelCount;
                        this.channels[C].instruments[y].wave = t.l(0, k ? a.drumNames.length : a.waveNames.length, g[i.charCodeAt(s++)])
                    } else if (102 == w)
                        if (l) v = g[i.charCodeAt(s++)], this.channels[v].instruments[0].filter = [1, 3, 4, 5][t.l(0, a.filterNames.length, g[i.charCodeAt(s++)])];
                        else if (f)
                        for (v = 0; v < this.getChannelCount(); v++)
                            for (var B = 0; B < this.instrumentsPerChannel; B++) this.channels[v].instruments[B].filter = t.l(0, a.filterNames.length, g[i.charCodeAt(s++)] + 1);
                    else this.channels[C].instruments[y].filter = t.l(0, a.filterNames.length, g[i.charCodeAt(s++)]);
                    else if (100 == w)
                        if (l) v = g[i.charCodeAt(s++)], this.channels[v].instruments[0].transition = t.l(0, a.transitionNames.length, g[i.charCodeAt(s++)]);
                        else if (f)
                        for (v = 0; v < this.getChannelCount(); v++)
                            for (var B = 0; B < this.instrumentsPerChannel; B++) this.channels[v].instruments[B].transition = t.l(0, a.transitionNames.length, g[i.charCodeAt(s++)]);
                    else this.channels[C].instruments[y].transition = t.l(0, a.transitionNames.length, g[i.charCodeAt(s++)]);
                    else if (99 == w)
                        if (l) {
                            v = g[i.charCodeAt(s++)];
                            var S = t.l(0, a.effectNames.length, g[i.charCodeAt(s++)]);
                            1 == S ? S = 3 : 3 == S && (S = 5), this.channels[v].instruments[0].effect = S
                        } else if (f)
                        for (v = 0; v < this.getChannelCount(); v++)
                            for (var B = 0; B < this.instrumentsPerChannel; B++) this.channels[v].instruments[B].effect = t.l(0, a.effectNames.length, g[i.charCodeAt(s++)]);
                    else this.channels[C].instruments[y].effect = t.l(0, a.effectNames.length, g[i.charCodeAt(s++)]);
                    else if (104 == w)
                        if (l) v = g[i.charCodeAt(s++)], this.channels[v].instruments[0].chorus = t.l(0, a.chorusNames.length, g[i.charCodeAt(s++)]);
                        else if (f)
                        for (v = 0; v < this.getChannelCount(); v++)
                            for (var B = 0; B < this.instrumentsPerChannel; B++) this.channels[v].instruments[B].chorus = t.l(0, a.chorusNames.length, g[i.charCodeAt(s++)]);
                    else this.channels[C].instruments[y].chorus = t.l(0, a.chorusNames.length, g[i.charCodeAt(s++)]);
                    else if (118 == w)
                        if (l) v = g[i.charCodeAt(s++)], this.channels[v].instruments[0].volume = t.l(0, a.volumeNames.length, g[i.charCodeAt(s++)]);
                        else if (f)
                        for (v = 0; v < this.getChannelCount(); v++)
                            for (var B = 0; B < this.instrumentsPerChannel; B++) this.channels[v].instruments[B].volume = t.l(0, a.volumeNames.length, g[i.charCodeAt(s++)]);
                    else this.channels[C].instruments[y].volume = t.l(0, a.volumeNames.length, g[i.charCodeAt(s++)]);
                    else if (65 == w) this.channels[C].instruments[y].algorithm = t.l(0, a.operatorAlgorithmNames.length, g[i.charCodeAt(s++)]);
                    else if (70 == w) this.channels[C].instruments[y].feedbackType = t.l(0, a.operatorFeedbackNames.length, g[i.charCodeAt(s++)]);
                    else if (66 == w) this.channels[C].instruments[y].feedbackAmplitude = t.l(0, a.operatorAmplitudeMax + 1, g[i.charCodeAt(s++)]);
                    else if (86 == w) this.channels[C].instruments[y].feedbackEnvelope = t.l(0, a.operatorEnvelopeNames.length, g[i.charCodeAt(s++)]);
                    else if (81 == w)
                        for (var L = 0; L < a.operatorCount; L++) this.channels[C].instruments[y].operators[L].frequency = t.l(0, a.operatorFrequencyNames.length, g[i.charCodeAt(s++)]);
                    else if (80 == w)
                        for (var L = 0; L < a.operatorCount; L++) this.channels[C].instruments[y].operators[L].amplitude = t.l(0, a.operatorAmplitudeMax + 1, g[i.charCodeAt(s++)]);
                    else if (69 == w)
                        for (var L = 0; L < a.operatorCount; L++) this.channels[C].instruments[y].operators[L].envelope = t.l(0, a.operatorEnvelopeNames.length, g[i.charCodeAt(s++)]);
                    else if (98 == w) {
                        var I = void 0;
                        if (l) {
                            v = g[i.charCodeAt(s++)];
                            var G = g[i.charCodeAt(s++)];
                            I = Math.ceil(.5 * G);
                            for (var D = new r(g, i, s, s + I), B = 0; G > B; B++) this.channels[v].bars[B] = D.read(3) + 1
                        } else if (d) {
                            for (var R = 0; 1 << R < this.patternsPerChannel;) R++;
                            I = Math.ceil(this.getChannelCount() * this.barCount * R / 6);
                            var D = new r(g, i, s, s + I);
                            for (v = 0; v < this.getChannelCount(); v++)
                                for (var B = 0; B < this.barCount; B++) this.channels[v].bars[B] = D.read(R) + 1
                        } else {
                            for (var R = 0; 1 << R < this.patternsPerChannel + 1;) R++;
                            I = Math.ceil(this.getChannelCount() * this.barCount * R / 6);
                            var D = new r(g, i, s, s + I);
                            for (v = 0; v < this.getChannelCount(); v++)
                                for (var B = 0; B < this.barCount; B++) this.channels[v].bars[B] = D.read(R)
                        }
                        s += I
                    } else if (112 == w) {
                        var T = 0;
                        if (l) v = g[i.charCodeAt(s++)], s++, T = g[i.charCodeAt(s++)], T <<= 6, T += g[i.charCodeAt(s++)];
                        else {
                            v = 0;
                            for (var F = g[i.charCodeAt(s++)]; F > 0;) T <<= 6, T += g[i.charCodeAt(s++)], F--
                        }
                        var D = new r(g, i, s, s + T);
                        s += T;
                        for (var U = 0; 1 << U < this.instrumentsPerChannel;) U++;
                        for (;;) {
                            for (var V = this.getChannelIsDrum(v), Z = V ? 0 : 12 * this.channels[v].octave, Y = null, O = null, W = (V ? 4 : 12) + Z, j = V ? [4, 6, 7, 2, 3, 8, 0, 10] : [12, 19, 24, 31, 36, 7, 0], z = [], B = 0; B < j.length; B++) j[B] += Z;
                            for (var B = 0; B < this.patternsPerChannel; B++) {
                                var J = this.channels[v].patterns[B];
                                if (J.reset(), J.instrument = D.read(U), l || 0 != D.read(1))
                                    for (var X = 0, q = J.notes; X < this.beatsPerBar * this.partsPerBeat;) {
                                        var H = 1 == D.read(1),
                                            K = !1,
                                            _ = 0;
                                        if (H ? _ = D.readLongTail(0, 0) : K = 1 == D.read(1), H || K) {
                                            var $ = void 0,
                                                tt = void 0,
                                                et = void 0;
                                            if (H) $ = z[_], z.splice(_, 1);
                                            else {
                                                for ($ = {}, $.pitchCount = 1; $.pitchCount < 4 && 1 == D.read(1);) $.pitchCount++;
                                                $.pinCount = D.readPinCount(), $.initialVolume = D.read(2), $.pins = [], $.length = 0, $.bendCount = 0;
                                                for (var nt = 0; nt < $.pinCount; nt++) tt = {}, tt.pitchBend = 1 == D.read(1), tt.pitchBend && $.bendCount++, $.length += D.readPartDuration(), tt.time = $.length, tt.volume = D.read(2), $.pins.push(tt)
                                            }
                                            z.unshift($), z.length > 10 && z.pop(), Y = n(0, X, X + $.length, $.initialVolume), Y.pitches = [], Y.pins.length = 1;
                                            for (var it = [], nt = 0; nt < $.pitchCount + $.bendCount; nt++) {
                                                var st = 1 == D.read(1);
                                                if (st) {
                                                    var at = D.read(3);
                                                    et = j[at], j.splice(at, 1)
                                                } else {
                                                    var rt = D.readPitchInterval();
                                                    et = W;
                                                    for (var ot = rt; ot > 0;) {
                                                        for (et++; - 1 != j.indexOf(et);) et++;
                                                        ot--
                                                    }
                                                    for (; 0 > ot;) {
                                                        for (et--; - 1 != j.indexOf(et);) et--;
                                                        ot++
                                                    }
                                                }
                                                j.unshift(et), j.length > 8 && j.pop(), nt < $.pitchCount ? Y.pitches.push(et) : it.push(et), W = nt == $.pitchCount - 1 ? Y.pitches[0] : et
                                            }
                                            it.unshift(Y.pitches[0]);
                                            for (var ht = 0, lt = $.pins; ht < lt.length; ht++) {
                                                var ct = lt[ht];
                                                ct.pitchBend && it.shift(), O = e(it[0] - Y.pitches[0], ct.time, ct.volume), Y.pins.push(O)
                                            }
                                            X = Y.end, q.push(Y)
                                        } else {
                                            var ut = D.readPartDuration();
                                            X += ut
                                        }
                                    }
                            }
                            if (l) break;
                            if (v++, v >= this.getChannelCount()) break
                        }
                    }
                }
            }
        }, t.prototype.toJsonObject = function(e, n, i) {
            void 0 === e && (e = !0), void 0 === n && (n = 1), void 0 === i && (i = !0);
            for (var s = [], r = 0; r < this.getChannelCount(); r++) {
                for (var o = [], h = this.getChannelIsDrum(r), l = 0; l < this.instrumentsPerChannel; l++) {
                    var c = this.channels[r].instruments[l];
                    if (h) o.push({
                        type: a.instrumentTypeNames[2],
                        volume: 20 * (5 - c.volume),
                        wave: a.drumNames[c.wave],
                        transition: a.transitionNames[c.transition]
                    });
                    else if (0 == c.type) o.push({
                        type: a.instrumentTypeNames[c.type],
                        volume: 20 * (5 - c.volume),
                        wave: a.waveNames[c.wave],
                        transition: a.transitionNames[c.transition],
                        filter: a.filterNames[c.filter],
                        chorus: a.chorusNames[c.chorus],
                        effect: a.effectNames[c.effect]
                    });
                    else {
                        if (1 != c.type) throw new Error("Unrecognized instrument type");
                        for (var u = [], p = 0, d = c.operators; p < d.length; p++) {
                            var f = d[p];
                            u.push({
                                frequency: a.operatorFrequencyNames[f.frequency],
                                amplitude: f.amplitude,
                                envelope: a.operatorEnvelopeNames[f.envelope]
                            })
                        }
                        o.push({
                            type: a.instrumentTypeNames[c.type],
                            transition: a.transitionNames[c.transition],
                            effect: a.effectNames[c.effect],
                            algorithm: a.operatorAlgorithmNames[c.algorithm],
                            feedbackType: a.operatorFeedbackNames[c.feedbackType],
                            feedbackAmplitude: c.feedbackAmplitude,
                            feedbackEnvelope: a.operatorEnvelopeNames[c.feedbackEnvelope],
                            operators: u
                        })
                    }
                }
                for (var g = [], m = 0, b = this.channels[r].patterns; m < b.length; m++) {
                    for (var v = b[m], C = [], y = 0, w = v.notes; y < w.length; y++) {
                        for (var x = w[y], Q = [], N = 0, A = x.pins; N < A.length; N++) {
                            var E = A[N];
                            Q.push({
                                tick: E.time + x.start,
                                pitchBend: E.interval,
                                volume: Math.round(100 * E.volume / 3)
                            })
                        }
                        C.push({
                            pitches: x.pitches,
                            points: Q
                        })
                    }
                    g.push({
                        instrument: v.instrument + 1,
                        notes: C
                    })
                }
                var P = [];
                if (e)
                    for (var l = 0; l < this.loopStart; l++) P.push(this.channels[r].bars[l]);
                for (var M = 0; n > M; M++)
                    for (var l = this.loopStart; l < this.loopStart + this.loopLength; l++) P.push(this.channels[r].bars[l]);
                if (i)
                    for (var l = this.loopStart + this.loopLength; l < this.barCount; l++) P.push(this.channels[r].bars[l]);
                s.push({
                    type: h ? "drum" : "pitch",
                    octaveScrollBar: this.channels[r].octave,
                    instruments: o,
                    patterns: g,
                    sequence: P
                })
            }
            return {
                format: t.m,
                version: t.i,
                scale: a.scaleNames[this.scale],
                key: a.keyNames[this.key],
                introBars: this.loopStart,
                loopBars: this.loopLength,
                beatsPerBar: this.beatsPerBar,
                ticksPerBeat: this.partsPerBeat,
                beatsPerMinute: this.getBeatsPerMinute(),
                reverb: this.reverb,
                channels: s
            }
        }, t.prototype.fromJsonObject = function(i) {
            if (this.initToDefault(!0), i) {
                var s = i.version;
                if (!(s > t.m)) {
                    if (this.scale = 11, void 0 != i.scale) {
                        var r = {
                                "romani :)": 8,
                                "romani :(": 9
                            },
                            o = void 0 != r[i.scale] ? r[i.scale] : a.scaleNames.indexOf(i.scale); - 1 != o && (this.scale = o)
                    }
                    if (void 0 != i.key)
                        if ("number" == typeof i.key) this.key = a.keyNames.length - 1 - (i.key + 1200 >>> 0) % a.keyNames.length;
                        else if ("string" == typeof i.key) {
                        var l = i.key,
                            p = l.charAt(0).toUpperCase(),
                            d = l.charAt(1).toLowerCase(),
                            f = {
                                C: 11,
                                D: 9,
                                E: 7,
                                F: 6,
                                G: 4,
                                A: 2,
                                B: 0
                            },
                            g = {
                                "#": -1,
                                "â™¯": -1,
                                b: 1,
                                "â™­": 1
                            },
                            m = f[p],
                            b = g[d];
                        void 0 != m && (void 0 != b && (m += b), 0 > m && (m += 12), m %= 12, this.key = m)
                    }
                    if (void 0 != i.beatsPerMinute) {
                        var v = 0 | i.beatsPerMinute;
                        this.tempo = Math.round(4 + 9 * Math.log(v / 120) / Math.LN2), this.tempo = t.l(0, a.tempoSteps, this.tempo)
                    }
                    void 0 != i.reverb && (this.reverb = t.l(0, a.reverbRange, 0 | i.reverb)), void 0 != i.beatsPerBar && (this.beatsPerBar = Math.max(a.beatsPerBarMin, Math.min(a.beatsPerBarMax, 0 | i.beatsPerBar))), void 0 != i.ticksPerBeat && (this.partsPerBeat = 0 | i.ticksPerBeat, -1 == a.partCounts.indexOf(this.partsPerBeat) && (this.partsPerBeat = a.partCounts[a.partCounts.length - 1]));
                    var C = 1,
                        y = 1,
                        w = 1;
                    if (i.channels)
                        for (var x = 0, Q = i.channels; x < Q.length; x++) {
                            var N = Q[x];
                            N.instruments && (C = Math.max(C, 0 | N.instruments.length)), N.patterns && (y = Math.max(y, 0 | N.patterns.length)), N.sequence && (w = Math.max(w, 0 | N.sequence.length))
                        }
                    this.instrumentsPerChannel = C, this.patternsPerChannel = y, this.barCount = w, void 0 != i.introBars && (this.loopStart = t.l(0, this.barCount, 0 | i.introBars)), void 0 != i.loopBars && (this.loopLength = t.l(1, this.barCount - this.loopStart + 1, 0 | i.loopBars));
                    var A = 0,
                        E = 0;
                    if (i.channels)
                        for (var P = 0; P < i.channels.length; P++) {
                            var N = i.channels[P];
                            this.channels.length <= P && (this.channels[P] = new u),
                                void 0 != N.octaveScrollBar && (this.channels[P].octave = t.l(0, 5, 0 | N.octaveScrollBar));
                            for (var M = this.channels[P].instruments.length; M < this.instrumentsPerChannel; M++) this.channels[P].instruments[M] = new c;
                            this.channels[P].instruments.length = this.instrumentsPerChannel;
                            for (var M = this.channels[P].patterns.length; M < this.patternsPerChannel; M++) this.channels[P].patterns[M] = new h;
                            this.channels[P].patterns.length = this.patternsPerChannel;
                            for (var M = 0; M < this.barCount; M++) this.channels[P].bars[M] = 1;
                            this.channels[P].bars.length = this.barCount;
                            var k = !1;
                            k = N.type ? "drum" == N.type : P >= 3, k ? E++ : A++;
                            for (var M = 0; M < this.instrumentsPerChannel; M++) {
                                var B = this.channels[P].instruments[M],
                                    S = void 0;
                                N.instruments && (S = N.instruments[M]), void 0 == S && (S = {});
                                var L = {
                                        binary: 0
                                    },
                                    I = S.transition || S.envelope;
                                if (B.transition = void 0 != L[I] ? L[I] : a.transitionNames.indexOf(I), -1 == B.transition && (B.transition = 1), k) B.type = a.instrumentTypeNames.indexOf(S.type), -1 == B.type && (B.type = 2), void 0 != S.volume ? B.volume = t.l(0, a.volumeNames.length, Math.round(5 - (0 | S.volume) / 20)) : B.volume = 0, B.wave = a.drumNames.indexOf(S.wave), -1 == B.wave && (B.wave = 1);
                                else if (B.type = a.instrumentTypeNames.indexOf(S.type), -1 == B.type && (B.type = 0), 0 == B.type) {
                                    void 0 != S.volume ? B.volume = t.l(0, a.volumeNames.length, Math.round(5 - (0 | S.volume) / 20)) : B.volume = 0, B.wave = a.waveNames.indexOf(S.wave), -1 == B.wave && (B.wave = 1);
                                    var G = {
                                        "sustain sharp": 1,
                                        "sustain medium": 2,
                                        "sustain soft": 3,
                                        "decay sharp": 4
                                    };
                                    B.filter = void 0 != G[S.filter] ? G[S.filter] : a.filterNames.indexOf(S.filter), -1 == B.filter && (B.filter = 0), B.chorus = a.chorusNames.indexOf(S.chorus), -1 == B.chorus && (B.chorus = 0), B.effect = a.effectNames.indexOf(S.effect), -1 == B.effect && (B.effect = 0)
                                } else {
                                    if (1 != B.type) throw new Error("Unrecognized instrument type.");
                                    B.effect = a.effectNames.indexOf(S.effect), -1 == B.effect && (B.effect = 0), B.algorithm = a.operatorAlgorithmNames.indexOf(S.algorithm), -1 == B.algorithm && (B.algorithm = 0), B.feedbackType = a.operatorFeedbackNames.indexOf(S.feedbackType), -1 == B.feedbackType && (B.feedbackType = 0), void 0 != S.feedbackAmplitude ? B.feedbackAmplitude = t.l(0, a.operatorAmplitudeMax + 1, 0 | S.feedbackAmplitude) : B.feedbackAmplitude = 0, B.feedbackEnvelope = a.operatorEnvelopeNames.indexOf(S.feedbackEnvelope), -1 == B.feedbackEnvelope && (B.feedbackEnvelope = 0);
                                    for (var D = 0; D < a.operatorCount; D++) {
                                        var R = B.operators[D],
                                            T = void 0;
                                        S.operators && (T = S.operators[D]), void 0 == T && (T = {}), R.frequency = a.operatorFrequencyNames.indexOf(T.frequency), -1 == R.frequency && (R.frequency = 0), void 0 != T.amplitude ? R.amplitude = t.l(0, a.operatorAmplitudeMax + 1, 0 | T.amplitude) : R.amplitude = 0, R.envelope = a.operatorEnvelopeNames.indexOf(T.envelope), -1 == R.envelope && (R.envelope = 0)
                                    }
                                }
                            }
                            for (var M = 0; M < this.patternsPerChannel; M++) {
                                var F = this.channels[P].patterns[M],
                                    U = void 0;
                                if (N.patterns && (U = N.patterns[M]), void 0 != U && (F.instrument = t.l(0, this.instrumentsPerChannel, (0 | U.instrument) - 1), U.notes && U.notes.length > 0))
                                    for (var V = Math.min(this.beatsPerBar * this.partsPerBeat, U.notes.length >>> 0), Z = 0, D = 0; D < U.notes.length && !(D >= V); D++) {
                                        var Y = U.notes[D];
                                        if (Y && Y.pitches && Y.pitches.length >= 1 && Y.points && Y.points.length >= 2) {
                                            var O = n(0, 0, 0, 0);
                                            O.pitches = [], O.pins = [];
                                            for (var W = 0; W < Y.pitches.length; W++) {
                                                var j = 0 | Y.pitches[W];
                                                if (-1 == O.pitches.indexOf(j) && (O.pitches.push(j), O.pitches.length >= 4)) break
                                            }
                                            if (!(O.pitches.length < 1)) {
                                                for (var z = Z, J = 0, W = 0; W < Y.points.length; W++) {
                                                    var X = Y.points[W];
                                                    if (void 0 != X && void 0 != X.tick) {
                                                        var q = void 0 == X.pitchBend ? 0 : 0 | X.pitchBend,
                                                            H = 0 | X.tick,
                                                            K = void 0 == X.volume ? 3 : Math.max(0, Math.min(3, Math.round(3 * (0 | X.volume) / 100)));
                                                        if (!(H > this.beatsPerBar * this.partsPerBeat)) {
                                                            if (0 == O.pins.length) {
                                                                if (z > H) continue;
                                                                O.start = H, J = q
                                                            } else if (z >= H) continue;
                                                            z = H, O.pins.push(e(q - J, H - O.start, K))
                                                        }
                                                    }
                                                }
                                                if (!(O.pins.length < 2)) {
                                                    O.end = O.pins[O.pins.length - 1].time + O.start;
                                                    for (var _ = k ? a.drumCount - 1 : a.maxPitch, $ = _, tt = 0, W = 0; W < O.pitches.length; W++) O.pitches[W] += J, (O.pitches[W] < 0 || O.pitches[W] > _) && (O.pitches.splice(W, 1), W--), O.pitches[W] < $ && ($ = O.pitches[W]), O.pitches[W] > tt && (tt = O.pitches[W]);
                                                    if (!(O.pitches.length < 1)) {
                                                        for (var W = 0; W < O.pins.length; W++) {
                                                            var et = O.pins[W];
                                                            et.interval + $ < 0 && (et.interval = -$), et.interval + tt > _ && (et.interval = _ - tt), W >= 2 && et.interval == O.pins[W - 1].interval && et.interval == O.pins[W - 2].interval && et.volume == O.pins[W - 1].volume && et.volume == O.pins[W - 2].volume && (O.pins.splice(W - 1, 1), W--)
                                                        }
                                                        F.notes.push(O), Z = O.end
                                                    }
                                                }
                                            }
                                        }
                                    }
                            }
                            for (var M = 0; M < this.barCount; M++) this.channels[P].bars[M] = N.sequence ? Math.min(this.patternsPerChannel, N.sequence[M] >>> 0) : 0
                        }
                    this.pitchChannelCount = A, this.drumChannelCount = E, this.channels.length = this.getChannelCount()
                }
            }
        }, t.l = function(t, e, n) {
            return e -= 1, e >= n ? n >= t ? n : t : e
        }, t.prototype.getPattern = function(t, e) {
            var n = this.channels[t].bars[e];
            return 0 == n ? null : this.channels[t].patterns[n - 1]
        }, t.prototype.getPatternInstrument = function(t, e) {
            var n = this.getPattern(t, e);
            return null == n ? 0 : n.instrument
        }, t.prototype.getBeatsPerMinute = function() {
            return Math.round(120 * Math.pow(2, (-4 + this.tempo) / 9))
        }, t.prototype.getChannelFingerprint = function(t, e) {
            var n = 0;
            if (!(e < this.pitchChannelCount)) return "d";
            if (0 == t.type) return "c";
            if (1 != t.type) throw new Error("Unknown instrument type.");
            return this.g[n++] = "f", this.g[n++] = t.algorithm, this.g[n++] = t.feedbackType, this.g.length = n, this.g.join("")
        }, t
    }();
    p.m = "BeepBox", p.k = 2, p.i = 6, p.j = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 62, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 0, 0, 0, 0, 63, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 0, 0, 0, 0, 0], p.h = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 45, 95], t.Song = p;
    var d = function() {
            function t() {
                this.active = !1, this.sample = 0, this.phases = [], this.phaseDeltas = [], this.volumeStarts = [], this.volumeDeltas = [], this.phaseDeltaScale = 0, this.filter = 0, this.filterScale = 0, this.vibratoScale = 0, this.harmonyMult = 0, this.harmonyVolumeMult = 1, this.feedbackOutputs = [], this.feedbackMult = 0, this.feedbackDelta = 0, this.reset()
            }
            return t.prototype.reset = function() {
                for (var t = 0; t < a.operatorCount; t++) this.phases[t] = 0, this.feedbackOutputs[t] = 0;
                this.sample = 0
            }, t
        }(),
        f = function() {
            function e(t) {
                void 0 === t && (t = null);
                var e = this;
                this.samplesPerSecond = 44100, this.effectDuration = .14, this.effectAngle = 2 * Math.PI / (this.effectDuration * this.samplesPerSecond), this.effectYMult = 2 * Math.cos(this.effectAngle), this.limitDecay = 1 / (2 * this.samplesPerSecond), this.song = null, this.pianoPressed = !1, this.pianoPitch = [0], this.pianoChannel = 0, this.enableIntro = !0, this.enableOutro = !1, this.loopCount = -1, this.volume = 1, this.playheadInternal = 0, this.bar = 0, this.beat = 0, this.part = 0, this.arpeggio = 0, this.arpeggioSampleCountdown = 0, this.paused = !0, this.tones = [], this.stillGoing = !1, this.effectPhase = 0, this.limit = 0, this.samplesForReverb = null, this.reverbDelayLine = new Float32Array(16384), this.reverbDelayPos = 0, this.reverbFeedback0 = 0, this.reverbFeedback1 = 0, this.reverbFeedback2 = 0, this.reverbFeedback3 = 0, this.audioCtx = null, this.scriptNode = null, this.audioProcessCallback = function(t) {
                    var n = t.outputBuffer,
                        i = n.getChannelData(0);
                    e.synthesize(i, n.length)
                }, null != t && this.setSong(t)
            }
            return e.warmUpSynthesizer = function(t) {
                if (null != t)
                    for (var n = 0; n < t.instrumentsPerChannel; n++) {
                        for (var i = t.pitchChannelCount; i < t.pitchChannelCount + t.drumChannelCount; i++) a.getDrumWave(t.channels[i].instruments[n].wave);
                        for (var i = 0; i < t.getChannelCount(); i++) e.getGeneratedSynthesizer(t, t.channels[i].instruments[n], i)
                    }
            }, e.operatorAmplitudeCurve = function(t) {
                return (Math.pow(16, t / 15) - 1) / 15
            }, Object.defineProperty(e.prototype, "playing", {
                get: function() {
                    return !this.paused
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "playhead", {
                get: function() {
                    return this.playheadInternal
                },
                set: function(t) {
                    if (null != this.song) {
                        this.playheadInternal = Math.max(0, Math.min(this.song.barCount, t));
                        var e = this.playheadInternal;
                        this.bar = Math.floor(e), e = this.song.beatsPerBar * (e - this.bar), this.beat = Math.floor(e), e = this.song.partsPerBeat * (e - this.beat), this.part = Math.floor(e), e = 4 * (e - this.part), this.arpeggio = Math.floor(e);
                        var n = this.getSamplesPerArpeggio();
                        e = n * (e - this.arpeggio), this.arpeggioSampleCountdown = Math.floor(n - e), this.bar < this.song.loopStart && (this.enableIntro = !0), this.bar > this.song.loopStart + this.song.loopLength && (this.enableOutro = !0)
                    }
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "totalSamples", {
                get: function() {
                    if (null == this.song) return 0;
                    var t = 4 * this.getSamplesPerArpeggio() * this.song.partsPerBeat * this.song.beatsPerBar,
                        e = this.loopCount;
                    0 > e && (e = 1);
                    var n = this.song.loopLength * e;
                    return this.enableIntro && (n += this.song.loopStart), this.enableOutro && (n += this.song.barCount - (this.song.loopStart + this.song.loopLength)), n * t
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "totalSeconds", {
                get: function() {
                    return this.totalSamples / this.samplesPerSecond
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "totalBars", {
                get: function() {
                    return null == this.song ? 0 : this.song.barCount
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.setSong = function(t) {
                "string" == typeof t ? this.song = new p(t) : t instanceof p && (this.song = t)
            }, e.prototype.play = function() {
                if (this.paused) {
                    this.paused = !1, e.warmUpSynthesizer(this.song);
                    var t = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext;
                    this.audioCtx = this.audioCtx || new t, this.scriptNode = this.audioCtx.createScriptProcessor ? this.audioCtx.createScriptProcessor(2048, 0, 1) : this.audioCtx.createJavaScriptNode(2048, 0, 1), this.scriptNode.onaudioprocess = this.audioProcessCallback, this.scriptNode.channelCountMode = "explicit", this.scriptNode.channelInterpretation = "speakers", this.scriptNode.connect(this.audioCtx.destination), this.samplesPerSecond = this.audioCtx.sampleRate, this.effectAngle = 2 * Math.PI / (this.effectDuration * this.samplesPerSecond), this.effectYMult = 2 * Math.cos(this.effectAngle), this.limitDecay = 1 / (2 * this.samplesPerSecond)
                }
            }, e.prototype.pause = function() {
                this.paused || (this.paused = !0, this.scriptNode.disconnect(this.audioCtx.destination), this.audioCtx.close && (this.audioCtx.close(), this.audioCtx = null), this.scriptNode = null)
            }, e.prototype.snapToStart = function() {
                this.bar = 0, this.enableIntro = !0, this.snapToBar()
            }, e.prototype.snapToBar = function(t) {
                void 0 !== t && (this.bar = t), this.playheadInternal = this.bar, this.beat = 0, this.part = 0, this.arpeggio = 0, this.arpeggioSampleCountdown = 0, this.effectPhase = 0;
                for (var e = 0, n = this.tones; e < n.length; e++) {
                    var i = n[e];
                    i.reset()
                }
                this.reverbDelayPos = 0, this.reverbFeedback0 = 0, this.reverbFeedback1 = 0, this.reverbFeedback2 = 0, this.reverbFeedback3 = 0;
                for (var s = 0; s < this.reverbDelayLine.length; s++) this.reverbDelayLine[s] = 0
            }, e.prototype.nextBar = function() {
                if (this.song) {
                    var t = this.bar;
                    this.bar++, this.enableOutro ? this.bar >= this.song.barCount && (this.bar = this.enableIntro ? 0 : this.song.loopStart) : (this.bar >= this.song.loopStart + this.song.loopLength || this.bar >= this.song.barCount) && (this.bar = this.song.loopStart), this.playheadInternal += this.bar - t
                }
            }, e.prototype.prevBar = function() {
                if (this.song) {
                    var t = this.bar;
                    this.bar--, this.bar < 0 && (this.bar = this.song.loopStart + this.song.loopLength - 1), this.bar >= this.song.barCount && (this.bar = this.song.barCount - 1), this.bar < this.song.loopStart && (this.enableIntro = !0), !this.enableOutro && this.bar >= this.song.loopStart + this.song.loopLength && (this.bar = this.song.loopStart + this.song.loopLength - 1), this.playheadInternal += this.bar - t
                }
            }, e.prototype.synthesize = function(n, a) {
                if (null != this.song) {
                    for (var r = this.song.getChannelCount(), o = this.tones.length; r > o; o++) this.tones[o] = new d;
                    this.tones.length = r;
                    var h = this.getSamplesPerArpeggio(),
                        l = 0,
                        c = !1;
                    (0 == this.arpeggioSampleCountdown || this.arpeggioSampleCountdown > h) && (this.arpeggioSampleCountdown = h), this.part >= this.song.partsPerBeat && (this.beat++, this.part = 0, this.arpeggio = 0, this.arpeggioSampleCountdown = h), this.beat >= this.song.beatsPerBar && (this.bar++, this.beat = 0, this.part = 0, this.arpeggio = 0, this.arpeggioSampleCountdown = h, -1 == this.loopCount && (this.bar < this.song.loopStart && !this.enableIntro && (this.bar = this.song.loopStart), this.bar >= this.song.loopStart + this.song.loopLength && !this.enableOutro && (this.bar = this.song.loopStart))), this.bar >= this.song.barCount && (this.enableOutro ? (this.bar = 0, this.enableIntro = !0, c = !0, this.pause()) : this.bar = this.song.loopStart), this.bar >= this.song.loopStart && (this.enableIntro = !1);
                    for (var u = performance.now(), o = 0; a > o;) n[o++] = 0, n[o++] = 0, n[o++] = 0, n[o++] = 0;
                    (null == this.samplesForReverb || this.samplesForReverb.length < a) && (this.samplesForReverb = new Float32Array(a));
                    for (var p = this.samplesForReverb, o = 0; a > o;) p[o++] = 0, p[o++] = 0, p[o++] = 0, p[o++] = 0;
                    for (; a > l && !c;) {
                        for (var f = 0; f < this.song.getChannelCount(); f++) {
                            var g = this.song.channels[f].instruments[this.song.getPatternInstrument(f, this.bar)];
                            e.generatedSynthesizersByChannel[f] = e.getGeneratedSynthesizer(this.song, g, f)
                        }
                        for (; a > l;) {
                            for (var m = a - l, b = this.arpeggioSampleCountdown <= m ? this.arpeggioSampleCountdown : m, f = 0; f < this.song.getChannelCount(); f++) {
                                var g = this.song.channels[f].instruments[this.song.getPatternInstrument(f, this.bar)];
                                e.computeTone(this, this.song, f, h, b, g);
                                var v = this.tones[f],
                                    C = this.song.getChannelIsDrum(f) ? n : p;
                                v.active && e.generatedSynthesizersByChannel[f](this, C, l, b, v, g)
                            }
                            if (l += b, this.effectPhase = (this.effectPhase + this.effectAngle * b) % (2 * Math.PI), this.arpeggioSampleCountdown -= b, this.arpeggioSampleCountdown <= 0 && (this.arpeggio++, this.arpeggioSampleCountdown = h, 4 == this.arpeggio && (this.arpeggio = 0, this.part++, this.part == this.song.partsPerBeat && (this.part = 0, this.beat++, this.beat == this.song.beatsPerBar)))) {
                                this.beat = 0, this.bar++, this.effectPhase = 0, this.bar < this.song.loopStart ? this.enableIntro || (this.bar = this.song.loopStart) : this.enableIntro = !1, this.bar >= this.song.loopStart + this.song.loopLength && (this.loopCount > 0 && this.loopCount--, (this.loopCount > 0 || !this.enableOutro) && (this.bar = this.song.loopStart)), this.bar >= this.song.barCount && (this.bar = 0, this.enableIntro = !0, c = !0, this.pause());
                                break
                            }
                        }
                    }
                    for (var y = +this.volume, w = this.reverbDelayLine, x = 0 | this.reverbDelayPos, Q = +this.reverbFeedback0, N = +this.reverbFeedback1, A = +this.reverbFeedback2, E = +this.reverbFeedback3, P = .425 * Math.pow(this.song.reverb / t.Config.reverbRange, .667), M = +this.limitDecay, k = +this.limit, o = 0; a > o; o++) {
                        var B = p[o],
                            S = x + 3041 & 16383,
                            L = x + 6426 & 16383,
                            I = x + 10907 & 16383,
                            G = w[x] + B,
                            D = w[S],
                            R = w[L],
                            T = w[I],
                            F = -G + D,
                            U = -G - D,
                            V = -R + T,
                            Z = -R - T;
                        Q += .5 * ((F + V) * P - Q), N += .5 * ((U + Z) * P - N), A += .5 * ((F - V) * P - A), E += .5 * ((U - Z) * P - E), w[S] = Q, w[L] = N, w[I] = A, w[x] = E, x = x + 1 & 16383;
                        var Y = n[o] + G + D + R + T,
                            O = 0 > Y ? -Y : Y;
                        O > k && (k = O), n[o] = Y / (.75 * k + .25) * y, k -= M
                    }
                    this.reverbDelayPos = x, this.reverbFeedback0 = Q, this.reverbFeedback1 = N, this.reverbFeedback2 = A, this.reverbFeedback3 = E, this.limit = k, this.playheadInternal = (((this.arpeggio + 1 - this.arpeggioSampleCountdown / h) / 4 + this.part) / this.song.partsPerBeat + this.beat) / this.song.beatsPerBar + this.bar;
                    var W = performance.now() - u;
                    i += a, s += W
                } else
                    for (var o = 0; a > o; o++) n[o] = 0
            }, e.computeOperatorEnvelope = function(t, e, n, i) {
                switch (a.operatorEnvelopeType[t]) {
                    case 0:
                        return i;
                    case 1:
                        return 1;
                    case 4:
                        var s = 1 / (1 + e * a.operatorEnvelopeSpeed[t]);
                        return a.operatorEnvelopeInverted[t] ? 1 - s : s;
                    case 5:
                        return .5 - .5 * Math.cos(2 * n * Math.PI * a.operatorEnvelopeSpeed[t]);
                    case 2:
                        return Math.max(1, 2 - 10 * e);
                    case 3:
                        var r = a.operatorEnvelopeSpeed[t],
                            o = .25 / Math.sqrt(r);
                        return o > e ? e / o : 1 / (1 + (e - o) * r);
                    default:
                        throw new Error("Unrecognized operator envelope type.")
                }
            }, e.computeTone = function(t, n, i, s, r, o) {
                var h = n.getChannelIsDrum(i),
                    l = t.tones[i],
                    c = n.getPattern(i, t.bar),
                    u = t.pianoPressed && i == t.pianoChannel,
                    p = h ? a.drumBasePitches[o.wave] : a.keyTransposes[n.key],
                    d = h ? a.drumInterval : 1,
                    f = h ? a.drumWaveIsSoft[o.wave] ? 24 : 60 : 48,
                    g = 4 * s / t.samplesPerSecond,
                    m = 1 / n.partsPerBeat;
                l.phaseDeltaScale = 0, l.filter = 1, l.filterScale = 1, l.vibratoScale = 0, l.harmonyMult = 1, l.harmonyVolumeMult = 1, l.active = !1;
                for (var b = 0, v = t.arpeggio, C = t.arpeggioSampleCountdown, y = null, w = !0, x = 0, Q = 0, N = 1, A = 1, E = 0, P = 0, M = 0, k = 0, B = 0, S = 0, L = 0; L < a.operatorCount; L++) l.phaseDeltas[L] = 0, l.volumeStarts[L] = 0, l.volumeDeltas[L] = 0;
                if (u) y = t.pianoPitch, N = A = 1, E = P = 1, w = !1;
                else if (null != c) {
                    for (var I = t.part + t.beat * n.partsPerBeat, G = null, D = null, R = null, L = 0; L < c.notes.length; L++)
                        if (c.notes[L].end <= I) D = c.notes[L];
                        else if (c.notes[L].start <= I && c.notes[L].end > I) G = c.notes[L];
                    else if (c.notes[L].start > I) {
                        R = c.notes[L];
                        break
                    }
                    if (null != G && null != D && D.end != G.start && (D = null), null != G && null != R && R.start != G.end && (R = null), null != G) {
                        y = G.pitches, b = I - G.start;
                        var T = void 0;
                        for (T = 1; T < G.pins.length - 1 && !(G.pins[T].time + G.start > I); T++);
                        var F = G.pins[T - 1],
                            U = G.pins[T],
                            V = 4 * G.start,
                            Z = 4 * G.end,
                            Y = 4 * (G.start + F.time),
                            O = 4 * (G.start + U.time),
                            W = 4 * I + v,
                            j = 4 * I + v + 1,
                            z = (W - Y) / (O - Y),
                            J = (j - Y) / (O - Y),
                            X = F.volume + (U.volume - F.volume) * z,
                            q = F.volume + (U.volume - F.volume) * J,
                            H = 1,
                            K = 1,
                            _ = F.interval + (U.interval - F.interval) * z,
                            $ = F.interval + (U.interval - F.interval) * J,
                            tt = F.time + (U.time - F.time) * z,
                            et = F.time + (U.time - F.time) * J,
                            nt = tt,
                            it = et,
                            st = 1 - C / s,
                            at = 1 - (C - r) / s;
                        w = W + st - V == 0;
                        var rt = o.transition;
                        W == V && (0 == rt ? w = !1 : 2 == rt ? H = 0 : 3 == rt && (null == D ? H = 0 : 0 == D.pins[D.pins.length - 1].volume || 0 == G.pins[0].volume ? H = 0 : (_ = .5 * (D.pitches[0] + D.pins[D.pins.length - 1].interval - G.pitches[0]), nt = .5 * D.pins[D.pins.length - 1].time, w = !1))), j == Z && (0 == rt ? null == R && G.start + U.time != n.partsPerBeat * n.beatsPerBar && (K = 0) : 1 == rt || 2 == rt ? K = 0 : 3 == rt && (null == R ? K = 0 : 0 == G.pins[G.pins.length - 1].volume || 0 == R.pins[0].volume ? K = 0 : ($ = .5 * (R.pitches[0] - G.pitches[0] + G.pins[G.pins.length - 1].interval), it *= .5))), x = _ + ($ - _) * st, Q = _ + ($ - _) * at, E = t.volumeConversion(X + (q - X) * st), P = t.volumeConversion(X + (q - X) * at), N = H + (K - H) * st, A = H + (K - H) * at, M = G.start + tt + (et - tt) * st, k = G.start + tt + (et - tt) * at, B = nt + (it - nt) * st, S = nt + (it - nt) * at
                    }
                }
                if (null != y) {
                    var ot = 1 / t.samplesPerSecond;
                    if (l.active = !0, h || 1 != o.type) {
                        var ht = y[0];
                        if (a.chorusHarmonizes[o.chorus]) {
                            var lt = 0;
                            2 == y.length ? lt = y[1] - y[0] : 3 == y.length ? lt = y[(v >> 1) + 1] - y[0] : 4 == y.length && (lt = y[(3 == v ? 1 : v) + 1] - y[0]), l.harmonyMult = Math.pow(2, lt / 12), l.harmonyVolumeMult = Math.pow(2, -lt / f)
                        } else 2 == y.length ? ht = y[v >> 1] : 3 == y.length ? ht = y[3 == v ? 1 : v] : 4 == y.length && (ht = y[v]);
                        var ct = (ht + x) * d,
                            ut = (ht + Q) * d,
                            pt = t.frequencyFromPitch(p + ct),
                            dt = Math.pow(2, -ct / f),
                            ft = Math.pow(2, -ut / f);
                        h && a.drumWaveIsSoft[o.wave] && (l.filter = Math.min(1, pt * ot * a.drumPitchFilterMult[o.wave]));
                        var gt = void 0;
                        if (h) gt = .19 * a.drumVolumes[o.wave];
                        else {
                            var mt = a.filterDecays[o.filter];
                            l.filter = Math.pow(2, -mt * g * B);
                            var bt = Math.pow(2, -mt * g * S);
                            l.filterScale = Math.pow(bt / l.filter, 1 / r), gt = .135 * a.waveVolumes[o.wave] * a.filterVolumes[o.filter] * a.chorusVolumes[o.chorus]
                        }
                        w && !h && l.reset(), l.phaseDeltas[0] = pt * ot;
                        var vt = 5 == o.volume ? 0 : Math.pow(2, -a.volumeValues[o.volume]);
                        l.volumeStarts[0] = N * E * dt * gt * vt;
                        var Ct = A * P * ft * gt * vt;
                        l.volumeDeltas[0] = (Ct - l.volumeStarts[0]) / r
                    } else {
                        for (var yt = 1, wt = 0, xt = a.operatorCarrierCounts[o.algorithm], L = 0; L < a.operatorCount; L++) {
                            var Qt = a.operatorAssociatedCarrier[o.algorithm][L] - 1,
                                ht = y[L < y.length ? L : Qt < y.length ? Qt : 0],
                                Nt = a.operatorFrequencies[o.operators[L].frequency],
                                At = a.operatorCarrierChorus[Qt],
                                ct = (ht + x) * d + At,
                                pt = Nt * t.frequencyFromPitch(p + ct) + a.operatorHzOffsets[o.operators[L].frequency];
                            l.phaseDeltas[L] = pt * ot * a.sineWaveLength, w && l.reset();
                            var Et = e.operatorAmplitudeCurve(o.operators[L].amplitude),
                                Pt = Et * a.operatorAmplitudeSigns[o.operators[L].frequency],
                                Mt = Pt,
                                Ct = Pt;
                            if (xt > L) {
                                var kt = .03,
                                    ut = (ht + Q) * d,
                                    dt = Math.pow(2, -ct / f),
                                    ft = Math.pow(2, -ut / f);
                                Mt *= dt * kt * N, Ct *= ft * kt * A, wt += Et
                            } else Mt *= 1.5 * a.sineWaveLength, Ct *= 1.5 * a.sineWaveLength, yt *= 1 - Math.min(1, o.operators[L].amplitude / 15);
                            var Bt = o.operators[L].envelope;
                            Mt *= e.computeOperatorEnvelope(Bt, g * B, m * M, E), Ct *= e.computeOperatorEnvelope(Bt, g * S, m * k, P), l.volumeStarts[L] = Mt, l.volumeDeltas[L] = (Ct - Mt) / r
                        }
                        var St = .3 * a.sineWaveLength * o.feedbackAmplitude / 15,
                            Lt = St * e.computeOperatorEnvelope(o.feedbackEnvelope, g * B, m * M, E),
                            It = St * e.computeOperatorEnvelope(o.feedbackEnvelope, g * S, m * k, P);
                        l.feedbackMult = Lt, l.feedbackDelta = (It - l.feedbackMult) / r, yt *= 1 - o.feedbackAmplitude / 15, yt *= 1 - Math.min(1, Math.max(0, wt - 1) / 2);
                        for (var L = 0; xt > L; L++) l.volumeStarts[L] *= 1 + 3 * yt, l.volumeDeltas[L] *= 1 + 3 * yt
                    }
                    l.phaseDeltaScale = Math.pow(2, (Q - x) * d / 12 / r), l.vibratoScale = b < a.effectVibratoDelays[o.effect] ? 0 : Math.pow(2, a.effectVibratos[o.effect] / 12) - 1
                } else {
                    h || l.reset();
                    for (var L = 0; L < a.operatorCount; L++) l.phaseDeltas[0] = 0, l.volumeStarts[0] = 0, l.volumeDeltas[0] = 0
                }
            }, e.getGeneratedSynthesizer = function(t, n, i) {
                if (t.getChannelIsDrum(i) || 1 != n.type) {
                    if (t.getChannelIsDrum(i) || 0 != n.type) {
                        if (t.getChannelIsDrum(i)) return e.noiseSynth;
                        throw new Error("Unrecognized instrument type: " + n.type)
                    }
                    return e.chipSynth
                }
                var s = t.getChannelFingerprint(n, i);
                if (void 0 == e.fmSynthFunctionCache[s]) {
                    for (var r = [], o = 0, h = e.fmSourceTemplate; o < h.length; o++) {
                        var l = h[o];
                        if (-1 != l.indexOf("// CARRIER OUTPUTS")) {
                            if (!t.getChannelIsDrum(i) && 1 == n.type) {
                                for (var c = [], u = 0; u < a.operatorCarrierCounts[n.algorithm]; u++) c.push("operator" + u + "Scaled");
                                r.push(l.replace("/*operator#Scaled*/", c.join(" + ")))
                            }
                        } else if (-1 != l.indexOf("// INSERT OPERATOR COMPUTATION HERE"))
                            for (var u = a.operatorCount - 1; u >= 0; u--)
                                for (var p = 0, d = e.operatorSourceTemplate; p < d.length; p++) {
                                    var f = d[p];
                                    if (-1 != f.indexOf("/* + operator@Scaled*/")) {
                                        for (var g = "", m = 0, b = a.operatorModulatedBy[n.algorithm][u]; m < b.length; m++) {
                                            var v = b[m];
                                            g += " + operator" + (v - 1) + "Scaled"
                                        }
                                        var C = a.operatorFeedbackIndices[n.feedbackType][u];
                                        if (C.length > 0) {
                                            g += " + feedbackMult * (";
                                            for (var y = [], w = 0, x = C; w < x.length; w++) {
                                                var v = x[w];
                                                y.push("operator" + (v - 1) + "Output")
                                            }
                                            g += y.join(" + ") + ")"
                                        }
                                        r.push(f.replace(/\#/g, u + "").replace("/* + operator@Scaled*/", g))
                                    } else r.push(f.replace(/\#/g, u + ""))
                                } else if (-1 != l.indexOf("#"))
                                    for (var u = 0; u < a.operatorCount; u++) r.push(l.replace(/\#/g, u + ""));
                                else r.push(l)
                    }
                    e.fmSynthFunctionCache[s] = new Function("synth", "data", "bufferIndex", "runLength", "tone", "instrument", r.join("\n"))
                }
                return e.fmSynthFunctionCache[s]
            }, e.chipSynth = function(e, n, i, s, a, r) {
                var o = +e.effectYMult,
                    h = +Math.sin(e.effectPhase),
                    l = +Math.sin(e.effectPhase - e.effectAngle),
                    c = t.Config.waves[r.wave],
                    u = +c.length,
                    p = +Math.pow(2, -t.Config.filterBases[r.filter]),
                    d = +t.Config.effectTremolos[r.effect],
                    f = +Math.pow(2, (t.Config.chorusOffsets[r.chorus] + t.Config.chorusIntervals[r.chorus]) / 12),
                    g = Math.pow(2, (t.Config.chorusOffsets[r.chorus] - t.Config.chorusIntervals[r.chorus]) / 12) * a.harmonyMult,
                    m = a.harmonyVolumeMult * t.Config.chorusSigns[r.chorus];
                0 == r.chorus && (a.phases[1] = a.phases[0]);
                for (var b = g / f, v = a.phaseDeltas[0] * f, C = +a.phaseDeltaScale, y = +a.volumeStarts[0], w = +a.volumeDeltas[0], x = a.filter * p, Q = +a.filterScale, N = +a.vibratoScale, A = a.phases[0] % 1, E = a.phases[1] % 1, P = +a.sample, M = i + s; M > i;) {
                    var k = 1 + N * h,
                        B = 1 + d * (h - 1),
                        S = h;
                    h = o * h - l, l = S;
                    var L = c[0 | A * u],
                        I = c[0 | E * u] * m,
                        G = (L + I) * y * B;
                    P += (G - P) * x, y += w, A += v * k, E += v * k * b, x *= Q, A -= 0 | A, E -= 0 | E, v *= C, n[i] += P, i++
                }
                a.phases[0] = A, a.phases[1] = E, a.sample = P
            }, e.noiseSynth = function(e, n, i, s, a, r) {
                for (var o = t.Config.getDrumWave(r.wave), h = +a.phaseDeltas[0] / 32768, l = +a.phaseDeltaScale, c = +a.volumeStarts[0], u = +a.volumeDeltas[0], p = +a.filter, d = a.phases[0] % 1, f = +a.sample, g = i + s; g > i;) f += (o[0 | 32768 * d] * c - f) * p, c += u, d += h, d -= 0 | d, h *= l, n[i] += f, i++;
                a.phases[0] = d, a.sample = f
            }, e.prototype.frequencyFromPitch = function(t) {
                return 440 * Math.pow(2, (t - 69) / 12)
            }, e.prototype.volumeConversion = function(t) {
                return Math.pow(t / 3, 1.5)
            }, e.prototype.getSamplesPerArpeggio = function() {
                if (null == this.song) return 0;
                var t = this.song.getBeatsPerMinute(),
                    e = t / 60,
                    n = e * this.song.partsPerBeat,
                    i = 4 * n;
                return Math.floor(this.samplesPerSecond / i)
            }, e
        }();
    f.negativePhaseGuard = 1e3, f.generatedSynthesizersByChannel = [], f.fmSynthFunctionCache = {}, f.fmSourceTemplate = ("\n			// TODO: Skip this line and oscillator below unless using an effect:\n			var effectYMult = +synth.effectYMult;\n			var effectY     = +Math.sin(synth.effectPhase);\n			var prevEffectY = +Math.sin(synth.effectPhase - synth.effectAngle);\n			\n			var sineWave = beepbox.Config.sineWave;\n			\n			var tremoloScale = +beepbox.Config.effectTremolos[instrument.effect];\n			\n			var phaseDeltaScale = +tone.phaseDeltaScale;\n			var vibratoScale = +tone.vibratoScale;\n			var operator#Phase       = +((tone.phases[#] % 1) + " + f.negativePhaseGuard + ") * " + a.sineWaveLength + ";\n			var operator#PhaseDelta  = +tone.phaseDeltas[#];\n			var operator#OutputMult  = +tone.volumeStarts[#];\n			var operator#OutputDelta = +tone.volumeDeltas[#];\n			var operator#Output      = +tone.feedbackOutputs[#];\n			var feedbackMult         = +tone.feedbackMult;\n			var feedbackDelta        = +tone.feedbackDelta;\n			var sample = +tone.sample;\n			\n			var stopIndex = bufferIndex + runLength;\n			while (bufferIndex < stopIndex) {\n				var vibrato = 1.0 + vibratoScale * effectY;\n				var tremolo = 1.0 + tremoloScale * (effectY - 1.0);\n				var temp = effectY;\n				effectY = effectYMult * effectY - prevEffectY;\n				prevEffectY = temp;\n				\n				// INSERT OPERATOR COMPUTATION HERE\n				sample = tremolo * (/*operator#Scaled*/); // CARRIER OUTPUTS\n				feedbackMult += feedbackDelta;\n				operator#OutputMult += operator#OutputDelta;\n				operator#Phase += operator#PhaseDelta * vibrato;\n				operator#PhaseDelta *= phaseDeltaScale;\n				\n				data[bufferIndex] += sample;\n				bufferIndex++;\n			}\n			\n			tone.phases[#] = operator#Phase / " + a.sineWaveLength + ";\n			tone.feedbackOutputs[#] = operator#Output;\n			tone.sample = sample;\n		").split("\n"), f.operatorSourceTemplate = ("\n				var operator#PhaseMix = operator#Phase/* + operator@Scaled*/;\n				var operator#PhaseInt = operator#PhaseMix|0;\n				var operator#Index    = operator#PhaseInt & " + a.sineWaveMask + ";\n				var operator#Sample   = sineWave[operator#Index];\n				operator#Output       = operator#Sample + (sineWave[operator#Index + 1] - operator#Sample) * (operator#PhaseMix - operator#PhaseInt);\n				var operator#Scaled   = operator#OutputMult * operator#Output;\n		").split("\n"), t.Synth = f
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    var e = function() {
        function t() {
            this.n = [], this.o = !1
        }
        return t.prototype.watch = function(t) {
            -1 == this.n.indexOf(t) && this.n.push(t)
        }, t.prototype.unwatch = function(t) {
            var e = this.n.indexOf(t); - 1 != e && this.n.splice(e, 1)
        }, t.prototype.changed = function() {
            this.o = !0
        }, t.prototype.notifyWatchers = function() {
            if (this.o) {
                this.o = !1;
                for (var t = 0, e = this.n.concat(); t < e.length; t++) {
                    var n = e[t];
                    n()
                }
            }
        }, t
    }();
    t.ChangeNotifier = e
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    var e = function() {
        function e(e) {
            var n = this;
            this.notifier = new t.ChangeNotifier, this.channel = 0, this.bar = 0, this.volume = 75, this.trackVisibleBars = 16, this.barScrollPos = 0, this.prompt = null, this.p = null, this.q = 0, this.r = 0, this.s = 0, this.t = !1, this.u = !1, this.v = function() {
                var e = window.history.state;
                e && e.sequenceNumber == n.q || (null == e ? (n.q++, e = {
                    canUndo: !0,
                    sequenceNumber: n.q,
                    bar: n.bar,
                    channel: n.channel,
                    prompt: n.prompt
                }, new t.ChangeSong(n, location.hash), window.history.replaceState(e, "", "#" + n.song.toBase64String())) : (e.sequenceNumber == n.q - 1 ? (n.bar = n.r, n.channel = n.s) : e.sequenceNumber != n.q && (n.bar = e.bar, n.channel = e.channel), n.q = e.sequenceNumber, n.prompt = e.prompt, new t.ChangeSong(n, location.hash)), n.r = e.bar, n.s = e.channel, n.forgetLastChange(), n.notifier.notifyWatchers())
            }, this.w = function() {
                n.notifier.notifyWatchers()
            }, this.z = function() {
                n.u = !1;
                var t, e = "#" + n.song.toBase64String();
                n.t ? (n.q++, t = {
                    canUndo: !0,
                    sequenceNumber: n.q,
                    bar: n.bar,
                    channel: n.channel,
                    prompt: n.prompt
                }, window.history.pushState(t, "", e)) : (t = {
                    canUndo: !0,
                    sequenceNumber: n.q,
                    bar: n.bar,
                    channel: n.channel,
                    prompt: n.prompt
                }, window.history.replaceState(t, "", e)), n.r = t.bar, n.s = t.channel, n.t = !1
            }, this.song = new t.Song(e), this.synth = new t.Synth(this.song), this.autoPlay = "true" == localStorage.getItem("autoPlay"), this.autoFollow = "true" == localStorage.getItem("autoFollow"), this.showFifth = "true" == localStorage.getItem("showFifth"), this.showLetters = "true" == localStorage.getItem("showLetters"), this.showChannels = "true" == localStorage.getItem("showChannels"), this.showScrollBar = "true" == localStorage.getItem("showScrollBar"), null != localStorage.getItem("volume") && (this.volume = Number(localStorage.getItem("volume"))), this.synth.volume = this.H();
            var i = window.history.state;
            null == i && (i = {
                canUndo: !1,
                sequenceNumber: 0,
                bar: 0,
                channel: 0,
                prompt: null
            }, window.history.replaceState(i, "", "#" + this.song.toBase64String())), window.addEventListener("hashchange", this.v), window.addEventListener("popstate", this.v), this.bar = i.bar, this.channel = i.channel, this.r = i.bar, this.s = i.channel, this.barScrollPos = Math.max(0, this.bar - (this.trackVisibleBars - 6)), this.prompt = i.prompt;
            for (var s = 0, a = ["input", "change", "click", "keyup", "keydown", "mousedown", "mousemove", "mouseup", "touchstart", "touchmove", "touchend", "touchcancel"]; s < a.length; s++) {
                var r = a[s];
                window.addEventListener(r, this.w)
            }
        }
        return e.prototype.record = function(t, e) {
            void 0 === e && (e = !1), t.isNoop() ? (this.p = null, e && window.history.back()) : (this.p = t, e || (this.t = !0), this.u || (window.requestAnimationFrame(this.z), this.u = !0))
        }, e.prototype.openPrompt = function(t) {
            this.prompt = t;
            var e = "#" + this.song.toBase64String();
            this.q++;
            var n = {
                canUndo: !0,
                sequenceNumber: this.q,
                bar: this.bar,
                channel: this.channel,
                prompt: this.prompt
            };
            window.history.pushState(n, "", e)
        }, e.prototype.undo = function() {
            var t = window.history.state;
            t.canUndo && window.history.back()
        }, e.prototype.redo = function() {
            window.history.forward()
        }, e.prototype.setProspectiveChange = function(t) {
            this.p = t
        }, e.prototype.forgetLastChange = function() {
            this.p = null
        }, e.prototype.lastChangeWas = function(t) {
            return null != t && t == this.p
        }, e.prototype.savePreferences = function() {
            localStorage.setItem("autoPlay", this.autoPlay ? "true" : "false"), localStorage.setItem("autoFollow", this.autoFollow ? "true" : "false"), localStorage.setItem("showFifth", this.showFifth ? "true" : "false"), localStorage.setItem("showLetters", this.showLetters ? "true" : "false"), localStorage.setItem("showChannels", this.showChannels ? "true" : "false"), localStorage.setItem("showScrollBar", this.showScrollBar ? "true" : "false"), localStorage.setItem("volume", String(this.volume))
        }, e.prototype.setVolume = function(t) {
            this.volume = t, this.savePreferences(), this.synth.volume = this.H()
        }, e.prototype.H = function() {
            return Math.min(1, Math.pow(this.volume / 50, .5)) * Math.pow(2, (this.volume - 75) / 25)
        }, e.prototype.getCurrentPattern = function() {
            return this.song.getPattern(this.channel, this.bar)
        }, e.prototype.getCurrentInstrument = function() {
            var t = this.getCurrentPattern();
            return null == t ? 0 : t.instrument
        }, e
    }();
    e.i = 2, t.SongDocument = e
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    function e(t, e, n) {
        var s = document.createElementNS(i, t);
        if (e)
            for (var a = 0, r = Object.keys(e); a < r.length; a++) {
                var o = r[a];
                s.setAttribute(o, e[o])
            }
        if (n)
            for (var h = 0, l = n; h < l.length; h++) {
                var c = l[h];
                s.appendChild(c)
            }
        return s
    }
    var n;
    ! function(t) {
        function e(t, e, n) {
            var i = document.createElement(t);
            if (e)
                for (var s = 0, a = Object.keys(e); s < a.length; s++) {
                    var r = a[s];
                    "style" == r ? i.setAttribute(r, e[r]) : i[r] = e[r]
                }
            if (n)
                for (var o = 0, h = n; o < h.length; o++) {
                    var l = h[o];
                    i.appendChild(l)
                }
            return i
        }

        function n(t, n) {
            return e("button", t, n)
        }

        function i(t, n) {
            return e("div", t, n)
        }

        function s(t, n) {
            return e("span", t, n)
        }

        function a(t, n) {
            return e("select", t, n)
        }

        function r(t, e, n, i) {
            void 0 === n && (n = !1), void 0 === i && (i = !1);
            var s = document.createElement("option");
            return s.value = t, s.selected = n, s.disabled = i, s.appendChild(c(e)), s
        }

        function o(t) {
            return e("canvas", t)
        }

        function h(t) {
            return e("input", t)
        }

        function l() {
            return e("br")
        }

        function c(t) {
            return document.createTextNode(t)
        }
        t.element = e, t.button = n, t.div = i, t.span = s, t.select = a, t.option = r, t.canvas = o, t.input = h, t.br = l, t.text = c
    }(n = t.html || (t.html = {}));
    var i = "http://www.w3.org/2000/svg";
    t.svgElement = e
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    var e = document.createElement("style");
    e.type = "text/css", e.appendChild(document.createTextNode('\n\n.beepboxEditor {\n	display: flex;\n	-webkit-touch-callout: none;\n	-webkit-user-select: none;\n	-khtml-user-select: none;\n	-moz-user-select: none;\n	-ms-user-select: none;\n	user-select: none;\n	position: relative;\n	touch-action: manipulation;\n	cursor: default;\n	font-size: small;\n	overflow: hidden;\n}\n\n.beepboxEditor div {\n	margin: 0;\n	padding: 0;\n}\n\n.beepboxEditor .promptContainer {\n	position: absolute;\n	top: 0;\n	left: 0;\n	width: 100%;\n	height: 100%;\n	background: rgba(0,0,0,0.5);\n	display: flex;\n	justify-content: center;\n	align-items: center;\n}\n\n.beepboxEditor .prompt {\n	margin: auto;\n	text-align: center;\n	background: #000;\n	border-radius: 15px;\n	border: 4px solid #444;\n	color: #fff;\n	padding: 20px;\n	display: flex;\n	flex-direction: column;\n}\n\n.beepboxEditor .prompt > *:not(:first-child) {\n	margin-top: 1.5em;\n}\n\n/* Use psuedo-elements to add cross-browser up & down arrows to select elements: */\n.beepboxEditor .selectContainer {\n	position: relative;\n}\n.beepboxEditor .selectContainer:not(.menu)::before {\n	content: "";\n	position: absolute;\n	right: 0.3em;\n	top: 0.4em;\n	border-bottom: 0.4em solid currentColor;\n	border-left: 0.3em solid transparent;\n	border-right: 0.3em solid transparent;\n	pointer-events: none;\n}\n.beepboxEditor .selectContainer:not(.menu)::after {\n	content: "";\n	position: absolute;\n	right: 0.3em;\n	bottom: 0.4em;\n	border-top: 0.4em solid currentColor;\n	border-left: 0.3em solid transparent;\n	border-right: 0.3em solid transparent;\n	pointer-events: none;\n}\n.beepboxEditor .selectContainer.menu::after {\n	content: "";\n	position: absolute;\n	right: 0.7em;\n	margin: auto;\n	top: 0;\n	bottom: 0;\n	height: 0;\n	border-top: 0.4em solid currentColor;\n	border-left: 0.3em solid transparent;\n	border-right: 0.3em solid transparent;\n	pointer-events: none;\n}\n.beepboxEditor select {\n	margin: 0;\n	padding: 0 0.3em;\n	display: block;\n	height: 2em;\n	border: none;\n	border-radius: 0.4em;\n	background: #444444;\n	color: inherit;\n	font-size: inherit;\n	cursor: pointer;\n	font-family: inherit;\n\n	-webkit-appearance:none;\n	-moz-appearance: none;\n	appearance: none;\n}\n.beepboxEditor .menu select {\n	padding: 0 2em;\n}\n.beepboxEditor select:focus {\n	background: #777777;\n	outline: none;\n}\n.beepboxEditor .menu select {\n	text-align: center;\n	text-align-last: center;\n}\n\n/* This makes it look better in firefox on my computer... What about others?\n@-moz-document url-prefix() {\n	.beepboxEditor select { padding: 0 2px; }\n}\n*/\n.beepboxEditor button {\n	margin: 0;\n	position: relative;\n	height: 2em;\n	border: none;\n	border-radius: 0.4em;\n	background: #444;\n	color: inherit;\n	font-size: inherit;\n	font-family: inherit;\n	cursor: pointer;\n}\n.beepboxEditor button:focus {\n	background: #777;\n	outline: none;\n}\n.beepboxEditor button.playButton, .beepboxEditor button.pauseButton {\n	padding-left: 2em;\n}\n.beepboxEditor button.playButton::before {\n	content: "";\n	position: absolute;\n	left: 0.7em;\n	top: 50%;\n	margin-top: -0.65em;\n	border-left: 1em solid currentColor;\n	border-top: 0.65em solid transparent;\n	border-bottom: 0.65em solid transparent;\n	pointer-events: none;\n}\n.beepboxEditor button.pauseButton::before {\n	content: "";\n	position: absolute;\n	left: 0.7em;\n	top: 50%;\n	margin-top: -0.65em;\n	width: 0.3em;\n	height: 1.3em;\n	background: currentColor;\n	pointer-events: none;\n}\n.beepboxEditor button.pauseButton::after {\n	content: "";\n	position: absolute;\n	left: 1.4em;\n	top: 50%;\n	margin-top: -0.65em;\n	width: 0.3em;\n	height: 1.3em;\n	background: currentColor;\n	pointer-events: none;\n}\n\n.beepboxEditor button.prevBarButton::before {\n	content: "";\n	position: absolute;\n	left: 50%;\n	top: 50%;\n	margin-left: -0.5em;\n	margin-top: -0.5em;\n	width: 0.2em;\n	height: 1em;\n	background: currentColor;\n	pointer-events: none;\n}\n.beepboxEditor button.prevBarButton::after {\n	content: "";\n	position: absolute;\n	left: 50%;\n	top: 50%;\n	margin-left: -0.3em;\n	margin-top: -0.5em;\n	border-right: 0.8em solid currentColor;\n	border-top: 0.5em solid transparent;\n	border-bottom: 0.5em solid transparent;\n	pointer-events: none;\n}\n\n.beepboxEditor button.nextBarButton::before {\n	content: "";\n	position: absolute;\n	left: 50%;\n	top: 50%;\n	margin-left: -0.5em;\n	margin-top: -0.5em;\n	border-left: 0.8em solid currentColor;\n	border-top: 0.5em solid transparent;\n	border-bottom: 0.5em solid transparent;\n	pointer-events: none;\n}\n.beepboxEditor button.nextBarButton::after {\n	content: "";\n	position: absolute;\n	left: 50%;\n	top: 50%;\n	margin-left: 0.3em;\n	margin-top: -0.5em;\n	width: 0.2em;\n	height: 1em;\n	background: currentColor;\n	pointer-events: none;\n}\n\n.beepboxEditor canvas {\n	overflow: hidden;\n	position: absolute;\n	display: block;\n}\n\n.beepboxEditor .trackContainer {\n	overflow-x: hidden;\n}\n\n.beepboxEditor .selectRow {\n	margin: 0;\n	height: 2.5em;\n	display: flex;\n	flex-direction: row;\n	align-items: center;\n	justify-content: space-between;\n}\n\n.beepboxEditor .selectRow > span {\n	color: #999;\n}\n\n.beepboxEditor .operatorRow {\n	margin: 0;\n	height: 2.5em;\n	display: flex;\n	flex-direction: row;\n	align-items: center;\n}\n\n.beepboxEditor .operatorRow > * {\n	flex-grow: 1;\n	flex-shrink: 1;\n}\n\n.beepboxEditor .editor-widget-column {\n	display: flex;\n	flex-direction: column;\n}\n\n.beepboxEditor .editor-widgets {\n	display: flex;\n	flex-direction: column;\n}\n\n.beepboxEditor .editor-controls {\n	display: flex;\n	flex-direction: column;\n}\n\n.beepboxEditor .editor-menus {\n	display: flex;\n	flex-direction: column;\n}\n\n.beepboxEditor .editor-settings {\n	display: flex;\n	flex-direction: column;\n}\n\n.beepboxEditor .editor-song-settings {\n	display: flex;\n	flex-direction: column;\n}\n\n.beepboxEditor .editor-instrument-settings {\n	display: flex;\n	flex-direction: column;\n}\n\n.beepboxEditor .editor-right-side-top > *, .beepboxEditor .editor-right-side-bottom > * {\n	flex-shrink: 0;\n}\n\n.beepboxEditor input[type=text], .beepboxEditor input[type=number] {\n	font-size: inherit;\n	background: transparent;\n	border: 1px solid #777;\n	color: white;\n}\n\n.beepboxEditor input[type=checkbox] {\n  transform: scale(1.5);\n}\n\n.beepboxEditor input[type=range] {\n	-webkit-appearance: none;\n	color: inherit;\n	width: 100%;\n	height: 2em;\n	font-size: inherit;\n	margin: 0;\n	cursor: pointer;\n	background-color: black;\n	touch-action: pan-y;\n}\n.beepboxEditor input[type=range]:focus {\n	outline: none;\n}\n.beepboxEditor input[type=range]::-webkit-slider-runnable-track {\n	width: 100%;\n	height: 0.5em;\n	cursor: pointer;\n	background: #444;\n}\n.beepboxEditor input[type=range]::-webkit-slider-thumb {\n	height: 2em;\n	width: 0.5em;\n	border-radius: 0.25em;\n	background: currentColor;\n	cursor: pointer;\n	-webkit-appearance: none;\n	margin-top: -0.75em;\n}\n.beepboxEditor input[type=range]:focus::-webkit-slider-runnable-track {\n	background: #777;\n}\n.beepboxEditor input[type=range]::-moz-range-track {\n	width: 100%;\n	height: 0.5em;\n	cursor: pointer;\n	background: #444;\n}\n.beepboxEditor input[type=range]:focus::-moz-range-track {\n	background: #777;\n}\n.beepboxEditor input[type=range]::-moz-range-thumb {\n	height: 2em;\n	width: 0.5em;\n	border-radius: 0.25em;\n	border: none;\n	background: currentColor;\n	cursor: pointer;\n}\n.beepboxEditor input[type=range]::-ms-track {\n	width: 100%;\n	height: 0.5em;\n	cursor: pointer;\n	background: #444;\n	border-color: transparent;\n}\n.beepboxEditor input[type=range]:focus::-ms-track {\n	background: #777;\n}\n.beepboxEditor input[type=range]::-ms-thumb {\n	height: 2em;\n	width: 0.5em;\n	border-radius: 0.25em;\n	background: currentColor;\n	cursor: pointer;\n}\n.beepboxEditor .hintButton {\n	border: 1px solid currentColor;\n	border-radius: 50%;\n	text-decoration: none;\n	width: 1em;\n	height: 1em;\n	text-align: center;\n	margin-left: auto;\n	margin-right: .4em;\n	cursor: pointer;\n}\n\n/* wide screen */\n@media (min-width: 701px) {\n	#beepboxEditorContainer {\n		display: table;\n	}\n	.beepboxEditor {\n		flex-direction: row;\n	}\n	.beepboxEditor:focus-within {\n		outline: 3px solid #555;\n	}\n	.beepboxEditor .trackContainer {\n		width: 512px;\n	}\n	.beepboxEditor .trackSelectBox {\n		display: none;\n	}\n	.beepboxEditor .playback-controls {\n		display: flex;\n		flex-direction: column;\n	}\n	.beepboxEditor .playback-bar-controls {\n		display: flex;\n		flex-direction: row;\n		margin: .2em 0;\n	}\n	.beepboxEditor .playback-volume-controls {\n		display: flex;\n		flex-direction: row;\n		margin: .2em 0;\n		align-items: center;\n	}\n	.beepboxEditor .pauseButton, .beepboxEditor .playButton {\n		flex-grow: 1;\n	}\n	.beepboxEditor .nextBarButton, .beepboxEditor .prevBarButton {\n		flex-grow: 1;\n		margin-left: 10px;\n	}\n	.beepboxEditor .editor-widget-column {\n		margin-left: 6px;\n		width: 14em;\n		flex-direction: column;\n	}\n	.beepboxEditor .editor-widgets {\n		flex-grow: 1;\n	}\n	.beepboxEditor .editor-settings input, .beepboxEditor .editor-settings select {\n		width: 8.6em;\n	}\n	.beepboxEditor .editor-menus > * {\n		flex-grow: 1;\n		margin: .2em 0;\n	}\n	.beepboxEditor .editor-menus > button {\n		padding: 0 2em;\n		white-space: nowrap;\n	}\n}\n\n/* narrow screen */\n@media (max-width: 700px) {\n	.beepboxEditor {\n		flex-direction: column;\n	}\n	.beepboxEditor:focus-within {\n		outline: none;\n	}\n	.beepboxEditor .editorBox {\n		max-height: 75vh;\n	}\n	.beepboxEditor .editor-menus {\n		flex-direction: row;\n	}\n	.beepboxEditor .editor-menus > * {\n		flex-grow: 1;\n		margin: .2em;\n	}\n	.beepboxEditor .editor-menus > button {\n		padding-left: 2em;\n		white-space: nowrap;\n	}\n	.beepboxEditor .trackContainer {\n		overflow-x: auto;\n	}\n	.beepboxEditor .barScrollBar {\n		display: none;\n	}\n	.beepboxEditor .playback-controls {\n		display: flex;\n		flex-direction: row;\n		margin: .2em 0;\n	}\n	.beepboxEditor .playback-bar-controls {\n		display: flex;\n		flex-direction: row;\n		flex-grow: 1;\n	}\n	.beepboxEditor .playback-volume-controls {\n		display: flex;\n		flex-direction: row;\n		align-items: center;\n		flex-grow: 1;\n		margin: 0 .2em;\n	}\n	.beepboxEditor .editor-widget-column {\n		flex-direction: column-reverse;\n	}\n	.beepboxEditor .editor-settings {\n		flex-direction: row;\n	}\n	.beepboxEditor .pauseButton, .beepboxEditor .playButton,\n	.beepboxEditor .nextBarButton, .beepboxEditor .prevBarButton {\n		flex-grow: 1;\n		margin: 0 .2em;\n	}\n	.beepboxEditor .editor-song-settings, .beepboxEditor .editor-instrument-settings {\n		flex-grow: 1;\n		margin: 0 .2em;\n	}\n	.beepboxEditor .editor-settings input, .beepboxEditor .editor-settings .selectContainer {\n		width: 60%;\n	}\n	.beepboxEditor .editor-settings select {\n		width: 100%;\n	}\n	.fullWidthOnly {\n		display: none;\n	}\n	p {\n		margin: 1em 0.5em;\n	}\n}\n\n')),
        document.head.appendChild(e)
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    var e = function() {
        function t() {
            this.I = !0
        }
        return t.prototype.J = function() {
            this.I = !1
        }, t.prototype.isNoop = function() {
            return this.I
        }, t
    }();
    t.Change = e;
    var n = function(t) {
        function e(e) {
            var n = t.call(this) || this;
            return n.K = e, n.L = !e, n
        }
        return __extends(e, t), e.prototype.undo = function() {
            this.K ? (this.M(), this.L = !0) : (this.N(), this.L = !1)
        }, e.prototype.redo = function() {
            this.K ? (this.N(), this.L = !1) : (this.M(), this.L = !0)
        }, e.prototype.O = function() {
            return this.L
        }, e.prototype.M = function() {
            throw new Error("Change.doForwards(): Override me.")
        }, e.prototype.N = function() {
            throw new Error("Change.doBackwards(): Override me.")
        }, e
    }(e);
    t.UndoableChange = n;
    var i = function(t) {
        function e() {
            return t.call(this) || this
        }
        return __extends(e, t), e.prototype.append = function(t) {
            t.isNoop() || this.J()
        }, e
    }(e);
    t.ChangeGroup = i;
    var s = function(t) {
        function e(e) {
            var n = t.call(this, !1) || this;
            return void 0 == e ? n.P = [] : n.P = e.concat(), n
        }
        return __extends(e, t), e.prototype.append = function(t) {
            t.isNoop() || (this.P[this.P.length] = t, this.J())
        }, e.prototype.M = function() {
            for (var t = 0; t < this.P.length; t++) this.P[t].redo()
        }, e.prototype.N = function() {
            for (var t = this.P.length - 1; t >= 0; t--) this.P[t].undo()
        }, e
    }(n);
    t.ChangeSequence = s
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    var e = function(t) {
        function e(e, n) {
            var i = t.call(this, !1) || this;
            return i.Q = e, i.R = n, i.S = i.R.start, i.T = i.R.end, i.U = i.R.start, i.V = i.R.end, i.W = i.R.pins, i.X = [], i.Y = i.R.pitches, i.Z = [], i
        }
        return __extends(e, t), e.prototype.$ = function() {
            for (var t = 0; t < this.X.length - 1;) this.X[t].time >= this.X[t + 1].time ? this.X.splice(t, 1) : t++;
            for (var t = 1; t < this.X.length - 1;) this.X[t - 1].interval == this.X[t].interval && this.X[t].interval == this.X[t + 1].interval && this.X[t - 1].volume == this.X[t].volume && this.X[t].volume == this.X[t + 1].volume ? this.X.splice(t, 1) : t++;
            for (var e = this.X[0].interval, n = this.X[0].time, t = 0; t < this.Y.length; t++) this.Z[t] = this.Y[t] + e;
            for (var t = 0; t < this.X.length; t++) this.X[t].interval -= e, this.X[t].time -= n;
            this.U = this.S + n, this.V = this.U + this.X[this.X.length - 1].time, this.M(), this.J()
        }, e.prototype.M = function() {
            this.R.pins = this.X, this.R.pitches = this.Z, this.R.start = this.U, this.R.end = this.V, this.Q.notifier.changed()
        }, e.prototype.N = function() {
            this.R.pins = this.W, this.R.pitches = this.Y, this.R.start = this.S, this.R.end = this.T, this.Q.notifier.changed()
        }, e
    }(t.UndoableChange);
    t.ChangePins = e;
    var n = function(t) {
        function e(e, n) {
            var i = t.call(this) || this,
                s = e.song.channels[e.channel].instruments[e.getCurrentInstrument()].type;
            return s != n && (e.song.channels[e.channel].instruments[e.getCurrentInstrument()].type = n, e.notifier.changed(), i.J()), i
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeInstrumentType = n;
    var i = function(t) {
        function e(e, n) {
            var i = t.call(this) || this,
                s = e.song.channels[e.channel].instruments[e.getCurrentInstrument()].transition;
            return s != n && (i.J(), e.song.channels[e.channel].instruments[e.getCurrentInstrument()].transition = n, e.notifier.changed()), i
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeTransition = i;
    var s = function(t) {
        function e(e, n, i) {
            var s = t.call(this) || this;
            if (s.oldValue = n, i > e.song.patternsPerChannel) throw new Error("invalid pattern");
            return e.song.channels[e.channel].bars[e.bar] = i, e.notifier.changed(), n != i && s.J(), s
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangePattern = s;
    var a = function(t) {
        function e(e, n) {
            var i = t.call(this) || this;
            if (e.song.barCount != n) {
                for (var s = 0; s < e.song.getChannelCount(); s++) {
                    for (var a = e.song.barCount; n > a; a++) e.song.channels[s].bars[a] = 1;
                    e.song.channels[s].bars.length = n
                }
                var r = e.bar,
                    o = e.barScrollPos,
                    h = e.song.loopStart,
                    l = e.song.loopLength;
                e.song.barCount > n && (r = Math.min(r, n - 1), o = Math.max(0, Math.min(n - e.trackVisibleBars, o)), l = Math.min(n, l), h = Math.min(n - l, h)), e.bar = r, e.barScrollPos = o, e.song.loopStart = h, e.song.loopLength = l, e.song.barCount = n, e.notifier.changed(), i.J()
            }
            return i
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeBarCount = a;
    var r = function(e) {
        function n(n, i, s) {
            var a = e.call(this) || this;
            if (n.song.pitchChannelCount != i || n.song.drumChannelCount != s) {
                for (var r = [], o = 0; i > o; o++) {
                    var h = o,
                        l = o;
                    if (o < n.song.pitchChannelCount) r[h] = n.song.channels[l];
                    else {
                        r[h] = new t.Channel, r[h].octave = 2;
                        for (var c = 0; c < n.song.instrumentsPerChannel; c++) r[h].instruments[c] = new t.Instrument;
                        for (var c = 0; c < n.song.patternsPerChannel; c++) r[h].patterns[c] = new t.Pattern;
                        for (var c = 0; c < n.song.barCount; c++) r[h].bars[c] = 1
                    }
                }
                for (var o = 0; s > o; o++) {
                    var h = o + i,
                        l = o + n.song.pitchChannelCount;
                    if (o < n.song.drumChannelCount) r[h] = n.song.channels[l];
                    else {
                        r[h] = new t.Channel, r[h].octave = 0;
                        for (var c = 0; c < n.song.instrumentsPerChannel; c++) r[h].instruments[c] = new t.Instrument;
                        for (var c = 0; c < n.song.patternsPerChannel; c++) r[h].patterns[c] = new t.Pattern;
                        for (var c = 0; c < n.song.barCount; c++) r[h].bars[c] = 1
                    }
                }
                n.song.pitchChannelCount = i, n.song.drumChannelCount = s;
                for (var h = 0; h < n.song.getChannelCount(); h++) n.song.channels[h] = r[h];
                n.song.channels.length = n.song.getChannelCount(), n.channel = Math.min(n.channel, i + s - 1), n.notifier.changed(), a.J()
            }
            return a
        }
        return __extends(n, e), n
    }(t.Change);
    t.ChangeChannelCount = r;
    var o = function(e) {
        function n(n, i) {
            var s = e.call(this) || this;
            if (n.song.beatsPerBar != i) {
                if (n.song.beatsPerBar > i)
                    for (var a = new t.ChangeSequence, r = 0; r < n.song.getChannelCount(); r++)
                        for (var o = 0; o < n.song.channels[r].patterns.length; o++) a.append(new F(n, n.song.channels[r].patterns[o], i * n.song.partsPerBeat, n.song.beatsPerBar * n.song.partsPerBeat));
                n.song.beatsPerBar = i, n.notifier.changed(), s.J()
            }
            return s
        }
        return __extends(n, e), n
    }(t.Change);
    t.ChangeBeatsPerBar = o;
    var h = function(t) {
        function e(e, n, i) {
            var s = t.call(this) || this,
                a = e.channel,
                r = e.bar;
            return e.channel = n, e.bar = i, e.barScrollPos = Math.min(e.bar, Math.max(e.bar - (e.trackVisibleBars - 1), e.barScrollPos)), e.notifier.changed(), a == n && r == i || s.J(), s
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeChannelBar = h;
    var l = function(t) {
        function e(e, n) {
            var i = t.call(this) || this,
                s = e.song.channels[e.channel].instruments[e.getCurrentInstrument()].chorus;
            return s != n && (i.J(), e.song.channels[e.channel].instruments[e.getCurrentInstrument()].chorus = n, e.notifier.changed()), i
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeChorus = l;
    var c = function(t) {
        function e(e, n) {
            var i = t.call(this) || this,
                s = e.song.channels[e.channel].instruments[e.getCurrentInstrument()].effect;
            return s != n && (e.song.channels[e.channel].instruments[e.getCurrentInstrument()].effect = n, e.notifier.changed(), i.J()), i
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeEffect = c;
    var u = function(t) {
        function e(e, n) {
            var i = t.call(this) || this,
                s = e.song.channels[e.channel].instruments[e.getCurrentInstrument()].filter;
            return s != n && (e.song.channels[e.channel].instruments[e.getCurrentInstrument()].filter = n, e.notifier.changed(), i.J()), i
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeFilter = u;
    var p = function(t) {
        function e(e, n) {
            var i = t.call(this) || this,
                s = e.song.channels[e.channel].instruments[e.getCurrentInstrument()].algorithm;
            return s != n && (e.song.channels[e.channel].instruments[e.getCurrentInstrument()].algorithm = n, e.notifier.changed(), i.J()), i
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeAlgorithm = p;
    var d = function(t) {
        function e(e, n) {
            var i = t.call(this) || this,
                s = e.song.channels[e.channel].instruments[e.getCurrentInstrument()].feedbackType;
            return s != n && (e.song.channels[e.channel].instruments[e.getCurrentInstrument()].feedbackType = n, e.notifier.changed(), i.J()), i
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeFeedbackType = d;
    var f = function(t) {
        function e(e, n) {
            var i = t.call(this) || this,
                s = e.song.channels[e.channel].instruments[e.getCurrentInstrument()].feedbackEnvelope;
            return s != n && (e.song.channels[e.channel].instruments[e.getCurrentInstrument()].feedbackEnvelope = n, e.notifier.changed(), i.J()), i
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeFeedbackEnvelope = f;
    var g = function(t) {
        function e(e, n, i) {
            var s = t.call(this) || this,
                a = e.song.channels[e.channel].instruments[e.getCurrentInstrument()].operators[n].envelope;
            return a != i && (e.song.channels[e.channel].instruments[e.getCurrentInstrument()].operators[n].envelope = i, e.notifier.changed(), s.J()), s
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeOperatorEnvelope = g;
    var m = function(t) {
        function e(e, n, i) {
            var s = t.call(this) || this,
                a = e.song.channels[e.channel].instruments[e.getCurrentInstrument()].operators[n].frequency;
            return a != i && (e.song.channels[e.channel].instruments[e.getCurrentInstrument()].operators[n].frequency = i, e.notifier.changed(), s.J()), s
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeOperatorFrequency = m;
    var b = function(t) {
        function e(e, n, i, s) {
            var a = t.call(this) || this;
            return e.song.channels[e.channel].instruments[e.getCurrentInstrument()].operators[n].amplitude = s, e.notifier.changed(), i != s && a.J(), a
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeOperatorAmplitude = b;
    var v = function(t) {
        function e(e, n, i) {
            var s = t.call(this) || this;
            return e.song.channels[e.channel].instruments[e.getCurrentInstrument()].feedbackAmplitude = i, e.notifier.changed(), n != i && s.J(), s
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeFeedbackAmplitude = v;
    var C = function(e) {
        function n(n, i) {
            var s = e.call(this) || this;
            if (n.song.instrumentsPerChannel != i) {
                for (var a = 0; a < n.song.getChannelCount(); a++) {
                    for (var r = n.song.channels[a].instruments[n.song.instrumentsPerChannel - 1], o = n.song.instrumentsPerChannel; i > o; o++) {
                        var h = new t.Instrument;
                        h.copy(r), n.song.channels[a].instruments[o] = h
                    }
                    n.song.channels[a].instruments.length = i;
                    for (var o = 0; o < n.song.patternsPerChannel; o++) n.song.channels[a].patterns[o].instrument >= i && (n.song.channels[a].patterns[o].instrument = 0)
                }
                n.song.instrumentsPerChannel = i, n.notifier.changed(), s.J()
            }
            return s
        }
        return __extends(n, e), n
    }(t.Change);
    t.ChangeInstrumentsPerChannel = C;
    var y = function(t) {
        function e(e, n) {
            var i = t.call(this) || this;
            return e.song.key != n && (e.song.key = n, e.notifier.changed(), i.J()), i
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeKey = y;
    var w = function(t) {
        function e(e, n, i, s, a) {
            var r = t.call(this) || this;
            return r.Q = e, r.oldStart = n, r.oldLength = i, r.newStart = s, r.newLength = a, r.Q.song.loopStart = r.newStart, r.Q.song.loopLength = r.newLength, r.Q.notifier.changed(), r.oldStart == r.newStart && r.oldLength == r.newLength || r.J(), r
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeLoop = w;
    var x = function(t) {
        function e(e, n, i, s, a) {
            void 0 === a && (a = !1);
            var r = t.call(this, a) || this;
            return r.Q = e, r.R = n, r._ = i, r.aa = s, r.J(), r.redo(), r
        }
        return __extends(e, t), e.prototype.M = function() {
            this.R.pitches.splice(this.aa, 0, this._), this.Q.notifier.changed()
        }, e.prototype.N = function() {
            this.R.pitches.splice(this.aa, 1), this.Q.notifier.changed()
        }, e
    }(t.UndoableChange);
    t.ChangePitchAdded = x;
    var Q = function(t) {
        function e(e, n, i) {
            var s = t.call(this) || this;
            return s.oldValue = n, e.song.channels[e.channel].octave = i, e.notifier.changed(), n != i && s.J(), s
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeOctave = Q;
    var N = function(t) {
        function e(e, n) {
            var i = t.call(this) || this;
            if (e.song.partsPerBeat != n) {
                for (var s = 0; s < e.song.getChannelCount(); s++)
                    for (var a = 0; a < e.song.channels[s].patterns.length; a++) i.append(new B(e, e.song.channels[s].patterns[a], e.song.partsPerBeat, n));
                e.song.partsPerBeat = n, e.notifier.changed(), i.J()
            }
            return i
        }
        return __extends(e, t), e
    }(t.ChangeGroup);
    t.ChangePartsPerBeat = N;
    var A = function(t) {
        function e(e, n, i, s, a) {
            var r = t.call(this) || this;
            return n.notes = i, e.song.partsPerBeat != a && r.append(new B(e, n, a, e.song.partsPerBeat)), e.song.beatsPerBar != s && r.append(new F(e, n, e.song.beatsPerBar * e.song.partsPerBeat, s * e.song.partsPerBeat)), e.notifier.changed(), r.J(), r
        }
        return __extends(e, t), e
    }(t.ChangeGroup);
    t.ChangePaste = A;
    var E = function(t) {
        function e(e, n, i) {
            var s = t.call(this) || this;
            return i.instrument != n && (i.instrument = n, e.notifier.changed(), s.J()), s
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangePatternInstrument = E;
    var P = function(e) {
        function n(n, i) {
            var s = e.call(this) || this;
            if (n.song.patternsPerChannel != i) {
                for (var a = 0; a < n.song.getChannelCount(); a++) {
                    for (var r = n.song.channels[a].bars, o = n.song.channels[a].patterns, h = 0; h < r.length; h++) r[h] > i && (r[h] = 0);
                    for (var h = o.length; i > h; h++) o[h] = new t.Pattern;
                    o.length = i
                }
                n.song.patternsPerChannel = i, n.notifier.changed(), s.J()
            }
            return s
        }
        return __extends(n, e), n
    }(t.Change);
    t.ChangePatternsPerChannel = P;
    var M = function(e) {
        function n(n, i, s, a) {
            var r = e.call(this, n, i) || this;
            a -= r.S;
            for (var o = r.W[s].time, h = Math.min(o, a), l = Math.max(o, a), c = !1, u = 0; u < r.W.length; u++) {
                var p = i.pins[u],
                    d = p.time;
                h > d ? r.X.push(t.makeNotePin(p.interval, d, p.volume)) : d > l && (c || (r.X.push(t.makeNotePin(r.W[s].interval, a, r.W[s].volume)), c = !0), r.X.push(t.makeNotePin(p.interval, d, p.volume)))
            }
            return c || r.X.push(t.makeNotePin(r.W[s].interval, a, r.W[s].volume)), r.$(), r
        }
        return __extends(n, e), n
    }(e);
    t.ChangePinTime = M;
    var k = function(e) {
        function n(n, i, s, a, r, o) {
            var h = e.call(this, n, i) || this;
            s -= h.S, a -= h.S, r -= i.pitches[o];
            var l, c, u, p, d = !1,
                f = !1,
                g = 0,
                m = 3,
                b = !0;
            for (a > s ? (l = 0, c = 1, u = i.pins.length, p = function(t) {
                    h.X.push(t)
                }) : (l = i.pins.length - 1, c = -1, u = -1, p = function(t) {
                    h.X.unshift(t)
                }); l != u; l += c)
                for (var v = i.pins[l], C = v.time;;)
                    if (d) {
                        if (f) {
                            if (C * c == a * c) break;
                            v.interval != g && (b = !1), p(t.makeNotePin(b ? r : v.interval, C, v.volume));
                            break
                        }
                        if (a * c >= C * c && (g = v.interval, m = v.volume), a * c > C * c) break;
                        p(t.makeNotePin(r, a, m)), f = !0
                    } else {
                        if (s * c >= C * c && (g = v.interval, m = v.volume), s * c > C * c) {
                            p(t.makeNotePin(v.interval, C, v.volume));
                            break
                        }
                        p(t.makeNotePin(g, s, m)), d = !0
                    }
            return f || p(t.makeNotePin(r, a, m)), h.$(), h
        }
        return __extends(n, e), n
    }(e);
    t.ChangePitchBend = k;
    var B = function(t) {
        function e(e, n, i, s) {
            var a, r = t.call(this) || this;
            if (i > s) a = function(t) {
                return Math.ceil(t * s / i)
            };
            else {
                if (!(s > i)) throw new Error("ChangeRhythm couldn't handle rhythm change from " + i + " to " + s + ".");
                a = function(t) {
                    return Math.floor(t * s / i)
                }
            }
            for (var o = 0; o < n.notes.length;) {
                var h = n.notes[o];
                a(h.start) >= a(h.end) ? r.append(new R(e, n, h, o, !0)) : (r.append(new S(e, h, a)), o++)
            }
            return r
        }
        return __extends(e, t), e
    }(t.ChangeSequence);
    t.ChangeRhythm = B;
    var S = function(e) {
        function n(n, i, s) {
            for (var a = e.call(this, n, i) || this, r = 0, o = a.W; r < o.length; r++) {
                var h = o[r];
                a.X.push(t.makeNotePin(h.interval, s(h.time + a.S) - a.S, h.volume))
            }
            return a.$(), a
        }
        return __extends(n, e), n
    }(e);
    t.ChangeRhythmNote = S;
    var L = function(t) {
        function e(e, n) {
            var i = t.call(this) || this;
            return e.song.scale != n && (e.song.scale = n, e.notifier.changed(), i.J()), i
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeScale = L;
    var I = function(t) {
        function e(e, n) {
            var i = t.call(this) || this;
            return e.song.fromBase64String(n), e.channel = Math.min(e.channel, e.song.getChannelCount() - 1), e.bar = Math.max(0, Math.min(e.song.barCount - 1, e.bar)), e.barScrollPos = Math.max(0, Math.min(e.song.barCount - e.trackVisibleBars, e.barScrollPos)), e.barScrollPos = Math.min(e.bar, Math.max(e.bar - (e.trackVisibleBars - 1), e.barScrollPos)), e.notifier.changed(), i.J(), i
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeSong = I;
    var G = function(t) {
        function e(e, n, i) {
            var s = t.call(this) || this;
            return e.song.tempo = i, e.notifier.changed(), n != i && s.J(), s
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeTempo = G;
    var D = function(t) {
        function e(e, n, i) {
            var s = t.call(this) || this;
            return e.song.reverb = i, e.notifier.changed(), n != i && s.J(), s
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeReverb = D;
    var R = function(t) {
        function e(e, n, i, s, a) {
            void 0 === a && (a = !1);
            var r = t.call(this, a) || this;
            return r.Q = e, r.ba = n, r.R = i, r.aa = s, r.J(), r.redo(), r
        }
        return __extends(e, t), e.prototype.M = function() {
            this.ba.notes.splice(this.aa, 0, this.R), this.Q.notifier.changed()
        }, e.prototype.N = function() {
            this.ba.notes.splice(this.aa, 1), this.Q.notifier.changed()
        }, e
    }(t.UndoableChange);
    t.ChangeNoteAdded = R;
    var T = function(e) {
        function n(n, i, s, a) {
            var r = e.call(this, n, i) || this;
            s -= r.S, a -= r.S;
            var o, h = !1,
                l = r.W[0].volume,
                c = r.W[0].interval,
                u = !0;
            for (o = 0; o < r.W.length; o++) {
                var p = r.W[o];
                if (p.time < s) l = p.volume, c = p.interval;
                else {
                    if (!(p.time <= a)) break;
                    if (p.time > s && !h && r.X.push(t.makeNotePin(c, s, l)), r.X.push(t.makeNotePin(p.interval, p.time, p.volume)), h = !0, p.time == a) {
                        u = !1;
                        break
                    }
                }
            }
            return u && r.X.push(t.makeNotePin(r.W[o].interval, a, r.W[o].volume)), r.$(), r
        }
        return __extends(n, e), n
    }(e);
    t.ChangeNoteLength = T;
    var F = function(t) {
        function e(e, n, i, s, a) {
            for (var r = t.call(this) || this, o = 0; o < n.notes.length;) {
                var h = n.notes[o];
                if (h == a && void 0 != a) o++;
                else if (h.end <= i) o++;
                else {
                    if (h.start >= s) break;
                    h.start < i ? (r.append(new T(e, h, h.start, i)), o++) : h.end > s ? (r.append(new T(e, h, s, h.end)), o++) : r.append(new R(e, n, h, o, !0))
                }
            }
            return r
        }
        return __extends(e, t), e
    }(t.ChangeSequence);
    t.ChangeNoteTruncate = F;
    var U = function(e) {
        function n(n, i, s) {
            var a = e.call(this, !1) || this;
            a.Q = n, a.R = i, a.W = i.pins, a.X = [], a.Y = i.pitches, a.Z = [];
            for (var r = n.song.getChannelIsDrum(n.channel) ? t.Config.drumCount - 1 : t.Config.maxPitch, o = 0; o < a.Y.length; o++) {
                var h = a.Y[o];
                if (s) {
                    for (var l = h + 1; r >= l; l++)
                        if (n.song.getChannelIsDrum(n.channel) || t.Config.scaleFlags[n.song.scale][l % 12]) {
                            h = l;
                            break
                        }
                } else
                    for (var l = h - 1; l >= 0; l--)
                        if (n.song.getChannelIsDrum(n.channel) || t.Config.scaleFlags[n.song.scale][l % 12]) {
                            h = l;
                            break
                        } for (var c = !1, l = 0; l < a.Z.length; l++)
                    if (a.Z[l] == h) {
                        c = !0;
                        break
                    }
                c || a.Z.push(h)
            }
            for (var u = 0, p = r, o = 1; o < a.Z.length; o++) {
                var d = a.Z[0] - a.Z[o];
                d > u && (u = d), p > d + r && (p = d + r)
            }
            for (var f = 0, g = a.W; f < g.length; f++) {
                var m = g[f],
                    b = m.interval + a.Y[0];
                if (u > b && (b = u), b > p && (b = p), s) {
                    for (var o = b + 1; p >= o; o++)
                        if (n.song.getChannelIsDrum(n.channel) || t.Config.scaleFlags[n.song.scale][o % 12]) {
                            b = o;
                            break
                        }
                } else
                    for (var o = b - 1; o >= u; o--)
                        if (n.song.getChannelIsDrum(n.channel) || t.Config.scaleFlags[n.song.scale][o % 12]) {
                            b = o;
                            break
                        }
                b -= a.Z[0], a.X.push(t.makeNotePin(b, m.time, m.volume))
            }
            if (0 != a.X[0].interval) throw new Error("wrong pin start interval");
            for (var o = 1; o < a.X.length - 1;) a.X[o - 1].interval == a.X[o].interval && a.X[o].interval == a.X[o + 1].interval && a.X[o - 1].volume == a.X[o].volume && a.X[o].volume == a.X[o + 1].volume ? a.X.splice(o, 1) : o++;
            return a.M(), a.J(), a
        }
        return __extends(n, e), n.prototype.M = function() {
            this.R.pins = this.X, this.R.pitches = this.Z, this.Q.notifier.changed()
        }, n.prototype.N = function() {
            this.R.pins = this.W, this.R.pitches = this.Y, this.Q.notifier.changed()
        }, n
    }(t.UndoableChange);
    t.ChangeTransposeNote = U;
    var V = function(t) {
        function e(e, n, i) {
            for (var s = t.call(this) || this, a = 0; a < n.notes.length; a++) s.append(new U(e, n.notes[a], i));
            return s
        }
        return __extends(e, t), e
    }(t.ChangeSequence);
    t.ChangeTranspose = V;
    var Z = function(t) {
        function e(e, n, i) {
            var s = t.call(this) || this;
            return e.song.channels[e.channel].instruments[e.getCurrentInstrument()].volume = i, e.notifier.changed(), n != i && s.J(), s
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeVolume = Z;
    var Y = function(e) {
        function n(n, i, s, a, r) {
            var o = e.call(this, !1) || this;
            o.Q = n, o.R = i, o.W = i.pins, o.X = [];
            for (var h = !1, l = 0, c = i.pins; l < c.length; l++) {
                var u = c[l];
                u.time < s ? o.X.push(u) : u.time == s ? (o.X.push(t.makeNotePin(r, s, a)), h = !0) : (h || (o.X.push(t.makeNotePin(r, s, a)), h = !0), o.X.push(u))
            }
            for (var p = 1; p < o.X.length - 1;) o.X[p - 1].interval == o.X[p].interval && o.X[p].interval == o.X[p + 1].interval && o.X[p - 1].volume == o.X[p].volume && o.X[p].volume == o.X[p + 1].volume ? o.X.splice(p, 1) : p++;
            return o.M(), o.J(), o
        }
        return __extends(n, e), n.prototype.M = function() {
            this.R.pins = this.X, this.Q.notifier.changed()
        }, n.prototype.N = function() {
            this.R.pins = this.W, this.Q.notifier.changed()
        }, n
    }(t.UndoableChange);
    t.ChangeVolumeBend = Y;
    var O = function(t) {
        function e(e, n) {
            var i = t.call(this) || this;
            return e.song.channels[e.channel].instruments[e.getCurrentInstrument()].wave != n && (e.song.channels[e.channel].instruments[e.getCurrentInstrument()].wave = n, e.notifier.changed(), i.J()), i
        }
        return __extends(e, t), e
    }(t.Change);
    t.ChangeWave = O
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    function e(t) {
        return t.toFixed(2).replace(/\.?0*$/, "")
    }

    function n(t) {
        var e = t.cloneNode(!1);
        return t.parentNode.replaceChild(e, t), e
    }
    var i = function() {
            function t() {
                this.valid = !1, this.prevNote = null, this.curNote = null, this.nextNote = null, this.pitch = 0, this.pitchIndex = -1, this.curIndex = 0, this.start = 0, this.end = 0, this.part = 0, this.notePart = 0, this.nearPinIndex = 0, this.pins = []
            }
            return t
        }(),
        s = function() {
            function s(s) {
                var a = this;
                this.Q = s, this.ca = t.svgElement("pattern", {
                    id: "patternEditorNoteBackground",
                    x: "0",
                    y: "0",
                    width: "64",
                    height: "156",
                    patternUnits: "userSpaceOnUse"
                }), this.da = t.svgElement("pattern", {
                    id: "patternEditorDrumBackground",
                    x: "0",
                    y: "0",
                    width: "64",
                    height: "40",
                    patternUnits: "userSpaceOnUse"
                }), this.ea = t.svgElement("rect", {
                    x: "0",
                    y: "0",
                    width: "512",
                    height: "481",
                    "pointer-events": "none",
                    fill: "url(#patternEditorNoteBackground)"
                }), this.fa = t.svgElement("svg"), this.ga = t.svgElement("rect", {
                    id: "",
                    x: "0",
                    y: "0",
                    width: "4",
                    height: "481",
                    fill: "white",
                    "pointer-events": "none"
                }), this.ha = t.svgElement("path", {
                    fill: "none",
                    stroke: "white",
                    "stroke-width": "2",
                    "pointer-events": "none"
                }), this.ia = t.svgElement("svg", {
                    style: "background-color: #000000; touch-action: none; position: absolute;",
                    width: "100%",
                    height: "100%",
                    viewBox: "0 0 512 481",
                    preserveAspectRatio: "none"
                }, [t.svgElement("defs", void 0, [this.ca, this.da]), this.ea, this.fa, this.ha, this.ga]), this.container = t.html.div({
                    style: "height: 100%; overflow:hidden; position: relative; flex-grow: 1;"
                }, [this.ia]), this.ja = 13, this.ka = 40, this.la = [], this.ma = t.svgElement("rect"), this.na = [
                    [t.makeNotePin(0, 0, 3), t.makeNotePin(0, 2, 3)],
                    [t.makeNotePin(0, 0, 3), t.makeNotePin(0, 2, 3)],
                    [t.makeNotePin(0, 0, 3), t.makeNotePin(0, 2, 3)],
                    [t.makeNotePin(0, 0, 3), t.makeNotePin(0, 2, 0)]
                ], this.oa = 481, this.pa = 0, this.qa = 0, this.ra = !1, this.sa = !1, this.ta = !1, this.ua = !1, this.va = !1, this.wa = [], this.xa = 0, this.ya = 0, this.za = 0, this.Aa = 0, this.Ba = 0, this.Ca = 0, this.Da = 0, this.Ea = !1, this.Fa = null, this.Ga = new i, this.ba = null, this.Ha = 0, this.Ia = 0, this.Ja = -1, this.Ka = -1, this.La = !1, this.Ma = !1, this.Na = -1, this.Oa = -1, this.Pa = -1, this.Qa = -1, this.resetCopiedPins = function() {
                    var e = a.Ra();
                    a.wa.length = a.Q.song.getChannelCount();
                    for (var n = 0; n < a.Q.song.pitchChannelCount; n++) a.wa[n] = [t.makeNotePin(0, 0, 3), t.makeNotePin(0, e, 3)];
                    for (var n = a.Q.song.pitchChannelCount; n < a.Q.song.getChannelCount(); n++) a.wa[n] = [t.makeNotePin(0, 0, 3), t.makeNotePin(0, e, 0)]
                }, this.Sa = function(n) {
                    var i = Math.floor(a.Q.synth.playhead);
                    if (a.Q.synth.playing && null != a.ba && a.Q.song.getPattern(a.Q.channel, Math.floor(a.Q.synth.playhead)) == a.ba) {
                        a.ga.setAttribute("visibility", "visible");
                        var s = a.Q.synth.playhead - i;
                        Math.abs(s - a.Ha) > .1 ? a.Ha = s : a.Ha += .2 * (s - a.Ha), a.ga.setAttribute("x", "" + e(a.Ha * a.Ta - 2))
                    } else a.ga.setAttribute("visibility", "hidden");
                    a.Q.synth.playing && a.Q.autoFollow && a.Qa != i && (new t.ChangeChannelBar(a.Q, a.Q.channel, i), a.Q.notifier.notifyWatchers()), a.Qa = i, window.requestAnimationFrame(a.Sa)
                }, this.Ua = function(t) {
                    a.sa || (a.sa = !0, a.va = !1)
                }, this.Va = function(t) {
                    a.sa && (a.sa = !1)
                }, this.Wa = function(t) {
                    if (t.preventDefault(), null != a.ba) {
                        var e = a.ia.getBoundingClientRect();
                        a.pa = ((t.clientX || t.pageX) - e.left) * a.Ta / (e.right - e.left), a.qa = ((t.clientY || t.pageY) - e.top) * a.oa / (e.bottom - e.top), isNaN(a.pa) && (a.pa = 0), isNaN(a.qa) && (a.qa = 0), a.va = !1, a.Xa()
                    }
                }, this.Ya = function(t) {
                    if (t.preventDefault(), null != a.ba) {
                        var e = a.ia.getBoundingClientRect();
                        a.pa = (t.touches[0].clientX - e.left) * a.Ta / (e.right - e.left), a.qa = (t.touches[0].clientY - e.top) * a.oa / (e.bottom - e.top), isNaN(a.pa) && (a.pa = 0), isNaN(a.qa) && (a.qa = 0), a.va = !0, a.Xa()
                    }
                }, this.Za = function(t) {
                    var e = a.ia.getBoundingClientRect();
                    a.pa = ((t.clientX || t.pageX) - e.left) * a.Ta / (e.right - e.left), a.qa = ((t.clientY || t.pageY) - e.top) * a.oa / (e.bottom - e.top), isNaN(a.pa) && (a.pa = 0), isNaN(a.qa) && (a.qa = 0), a.va = !1, a.$a()
                }, this._a = function(t) {
                    if (a.ra) {
                        t.preventDefault();
                        var e = a.ia.getBoundingClientRect();
                        a.pa = (t.touches[0].clientX - e.left) * a.Ta / (e.right - e.left), a.qa = (t.touches[0].clientY - e.top) * a.oa / (e.bottom - e.top), isNaN(a.pa) && (a.pa = 0), isNaN(a.qa) && (a.qa = 0), a.$a()
                    }
                }, this.ab = function(e) {
                    if (a.Ga.valid && null != a.ba) {
                        var n = a.Q.lastChangeWas(a.Fa);
                        if (a.ta && n) null != a.Fa && (a.Q.record(a.Fa), a.Fa = null);
                        else if (a.ra && n)
                            if (null == a.Ga.curNote) {
                                var i = t.makeNote(a.Ga.pitch, a.Ga.start, a.Ga.end, 3, a.Q.song.getChannelIsDrum(a.Q.channel));
                                i.pins = [];
                                for (var s = 0, r = a.Ga.pins; s < r.length; s++) {
                                    var o = r[s];
                                    i.pins.push(t.makeNotePin(0, o.time, o.volume))
                                }
                                a.Q.record(new t.ChangeNoteAdded(a.Q, a.ba, i, a.Ga.curIndex))
                            } else if (-1 == a.Ga.pitchIndex) {
                            var h = new t.ChangeSequence;
                            4 == a.Ga.curNote.pitches.length && h.append(new t.ChangePitchAdded(a.Q, a.Ga.curNote, a.Ga.curNote.pitches[0], 0, !0)), h.append(new t.ChangePitchAdded(a.Q, a.Ga.curNote, a.Ga.pitch, a.Ga.curNote.pitches.length)), a.Q.record(h), a.bb(a.Ga.curNote)
                        } else 1 == a.Ga.curNote.pitches.length ? a.Q.record(new t.ChangeNoteAdded(a.Q, a.ba, a.Ga.curNote, a.Ga.curIndex, !0)) : a.Q.record(new t.ChangePitchAdded(a.Q, a.Ga.curNote, a.Ga.pitch, a.Ga.curNote.pitches.indexOf(a.Ga.pitch), !0));
                        a.ra = !1, a.ta = !1, a.cb(), a.db()
                    }
                }, this.eb = function() {
                    a.Ta = a.Q.showLetters ? a.Q.showScrollBar ? 460 : 480 : a.Q.showScrollBar ? 492 : 512, a.ba = a.Q.getCurrentPattern(), a.fb = a.Ta / (a.Q.song.beatsPerBar * a.Q.song.partsPerBeat), a.gb = a.Q.song.getChannelIsDrum(a.Q.channel) ? a.ka : a.ja, a.hb = a.Q.song.getChannelIsDrum(a.Q.channel) ? t.Config.drumCount : t.Config.pitchCount, a.Ia = 12 * a.Q.song.channels[a.Q.channel].octave, a.Na == a.Q.song.partsPerBeat && a.Oa == a.Q.song.pitchChannelCount && a.Pa == a.Q.song.drumChannelCount || (a.Na = a.Q.song.partsPerBeat, a.Oa = a.Q.song.pitchChannelCount, a.Pa = a.Q.song.drumChannelCount, a.resetCopiedPins()), a.ib = a.wa[a.Q.channel], a.Ja != a.Ta && (a.Ja = a.Ta, a.ia.setAttribute("viewBox", "0 0 " + a.Ta + " 481"), a.ea.setAttribute("width", "" + a.Ta));
                    var i = a.Ta / a.Q.song.beatsPerBar;
                    if (a.Ka != i) {
                        a.Ka = i, a.ca.setAttribute("width", "" + i), a.da.setAttribute("width", "" + i), a.ma.setAttribute("width", "" + (i - 2));
                        for (var s = 0; 12 > s; s++) a.la[s].setAttribute("width", "" + (i - 2))
                    }
                    a.ra || a.cb(), a.fa = n(a.fa), a.db(), a.La != a.Q.showFifth && (a.La = a.Q.showFifth, a.la[7].setAttribute("fill", a.Q.showFifth ? "#446688" : "#444444"));
                    for (var s = 0; 12 > s; s++) a.la[s].style.visibility = t.Config.scaleFlags[a.Q.song.scale][s] ? "visible" : "hidden";
                    if (a.Q.song.getChannelIsDrum(a.Q.channel) ? a.Ma || (a.Ma = !0, a.ea.setAttribute("fill", "url(#patternEditorDrumBackground)"), a.ea.setAttribute("height", "" + a.ka * t.Config.drumCount)) : a.Ma && (a.Ma = !1, a.ea.setAttribute("fill", "url(#patternEditorNoteBackground)"), a.ea.setAttribute("height", "" + a.oa)), a.Q.showChannels)
                        for (var r = a.Q.song.getChannelCount() - 1; r >= 0; r--)
                            if (r != a.Q.channel && a.Q.song.getChannelIsDrum(r) == a.Q.song.getChannelIsDrum(a.Q.channel)) {
                                var o = a.Q.song.getPattern(r, a.Q.bar);
                                if (null != o)
                                    for (var h = 0, l = o.notes; h < l.length; h++)
                                        for (var c = l[h], u = 0, p = c.pitches; u < p.length; u++) {
                                            var d = p[u],
                                                f = t.svgElement("path");
                                            f.setAttribute("fill", a.Q.song.getNoteColorDim(r)), f.setAttribute("pointer-events", "none"), a.jb(f, d, c.start, c.pins, .19 * a.gb, !1, 12 * a.Q.song.channels[r].octave), a.fa.appendChild(f)
                                        }
                            }
                    if (null != a.ba) {
                        for (var g = 0, m = a.ba.notes; g < m.length; g++)
                            for (var c = m[g], b = 0; b < c.pitches.length; b++) {
                                var d = c.pitches[b],
                                    f = t.svgElement("path");
                                if (f.setAttribute("fill", a.Q.song.getNoteColorDim(a.Q.channel)), f.setAttribute("pointer-events", "none"), a.jb(f, d, c.start, c.pins, a.gb / 2 + 1, !1, a.Ia), a.fa.appendChild(f), f = t.svgElement("path"), f.setAttribute("fill", a.Q.song.getNoteColorBright(a.Q.channel)), f.setAttribute("pointer-events", "none"), a.jb(f, d, c.start, c.pins, a.gb / 2 + 1, !0, a.Ia), a.fa.appendChild(f), c.pitches.length > 1 && !a.Q.song.getChannelIsDrum(a.Q.channel)) {
                                    var v = a.Q.song.channels[a.Q.channel].instruments[a.Q.getCurrentInstrument()].type;
                                    if (1 == v) {
                                        var C = t.svgElement("text");
                                        C.setAttribute("x", "" + e(a.fb * c.start + 2)), C.setAttribute("y", "" + e(a.kb(d - a.Ia))), C.setAttribute("width", "30"), C.setAttribute("fill", "black"), C.setAttribute("text-anchor", "start"), C.setAttribute("dominant-baseline", "central"), C.setAttribute("pointer-events", "none"), C.textContent = "" + (b + 1), a.fa.appendChild(C)
                                    }
                                }
                            }
                        a.ea.style.visibility = "visible"
                    } else a.ea.style.visibility = "hidden"
                };
                for (var r = 0; 12 > r; r++) {
                    var o = (12 - r) % 12,
                        h = t.svgElement("rect");
                    h.setAttribute("x", "1"), h.setAttribute("y", "" + (o * this.ja + 1)), h.setAttribute("height", "" + (this.ja - 2)), h.setAttribute("fill", 0 == r ? "#886644" : "#444444"), this.ca.appendChild(h), this.la[r] = h
                }
                this.ma.setAttribute("x", "1"), this.ma.setAttribute("y", "1"), this.ma.setAttribute("height", "" + (this.ka - 2)), this.ma.setAttribute("fill", "#444444"), this.da.appendChild(this.ma), this.Q.notifier.watch(this.eb), this.eb(), this.cb(), this.db(), window.requestAnimationFrame(this.Sa), this.ia.addEventListener("mousedown", this.Wa), document.addEventListener("mousemove", this.Za), document.addEventListener("mouseup", this.ab), this.ia.addEventListener("mouseover", this.Ua), this.ia.addEventListener("mouseout", this.Va), this.ia.addEventListener("touchstart", this.Ya), this.ia.addEventListener("touchmove", this._a), this.ia.addEventListener("touchend", this.ab), this.ia.addEventListener("touchcancel", this.ab), this.resetCopiedPins()
            }
            return s.prototype.Ra = function() {
                return this.Q.song.partsPerBeat % 3 == 0 ? this.Q.song.partsPerBeat / 3 : this.Q.song.partsPerBeat % 2 == 0 ? this.Q.song.partsPerBeat / 2 : this.Q.song.partsPerBeat
            }, s.prototype.cb = function() {
                if (null != this.ba && (this.Ga = new i, !(this.pa < 0 || this.pa > this.Ta || this.qa < 0 || this.qa > this.oa))) {
                    this.Ga.part = Math.floor(Math.max(0, Math.min(this.Q.song.beatsPerBar * this.Q.song.partsPerBeat - 1, this.pa / this.fb)));
                    for (var e = 0, n = this.ba.notes; e < n.length; e++) {
                        var s = n[e];
                        if (s.end <= this.Ga.part) this.Ga.prevNote = s, this.Ga.curIndex++;
                        else if (s.start <= this.Ga.part && s.end > this.Ga.part) this.Ga.curNote = s;
                        else if (s.start > this.Ga.part) {
                            this.Ga.nextNote = s;
                            break
                        }
                    }
                    var a = this.lb(this.qa);
                    if (null != this.Ga.curNote) {
                        this.Ga.start = this.Ga.curNote.start, this.Ga.end = this.Ga.curNote.end, this.Ga.pins = this.Ga.curNote.pins;
                        for (var r = 0, o = 0, h = void 0, l = this.Ga.curNote.pins[0], c = 1; c < this.Ga.curNote.pins.length; c++) {
                            h = l, l = this.Ga.curNote.pins[c];
                            var u = this.fb * (this.Ga.curNote.start + h.time),
                                p = this.fb * (this.Ga.curNote.start + l.time);
                            if (!(this.pa > p)) {
                                if (this.pa < u) throw new Error;
                                var d = (this.pa - u) / (p - u),
                                    f = Math.sqrt(1 / Math.sqrt(4) - Math.pow(d - .5, 2)) - .5,
                                    g = Math.abs(l.interval - h.interval);
                                r = h.interval * (1 - d) + l.interval * d, o = f * g + .95;
                                break
                            }
                        }
                        for (var m = Number.MAX_VALUE, b = -Number.MAX_VALUE, v = Number.MAX_VALUE, C = 0, y = this.Ga.curNote.pins; C < y.length; C++) {
                            var w = y[C];
                            m > w.interval && (m = w.interval), b < w.interval && (b = w.interval);
                            var x = Math.abs(this.Ga.curNote.start + w.time - this.pa / this.fb);
                            v > x && (v = x, this.Ga.nearPinIndex = this.Ga.curNote.pins.indexOf(w))
                        }
                        if (a -= r, this.Ga.pitch = this.mb(a, -m, (this.Q.song.getChannelIsDrum(this.Q.channel) ? t.Config.drumCount - 1 : t.Config.maxPitch) - b), !this.Q.song.getChannelIsDrum(this.Q.channel))
                            for (var Q = o, N = 0; N < this.Ga.curNote.pitches.length; N++) {
                                var A = Math.abs(this.Ga.curNote.pitches[N] - a + .5);
                                A > Q || (Q = A, this.Ga.pitch = this.Ga.curNote.pitches[N])
                            }
                        for (var N = 0; N < this.Ga.curNote.pitches.length; N++)
                            if (this.Ga.curNote.pitches[N] == this.Ga.pitch) {
                                this.Ga.pitchIndex = N;
                                break
                            }
                    } else {
                        this.Ga.pitch = this.mb(a, 0, t.Config.maxPitch);
                        var E = this.ib[this.ib.length - 1].time,
                            P = Math.floor(this.Ga.part / this.Q.song.partsPerBeat),
                            M = this.Ra(),
                            k = this.Ga.part % this.Q.song.partsPerBeat;
                        if (1 == E) this.Ga.start = this.Ga.part;
                        else if (E > this.Q.song.partsPerBeat) this.Ga.start = P * this.Q.song.partsPerBeat;
                        else if (E == this.Q.song.partsPerBeat) this.Ga.start = P * this.Q.song.partsPerBeat, M < this.Q.song.partsPerBeat && k > M && (this.Ga.start += Math.floor(k / M) * M);
                        else {
                            this.Ga.start = P * this.Q.song.partsPerBeat;
                            for (var B = this.Q.song.partsPerBeat % E == 0 ? E : Math.min(E, M); M > B && this.Q.song.partsPerBeat % B != 0;) B++;
                            this.Ga.start += Math.floor(k / B) * B
                        }
                        this.Ga.end = this.Ga.start + E;
                        var S = 0,
                            L = this.Q.song.beatsPerBar * this.Q.song.partsPerBeat;
                        if (null != this.Ga.prevNote && (S = this.Ga.prevNote.end), null != this.Ga.nextNote && (L = this.Ga.nextNote.start), this.Ga.start < S ? (this.Ga.start = S, this.Ga.end = this.Ga.start + E, this.Ga.end > L && (this.Ga.end = L)) : this.Ga.end > L && (this.Ga.end = L, this.Ga.start = this.Ga.end - E, this.Ga.start < S && (this.Ga.start = S)), this.Ga.end - this.Ga.start == E) this.Ga.pins = this.ib;
                        else {
                            this.Ga.pins = [];
                            for (var I = 0, G = this.ib; I < G.length; I++) {
                                var D = G[I];
                                if (!(D.time <= this.Ga.end - this.Ga.start)) {
                                    this.Ga.pins.push(t.makeNotePin(0, this.Ga.end - this.Ga.start, D.volume));
                                    break
                                }
                                if (this.Ga.pins.push(t.makeNotePin(0, D.time, D.volume)), D.time == this.Ga.end - this.Ga.start) break
                            }
                        }
                    }
                    this.Ga.valid = !0
                }
            }, s.prototype.lb = function(t) {
                return Math.max(0, Math.min(this.hb - 1, this.hb - t / this.gb)) + this.Ia
            }, s.prototype.mb = function(e, n, i) {
                n > e && (e = n), e > i && (e = i);
                var s = t.Config.scaleFlags[this.Q.song.scale];
                if (s[Math.floor(e) % 12] || this.Q.song.getChannelIsDrum(this.Q.channel)) return Math.floor(e);
                for (var a = Math.floor(e) + 1, r = Math.floor(e) - 1; !s[a % 12];) a++;
                for (; !s[r % 12];) r--;
                if (a > i) return n > r ? n : r;
                if (n > r) return a;
                var o = a,
                    h = r + 1;
                return a % 12 != 0 && a % 12 != 7 || (o -= .5), r % 12 != 0 && r % 12 != 7 || (h += .5), e - h > o - e ? a : r
            }, s.prototype.bb = function(e) {
                this.ib = [];
                for (var n = 0, i = e.pins; n < i.length; n++) {
                    var s = i[n];
                    this.ib.push(t.makeNotePin(0, s.time, s.volume))
                }
                for (var a = 1; a < this.ib.length - 1;) this.ib[a - 1].volume == this.ib[a].volume && this.ib[a].volume == this.ib[a + 1].volume ? this.ib.splice(a, 1) : a++;
                this.wa[this.Q.channel] = this.ib
            }, s.prototype.Xa = function() {
                this.ra = !0, this.xa = this.pa, this.ya = this.qa, this.za = this.pa, this.Aa = this.qa, this.cb(), this.db(), this.Fa = new t.ChangeSequence, this.Q.setProspectiveChange(this.Fa)
            }, s.prototype.$a = function() {
                var e, n;
                if (null != this.ba) {
                    var i = this.Q.lastChangeWas(this.Fa);
                    if (this.ra && this.Ga.valid && i) {
                        if (!this.ta) {
                            var s = this.pa - this.xa,
                                a = this.qa - this.ya;
                            Math.sqrt(s * s + a * a) > 5 && (this.ta = !0, this.ua = Math.abs(s) >= Math.abs(a))
                        }
                        if (this.ta) {
                            null != this.Fa && this.Fa.undo();
                            var r = Math.floor(this.pa / this.fb),
                                o = new t.ChangeSequence;
                            if (this.Fa = o, this.Q.setProspectiveChange(this.Fa), null == this.Ga.curNote) {
                                var h = void 0,
                                    l = void 0;
                                r < this.Ga.start ? (h = !0, l = this.Ga.start - r) : (h = !1, l = r - this.Ga.start + 1);
                                for (var c = 1, u = 0; u <= this.Q.song.beatsPerBar * this.Q.song.partsPerBeat; u++)
                                    if (!(u >= 5 && u % this.Q.song.partsPerBeat != 0 && u != 3 * this.Q.song.partsPerBeat / 2 && u != 4 * this.Q.song.partsPerBeat / 3 && u != 5 * this.Q.song.partsPerBeat / 3)) {
                                        var p = u;
                                        if (p == l) {
                                            c = p;
                                            break
                                        }
                                        if (l > p && (c = p), p > l) {
                                            l - 1 > c && (c = p);
                                            break
                                        }
                                    }
                                h ? (n = this.Ga.start, e = n - c) : (e = this.Ga.start, n = e + c), 0 > e && (e = 0), n > this.Q.song.beatsPerBar * this.Q.song.partsPerBeat && (n = this.Q.song.beatsPerBar * this.Q.song.partsPerBeat), o.append(new t.ChangeNoteTruncate(this.Q, this.ba, e, n));
                                var d = void 0;
                                for (d = 0; d < this.ba.notes.length && !(this.ba.notes[d].start >= n); d++);
                                var f = t.makeNote(this.Ga.pitch, e, n, 3, this.Q.song.getChannelIsDrum(this.Q.channel));
                                o.append(new t.ChangeNoteAdded(this.Q, this.ba, f, d)), this.bb(f), this.Ba = h ? e : n, this.Ca = this.Ga.pitch, this.Da = f.pins[h ? 0 : 1].volume, this.Ea = !0
                            } else if (this.ua) {
                                var g = Math.round((this.pa - this.xa) / this.fb),
                                    m = this.Ga.curNote.pins[this.Ga.nearPinIndex],
                                    b = this.Ga.curNote.start + m.time + g;
                                0 > b && (b = 0), b > this.Q.song.beatsPerBar * this.Q.song.partsPerBeat && (b = this.Q.song.beatsPerBar * this.Q.song.partsPerBeat), b <= this.Ga.curNote.start && this.Ga.nearPinIndex == this.Ga.curNote.pins.length - 1 || b >= this.Ga.curNote.end && 0 == this.Ga.nearPinIndex ? (o.append(new t.ChangeNoteAdded(this.Q, this.ba, this.Ga.curNote, this.Ga.curIndex, !0)), this.Ea = !1) : (e = Math.min(this.Ga.curNote.start, b), n = Math.max(this.Ga.curNote.end, b), this.Ba = b, this.Ca = this.Ga.curNote.pitches[-1 == this.Ga.pitchIndex ? 0 : this.Ga.pitchIndex] + this.Ga.curNote.pins[this.Ga.nearPinIndex].interval, this.Da = this.Ga.curNote.pins[this.Ga.nearPinIndex].volume, this.Ea = !0, o.append(new t.ChangeNoteTruncate(this.Q, this.ba, e, n, this.Ga.curNote)), o.append(new t.ChangePinTime(this.Q, this.Ga.curNote, this.Ga.nearPinIndex, b)), this.bb(this.Ga.curNote))
                            } else if (-1 == this.Ga.pitchIndex) {
                                for (var v = Math.round(Math.max(this.Ga.curNote.start, Math.min(this.Ga.curNote.end, this.pa / this.fb))) - this.Ga.curNote.start, C = void 0, y = this.Ga.curNote.pins[0], w = 0, x = 0, d = 1; d < this.Ga.curNote.pins.length; d++)
                                    if (C = y, y = this.Ga.curNote.pins[d], !(v > y.time)) {
                                        if (v < C.time) throw new Error;
                                        var Q = (v - C.time) / (y.time - C.time);
                                        w = Math.round(C.volume * (1 - Q) + y.volume * Q + (this.ya - this.qa) / 25), 0 > w && (w = 0), w > 3 && (w = 3), x = this.mb(C.interval * (1 - Q) + y.interval * Q + this.Ga.curNote.pitches[0], 0, t.Config.maxPitch) - this.Ga.curNote.pitches[0];
                                        break
                                    }
                                this.Ba = this.Ga.curNote.start + v, this.Ca = this.Ga.curNote.pitches[-1 == this.Ga.pitchIndex ? 0 : this.Ga.pitchIndex] + x, this.Da = w, this.Ea = !0, o.append(new t.ChangeVolumeBend(this.Q, this.Ga.curNote, v, w, x)), this.bb(this.Ga.curNote)
                            } else {
                                this.Da = this.Ga.curNote.pins[this.Ga.nearPinIndex].volume;
                                var N = void 0,
                                    A = void 0;
                                this.pa >= this.xa ? (N = this.Ga.part, A = r + 1) : (N = this.Ga.part + 1, A = r), 0 > A && (A = 0), A > this.Q.song.beatsPerBar * this.Q.song.partsPerBeat && (A = this.Q.song.beatsPerBar * this.Q.song.partsPerBeat), A > this.Ga.curNote.end && o.append(new t.ChangeNoteTruncate(this.Q, this.ba, this.Ga.curNote.start, A, this.Ga.curNote)), A < this.Ga.curNote.start && o.append(new t.ChangeNoteTruncate(this.Q, this.ba, A, this.Ga.curNote.end, this.Ga.curNote));
                                for (var E = Number.MAX_VALUE, P = -Number.MAX_VALUE, M = 0, k = this.Ga.curNote.pitches; M < k.length; M++) {
                                    var B = k[M];
                                    E > B && (E = B), B > P && (P = B)
                                }
                                E -= this.Ga.curNote.pitches[this.Ga.pitchIndex], P -= this.Ga.curNote.pitches[this.Ga.pitchIndex];
                                var S = this.mb(this.lb(this.qa), -E, (this.Q.song.getChannelIsDrum(this.Q.channel) ? t.Config.drumCount - 1 : t.Config.maxPitch) - P);
                                o.append(new t.ChangePitchBend(this.Q, this.Ga.curNote, N, A, S, this.Ga.pitchIndex)), this.bb(this.Ga.curNote), this.Ba = A, this.Ca = S, this.Ea = !0
                            }
                        }
                        this.za = this.pa, this.Aa = this.qa
                    } else this.cb(), this.db()
                }
            }, s.prototype.db = function() {
                if (this.va)
                    if (this.ra && this.Ga.valid && this.ta && this.Ea && null != this.ba) {
                        this.ha.setAttribute("visibility", "visible");
                        var t = this.fb * this.Ba,
                            n = this.kb(this.Ca - this.Ia),
                            i = this.gb / 2,
                            s = 80,
                            a = 60,
                            r = "";
                        r += "M " + e(t) + " " + e(n - i * (this.Da / 3)) + " ", r += "L " + e(t) + " " + e(n - i * (this.Da / 3) - a) + " ", r += "M " + e(t) + " " + e(n + i * (this.Da / 3)) + " ", r += "L " + e(t) + " " + e(n + i * (this.Da / 3) + a) + " ", r += "M " + e(t) + " " + e(n - i * (this.Da / 3)) + " ", r += "L " + e(t + s) + " " + e(n - i * (this.Da / 3)) + " ", r += "M " + e(t) + " " + e(n + i * (this.Da / 3)) + " ", r += "L " + e(t + s) + " " + e(n + i * (this.Da / 3)) + " ", r += "M " + e(t) + " " + e(n - i * (this.Da / 3)) + " ", r += "L " + e(t - s) + " " + e(n - i * (this.Da / 3)) + " ", r += "M " + e(t) + " " + e(n + i * (this.Da / 3)) + " ", r += "L " + e(t - s) + " " + e(n + i * (this.Da / 3)) + " ", this.ha.setAttribute("d", r)
                    } else this.ha.setAttribute("visibility", "hidden");
                else this.sa && !this.ra && this.Ga.valid && null != this.ba ? (this.ha.setAttribute("visibility", "visible"), this.jb(this.ha, this.Ga.pitch, this.Ga.start, this.Ga.pins, this.gb / 2 + 1, !0, this.Ia)) : this.ha.setAttribute("visibility", "hidden")
            }, s.prototype.jb = function(t, n, i, s, a, r, o) {
                for (var h = s[0], l = "M " + e(this.fb * (i + h.time) + 1) + " " + e(this.kb(n - o) + a * (r ? h.volume / 3 : 1)) + " ", c = 1; c < s.length; c++) {
                    var u = h;
                    h = s[c];
                    var p = this.fb * (i + u.time) + (1 == c ? 1 : 0),
                        d = this.fb * (i + h.time) - (c == s.length - 1 ? 1 : 0),
                        f = this.kb(n + u.interval - o),
                        g = this.kb(n + h.interval - o),
                        m = r ? u.volume / 3 : 1,
                        b = r ? h.volume / 3 : 1;
                    l += "L " + e(p) + " " + e(f - a * m) + " ", u.interval > h.interval && (l += "L " + e(p + 1) + " " + e(f - a * m) + " "), u.interval < h.interval && (l += "L " + e(d - 1) + " " + e(g - a * b) + " "), l += "L " + e(d) + " " + e(g - a * b) + " "
                }
                for (var c = s.length - 2; c >= 0; c--) {
                    var u = h;
                    h = s[c];
                    var p = this.fb * (i + u.time) - (c == s.length - 2 ? 1 : 0),
                        d = this.fb * (i + h.time) + (0 == c ? 1 : 0),
                        f = this.kb(n + u.interval - o),
                        g = this.kb(n + h.interval - o),
                        m = r ? u.volume / 3 : 1,
                        b = r ? h.volume / 3 : 1;
                    l += "L " + e(p) + " " + e(f + a * m) + " ", u.interval < h.interval && (l += "L " + e(p - 1) + " " + e(f + a * m) + " "), u.interval > h.interval && (l += "L " + e(d + 1) + " " + e(g + a * b) + " "), l += "L " + e(d) + " " + e(g + a * b) + " "
                }
                l += "z", t.setAttribute("d", l)
            }, s.prototype.kb = function(t) {
                return this.gb * (this.hb - t - .5)
            }, s
        }();
    t.PatternEditor = s
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    var e = function() {
            function e(e, n, i, s) {
                this.nb = t.html.text("1"), this.ob = t.svgElement("text", {
                    x: 16,
                    y: 23,
                    "font-family": "sans-serif",
                    "font-size": 20,
                    "text-anchor": "middle",
                    "font-weight": "bold",
                    fill: "red"
                }, [this.nb]), this.pb = t.svgElement("rect", {
                    width: 30,
                    height: 30,
                    x: 1,
                    y: 1
                }), this.container = t.svgElement("svg", void 0, [this.pb, this.ob]), this.qb = 1, this.rb = !0, this.sb = !1, this.tb = "", this.container.setAttribute("x", "" + 32 * n), this.container.setAttribute("y", "" + 32 * i), this.pb.setAttribute("fill", "#444444"), this.ob.setAttribute("fill", s)
            }
            return e.prototype.setSquashed = function(t, e) {
                t ? (this.container.setAttribute("y", "" + 27 * e), this.pb.setAttribute("height", "25"), this.ob.setAttribute("y", "21")) : (this.container.setAttribute("y", "" + 32 * e), this.pb.setAttribute("height", "30"), this.ob.setAttribute("y", "23"))
            }, e.prototype.setIndex = function(t, e, n, i, s) {
                this.qb != t && (this.sb || 0 == t == (0 == this.qb) || this.pb.setAttribute("fill", 0 == t ? "#000000" : "#444444"), this.qb = t, this.nb.data = "" + t), this.rb == e && this.tb == s || (this.rb = e, n ? this.ob.setAttribute("fill", "#000000") : this.ob.setAttribute("fill", s)), this.sb == n && this.tb == s || (this.sb = n, n ? (this.pb.setAttribute("fill", s), this.ob.setAttribute("fill", "#000000")) : (this.pb.setAttribute("fill", 0 == this.qb ? "#000000" : "#444444"), this.ob.setAttribute("fill", s))), this.tb = s
            }, e
        }(),
        n = function() {
            function n(e, n) {
                var i = this;
                this.Q = e, this.ub = n, this.vb = 32, this.ia = t.svgElement("svg", {
                    style: "background-color: #000000; position: absolute;",
                    height: 128
                }), this.wb = t.html.select({
                    className: "trackSelectBox",
                    style: "width: 32px; height: 32px; background: none; border: none; appearance: none; color: transparent; position: absolute;"
                }), this.container = t.html.div({
                    style: "height: 128px; position: relative; overflow:hidden;"
                }, [this.ia, this.wb]), this.xb = t.svgElement("g"), this.yb = t.svgElement("rect", {
                    fill: "white",
                    x: 0,
                    y: 0,
                    width: 4,
                    height: 128
                }), this.zb = t.svgElement("rect", {
                    fill: "none",
                    stroke: "white",
                    "stroke-width": 2,
                    "pointer-events": "none",
                    x: 1,
                    y: 1,
                    width: 30,
                    height: 30
                }), this.Ab = t.svgElement("path", {
                    fill: "black",
                    stroke: "black",
                    "stroke-width": 1,
                    "pointer-events": "none"
                }), this.Bb = t.svgElement("path", {
                    fill: "black",
                    stroke: "black",
                    "stroke-width": 1,
                    "pointer-events": "none"
                }), this.Cb = [], this.pa = 0, this.qa = 0, this.ba = null, this.sa = !1, this.Db = "", this.oa = 128, this.Eb = 32, this.Fb = 0, this.Gb = 0, this.Hb = 0, this.Ib = -1, this.Jb = !1, this.Kb = null, this.Lb = function() {
                    i.Mb(i.wb.selectedIndex)
                }, this.Sa = function(t) {
                    var e = i.vb * i.Q.synth.playhead - 2;
                    i.Ib != e && (i.Ib = e, i.yb.setAttribute("x", "" + e)), window.requestAnimationFrame(i.Sa)
                }, this.Ua = function(t) {
                    i.sa || (i.sa = !0)
                }, this.Va = function(t) {
                    i.sa && (i.sa = !1)
                }, this.Wa = function(t) {
                    t.preventDefault();
                    var e = i.ia.getBoundingClientRect();
                    i.pa = (t.clientX || t.pageX) - e.left, i.qa = (t.clientY || t.pageY) - e.top;
                    var n = Math.floor(Math.min(i.Q.song.getChannelCount() - 1, Math.max(0, i.qa / i.Eb))),
                        s = Math.floor(Math.min(i.Q.song.barCount - 1, Math.max(0, i.pa / i.vb)));
                    if (i.Q.channel == n && i.Q.bar == s) {
                        var a = i.qa % i.Eb < i.Eb / 2,
                            r = i.Q.song.patternsPerChannel;
                        i.Mb((i.Q.song.channels[n].bars[s] + (a ? 1 : r)) % (r + 1))
                    } else i.Nb(n, s)
                }, this.Za = function(t) {
                    var e = i.ia.getBoundingClientRect();
                    i.pa = (t.clientX || t.pageX) - e.left, i.qa = (t.clientY || t.pageY) - e.top, i.db()
                }, this.Ob = function(t) {}, this.ia.appendChild(this.xb), this.ia.appendChild(this.zb), this.ia.appendChild(this.Ab), this.ia.appendChild(this.Bb), this.ia.appendChild(this.yb), window.requestAnimationFrame(this.Sa), this.ia.addEventListener("mousedown", this.Wa), document.addEventListener("mousemove", this.Za), document.addEventListener("mouseup", this.Ob), this.ia.addEventListener("mouseover", this.Ua), this.ia.addEventListener("mouseout", this.Va), this.wb.addEventListener("change", this.Lb)
            }
            return n.prototype.Nb = function(e, n) {
                new t.ChangeChannelBar(this.Q, e, n), this.Db = "", this.Q.forgetLastChange()
            }, n.prototype.Mb = function(e) {
                var n = this.Q.song.channels[this.Q.channel].bars[this.Q.bar],
                    i = this.Q.lastChangeWas(this.Kb),
                    s = i ? this.Kb.oldValue : n;
                e != n && (this.Kb = new t.ChangePattern(this.Q, s, e), this.Q.record(this.Kb, i))
            }, n.prototype.onKeyPressed = function(t) {
                switch (t.keyCode) {
                    case 38:
                        this.Nb((this.Q.channel - 1 + this.Q.song.getChannelCount()) % this.Q.song.getChannelCount(), this.Q.bar), t.preventDefault();
                        break;
                    case 40:
                        this.Nb((this.Q.channel + 1) % this.Q.song.getChannelCount(), this.Q.bar), t.preventDefault();
                        break;
                    case 37:
                        this.Nb(this.Q.channel, (this.Q.bar + this.Q.song.barCount - 1) % this.Q.song.barCount), t.preventDefault();
                        break;
                    case 39:
                        this.Nb(this.Q.channel, (this.Q.bar + 1) % this.Q.song.barCount), t.preventDefault();
                        break;
                    case 48:
                        this.Pb("0"), t.preventDefault();
                        break;
                    case 49:
                        this.Pb("1"), t.preventDefault();
                        break;
                    case 50:
                        this.Pb("2"), t.preventDefault();
                        break;
                    case 51:
                        this.Pb("3"), t.preventDefault();
                        break;
                    case 52:
                        this.Pb("4"), t.preventDefault();
                        break;
                    case 53:
                        this.Pb("5"), t.preventDefault();
                        break;
                    case 54:
                        this.Pb("6"), t.preventDefault();
                        break;
                    case 55:
                        this.Pb("7"), t.preventDefault();
                        break;
                    case 56:
                        this.Pb("8"), t.preventDefault();
                        break;
                    case 57:
                        this.Pb("9"), t.preventDefault();
                        break;
                    default:
                        this.Db = ""
                }
            }, n.prototype.Pb = function(t) {
                this.Db += t;
                var e = parseInt(this.Db);
                return e <= this.Q.song.patternsPerChannel ? void this.Mb(e) : (this.Db = t, e = parseInt(this.Db), e <= this.Q.song.patternsPerChannel ? void this.Mb(e) : void(this.Db = ""))
            }, n.prototype.db = function() {
                var e = Math.floor(Math.min(this.Q.song.getChannelCount() - 1, Math.max(0, this.qa / this.Eb))),
                    n = Math.floor(Math.min(this.Q.song.barCount - 1, Math.max(0, this.pa / this.vb))),
                    i = window.innerWidth > 700;
                i || (n = this.Q.bar, e = this.Q.channel);
                var s = n == this.Q.bar && e == this.Q.channel;
                if (this.sa && !s ? (this.zb.setAttribute("x", "" + (1 + this.vb * n)), this.zb.setAttribute("y", "" + (1 + this.Eb * e)), this.zb.setAttribute("height", "" + (this.Eb - 2)), this.zb.style.visibility = "visible") : this.zb.style.visibility = "hidden", !this.sa && i || !s) this.Ab.style.visibility = "hidden", this.Bb.style.visibility = "hidden";
                else {
                    var a = this.qa % this.Eb < this.Eb / 2,
                        r = this.vb * (n + .8),
                        o = this.Eb * (e + .5),
                        h = .1 * this.Eb,
                        l = .4 * this.Eb,
                        c = .175 * this.Eb;
                    this.Ab.setAttribute("fill", a && i ? "#fff" : "#000"), this.Bb.setAttribute("fill", !a && i ? "#fff" : "#000"), this.Ab.setAttribute("d", "M " + r + " " + (o - l) + " L " + (r + c) + " " + (o - h) + " L " + (r - c) + " " + (o - h) + " z"), this.Bb.setAttribute("d", "M " + r + " " + (o + l) + " L " + (r + c) + " " + (o + h) + " L " + (r - c) + " " + (o + h) + " z"), this.Ab.style.visibility = "visible", this.Bb.style.visibility = "visible"
                }
                this.wb.style.left = this.vb * this.Q.bar + "px", this.wb.style.top = this.Eb * this.Q.channel + "px", this.wb.style.height = this.Eb + "px";
                for (var u = this.Q.song.patternsPerChannel, p = this.Hb; u > p; p++) this.wb.appendChild(t.html.option(p, p, !1, !1));
                for (var p = u; p < this.Hb; p++) this.wb.removeChild(this.wb.lastChild);
                this.Hb = u;
                var d = this.Q.song.channels[this.Q.channel].bars[this.Q.bar];
                this.wb.selectedIndex != d && (this.wb.selectedIndex = d)
            }, n.prototype.render = function() {
                this.ba = this.Q.getCurrentPattern();
                var t = window.innerWidth > 700,
                    n = !t || this.Q.song.getChannelCount() > 4 || this.Q.song.barCount > this.Q.trackVisibleBars && this.Q.song.getChannelCount() > 3;
                if (this.Eb = n ? 27 : 32, this.Fb != this.Q.song.getChannelCount()) {
                    for (var i = this.Fb; i < this.Q.song.getChannelCount(); i++) {
                        this.Cb[i] = [];
                        for (var s = 0; s < this.Gb; s++) {
                            var a = new e(i, s, i, this.Q.song.getChannelColorDim(i));
                            a.setSquashed(n, i), this.xb.appendChild(a.container), this.Cb[i][s] = a
                        }
                    }
                    for (var i = this.Q.song.getChannelCount(); i < this.Fb; i++)
                        for (var s = 0; s < this.Gb; s++) this.xb.removeChild(this.Cb[i][s].container);
                    this.Cb.length = this.Q.song.getChannelCount()
                }
                if (this.Gb != this.Q.song.barCount) {
                    for (var i = 0; i < this.Q.song.getChannelCount(); i++) {
                        for (var s = this.Gb; s < this.Q.song.barCount; s++) {
                            var a = new e(i, s, i, this.Q.song.getChannelColorDim(i));
                            a.setSquashed(n, i), this.xb.appendChild(a.container), this.Cb[i][s] = a
                        }
                        for (var s = this.Q.song.barCount; s < this.Gb; s++) this.xb.removeChild(this.Cb[i][s].container);
                        this.Cb[i].length = this.Q.song.barCount
                    }
                    this.Gb = this.Q.song.barCount;
                    var r = 32 * this.Q.song.barCount;
                    this.container.style.width = r + "px", this.ia.setAttribute("width", r + "")
                }
                if (this.Jb != n)
                    for (var i = 0; i < this.Q.song.getChannelCount(); i++)
                        for (var s = 0; s < this.Gb; s++) this.Cb[i][s].setSquashed(n, i);
                this.Jb == n && this.Fb == this.Q.song.getChannelCount() || (this.Jb = n, this.Fb = this.Q.song.getChannelCount(), this.oa = this.Q.song.getChannelCount() * this.Eb, this.ia.setAttribute("height", "" + this.oa), this.yb.setAttribute("height", "" + this.oa), this.container.style.height = this.oa + "px");
                for (var o = 0; o < this.Q.song.getChannelCount(); o++)
                    for (var h = 0; h < this.Gb; h++) {
                        var l = this.Q.song.getPattern(o, h),
                            c = h == this.Q.bar && o == this.Q.channel,
                            u = null == l || 0 == l.notes.length,
                            a = this.Cb[o][h];
                        h < this.Q.song.barCount ? (a.setIndex(this.Q.song.channels[o].bars[h], u, c, o, u && !c ? this.Q.song.getChannelColorDim(o) : this.Q.song.getChannelColorBright(o)), a.container.style.visibility = "visible") : a.container.style.visibility = "hidden"
                    }
                this.db()
            }, n
        }();
    t.TrackEditor = n
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    var e = function() {
        function e(e) {
            var n = this;
            this.Q = e, this.vb = 32, this.oa = 20, this.Qb = 0, this.Rb = 1, this.Sb = 2, this.Tb = t.svgElement("path", {
                fill: "none",
                stroke: "#7744ff",
                "stroke-width": 4
            }), this.Ub = t.svgElement("path", {
                fill: "white",
                "pointer-events": "none"
            }), this.ia = t.svgElement("svg", {
                style: "background-color: #000000; touch-action: pan-y; position: absolute;",
                height: this.oa
            }, [this.Tb, this.Ub]), this.container = t.html.div({
                style: "height: 20px; position: relative; margin: 5px 0;"
            }, [this.ia]), this.Vb = null, this.Ga = {
                startBar: -1,
                mode: -1
            }, this.pa = 0, this.qa = 0, this.Wb = 0, this.Xb = 0, this.Yb = !1, this.Zb = !1, this.ra = !1, this.sa = !1, this.$b = -1, this._b = -1, this.Gb = 0, this.Ua = function(t) {
                n.sa || (n.sa = !0, n.db())
            }, this.Va = function(t) {
                n.sa && (n.sa = !1, n.db())
            }, this.Wa = function(t) {
                t.preventDefault(), n.ra = !0;
                var e = n.ia.getBoundingClientRect();
                n.pa = (t.clientX || t.pageX) - e.left, n.qa = (t.clientY || t.pageY) - e.top, n.cb(), n.db(), n.Za(t)
            }, this.Ya = function(t) {
                n.ra = !0;
                var e = n.ia.getBoundingClientRect();
                n.pa = t.touches[0].clientX - e.left, n.qa = t.touches[0].clientY - e.top, n.cb(), n.db(), n.Wb = t.touches[0].clientX, n.Xb = t.touches[0].clientY, n.Zb = !1, n.Yb = !1
            }, this.Za = function(t) {
                var e = n.ia.getBoundingClientRect();
                n.pa = (t.clientX || t.pageX) - e.left, n.qa = (t.clientY || t.pageY) - e.top, n.$a()
            }, this._a = function(t) {
                if (n.ra) {
                    var e = n.ia.getBoundingClientRect();
                    n.pa = t.touches[0].clientX - e.left, n.qa = t.touches[0].clientY - e.top, n.Zb || n.Yb || (Math.abs(t.touches[0].clientY - n.Xb) > 10 ? n.Yb = !0 : Math.abs(t.touches[0].clientX - n.Wb) > 10 && (n.Zb = !0)), n.Zb && (n.$a(), t.preventDefault())
                }
            }, this.ac = function(t) {
                t.preventDefault(), n.Yb || (n.$a(), n.sa = !1, n.ab(t), n.db())
            }, this.ab = function(t) {
                null != n.Vb && n.Q.record(n.Vb), n.Vb = null, n.ra = !1, n.cb(), n.bc()
            }, this.eb = function() {
                n.bc()
            }, this.cb(), this.bc(), this.Q.notifier.watch(this.eb), this.container.addEventListener("mousedown", this.Wa), document.addEventListener("mousemove", this.Za), document.addEventListener("mouseup", this.ab), this.container.addEventListener("mouseover", this.Ua), this.container.addEventListener("mouseout", this.Va), this.container.addEventListener("touchstart", this.Ya), this.container.addEventListener("touchmove", this._a), this.container.addEventListener("touchend", this.ac), this.container.addEventListener("touchcancel", this.ac)
        }
        return e.prototype.cb = function() {
            var t = this.pa / this.vb;
            this.Ga.startBar = t, t > this.Q.song.loopStart - .25 && t < this.Q.song.loopStart + this.Q.song.loopLength + .25 ? t - this.Q.song.loopStart < .5 * this.Q.song.loopLength ? this.Ga.mode = this.Qb : this.Ga.mode = this.Rb : this.Ga.mode = this.Sb
        }, e.prototype.cc = function(t) {
            var e = Math.round(t - this.Q.song.loopLength / 2),
                n = e + this.Q.song.loopLength;
            return 0 > e && (n -= e, e = 0), n > this.Q.song.barCount && (e -= n - this.Q.song.barCount, n = this.Q.song.barCount), {
                start: e,
                length: n - e
            }
        }, e.prototype.$a = function() {
            if (this.ra) {
                var e = this.Q.song.loopStart,
                    n = this.Q.song.loopStart + this.Q.song.loopLength;
                null != this.Vb && this.Q.lastChangeWas(this.Vb) && (e = this.Vb.oldStart, n = e + this.Vb.oldLength);
                var i = this.pa / this.vb,
                    s = void 0,
                    a = void 0,
                    r = void 0;
                if (this.Ga.mode == this.Qb) s = e + Math.round(i - this.Ga.startBar), a = n, 0 > s && (s = 0), s >= this.Q.song.barCount && (s = this.Q.song.barCount), s == a ? s = a - 1 : s > a && (r = s, s = a, a = r), this.Vb = new t.ChangeLoop(this.Q, e, n - e, s, a - s);
                else if (this.Ga.mode == this.Rb) s = e, a = n + Math.round(i - this.Ga.startBar), 0 > a && (a = 0), a >= this.Q.song.barCount && (a = this.Q.song.barCount), a == s ? a = s + 1 : s > a && (r = s, s = a, a = r), this.Vb = new t.ChangeLoop(this.Q, e, n - e, s, a - s);
                else if (this.Ga.mode == this.Sb) {
                    var o = this.cc(i);
                    this.Vb = new t.ChangeLoop(this.Q, e, n - e, o.start, o.length)
                }
                this.Q.setProspectiveChange(this.Vb)
            } else this.cb(), this.db()
        }, e.prototype.db = function() {
            var t = this.sa && !this.ra;
            if (this.Ub.style.visibility = t ? "visible" : "hidden", t) {
                var e = this.oa / 2,
                    n = this.Q.song.loopStart * this.vb,
                    i = (this.Q.song.loopStart + this.Q.song.loopLength) * this.vb;
                if (this.Ga.mode == this.Qb) i = this.Q.song.loopStart * this.vb + 2 * e;
                else if (this.Ga.mode == this.Rb) n = (this.Q.song.loopStart + this.Q.song.loopLength) * this.vb - 2 * e;
                else {
                    var s = this.cc(this.Ga.startBar);
                    n = s.start * this.vb, i = (s.start + s.length) * this.vb
                }
                this.Ub.setAttribute("d", "M " + (n + e) + " 4 " + ("L " + (i - e) + " 4 ") + ("A " + (e - 4) + " " + (e - 4) + " 0 0 1 " + (i - e) + " " + (this.oa - 4) + " ") + ("L " + (n + e) + " " + (this.oa - 4) + " ") + ("A " + (e - 4) + " " + (e - 4) + " 0 0 1 " + (n + e) + " 4 ") + "z")
            }
        }, e.prototype.bc = function() {
            var t = this.oa / 2,
                e = this.Q.song.loopStart * this.vb,
                n = (this.Q.song.loopStart + this.Q.song.loopLength) * this.vb;
            if (this.Gb != this.Q.song.barCount) {
                this.Gb = this.Q.song.barCount;
                var i = 32 * this.Q.song.barCount;
                this.container.style.width = i + "px", this.ia.setAttribute("width", i + "")
            }
            this.$b == e && this._b == n || (this.$b = e, this._b = n, this.Tb.setAttribute("d", "M " + (e + t) + " 2 " + ("L " + (n - t) + " 2 ") + ("A " + (t - 2) + " " + (t - 2) + " 0 0 1 " + (n - t) + " " + (this.oa - 2) + " ") + ("L " + (e + t) + " " + (this.oa - 2) + " ") + ("A " + (t - 2) + " " + (t - 2) + " 0 0 1 " + (e + t) + " 2 ") + "z")), this.db()
        }, e
    }();
    t.LoopEditor = e
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    var e = function() {
        function e(e, n) {
            var i = this;
            this.Q = e, this.dc = n, this.Ta = 512, this.oa = 20, this.ec = t.svgElement("svg", {
                "pointer-events": "none"
            }), this.fc = t.svgElement("rect", {
                fill: "#444444",
                x: 0,
                y: 2,
                width: 10,
                height: this.oa - 4
            }), this.gc = t.svgElement("rect", {
                fill: "none",
                stroke: "white",
                "stroke-width": 2,
                "pointer-events": "none",
                x: 0,
                y: 1,
                width: 10,
                height: this.oa - 2
            }), this.hc = t.svgElement("path", {
                fill: "white",
                "pointer-events": "none"
            }), this.ic = t.svgElement("path", {
                fill: "white",
                "pointer-events": "none"
            }), this.ia = t.svgElement("svg", {
                style: "background-color: #000000; touch-action: pan-y; position: absolute;",
                width: this.Ta,
                height: this.oa
            }, [this.ec, this.fc, this.gc, this.hc, this.ic]), this.container = t.html.div({
                className: "barScrollBar",
                style: "width: 512px; height: 20px; overflow: hidden; position: relative;"
            }, [this.ia]), this.pa = 0, this.qa = 0, this.ra = !1, this.sa = !1, this.jc = !1, this.kc = -1, this.lc = -1, this.mc = function(t) {
                i.Q.barScrollPos = i.dc.scrollLeft / 32
            }, this.Ua = function(t) {
                i.sa || (i.sa = !0, i.db())
            }, this.Va = function(t) {
                i.sa && (i.sa = !1, i.db())
            }, this.Wa = function(t) {
                t.preventDefault(), i.ra = !0;
                var e = i.ia.getBoundingClientRect();
                i.pa = (t.clientX || t.pageX) - e.left, i.qa = (t.clientY || t.pageY) - e.top, i.db(), i.pa >= i.Q.barScrollPos * i.vb && i.pa <= (i.Q.barScrollPos + i.Q.trackVisibleBars) * i.vb && (i.jc = !0, i.nc = i.pa)
            }, this.Ya = function(t) {
                t.preventDefault(), i.ra = !0;
                var e = i.ia.getBoundingClientRect();
                i.pa = t.touches[0].clientX - e.left, i.qa = t.touches[0].clientY - e.top, i.db(), i.pa >= i.Q.barScrollPos * i.vb && i.pa <= (i.Q.barScrollPos + i.Q.trackVisibleBars) * i.vb && (i.jc = !0, i.nc = i.pa)
            }, this.Za = function(t) {
                var e = i.ia.getBoundingClientRect();
                i.pa = (t.clientX || t.pageX) - e.left, i.qa = (t.clientY || t.pageY) - e.top, i.$a()
            }, this._a = function(t) {
                if (i.ra) {
                    t.preventDefault();
                    var e = i.ia.getBoundingClientRect();
                    i.pa = t.touches[0].clientX - e.left, i.qa = t.touches[0].clientY - e.top, i.$a()
                }
            }, this.ab = function(t) {
                !i.jc && i.ra && (i.pa < (i.Q.barScrollPos + 8) * i.vb ? (i.Q.barScrollPos > 0 && i.Q.barScrollPos--, i.Q.notifier.changed()) : (i.Q.barScrollPos < i.Q.song.barCount - i.Q.trackVisibleBars && i.Q.barScrollPos++, i.Q.notifier.changed())), i.ra = !1, i.jc = !1, i.db()
            };
            var s = .5 * this.oa,
                a = 20,
                r = 9,
                o = 6;
            this.hc.setAttribute("d", "M " + r + " " + s + " L " + a + " " + (s + o) + " L " + a + " " + (s - o) + " z"), this.ic.setAttribute("d", "M " + (this.Ta - r) + " " + s + " L " + (this.Ta - a) + " " + (s + o) + " L " + (this.Ta - a) + " " + (s - o) + " z"), this.container.addEventListener("mousedown", this.Wa), document.addEventListener("mousemove", this.Za), document.addEventListener("mouseup", this.ab), this.container.addEventListener("mouseover", this.Ua), this.container.addEventListener("mouseout", this.Va), this.container.addEventListener("touchstart", this.Ya), this.container.addEventListener("touchmove", this._a), this.container.addEventListener("touchend", this.ab), this.container.addEventListener("touchcancel", this.ab), this.dc.addEventListener("scroll", this.mc, {
                capture: !1,
                passive: !0
            })
        }
        return e.prototype.$a = function() {
            if (this.jc) {
                for (; this.pa - this.nc < .5 * -this.vb && this.Q.barScrollPos > 0;) this.Q.barScrollPos--, this.nc -= this.vb, this.Q.notifier.changed();
                for (; this.pa - this.nc > .5 * this.vb && this.Q.barScrollPos < this.Q.song.barCount - this.Q.trackVisibleBars;) this.Q.barScrollPos++, this.nc += this.vb, this.Q.notifier.changed()
            }
            this.sa && this.db()
        }, e.prototype.db = function() {
            var t = this.sa && !this.ra,
                e = !1,
                n = !1,
                i = !1;
            t && (this.pa < this.Q.barScrollPos * this.vb ? e = !0 : this.pa > (this.Q.barScrollPos + this.Q.trackVisibleBars) * this.vb ? n = !0 : i = !0), this.hc.style.visibility = e ? "visible" : "hidden", this.ic.style.visibility = n ? "visible" : "hidden", this.gc.style.visibility = i ? "visible" : "hidden"
        }, e.prototype.render = function() {
            this.vb = (this.Ta - 1) / Math.max(this.Q.trackVisibleBars, this.Q.song.barCount);
            var e = this.kc != this.Q.song.barCount;
            if (e) {
                for (this.kc = this.Q.song.barCount; this.ec.firstChild;) this.ec.removeChild(this.ec.firstChild);
                for (var n = 0; n <= this.Q.song.barCount; n++) {
                    var i = n % 16 == 0 ? 0 : n % 4 == 0 ? this.oa / 8 : this.oa / 3;
                    this.ec.appendChild(t.svgElement("rect", {
                        fill: "#444444",
                        x: n * this.vb - 1,
                        y: i,
                        width: 2,
                        height: this.oa - 2 * i
                    }))
                }
            }(e || this.lc != this.Q.barScrollPos) && (this.lc = this.Q.barScrollPos, this.fc.setAttribute("x", "" + this.vb * this.Q.barScrollPos), this.fc.setAttribute("width", "" + this.vb * this.Q.trackVisibleBars), this.gc.setAttribute("x", "" + this.vb * this.Q.barScrollPos), this.gc.setAttribute("width", "" + this.vb * this.Q.trackVisibleBars)), this.db(), this.dc.scrollLeft = 32 * this.Q.barScrollPos
        }, e
    }();
    t.BarScrollBar = e
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    var e = function() {
        function e(e) {
            var n = this;
            this.Q = e, this.Ta = 20, this.oa = 481, this.oc = 4, this.pc = 7, this.qc = (this.oa - this.oc) / this.pc, this.rc = 3 * this.qc + this.oc, this.fc = t.svgElement("rect", {
                fill: "#444444",
                x: 2,
                y: 0,
                width: this.Ta - 4,
                height: this.rc
            }), this.gc = t.svgElement("rect", {
                fill: "none",
                stroke: "white",
                "stroke-width": 2,
                "pointer-events": "none",
                x: 1,
                y: 0,
                width: this.Ta - 2,
                height: this.rc
            }), this.Ab = t.svgElement("path", {
                fill: "white",
                "pointer-events": "none"
            }), this.Bb = t.svgElement("path", {
                fill: "white",
                "pointer-events": "none"
            }), this.ia = t.svgElement("svg", {
                style: "background-color: #000000; touch-action: pan-x; position: absolute;",
                width: this.Ta,
                height: "100%",
                viewBox: "0 0 20 481",
                preserveAspectRatio: "none"
            }), this.container = t.html.div({
                id: "octaveScrollBarContainer",
                style: "width: 20px; height: 100%; overflow: hidden; position: relative; flex-shrink: 0;"
            }, [this.ia]), this.pa = 0, this.qa = 0, this.ra = !1, this.sa = !1, this.jc = !1, this.sc = -1, this.Vb = null, this.Ua = function(t) {
                n.sa || (n.sa = !0, n.db())
            }, this.Va = function(t) {
                n.sa && (n.sa = !1, n.db())
            }, this.Wa = function(t) {
                t.preventDefault(), n.ra = !0;
                var e = n.ia.getBoundingClientRect();
                n.pa = (t.clientX || t.pageX) - e.left, n.qa = ((t.clientY || t.pageY) - e.top) * n.oa / (e.bottom - e.top), isNaN(n.qa) && (n.qa = 0), n.Q.song.getChannelIsDrum(n.Q.channel) || (n.db(), n.qa >= n.tc - n.rc && n.qa <= n.tc && (n.jc = !0, n.Vb = null, n.nc = n.qa))
            }, this.Ya = function(t) {
                t.preventDefault(), n.ra = !0;
                var e = n.ia.getBoundingClientRect();
                n.pa = t.touches[0].clientX - e.left, n.qa = (t.touches[0].clientY - e.top) * n.oa / (e.bottom - e.top), isNaN(n.qa) && (n.qa = 0), n.Q.song.getChannelIsDrum(n.Q.channel) || (n.db(), n.qa >= n.tc - n.rc && n.qa <= n.tc && (n.jc = !0, n.Vb = null, n.nc = n.qa))
            }, this.Za = function(t) {
                var e = n.ia.getBoundingClientRect();
                n.pa = (t.clientX || t.pageX) - e.left, n.qa = ((t.clientY || t.pageY) - e.top) * n.oa / (e.bottom - e.top), isNaN(n.qa) && (n.qa = 0), n.$a()
            }, this._a = function(t) {
                if (n.ra) {
                    t.preventDefault();
                    var e = n.ia.getBoundingClientRect();
                    n.pa = t.touches[0].clientX - e.left, n.qa = (t.touches[0].clientY - e.top) * n.oa / (e.bottom - e.top), isNaN(n.qa) && (n.qa = 0), n.$a()
                }
            }, this.ab = function(e) {
                if (!n.Q.song.getChannelIsDrum(n.Q.channel) && n.ra)
                    if (n.jc) null != n.Vb && n.Q.record(n.Vb);
                    else {
                        var i = n.Q.lastChangeWas(n.Vb),
                            s = i ? n.Vb.oldValue : n.Q.song.channels[n.Q.channel].octave,
                            a = n.Q.song.channels[n.Q.channel].octave;
                        n.qa < n.tc - .5 * n.rc ? 4 > a && (n.Vb = new t.ChangeOctave(n.Q, s, a + 1), n.Q.record(n.Vb, i)) : a > 0 && (n.Vb = new t.ChangeOctave(n.Q, s, a - 1), n.Q.record(n.Vb, i))
                    }
                n.ra = !1, n.jc = !1, n.db()
            }, this.eb = function() {
                n.tc = n.oa - n.qc * n.Q.song.channels[n.Q.channel].octave, n.bc()
            }, this.Q.notifier.watch(this.eb), this.eb(), this.ia.appendChild(this.fc);
            for (var i = 0; i <= this.pc; i++) this.ia.appendChild(t.svgElement("rect", {
                fill: "#886644",
                x: 0,
                y: i * this.qc,
                width: this.Ta,
                height: this.oc
            }));
            this.ia.appendChild(this.gc), this.ia.appendChild(this.Ab), this.ia.appendChild(this.Bb);
            var s = .5 * this.Ta,
                a = 20,
                r = 9,
                o = 6;
            this.Ab.setAttribute("d", "M " + s + " " + r + " L " + (s + o) + " " + a + " L " + (s - o) + " " + a + " z"), this.Bb.setAttribute("d", "M " + s + " " + (this.oa - r) + " L " + (s + o) + " " + (this.oa - a) + " L " + (s - o) + " " + (this.oa - a) + " z"), this.container.addEventListener("mousedown", this.Wa), document.addEventListener("mousemove", this.Za), document.addEventListener("mouseup", this.ab), this.container.addEventListener("mouseover", this.Ua), this.container.addEventListener("mouseout", this.Va), this.container.addEventListener("touchstart", this.Ya), this.container.addEventListener("touchmove", this._a), this.container.addEventListener("touchend", this.ab), this.container.addEventListener("touchcancel", this.ab)
        }
        return e.prototype.$a = function() {
            if (!this.Q.song.getChannelIsDrum(this.Q.channel)) {
                if (this.jc) {
                    for (var e = this.Q.song.channels[this.Q.channel].octave, n = this.Q.lastChangeWas(this.Vb), i = n ? this.Vb.oldValue : e, s = e; this.qa - this.nc < .5 * -this.qc && 4 > s;) s++, this.nc -= this.qc;
                    for (; this.qa - this.nc > .5 * this.qc && s > 0;) s--, this.nc += this.qc;
                    this.Vb = new t.ChangeOctave(this.Q, i, s), this.Q.setProspectiveChange(this.Vb)
                }
                this.sa && this.db()
            }
        }, e.prototype.db = function() {
            var t = this.sa && !this.ra,
                e = !1,
                n = !1,
                i = !1;
            t && (this.qa < this.tc - this.rc ? e = !0 : this.qa > this.tc ? n = !0 : i = !0), this.Ab.style.visibility = e ? "inherit" : "hidden", this.Bb.style.visibility = n ? "inherit" : "hidden", this.gc.style.visibility = i ? "inherit" : "hidden"
        }, e.prototype.bc = function() {
            this.ia.style.visibility = this.Q.song.getChannelIsDrum(this.Q.channel) ? "hidden" : "visible", this.sc != this.tc && (this.sc = this.tc, this.fc.setAttribute("y", "" + (this.tc - this.rc)), this.gc.setAttribute("y", "" + (this.tc - this.rc))), this.db()
        }, e
    }();
    t.OctaveScrollBar = e
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    function e() {
        n++, i = !0
    }
    var n = 0,
        i = !1,
        s = document.createElement("img");
    s.onload = e, s.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAANCAIAAABHKvtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEU3RTM2RTg0NzBEMTFFMTgyMjBBREEyQTVGRDY5MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEU3RTM2RTk0NzBEMTFFMTgyMjBBREEyQTVGRDY5MjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMzYxN0U3RDQ3MEQxMUUxODIyMEFEQTJBNUZENjkyMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMzYxN0U3RTQ3MEQxMUUxODIyMEFEQTJBNUZENjkyMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PomGIaQAAABgSURBVHjaYpSWlmZhYWFmZgaSTExMQAYTGGAyIICRkRFIMhANWISFhdlggAUHANrBysoKNBfuCGKMvnjx4r59+xhp5wOg6UCSBM+SB0YtGLVgCFgAzDeMeOSGgAUAAQYAGgwJrOg8pdQAAAAASUVORK5CYII=";
    var a = document.createElement("img");
    a.onload = e, a.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAANCAIAAABHKvtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEU3RTM2RUM0NzBEMTFFMTgyMjBBREEyQTVGRDY5MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEU3RTM2RUQ0NzBEMTFFMTgyMjBBREEyQTVGRDY5MjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RTdFMzZFQTQ3MEQxMUUxODIyMEFEQTJBNUZENjkyMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RTdFMzZFQjQ3MEQxMUUxODIyMEFEQTJBNUZENjkyMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhURscAAAAB1SURBVHja7NPBCoAgDAZgnaMX8Oj7P2KKldXPhiR4CwwCv4PInPvxoA0hMLNzDisRYUPCCiMucVallJzzJnaBih5pp2mw936puKEZ2qQ3MeUQmLiKGGNKCZ1IQr2fDnb0C8gMNgNmwA8Cnt/0Tv91vw64BRgALUuP70jrlrwAAAAASUVORK5CYII=";
    var r = document.createElement("img");
    r.onload = e, r.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAANCAIAAABHKvtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzM2MTdFNzc0NzBEMTFFMTgyMjBBREEyQTVGRDY5MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzM2MTdFNzg0NzBEMTFFMTgyMjBBREEyQTVGRDY5MjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMzYxN0U3NTQ3MEQxMUUxODIyMEFEQTJBNUZENjkyMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMzYxN0U3NjQ3MEQxMUUxODIyMEFEQTJBNUZENjkyMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgBmMXoAAACTSURBVHja7JQ7CgMhGIT3920M2Hko7+RJPYWViE0myi5sEXAhKQL7FcP8PmawkWKMjx2llNb60MNIKY0xnPPphRDbMsJ7/xw458wAodZa6PRQ5GIF0RjlYCU655xSEqWU3ntrrdb63RcgHcq2H3MX3AV/UEAhBL7DBkTEzmAFuzSY44UC/BDHtU+8z539esFLgAEAkZ4XCDjZXPEAAAAASUVORK5CYII=";
    var o = document.createElement("img");
    o.onload = e, o.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAANCAIAAABHKvtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzM2MTdFN0I0NzBEMTFFMTgyMjBBREEyQTVGRDY5MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzM2MTdFN0M0NzBEMTFFMTgyMjBBREEyQTVGRDY5MjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMzYxN0U3OTQ3MEQxMUUxODIyMEFEQTJBNUZENjkyMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMzYxN0U3QTQ3MEQxMUUxODIyMEFEQTJBNUZENjkyMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlZjoH4AAADHSURBVHja7JTNDoMgEIRBGq21iTcfyvd/DeNvJBYBp7uFEE+99NDE70AMMDPLYZRt2z4CeZ4XRcFrRkgphRD7vnvvX8RGdF03DEPf99M0LcuitcamMcZa6wkRuNV1/SSqqroTcC/LEu5KKQ6AEhq21oRzDl5bAME8DUjd3wHjOELPyu9fgNnneV7XNQ6OyNPsTCZ+zBVwBfxBgGyaRgViuWIt+ZIPuAAaZwh00BKxaKeuSfwhUsfI55g+WOMT2DEl3jm94BBgAAtY6T6d3wTNAAAAAElFTkSuQmCC";
    var h = document.createElement("img");
    h.onload = e, h.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAArCAIAAACW3x1gAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExOUJCOEEzOUJCMkI3MTdFNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NzVEOTA1QzQ5MjMxMUUxOTM3RDhDNEI4QkIxQkFCNSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NzVEOTA1QjQ5MjMxMUUxOTM3RDhDNEI4QkIxQkFCNSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAxODAxMTc0MDcyMDY4MTE5QkI4QTM5QkIyQjcxN0U0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAxODAxMTc0MDcyMDY4MTE5QkI4QTM5QkIyQjcxN0U0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+dtFK5QAACbRJREFUeNrcV0lsG9cZnnmzcJdIcRHFRZtly5IVSVYSOcriNY7jqHHTBE2bJkCRNijQQ9re2kOBAj30kByKAm1PvQVF0RYIkLRpkiZuLMqyLVm7bGvlIpKiuHOGyww52+ubIbXYCYLk2P4ccobz3nzf+9f3D4b9rwv+5cOXL5x48crDT54b8Pr6jOZWQJoxKIi13WJ+Oziz+Z/r6x9N3AvMhb42gcWkf/P1Mz/40fkWz2iuAAsFrljkOK5crVYwTNTrcaMRNDURNhtl1Slrn9x55x+zf/5ooVIVvhLBq1ce+eXPLpt6RnZ22EIBmk1Oi8VuMFoMBgNF6RUMF2tcrVqscPlSKcGV4zaC85qNd25u/PHdm/+8tf5lBBRJ/Oan49/98cVEDmcYg9PZ09LSrjcYSRzHcAAxDGBQQfMgJiuyAiFUFMSUT23mtu9YxYxVgX/6YPa3796QZGUfk9i/Mhvo3//8W99443wwKtB0T1fXqM3m0en0iJUgSIIkKYoiKBL9A4QqAEcCSFJnbnI3uboqIpHP7D7T73WYDbfW4+IexwHB22+OX3zpsfAu5nI96vUM0gY9wqN0JEJG2AAATFs7hlABrhKgk3qJQwwCgrY4/ZiuaSceO+VvslkM11Yi9xG8+dLj33/tdDgLPB1POB09JE0RAOESFEEiVOWQaIZBPxCtX2MBUKVRMAXTWZyk2RaPRp440lIV5PngboPgZE/br16/kBJwR9dTTtdxQkejBzUOoHxO4P2CCAgcV+8iDSHUWWyA0ieDa4N++1J4N8VUVMVfvTCEm/S0vc/Z1g9IoKIjU6PHkCBvyrJ63hMJffZ+tQkyDnDVPThR18beM6zvHmky0i8/OYDAwTGvfXz0WKoCXL5BFVv1p0qgmULRMJTD0HVKWdqj1EZVS2meV+MNU1zHTmZE6tLJ7qOeFvLMQ504TRkt3SarC00j1aOBrhmksUxFu4PuNxytAqHAhZj2Bw2h6Kprgym40d5m9PXqmbXTA53gzIA/V+KaXZ3aTBSCuKrpniDMOo+yv/bGr3qCyv46VE8jDVCmIBT0t7mtK1fkn+rzgpPdrWy5arS2qloCXHMWdp8flYatZGVPm7rd7nc6psUV0BgQgsnhYbnacGcr8DltXE3UGZsxFNA4JAgcUzU/RHDoWsOFh2Pp8ES0OnX9anWAtNnK1wSf00paTIZG0UAhV19+4/uAHNCqc2Hj3n2CDCxDWRvU1FCLJuB43qijahyLiFG2wEZ5wr+gLOKac7USUX/+gVlQ1pahsdZKjEFHcxwPWIZpNus5JgUhPICqY+1B4XvAQItHrUjsDR6aiRRT9gAq2USzUccyLNhNpe0WI5uOYFrEoAPDDqHvoSJMcJ8Q+7f3J6rxIGP1hbKJsN1iQOAgtJNutZu5bKjEpmU1HNXQeABcKzsNIfeKqVbv8H0OLbCgamQIuXySS6y7rOZQIgO2M2WsxrealHRsSdEiW5Kkfez6uV47Dyg0+ANzgUbqIAfXDZBZn3eSoiJUorkyoMzW9bW1Tk+LkFtNJ1YQPApESZFAAxqAQ9jEYZK6aKPItJJaPdRPdmupGlnocDWvra4hcHCi7/jdxXtihe3yWFKx2+lsUJZESVKLxAH2F1A0wNEAsrooC5Ko5ggb38wsBbps+mqZXVxZHeg7Dvq7vYlo+c78vN9t7fSARPxmMrmuCKIgSfUqRnwxeEOQZQRBRnpDWcxur6QWPm3XcT67eX5uLrHD93V5SSOsWk2ttwMLNp9rePwiyZbC0Vs8X/R5T+gNFog41F2SOEjdevRrXhVFUS2sklTjSsmt21xw7ogZ8za3XEcyvdzS3KOXeeInlx9iC3IikqkKCZ2ROjr6kKXJVCjsRqMx9CRBGpHBkWXrW1g9nRG0pNpRRGav8Gw6thy995mhuHW81eSxmK4HpiYnrzNFU9+xXp/XQLz8aIel2RqeTZZrNVHYJYDi7u7s6OqkaaJQSEajYYbJ8xwvSgJaLDI3YuW5EsNkc7lIYmchEbtJC9tHHFS/z6GUuclrE4GJwG6BBpJ1bKy3WGXJ5WDs+WfOOX0t+UgmaqieOM1uXP2Xb/iUv+Nhv7+DYYRstlIoZLYj259rvMg2D+mwuq2ohjL81vTC8tQ0hyk7eRpyTd52W09P6/uBKXLmXuSlK7D3VM+tSAZugv7Lb3349otCOe3OxW3+oWb7gNXqwDAdhqHdX0I1BsNQ+8ZjWBXDOHQh88XY3EpoZml1ZjGdLP/ivX9cffcVtKcPDXdStHJ7bZtcjGS2Ntb7xwbDs2F2K4UX37rzMcOOQoN5RSpuNbnnjPYjlMkP6DaIm1AfpDZdQqlWSVVyMSYeTm5sJtZCHMOHd2q7O2T449+hXdPvd5wc7tpYX12OZslIEd6YWe4a7h+8PHT9D5/GVxhXEiTey2eC1aOnnINnUUuUx2vLtIGUqlKVq/FlgWf5ClstM1yF4Zk0F4zUIiGhkiLNgNxeLaDUfvzxXkAIgfmV7TJGcBJGSJUeFz36wllBlP/+6+suknQSlCGthGfyK7PpWKhcydckUYtRHBN5KZ/m4qHS+jK7OFNYmC6mNyRzlTIRSDlseT537uzApUvDk4HAX29s3C2olsUWk9K/r06jPBj94WmlJu68v4RuNpGEkzLCNJbbza98mL4qiowsj35vOLZVWL8VpnFcDwA6/AQt62FVwQSo7iVjj/WOP/fwzVs3PpicvVuAjcarJKhrawM5i8My+NoFqSxVtlKEApE1DQA4KKqd1nXrdb1Gw/jf/jL2/KPyO5+00bSVotCoorkexS9OkWPnB158eWxpbnYiEPgsrmyyh1rHGCOhztkF07SJOHrlrMnTVo3nFKaCdmgSRxs56kXU3a79lZ3NTz/JLORFXkG4yGwSVNFt7Y6nvzM2dubo7NTUxLVrEzH5Zgo+2PyGswJqarwUq0gV92ivf/wSbbFIGRayZVSP1WqM47pHbKH5TC3MCRW5TmBpt498e/TZN85RRHn6s4mF2flAVJ5Mavb6/K6K2pZvPuZ45ZK364jTfXzE2j5EQn95LsyvbJXWQ+VofDIci4vC00d9lMdlOuZ2DHndI242EgqjPJheiCdLE1vVqYSswC99wznVZ33hvOfKxQ5Ts6HJ3X0oD8xaHlQVoVCrJCq5OLMTSm5sJO4FObY6tVqcCnJrWfkrvaPpaXBxzP3sOd9zT3fYXSa9kab0lFhFVRPlAepAahUWJUEV5UE2XZ5azE6vl+YivCDDr/2WOdzfcmqkdWTINXDC4XXpzTqiWq7F42wwyKxuFO5sMneDxc0Ej/0/y38FGACBHjS0mkQ17AAAAABJRU5ErkJggg==";
    var l = function() {
        function e(e) {
            var n = this;
            this.Q = e, this.uc = t.html.canvas({
                width: "32",
                height: "481",
                style: "width: 100%; height: 100%;"
            }), this.vc = t.html.canvas({
                width: "32",
                height: "40"
            }), this.container = t.html.div({
                style: "width: 32px; height: 100%; overflow:hidden; position: relative; flex-shrink: 0; touch-action: none;"
            }, [this.uc, this.vc]), this.wc = this.uc.getContext("2d"), this.xc = this.vc.getContext("2d"), this.Ta = 32, this.oa = 481, this.pa = 0, this.qa = 0, this.ra = !1, this.sa = !1, this.yc = -1, this.Ma = !1, this.zc = -1, this.Ua = function(t) {
                n.sa || (n.sa = !0, n.db())
            }, this.Va = function(t) {
                n.sa && (n.sa = !1, n.db())
            }, this.Wa = function(t) {
                t.preventDefault(), n.ra = !0;
                var e = n.uc.getBoundingClientRect();
                n.pa = (t.clientX || t.pageX) - e.left, n.qa = ((t.clientY || t.pageY) - e.top) * n.oa / (e.bottom - e.top), isNaN(n.qa) && (n.qa = 0), n.Q.synth.pianoPressed = !0, n.db()
            }, this.Za = function(t) {
                var e = n.uc.getBoundingClientRect();
                n.pa = (t.clientX || t.pageX) - e.left, n.qa = ((t.clientY || t.pageY) - e.top) * n.oa / (e.bottom - e.top), isNaN(n.qa) && (n.qa = 0), n.Ac(), n.Q.synth.pianoPitch[0] = n.Bc + 12 * n.Q.song.channels[n.Q.channel].octave, n.db()
            }, this.Ob = function(t) {
                n.ra = !1, n.Q.synth.pianoPressed = !1, n.db()
            }, this.Ya = function(t) {
                t.preventDefault(), n.ra = !0;
                var e = n.uc.getBoundingClientRect();
                n.pa = t.touches[0].clientX - e.left, n.qa = (t.touches[0].clientY - e.top) * n.oa / (e.bottom - e.top), isNaN(n.qa) && (n.qa = 0), n.Ac(), n.Q.synth.pianoPressed = !0, n.Q.synth.pianoPitch[0] = n.Bc + 12 * n.Q.song.channels[n.Q.channel].octave
            }, this._a = function(t) {
                t.preventDefault();
                var e = n.uc.getBoundingClientRect();
                n.pa = t.touches[0].clientX - e.left, n.qa = (t.touches[0].clientY - e.top) * n.oa / (e.bottom - e.top), isNaN(n.qa) && (n.qa = 0), n.Ac(), n.Q.synth.pianoPitch[0] = n.Bc + 12 * n.Q.song.channels[n.Q.channel].octave
            }, this.ac = function(t) {
                t.preventDefault(), n.Q.synth.pianoPressed = !1
            }, this.eb = function() {
                var e = n.Q.song.getChannelIsDrum(n.Q.channel);
                n.gb = e ? 40 : 13, n.hb = e ? t.Config.drumCount : t.Config.pitchCount, n.Ac(), n.Q.synth.pianoPitch[0] = n.Bc + 12 * n.Q.song.channels[n.Q.channel].octave, n.Q.synth.pianoChannel = n.Q.channel, n.bc()
            }, this.bc = function() {
                if (!i) return void window.requestAnimationFrame(n.bc);
                if (n.Q.showLetters) {
                    var e = n.Q.song.getChannelIsDrum(n.Q.channel);
                    if (n.yc != n.Q.song.scale || n.zc != n.Q.song.key || n.Ma != e) {
                        n.yc = n.Q.song.scale, n.zc = n.Q.song.key, n.Ma = e, n.wc.clearRect(0, 0, n.Ta, n.oa);
                        for (var l, c = 0; c < n.hb; c++) {
                            var u = (c + t.Config.keyTransposes[n.Q.song.key]) % 12;
                            if (e) {
                                l = h;
                                var p = 1 - c / n.hb * .35,
                                    d = .5 * (1 - p),
                                    f = l.width * d,
                                    g = l.height * d + n.gb * (n.hb - c - 1),
                                    m = l.width * p,
                                    b = l.height * p;
                                n.wc.drawImage(l, f, g, m, b);
                                for (var v = 1 + (c - n.hb / 2) / n.hb * .5, C = n.wc.getImageData(f, g, m, b), y = C.data, w = 0; w < y.length; w += 4) y[w + 0] *= v, y[w + 1] *= v, y[w + 2] *= v;
                                n.wc.putImageData(C, f, g)
                            } else if (t.Config.scaleFlags[n.Q.song.scale][c % 12]) {
                                var x = t.Config.pitchNames[u];
                                if (null == x) {
                                    var Q = t.Config.blackKeyNameParents[c % 12];
                                    x = t.Config.pitchNames[(u + 12 + Q) % 12], 1 == Q ? x += "â™­" : -1 == Q && (x += "â™¯")
                                }
                                var N = t.Config.pianoScaleFlags[u] ? "#000000" : "#ffffff";
                                l = t.Config.pianoScaleFlags[u] ? r : s, n.wc.drawImage(l, 0, n.gb * (n.hb - c - 1)), n.wc.font = "bold 11px sans-serif", n.wc.fillStyle = N, n.wc.fillText(x, 15, n.gb * (n.hb - c) - 3)
                            } else l = t.Config.pianoScaleFlags[u] ? o : a, n.wc.drawImage(l, 0, n.gb * (n.hb - c - 1))
                        }
                        n.db()
                    }
                }
            }, this.Q.notifier.watch(this.eb), this.eb(), this.container.addEventListener("mousedown", this.Wa), document.addEventListener("mousemove", this.Za), document.addEventListener("mouseup", this.Ob), this.container.addEventListener("mouseover", this.Ua), this.container.addEventListener("mouseout", this.Va), this.container.addEventListener("touchstart", this.Ya), this.container.addEventListener("touchmove", this._a), this.container.addEventListener("touchend", this.ac), this.container.addEventListener("touchcancel", this.ac)
        }
        return e.prototype.Ac = function() {
            var e = t.Config.scaleFlags[this.Q.song.scale],
                n = Math.max(0, Math.min(this.hb - 1, this.hb - this.qa / this.gb));
            if (e[Math.floor(n) % 12] || this.Q.song.getChannelIsDrum(this.Q.channel)) this.Bc = Math.floor(n);
            else {
                for (var i = Math.floor(n) + 1, s = Math.floor(n) - 1; !e[i % 12];) i++;
                for (; !e[s % 12];) s--;
                var a = i,
                    r = s + 1;
                i % 12 != 0 && i % 12 != 7 || (a -= .5), s % 12 != 0 && s % 12 != 7 || (r += .5), this.Bc = n - r > a - n ? i : s
            }
        }, e.prototype.db = function() {
            this.vc.style.visibility = !this.sa || this.ra ? "hidden" : "visible", this.sa && !this.ra && (this.xc.clearRect(0, 0, 32, 40), this.vc.style.left = "0px", this.vc.style.top = this.gb * (this.hb - this.Bc - 1) + "px", this.xc.lineWidth = 2, this.xc.strokeStyle = "#ffffff", this.xc.strokeRect(1, 1, this.Ta - 2, this.gb - 2))
        }, e
    }();
    t.Piano = l
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    var e = t.html.button,
        n = t.html.div,
        i = t.html.span,
        s = t.html.input,
        a = t.html.br,
        r = t.html.text,
        o = function() {
            function o(h, l) {
                var c = this;
                this.Q = h, this.ub = l, this.Cc = s({
                    style: "width: 3em; margin-left: 1em;",
                    type: "number",
                    step: "1"
                }), this.Dc = s({
                    style: "width: 3em; margin-left: 1em;",
                    type: "number",
                    step: "1"
                }), this.Ec = s({
                    style: "width: 3em; margin-left: 1em;",
                    type: "number",
                    step: "1"
                }), this.Fc = s({
                    style: "width: 3em; margin-left: 1em;",
                    type: "number",
                    step: "1"
                }), this.Gc = s({
                    style: "width: 3em; margin-left: 1em;",
                    type: "number",
                    step: "1"
                }), this.Hc = s({
                    style: "width: 3em; margin-left: 1em;",
                    type: "number",
                    step: "1"
                }), this.Ic = e({
                    style: "width:45%;"
                }, [r("Okay")]), this.Jc = e({
                    style: "width:45%;"
                }, [r("Cancel")]), this.container = n({
                    className: "prompt",
                    style: "width: 250px;"
                }, [n({
                    style: "font-size: 2em"
                }, [r("Custom Song Size")]), n({
                    style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;"
                }, [n({
                    style: "text-align: right;"
                }, [r("Beats per bar:"), a(), i({
                    style: "font-size: smaller; color: #888888;"
                }, [r("(Multiples of 3 or 4 are recommended)")])]), this.Cc]), n({
                    style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;"
                }, [n({
                    style: "display: inline-block; text-align: right;"
                }, [r("Bars per song:"), a(), i({
                    style: "font-size: smaller; color: #888888;"
                }, [r("(Multiples of 2 or 4 are recommended)")])]), this.Dc]), n({
                    style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;"
                }, [r("Patterns per channel:"), this.Ec]), n({
                    style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;"
                }, [r("Instruments per channel:"), this.Fc]), n({
                    style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;"
                }, [r("Number of pitch channels:"), this.Gc]), n({
                    style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;"
                }, [r("Number of drum channels:"), this.Hc]), n({
                    style: "display: flex; flex-direction: row; justify-content: space-between;"
                }, [this.Ic, this.Jc])]), this.Kc = function() {
                    c.Q.undo()
                }, this.cleanUp = function() {
                    c.Ic.removeEventListener("click", c.Lc), c.Jc.removeEventListener("click", c.Kc), c.Cc.removeEventListener("keypress", o.Mc), c.Dc.removeEventListener("keypress", o.Mc), c.Ec.removeEventListener("keypress", o.Mc), c.Fc.removeEventListener("keypress", o.Mc), c.Gc.removeEventListener("keypress", o.Mc), c.Hc.removeEventListener("keypress", o.Mc), c.Cc.removeEventListener("blur", o.Nc), c.Dc.removeEventListener("blur", o.Nc), c.Ec.removeEventListener("blur", o.Nc), c.Fc.removeEventListener("blur", o.Nc), c.Gc.removeEventListener("blur", o.Nc), c.Hc.removeEventListener("blur", o.Nc)
                }, this.Lc = function() {
                    var e = new t.ChangeGroup;
                    e.append(new t.ChangeBeatsPerBar(c.Q, o.Oc(c.Cc))), e.append(new t.ChangeBarCount(c.Q, o.Oc(c.Dc))), e.append(new t.ChangePatternsPerChannel(c.Q, o.Oc(c.Ec))), e.append(new t.ChangeInstrumentsPerChannel(c.Q, o.Oc(c.Fc))), e.append(new t.ChangeChannelCount(c.Q, o.Oc(c.Gc), o.Oc(c.Hc))), c.Q.prompt = null, c.Q.record(e, !0)
                }, this.Cc.value = this.Q.song.beatsPerBar + "", this.Cc.min = t.Config.beatsPerBarMin + "", this.Cc.max = t.Config.beatsPerBarMax + "", this.Dc.value = this.Q.song.barCount + "", this.Dc.min = t.Config.barCountMin + "", this.Dc.max = t.Config.barCountMax + "", this.Ec.value = this.Q.song.patternsPerChannel + "", this.Ec.min = t.Config.patternsPerChannelMin + "", this.Ec.max = t.Config.patternsPerChannelMax + "", this.Fc.value = this.Q.song.instrumentsPerChannel + "", this.Fc.min = t.Config.instrumentsPerChannelMin + "", this.Fc.max = t.Config.instrumentsPerChannelMax + "", this.Gc.value = this.Q.song.pitchChannelCount + "", this.Gc.min = t.Config.pitchChannelCountMin + "", this.Gc.max = t.Config.pitchChannelCountMax + "", this.Hc.value = this.Q.song.drumChannelCount + "", this.Hc.min = t.Config.drumChannelCountMin + "", this.Hc.max = t.Config.drumChannelCountMax + "", this.Ic.addEventListener("click", this.Lc), this.Jc.addEventListener("click", this.Kc), this.Cc.addEventListener("keypress", o.Mc), this.Dc.addEventListener("keypress", o.Mc), this.Ec.addEventListener("keypress", o.Mc), this.Fc.addEventListener("keypress", o.Mc), this.Gc.addEventListener("keypress", o.Mc), this.Hc.addEventListener("keypress", o.Mc), this.Cc.addEventListener("blur", o.Nc), this.Dc.addEventListener("blur", o.Nc), this.Ec.addEventListener("blur", o.Nc), this.Fc.addEventListener("blur", o.Nc), this.Gc.addEventListener("blur", o.Nc), this.Hc.addEventListener("blur", o.Nc)
            }
            return o.Mc = function(t) {
                var e = t.which ? t.which : t.keyCode;
                return 46 != e && e > 31 && (48 > e || e > 57) ? (t.preventDefault(), !0) : !1
            }, o.Nc = function(t) {
                var e = t.target;
                e.value = Math.floor(Math.max(Number(e.min), Math.min(Number(e.max), Number(e.value)))) + ""
            }, o.Oc = function(t) {
                return Math.floor(Number(t.value))
            }, o
        }();
    t.SongDurationPrompt = o
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    function e(t, e, n) {
        return t + n * (e - t)
    }

    function n(t, e) {
        if (navigator.msSaveOrOpenBlob) return void navigator.msSaveOrOpenBlob(t, e);
        var n = document.createElement("a");
        if (void 0 != n.download) {
            var i = URL.createObjectURL(t);
            setTimeout(function() {
                URL.revokeObjectURL(i)
            }, 6e4), n.href = i, n.download = e, setTimeout(function() {
                n.dispatchEvent(new MouseEvent("click"))
            }, 0)
        } else if (navigator.vendor.indexOf("Apple") > -1) {
            var s = new FileReader;
            s.onloadend = function() {
                console.log(s.result);
                var t = s.result.replace(/^data:[^;]*;/, "data:attachment/file;");
                window.open(t, "_blank") || (window.location.href = t)
            }, s.readAsDataURL(t)
        } else {
            var a = URL.createObjectURL(t);
            setTimeout(function() {
                URL.revokeObjectURL(a)
            }, 6e4), window.open(a, "_blank") || (window.location.href = a)
        }
    }
    var i = t.html.button,
        s = t.html.div,
        a = t.html.input,
        r = t.html.text;
    ArrayBuffer.transfer || (ArrayBuffer.transfer = function(t, e) {
        function n(t, e, n, i, s) {
            var a = Uint8Array;
            switch (t) {
                case 8:
                    a = Float64Array;
                    break;
                case 4:
                    a = Float32Array;
                    break;
                case 2:
                    a = Uint16Array;
                    break;
                case 1:
                    a = Uint8Array;
                    break;
                default:
                    a = Uint8Array
            }
            for (var r = new a(e, i, s / t | 0), o = new a(n, i, s / t | 0), h = 0; h < o.length; h++) o[h] = r[h];
            return {
                nextOffset: r.byteOffset + r.byteLength,
                leftBytes: s - o.length * t
            }
        }
        var i = new ArrayBuffer(e);
        if (!(t instanceof ArrayBuffer && i instanceof ArrayBuffer)) throw new TypeError("Source and destination must be ArrayBuffer instances");
        for (var s = 0, a = Math.min(t.byteLength, i.byteLength), r = [8, 4, 2, 1], o = 0, h = r; o < h.length; o++) {
            var l = h[o];
            if (a >= l) {
                var c = n(l, t, i, s, a);
                s = c.nextOffset, a = c.leftBytes
            }
        }
        return i
    });
    var o = function() {
        function o(h, l) {
            var c = this;
            this.Q = h, this.ub = l, this.Pc = a({
                type: "text",
                style: "width: 10em;",
                value: "BeepBox-Song",
                maxlength: 250
            }), this.Qc = a({
                type: "checkbox"
            }), this.Rc = a({
                style: "width: 2em;",
                type: "number",
                min: "1",
                max: "4",
                step: "1"
            }), this.Sc = a({
                type: "checkbox"
            }), this.Tc = i({}, [r("Export to .wav file")]), this.Uc = i({}, [r("Export to .midi file")]), this.Vc = i({}, [r("Export to .json file")]), this.Jc = i({}, [r("Cancel")]), this.container = s({
                className: "prompt",
                style: "width: 200px;"
            }, [s({
                style: "font-size: 2em"
            }, [r("Export Options")]), s({
                style: "display: flex; flex-direction: row; align-items: center; justify-content: space-between;"
            }, [r("File name:"), this.Pc]), s({
                style: "display: table; width: 100%;"
            }, [s({
                style: "display: table-row;"
            }, [s({
                style: "display: table-cell;"
            }, [r("Intro:")]), s({
                style: "display: table-cell;"
            }, [r("Loop Count:")]), s({
                style: "display: table-cell;"
            }, [r("Outro:")])]), s({
                style: "display: table-row;"
            }, [s({
                style: "display: table-cell; vertical-align: middle;"
            }, [this.Qc]), s({
                style: "display: table-cell; vertical-align: middle;"
            }, [this.Rc]), s({
                style: "display: table-cell; vertical-align: middle;"
            }, [this.Sc])])]), this.Tc, this.Uc, this.Vc, this.Jc]), this.Kc = function() {
                c.Q.undo()
            }, this.cleanUp = function() {
                c.Pc.removeEventListener("input", o.Wc), c.Rc.removeEventListener("blur", o.Nc), c.Tc.removeEventListener("click", c.Xc), c.Uc.removeEventListener("click", c.Yc), c.Vc.removeEventListener("click", c.Zc), c.Jc.removeEventListener("click", c.Kc)
            }, this.Xc = function() {
                var e = new t.Synth(c.Q.song);
                if (e.enableIntro = c.Qc.checked, e.enableOutro = c.Sc.checked, e.loopCount = Number(c.Rc.value), !e.enableIntro)
                    for (var i = 0; i < c.Q.song.loopStart; i++) e.nextBar();
                var s = e.totalSamples,
                    a = new Float32Array(s);
                e.synthesize(a, s);
                var r = 1,
                    o = 1,
                    h = 44100,
                    l = 2,
                    u = 8 * l,
                    p = o * s,
                    d = 44 + p * l,
                    f = 0,
                    g = new ArrayBuffer(d),
                    m = new DataView(g);
                m.setUint32(f, 1380533830, !1), f += 4, m.setUint32(f, 36 + p * l, !0), f += 4, m.setUint32(f, 1463899717, !1), f += 4, m.setUint32(f, 1718449184, !1), f += 4, m.setUint32(f, 16, !0), f += 4, m.setUint16(f, 1, !0), f += 2, m.setUint16(f, o, !0), f += 2, m.setUint32(f, h, !0), f += 4, m.setUint32(f, h * l * o, !0), f += 4, m.setUint16(f, l, !0), f += 2, m.setUint16(f, u, !0), f += 2, m.setUint32(f, 1684108385, !1), f += 4, m.setUint32(f, p * l, !0), f += 4;
                var b, v;
                r == o ? (b = 1, v = 1) : (b = r, v = o);
                var C;
                if (l > 1)
                    for (var y = 0; s > y; y++) {
                        C = Math.floor(a[y * b] * ((1 << u - 1) - 1));
                        for (var w = 0; v > w; w++)
                            if (2 == l) m.setInt16(f, C, !0), f += 2;
                            else {
                                if (4 != l) throw new Error("unsupported sample size");
                                m.setInt32(f, C, !0), f += 4
                            }
                    } else
                        for (var y = 0; s > y; y++) {
                            C = Math.floor(127 * a[y * b] + 128);
                            for (var w = 0; v > w; w++) m.setUint8(f, C > 255 ? 255 : 0 > C ? 0 : C), f++
                        }
                var x = new Blob([g], {
                    type: "audio/wav"
                });
                n(x, c.Pc.value.trim() + ".wav"), c.Kc()
            }, this.Yc = function() {
                function i(t) {
                    d += t, d > f.byteLength && (f = ArrayBuffer.transfer(f, Math.max(2 * f.byteLength, d)), g = new DataView(f))
                }

                function s(t) {
                    t >>>= 0, i(4), g.setUint32(p, t, !1), p = d
                }

                function a(t) {
                    t >>>= 0, i(3), g.setUint8(p, t >> 16 & 255), g.setUint8(p + 1, t >> 8 & 255), g.setUint8(p + 2, 255 & t), p = d
                }

                function r(t) {
                    t >>>= 0, i(2), g.setUint16(p, t, !1), p = d
                }

                function o(t) {
                    t >>>= 0, i(1), g.setUint8(p, t), p = d
                }

                function h(t, e) {
                    e = e >>> 0 & 127 | (1 & t) << 7, i(1), g.setUint8(p, e), p = d
                }

                function l(t) {
                    if (t >>>= 0, t > 268435455) throw new Error("writeVariableLength value too big.");
                    for (var e = !1, n = 0; 4 > n; n++) {
                        var i = 21 - 7 * n,
                            s = t >>> i & 127;
                        0 == s && 3 != n || (e = !0), e && h(3 == n ? 0 : 1, s)
                    }
                }

                function u(t) {
                    l(t.length);
                    for (var e = 0; e < t.length; e++) {
                        var n = t.charCodeAt(e);
                        if (n > 127) throw new Error("Trying to write unicode character as ascii.");
                        o(n)
                    }
                }
                var p = 0,
                    d = 0,
                    f = new ArrayBuffer(1024),
                    g = new DataView(f),
                    m = c.Q.song,
                    b = 96,
                    v = b / m.partsPerBeat,
                    C = v / 4,
                    y = 60,
                    w = 1e6 * y,
                    x = m.getBeatsPerMinute(),
                    Q = Math.round(w / x),
                    N = y / (b * x),
                    A = b * m.beatsPerBar,
                    E = [];
                if (c.Qc.checked)
                    for (var P = 0; P < m.loopStart; P++) E.push(P);
                for (var M = 0; M < Number(c.Rc.value); M++)
                    for (var P = m.loopStart; P < m.loopStart + m.loopLength; P++) E.push(P);
                if (c.Sc.checked)
                    for (var P = m.loopStart + m.loopLength; P < m.barCount; P++) E.push(P);
                for (var k = [{
                        isMeta: !0,
                        channel: -1,
                        midiChannel: -1,
                        isChorus: !1,
                        isDrums: !1
                    }], B = 0, S = 0; S < c.Q.song.getChannelCount(); S++) c.Q.song.getChannelIsDrum(S) ? (k.push({
                    isMeta: !1,
                    channel: S,
                    midiChannel: B++,
                    isChorus: !1,
                    isDrums: !0
                }), 9 == B && B++) : (k.push({
                    isMeta: !1,
                    channel: S,
                    midiChannel: B++,
                    isChorus: !1,
                    isDrums: !1
                }), 9 == B && B++, k.push({
                    isMeta: !1,
                    channel: S,
                    midiChannel: B++,
                    isChorus: !0,
                    isDrums: !1
                }), 9 == B && B++);
                s(1297377380), s(6), r(1), r(k.length), r(b);
                for (var L = function(n) {
                        s(1297379947);
                        var i = n.isMeta,
                            f = n.channel,
                            b = n.midiChannel,
                            y = n.isChorus,
                            w = n.isDrums,
                            x = p;
                        d += 4, p = d;
                        var P = 0,
                            M = 0,
                            k = function(t) {
                                if (P > t) throw new Error("Midi event time cannot go backwards.");
                                l(t - P), P = t
                            };
                        if (i) {
                            k(0), r(65281), u("http://www.beepbox.co/#" + m.toBase64String()), k(0), a(16732419), a(Q), k(0), a(16734212), o(m.beatsPerBar), o(2), o(24), o(8);
                            var B = m.scale < 10 && 1 == (1 & m.scale),
                                S = 11 - m.key,
                                L = S;
                            for (1 == (1 & S) && (L += 6), B && (L += 9); L > 6;) L -= 12;
                            k(0), a(16734466), o(L), o(B ? 1 : 0), c.Qc.checked && (M += A * m.loopStart), k(M), r(65286), u("Loop Start");
                            for (var I = 0; I < Number(c.Rc.value); I++) M += A * m.loopLength, k(M), r(65286), u(I < Number(c.Rc.value) - 1 ? "Loop Repeat" : "Loop End");
                            if (c.Sc.checked && (M += A * (m.barCount - m.loopStart - m.loopLength)), M != A * E.length) throw new Error("Miscalculated number of bars.")
                        } else {
                            var G = m.getChannelIsDrum(f) ? t.Config.midiDrumChannelNames[f - m.pitchChannelCount] : t.Config.midiPitchChannelNames[f];
                            y && (G += " chorus"), k(0), r(65283), u(G), k(M), o(176 | b), h(0, 126), h(0, 1), k(M), o(176 | b), h(0, 68), h(0, 127);
                            for (var D = -1, R = -1, T = -1, F = w ? 33 : t.Config.keyTransposes[m.key], U = w ? t.Config.drumInterval : 1, V = 0, Z = E; V < Z.length; V++) {
                                var Y = Z[V],
                                    O = m.getPattern(f, Y);
                                if (null != O) {
                                    var W = O.instrument,
                                        j = m.channels[f].instruments[W];
                                    if (y && (w || 1 == j.type || 0 == j.chorus)) {
                                        M += A;
                                        continue
                                    }
                                    if (D != W) {
                                        D = W;
                                        var z = "",
                                            J = 81;
                                        if (w) z += "type: " + t.Config.instrumentTypeNames[2], z += ", noise: " + t.Config.drumNames[j.wave], z += ", volume: " + t.Config.volumeNames[j.volume], z += ", transition: " + t.Config.transitionNames[j.transition], J = 126;
                                        else if (z += "type: " + t.Config.instrumentTypeNames[j.type], 0 == j.type) {
                                            z += ", wave: " + t.Config.waveNames[j.wave], z += ", volume: " + t.Config.volumeNames[j.volume], z += ", transition: " + t.Config.transitionNames[j.transition], z += ", filter: " + t.Config.filterNames[j.filter], z += ", chorus: " + t.Config.chorusNames[j.chorus], z += ", effect: " + t.Config.effectNames[j.effect];
                                            var X = 0 == t.Config.filterDecays[j.filter] ? t.Config.midiSustainInstruments : t.Config.midiDecayInstruments;
                                            J = X[j.wave]
                                        } else {
                                            if (1 != j.type) throw new Error("Unrecognized instrument type.");
                                            z += ", transition: " + t.Config.transitionNames[j.transition], z += ", effect: " + t.Config.effectNames[j.effect], z += ", algorithm: " + t.Config.midiAlgorithmNames[j.algorithm], z += ", feedbackType: " + t.Config.midiFeedbackNames[j.feedbackType], z += ", feedbackAmplitude: " + j.feedbackAmplitude, z += ", feedbackEnvelope: " + t.Config.operatorEnvelopeNames[j.feedbackEnvelope];
                                            for (var q = 0; q < t.Config.operatorCount; q++) {
                                                var H = j.operators[q];
                                                z += ", operator" + (q + 1) + ": {", z += "frequency: " + t.Config.midiFrequencyNames[H.frequency], z += ", amplitude: " + H.amplitude, z += ", envelope: " + t.Config.operatorEnvelopeNames[H.envelope], z += "}"
                                            }
                                        }
                                        k(M), r(65284), u(z), k(M), o(192 | b), h(0, J);
                                        var K = (5 - j.volume) / 5;
                                        w || 1 != j.type || (K = 1), k(M), o(176 | b), h(0, 7), h(0, Math.round(127 * K))
                                    }
                                    var _ = j.effect,
                                        $ = t.Config.effectVibratos[_],
                                        tt = t.Config.effectTremolos[_],
                                        et = .14,
                                        nt = 0,
                                        it = !1,
                                        st = !0;
                                    if (!w)
                                        if (0 == j.type) nt = t.Config.chorusIntervals[j.chorus], y || (nt *= -1), nt += t.Config.chorusOffsets[j.chorus], it = t.Config.chorusHarmonizes[j.chorus];
                                        else {
                                            if (1 != j.type) throw new Error("Unrecognized instrument type.");
                                            st = !1
                                        }
                                    for (var at = 0; at < O.notes.length; at++) {
                                        for (var rt = O.notes[at], ot = M + rt.start * v, ht = ot, lt = rt.pins[0].volume, ct = rt.pins[0].interval, ut = F + rt.pitches[0] * U, pt = 1; pt < rt.pins.length; pt++) {
                                            for (var dt = ot + rt.pins[pt].time * v, ft = rt.pins[pt].volume, gt = rt.pins[pt].interval, mt = dt - ht, bt = 0; mt > bt; bt++) {
                                                var vt = ht + bt,
                                                    Ct = e(lt, ft, bt / mt),
                                                    yt = e(ct, gt, bt / mt),
                                                    wt = Math.floor(bt / C) % 4,
                                                    xt = rt.pitches[0];
                                                st && (it ? y && (2 == rt.pitches.length ? xt = rt.pitches[1] : 3 == rt.pitches.length ? xt = rt.pitches[(wt >> 1) + 1] : 4 == rt.pitches.length && (xt = rt.pitches[(3 == wt ? 1 : wt) + 1])) : 2 == rt.pitches.length ? xt = rt.pitches[wt >> 1] : 3 == rt.pitches.length ? xt = rt.pitches[3 == wt ? 1 : wt] : 4 == rt.pitches.length && (xt = rt.pitches[wt]));
                                                var Qt = yt * U + nt,
                                                    Nt = Math.round(Qt),
                                                    At = Qt - Nt,
                                                    Et = At,
                                                    Pt = Math.sin(2 * Math.PI * (vt - M) * N / et);
                                                (2 != _ || vt - ot >= 3 * v) && (Et += $ * Pt);
                                                var Mt = Math.max(0, Math.min(16383, Math.round(8192 + 4096 * Et))),
                                                    kt = Ct / 3,
                                                    Bt = 1 + tt * (Pt - 1),
                                                    St = Math.round(127 * kt * Bt);
                                                Mt != R && (k(vt), o(224 | b), h(0, 127 & Mt), h(0, Mt >> 7 & 127)), St != T && (k(vt), o(176 | b), h(0, 11), h(0, St)), xt = F + xt * U + Nt, vt == ot ? (k(vt), o(144 | b), h(0, xt), h(0, 64)) : xt != ut && (k(vt), o(144 | b), h(0, xt), h(0, 64), k(vt), o(128 | b), h(0, ut), h(0, 64)), R = Mt, T = St, ut = xt
                                            }
                                            ht = dt, lt = ft, ct = gt
                                        }
                                        k(M + rt.end * v), o(128 | b), h(0, ut), h(0, 64)
                                    }
                                }
                                M += A
                            }
                        }
                        k(M), a(16723712), g.setUint32(x, p - x - 4, !1)
                    }, I = 0, G = k; I < G.length; I++) {
                    var D = G[I];
                    L(D)
                }
                f = ArrayBuffer.transfer(f, d);
                var R = new Blob([f], {
                    type: "audio/midi"
                });
                n(R, c.Pc.value.trim() + ".midi"), c.Kc()
            }, this.Zc = function() {
                var t = c.Q.song.toJsonObject(c.Qc.checked, Number(c.Rc.value), c.Sc.checked),
                    e = JSON.stringify(t, null, "	"),
                    i = new Blob([e], {
                        type: "application/json"
                    });
                n(i, c.Pc.value.trim() + ".json"), c.Kc()
            }, this.Rc.value = "1", 0 == this.Q.song.loopStart ? (this.Qc.checked = !1, this.Qc.disabled = !0) : (this.Qc.checked = !0, this.Qc.disabled = !1), this.Q.song.loopStart + this.Q.song.loopLength == this.Q.song.barCount ? (this.Sc.checked = !1, this.Sc.disabled = !0) : (this.Sc.checked = !0, this.Sc.disabled = !1), this.Pc.addEventListener("input", o.Wc), this.Rc.addEventListener("blur", o.Nc), this.Tc.addEventListener("click", this.Xc), this.Uc.addEventListener("click", this.Yc), this.Vc.addEventListener("click", this.Zc), this.Jc.addEventListener("click", this.Kc)
        }
        return o.Wc = function(t) {
            var e = t.target,
                n = /[\+\*\$\?\|\{\}\\\/<>#%!`&'"=:@]/gi;
            if (n.test(e.value)) {
                var i = e.selectionStart;
                e.value = e.value.replace(n, ""), i--, e.setSelectionRange(i, i)
            }
        }, o.Nc = function(t) {
            var e = t.target;
            e.value = Math.floor(Math.max(Number(e.min), Math.min(Number(e.max), Number(e.value)))) + ""
        }, o
    }();
    t.ExportPrompt = o
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    var e = t.html.button,
        n = t.html.div,
        i = t.html.input,
        s = t.html.text,
        a = function() {
            function a(a, r) {
                var o = this;
                this.Q = a, this.ub = r, this.$c = i({
                    type: "file",
                    accept: ".json,application/json"
                }), this.Jc = e({}, [s("Cancel")]), this.container = n({
                    className: "prompt",
                    style: "width: 200px;"
                }, [n({
                    style: "font-size: 2em"
                }, [s("Import")]), n({
                    style: "text-align: left;"
                }, [s("BeepBox songs can be exported and re-imported as .json files. You could also use other means to make .json files for BeepBox as long as they follow the same structure.")]), this.$c, this.Jc]), this.Kc = function() {
                    o.Q.undo()
                }, this.cleanUp = function() {
                    o.$c.removeEventListener("change", o._c), o.Jc.removeEventListener("click", o.Kc)
                }, this._c = function() {
                    var e = o.$c.files[0];
                    if (e) {
                        var n = new FileReader;
                        n.addEventListener("load", function(e) {
                            o.Q.prompt = null, o.Q.record(new t.ChangeSong(o.Q, n.result), !0)
                        }), n.readAsText(e)
                    }
                }, this.$c.addEventListener("change", this._c), this.Jc.addEventListener("click", this.Kc)
            }
            return a
        }();
    t.ImportPrompt = a
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    var e = t.html.button,
        n = t.html.div,
        i = t.html.text,
        s = function() {
            function s(s, a) {
                var r = this;
                this.Q = s, this.ub = a, this.Jc = e({}, [i("Close")]), this.container = n({
                    className: "prompt",
                    style: "width: 300px;"
                }, [n({
                    style: "font-size: 2em"
                }, [i("FM Synthesis")]), n({
                    style: "text-align: left; margin: 0.5em 0;"
                }, [i("Popularized by the Sega Genesis and Yamaha keyboards, FM Synthesis is a mysterious but powerful technique for crafting sounds. It may seem confusing, but just play around with the options until you get a feel for it, or check out some examples in "), t.html.element("a", {
                    target: "_blank",
                    href: "#6n10s0kbl00e07t5m0a7g07j7i7r1o2T1d2c0A0F1B0V1Q0200Pff00E0411T1d1c0A0F0B0V1Q2800Pf700E0711T1d2c0A0F1B4VaQ0200Pfb00E0911T1d1c2A0F9B3V1Q1000Pfbc0E0191T1d2c0AcF8B5V1Q0259PffffE0000T1d3c1AcF4B5V4Q2600Pff00E0011T1d1c0AbF0B0V1Q2580PfffaE2226T1d1c0A1F0B0V1Q520dPff4dEd41eb4zhmu0p21h5dfxd7ij7XrjfiAjPudUTtUSRsTzudTudJvdUTztTzrpPudUTtUSSYTzudTudJTdUTztTzrvPudUTtUSQ"
                }, [i("this demo")]), i(". ")]), n({
                    style: "text-align: left; margin: 0.5em 0;"
                }, [i("This FM instrument uses up to four waves, numbered 1, 2, 3, and 4. Each wave may have its own frequency, volume, and volume envelope to control its effect over time. ")]), n({
                    style: "text-align: left; margin: 0.5em 0;"
                }, [i('There are two kinds of waves: "carrier" waves play a tone out loud, but "modulator" waves distort other waves instead. Wave 1 is always a carrier and plays a tone, but other waves may distort it. The "Algorithm" setting determines which waves are modulators, and which other waves those modulators distort. ')]), n({
                    style: "text-align: left; margin: 0.5em 0;"
                }, [i('Modulators distort in one direction (like 1â†2), but you can also use "Feedback" to make any wave distort in the opposite direction (1â†’2), or even itself (1âŸ²). ')]), n({
                    style: "text-align: left; margin: 0.5em 0;"
                }, [i("You can set the pitch of each wave independently by adding simultaneous notes, one above another. This often sounds harsh or dissonant, but can make cool sound effects! ")]), this.Jc]), this.Kc = function() {
                    r.Q.undo()
                }, this.cleanUp = function() {
                    r.Jc.removeEventListener("click", r.Kc)
                }, this.Jc.addEventListener("click", this.Kc)
            }
            return s
        }();
    t.InstrumentTypePrompt = s
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    var e = t.html.button,
        n = t.html.div,
        i = t.html.text,
        s = function() {
            function t(t, s) {
                var a = this;
                this.Q = t, this.ub = s, this.Jc = e({}, [i("Close")]), this.container = n({
                    className: "prompt",
                    style: "width: 250px;"
                }, [n({
                    style: "font-size: 2em"
                }, [i("Custom Harmony")]), n({
                    style: "text-align: left;"
                }, [i('BeepBox "chip" instruments play two waves at once, each with their own pitch. The "Chorus" setting usually determines how far apart these pitches are, but in "custom harmony" mode, you can control these pitches individually by making two simultaneous notes, one above the other. This replaces the "arpeggio/trill" effect, and gives you greater control over your harmony. ')]), this.Jc]), this.Kc = function() {
                    a.Q.undo()
                }, this.cleanUp = function() {
                    a.Jc.removeEventListener("click", a.Kc)
                }, this.Jc.addEventListener("click", this.Kc)
            }
            return t
        }();
    t.ChorusPrompt = s
}(beepbox || (beepbox = {}));
var beepbox;
! function(t) {
    function e(t, e) {
        for (var n = 0, i = e; n < i.length; n++) {
            var s = i[n];
            t.appendChild(h(s, s, !1, !1))
        }
        return t
    }

    function n(t, e) {
        t.selectedIndex != e && (t.selectedIndex = e)
    }

    function i() {
        document.hidden || (f.synth.play(), g.updatePlayButton(), window.removeEventListener("visibilitychange", i))
    }
    var s = t.html.button,
        a = t.html.div,
        r = t.html.span,
        o = t.html.select,
        h = t.html.option,
        l = t.html.input,
        c = t.html.text,
        u = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|android|ipad|playbook|silk/i.test(navigator.userAgent),
        p = function() {
            function t(t, e, n) {
                var i = this;
                this.input = t, this.Q = e, this.ad = n, this.Vb = null, this.bd = 0, this.cd = 0, this.dd = function() {
                    var t = i.Q.lastChangeWas(i.Vb);
                    t || (i.cd = i.bd), i.Vb = i.ad(i.cd, parseInt(i.input.value)), i.Q.setProspectiveChange(i.Vb)
                }, this.ed = function() {
                    i.Q.record(i.Vb), i.Vb = null
                }, t.addEventListener("input", this.dd), t.addEventListener("change", this.ed)
            }
            return t.prototype.updateValue = function(t) {
                this.bd = t, this.input.value = String(t)
            }, t
        }(),
        d = function() {
            function i(i) {
                var d = this;
                this.Q = i, this.prompt = null, this.fd = new t.PatternEditor(this.Q), this.gd = new t.TrackEditor(this.Q, this), this.hd = new t.LoopEditor(this.Q), this.dc = a({
                        className: "trackContainer"
                    }, [this.gd.container, this.hd.container]), this.jd = new t.BarScrollBar(this.Q, this.dc), this.kd = new t.OctaveScrollBar(this.Q),
                    this.ld = new t.Piano(this.Q), this.md = a({}, [a({
                        className: "editorBox",
                        style: "height: 481px; display: flex; flex-direction: row; margin-bottom: 6px;"
                    }, [this.ld.container, this.fd.container, this.kd.container]), this.dc, this.jd.container]), this.nd = s({
                        style: "width: 80px;",
                        type: "button"
                    }), this.od = s({
                        className: "prevBarButton",
                        style: "width: 40px;",
                        type: "button",
                        title: "Previous Bar (left bracket)"
                    }), this.pd = s({
                        className: "nextBarButton",
                        style: "width: 40px;",
                        type: "button",
                        title: "Next Bar (right bracket)"
                    }), this.qd = l({
                        title: "main volume",
                        style: "width: 5em; flex-grow: 1; margin: 0px;",
                        type: "range",
                        min: "0",
                        max: "100",
                        value: "50",
                        step: "1"
                    }), this.rd = o({
                        style: "width: 100%;"
                    }, [h("", "Edit", !0, !0), h("undo", "Undo (Z)", !1, !1), h("redo", "Redo (Y)", !1, !1), h("copy", "Copy Pattern (C)", !1, !1), h("paste", "Paste Pattern (V)", !1, !1), h("transposeUp", "Shift Notes Up (+)", !1, !1), h("transposeDown", "Shift Notes Down (-)", !1, !1), h("duration", "Custom song size...", !1, !1), h("import", "Import JSON...", !1, !1)]), this.sd = o({
                        style: "width: 100%;"
                    }, [h("", "Preferences", !0, !0), h("autoPlay", "Auto Play On Load", !1, !1), h("autoFollow", "Auto Follow Track", !1, !1), h("showLetters", "Show Piano", !1, !1), h("showFifth", "Highlight 'Fifth' Notes", !1, !1), h("showChannels", "Show All Channels", !1, !1), h("showScrollBar", "Octave Scroll Bar", !1, !1)]), this.td = s({
                        type: "button"
                    }, [c("New"), r({
                        className: "fullWidthOnly"
                    }, [c(" Song")]), t.svgElement("svg", {
                        style: "flex-shrink: 0; position: absolute; left: 0; top: 50%; margin-top: -1em; pointer-events: none;",
                        width: "2em",
                        height: "2em",
                        viewBox: "-5 -21 26 26"
                    }, [t.svgElement("path", {
                        d: "M 2 0 L 2 -16 L 10 -16 L 14 -12 L 14 0 z M 3 -1 L 13 -1 L 13 -11 L 9 -11 L 9 -15 L 3 -15 z",
                        fill: "currentColor"
                    })])]), this.ud = s({
                        type: "button"
                    }, [c("Export"), t.svgElement("svg", {
                        style: "flex-shrink: 0; position: absolute; left: 0; top: 50%; margin-top: -1em; pointer-events: none;",
                        width: "2em",
                        height: "2em",
                        viewBox: "-13 -13 26 26"
                    }, [t.svgElement("path", {
                        d: "M -8 3 L -8 8 L 8 8 L 8 3 L 6 3 L 6 6 L -6 6 L -6 3 z M 0 2 L -4 -2 L -1 -2 L -1 -8 L 1 -8 L 1 -2 L 4 -2 z",
                        fill: "currentColor"
                    })])]), this.vd = e(o({}), t.Config.scaleNames), this.wd = e(o({}), t.Config.keyNames), this.xd = new p(l({
                        style: "margin: 0px;",
                        type: "range",
                        min: "0",
                        max: t.Config.tempoSteps - 1,
                        value: "7",
                        step: "1"
                    }), this.Q, function(e, n) {
                        return new t.ChangeTempo(d.Q, e, n)
                    }), this.yd = new p(l({
                        style: "margin: 0px;",
                        type: "range",
                        min: "0",
                        max: t.Config.reverbRange - 1,
                        value: "0",
                        step: "1"
                    }), this.Q, function(e, n) {
                        return new t.ChangeReverb(d.Q, e, n)
                    }), this.zd = e(o({}), t.Config.partNames), this.Ad = e(o({}), t.Config.pitchChannelTypeNames), this.Bd = t.html.element("a", {
                        className: "hintButton"
                    }, [c("?")]), this.Cd = a({
                        className: "selectRow"
                    }, [r({}, [c("Type: ")]), this.Bd, a({
                        className: "selectContainer"
                    }, [this.Ad])]), this.Dd = e(o({}), t.Config.operatorAlgorithmNames), this.Ed = a({
                        className: "selectRow"
                    }, [r({}, [c("Algorithm: ")]), a({
                        className: "selectContainer"
                    }, [this.Dd])]), this.Fd = o({}), this.Gd = a({
                        className: "selectRow",
                        style: "display: none;"
                    }, [r({}, [c("Instrument: ")]), a({
                        className: "selectContainer"
                    }, [this.Fd])]), this.Hd = new p(l({
                        style: "margin: 0px;",
                        type: "range",
                        min: "-5",
                        max: "0",
                        value: "0",
                        step: "1"
                    }), this.Q, function(e, n) {
                        return new t.ChangeVolume(d.Q, e, -n)
                    }), this.Id = a({
                        className: "selectRow"
                    }, [r({}, [c("Volume: ")]), this.Hd.input]), this.Jd = e(o({}), t.Config.waveNames), this.Kd = e(o({}), t.Config.drumNames), this.Ld = a({
                        className: "selectRow"
                    }, [r({}, [c("Wave: ")]), a({
                        className: "selectContainer"
                    }, [this.Jd, this.Kd])]), this.Md = e(o({}), t.Config.transitionNames), this.Nd = e(o({}), t.Config.filterNames), this.Od = a({
                        className: "selectRow"
                    }, [r({}, [c("Filter: ")]), a({
                        className: "selectContainer"
                    }, [this.Nd])]), this.Pd = e(o({}), t.Config.chorusNames), this.Qd = t.html.element("a", {
                        className: "hintButton"
                    }, [c("?")]), this.Rd = a({
                        className: "selectRow"
                    }, [r({}, [c("Chorus: ")]), this.Qd, a({
                        className: "selectContainer"
                    }, [this.Pd])]), this.Sd = e(o({}), t.Config.effectNames), this.Td = a({
                        className: "selectRow"
                    }, [r({}, [c("Effect: ")]), a({
                        className: "selectContainer"
                    }, [this.Sd])]), this.Ud = a({
                        style: "display: flex; flex-direction: column; display: none;"
                    }, []), this.Vd = e(o({}), t.Config.operatorFeedbackNames), this.Wd = a({
                        className: "selectRow"
                    }, [r({}, [c("Feedback:")]), a({
                        className: "selectContainer"
                    }, [this.Vd])]), this.Xd = new p(l({
                        style: "margin: 0px; width: 4em;",
                        type: "range",
                        min: "0",
                        max: t.Config.operatorAmplitudeMax,
                        value: "0",
                        step: "1",
                        title: "Feedback Amplitude"
                    }), this.Q, function(e, n) {
                        return new t.ChangeFeedbackAmplitude(d.Q, e, n)
                    }), this.Yd = e(o({
                        style: "width: 100%;",
                        title: "Feedback Envelope"
                    }), t.Config.operatorEnvelopeNames), this.Zd = a({
                        className: "operatorRow"
                    }, [a({
                        style: "margin-right: .1em; visibility: hidden;"
                    }, [c("1.")]), a({
                        style: "width: 3em; margin-right: .3em;"
                    }), this.Xd.input, a({
                        className: "selectContainer",
                        style: "width: 5em; margin-left: .3em;"
                    }, [this.Yd])]), this.$d = a({}, [this.Gd, this.Cd, this.Id, this.Ld, a({
                        className: "selectRow"
                    }, [r({}, [c("Transition: ")]), a({
                        className: "selectContainer"
                    }, [this.Md])]), this.Od, this.Rd, this.Td, this.Ed, this.Ud, this.Wd, this.Zd]), this._d = a({
                        className: "promptContainer",
                        style: "display: none;"
                    }), this.mainLayer = a({
                        className: "beepboxEditor",
                        tabIndex: "0"
                    }, [this.md, a({
                        className: "editor-widget-column"
                    }, [a({
                        style: "text-align: center; color: #999;"
                    }, [c("BeepBox 2.3")]), a({
                        className: "editor-widgets"
                    }, [a({
                        className: "editor-controls"
                    }, [a({
                        className: "playback-controls"
                    }, [a({
                        className: "playback-bar-controls"
                    }, [this.nd, this.od, this.pd]), a({
                        className: "playback-volume-controls"
                    }, [t.svgElement("svg", {
                        style: "flex-shrink: 0;",
                        width: "2em",
                        height: "2em",
                        viewBox: "0 0 26 26"
                    }, [t.svgElement("path", {
                        d: "M 4 16 L 4 10 L 8 10 L 13 5 L 13 21 L 8 16 z M 15 11 L 16 10 A 7.2 7.2 0 0 1 16 16 L 15 15 A 5.8 5.8 0 0 0 15 12 z M 18 8 L 19 7 A 11.5 11.5 0 0 1 19 19 L 18 18 A 10.1 10.1 0 0 0 18 8 z",
                        fill: "#777"
                    })]), this.qd])]), a({
                        className: "editor-menus"
                    }, [this.td, a({
                        className: "selectContainer menu"
                    }, [this.rd, t.svgElement("svg", {
                        style: "flex-shrink: 0; position: absolute; left: 0; top: 50%; margin-top: -1em; pointer-events: none;",
                        width: "2em",
                        height: "2em",
                        viewBox: "-5 -21 26 26"
                    }, [t.svgElement("path", {
                        d: "M 0 0 L 1 -4 L 4 -1 z M 2 -5 L 10 -13 L 13 -10 L 5 -2 zM 11 -14 L 13 -16 L 14 -16 L 16 -14 L 16 -13 L 14 -11 z",
                        fill: "currentColor"
                    })])]), a({
                        className: "selectContainer menu"
                    }, [this.sd, t.svgElement("svg", {
                        style: "flex-shrink: 0; position: absolute; left: 0; top: 50%; margin-top: -1em; pointer-events: none;",
                        width: "2em",
                        height: "2em",
                        viewBox: "-13 -13 26 26"
                    }, [t.svgElement("path", {
                        d: "M 5.78 -1.6 L 7.93 -0.94 L 7.93 0.94 L 5.78 1.6 L 4.85 3.53 L 5.68 5.61 L 4.21 6.78 L 2.36 5.52 L 0.27 5.99 L -0.85 7.94 L -2.68 7.52 L -2.84 5.28 L -4.52 3.95 L -6.73 4.28 L -7.55 2.59 L -5.9 1.07 L -5.9 -1.07 L -7.55 -2.59 L -6.73 -4.28 L -4.52 -3.95 L -2.84 -5.28 L -2.68 -7.52 L -0.85 -7.94 L 0.27 -5.99 L 2.36 -5.52 L 4.21 -6.78 L 5.68 -5.61 L 4.85 -3.53 M 2.92 0.67 L 2.92 -0.67 L 2.35 -1.87 L 1.3 -2.7 L 0 -3 L -1.3 -2.7 L -2.35 -1.87 L -2.92 -0.67 L -2.92 0.67 L -2.35 1.87 L -1.3 2.7 L -0 3 L 1.3 2.7 L 2.35 1.87 z",
                        fill: "currentColor"
                    })])]), this.ud])]), a({
                        className: "editor-settings"
                    }, [a({
                        className: "editor-song-settings"
                    }, [a({
                        style: "margin: 3px 0; text-align: center; color: #999;"
                    }, [c("Song Settings")]), a({
                        className: "selectRow"
                    }, [r({}, [c("Scale: ")]), a({
                        className: "selectContainer"
                    }, [this.vd])]), a({
                        className: "selectRow"
                    }, [r({}, [c("Key: ")]), a({
                        className: "selectContainer"
                    }, [this.wd])]), a({
                        className: "selectRow"
                    }, [r({}, [c("Tempo: ")]), this.xd.input]), a({
                        className: "selectRow"
                    }, [r({}, [c("Reverb: ")]), this.yd.input]), a({
                        className: "selectRow"
                    }, [r({}, [c("Rhythm: ")]), a({
                        className: "selectContainer"
                    }, [this.zd])])]), a({
                        className: "editor-instrument-settings"
                    }, [a({
                        style: "margin: 3px 0; text-align: center; color: #999;"
                    }, [c("Instrument Settings")]), this.$d])])])]), this._d]), this.ae = null, this.be = [], this.ce = [], this.de = [], this.ee = [], this.fe = function() {
                        d.mainLayer.focus()
                    }, this.whenUpdated = function() {
                        var i = d.dc.getBoundingClientRect();
                        d.Q.trackVisibleBars = Math.floor((i.right - i.left) / 32), d.jd.render(), d.gd.render();
                        for (var s = [(d.Q.autoPlay ? "âœ“ " : "") + "Auto Play On Load", (d.Q.autoFollow ? "âœ“ " : "") + "Auto Follow Track", (d.Q.showLetters ? "âœ“ " : "") + "Show Piano", (d.Q.showFifth ? "âœ“ " : "") + "Highlight 'Fifth' Notes", (d.Q.showChannels ? "âœ“ " : "") + "Show All Channels", (d.Q.showScrollBar ? "âœ“ " : "") + "Octave Scroll Bar"], a = 0; a < s.length; a++) {
                            var r = d.sd.children[a + 1];
                            r.innerText != s[a] && (r.innerText = s[a])
                        }
                        var o = d.Q.song.channels[d.Q.channel],
                            h = d.Q.getCurrentPattern(),
                            l = d.Q.getCurrentInstrument(),
                            c = o.instruments[l],
                            u = d.mainLayer.contains(document.activeElement),
                            p = document.activeElement;
                        if (n(d.vd, d.Q.song.scale), n(d.wd, d.Q.song.key), d.xd.updateValue(d.Q.song.tempo), d.xd.input.title = d.Q.song.getBeatsPerMinute() + " beats per minute", d.yd.updateValue(d.Q.song.reverb), n(d.zd, t.Config.partCounts.indexOf(d.Q.song.partsPerBeat)), d.Q.song.getChannelIsDrum(d.Q.channel) ? (d.Id.style.display = "", d.Kd.style.display = "", d.Ld.style.display = "", d.Cd.style.display = "none", d.Ed.style.display = "none", d.Ud.style.display = "none", d.Wd.style.display = "none", d.Zd.style.display = "none", d.Jd.style.display = "none", d.Od.style.display = "none", d.Rd.style.display = "none", d.Td.style.display = "none") : (d.Cd.style.display = "", d.Td.style.display = "", d.Kd.style.display = "none", 0 == c.type ? (d.Id.style.display = "", d.Jd.style.display = "", d.Ld.style.display = "", d.Od.style.display = "", d.Rd.style.display = "", d.Ed.style.display = "none", d.Ud.style.display = "none", d.Wd.style.display = "none", d.Zd.style.display = "none") : (d.Ed.style.display = "", d.Ud.style.display = "", d.Wd.style.display = "", d.Zd.style.display = "", d.Id.style.display = "none", d.Ld.style.display = "none", d.Od.style.display = "none", d.Rd.style.display = "none")), n(d.Ad, c.type), n(d.Dd, c.algorithm), d.Gd.style.display = d.Q.song.instrumentsPerChannel > 1 ? "" : "none", d.Gd.style.visibility = null == h ? "hidden" : "", d.Fd.children.length != d.Q.song.instrumentsPerChannel) {
                            for (; d.Fd.firstChild;) d.Fd.removeChild(d.Fd.firstChild);
                            for (var f = [], a = 0; a < d.Q.song.instrumentsPerChannel; a++) f.push(a + 1);
                            e(d.Fd, f)
                        }
                        d.$d.style.color = d.Q.song.getNoteColorBright(d.Q.channel), n(d.Jd, c.wave), n(d.Kd, c.wave), n(d.Nd, c.filter), n(d.Md, c.transition), n(d.Sd, c.effect), n(d.Pd, c.chorus), n(d.Vd, c.feedbackType), d.Xd.updateValue(c.feedbackAmplitude), n(d.Yd, c.feedbackEnvelope), d.Yd.parentElement.style.color = c.feedbackAmplitude > 0 ? "" : "#999", d.Hd.updateValue(-c.volume), n(d.Fd, l);
                        for (var a = 0; a < t.Config.operatorCount; a++) {
                            var g = a < t.Config.operatorCarrierCounts[c.algorithm];
                            d.be[a].style.color = g ? "white" : "", n(d.ee[a], c.operators[a].frequency), d.ce[a].updateValue(c.operators[a].amplitude), n(d.de[a], c.operators[a].envelope);
                            var m = (g ? "Voice " : "Modulator ") + (a + 1);
                            d.ee[a].title = m + " Frequency", d.ce[a].input.title = m + (g ? " Volume" : " Amplitude"), d.de[a].title = m + " Envelope", d.de[a].parentElement.style.color = c.operators[a].amplitude > 0 ? "" : "#999"
                        }
                        d.ld.container.style.display = d.Q.showLetters ? "" : "none", d.kd.container.style.display = d.Q.showScrollBar ? "" : "none", d.jd.container.style.display = d.Q.song.barCount > d.Q.trackVisibleBars ? "" : "none", d.Bd.style.display = 1 == c.type ? "" : "none", d.Qd.style.display = t.Config.chorusHarmonizes[c.chorus] ? "" : "none";
                        var b = 512;
                        d.Q.showLetters && (b -= 32), d.Q.showScrollBar && (b -= 20), d.fd.container.style.width = String(b) + "px", d.qd.value = String(d.Q.volume), u && 0 == p.clientWidth && d.fe(), d.ge(d.Q.prompt), d.Q.autoFollow && !d.Q.synth.playing && d.Q.synth.snapToBar(d.Q.bar)
                    }, this.he = function(e) {
                        if (d.prompt) return void(27 == e.keyCode && window.history.back());
                        switch (d.gd.onKeyPressed(e), e.keyCode) {
                            case 32:
                                d.ie(), e.preventDefault();
                                break;
                            case 90:
                                e.shiftKey ? d.Q.redo() : d.Q.undo(), e.preventDefault();
                                break;
                            case 89:
                                d.Q.redo(), e.preventDefault();
                                break;
                            case 67:
                                d.je(), e.preventDefault();
                                break;
                            case 86:
                                d.ke(), e.preventDefault();
                                break;
                            case 219:
                                d.Q.synth.prevBar(), d.Q.autoFollow && new t.ChangeChannelBar(d.Q, d.Q.channel, Math.floor(d.Q.synth.playhead)), e.preventDefault();
                                break;
                            case 221:
                                d.Q.synth.nextBar(), d.Q.autoFollow && new t.ChangeChannelBar(d.Q, d.Q.channel, Math.floor(d.Q.synth.playhead)), e.preventDefault();
                                break;
                            case 189:
                            case 173:
                                d.le(!1), e.preventDefault();
                                break;
                            case 187:
                            case 61:
                                d.le(!0), e.preventDefault()
                        }
                    }, this.me = function() {
                        d.Q.synth.prevBar()
                    }, this.ne = function() {
                        d.Q.synth.nextBar()
                    }, this.ie = function() {
                        d.Q.synth.playing ? d.oe() : d.pe()
                    }, this.qe = function() {
                        d.Q.setVolume(Number(d.qd.value))
                    }, this.re = function() {
                        d.Q.record(new t.ChangeSong(d.Q, "")), d.fd.resetCopiedPins()
                    }, this.se = function() {
                        d.te("export")
                    }, this.ue = function() {
                        d.te("instrumentType")
                    }, this.ve = function() {
                        d.te("chorus")
                    }, this.we = function() {
                        d.Q.record(new t.ChangeScale(d.Q, d.vd.selectedIndex))
                    }, this.xe = function() {
                        d.Q.record(new t.ChangeKey(d.Q, d.wd.selectedIndex))
                    }, this.ye = function() {
                        d.Q.record(new t.ChangePartsPerBeat(d.Q, t.Config.partCounts[d.zd.selectedIndex]))
                    }, this.ze = function() {
                        d.Q.record(new t.ChangeInstrumentType(d.Q, d.Ad.selectedIndex))
                    }, this.Ae = function() {
                        d.Q.record(new t.ChangeFeedbackType(d.Q, d.Vd.selectedIndex))
                    }, this.Be = function() {
                        d.Q.record(new t.ChangeFeedbackEnvelope(d.Q, d.Yd.selectedIndex))
                    }, this.Ce = function() {
                        d.Q.record(new t.ChangeAlgorithm(d.Q, d.Dd.selectedIndex))
                    }, this.De = function() {
                        var e = d.Q.getCurrentPattern();
                        null != e && d.Q.record(new t.ChangePatternInstrument(d.Q, d.Fd.selectedIndex, e))
                    }, this.Ee = function() {
                        d.Q.record(new t.ChangeWave(d.Q, d.Jd.selectedIndex))
                    }, this.Fe = function() {
                        d.Q.record(new t.ChangeWave(d.Q, d.Kd.selectedIndex))
                    }, this.Ge = function() {
                        d.Q.record(new t.ChangeFilter(d.Q, d.Nd.selectedIndex))
                    }, this.He = function() {
                        d.Q.record(new t.ChangeTransition(d.Q, d.Md.selectedIndex))
                    }, this.Ie = function() {
                        d.Q.record(new t.ChangeEffect(d.Q, d.Sd.selectedIndex))
                    }, this.Je = function() {
                        d.Q.record(new t.ChangeChorus(d.Q, d.Pd.selectedIndex))
                    }, this.Ke = function(t) {
                        switch (d.rd.value) {
                            case "undo":
                                d.Q.undo();
                                break;
                            case "redo":
                                d.Q.redo();
                                break;
                            case "copy":
                                d.je();
                                break;
                            case "paste":
                                d.ke();
                                break;
                            case "transposeUp":
                                d.le(!0);
                                break;
                            case "transposeDown":
                                d.le(!1);
                                break;
                            case "import":
                                d.te("import");
                                break;
                            case "duration":
                                d.te("duration")
                        }
                        d.rd.selectedIndex = 0
                    }, this.Le = function(t) {
                        switch (d.sd.value) {
                            case "autoPlay":
                                d.Q.autoPlay = !d.Q.autoPlay;
                                break;
                            case "autoFollow":
                                d.Q.autoFollow = !d.Q.autoFollow;
                                break;
                            case "showLetters":
                                d.Q.showLetters = !d.Q.showLetters;
                                break;
                            case "showFifth":
                                d.Q.showFifth = !d.Q.showFifth;
                                break;
                            case "showChannels":
                                d.Q.showChannels = !d.Q.showChannels;
                                break;
                            case "showScrollBar":
                                d.Q.showScrollBar = !d.Q.showScrollBar
                        }
                        d.sd.selectedIndex = 0, d.Q.notifier.changed(), d.Q.savePreferences()
                    }, this.Q.notifier.watch(this.whenUpdated), this.Ud.appendChild(a({
                        className: "operatorRow",
                        style: "color: #999; height: 1em; margin-top: 0.5em;"
                    }, [a({
                        style: "margin-right: .1em; visibility: hidden;"
                    }, [c("1.")]), a({
                        style: "width: 3em; margin-right: .3em;"
                    }, [c("Freq:")]), a({
                        style: "width: 4em; margin: 0;"
                    }, [c("Volume:")]), a({
                        style: "width: 5em; margin-left: .3em;"
                    }, [c("Envelope:")])]));
                for (var f = function(n) {
                        var i = n,
                            s = a({
                                style: "margin-right: .1em; color: #999;"
                            }, [c(n + 1 + ".")]),
                            r = e(o({
                                style: "width: 100%;",
                                title: "Frequency"
                            }), t.Config.operatorFrequencyNames),
                            h = new p(l({
                                style: "margin: 0; width: 4em;",
                                type: "range",
                                min: "0",
                                max: t.Config.operatorAmplitudeMax,
                                value: "0",
                                step: "1",
                                title: "Volume"
                            }), g.Q, function(e, n) {
                                return new t.ChangeOperatorAmplitude(d.Q, i, e, n)
                            }),
                            u = e(o({
                                style: "width: 100%;",
                                title: "Envelope"
                            }), t.Config.operatorEnvelopeNames),
                            f = a({
                                className: "operatorRow"
                            }, [s, a({
                                className: "selectContainer",
                                style: "width: 3em; margin-right: .3em;"
                            }, [r]), h.input, a({
                                className: "selectContainer",
                                style: "width: 5em; margin-left: .3em;"
                            }, [u])]);
                        g.Ud.appendChild(f), g.be[n] = f, g.ce[n] = h, g.de[n] = u, g.ee[n] = r, u.addEventListener("change", function() {
                            d.Q.record(new t.ChangeOperatorEnvelope(d.Q, i, u.selectedIndex))
                        }), r.addEventListener("change", function() {
                            d.Q.record(new t.ChangeOperatorFrequency(d.Q, i, r.selectedIndex))
                        })
                    }, g = this, m = 0; m < t.Config.operatorCount; m++) f(m);
                this.rd.addEventListener("change", this.Ke), this.sd.addEventListener("change", this.Le), this.vd.addEventListener("change", this.we), this.wd.addEventListener("change", this.xe), this.zd.addEventListener("change", this.ye), this.Ad.addEventListener("change", this.ze), this.Dd.addEventListener("change", this.Ce), this.Fd.addEventListener("change", this.De), this.Vd.addEventListener("change", this.Ae), this.Yd.addEventListener("change", this.Be), this.Jd.addEventListener("change", this.Ee), this.Kd.addEventListener("change", this.Fe), this.Md.addEventListener("change", this.He), this.Nd.addEventListener("change", this.Ge), this.Pd.addEventListener("change", this.Je), this.Sd.addEventListener("change", this.Ie), this.nd.addEventListener("click", this.ie), this.od.addEventListener("click", this.me), this.pd.addEventListener("click", this.ne), this.td.addEventListener("click", this.re), this.ud.addEventListener("click", this.se), this.qd.addEventListener("input", this.qe), this.Bd.addEventListener("click", this.ue), this.Qd.addEventListener("click", this.ve), this.md.addEventListener("mousedown", this.fe), this.mainLayer.addEventListener("keydown", this.he), u && (this.sd.children[1].disabled = !0)
            }
            return i.prototype.te = function(t) {
                this.Q.openPrompt(t), this.ge(t)
            }, i.prototype.ge = function(e) {
                if (this.prompt && (this.Me && this.pe(), this.Me = !1, this._d.style.display = "none", this._d.removeChild(this.prompt.container), this.prompt.cleanUp(), this.prompt = null, this.mainLayer.focus()), e) {
                    switch (e) {
                        case "export":
                            this.prompt = new t.ExportPrompt(this.Q, this);
                            break;
                        case "import":
                            this.prompt = new t.ImportPrompt(this.Q, this);
                            break;
                        case "duration":
                            this.prompt = new t.SongDurationPrompt(this.Q, this);
                            break;
                        case "instrumentType":
                            this.prompt = new t.InstrumentTypePrompt(this.Q, this);
                            break;
                        case "chorus":
                            this.prompt = new t.ChorusPrompt(this.Q, this);
                            break;
                        default:
                            throw new Error("Unrecognized prompt type.")
                    }
                    this.prompt && (this.Me = this.Q.synth.playing, this.oe(), this._d.style.display = null, this._d.appendChild(this.prompt.container))
                }
            }, i.prototype.updatePlayButton = function() {
                this.Q.synth.playing ? (this.nd.classList.remove("playButton"), this.nd.classList.add("pauseButton"), this.nd.title = "Pause (Space)", this.nd.innerText = "Pause") : (this.nd.classList.remove("pauseButton"), this.nd.classList.add("playButton"), this.nd.title = "Play (Space)", this.nd.innerText = "Play")
            }, i.prototype.pe = function() {
                this.Q.synth.play(), this.updatePlayButton()
            }, i.prototype.oe = function() {
                this.Q.synth.pause(), this.Q.autoFollow ? this.Q.synth.snapToBar(this.Q.bar) : this.Q.synth.snapToBar(), this.updatePlayButton()
            }, i.prototype.je = function() {
                var t = this.Q.getCurrentPattern();
                if (null != t) {
                    var e = {
                        notes: t.notes,
                        beatsPerBar: this.Q.song.beatsPerBar,
                        partsPerBeat: this.Q.song.partsPerBeat,
                        drums: this.Q.song.getChannelIsDrum(this.Q.channel)
                    };
                    window.localStorage.setItem("patternCopy", JSON.stringify(e))
                }
            }, i.prototype.ke = function() {
                var e = this.Q.getCurrentPattern();
                if (null != e) {
                    var n = JSON.parse(String(window.localStorage.getItem("patternCopy")));
                    null != n && n.drums == this.Q.song.getChannelIsDrum(this.Q.channel) && this.Q.record(new t.ChangePaste(this.Q, e, n.notes, n.beatsPerBar, n.partsPerBeat))
                }
            }, i.prototype.le = function(e) {
                var n = this.Q.getCurrentPattern();
                if (null != n) {
                    var i = this.Q.lastChangeWas(this.ae);
                    this.ae = new t.ChangeTranspose(this.Q, n, e), this.Q.record(this.ae, i)
                }
            }, i
        }();
    t.SongEditor = d;
    var f = new t.SongDocument(location.hash),
        g = new d(f),
        m = document.getElementById("beepboxEditorContainer");
    m.appendChild(g.mainLayer), g.whenUpdated(), g.mainLayer.focus(), !u && f.autoPlay && (document.hidden ? window.addEventListener("visibilitychange", i) : i()), "scrollRestoration" in history && (history.scrollRestoration = "manual"), g.updatePlayButton()
}(beepbox || (beepbox = {}));