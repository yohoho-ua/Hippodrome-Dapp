// Import the page's CSS. Webpack will know what to do with it.
import '../stylesheets/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
// import metacoin_artifacts from '../../build/contracts/MetaCoin.json'
import hippodrome_artifacts from '../../build/contracts/Hippodrome.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
// var MetaCoin = contract(metacoin_artifacts);
var Hippodrome = contract(hippodrome_artifacts)

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts
var account
var hippo

window.App = {
  start: function () {
    var self = this

        // Bootstrap the MetaCoin abstraction for Use.
    Hippodrome.setProvider(web3.currentProvider)

    Hippodrome.deployed().then(function (instance) {
      hippo = instance
    })

        // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.')
        return
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
        return
      }

      accounts = accs
      account = accounts[0]
     // console.log(account)
    })

        // instance.getValue().then(function(val) {
        // val reprsents the `value` storage object in the solidity contract
        // since the contract returns that value.
        // });

        // self.updateMaxPlayers()
        // self.updateCurrentAcc()
        // self.refreshAccount();
        // var hippoEvent = Hippodrome.HippoEvent({}, 'latest');
        // hippoEvent.watch(function (error, result) {
        //   if (!error) {
        //     console.log('hippoEvent');
        //   } else {
        //     console.log(error);
        //   }
        // });

        
          // hippo.minimumBet.call(function(err, result) {
          //    if(result != null){
          //      console.log(result)
          //    }
          // })

          Hippodrome.deployed().then(function(deployed) {
            return deployed.totalBet();
            }).then(function (result) {
              console.log(result.c[0]);
            })

            Hippodrome.deployed().then(function(deployed) {
              return deployed.info();
              }).then(function (result) {
                console.log(result);
              })

          
        
        
          // this.state.ContractInstance.totalBet((err, result) => {
          //    if(result != null){
          //       this.setState({
          //          totalBet: parseFloat(web3.fromWei(result, 'ether'))
          //       })
          //    }
          // })
          // this.state.ContractInstance.numberOfBets((err, result) => {
          //    if(result != null){
          //       this.setState({
          //          numberOfBets: parseInt(result)
          //       })
          //    }
          // })
          // this.state.ContractInstance.maxAmountOfBets((err, result) => {
          //    if(result != null){
          //       this.setState({
          //          maxAmountOfBets: parseInt(result)
          //       })
          //    }
          // })
       

    //console.log(Hippodrome.deployed().minimumBet.call());
  },

  setStatus: function (message) {
    var status = document.getElementById('status')
    status.innerHTML = message
  },

  updateCurrentAcc: function () {
    var curr_acc_element = document.getElementById('acc')
    curr_acc_element.innerHTML = account.valueOf()
  },

  setMaxPlayers: function () {
    var self = this

    var amount = parseInt(document.getElementById('maxPlayersInput').value)
    this.setStatus('Initiating transaction... (please wait)')

    hippo.setMaxPlayers(amount, { from: account })
            .then(function (result) {
              self.setStatus('Transaction complete!')
              self.updateAll(result)
            }).catch(function (e) {
              console.log(e)
              self.setStatus('Error sending transaction; see log.')
            })
  },

  bet: function () {
    var self = this
    var horseNumber = parseInt(document.getElementById('horseNumber').value)
    this.setStatus('Initiating transaction... (please wait)')
    hippo.bet(horseNumber, {
      gas: 300000,
      from: account,
      value: web3.toWei(1, 'ether')
    })
            .then(function (result) {
              self.updateAll(result)
            })
            .catch(function (e) {
              console.log(e)
              self.setStatus('Error sending transaction; see log.')
            })
  },

  updateAll: function (result) {
    for (var i = 0; i < result.logs.length; i++) {
      var log = result.logs[i]
      if (log.event == 'HippoEvent') {
                // We found the event!
        console.log(log)
        var minimumBet = log.args._minimumBet.c[0]
        var totalBet = log.args._totalBet.c[0]
        var numberOfBets = log.args._numberOfBets.c[0]
        var maxPalayers = log.args._maxPlayers.c[0]
        var raceId = log.args._raceId.c[0]
        console.log(raceId, minimumBet, totalBet, numberOfBets, maxPalayers)
        document.getElementById('minimumBet').innerHTML = minimumBet.valueOf()
        document.getElementById('totalBet').innerHTML = totalBet.valueOf()
        document.getElementById('numberOfBets').innerHTML = numberOfBets.valueOf()
        document.getElementById('maxPlayers').innerHTML = maxPalayers.valueOf()
        document.getElementById('raceId').innerHTML = raceId.valueOf()
        this.updateCurrentAcc()
        break
      }
    }
  }

}

window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
        // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask")
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'))
  }

  App.start()
})
