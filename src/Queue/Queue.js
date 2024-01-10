import EventEmitter from 'events';
class Queue extends EventEmitter {
    constructor(props={}) {
        super();
        this.queue = [];
        this.processing = false;
        this.paused = false;
        this.handler = null;
        this.processed = 0;

        this.autoStart = props?.autoStart ?? true;
    }

    consider(object) {
        this.queue.push(object);
        if(this.autoStart){
            this.start();
        }
    }

    setHandler(handler){
        this.handler = handler;
    }
    async process() {
        if (this.paused || this.processing || !this.queue.length) return;

        this.processing = true;

        const object = this.queue.shift();

        if(!this.handler) throw new Error('No handler set for queue. Use setHandler');
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

export default Queue;
