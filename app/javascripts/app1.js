// Import the page's CSS. Webpack will know what to do with it.
import '../stylesheets/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import hippodrome_artifacts from '../../build/contracts/Hippodrome.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Hippo = contract(hippodrome_artifacts)



// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts
var account

window.App = {
  start: function () {
    var self = this

      // Bootstrap the MetaCoin abstraction for Use.
    Hippo.setProvider(web3.currentProvider)

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
      var hippoEvent = Hippo.hippoEvent({}, 'latest')
      var resultsEvent = Hippo.results({}, 'latest')     

      self.refreshBalance()
      self.refreshAccount()
    })
  },
  refreshAccount: function () {
    var account_element = document.getElementById('account')
    account_element.innerHTML = account.valueOf()
  }
}

window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
      // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask")
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'))
  }

  console.log(Hippo)
  App.start()
})

Hippo.getSelectedHorses(function (error, result) {
  if (!error) {
    for (var i = 0; i < 5; i++) {
      $('#horse' + (i + 1)).html('Horse was selected ' + result[i] + ' times')
      console.log('horse ' + i + ' was shown')
    }
  } else {
    console.log('horse error')
  }
})

hippoEvent.watch(function (error, result) {
  if (!error) {
    console.log('hippoEvent')
    $('#loader').hide()
    $('#minimumBet').html('Minimum Bet: ' + result.args.minimumBet)
    $('#totalBet').html('Total Bet: ' + web3.fromWei(result.args.totalBet, 'ether') + ' Eth.')
    $('#numberOfBets').html('Number of Bets: ' + result.args.numberOfBets)
    $('#maxAmountOfBets').html('Max amount of Bets: ' + result.args.maxAmountOfBets)
    $('#acc').html('Current account: ' + web3.eth.defaultAccount)
    $('#horse' + $('#horseNumber').val()).html('Horse was selected ' + result.args.numberOfSelections)
    $('#raceId').html('Current race id: ' + result.args.raceId)
  } else {
    console.log(error)
  }
})

resultsEvent.watch(function (error, result) {
  if (!error) {
    console.log('resultsEvent')
    $('#winner').show()
    $('#winner').html('Race id [' + result.args.raceId + '] winner is horse number - ' + result.args.horseWinner)
  } else {
    console.log(error)
  }
})

$('#buttonBet').click(function () {
  $('#loader').show()
  $('#winner').hide()
  console.log(web3.eth.defaultAccount)
  voteHorse($('#horseNumber').val())
})

function voteHorse (number) {
  Hippo.bet($('#horseNumber').val(),
    {
      value: web3.toWei(0.01, 'ether'),
      gas: 300000
    },
       (err, result) => {
         if (result != null) {
           console.log(result)
         } else {
           $('#loader').hide()
           $('#error').html('Error!!')
           alert('You have made your bet!')
           console.log(error)
         }
       })
}

$('#buttonTest').click(function () {
  Hippo.setMaxAmountOfBets($('#maxBetInput').val(), (err, res) => {
    if (err) {
      $('#loader').hide()
      console.log(err)
    }
  })
})

