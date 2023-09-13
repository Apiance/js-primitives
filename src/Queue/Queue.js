const EventEmitter = require('events');

class Queue extends EventEmitter {
    constructor() {
        super();
        this.queue = [];
        this.processing = false;
        this.paused = false;
        this.handler = null;
        this.processed = 0;
    }

    consider(object) {
        this.queue.push(object);
        this.start();
    }

    setHandler(handler){
        this.handler = handler;
    }
    async process() {
        if (this.paused || this.processing || !this.queue.length) return;

        this.processing = true;

        const object = this.queue.shift();

        await this.handler(object);
        this.processed += 1;

        this.processing = false;

        this.emit('processed', object);
        await this.process();
    }

    start() {
        if (this.paused) return;
        this.process();
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
        this.start();
    }
}

module.exports = Queue
