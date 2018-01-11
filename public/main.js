const web3 = require('web3');

const TAPP = {


window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined' && web3.version.network === 4) {
    console.log("Using external provider on Rinkeby.");
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("TAP is only accessible via the Rinkeby-Testnet"); //mostly for testing&debugging
    //window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }
}

}
