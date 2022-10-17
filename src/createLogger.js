const pino = require('pino');

module.exports = (props = {}) => {
    return pino({
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: "yyyy-mm-dd HH:MM:ss",
                messageFormat: (props?.prefix) ? `${props.prefix} {msg}` : `{msg}`
            }
        },
        base: '',
        level: 'trace'
    });
};
