# Hippodrome-Dapp
Simple Dapp. Horse race simulator. Bet and win Ethereum.    
Minimum bet amount is initialized during contract creation.  
When threshold value, amount of bets, is reached (default is 10 bets), random horse is selected and all the Ethereum received will be divided between winners and transferred to them.
It is possible to change this value for now in test purpose.  

You need runing Ethereum client like ```testrpc```

### 1. Init node and install web3.js, truffle

```
npm init  
npm install ethereum/web3.js --save
npm install -g truffle
```

### 2. run truffle commands

```
truffle compile
truffle migrate
```

### 3. Start app
```
npm run dev
```


