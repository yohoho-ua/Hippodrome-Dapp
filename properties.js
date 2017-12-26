gOptions = {
    //Put contract address here
    address: '0x3952be8b7187beeec5756e21869bcfeb9e948493',

    //Put ABI here
    abi:[
        {
            "constant": true,
            "inputs": [],
            "name": "totalBet",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "player",
                    "type": "address"
                }
            ],
            "name": "checkPlayerExists",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "numberOfBets",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "minimumBet",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "maxAmountOfBets",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getSelectedHorses",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256[5]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "minimumBet",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "totalBet",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "numberOfBets",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "maxAmountOfBets",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "numberOfSelections",
                    "type": "uint256"
                }
            ],
            "name": "hippoEvent",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "horseNumber",
                    "type": "uint256"
                }
            ],
            "name": "bet",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "resetData",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "horseNumberWinner",
                    "type": "uint256"
                }
            ],
            "name": "distributePrizes",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "generateHorseWinner",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_minimumBet",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "kill",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_maxAmountOfBets",
                    "type": "uint256"
                }
            ],
            "name": "setMaxAmountOfBets",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "horseNumber",
                    "type": "uint256"
                }
            ],
            "name": "horseSelectedEvent",
            "type": "event"
        }
    ]
  }