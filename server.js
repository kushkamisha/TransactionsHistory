const cn = require('./connect')

var address = '0x9B3d6efBc6401dF26F35a039dFC270CEfE0716dC' // '0x4822f62742F6F3C74E6CbD3809EF034e3151A59e'
var fromBlock = 0 //3658177
var toBlock = 'latest' // 3661080

// cn.contractInstance.getPastEvents('Transfer', {
//     filter: {
//       from: address
//     },
//     fromBlock: fromBlock,
//     toBlock: toBlock
// })
// .then(function(transactions){
//     transactions.forEach((trans) => {
//       // var res = {
//       //   trx_hash: trans.transactionHash,
//       //   addressFrom: trans.returnValues.from,
//       //   addressTo: trans.returnValues.to,
//       //   amount: trans.returnValues.value,
//       //   txDirection 'Out',
//       //   txStatus: 'Success'
//       // }
//       console.log(trans)
//       // console.log(res)
//       console.log('==============================')
//     })
//     // console.log(`Number of events ${events.length}`)
// })

var hash = '0x8a86893b4149f7c7a2c1d94d68ce4a3656d757fe505e761d62ce991e0a286c34'
cn.web3.eth.getTransaction(hash)
  .then((res) => {
    console.log({res})
  })


// main()

async function main() {

  contractCreationBlock = 3334591 // block in which contract was deployed to the Ethereum testnet
  timestamp = 1531914150

  var block = await searchClosestBlock(contractCreationBlock, timestamp)
  var blockRes = await cn.web3.eth.getBlock(block)
  var blockTime = blockRes.timestamp
  var delta = Math.abs(timestamp - blockTime)

  console.log({block, blockTime, timestamp, delta})
}

/**
* Binary search function to find block with closest timestamp to the given in
* the specified block range.
* @returns block number
*/
async function searchClosestBlock(fromBlock, timestamp) {

  return new Promise(async (resolve, rejection) => {
    var latestBlock = await web3.eth.getBlockNumber()
    var left = fromBlock
    var right = latestBlock

    while (right - left > 1) {
      var median = left + Math.round((right - left) / 2)
      var res = await cn.web3.eth.getBlock(median)
      var time = res.timestamp

      if (time > timestamp)
        right = median
      else
        left = median
    }

    var median = left + Math.round((right - left) / 2)
    resolve(median)
  })
}
