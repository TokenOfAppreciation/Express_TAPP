const web3 = require('web3');

const TAPP = {


window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    console.log("Using external provider.");
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log("Using default provider"); //mostly for testing&debugging
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }
}

}
