// Copyright (c) 2018, Brandon Lehmann, The TurtleCoin Developers, The BLOC Developers
//
// Please see the included LICENSE file for more information.

'use strict'

const BLOCd = require('./blocd-rpc.js')

var ClientRPC = function (opts) {
  opts = opts || {}
  if (!(this instanceof ClientRPC)) return new ClientRPC(opts)
  this.host = opts.host || '127.0.0.1'
  this.port = opts.port || 2086
  this.timeout = opts.timeout || 2000
  this.ssl = opts.ssl || false
  this.daemon = new BLOCd({
    host: this.host,
    port: this.port,
    timeout: this.timeout,
    ssl: this.ssl
  })
}

ClientRPC.prototype.getBlocks = function (opts) { // getblocks
  //* first 10 blocks id goes sequential, next goes in pow(2,n) offset, like 2, 4, 8, 16, 32, 64 and so on, and the last one is always genesis block */
  return new Promise((resolve, reject) => {
    return reject(new Error('This RPC call is not implemented'))
  })
}

ClientRPC.prototype.queryBlocks = function (opts) { // queryblocks
  // *first 10 blocks id goes sequential, next goes in pow(2,n) offset, like 2, 4, 8, 16, 32, 64 and so on, and the last one is always genesis block */
  return new Promise((resolve, reject) => {
    return reject(new Error('This RPC call is not implemented'))
  })
}

ClientRPC.prototype.queryBlocksLite = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!Array.isArray(opts.blockHashes)) return reject(new Error('must supply an array of block hashes'))
    if (opts.timestamp === undefined) opts.timestamp = 0

    var body = {
      blockIds: opts.blockHashes,
      timestamp: opts.timestamp
    }

    this.daemon._rawPost('queryblockslite', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getIndexes = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (opts.transactionHash === undefined) return reject(new Error('must supply a transaction hash'))

    var body = {
      txid: opts.transactionHash
    }

    this.daemon._rawPost('get_o_indexes', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getRandomOutputs = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!Array.isArray(opts.amounts)) return reject(new Error('must supply an array of amounts'))
    if (opts.mixin === undefined) return reject(new Error('must supply a mixin value'))

    opts.mixin = parseInt(opts.mixin)
    if (isNaN(opts.mixin)) return reject(new Error('must supply a valid mixin value'))

    var body = {
      amounts: opts.amounts,
      outs_count: opts.mixin
    }

    this.daemon._rawPost('getrandom_outs', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getPoolChanges = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (opts.tailBlockHash === undefined) return reject(new Error('must supply a tail block hash'))
    if (!Array.isArray(opts.knownTransactionHashes)) return reject(new Error('must supply an array of known transaction hashes'))

    var body = {
      tailBlockId: opts.tailBlockHash,
      knownTxsIds: opts.knownTransactionHashes
    }

    this.daemon._rawPost('get_pool_changes', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getPoolChangesLite = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (opts.tailBlockHash === undefined) return reject(new Error('must supply a tail block hash'))
    if (!Array.isArray(opts.knownTransactionHashes)) return reject(new Error('must supply an array of known transaction hashes'))

    var body = {
      tailBlockId: opts.tailBlockHash,
      knownTxsIds: opts.knownTransactionHashes
    }

    this.daemon._rawPost('get_pool_changes_lite', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getBlockDetailsByHeight = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (opts.blockHeight === undefined) return reject(new Error('must supply a block height'))

    opts.blockHeight = parseInt(opts.blockHeight)
    if (isNaN(opts.blockHeight)) return reject(new Error('must supply a valid block height'))

    var body = {
      blockHeight: opts.blockHeight
    }

    this.daemon._rawPost('get_block_details_by_height', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getBlocksDetailsByHeights = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!Array.isArray(opts.blockHeights)) return reject(new Error('must supply an array of block heights'))

    var body = {
      blockHeights: opts.blockHeights
    }

    this.daemon._rawPost('get_blocks_details_by_heights', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}
ClientRPC.prototype.getBlocksDetailsByHashes = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!Array.isArray(opts.blockHashes)) return reject(new Error('must supply an array of block hashes'))

    var body = {
      blockHashes: opts.blockHashes
    }

    this.daemon._rawPost('get_blocks_details_by_hashes', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getBlocksHashesByTimestamps = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (opts.timestampBegin === undefined) return reject(new Error('must supply a beginning timestamp'))
    if (opts.seconds === undefined) return reject(new Error('must supply seconds value'))

    var body = {
      timestampBegin: opts.timestampBegin,
      secondsCount: opts.seconds
    }

    this.daemon._rawPost('get_blocks_hashes_by_timestamps', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getTransactionDetailsByHashes = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!Array.isArray(opts.transactionHashes)) return reject(new Error('must supply an array of transaction hashes'))

    var body = {
      transactionHashes: opts.transactionHashes
    }

    this.daemon._rawPost('get_transaction_details_by_hashes', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getTransactionHashesByPaymentId = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (opts.paymentId === undefined) return reject(new Error('must supply a payment ID'))

    var body = {
      paymentId: opts.paymentId
    }

    this.daemon._rawPost('get_transaction_hashes_by_payment_id', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

module.exports = ClientRPC
