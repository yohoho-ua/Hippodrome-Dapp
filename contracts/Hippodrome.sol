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

uint public raceId = 0;
uint public minimumBet = 100000000;
uint public totalBet;
uint public numberOfBets;
uint public maxPlayers = 10;
address[] players;

struct Player {
  // mapping(uint => uint) betsInfo;
   uint betAmount;
   uint horseSelected;
}

mapping(address => Player) playerInfo;



function Hippodrome(uint _minimumBet) {
   owner = msg.sender;
   if (_minimumBet > 0 ) 
   minimumBet = _minimumBet;
}

event HippoEvent(
    uint _raceId,
    uint _minimumBet,
    uint _totalBet,
    uint _numberOfBets,
    uint _maxPlayers
    );
    
event results (
    uint horseWinner,
    uint raceId
    );

function info() public constant {
    HippoEvent(raceId, minimumBet, totalBet, numberOfBets, maxPlayers);
}

function setMaxPlayers(uint _maxPlayers) onlyOwner public {
       maxPlayers = _maxPlayers;
       HippoEvent(raceId, minimumBet, totalBet, numberOfBets, maxPlayers);
   }
function getMaxPlayers() public view returns (uint) {
    return maxPlayers;
}

// To bet for a horse between 1 and 5 both inclusive
function bet(uint horseNumber) payable {
    //if player has made his bet 
   require(checkPlayerExists(msg.sender) == false);

   require(horseNumber >= 1 && horseNumber <= 5);
   require(msg.value >= minimumBet);
//   playerInfo[msg.sender].betsInfo[horseNumber] += msg.value;
   playerInfo[msg.sender].betAmount = msg.value;
   playerInfo[msg.sender].horseSelected = horseNumber;
   numberOfBets += 1;
   players.push(msg.sender);
   totalBet += msg.value;
   if (numberOfBets >= maxPlayers)
   generateHorseWinner();
   HippoEvent(raceId, minimumBet, totalBet, numberOfBets, maxPlayers);
}

function checkPlayerExists(address player) constant returns(bool) {
   for (uint i = 0; i < players.length; i++) {
      if (players[i] == player) 
      return true;
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
   for (uint i = 0; i < players.length; i++) {
      address playerAddress = players[i];
      if (playerInfo[playerAddress].horseSelected == horseNumberWinner) {
         winners[count] = playerAddress;
         count++;
         resetData();
      }
      delete playerInfo[playerAddress]; // Delete all the players
   }
   players.length = 0; // Delete all the players array
   uint winnerEtherAmount = totalBet / winners.length; // How much each winner gets
   for (uint j = 0; j < count; j++) {
      if(winners[j] != address(0)) // Check at least one winner exists
         winners[j].transfer(winnerEtherAmount);
   }
   results (horseNumberWinner, raceId);
   raceId++;
}

function resetData(){
   players.length = 0; // Delete all the players array
   totalBet = 0;
   numberOfBets = 0;
}
// Fallback function in case someone sends ether to the contract so it doesn't get lost
function() payable {}

}