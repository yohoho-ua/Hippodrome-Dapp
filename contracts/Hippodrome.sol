pragma solidity ^0.4.18;

contract Owned {
    address owner;

    function Owned() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
  function kill() onlyOwner {
         selfdestruct(owner);
   }
}

contract Hippodrome is Owned {

   address owner;

uint public minimumBet;
uint public totalBet;
uint public numberOfBets;
uint public maxBetAmount = 10;
address[] players;

struct Player {
   uint amountBet;
   uint horseSelected;
}

mapping(address => Player) playerInfo;



function Hippodrome(uint _minimumBet) {
   owner = msg.sender;
   if(_minimumBet > 0 ) minimumBet = _minimumBet;
}

event hippoEvent(
    uint minimumBet,
    uint totalBet,
    uint numberOfBets,
    uint maxBetAmount
    );
    

function setMaxBetAmount(uint _maxBetAmount) onlyOwner public {
    maxBetAmount = _maxBetAmount;
       hippoEvent(minimumBet, totalBet, numberOfBets, maxBetAmount);
   }

// To bet for a horse between 1 and 5 both inclusive
function bet(uint horseNumber) payable {
    //if player has made his bet 
   require(checkPlayerExists(msg.sender) == false);

   require(horseNumber >= 1 && horseNumber <= 5);
   require(msg.value >= minimumBet);
   playerInfo[msg.sender].amountBet = msg.value;
   playerInfo[msg.sender].horseSelected = horseNumber;
   numberOfBets += 1;
   players.push(msg.sender);
   totalBet += msg.value;
   if(numberOfBets >= maxBetAmount) generateHorseWinner();
   hippoEvent(minimumBet, totalBet, numberOfBets, maxBetAmount);
}

function checkPlayerExists(address player) constant returns(bool) {
   for(uint i = 0; i < players.length; i++) {
      if(players[i] == player) return true;
   }
   return false;
}

// Generates a horseNumber between 1 and 5
function generateHorseWinner() {
   uint horseNumberGenerated = block.number % 5 + 1; // This isn't secure
   distributePrizes(horseNumberGenerated);
}

// Sends the corresponding ether to each winner depending on the total bets
function distributePrizes(uint horseNumberWinner) {
   address[100] memory winners; // We have to create a temporary in memory array with fixed size
   uint count = 0; // This is the count for the array of winners
   for(uint i = 0; i < players.length; i++) {
      address playerAddress = players[i];
      if(playerInfo[playerAddress].horseSelected == horseNumberWinner) {
         winners[count] = playerAddress;
         count++;
         resetData();
      }
      delete playerInfo[playerAddress]; // Delete all the players
   }
   players.length = 0; // Delete all the players array
   uint winnerEtherAmount = totalBet / winners.length; // How much each winner gets
   for(uint j = 0; j < count; j++) {
      if(winners[j] != address(0)) // Check that the address in this fixed array is not empty
         winners[j].transfer(winnerEtherAmount);
   }
}

function resetData(){
   players.length = 0; // Delete all the players array
   totalBet = 0;
   numberOfBets = 0;
}
// Fallback function in case someone sends ether to the contract so it doesn't get lost
function() payable {}

}