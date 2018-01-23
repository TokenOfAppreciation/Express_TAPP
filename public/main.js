let TAPabi = [ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string", "value": "Token of Appreciation" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "isValidated", "outputs": [ { "name": "", "type": "bool", "value": true } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_fromAddress", "type": "address" }, { "name": "_recipientAddress", "type": "address" } ], "name": "validate", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_newTimeInterval", "type": "uint256" } ], "name": "setTimeInterval", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_recipientAddress", "type": "address" } ], "name": "tap", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256", "value": "1" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string", "value": "TAP" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" }, { "indexed": false, "name": "receiver", "type": "address" } ], "name": "Tapped", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "validatedAddress", "type": "address" } ], "name": "Validated", "type": "event" } ];
let TAPaddress = "0x6e4f912249890FF662582D2b08C0891586aee742";

let TAP;
let tap;

ContractHandler = {
  initIndex : function (){
    ContractHandler.initWeb3();
    ContractHandler.initContract();
    ContractHandler.initDefaultAccount();
    ContractHandler.initSendTapListener();
    ContractHandler.initTapEventListener();
    ContractHandler.updateAll();
  }
  , initAssign : () => {
    ContractHandler.initWeb3();
    ContractHandler.initDefaultAccount();
  }
  , initContract : function (){
    // Initialize Contract
    TAP = web3.eth.contract(TAPabi);
    tap = TAP.at(TAPaddress);
  }
  , initWeb3 : function () {
    // Initialize connection to existing Web3 provider
    if ((typeof web3 !== 'undefined') && (web3.version.network === '4')) {
      console.log("Using external provider on Rinkeby.");
      // web3.currentProvider = new Web3.providers.HttpProvider('http://rinkeby.infura.io/3YTOIgEH760BLrrJK0tm');
      window.web3 = new Web3(web3.currentProvider);
    } else {
      console.warn("TAP is only accessible via the Rinkeby-Testnet");
    }
  }
  , initDefaultAccount : function () {
    // Set default Account
    let defaultAccount = web3.eth.defaultAccount;
    if (!defaultAccount){
      web3.eth.defaultAccount = web3.eth.accounts[0];
    }
  }
  , checkValidation : function () {
    tap.isValidated(web3.eth.accounts[0], (error, result)=>{
      if (!error){
        if(result){
          ViewController.setValidated("True");
        } else {
          ViewController.setValidated("False");
        }
      } else {
        ViewController.setValidated("There was an error retrieving your status.");
      }
    });
  }
  , checkBalance : function () {
    tap.balanceOf(web3.eth.accounts[0], (error, result)=>{
      if(!error){
        ViewController.setBalance(result);
      } else {
        console.log(error);
      }
    });
  }
  , initTapEventListener : function () {
    // ----- tapped
    let tapEvent = tap.Tapped({},{fromBlock: 0, toBlock: 'latest'});
    tapEvent.get(function(err,res){
      if (!err){
        res.forEach((transaction)=>{
          if ((transaction.args.sender === web3.eth.accounts[0]) || (transaction.args.receiver === web3.eth.accounts[0])){
          ViewController.addEvent(transaction.args.sender, transaction.args.receiver);
          }
        });
      } else {
        console.log(err);
      }
    });
    tapEvent.watch(function(err,res){
      if (!err){
          console.log(res);
          res.forEach((transaction)=>{
            if ((transaction.args.sender === web3.eth.accounts[0]) || (transaction.args.receiver === web3.eth.accounts[0])){
              ViewController.addEvent(transaction.args.sender, transaction.args.receiver);
            }
          });
      } else {
        console.log(err);
      }
    });
  }
  , initSendTapListener : function (){
    //----Send TAP Button
    document.getElementById("SendTAP").addEventListener("click", function(){
      if(web3.isAddress(document.getElementById("ReceiverAddress").value)) {
        let receiverAddress = document.getElementById("ReceiverAddress").value;
        //let senderAddress = web3.eth.defaultAccount;
        tap.tap(receiverAddress, {gas: 200000}, (error, result) =>{
          if (!error){
            let txHash = result;
            console.log(txHash);
          } else {
            console.log('Ooops, something went wrong')
          }
        });
      } else {
        console.log("Please enter a valid Ethereum Address")
      }
    });
  }
  , updateAll : function () {
    ContractHandler.checkValidation();
    ContractHandler.checkBalance();
  }
}

//-------------------------------------------------

const ViewController = {
  setCurrentAccount : (account) => {
    document.getElementById('UserAddress').innerHTML = account;
  }
  ,setCurrentAccountForm : (account) => {
    document.getElementById('UserAddressForm').value = account;
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
  , initRefreshButtonListener : () => {
    document.getElementById('refresh-address').addEventListener("click", function(){
      console.log('refreshed');
      ViewController.setCurrentAccountForm(web3.eth.accounts[0]);
    })
    console.log(document.getElementById('refresh-address'));
  }
  , initTimer : () => {
    let seconds = 0;
    if (ViewController.timer){
      clearInterval(ViewController.timer);
    }
    ViewController.timer = setInterval(()=>{
      seconds += 1;
      ViewController.setTimeSinceLastBlock(seconds);
    },1000);
  }
  , initIndex : () => {
    // -- init -------
    ViewController.setCurrentAccount(web3.eth.accounts[0]);
    web3.eth.getBlockNumber(ViewController.setBlockNumber);
    ViewController.setNetwork(web3.version.network);
    ViewController.initTimer();

    //-- update on block ------
    let filter = web3.eth.filter('latest');
    let subscription = filter.watch(function(err,res){
      if (!err){
        ViewController.initTimer();
        web3.eth.getBlockNumber(ViewController.setBlockNumber);
        ContractHandler.updateAll();
      } else {
        console.log(err);
      }
    });
  }
  , initAssign : () => {
    ViewController.initRefreshButtonListener();
    ViewController.setCurrentAccountForm(web3.eth.accounts[0]);
  }
  , timer : null
  // , fillAddressChooser : () =>{
  //   let dnAddressChooser = document.getElementById('MetaMaskAddressChooser');
  //   let lsAccounts = web.eth.accounts;
  //   console.log(lsAccounts);
  //   web.eth.accounts.forEach((account)=>{
  //     let dnNewEntry = document.createElementByTagName('option');
  //     console.log(account);
  //     dnNewEntry.innerHTML = account;
  //     console.log(dnNewEntry);
  //     dnAddressChooser.appendChild(dnNewEntry);
  //   });
  // }
};

//---------------------------------------------------------------------

window.addEventListener('load', function() {
  // get body tag
  dnBody = document.getElementsByTagName('body');

  if (dnBody[0].className === 'index'){
    console.log("I'm on the index page.");
    ViewController.initIndex();
    ContractHandler.initIndex();
  } else if (dnBody[0].className === 'assign') {
    console.log("I'm on the assignment page.");
    ViewController.initAssign();
    ContractHandler.initAssign();
  }


});




//---- Debug button
// document.getElementById('debug').addEventListener('click', function(){
//
// });
