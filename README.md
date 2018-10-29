[![NPM](https://nodei.co/npm/bloc-rpc.png?downloads=true&stars=true)](https://nodei.co/npm/bloc-rpc/)

[![Build Status](https://travis-ci.org/furiousteam/BLOC-rpc.png?branch=master)](https://travis-ci.org/furiousteam/BLOC-rpc) [![Build Status](https://ci.appveyor.com/api/projects/status/github/furiousteam/BLOC-rpc?branch=master&svg=true)](https://ci.appveyor.com/project/furiousteam/BLOC-rpc/branch/master)

# BLOC RPC API

This project is designed to make it very easy to interact with various RPC APIs available within the [BLOC](https://bloc.money) Project. This entire project uses [Javascript Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) to make things fast, easy, and safe.

## Table of Contents

1. [Installation](#installation)
2. [Intialization](#intialization)
3. [BLOCd RPC API Interface](#blocd-rpc-api-interface)
4. [BlocService RPC API Interface](#blocservice-rpc-api-interface)
5. [Client RPC API Interface](#client-rpc-api-interface)

## Installation

```bash
npm install bloc-rpc
```

## Intialization

### BLOCd
```javascript
const BLOCd = require('bloc-rpc').BLOCd

const daemon = new BLOCd({
  host: '127.0.0.1', // ip address or hostname of the BLOCd host
  port: 2086, // what port is the RPC server running on
  timeout: 2000, // request timeout
  ssl: false // whether we need to connect using SSL/TLS
})
```

### BlocService
```javascript
const BlocService = require('bloc-rpc').BlocService

const service = new BlocService({
  host: '127.0.0.1', // ip address or hostname of the bloc-service host
  port: 8070, // what port is bloc-service running on
  timeout: 2000, // request timeout
  ssl: false, // whether we need to connect using SSL/TLS
  rpcPassword: 'inblocwetrust', // must be set to the password used to run bloc-service
  
  // RPC API default values
  defaultMixin: false, // the default mixin to use for transactions, the default setting is false which means we don't have a default value
  defaultFee: 1, // the default transaction fee for transactions
  defaultBlockCount: 1, // the default number of blocks when blockCount is required
  decimalDivisor: 1000, // Currency has many decimal places?
  defaultFirstBlockIndex: 1, // the default first block index we will use when it is required
  defaultUnlockTime: 0, // the default unlockTime for transactions
  defaultFusionThreshold: 1, // the default fusionThreshold for fusion transactions
})
```

### Client
```javascript
const Client = require('bloc-rpc').Client

const client = new Client({
  host: '127.0.0.1', // ip address or hostname of the BLOCd host
  port: 2086, // what port is the RPC server running on
  timeout: 2000, // request timeout
  ssl: false // whether we need to connect using SSL/TLS
})
```

## BLOCd RPC API Interface

We expose all of the `BLOCd` RPC API commands via the ```BLOCd``` interface. Each of the below methods are [Javascript Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises). For safety sake, **always** handle your promise catches as we do use them properly.

Methods noted having options have parameters that may be *optional* or *required* as documented.

### daemon.getBlocks(options)

Returns information on the last 30 blocks before *height* (inclusive).

#### Input

Argument        | Mandatory     | Description           | Format
--------------- | ------------- | --------------------- | ------
height          | Yes           | height of the blockchain to be included in the result. | integer

#### Example Code

```javascript
daemon.getBlocks({
  height: 104326
}).then((blocks) => {
  // do something
})
```

#### Example Data

```javascript
[ { cumul_size: 1742,
    difficulty: 47134552,
    hash:
     'a4ee6bc0613b131ab9642c4090542bf906284a614e5a6041915127536d6bcbc0',
    height: 104326,
    timestamp: 1540806279,
    tx_count: 2 },
  { cumul_size: 355,
    difficulty: 47531254,
    hash:
     '9bc5b82452047a3475dc90796900ee6c78a7b971f0d36409328630787dbd4664',
    height: 104325,
    timestamp: 1540806195,
    tx_count: 1 },
  { cumul_size: 346,
    difficulty: 46081092,
    hash:
     '6986fc750946f7e20191d2a231853e7091de5dd34c4d7afa01ab686a54fe1ac0',
    height: 104324,
    timestamp: 1540806047,
    tx_count: 1 },
  { cumul_size: 16569,
    difficulty: 45398503,
    hash:
     '547879344dd593c3ad426f23f441b87a9fe939a797426656e6e3f2230da7507c',
    height: 104296,
    timestamp: 1540803334,
    tx_count: 1 } ]

```

#### Output

Argument |              | Description                           | Format
-------- | ------------ | -----------                           | ------
status   |              | status of the request                 | string
blocks   | **Array of** |                                       |
         | cumul_size   | size of the block                     | int
         | difficulty   | difficulty of the block               | int
         | hash         | hash of the block                     | string
         | height       | height of the block                   | int
         | timestamp    | the time at which the block is occured on the chain since Unix epoch | int
         | tx_count     | number of transactions in the block   | int


### daemon.getBlock(options)

Returns information on a single block

#### Input

Argument        | Mandatory     | Description                         | Format
--------------- | ------------- | ----------------------------------- | ------
hash            | Yes           | Block hash you wish to retreive     | string


#### Example Code

```javascript
daemon.getBlock({
  hash: 'd8a24f43719a1088c9311dbbef17cef5141fa02bf29986a38dae59e20297c768'
}).then((block) => {
  // do something
})
```

#### Sample Data

```javascript
{ alreadyGeneratedCoins: '71833702006',
  alreadyGeneratedTransactions: 339705,
  baseReward: 204165,
  blockSize: 3079,
  depth: 30,
  difficulty: 43080047,
  effectiveSizeMedian: 1000000,
  hash:
   'd8a24f43719a1088c9311dbbef17cef5141fa02bf29986a38dae59e20297c768',
  height: 104304,
  major_version: 4,
  minor_version: 0,
  nonce: 83887409,
  orphan_status: false,
  penalty: 0,
  prev_hash:
   '6dc529cbafdd441a2ae31bea908902d3eb833499f681265bbe2ebf800daed120',
  reward: 204168,
  sizeMedian: 236,
  timestamp: 1540803975,
  totalFeeAmount: 3,
  transactions:
   [ { amount_out: 204168,
       fee: 0,
       hash:
        '3db2b990e500fe07d44f7599483120ba989fad2a9fc5574178f7d399c185c4d9',
       size: 236 },
     { amount_out: 100000,
       fee: 1,
       hash:
        'c6bbf4754a31dc1821a6bce7fc0e9bdf2fe164b86c156eb24145ae8b7538a266',
       size: 452 },
     { amount_out: 60099,
       fee: 1,
       hash:
        '0d009323d3bc7d223d56dda487b174dc9a6e25c31861288a58ef1dd77e9e8b31',
       size: 487 },
     { amount_out: 338373,
       fee: 1,
       hash:
        'd2b4d1d314b0a3627b0853b9083a42c141aaae8998718a28605d981c912a1a9d',
       size: 1689 } ],
  transactionsCumulativeSize: 2864 }
```

#### Output

Argument | Description | Format
------- | ---------- | --------
alreadyGeneratedCoins | total number of coins generated in the network upto that block | string
alreadyGeneratedTransactions | total number of transactions present in the network upto that block | int
baseReward | calculated reward | int
block_size | size of the block | int
depth | height away from the known top block | int
difficulty | difficulty of the requested block | int
effectiveSizeMedian | fixed constant for max size of block | int
hash | hash of the requested block | string
height | height of the requested block | int
major_version | - | int
minor_version | - | int
nonce | - | int
orphan_status | whether the requested block was an orphan or not | bool
penalty | penalty in block reward determined for deviation | float
prev_hash | hash of the previous block | string
reward | total reward of the block after removing penalty | str
sizeMedian | calculated median size from last 100 blocks | int
timestamp | the time at which the block is occured on chain since Unix epoch | int
totalFeeAmount | total fees for the transactions in the block | int
transactions | Array of transactions in the block | array
transactionsCumulativeSize | total sum of size of all transactions in the block | int
status | status of the request | string

#### Transaction Attributes

Argument | Description | Format
------- | ---------- | --------
amount_out | output amount of the transaction | int
fee | fees for the transaction | int
hash | hash of the transaction | string
size | size of the transaction | int


### daemon.getTransaction(options)

Gets information on the single transaction.

#### Input

Argument        | Mandatory     | Description                   | Format
--------------- | ------------- | ------------------------------| ------
hash            | Yes           | Transaction hash              | string


#### Example Code

```javascript
daemon.getTransaction({
  hash: '4c4d2ddb0277ce958ab41228ca24fa609c47d658d2955005d822ae697fba999d'
}).then((transaction) => {
  // do something
})
```

#### Sample Data

```javascript
{ block:
   { cumul_size: 2277,
     difficulty: 39533728,
     hash:
      'c11c3f9f8e6376585cf598906541051f07ed49a877a0884e2c8e757cac9af156',
     height: 104343,
     timestamp: 1540808154,
     tx_count: 3 },
  status: 'OK',
  tx:
   { '':
      '967bb63721cb2f6e2c15318674bd2cc2aa8ee1eb7d922b0bd76febf1ea85240186b79ace51c646a20f97495509510ae70620129f055dd8ea3b07116c8e07da0a',
     extra:
      '013c12608a04af937e0197972a22e4700f8f572b44af9a8b806ee410a11fcdbde0',
     unlock_time: 0,
     version: 1,
     vin: [ [Object] ],
     vout: [ [Object], [Object], [Object], [Object], [Object] ] },
  txDetails:
   { amount_out: 9999,
     fee: 1,
     hash:
      '4c4d2ddb0277ce958ab41228ca24fa609c47d658d2955005d822ae697fba999d',
     mixin: 4,
     paymentId: '',
     size: 515 } }

```

#### Output

Argument | Description | Format
------- | ---------- | --------
block | details of the block in which transaction is present | json object
status | status of the request | string
tx | sub-transactions in the transaction | json object
txDetails | details of the transaction | json object


### daemon.getTransactionPool()

* Gets the list of transaction hashs in the mempool
* No input

#### Example Code

```javascript
daemon.getTransactionPool().then((transactions) => {
  // do something
})
```

#### Sample Data

```javascript
[ { amount_out: 234320,
    fee: 1,
    hash:
     'f45737c88670722e7d71fbba46d44abddf5e9d35115b0df22a071beb82db294f',
    size: 934 },
  { amount_out: 59000,
    fee: 0,
    hash:
     '4d960625ccf1d29e53ec875b80914ce3a51c3db5192f98c4b80becd3b580a6dc',
    size: 1448 } ]

```

#### Output

Argument | Description | Format
------- | ---------- | --------
status | status of the request | string
transactions | array of transactions in mempool | array

Transactions attributes:

Argument | Description | Format
------- | ---------- | --------
amount_out | output amount of the transaction | int
fee | fees for the transaction | int
hash | hash of the transaction | string
size | size of the transaction | int


### daemon.getBlockCount()

* Gets the current block count
* No input

#### Example Code

```javascript
daemon.getBlockCount().then((blockCount) => {
  // do something
})
```

#### Sample Data

```javascript
104357
```

#### Output

Argument         | Description          | Format
---------------- | -------------------- | ------
count            | Current chain height | integer
status           | Status of request    | string


### daemon.getBlockHash(options)

Returns block hash for a given height off by one.

#### Input

Argument        | Mandatory     | Description           | Format
--------------- | ------------- | --------------------- | ------
height          | Yes           | The height of the block whose previous hash is to be retrieved. | integer

#### Example Code

```javascript
daemon.getBlockHash({
  height: 104357
}).then((blockHash) => {
  // do something
})
```

#### Sample Data

```text
ad4e1d529f89ed4d272cd0f3d49c863ddc4107891a9e4f5ee7a3e7ef0dab2b9b
```

#### Output

Argument         | Description            | Format
---------------- | ---------------------- | ------
result           | Hash of previous block | int


### daemon.getBlockTemplate(options)

Returns blocktemplate with an empty "hole" for nonce.

#### Input

Argument | Mandatory | Description | Format
-------- | -------- | ------------- | -----
reserve_size | Yes | Block reserve size to be specified | int
wallet_address | Yes | Valid BLOC wallet address | String

#### Example Code

```javascript
daemon.getBlockTemplate({
  reserveSize: 200,
  walletAddress: 'abLocv1pacKFJk9QgSmzk2LJWn14JGmTKzReFLz1RgY3K9Ryn7783RDT2TretzfYdck5GMCGzXTuwKfePWQYViNs4avKpnUbrwfQ'
}).then((blockTemplate) => {
  // do something
})
```

#### Sample Data

```javascript
{ blocktemplate_blob:
   '0400293f62342d2b17d9bd9..........a64',
  difficulty: 51474062,
  height: 104369,
  reserved_offset: 305,
  status: 'OK' }

```

#### Output

Argument | Description | Format
-------- | ---------- | ------
blocktempate_blob | Blocktemplate with empty "hole" for nonce | string
difficulty | Difficulty of the network | int
height | Chain height of the network | int
reserved_offset | Offset reserved | int
status | Status of the network | string


### daemon.submitBlock(options)

Submits mined block.

#### Method Parameters

Argument | Mandatory | Description | Format
-------- | -------- | ------------- | -----
block_blob | Yes | Block bloc data from minerk | string

#### Example Code

```javascript
daemon.submitBlock({
  blockBlob: '...'
}).then((result) => {
  // do something
})
```

#### Sample Data

```javascript
{
  "status": "OK"
}
```

#### Output

Argument         | Description          | Format
---------------- | -------------------- | ------
status           | Status of request | string


### daemon.getLastBlockHeader()

No input

#### Example Code

```javascript
daemon.getLastBlockHeader().then((result) => {
  // do something
})
```

#### Sample Data

```javascript
{
  "block_header": {
    "block_size": 419,
    "depth": 0,
    "difficulty": 200671816,
    "hash": "7d6db7b77232d41c19d898e81c85ecf08c4e8dfa3434f975a319f6261a695739",
    "height": 502345,
    "major_version": 4,
    "minor_version": 0,
    "nonce": 130876,
    "num_txes": 1,
    "orphan_status": false,
    "prev_hash": "5af657331edff98791720c23aacf72e8b6247ddba2a5c42c93984a46946abd14",
    "reward": 2935955,
    "timestamp": 1527907348
  },
  "status": "OK"
}
```

#### Output

Argument | Description | Format
------- | ---------- | --------
block_size | size of the block | int
depth | height away from the known top block | int
difficulty | difficulty of the last block | int
hash | hash of the last block | string
height | height of the last block | int
major_version | - | int
minor_version | - | int
nonce | - | int
num_txs | Number of transactions in the block | int
orphan_status | whether the last block was an orphan or not | bool
prev_hash | hash of the previous block | string
reward | reward of the block | str
timestamp | the time at which the block is occured on chain since Unix epoch | int
status | status of the request | string


### daemon.getBlockHeaderByHash(options)

Returns block header by given block hash

#### Input

Argument | Mandatory | Description | Format
-------- | ---------- | ----------- | -----
hash | Yes   | The block hash to find | string

#### Example Code

```javascript
daemon.getBlockHeaderByHash({
  hash: '9840215c7c13292abb7e8976a747777ea13be458ae49a88faded1d4090cfe90c'
}).then((result) => {
  // do something
})
```

#### Sample Data

```javascript

{ block_size: 2911,
  depth: 6,
  difficulty: 51474062,
  hash:
   '9840215c7c13292abb7e8976a747777ea13be458ae49a88faded1d4090cfe90c',
  height: 104369,
  major_version: 4,
  minor_version: 0,
  nonce: 1534084014,
  num_txes: 2,
  orphan_status: false,
  prev_hash:
   '293f62342d2b17d9bd9ab9450e74998600b2c401b42b3e94b689c495c4c49f64',
  reward: 204160,
  timestamp: 1540811301 }

```

#### Output

Argument | Description | Format
------- | ---------- | --------
block_size | size of the block | int
depth | height away from the known top block | int
difficulty | difficulty of the requested block | int
hash | hash of the requested block | string
height | height of the requested block | int
major_version | - | int
minor_version | - | int
nonce | - | int
num_txs | Number of transactions in the block | int
orphan_status | whether the requested block was an orphan or not | bool
prev_hash | hash of the previous block | string
reward | reward of the block | str
timestamp | the time at which the block is occured on chain since Unix epoch | int
status | status of the request | string


### daemon.getBlockHeaderByHeight(options)

Returns block header by given block height

#### Input

Argument | Mandatory | Description | Format
------ | ----------- | ----------- | -----
height | Yes   | the block height to find | int

#### Example Code

```javascript
daemon.getBlockHeaderByHeight({
  height: 100000
}).then((result) => {
  // do something
})
```

#### Sample Data

```javascript

{ block_size: 2911,
  depth: 6,
  difficulty: 51474062,
  hash:
   '9840215c7c13292abb7e8976a747777ea13be458ae49a88faded1d4090cfe90c',
  height: 104369,
  major_version: 4,
  minor_version: 0,
  nonce: 1534084014,
  num_txes: 2,
  orphan_status: false,
  prev_hash:
   '293f62342d2b17d9bd9ab9450e74998600b2c401b42b3e94b689c495c4c49f64',
  reward: 204160,
  timestamp: 1540811301 }
bloc@ubuntu:~/DEV/TEST$ node daemon.getBlockHeaderByHeight
{ block_size: 3045,
  depth: 4377,
  difficulty: 36580703,
  hash:
   'e026316d0b95436a7d3d36247fc8adb5fcb342015eccc239b346a7e2fd64c262',
  height: 100000,
  major_version: 4,
  minor_version: 0,
  nonce: 12925874,
  num_txes: 2,
  orphan_status: false,
  prev_hash:
   '9d982868dcec3c1c2913fbb96b40c9b872edd79a137d0f8097d252f1a7dcf50a',
  reward: 205585,
  timestamp: 1540279968 }
```

#### Output

Argument | Description | Format
------- | ---------- | --------
block_size | size of the block | int
depth | height away from the known top block | int
difficulty | difficulty of the requested block | int
hash | hash of the requested block | string
height | height of the requested block | int
major_version | - | int
minor_version | - | int
nonce | - | int
num_txs | Number of transactions in the block | int
orphan_status | whether the requested block was an orphan or not | bool
prev_hash | hash of the previous block | string
reward | reward of the block | str
timestamp | the time at which the block is occured on chain since Unix epoch | int
status | status of the request | string


### daemon.getCurrencyId()

* Returns unique currency identifier.
* No input

#### Example Code

```javascript
daemon.getCurrencyId().then((result) => {
  // do something
})
```

#### Sample Data

```text
acd5682403287ad25d94769adb80fbcd45de591ecfd5c86d5176bb9a10ff5baa
```

#### Output

Argument | Description | Format
-------- | ----------- | ------
currency_id_blob | unique currency identifier | string


### daemon.getHeight()

* Return the height of the daemon and the network
* No input

#### Example Code

```javascript
daemon.getHeight().then((result) => {
  // do something
})
```

#### Sample Data

```javascript

{ height: 104378, network_height: 104378, status: 'OK' }

```

#### Output

Argument         | Description          | Format
---------------- | -------------------- | ------
height            | Current daemon height | int
network_height    | Current Network height | int
status           | Status of request | string


### daemon.getInfo()

* Returns information related to the network and daemon connection
* No input

#### Example Code

```javascript
daemon.getInfo().then((result) => {
  // do something
})
```

#### Sample Data

```javascript

{ alt_blocks_count: 0,
  difficulty: 49448303,
  grey_peerlist_size: 432,
  hashrate: 412069,
  height: 104378,
  incoming_connections_count: 0,
  last_known_block_index: 104376,
  major_version: 4,
  minor_version: 0,
  network_height: 104378,
  outgoing_connections_count: 8,
  start_time: 1540806518,
  status: 'OK',
  supported_height: 40500,
  synced: true,
  testnet: false,
  tx_count: 235763,
  tx_pool_size: 33,
  upgrade_heights: [ 1, 50, 100, 40500 ],
  version: '3.0.0',
  white_peerlist_size: 45 }
```

#### Output

Argument         | Description          | Format
---------------- | -------------------- | ------
alt_blocks_count | - | int
difficulty    | difficulty of the top block | int
gray_peerlist_size | - | int
hashrate | hashrate of the network | int
height | height of the daemon | int
incoming_connections_count | number of incoming connections to the daemon | int
last_known_block_index | - | int
major_version | - | int
minor_version | - | int
network_height | height of the network | int
outgoing_connections_count | number of outgoing connections from the daemon | int
start_time | - | int
status           | Status of request | string
supported_height | supported fork height | int
synced | sync status | bool
testnet | whether the daemon is on testnet or not | bool
tx_count | transaction count in the network | int
tx_pool_size | - | int
upgrade_heights | pre-determined fork heights | array
version | version of the daemon | string
white_peerlist_size | - | int


### daemon.feeInfo()

* Returns information about the fee set for the remote node
* No input

#### Example Code

```javascript
daemon.feeInfo().then((result) => {
  // do something
})
```

#### Sample Data

```javascript
{ address:
   'abLoc8oL14r8DUdzXBPwN8LPMSBJfS3BaFG96gQPhFWRNBw2g6AHpFoJyuYP7h83cPEcLYxKAgMs9L27S3tBNEHaMkR6JhDsLt5',
  amount: 5,
  status: 'OK' }

```

#### Output

Argument         | Description          | Format
---------------- | -------------------- | ------
address            | address to which the fee is paid | string
amount    | fee amount | int
status           | Status of fees for the node | string


### daemon.getTransactions()

* Returns list of missed transactions
* No input

#### Example Code

```javascript
daemon.getTransactions({
  hashes: [
    '40e830f0e97d93a33d3c1c5505fdb7baa7526f3e1122d7aadfc9f2124b637445',
    '8cdabcfdf89e67b2d7eaa861f5674db5f1f2ded1abc179dde568e7ab3d1dded1'
  ]
}).then((result) => {
  // do something
})
```

#### Sample Data

```javascript
{ missed_tx: [],
  status: 'OK',
  txs_as_hex:
   [ '010003025a01d89f0c...fdc006',
     '...9166561652b9e02' ] }
```

#### Ouput

Argument         | Description          | Format
---------------- | -------------------- | ------
missed_tx            | array of missed transactions | array
status           | Status of request | string
txs_as_hex   | array of hex values of missed transactions | array


### daemon.getPeers()

* Returns the list of peers connected to the daemon
* No input

#### Example Code

```javascript
daemon.getPeers().then((result) => {
  // do something
})
```

#### Sample Data

```javascript
{ peers:
   [ '116.72.193.145:2082',
     '197.88.72.131:2082',
     '173.254.207.154:2082',
     '85.222.5.143:2082',
     '178.128.20.108:2082',
     '139.59.73.98:2082',
     '193.33.100.27:2082' ],
  status: 'OK' }

```

#### Output

Argument         | Description          | Format
---------------- | -------------------- | ------
peers           | array of peers (peer_ip:peer_port) | array
status           | Status of request | string


## BlocService RPC API Interface

We expose all of the `bloc-service` RPC API commands via the ```BlocService``` interface. Each of the below methods are [Javascript Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises). For safety sake, **always** handle your promise catches as we do use them properly.

***Special Note:*** Any and all amounts/fees will already be in HUMAN readable units. DO NOT DIVIDE THEM AGAIN unless you've specified ```decimalDivisor``` as ```1``` in the options. You have been warned.

Unless otherwise noted, all methods will resolve the promise upon success and sample return data is supplied below. Any errors will reject the promise with an error condition.

Methods noted having options have parameters that may be *optional* or *required* as documented.

### service.reset(options)

If the viewSecretKey argument is not provided, the reset() method resets the wallet and re-syncs it. If the viewSecretKey argument is provided, the reset() method substitutes the existing wallet with a new one with the specified key.

#### Input

Argument         | Mandatory   | Description      | Format
---------------- | ----------- | ---------------- | ------
viewSecretKey    | No          | The secret Private view key to reset | string
newAddress       | No          | Is this a new address being created? If so, blocks before the creation timestamp will not be scanned. Only one of newAddress and scanHeight can be specified, as if a new address is being created, there is no need to scan from a certain height. | bool
scanHeight       | No          | The height to begin scanning for transactions at. This can greatly speed up wallet syncing time. | int

#### Example Code

```javascript
service.reset({
  viewSecretKey: '12345678901234567890'
}).then(() => {
  // do something
})
```
#### Output

No output in case of success.

<aside class="notice">
  <div>If the <code>viewSecretKey</code> argument is not provided, the <code>reset()</code> method resets the wallet and
  re-syncs it. If the <code>viewSecretKey</code> argument is provided, the <code>reset()</code> method substitutes the
  existing wallet with a new one with the specified key.</div>
</aside>

### service.save()

* ```save()``` method allows you to save your wallet by request.
* No input.
* No output in case of success.

#### Example Code

```javascript
service.save().then(() => {
  // do something
})
```

### service.getFeeInfo()

* ```getFeeInfo()``` method retrieves the fee and address (if any) that that BLOCd walletd is connecting to is using. This fee will automatically be added to any transactions sent by sendTransaction() or sendDelayedTransaction(). Note it does not apply to ```sendFusionTransaction()```
* No input

#### Example Code

```javascript
service.getFeeInfo().then((result) => {
  // do something
})
```
#### Example Data

```javascript
{ address:
   'abLoc8oL14r8DUdzXBPwN8LPMSBJfS3BaFG96gQPhFWRNBw2g6AHpFoJyuYP7h83cPEcLYxKAgMs9L27S3tBNEHaMkR6JhDsLt5',
  amount: 5 }
```
#### Output

Argument              | Description                         | Format
--------------------- | ----------------------------------- | ------
address               | The address of the node owner 		| string
amount                | The fee that will be sent to the node owners address with each transaction | int


### service.getViewKey()

* ```getViewKey()``` method returns your view key
* No input

#### Example Code

```javascript
service.getViewKey().then((result) => {
  // do something
})
```

#### Example Data

```javascript
{ viewSecretKey:
   'e0b250f7d56f9b7a4ac9b57e9c716dea731b59a7b3d06f51eacd9f5d0340630c' }

```
#### Output
Argument         | Description      | Format
---------------- | ---------------- | ------
viewSecretKey    | Private view key | string


### service.getSpendKeys(options)

* ```getSpendKeys()``` method returns your spend keys.

#### Input

Argument         | Mandatory    | Description                                  | Format
---------------- | ------------ | -------------------------------------------- | -------
address          | Yes          | Valid address that exists in this container  | string


#### Example Code

```javascript
service.getSpendKeys({
  address: 'abLocBQXi3AhcUgmc9pBcD8sdfjsqCMXNZCfuKsReWbTVZxFgZ9J6C4JY2TR7HMSYB5VaP8KaG4LghfXMzbqBQhMJki4cuKSEG6'
}).then((result) => {
  // do something
})
```

#### Example Data

```javascript
{ spendPublicKey:
   'f7ff3961f2cd25f107800b9a2f11c4a165fe4329c084bd3753a755eaaacc3cd3',
  spendSecretKey:
   'f9f55b215c5cfcb7a52470c2745038130ba9099b0e35340ce6efdcb6f6e3c00d' }

```
### Output

Argument          | Description          | Format
----------------  | -------------------- | ------
spendSecretKey    | Private spend key    | string
spendPublicKey    | Public spend key     | string


### service.getMnemonicSeed(options)

```getMnemonicSeed()``` method returns the mnemonic seed for the given deterministic address. A mnemonic seed is a list of words which can be used to recover a wallet.

#### Input

Argument         | Mandatory    | Description                                  | Format
---------------- | ------------ | -------------------------------------------- | -------
address          | Yes          | Valid deterministic address that exists in this container | string

#### Example Code

```javascript
service.getMnemonicSeed({
  address: 'abLocAR4dJi14yKV7ixsMMhW77HZt8c6HCYM5qdJDnwkDQByQwbBbPAYZuE4QGJVYfRc1TPmysMAuioPFuanAumEQoKCgBaK6xg'
}).then((result) => {
  // do something
})
```

#### Example Data

```text
dads vehicle fiat fountain repent radar aspire orbit awesome trolling guide drinks kickoff heron husband tutor onward legion nail yahoo arena were melting necklace vehicle
```

#### Output

Argument          | Description          | Format
----------------  | -------------------- | ------
mnemonicSeed      | Mnemonic seed        | string


<aside class="notice">
  <div>The first wallet address that is generated when the container is created is the deterministic address. Only one wallet from a multi-wallet container can be deterministic. If a non-deterministic address is given, the RPC response will be an error with the message: "Keys not deterministic."</div>
</aside>


### service.getStatus()

* ```service.getStatus()``` method returns information about the current RPC Wallet state: block count, known block count, last block hash and peer count.
* No input

#### Example Code

```javascript
service.getStatus().then((result) => {
  // do something
})
```

#### Example Data

```javascript
{
{ blockCount: 104557,
  knownBlockCount: 104557,
  lastBlockHash:
   '7f717ceca1875e51419a7a07a7d985310805e0b089b0fc87fbbcfe93010a755a',
  peerCount: 8 }
}
```

#### Output

Argument         | Description                                                                | Format
---------------- | -------------------------------------------------------------------------- | ------
blockCount       | Node's known number of blocks                                              | int
knownBlockCount  | Maximum known number of blocks of all seeds that are connected to the node | int
lastBlockHash    | Hash of the last known block                                               | string
peerCount        | Connected peers number	                                                    | int	 


### service.getAddresses()

* ```getAddresses()``` method returns an array of your RPC Wallet's addresses.
* No input

#### Example Code

```javascript
service.getAddresses().then((result) => {
  // do something
})
```

#### Example Data

```javascript
[ 'abLocAR4dJi14yKV7ixsMMhW77HZt8c6HCYM5qdJDnwkDQByQwbBbPAYZuE4QGJVYfRc1TPmysMAuioPFuanAumEQoKCgBaK6xg',
  'abLoc8YamWu4XUKddV9NZ4fk3WCqzL2XCPQh9yB7Pd88UDpmSCiZsdWYZuE4QGJVYfRc1TPmysMAuioPFuanAumEQoKCgC9fRqa' ]
```

**Output**

Argument          | Description                                           | Format
----------------- | ----------------------------------------------------- | ------
addresses	        | Array of strings, where each string is an address	    | array


### service.createAddress(options)

```createAddress()``` method creates an additional address in your wallet.

#### Input

Argument                 | Mandatory    | Description                                  | Format
------------------------ | ------------ | -------------------------------------------- | -------
secretSpendKey           | No           | Private spend key. If `secretSpendKey` was specified, RPC Wallet creates spend address | string
publicSpendKey           | No           | Public spend key. If `publicSpendKey` was specified, RPC Wallet creates view address   | string
newAddress               | No           | Is this a new address being created? If so, blocks before the creation timestamp will not be scanned. Defaults to true if neither keys are given, as it is guaranteed to be a new address. | bool
scanHeight               | No           | The height to begin scanning for transactions at. Only applies if a public/secret key is supplied. This can greatly speed up wallet syncing time. | int

**Note:** Both ```secretSpendKey``` and ```publicSpendKey``` are optional; however, you can only supply one or the other. Both are given below as **examples**.

#### Example Code

```javascript
service.createAddress({
  secretSpendKey: 'f4abd8dfc3ffea2c96b131c22340d4b437b9722407769c9449f24d1a8bad0c0e',
  publicSpendKey: 'db20e68b00e69ba85d161af5378ab04551e0c10f23d1df6ea29da58ddc527b2e'
}).then((result) => {
  // do something
})
```

#### Example Data

```javascript
{
  "address": "abLocAiXVFeaF9JWodjvHrPYakpxf1Bfg1yoM11ydPBaNq4AXw5kbeUYZuE4QGJVYfRc1TPmysMAuioPFuanAumEQoKCgB2VtRs"
}
```

**Output**

Argument          | Description                                           | Format
----------------- | ----------------------------------------------------- | ------
addresse	        | Array of string view, each string is an address	      | array


### service.deleteAddress(options)

```deleteAddress()``` method deletes a specified address.

#### Input

Argument         | Mandatory    | Description                                  | Format
---------------- | ------------ | -------------------------------------------- | -------
address          | Yes          | An address to be deleted                     | string

#### Example Code

```javascript
service.deleteAddress({
  address: 'abLocv1pacKFJk9QgSmzk2LJWn14JGmTKzReFLz1RgY3K9Ryn7783RDT2TretzfYdck5GMCGzXTuwKfePWQYViNs4avKpnUbrwfQ'
}).then((result) => {
  // do something
})
```

#### Output

In case of success returns an empty JSON object.


### service.getBalance(options)

```getBalance()``` method returns a balance for a specified address.

#### Input

Argument         | Mandatory    | Description                                          | Format
---------------- | ------------ | ---------------------------------------------------- | -------
address          | No           | Valid address that exists in this container          | string

#### Example Code

```javascript
service.getBalance({
  address: 'abLocAR4dJi14yKV7ixsMMhW77HZt8c6HCYM5qdJDnwkDQByQwbBbPAYZuE4QGJVYfRc1TPmysMAuioPFuanAumEQoKCgBaK6xg'
}).then((result) => {
  // do something
})
```

#### Example Data

```javascript
{
  "availableBalance": 1.0000,
  "lockedAmount": 0
}
```

#### Output

Argument              | Description                                           | Format
--------------------- | ----------------------------------------------------- | ------
availableBalance      | Available balance of the specified address in shells  | integer
lockedAmount          | Locked amount of the specified address in shells      | integer

<aside class="notice">
  <div>If address is not specified, <code>getBalance()</code> returns a cumulative balance of all RPC Wallet's addresses.
  Also note, balances are expressed in shells, so a balance of 10000 is equal to 100.00 abLoc.</div>
</aside>


### service.getBlockHashes(options)

```getBlockHashes()``` method returns an array of block hashes for a specified block range.

#### Input

Argument         | Mandatory    | Description                                     | Format
---------------- | ------------ | ----------------------------------------------- | -------
firstBlockIndex  | Yes          | Starting height	                                | integer
blockCount       | Yes          | Number of blocks to process		                  | integer

#### Example Code

```javascript
service.getBlockHashes({
  firstBlockIndex: 100000,
  blockCount: 10
}).then((result) => {
  // do something
})
```

#### Example Data

```javascript
{ blockHashes:
   [ 'e026316d0b95436a7d3d36247fc8adb5fcb342015eccc239b346a7e2fd64c262',
     'd73f01f1417386243bd14854acd75817c853aee1b42bb805498a59b19f7c9b90',
     'e538987e328c9166d88b60c3f78763bf14ec08a619179d96b8154712e6306f4f',
     'f128754b54cbf1a93cd4e743f9ba0a44a8a8e00c614324145cb80b36f5349200',
     '7ff0a7a78aeb01e7bd9b835642218d25dd153b001c1658b9869efdcd5d01cb6b',
     '26238a80a7c52c8930b89053460e60a599e89d293cbea5f680911ecb2d000ade',
     '56cf58de9e0d22c83c4bed757bdb56a35ad38364e5380ce3edbfb83dfc268e81',
     '7661d773cd5ffc56a3e6e3deb377c8e0be5f46e9403d1000adb6055fd4ac5343',
     'f7904821432dfdbb127419d885d292b56e9853e11468d9fa0e59c5906bf5db52',
     'bd3dd101b769fc8b04949f9663c5bef3fa0578848c924281bc7487eb50b68c49' ] }

```

#### Ouput

Argument              | Description                                             | Format
--------------------- | ------------------------------------------------------- | ------
blockHashes		      | Array of strings, where each element is a block hash	| array


### service.getTransactionHashes(options)

* ```getTransactionHashes()``` method returns an array of block and transaction hashes.
* A transaction consists of transfers. A transfer is an amount-address pair.
* There could be several transfers in a single transaction.

#### Input

Argument        | Mandatory                                                                       | Description                                             | Format
--------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------- | -------
addresses       | No                                                                              | Array of strings, where each string is an address		    | array
blockHash       | No. Only one of these parameters (`blockHash` or `firstBlockIndex`) is allowed. | Hash of the starting block		                          | string
firstBlockIndex | No. Only one of these parameters (`blockHash` or `firstBlockIndex`) is allowed. | Starting height >0 (1,2,3...)		                        | integer
blockCount      | Yes                                                                             | Number of blocks to return transaction hashes from		  | integer
paymentId       | No. 64 characters                                                               | Valid payment ID		                                    | string


* If `paymentId` parameter is set, `getTransactionHashes()` method returns transaction hashes of transactions that contain specified payment ID in the given block range.
* If `addresses` parameter is set, `getTransactionHashes()` method returns transaction hashes of transactions that contain transfer from at least one of specified addresses.
* If both above mentioned parameters are set, `getTransactionHashes()` method returns transaction hashes of transactions that contain both specified payment ID and transfer from at least one of specified addresses.
* Only **one** of either ```blockHash``` or ```firstBlockIndex``` may be supplied, but not both.

#### Example Code

```javascript
service.getTransactionHashes({
  addresses: [
    "abLocAR4dJi14yKV7ixsMMhW77HZt8c6HCYM5qdJDnwkDQByQwbBbPAYZuE4QGJVYfRc1TPmysMAuioPFuanAumEQoKCgBaK6xg",
    "abLoc8YamWu4XUKddV9NZ4fk3WCqzL2XCPQh9yB7Pd88UDpmSCiZsdWYZuE4QGJVYfRc1TPmysMAuioPFuanAumEQoKCgC9fRqa"
  ],
  blockHash: '5339e77b028a29ace5cfb2d94c1fe869dd810aed3a9d7e1280aa192311e427e5',
  blockCount: 1
}).then((result) => {
  // do something
})
```

#### Example Data

```javascript
[ { blockHash:
     'd537de1cd0492c67b49cbbe569c91a4f564bdd16dc4dc19c0f09172ee82da23c',
    transactionHashes:
     [ '6a7028e29b5796a31d2cbe5aeb5931694fe15caf0639c26045c9ac8103130a44' ] } ]
```

#### Output

Argument   | Description                                         |                                                              |            |                                       
---------- | --------------------------------------------------- | ------------------------------------------------------------ | ---------- |
items	     | **Array of**                                        |	                                                            |            |                                                                 
    	     | **Attribute**            	                         | **Description**                                              | **Format** |                                        
           | blockHash                                           | Hash of the block which contains transaction hashes          | string     |
           | transactionHashes                                   | Array of strings, where each string is a transaction hash    | array      |



### service.getTransactions(options)

* ```getTransactions()``` method returns an array of block and transaction hashes.
* A transaction consists of transfers. A transfer is an amount-address pair.
* There could be several transfers in a single transaction.

#### Input

Argument        | Mandatory                                                                       | Description                                             | Format
--------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------- | -------
addresses       | No                                                                              | Array of strings, where each string is an address		    | array
blockHash       | No. Only one of these parameters (`blockHash` or `firstBlockIndex`) is allowed. | Hash of the starting block		                          | string
firstBlockIndex | No. Only one of these parameters (`blockHash` or `firstBlockIndex`) is allowed. | Starting height >0 (1,2,3...)		                        | integer
blockCount      | Yes                                                                             | Number of blocks to return transaction hashes from		  | integer
paymentId       | No. 64 characters                                                               | Valid payment ID		                                    | string


* If `paymentId` parameter is set, `getTransactions()` method returns transactions that contain specified payment ID in the given block range.
* If `addresses` parameter is set, `getTransactions()` method returns transactions that contain transfer from at least one of specified addresses.
* If both above mentioned parameters are set, `getTransactions()` method returns transactions that contain both specified payment ID and transfer from at least one of specified addresses.
* Only **one** of either ```blockHash``` or ```firstBlockIndex``` may be supplied, but not both.

#### Example Code

```javascript
service.getTransactions({
  addresses: [
    "abLocAR4dJi14yKV7ixsMMhW77HZt8c6HCYM5qdJDnwkDQByQwbBbPAYZuE4QGJVYfRc1TPmysMAuioPFuanAumEQoKCgBaK6xg",
    "abLoc8YamWu4XUKddV9NZ4fk3WCqzL2XCPQh9yB7Pd88UDpmSCiZsdWYZuE4QGJVYfRc1TPmysMAuioPFuanAumEQoKCgC9fRqa"
  ],
  firstBlockIndex: 104570,
  blockCount: 5
}).then((result) => {
  // do something
})
```

#### Example Data

```javascript
[ { blockHash:
     'd537de1cd0492c67b49cbbe569c91a4f564bdd16dc4dc19c0f09172ee82da23c',
    transactionAmount: 0.0005,
    blockIndex: 104572,
    extra:
     '01800383a3084f99580038e74d2a02cdc104384ec7bc95243753595c10bf03e784',
    fee: 0.0001,
    isBase: false,
    paymentId: '',
    state: 0,
    timestamp: 1540835452,
    transactionHash:
     '6a7028e29b5796a31d2cbe5aeb5931694fe15caf0639c26045c9ac8103130a44',
    address:
     'abLocAR4dJi14yKV7ixsMMhW77HZt8c6HCYM5qdJDnwkDQByQwbBbPAYZuE4QGJVYfRc1TPmysMAuioPFuanAumEQoKCgBaK6xg',
    amount: 0.0005,
    type: 0,
    inbound: true,
    unlockTime: 0 } ]
```

#### Output

Argument   |                              | Description                                       | Format
---------- | ---------------------------- | --------------------------------------------------|-----------
items	     | **Array of**                 |                                                   |
    	     | block_hash                   | hash of the block which contains a transaction    | string
    	     | transactions                 | see below                                         | array

#### Transaction attributes

Argument            | Description                                                                   | Format
------------------- | ------------------------------------------------------------------------------|-----------
transactionHash     | Hash of the transaction                                                       | string
blockIndex          | Number of the block that contains a transaction                               | int
timestamp           | Timestamp of the transaction                                                  | int
isBase              | Shows if the transaction is a CoinBase transaction or not                     | boolean
unlockTime          | Height of the block when transaction is going to be available for spending    | int
amount              | Amount of the transaction                                                     | int
fee                 | Transaction fee                                                               | int
extra               | Hash of the  transaction                                                      | string
paymentId           | Payment ID of the transaction (optional)                                      | string
transfers           | Array of address (string), amount (int)                                       | array


### service.getUnconfirmedTransactionHashes(options)

* ```getUnconfirmedTransactionHashes()``` method returns information about the current unconfirmed transaction pool or for a specified addresses.
* Transaction consists of transfers. Transfer is an amount-address pair.
* There could be several transfers in a single transaction.

#### Input

Argument    | Mandatory     | Description                                                | Format
----------- | ------------- | ---------------------------------------------------------- | -------
addresses   | No            | Array of strings, where each string is a valid address     | array

<aside class="notice">
  <div>If addresses parameter is set, transactions that contain transfer from at least one of specified addresses are returned.</div>
</aside>


#### Example Code

```javascript
service.getUnconfirmedTransactionHashes({
  address: 'abLocAR4dJi14yKV7ixsMMhW77HZt8c6HCYM5qdJDnwkDQByQwbBbPAYZuE4QGJVYfRc1TPmysMAuioPFuanAumEQoKCgBaK6xg'
}).then((result) => {
  // do something
})
```

#### Example Data

```javascript
{ transactionHashes:
   [ 'f731190b013ac313d6cf2edba86e1e1fe1f0220c2bb59b80d817b0957f0d0e4d' ] }
```

#### Output

Argument               | Description                                                                    | Format
---------------------- | ------------------------------------------------------------------------------ | ------
transactionHashes      | Array of strings, where each string is a hash of an unconfirmed transaction	| array


### service.getTransaction(options)

* ```getTransaction()``` method returns information about a particular transaction.
* Transaction consists of transfers. Transfer is an amount-address pair.
* There could be several transfers in a single transaction.

***Special Note:*** Any and all amounts/fees will already be in HUMAN readable units. DO NOT DIVIDE AMOUNTS AGAIN unless you've specified ```decimalDivisor``` as ```1``` in the options. You have been warned.

#### Input

Argument            | Mandatory     | Description                                                | Format
------------------- | ------------- | ---------------------------------------------------------- | -------
transactionHash     | Yes           | Hash of the requested transaction                          | string


#### Example Code

```javascript
service.getTransaction({
  transactionHash: 'f731190b013ac313d6cf2edba86e1e1fe1f0220c2bb59b80d817b0957f0d0e4d'
}).then((result) => {
  // do something
})
```

#### Example Data

```javascript
{ amount: 0.0002,
  blockIndex: 104587,
  extra:
   '01f773f10b35cbee8a509ff5405075d34666086714a645386492f3ce9f58439db0',
  fee: 0.0001,
  isBase: false,
  paymentId: '',
  state: 0,
  timestamp: 1540837816,
  transactionHash:
   'f731190b013ac313d6cf2edba86e1e1fe1f0220c2bb59b80d817b0957f0d0e4d',
  transfers:
   [ { address:
        'abLocAR4dJi14yKV7ixsMMhW77HZt8c6HCYM5qdJDnwkDQByQwbBbPAYZuE4QGJVYfRc1TPmysMAuioPFuanAumEQoKCgBaK6xg',
       amount: 0.0002,
       type: 0 },
     { address: '', amount: -0.09, type: 0 },
     { address: '', amount: 0.0897, type: 0 } ],
  unlockTime: 0 }
```

#### Output

Argument   | Description
---------- | ------------
transaction| see below

Transaction attributes:

Argument            | Description                                                                   | Format
------------------- | ------------------------------------------------------------------------------|-------
transactionHash     | Hash of the transaction                                                       | string
blockIndex          | Number of the block that contains a transaction                               | int
timestamp           | Timestamp of the transaction                                                  | int
isBase              | Shows if the transaction is a CoinBase transaction or not                     | boolean
unlockTime          | Height of the block when transaction is going to be available for spending    | int
amount              | Amount of the transaction                                                     | int
fee                 | Transaction fee                                                               | int
extra               | Hash of the  transaction                                                      | string
paymentId           | Payment ID of the transaction (optional)                                      | string
transfers           | Array of addresses (string), amount (int)                                     | array


### service.newTransfer(address, amount)

This method creates a transfer object designed to be used with *service.sendTransaction*

***Note: This method does NOT return a promise.***

***Special Note:*** Any and all amounts/fees will already be in HUMAN readable units. DO NOT SUPPLY NATIVE CURRENCY AMOUNTS unless you've specified ```decimalDivisor``` as ```1``` in the options. You have been warned.

#### Example Code

```javascript
var transfer = service.newTransfer('abLocv1pacKFJk9QgSmzk2LJWn14JGmTKzReFLz1RgY3K9Ryn7783RDT2TretzfYdck5GMCGzXTuwKfePWQYViNs4avKpnUbrwfQ', 1000000)
```

### service.sendTransaction(options)

```sendTransaction()``` method allows you to send transaction(s) to one or several addresses. Also, it allows you to use a payment ID for a transaction to a single address.

***Special Note:*** Any and all amounts/fees will already be in HUMAN readable units. DO NOT SUPPLY NATIVE CURRENCY AMOUNTS unless you've specified ```decimalDivisor``` as ```1``` in the options. You have been warned.

#### Input

Argument        | Mandatory     | Description                                                                              | Format
--------------- | ------------- | ---------------------------------------------------------------------------------------- | -------
addresses       | No            | Array of strings, where each string is an address to take the funds from                 | array
transfers       | Yes           | Array of objects, address: (string address), amount: (int amount)                        | array
fee             | Yes           | Transaction fee. Minimal fee in BLOC network is 0.0001 BLOC. As with other amounts use whole units, 1 BLOC = 1000 units, so 0.0001 BLOC = 1 unit | integer
unlockTime      | No            | The block height at which the transaction will be unlocked for spending.                 | integer
anonymity       | Yes           | Privacy (mixin) (level from 0 to 10)                                                     | integer
extra           | No            | String of variable length. Can contain A-Z, 0-9 characters.                              | string
paymentId       | No            | Payment ID (64 hex characters)                                                           | string
changeAddress   | No            | Where to send any change from the transaction. If not specified, the first address in the wallet container is used.                          | string

* If container contains only 1 address, `changeAddress` field can be left empty and the change is going to be sent to this address.
* If addresses field contains only 1 address, `changeAddress` can be left empty and the change is going to be sent to this address.
* In the rest of the cases, `changeAddress` field is mandatory and must contain an address.

#### Example Code

```javascript
service.sendTransaction({
addresses: 'abLocAiXVFeaF9JWodjvHrPYakpxf1Bfg1yoM11ydPBaNq4AXw5kbeUYZuE4QGJVYfRc1TPmysMAuioPFuanAumEQoKCgB2VtRs',
  transfers: [
    service.newTransfer('abLoc9vG2prXqhQi4YiAggPUPQ4wr8PiWR16wKS4xGHQE99pBeXpM91ewSF8AsD6ETTFXDY5JEcMo2A1Y2bHqfMi8uA6zM9YAhb', 1)
  ],
  fee: 1,
  mixin: 0,
  changeAddress: 'abLocAiXVFeaF9JWodjvHrPYakpxf1Bfg1yoM11ydPBaNq4AXw5kbeUYZuE4QGJVYfRc1TPmysMAuioPFuanAumEQoKCgB2VtRs',
}).then((result) => {
  // do something
})
```

#### Example Data

```javascript
{
  "transactionHash": "0f3543118e5bc1e806ef28550f2199b653f25c913d5923bd635b95bc0020b747"
}
```

#### Output

Argument              | Description                         | Format
--------------------- | ----------------------------------- | ------
transactionHash	      | Hash of the sent transaction    		| string


### service.createDelayedTransaction(options)

```createDelayedTransaction()``` method creates a delayed transaction. Such transactions are not sent into the network automatically and should be pushed using `sendDelayedTransaction` method.

***Special Note:*** Any and all amounts/fees will already be in HUMAN readable units. DO NOT SUPPLY NATIVE CURRENCY AMOUNTS unless you've specified ```decimalDivisor``` as ```1``` in the options. You have been warned.

#### Input

Argument        | Mandatory     | Description                                                                              | Format
--------------- | ------------- | ---------------------------------------------------------------------------------------- | -------
addresses       | No            | Array of strings, where each string is an address to take the funds from                 | array
transfers       | Yes           | Array of objects, address: (string address), amount: (int amount)                        | array
fee             | Yes           | Transaction fee. Minimal fee in BLOC network is 0.0001 BLOC. As with other amounts use whole units, 1 BLOC = 1000 units, so 0.0001 BLOC = 1 unit | integer
unlockTime      | No            | The block height at which the transaction will be unlocked for spending.                 | integer
anonymity       | Yes           | Privacy (mixin) (level from 0 to 10)                                                     | integer
extra           | No            | String of variable length. Can contain A-Z, 0-9 characters.                              | string
paymentId       | No            | Payment ID (64 hex characters)                                                           | string
changeAddress   | No            | Where to send any change from the transaction. If not specified, the first address in the wallet container is used.                          | string

* If container contains only 1 address, `changeAddress` field can be left empty and the change is going to be sent to this address
* If addresses field contains only 1 address, `changeAddress` can be left empty and the change is going to be sent to this address
* In the rest of the cases, `changeAddress` field is mandatory and must contain an address.
* Outputs that were used for this transactions will be locked until the transaction is sent or cancelled

#### Example Code

```javascript
service.createDelayedTransaction({
  transfers: [
    service.newTransfer('abLocv1pacKFJk9QgSmzk2LJWn14JGmTKzReFLz1RgY3K9Ryn7783RDT2TretzfYdck5GMCGzXTuwKfePWQYViNs4avKpnUbrwfQ', 1000000)
  ],
  fee: 1,
  mixin: 7,
}).then((result) => {
  // do something
})
```

#### Example Data

```javascript
{
  "transactionHash": "93faedc8b8a80a084a02dfeffd163934746c2163f23a1b6022b32423ec9ae08f"
}
```

### service.getDelayedTransactionHashes()

#### Example Code

```javascript
service.getDelayedTransactionHashes().then((result) => {
  // do something
})
```

#### Example Data

```javascript
{
  "transactionHashes": [
    "957dcbf54f327846ea0c7a16b2ae8c24ba3fa8305cc3bbc6424e85e7d358b44b",
    "25bb751814dd39bf46c972bd760e7516e34200f5e5dd02fda696671e11201f78"
  ]
}
```

### service.deleteDelayedTransaction(options)

#### Method Parameters

|Argument|Mandatory|Description|Format|
|---|---|---|---|
|transactionHash|Yes|The hash of the transaction|string|

#### Example Code

```javascript
service.deleteDelayedTransaction({
  transactionHash: 'd01e448f7b631cebd989e3a150258b0da59c66f96adecec392bbf61814310751'
}).then((result) => {
  // do something
})
```

### service.sendDelayedTransaction()

#### Method Parameters

|Argument|Mandatory|Description|Format|
|---|---|---|---|
|transactionHash|Yes|The hash of the transaction|string|

#### Example Code

```javascript
service.sendDelayedTransaction({
  transactionHash: 'd01e448f7b631cebd989e3a150258b0da59c66f96adecec392bbf61814310751'
}).then((result) => {
  // do something
})
```

### service.sendFusionTransaction(options)

#### Method Parameters

|Argument|Mandatory|Description|Format|
|---|---|---|---|
|threshold|No|The minimum fusion threshold amount|integer|
|mixin|No|The number of mixins to use|integer|
|addresses|No|Array of public wallet addresses|strings|
|destinationAddress|No|The address to send the fusion transaction to|string|

***Note:*** If the container has only one address or ```addressess``` consists of one address, then ```destinationAddress``` need not be supplied. Otherwise, ```destinationAddress``` is required.

#### Example Code

```javascript
service.sendFusionTransaction({
  mixin: 7,
  destinationAddress: 'abLocv1pacKFJk9QgSmzk2LJWn14JGmTKzReFLz1RgY3K9Ryn7783RDT2TretzfYdck5GMCGzXTuwKfePWQYViNs4avKpnUbrwfQ'
}).then((result) => {
  // do something
})
```

#### Example Data

```javascript
{
  "transactionHash": "93faedc8b8a80a084a02dfeffd163934746c2163f23a1b6022b32423ec9ae08f"
}
```

### service.estimateFusion(options)

#### Method Parameters

|Argument|Mandatory|Description|Format|
|---|---|---|---|
|threshold|No|The minimum fusion threshold amount|integer|
|addresses|No|Array of public wallet addresses|strings|

#### Example Code

```javascript
service.estimateFusion({
  threshold: 1,
  addresses:[
    'abLocv1pacKFJk9QgSmzk2LJWn14JGmTKzReFLz1RgY3K9Ryn7783RDT2TretzfYdck5GMCGzXTuwKfePWQYViNs4avKpnUbrwfQ'
  ]
}).then((result) => {
  // do something
})
```

#### Example Data

```javascript
{
  "fusionReadyCount": 0,
  "totalOutputCount": 19
}
```

### service.createIntegratedAddress(options)

#### Method Parameters

|Argument|Mandatory|Description|Format|
|---|---|---|---|
|address|Yes|The public wallet address|string|
|paymentId|Yes|The paymentId to incorporate|string|

#### Example Code

```javascript
service.createIntegratedAddress({
  address: 'abLocv1pacKFJk9QgSmzk2LJWn14JGmTKzReFLz1RgY3K9Ryn7783RDT2TretzfYdck5GMCGzXTuwKfePWQYViNs4avKpnUbrwfQ',
  paymentId: '80ec855eef7df4bce718442cabe086f19dfdd0d03907c7768eddb8eca8c5a667'
}).then((result) => {
  // do something
})
```

#### Example Data

```javascript
abLocTyPSXMZB5j2wbztMzRXu2rVCuNVLUb4WKARRZY9ficYWshMDy7p4MXEz24mkyb4KFDVksDj41XTJ4DC3c7P2SfRg3r5q1ve9x7x5tK

```

## Client RPC API Interface

We expose all of the `BLOCd` Client RPC API commands via the ```Client``` interface. Each of the below methods are [Javascript Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises). For safety sake, **always** handle your promise catches as we do use them properly.

Methods noted having options have parameters that may be *optional* or *required* as documented.

### client.getBlocks(options)

*Not implemented*

### client.queryBlocks(options)

*Not implemented*

### client.queryBlocksLite(options)

Retrieves the last 100 (as defined in ) blocks from the first block hash supplied in the requested array.

#### Method Parameters

|Argument|Mandatory|Description|Format|
|---|---|---|---|
|blockHashes|Yes|The block hashes to query|strings|
|timestamp|No|The timestamp to query|integer|

#### Example Code

```javascript
client.queryBlocksLite({
  blockHashes: [
    'fce539a608a406354522d24a43d5d47c85939bc8af961cf1146d09e5028adfa2'
  ]
}).then((result) => {
  // do something
})
```

#### Example Data

***Note:*** Example data has been heavily truncated for display below.

```javascript
{ currentHeight: 104638,
  fullOffset: 104630,
  items:
   [ { 'blockShortInfo.block': [Array],
       'blockShortInfo.blockId':
        'fce539a608a406354522d24a43d5d47c85939bc8af961cf1146d09e5028adfa2',
       'blockShortInfo.txPrefixes': [Array] },
     { 'blockShortInfo.block': [Array],
       'blockShortInfo.blockId':
        'f8509ed5c6ead358722feafcb175cc986cd8b378f4281a103fd65fae7fd63ec0',
       'blockShortInfo.txPrefixes': [Array] },
     { 'blockShortInfo.block': [Array],
       'blockShortInfo.blockId':
        'f0e57aa84c5d097ee6697a4baba220c15037ea647d3418f8e31d5d4c5b07c47a',
       'blockShortInfo.txPrefixes': [] },
     { 'blockShortInfo.block': [Array],
       'blockShortInfo.blockId':
        'f0e8c895acd1f6ea48e6110d928308a1faab5137f64f1c11e091f0b8c2349585',
       'blockShortInfo.txPrefixes': [] },
     { 'blockShortInfo.block': [Array],
       'blockShortInfo.blockId':
        '828ce2138fe9f77e9b884a4310b2db4de58c21f67a4cce79adbe1db9023aa78d',
       'blockShortInfo.txPrefixes': [Array] },
     { 'blockShortInfo.block': [Array],
       'blockShortInfo.blockId':
        '03861676a32ce8d9a42efc0001e9af74f6b583fcde4620ae28a4fce05fd51af5',
       'blockShortInfo.txPrefixes': [] },
     { 'blockShortInfo.block': [Array],
       'blockShortInfo.blockId':
        '4e99248db2db0c473f54a96f76cba67de2d0f814ca8a324c806c1c285f3b8ac8',
       'blockShortInfo.txPrefixes': [] },
     { 'blockShortInfo.block': [Array],
       'blockShortInfo.blockId':
        'fb2fc7a2b5adef0bf5393ba9333fb09361feab8633991a4213c99ab4588c4eff',
       'blockShortInfo.txPrefixes': [] },
     { 'blockShortInfo.block': [Array],
       'blockShortInfo.blockId':
        'da6704e111e9cc07945750daa5e7113b523bd7bfa28a7932a3d25b916f3a3205',
       'blockShortInfo.txPrefixes': [] } ],
  startHeight: 104630,
  status: 'OK' }

```

### client.getIndexes(options)

Returns the output indexes of the transaction

#### Input

|Argument|Mandatory|Description|Format|
|---|---|---|---|
|transactionHash|Yes|The transaction hash|string|

#### Example Code

```javascript
client.getIndexes({
  transactionHash: "8612573de869bdc8f8f2217426a273d023b08644b02a9aba076d5b4863ea74f5"
}).then((result) => {
  // do something
})
```

#### Example Data

```javascript
{ o_indexes: [ 21035 ], status: 'OK' }
```

### client.getRandomOutputs(options)

#### Method Parameters

|Argument|Mandatory|Description|Format|
|---|---|---|---|
|amounts|Yes|The amounts for mixin in atomic units|integers|
|mixin|Yes|The number of mixins to return for each amount|integer|

#### Example Code

```javascript
client.getRandomOutputs({
  amounts: [
    1,
    100
  ],
  mixin: 0
}).then((result) => {
  // do something
})
```

#### Example Data

```javascript
{ outs: [ { amount: 1, outs: [] }, { amount: 100, outs: [] } ],
  status: 'OK' }
```

### client.getPoolChanges(options)

Returns updates regarding the transaction mempool.

#### Method Parameters

|Argument|Mandatory|Description|Format|
|---|---|---|---|
|tailBlockHash|Yes|The last known block ID|string|
|knownTransactionHashes|Yes|The transaction hashes that we of|strings|

#### Example Code

```javascript
client.getPoolChanges({
  tailBlockHash: "410a8e6166a4582d592143c2a9bb062f6601712a7b7a99c0de71eebeb01d6521",
  knownTransactionHashes: []
}).then((result) => {
  // do something
})
```

***Note:*** Example data has been heavily truncated for display below.

#### Example Data

```javascript
{
  "addedTxs": [
    {
      "transactionPrefixInfo.txHash": "80060286cc4b46778e60a8b26a869719546c7c8b06de7ee16c01edc3e2774040",
      "transactionPrefixInfo.txPrefix": {
        "extra": "0122ee5a333e0bf7b7c8501a968a5ce1415f3b37c4312a779f2d704298a2ad3f12",
        "unlock_time": 0,
        "version": 1,
        "vin": [
          {
            "type": "02",
            "value": {
              "amount": 900000,
              "k_image": "d527587f9be05bd228f075b00965087597754be3a3953b15389a1965c0db390f",
              "key_offsets": [
                686585,
                386,
                1,
                1,
                1,
                1,
                1,
                1
              ]
            }
          },
          {
            "type": "02",
            "value": {
              "amount": 20000,
              "k_image": "41dfa44fb452fdf3a84a647b7808c785011218d7743c4e1877a926bfcb27f404",
              "key_offsets": [
                517914,
                312,
                1,
                1,
                1,
                1,
                1,
                1
              ]
            }
          }
        ],
        "vout": [
          {
            "amount": 50,
            "target": {
              "data": {
                "key": "150c0265d7bd1af9c78d3bb4fa43a4e4b3347b61403c01e29d347b23b450d5fe"
              },
              "type": "02"
            }
          },
          {
            "amount": 100,
            "target": {
              "data": {
                "key": "c5c0f3ffba4779e2a61778738f35fae11919bb087b0952e3ce334d157b7e7c17"
              },
              "type": "02"
            }
          }
        ]
      }
    }
  ],
  "deletedTxsIds": [],
  "isTailBlockActual": false,
  "status": "OK"
}
```

### client.getPoolChangesLite(options)

Returns updates regarding the transaction mempool.

#### Method Parameters

|Argument|Mandatory|Description|Format|
|---|---|---|---|
|tailBlockHash|Yes|The last known block ID|string|
|knownTransactionHashes|Yes|The transaction hashes that we of|strings|

#### Example Code

```javascript
client.getPoolChangesLite({
  tailBlockHash: "410a8e6166a4582d592143c2a9bb062f6601712a7b7a99c0de71eebeb01d6521",
  knownTransactionHashes: []
}).then((result) => {
  // do something
})
```

#### Example Data

***Note:*** Example data has been heavily truncated for display below.

```javascript
{
  "addedTxs": [
    {
      "transactionPrefixInfo.txHash": "80060286cc4b46778e60a8b26a869719546c7c8b06de7ee16c01edc3e2774040",
      "transactionPrefixInfo.txPrefix": {
        "extra": "0122ee5a333e0bf7b7c8501a968a5ce1415f3b37c4312a779f2d704298a2ad3f12",
        "unlock_time": 0,
        "version": 1,
        "vin": [
          {
            "type": "02",
            "value": {
              "amount": 900000,
              "k_image": "d527587f9be05bd228f075b00965087597754be3a3953b15389a1965c0db390f",
              "key_offsets": [
                686585,
                386,
                1,
                1,
                1,
                1,
                1,
                1
              ]
            }
          },
          {
            "type": "02",
            "value": {
              "amount": 20000,
              "k_image": "41dfa44fb452fdf3a84a647b7808c785011218d7743c4e1877a926bfcb27f404",
              "key_offsets": [
                517914,
                312,
                1,
                1,
                1,
                1,
                1,
                1
              ]
            }
          }
        ],
        "vout": [
          {
            "amount": 50,
            "target": {
              "data": {
                "key": "150c0265d7bd1af9c78d3bb4fa43a4e4b3347b61403c01e29d347b23b450d5fe"
              },
              "type": "02"
            }
          },
          {
            "amount": 100,
            "target": {
              "data": {
                "key": "c5c0f3ffba4779e2a61778738f35fae11919bb087b0952e3ce334d157b7e7c17"
              },
              "type": "02"
            }
          }
        ]
      }
    }
  ],
  "deletedTxsIds": [],
  "isTailBlockActual": false,
  "status": "OK"
}
```

### client.getBlockDetailsByHeight(options)

#### Method Parameters

|Argument|Mandatory|Description|Format|
|---|---|---|---|
|blockHeight|Yes|The height of the block|integer|

#### Example Code

```javascript
client.getBlockDetailsByHeight({
  blockHeight: 600000
}).then((result => {
  // do something
}))
```

#### Example Data

```javascript
{
  "block": {
    "alreadyGeneratedCoins": 1771716825122,
    "alreadyGeneratedTransactions": 1305440,
    "baseReward": 2927431,
    "blockSize": 419,
    "difficulty": 352722224,
    "hash": "234266e7a2b03534df7d7a0b9403eeaabad316b86222575076c599f77c812200",
    "index": 600000,
    "majorVersion": 4,
    "minorVersion": 0,
    "nonce": 31311,
    "prevBlockHash": "680fc502a073a637a4d4e61f6011fac2271ff9942975cce98a52a2bcf92c775a",
    "reward": 2927431,
    "sizeMedian": 300,
    "timestamp": 1530957955,
    "totalFeeAmount": 0,
    "transactions": [
      {
        "blockHash": "234266e7a2b03534df7d7a0b9403eeaabad316b86222575076c599f77c812200",
        "blockIndex": 600000,
        "extra": {
          "nonce": [
            0,
            0,
            0,
            1,
            44,
            181,
            35,
            112
          ],
          "publicKey": "83b89ff22edc8f1ed2cc80add101363695fb3ab30c9286c50c56241e5f8b67b5",
          "raw": ""
        },
        "fee": 0,
        "hash": "f33287faa27c979d360eb05dce1b9b64d6308b8328ab7ad7a1001a07838fc20f",
        "inBlockchain": true,
        "inputs": [
          {
            "data": {
              "amount": 2927431,
              "input": {
                "height": 600000
              }
            },
            "type": "ff"
          }
        ],
        "mixin": 0,
        "outputs": [
          {
            "globalIndex": 750578,
            "output": {
              "amount": 1,
              "target": {
                "data": {
                  "key": "d2f3c5c17b0ef6564b715ec699e246aeb6fe4fa4984de0b556a1da686d0e381c"
                },
                "type": "02"
              }
            }
          },
          {
            "globalIndex": 141864,
            "output": {
              "amount": 30,
              "target": {
                "data": {
                  "key": "e5b98f54123a61a211545c4e8715956aae92123dbd9965e85e351532ad33340e"
                },
                "type": "02"
              }
            }
          },
          {
            "globalIndex": 659408,
            "output": {
              "amount": 400,
              "target": {
                "data": {
                  "key": "5caec873a5a857aec23ebc43400c4d3bd93aaf61a282f77a397f2a567d940021"
                },
                "type": "02"
              }
            }
          },
          {
            "globalIndex": 577457,
            "output": {
              "amount": 7000,
              "target": {
                "data": {
                  "key": "8ac48329110e5dadd12c2a9c282f98d689e263d9a8bb55b6ff36774865e18f25"
                },
                "type": "02"
              }
            }
          },
          {
            "globalIndex": 493814,
            "output": {
              "amount": 20000,
              "target": {
                "data": {
                  "key": "09c981fb2d7e29b49ad482d31e0b986cab19aac15d3777be97a37c3a89738590"
                },
                "type": "02"
              }
            }
          },
          {
            "globalIndex": 672983,
            "output": {
              "amount": 900000,
              "target": {
                "data": {
                  "key": "dcf992ce17b4217ca27cb0e9539d951014a156733080a04292ed3a87ba961c65"
                },
                "type": "02"
              }
            }
          },
          {
            "globalIndex": 674598,
            "output": {
              "amount": 2000000,
              "target": {
                "data": {
                  "key": "a53316195cbaf416749ced48d0a426ca2d0e790c694120abb9679b1c6175aef2"
                },
                "type": "02"
              }
            }
          }
        ],
        "paymentId": "0000000000000000000000000000000000000000000000000000000000000000",
        "signatures": [],
        "signaturesSize": 0,
        "size": 300,
        "timestamp": 1530957955,
        "totalInputsAmount": 0,
        "totalOutputsAmount": 2927431,
        "unlockTime": 600040
      }
    ],
    "transactionsCumulativeSize": 300
  },
  "status": "OK"
}
```

### client.getBlocksDetailsByHeights(options)

### Method Parameters

|Argument|Mandatory|Description|Format|
|---|---|---|---|
|blockHeights|Yes|The height of the block|integer|

#### Example Code

```javascript
client.getBlocksDetailsByHeights({
  blockHeights: [
    500000,
    600000
  ]
}).then((result) => {
  // do something
})
```

#### Example Data

***Note:*** Example data has been heavily truncated for display below.

```javascript
{
  "blocks": [
    {
      "alreadyGeneratedCoins": 1771716825122,
      "alreadyGeneratedTransactions": 1305440,
      "baseReward": 2927431,
      "blockSize": 419,
      "difficulty": 352722224,
      "hash": "234266e7a2b03534df7d7a0b9403eeaabad316b86222575076c599f77c812200",
      "index": 600000,
      "majorVersion": 4,
      "minorVersion": 0,
      "nonce": 31311,
      "prevBlockHash": "680fc502a073a637a4d4e61f6011fac2271ff9942975cce98a52a2bcf92c775a",
      "reward": 2927431,
      "sizeMedian": 300,
      "timestamp": 1530957955,
      "totalFeeAmount": 0,
      "transactions": [
        {
          "blockHash": "234266e7a2b03534df7d7a0b9403eeaabad316b86222575076c599f77c812200",
          "blockIndex": 600000,
          "extra": {
            "nonce": [
              0,
              0,
              0,
              1,
              44,
              181,
              35,
              112
            ],
            "publicKey": "83b89ff22edc8f1ed2cc80add101363695fb3ab30c9286c50c56241e5f8b67b5",
            "raw": ""
          },
          "fee": 0,
          "hash": "f33287faa27c979d360eb05dce1b9b64d6308b8328ab7ad7a1001a07838fc20f",
          "inBlockchain": true,
          "inputs": [
            {
              "data": {
                "amount": 2927431,
                "input": {
                  "height": 600000
                }
              },
              "type": "ff"
            }
          ],
          "mixin": 0,
          "outputs": [
            {
              "globalIndex": 750578,
              "output": {
                "amount": 1,
                "target": {
                  "data": {
                    "key": "d2f3c5c17b0ef6564b715ec699e246aeb6fe4fa4984de0b556a1da686d0e381c"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 141864,
              "output": {
                "amount": 30,
                "target": {
                  "data": {
                    "key": "e5b98f54123a61a211545c4e8715956aae92123dbd9965e85e351532ad33340e"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 659408,
              "output": {
                "amount": 400,
                "target": {
                  "data": {
                    "key": "5caec873a5a857aec23ebc43400c4d3bd93aaf61a282f77a397f2a567d940021"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 577457,
              "output": {
                "amount": 7000,
                "target": {
                  "data": {
                    "key": "8ac48329110e5dadd12c2a9c282f98d689e263d9a8bb55b6ff36774865e18f25"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 493814,
              "output": {
                "amount": 20000,
                "target": {
                  "data": {
                    "key": "09c981fb2d7e29b49ad482d31e0b986cab19aac15d3777be97a37c3a89738590"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 672983,
              "output": {
                "amount": 900000,
                "target": {
                  "data": {
                    "key": "dcf992ce17b4217ca27cb0e9539d951014a156733080a04292ed3a87ba961c65"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 674598,
              "output": {
                "amount": 2000000,
                "target": {
                  "data": {
                    "key": "a53316195cbaf416749ced48d0a426ca2d0e790c694120abb9679b1c6175aef2"
                  },
                  "type": "02"
                }
              }
            }
          ],
          "paymentId": "0000000000000000000000000000000000000000000000000000000000000000",
          "signatures": [],
          "signaturesSize": 0,
          "size": 300,
          "timestamp": 1530957955,
          "totalInputsAmount": 0,
          "totalOutputsAmount": 2927431,
          "unlockTime": 600040
        }
      ],
      "transactionsCumulativeSize": 300
    },
    {
      "alreadyGeneratedCoins": 1478791810384,
      "alreadyGeneratedTransactions": 968669,
      "baseReward": 2936160,
      "blockSize": 22041,
      "difficulty": 285124963,
      "hash": "62f0058453292af5e1aa070f8526f7642ab6974c6af2c17088c21b31679c813d",
      "index": 500000,
      "majorVersion": 4,
      "minorVersion": 0,
      "nonce": 1073751151,
      "prevBlockHash": "74a45602da61b8b8ff565b1c81c854416046a23ca53f4416684ffaa60bc50796",
      "reward": 2936280,
      "sizeMedian": 299,
      "timestamp": 1527834137,
      "totalFeeAmount": 120,
      "transactions": [
        {
          "blockHash": "62f0058453292af5e1aa070f8526f7642ab6974c6af2c17088c21b31679c813d",
          "blockIndex": 500000,
          "extra": {
            "nonce": [
              0,
              0,
              0,
              0,
              149,
              103,
              16,
              182
            ],
            "publicKey": "9e430ecdd501714900c71cb45fd49b4fa77ebd4a68d967cc2419ccd4e72378e3",
            "raw": ""
          },
          "fee": 0,
          "hash": "702ad5bd04b9eff14b080d508f69a320da1909e989d6c163c18f80ae7a5ab832",
          "inBlockchain": true,
          "inputs": [
            {
              "data": {
                "amount": 2936280,
                "input": {
                  "height": 500000
                }
              },
              "type": "ff"
            }
          ],
          "mixin": 0,
          "outputs": [
            {
              "globalIndex": 129866,
              "output": {
                "amount": 80,
                "target": {
                  "data": {
                    "key": "5ce69a87940df7ae8443261ff610861d2e4207a7556ef1aa35878c0a5e7e382d"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 507629,
              "output": {
                "amount": 200,
                "target": {
                  "data": {
                    "key": "7c7f316befaac16ba3782a2ce489e7c0f16c2b733ac0eaa0a72a12ee637822e9"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 462361,
              "output": {
                "amount": 6000,
                "target": {
                  "data": {
                    "key": "defcb7eb6537bf0a63368ed464df10197e67d7ea8f080e885911cf9ea71abb62"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 318744,
              "output": {
                "amount": 30000,
                "target": {
                  "data": {
                    "key": "9693e864dba53f308d0b59623c608b6fe16bbdc7cdc75be94f78582d547b46a4"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 560355,
              "output": {
                "amount": 900000,
                "target": {
                  "data": {
                    "key": "b739e9fbaa3ee976a9ed8ad93a2731ee191c384cf136929e737786573fcd3e96"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 559781,
              "output": {
                "amount": 2000000,
                "target": {
                  "data": {
                    "key": "5621667d44e7ffb87e5010a5984c188f58a799efb01569e8e42fa2415bb7d14a"
                  },
                  "type": "02"
                }
              }
            }
          ],
          "paymentId": "0000000000000000000000000000000000000000000000000000000000000000",
          "signatures": [],
          "signaturesSize": 0,
          "size": 266,
          "timestamp": 1527834137,
          "totalInputsAmount": 0,
          "totalOutputsAmount": 2936280,
          "unlockTime": 500040
        }
      ],
      "transactionsCumulativeSize": 21826
    }
  ],
  "status": "OK"
}
```

#### Example Data

### client.getBlocksDetailsByHashes(options)

#### Method Parameters

|Argument|Mandatory|Description|Format|
|---|---|---|---|
|blockHashes|Yes|The height of the block|integer|

#### Example Code

```javascript
client.getBlocksDetailsByHashes({
  blockHashes: [
    '4c4ce202a918f52a5f777be3de160bbe579f8cd7bd1e8a097b5f46bac900d471',
    'eb84504720dba262bc02d79d922f9f183eb394586874e27c3fc6f4d0c76e31ed'
  ]
}).catch((result) => {
  // do something
})
```

#### Example Data

***Note:*** Example data has been heavily truncated for display below.

```javascript
{
  "blocks": [
    {
      "alreadyGeneratedCoins": 1808203639746,
      "alreadyGeneratedTransactions": 1330685,
      "baseReward": 2926343,
      "blockSize": 13934,
      "difficulty": 314009623,
      "hash": "4c4ce202a918f52a5f777be3de160bbe579f8cd7bd1e8a097b5f46bac900d471",
      "index": 612471,
      "majorVersion": 4,
      "minorVersion": 0,
      "nonce": 1610784534,
      "prevBlockHash": "190f172acd54b046a25da64011494cf96d544054f47f122575101501c19c7e5a",
      "reward": 2926603,
      "sizeMedian": 300,
      "timestamp": 1531346993,
      "totalFeeAmount": 260,
      "transactions": [
        {
          "blockHash": "4c4ce202a918f52a5f777be3de160bbe579f8cd7bd1e8a097b5f46bac900d471",
          "blockIndex": 612471,
          "extra": {
            "nonce": [
              0,
              0,
              0,
              0,
              238,
              107,
              222,
              230
            ],
            "publicKey": "e04d60524955cadc8e85d27a3d980615207b7b311453460a5f37a993900d7dcd",
            "raw": ""
          },
          "fee": 0,
          "hash": "053279175b6ddb5addd970895a3e2844a19945f368a22d83e446fff43b20eaa9",
          "inBlockchain": true,
          "inputs": [
            {
              "data": {
                "amount": 2926603,
                "input": {
                  "height": 612471
                }
              },
              "type": "ff"
            }
          ],
          "mixin": 0,
          "outputs": [
            {
              "globalIndex": 129418,
              "output": {
                "amount": 3,
                "target": {
                  "data": {
                    "key": "88ccc941391aa6fd435e37d966e15a2e9eee4c10b02108275a6d69d34393d8d5"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 668484,
              "output": {
                "amount": 600,
                "target": {
                  "data": {
                    "key": "788b0b6863aa306aca591e2d009ef42347e4f729ff4db10b3381762998bf5878"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 617579,
              "output": {
                "amount": 6000,
                "target": {
                  "data": {
                    "key": "6a33bf41c6107eca3b0604964bf35cf1a466e801fd768cc0bdb2e59d2cc7164d"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 518420,
              "output": {
                "amount": 20000,
                "target": {
                  "data": {
                    "key": "5a834a37d15dc84d0172853d86d77b41107e59924e8bc0879afb016f16fae050"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 687102,
              "output": {
                "amount": 900000,
                "target": {
                  "data": {
                    "key": "e41ea0648831743b41a9f787e714782101e37078dbec41aa1c8a36e65b008aee"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 688849,
              "output": {
                "amount": 2000000,
                "target": {
                  "data": {
                    "key": "7b59e82240d5e5f292f6285cd44a20acb024760fe81cad971fc332f89411365e"
                  },
                  "type": "02"
                }
              }
            }
          ],
          "paymentId": "0000000000000000000000000000000000000000000000000000000000000000",
          "signatures": [],
          "signaturesSize": 0,
          "size": 266,
          "timestamp": 1531346993,
          "totalInputsAmount": 0,
          "totalOutputsAmount": 2926603,
          "unlockTime": 612511
        }
      ],
      "transactionsCumulativeSize": 13719
    },
    {
      "alreadyGeneratedCoins": 1808191934374,
      "alreadyGeneratedTransactions": 1330678,
      "baseReward": 2926344,
      "blockSize": 419,
      "difficulty": 190461298,
      "hash": "eb84504720dba262bc02d79d922f9f183eb394586874e27c3fc6f4d0c76e31ed",
      "index": 612467,
      "majorVersion": 4,
      "minorVersion": 0,
      "nonce": 131149,
      "prevBlockHash": "2ede9401c343e95bd3da81e20f29fa059511baf67a64c91936aef3d192d7491a",
      "reward": 2926344,
      "sizeMedian": 300,
      "timestamp": 1531346880,
      "totalFeeAmount": 0,
      "transactions": [
        {
          "blockHash": "eb84504720dba262bc02d79d922f9f183eb394586874e27c3fc6f4d0c76e31ed",
          "blockIndex": 612467,
          "extra": {
            "nonce": [
              0,
              0,
              0,
              0,
              219,
              27,
              250,
              196
            ],
            "publicKey": "e4168284b7e63e432cb29ba9fb6d56e593ccae7c8a4e7c50b02b001a63f28bb5",
            "raw": ""
          },
          "fee": 0,
          "hash": "f69baa3c2ac707cc7325fea9a3b08ca1c3b677e90a28ba3dcb7b430e2fe7dbe6",
          "inBlockchain": true,
          "inputs": [
            {
              "data": {
                "amount": 2926344,
                "input": {
                  "height": 612467
                }
              },
              "type": "ff"
            }
          ],
          "mixin": 0,
          "outputs": [
            {
              "globalIndex": 123590,
              "output": {
                "amount": 4,
                "target": {
                  "data": {
                    "key": "dc5f38fe0c75e96c1cb3f5805da2bfe12e63919ae373216f322d6e4360904cce"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 148934,
              "output": {
                "amount": 40,
                "target": {
                  "data": {
                    "key": "0288bb8f25cc20c5c32183402e828c601dece14477fa21ae688f66a24f6444b9"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 679523,
              "output": {
                "amount": 300,
                "target": {
                  "data": {
                    "key": "806558329e9ca064007152b8df404135542b7d237da10365939d48a4216b00c9"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 617575,
              "output": {
                "amount": 6000,
                "target": {
                  "data": {
                    "key": "871c8170db4e76b96d8575054959eb948fd444b2e6666e08a374c9fbcf67b111"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 518416,
              "output": {
                "amount": 20000,
                "target": {
                  "data": {
                    "key": "c8703368fc6c14302906a307ae31d44400e141ae320d786c134a057289a1b36c"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 687098,
              "output": {
                "amount": 900000,
                "target": {
                  "data": {
                    "key": "cc393f9ec8dc06cf578706b340de1d2151992c8652b57605a57fbfa90d73497e"
                  },
                  "type": "02"
                }
              }
            },
            {
              "globalIndex": 688845,
              "output": {
                "amount": 2000000,
                "target": {
                  "data": {
                    "key": "fbcc4ddf81b5998ede5b7f9b7664b56533bee274f4a88f7310f532bf6837c548"
                  },
                  "type": "02"
                }
              }
            }
          ],
          "paymentId": "0000000000000000000000000000000000000000000000000000000000000000",
          "signatures": [],
          "signaturesSize": 0,
          "size": 300,
          "timestamp": 1531346880,
          "totalInputsAmount": 0,
          "totalOutputsAmount": 2926344,
          "unlockTime": 612507
        }
      ],
      "transactionsCumulativeSize": 300
    }
  ],
  "status": "OK"
}
```

### client.getBlocksHashesByTimestamps(options)

#### Method Parameters

|Argument|Mandatory|Description|Format|
|---|---|---|---|
|timestampBegin|Yes|The Unix Timestamp to search from|integer|
|seconds|Yes|How many seconds to search for|integer|

#### Example Code

```javascript
client.getBlocksHashesByTimestamps({
  timestampBegin: 1531348100,
  seconds: 240
}).catch((result) => {
  // do something
})
```

#### Example Data

```javascript
{
  "blockHashes": [
    "6ab1b7f252b775edd02d230624a93144d8e5a731062ae36bc461720ce8b0e6a1",
    "61674df46bae0fbedb5d9394e2f223a61fcfe45f7fbea6a96d56ae3d78e12a0e"
  ],
  "status": "OK"
}
```

### client.getTransactionDetailsByHashes(options)

#### Method Parameters

|Argument|Mandatory|Description|Format|
|---|---|---|---|
|transactionHashes|Yes|The transactions hashes to search for|strings|

#### Example Code

```javascript
client.getTransactionDetailsByHashes({
  transactionHashes: [
    "8620c2f19b00182beb407023848305889baaa5202f3664c9efa70a843bf26c7b",
    "687c487be84153ead8e70e3873d30f334316fc7d9ed052dd0575faad57d135dd"
  ]
}).catch((result) => {
  // do something
})
```

#### Example Data

***Note:*** Example data has been heavily truncated for display below.

```javascript
{
  "status": "OK",
  "transactions": [
    {
      "blockHash": "12ec0675db0fbc83b3683e62e883626afc723c0943f868adf15e4bff2faa4578",
      "blockIndex": 612486,
      "extra": {
        "nonce": [],
        "publicKey": "998e47b2e6ae96d44e3e8e06ca1c94408a724c09390cb738b44160dbdbca13b3",
        "raw": ""
      },
      "fee": 1,
      "hash": "8620c2f19b00182beb407023848305889baaa5202f3664c9efa70a843bf26c7b",
      "inBlockchain": true,
      "inputs": [
        {
          "data": {
            "input": {
              "amount": 200,
              "k_image": "5378332f1ee541054a2a824420730b0b5dd43fa478ae51b1999e39de97d05176",
              "key_offsets": [
                684366,
                1720
              ]
            },
            "mixin": 2,
            "output": {
              "number": 36,
              "transactionHash": "f4aa0f84ef0e4105dd3a8df6935eb8976b9f00546dd071bd5223c819e65a8750"
            }
          },
          "type": "02"
        }
      ],
      "mixin": 2,
      "outputs": [
        {
          "globalIndex": 754310,
          "output": {
            "amount": 1,
            "target": {
              "data": {
                "key": "83cc2affe76a7a688b4b9f14d26fa825c653d427b0589710fa0e03f24f24b4fe"
              },
              "type": "02"
            }
          }
        }
      ],
      "paymentId": "0000000000000000000000000000000000000000000000000000000000000000",
      "signatures": [
        {
          "first": 0,
          "second": "2e7147d12e96496626658347e883c6650d5eadba41aff5549c95bd2d8f1ff40eebabfa35d5e871c11c1b2d5a7316593dac99d27878561ec37b8b166f8ce5ff0f"
        },
        {
          "first": 0,
          "second": "53b448aafcbce888b424c5c54994250d64080a7449f4d68904c1e9162aa7290bdefee3e666cfb4853a9e863ed454e0fac4ed6f61913e5f58a8548fe424f30e0c"
        },
        {
          "first": 1,
          "second": "f9e2ce758bf12402c51407f1f32332a851d606928b4f16c1685a650e5df0c90bbd50e38bdc29dac8c286810276a1430e5008463a458c9ed537bcb357753af709"
        }
      ],
      "signaturesSize": 5,
      "size": 2447,
      "timestamp": 1531347605,
      "totalInputsAmount": 2006970,
      "totalOutputsAmount": 2006890,
      "unlockTime": 0
    },
    {
      "blockHash": "3aedc3dc87ce935d8cfd35722b94e6d9cee837eb2ce759df0647463df4e22fd8",
      "blockIndex": 612488,
      "extra": {
        "nonce": [],
        "publicKey": "6580ed699dd3cd96abd534203a44af8a185396e381d4b24320fd3c6ffb574a77",
        "raw": ""
      },
      "fee": 1,
      "hash": "687c487be84153ead8e70e3873d30f334316fc7d9ed052dd0575faad57d135dd",
      "inBlockchain": true,
      "inputs": [
        {
          "data": {
            "input": {
              "amount": 2000000,
              "k_image": "82d1b7f179d4af8775af32cb28fb3d1093bf1f18445150bddfafceca5174127d",
              "key_offsets": [
                688630,
                88,
                1,
                1,
                1,
                1,
                1,
                1
              ]
            },
            "mixin": 8,
            "output": {
              "number": 6,
              "transactionHash": "14b8f13a8da88372998672d96fee2d8abe12b242ce665c2335b2d3429e19886a"
            }
          },
          "type": "02"
        }
      ],
      "mixin": 8,
      "outputs": [
        {
          "globalIndex": 863096,
          "output": {
            "amount": 100,
            "target": {
              "data": {
                "key": "093b82f668cfa8085baef287e05932bd4cd2e2ac2c4ad335ebb8d296b730bf07"
              },
              "type": "02"
            }
          }
        }
      ],
      "paymentId": "0000000000000000000000000000000000000000000000000000000000000000",
      "signatures": [
        {
          "first": 0,
          "second": "122df3feb63a60cd62b841f073b7ae8cb4cc7936fd0727bae7e9268f23378f085f6fa7422060a66d8ac506bb17cc2fbdb0afb7e8082c170b8a72ae86d408380e"
        },
        {
          "first": 0,
          "second": "093f2b7c31db755e4e2cadbc3488f65e5aa45656db99aed8e27f2f5bc28cf10556ce480fc31f64e8b69c906af5d9414f4f6301de33f68df0ce5b0a4a537dd503"
        }
      ],
      "signaturesSize": 3,
      "size": 4516,
      "timestamp": 1531347673,
      "totalInputsAmount": 6000000,
      "totalOutputsAmount": 5999900,
      "unlockTime": 0
    }
  ]
}
```

### client.getTransactionHashesByPaymentId(options)

#### Method Parameters

|Argument|Mandatory|Description|Format|
|---|---|---|---|
|paymentId|Yes|The payment ID to search for|string|

#### Example Code

```javascript
client.getTransactionHashesByPaymentId({
  paymentId: "80ec855eef7df4bce718442cabe086f19dfdd0d03907c7768eddb8eca8c5a667"
}).catch((result) => {
  // do something
})
```

#### Example Data

***Note:*** Example data has been heavily truncated for display below.

```javascript
{
  "status": "OK",
  "transactionHashes": [
    "094c306871bae7fceb3f49a4323c37cf43f6e8047e3ee8868ae5de00dd7007c4",
    "58ffb22616e77e0a5bbbd4c29c890e6cbff736e2ca7276c682c12897224ab351",
    "1a48506c1eeb479e59c8bf56e9e64cfb2d63941c4cee2f7f39198787208a12cb",
    "a93ef651ef8d5305509e4c66e9ef64b015538ee28f3c9862cacbe2cfeede6b94",
    "99131237a1c9abe1fe5292ef519b34c6c18455bc5d9ad5ecff5218608a3961b9",
    "ef789d444f9276196b7e5d33c87bd843ee8a1f1a24bf30490394b2839d38c037",
    "2944c1e5e90fae53cbe614bd8e6bf972366c97e2c39f450a47d1fc28351f49f1",
    "55a4e615d3bcd8d58ea8272de6272b4daa0bb4e32c4b6ea937168e0827d83390",
    "1516fdb7ace7ec8b0cc3c95a7cd0f60ec3757ef2e72e01c4d654500080760a18",
    "ee3d241d46bcc3bd04809eec0a455f7db68ca126857e37119ad4794d747d73bb",
    "095198817491c1f232f81a7a79257752a78e2215ce2c6c6606d74abab7f1a07e"
  ]
}
```

## License

```
Copyright (C) 2018 Brandon Lehmann, The TurtleCoin Developers, The BLOC Developers

Please see the included LICENSE file for more information.
```
