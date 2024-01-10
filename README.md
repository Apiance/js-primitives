## Primitives

> This repository holds all the primitives needed to help with the data format used by the Apiance API.  
> 

### Asset 

```js
import { Asset } from '@apiance/primitives';

const asset = new Asset({
    name: 'Bitcoin',
    isoCode: 'BTC'
});
```

### Candle 

```js
import { Candle } from '@apiance/primitives';

const candle = new Candle({
    market: "KRAKEN::BTC-USD",
    interval: '1d',
    openTime: '2020-08-02T00:00:00.142Z',
    closeTime: '2020-08-02T00:59:59.999Z',
    open: '10000',
    close: '10100',
    high: '10111',
    low: '10000',
    volume: { base:'0.01', quote: '100' },
    trades: 60
});
```

### CandleSet

```js
import { CandleSet } from '@apiance/primitives';
```

### Command

```js
import { Command } from '@apiance/primitives';
```

### Epoch

```js
import { Epoch } from '@apiance/primitives';
```

### EventMessage

```js
import { EventMessage } from '@apiance/primitives';
```

### Exchange

```js
import { Exchange } from '@apiance/primitives';
```

### Instrument

```js
import { Instrument } from '@apiance/primitives';
```

### KeyChain

```js
import { KeyChain } from '@apiance/primitives';
```

### Keys

```js
import { Keys } from '@apiance/primitives';
```

### Location

```js
import { Location } from '@apiance/primitives';
```

### Market

```js
import { Market } from '@apiance/primitives';
```

### Organization

```js
import { Organization } from '@apiance/primitives';
```


### Person

```js
import { Person } from '@apiance/primitives';
```


### Persona

```js
import { Persona } from '@apiance/primitives';
```

### Queue

```js
import { Queue } from '@apiance/primitives';
```

### SocketMessage

```js
import { SocketMessage } from '@apiance/primitives';
```

### Tick

```js
import { Tick } from '@apiance/primitives';
```

### Ticker

```js
import { Ticker } from '@apiance/primitives';
```

### Trade

```js
import { Trade } from '@apiance/primitives';
```

### ZCandle

```js
import { ZCandle } from '@apiance/primitives';
```

### ZTrade

```js
import { ZTrade } from '@apiance/primitives';
```

