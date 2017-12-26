gOptions = {
    //Put contract address here
<<<<<<< HEAD
    address: '0xa8f3e0b7b5365b10417b29d631cb1b6e830edb08',
=======
    address: '0x4dcdb8903509c50372b9a4a7b1e25519fe36d04b',
>>>>>>> ef05b8fd466c28231929e17bb8eb1464916443b6

    //Put ABI here
    abi: [
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
                }
            ],
            "name": "hippoEvent",
            "type": "event"
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
        }
    ]
  }