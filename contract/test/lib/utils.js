const CentroCoin = artifacts.require('./CentroCoin.sol')

const BigNumber = require('bignumber.js')

let funcs = {
  deployToken: async () => {
    let token = await CentroCoin.new()
    return { token }
  },
  mineOneBlock: function () {
    web3.currentProvider.send({
      jsonrpc: '2.0',
      method: 'evm_mine',
      id: new Date().getTime()
    })
  },
  assertThrows: (promise, err) => {
    return promise.then(() => {
      assert.isNotOk(true, err)
    }).catch((e) => {
      assert.include(e.message, 'VM Exception')
    })
  },
  waitForEvent: async (event, optTimeout = 5000) => {
    return new Promise((resolve, reject) => {
      let timeout = setTimeout(() => {
        clearTimeout(timeout)
        reject(new Error('Timeout'))
      }, optTimeout)
      event.watch((e, res) => {
        clearTimeout(timeout)
        resolve(res.args)
      })
    })
  }
}

module.exports = funcs
