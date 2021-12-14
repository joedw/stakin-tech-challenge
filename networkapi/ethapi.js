const addruser = '0x2f50b1ec6111ac19f5873d34fbe5e1d784c25dbf';
const addrPolygonStaking = '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0'; //Polygon Staking contract addr
const ValidatorShareAddr = '0x9bd39D50959FF344d5Da483D7Fe23a2D164C2A64';
//0x6dd150e055bdd64f2e74b82e9856ce7c5acfb737
var api = require('etherscan-api').init('IUFJW3T1H3BW8HA3ZF6NYDKJVANWISJ3MT');
// var balance = api.account.balance(addr);
// balance.then(function(balanceData){
//   console.log('Balance:',balanceData);
// });
//  var transactions = api.account.txlist(addruser);
//  var thash = '';
//  transactions.then(function(transData){
//   // console.log(transData.result);
//   // var keys = Object.keys(transData);
//    //console.log('Props:',keys);
//    //var trans = JSON.parse(transData[0]);
//     var trans2 =  transData.result.filter(function (el) {
//       //return el.hash == '0x892eb652cd7106eba9f0264edd16b34aa137c522bd7d3bdc0e9a8cf129f5d189';
//       //return el.hash == '0x892eb652cd7106eba9f0264edd16b34aa137c522bd7d3bdc0e9a8cf129f5d189';
//       return el.to.toLowerCase() == ValidatorShareAddr.toLowerCase();
//     });
//    // console.log('Transaction',trans2);
//     tblock = trans2.block;
//   });
var tokentransfers = api.account.tokentx(addruser)
tokentransfers.then(function (transferData) {
  //   console.log('Token Transfers:',transferData.result);
  //   var keys = Object.keys(transferData);
  //   console.log('Props:',keys);
  var trans3 = transferData.result.filter(function (el) {
    //return el.hash == '0x892eb652cd7106eba9f0264edd16b34aa137c522bd7d3bdc0e9a8cf129f5d189';
    // return el.blockNumber  ==  tblock ;
    return el.contractAddress.toLowerCase() == ValidatorShareAddr.toLowerCase();
  });
  console.log('Transaction', trans3);
  if (trans3 && trans3.length > 0) {
    var delvalue = Number(trans3[0].value);
    delvalue = Math.floor(delvalue / 1000000000000000000);
    console.log('Transaction Value', delvalue);
  } else {
      console.log('Nothing Found');

  }
});