const SOUND = (() => {

    let ctx = null;
    let muted = localStorage.getItem("hundred_muted") === "true";

    function getContext() {
        if (!ctx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            ctx = new AudioContextClass();
        }
        if (ctx.state === "suspended") {
            ctx.resume();
        }
        return ctx;
    }

    function tone(freq, startTime, duration, type = "sine", peakGain = 0.2) {
        const audioCtx = getContext();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.05);
    }

    function play(sequence) {
        if (muted) return;

        const audioCtx = getContext();
        const now = audioCtx.currentTime;

        sequence.forEach(([freq, offset, duration, type, gain]) => {
            tone(freq, now + offset, duration, type, gain);
        });
    }

    function noiseTap(startTime, duration, peakGain, centerFreq, q) {
        const audioCtx = getContext();
        const bufferSize = Math.max(1, Math.floor(audioCtx.sampleRate * duration));
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            const decay = 1 - i / bufferSize;
            data[i] = (Math.random() * 2 - 1) * decay * decay;
        }

        const source = audioCtx.createBufferSource();
        source.buffer = buffer;

        const filter = audioCtx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = centerFreq;
        filter.Q.value = q;

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(peakGain, startTime);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        source.start(startTime);
    }

    function thump(startTime, freq, duration, peakGain) {
        const audioCtx = getContext();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.6, startTime + duration);

        gain.gain.setValueAtTime(peakGain, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.02);
    }

    function woodClick() {
        if (muted) return;
        const now = getContext().currentTime;
        thump(now, 190, 0.05, 0.22);
        noiseTap(now, 0.02, 0.12, 1100, 1.2);
    }

    return {
        clueBuy() {
            woodClick();
        },
        correct() {
            play([
                [660, 0, 0.1, "sine", 0.18],
                [990, 0.08, 0.14, "sine", 0.18]
            ]);
        },
        wrong() {
            play([
                [220, 0, 0.18, "sawtooth", 0.15],
                [160, 0.15, 0.28, "sawtooth", 0.15]
            ]);
        },
        levelComplete() {
            play([
                [523, 0, 0.14, "sine", 0.18],
                [659, 0.13, 0.14, "sine", 0.18],
                [784, 0.26, 0.14, "sine", 0.18],
                [1047, 0.4, 0.3, "sine", 0.2]
            ]);
        },
        newBest() {
            play([
                [784, 0, 0.1, "triangle", 0.16],
                [988, 0.1, 0.1, "triangle", 0.16],
                [1175, 0.2, 0.22, "triangle", 0.18]
            ]);
        },
        click() {
            woodClick();
        },
        isMuted() {
            return muted;
        },
        setMuted(value) {
            muted = value;
            localStorage.setItem("hundred_muted", String(muted));
        },
        toggleMuted() {
            this.setMuted(!muted);
            return muted;
        }
    };

})();
