# Hippodrome-Dapp
Simple Dapp. Horse race simulator. Bet and win Ethereum  
Minimum bet amount is initialized during contract creation.  
When threshold value, amount of bets, is reached (default is 10 bets), random horse is selected and all the Ethereum received will be divided between winners and transferred to them.
It is possible to change this value for now in test purpose.  

You need runing Ethereum client like ```testrpc```

### 1. Add contract address and ABI to properties.js

```
gOptions = {
    //Put contract address here
    address: '0xa8f3e0b7b5365b10417b29d631cb1b6e830edb08',

    //Put ABI here
    abi: [
        {
            "constant": true,
            "inputs": [],
            "name": "totalBet",
            "outputs": [
               ....
    ]
    
  }
```

### 2. Init node and install web3.js

```npm init
npm install ethereum/web3.js --save
```

### 3. Run index.html in browser

### 4. To do:
- upgrade UI
- add truffle
- add vue.js
- 
- 
- 

