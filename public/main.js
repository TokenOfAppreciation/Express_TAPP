let TAPabi = [ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string", "value": "Token of Appreciation" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "isValidated", "outputs": [ { "name": "", "type": "bool", "value": true } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_fromAddress", "type": "address" }, { "name": "_recipientAddress", "type": "address" } ], "name": "validate", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_newTimeInterval", "type": "uint256" } ], "name": "setTimeInterval", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_recipientAddress", "type": "address" } ], "name": "tap", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256", "value": "1" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string", "value": "TAP" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" }, { "indexed": false, "name": "receiver", "type": "address" } ], "name": "Tapped", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "validatedAddress", "type": "address" } ], "name": "Validated", "type": "event" } ];
let TAPaddress = "0x6e4f912249890FF662582D2b08C0891586aee742";

let TAP;
let tap;

const Controller = {
  setCurrentAccount : (account) => {
    document.getElementById('UserAddress').innerHTML = account;
  }
  , setBlockNumber : (bs, blocknumber) => {
    document.getElementById('CurrentBlock').innerHTML = blocknumber;
  }
  , setTimeSinceLastBlock : (timeSinceLastBlock) => {
    document.getElementById('TimeSinceLastBlock').innerHTML = timeSinceLastBlock + " s";
  }
  , setNetwork : (network) => {
    document.getElementById('Network').innerHTML = network;
  }
  , setValidated : (validated) => {
    document.getElementById('UserValidated').innerHTML = validated;
  }
  , setBalance : (balance) => {
    document.getElementById('UserBalance').innerHTML = balance;
  }
  , addEvent : (sender, receiver) => {
    dnEventWatcher = document.getElementById('EventWatcher');
    dnNewEntry = document.createElement('li');
    dnNewEntry.innerHTML = sender + "=>" + receiver;
    dnNewEntry.classList.add('list-group-item');
    dnEventWatcher.appendChild(dnNewEntry);
  }
  , initTimer : () => {
    let seconds = 0;
    if (Controller.timer){
      clearInterval(Controller.timer);
    }
    Controller.timer = setInterval(()=>{
      seconds += 1;
      Controller.setTimeSinceLastBlock(seconds);
    },1000);
  }
  , init : () => {
    // -- init -------
    Controller.setCurrentAccount(web3.eth.accounts[0]);
    web3.eth.getBlockNumber(Controller.setBlockNumber);
    Controller.setNetwork(web3.version.network);
    Controller.initTimer();

    //-- update on block ------
    let filter = web3.eth.filter('latest');
    let subscription = filter.watch(function(err,res){
      if (!err){
        Controller.initTimer();
        web3.eth.getBlockNumber(Controller.setBlockNumber);
      } else {
        console.log(err);
      }
    });
  }
  , timer : null
  ,
};

//---------------------------------------------------------------------



window.addEventListener('load', function() {
  // Initialize connection to existing Web3 provider
  if ((typeof web3 !== 'undefined') && (web3.version.network === '4')) {
    console.log("Using external provider on Rinkeby.");
    // web3.currentProvider = new Web3.providers.HttpProvider('http://rinkeby.infura.io/3YTOIgEH760BLrrJK0tm');
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("TAP is only accessible via the Rinkeby-Testnet");
  }

  // Initialize Contract
  TAP = web3.eth.contract(TAPabi);
  tap = TAP.at(TAPaddress);

  let defaultAccount = web3.eth.defaultAccount;
  if (!defaultAccount){
    web3.eth.defaultAccount = web3.eth.accounts[0];
  }

  tap.isValidated(web3.eth.accounts[0], (error, result)=>{
    if (!error){
      if(result){
        Controller.setValidated("True");
      } else {
        Controller.setValidated("False");
      }
    } else {
      Controller.setValidated("There was an error retrieving your status.");
    }
  });

  tap.balanceOf(web3.eth.accounts[0], (error, result)=>{
    if(!error){
      Controller.setBalance(result);
    } else {
      console.log(error);
    }
  });

  // ----- tapped
  let tapEvent = tap.Tapped({},{fromBlock: 0, toBlock: 'latest'});
  tapEvent.get(function(err,res){
    if (!err){
      res.forEach((transaction)=>{
        if ((transaction.args.sender === web3.eth.accounts[0]) || (transaction.args.receiver === web3.eth.accounts[0])){
        Controller.addEvent(transaction.args.sender, transaction.args.receiver);
        }
      });
    } else {
      console.log(err);
    }
  });

  tapEvent.watch(function(err,res){
    if (!err){
        res.forEach((transaction)=>{
          if ((transaction.args.sender === web3.eth.accounts[0]) || (transaction.args.receiver === web3.eth.accounts[0])){
            Controller.addEvent(transaction.args.sender, transaction.args.receiver);
          }
        });
    } else {
      console.log(err);
    }
  });



  // TAP.isValidated().call('0x09F96270d12172633501D446F0f61B2E6d61d2d0', (err, res)=>{
  //   if (!err){
  //     console.log('Hi');
  //   } else {
  //     console.log('Not hi.');
  //   }
  // });
  // let validatedData = tap.tap.getData('0xb69c96892c39f647908bf6abf803099e93f85839');
  // console.log(validatedData);
  // let txObject = {
  //   "from" : "0x09F96270d12172633501D446F0f61B2E6d61d2d0"
  //   , "data" : validatedData
  // }
  // web3.eth.call(txObject, console.log);

  // 0x09F96270d12172633501D446F0f61B2E6d61d2d0
  // Initialize GUI
  Controller.init();
});

// document.getElementById('debug').addEventListener('click', function(){
//
// });
