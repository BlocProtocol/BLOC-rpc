// Copyright (c) 2018, Brandon Lehmann, The TurtleCoin Developers, The BLOC Developers
//
// Please see the included LICENSE file for more information.

'use strict'

module.exports.BLOCd = require('./lib/blocd-rpc.js')
module.exports.BlocService = require('./lib/service-rpc.js')
module.exports.Client = require('./lib/client-rpc.js')

// These exports will be deprecated in a future version.
// Continue to use them at your own risk.
module.exports.Walletd = require('./lib/service-rpc.js')
module.exports.Service = require('./lib/service-rpc.js')
