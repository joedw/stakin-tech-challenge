const addruser = '0x325c13ec4f14bfb6bee50b14adbcb25afcaf5a01'; //     '0x2f50b1ec6111ac19f5873d34fbe5e1d784c25dbf';
const addrPolygonStaking = '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0'; //Polygon Staking contract addr TODO find all ValidatorShareAddr SmartContract Addr verify ?.
const ValidatorShareAddr = '0xC7757805B983eE1b6272c1840c18e66837dE858E';
const apiconfig = require('./apiconfig.json');
var api = require('etherscan-api').init(apiconfig.ethapikey);
const fs = require('fs');
const express = require('express');
   const axios = require('axios');
const app = express();
const delgfile = '/home/moses/Projects/stakin-tech-challenge/data/delgs.json';
//const delgfile = rootfolder + '/data/delgs.json';

function getStakingAmtETH(address) {
  var promise = new Promise(function (resolve, reject) {
    api = require('etherscan-api').init(apiconfig.ethapikey);
    var tokentransfers = api.account.tokentx(address);
    var delvalue = 0;
    tokentransfers.then(function (transferData) {
      //   console.log('Token Transfers:',transferData.result);
      //   var keys = Object.keys(transferData);
      //   console.log('Props:',keys);
      var trans3 = transferData.result.filter(function (el) {

        // TODO Function with More logic to calculate real staking value , balance of all transactions Restaked and Rewards taken  ;
        return el.contractAddress.toLowerCase() == ValidatorShareAddr.toLowerCase();
      });
      //console.log('Transaction', trans3);
      if (trans3 && trans3.length > 0) {
        delvalue = Number(trans3[0].value);
        delvalue = Math.floor(delvalue / 1000000000000000000);
        console.log('Transaction Value', delvalue);
        resolve(delvalue);

      } else {
        console.log('Nothing Found getStakingAmtETH');
        resolve(delvalue);
      }
    }).catch(err => {
      console.log('Error in Transfer Token method eth api ', err.message);
      reject(err.message);
    });

  });
  return promise;

}

 function getStakingAmtSolana(address) {
  var promise = new Promise(function (resolve, reject) {

    var urlbeach = apiconfig.solanabeachapiurl.replace('@pk',address);
    
    axios.get(urlbeach ).then(res => {

      res.data.forEach((trans) => {
        // console.log(trans.instructions);
          trans.instructions.forEach((element) => {
    
            var stakedSol = 0;
            if(element.parsed.Withdraw ){
              stakedSol =Number(element.parsed.Withdraw.lamports.toFixed(2));
              stakedSol =(stakedSol/1000000000);
              console.log('stakedSol :',stakedSol);
              resolve(stakedSol);
            }
          
          });
        });
});
 
    //resolve(0);

  }).catch(err => {
    console.log('Error in getStakingAmtSolana method eth api ', err.message);
    reject(err.message);
  });

  return promise;

}

async function getAddAllStakingAmounts() {

  let proms = [];
  let newdelgs = [];
  let delg = {};
  // let rawdata = fs.readFileSync(delgfile);

  //var delgs = JSON.parse(rawdata);
  let delgs = require('../data/delgs.json');
  //let delgs = require('data/delgs.json');
  for (var i = 0; i < delgs.length; i++) {
    delg = delgs[i];
    if (delg.chain == 'polygon') {
      proms.push(getStakingAmtETH(delg.address));

    }
    if (delg.chain == 'solana') {
      proms.push(getStakingAmtSolana(delg.address));
    }
  }
  var promise = new Promise(function (resolve, reject) {

    Promise.all(proms).then(function (values) {
      for (var i = 0; i < delgs.length; i++) {
        delg = delgs[i];
        if (values[i]) {
          delg.amt = values[i];
        }
        newdelgs.push(delg);
      }
      // console.log('done?');
      //fs.unlink(delgfile, (err) => {
      //  if (err) throw err;
      //  console.log('File successfully deleted');
      fs.writeFileSync('../data/delgs.json', JSON.stringify(newdelgs, null, 4));
      console.log('New file written .Done', newdelgs);
      //return newdelgs;
      resolve(newdelgs)

      // });
      // fs.writeFile('../data/delgs.json', JSON.stringify(newdelgs, null, 4));
      // console.log('Done');
      //   resolve(newdelgs);
    }).catch(function (err) {
      // console.log('err', err);
      reject('Error');
    });

  });

  return promise;

}
// getAddAllStakingAmounts().then(function(delgs){

//     console.log(delgs)
//  });

setInterval(function () {
  getAddAllStakingAmounts().then(function (delgs) {

    console.log(delgs)
  });
  console.log("Every 30 secondes");
}, 30000);
console.log("now");
// export const napi = {
//   getAddAllStakingAmounts

// };
// module.exports = {
//   getAddAllStakingAmounts:  (delgs) =>{
//     return getAddAllStakingAmounts(delgs);
//   }
// };


const cron = require('node-cron');
cron.schedule('*/1 * * * *', () => {
  console.log("Task is running every 1 minuteS " + new Date());
  getAddAllStakingAmounts().then(function (delgs) {

    console.log("Cron Job GetStakingAmts Ran at " + new Date(),delgs);
  });
});
app.listen(2400, () => {
  console.log("Server started at port 2400")
});

//TODO Later check this code if usable

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