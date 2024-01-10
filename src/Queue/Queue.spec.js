import { expect, describe, it } from "vitest";
import Queue from "./Queue.js";

describe('Queue', function suite() {
    let handlerMockState;
    let handlerMock;
    let queueWithHandler;
    const mockDate = new Date("2020-08-02T00:33:58.000Z");
    it('should instantiates', () => {
        const queue = new Queue();
        expect(queue).to.exist;
    })
    it('should set handler', () => {
        queueWithHandler = new Queue({
            autoStart: false,
        });
        handlerMockState = {
            handled: [],
            processed: [],
        }
        let handlerMock = (obj) => {
            handlerMockState.handled.push(obj);
        };

        queueWithHandler.setHandler(handlerMock);
        expect(queueWithHandler).to.exist;
        expect(queueWithHandler.handler).to.equal(handlerMock);

        queueWithHandler.on('processed', (obj) => {
            handlerMockState.processed.push(obj);
        });

    });
    it('should consider to queue', () => {
        queueWithHandler.consider({data:{
            time: mockDate
        }});

        expect(queueWithHandler.queue.length).to.equal(1);
        expect(queueWithHandler.queue).to.deep.equal([{data:{
            time: mockDate,
        }}]);
        expect(handlerMockState.handled.length).to.equal(0);
        expect(handlerMockState.processed.length).to.equal(0);
    });
    it('should process', async () => {
        await queueWithHandler.process();
        expect(queueWithHandler.queue.length).to.equal(0);
        expect(queueWithHandler.queue).to.deep.equal([]);
        expect(handlerMockState.handled.length).to.equal(1);
        expect(handlerMockState.handled).to.deep.equal([{data:{
            time: mockDate,
        }}]);
        expect(handlerMockState.processed.length).to.equal(1);
        expect(handlerMockState.processed).to.deep.equal([{data:{
            time: mockDate,
        }}]);
    });
});
