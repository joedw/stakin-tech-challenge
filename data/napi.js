const addruser = '0x325c13ec4f14bfb6bee50b14adbcb25afcaf5a01'; //     '0x2f50b1ec6111ac19f5873d34fbe5e1d784c25dbf';
const addrPolygonStaking = '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0'; //Polygon Staking contract addr TODO find all ValidatorShareAddr SmartContract Addr verify ?.
const ValidatorShareAddr = '0xC7757805B983eE1b6272c1840c18e66837dE858E';
const apiconfig = require('./apiconfig.json');
//var api = require('etherscan-api').init(apiconfig.ethapikey);
const fs = require('fs');
const express = require('express');
const axios = require('axios');
const app = express();
const delgfile = '/home/moses/Projects/stakin-tech-challenge/data/delgs.json';
const Big = require('big.js');
var urlbeach = apiconfig.solanabeachapiurl.replace('@pk', apiconfig.stakinsolvotingaddress);
var token = apiconfig.solanabeachtoken;
const instance = axios.create({
  baseURL: urlbeach,
  timeout: 1000,
  headers: {
    'Authorization': 'Bearer ' + token
  }
});


function convertGweiExp(exp, decimals) {
  var beeeg = new Big(exp);

  var retno = beeeg.div(1000000000000000000).toFixed(decimals);
  // console.log('beeeg:',beeeg.div(1000000000000000000).toFixed(decimals));
  return Number(retno);

}

function getStakingMatic(address, id) {
  var promise = new Promise(function (resolve, reject) {

    var urlpolygon = apiconfig.polygonurl;
    var retobj = {
      id :0,
      stakeamt: 0,
      stakerewardsamt: 0
    };

    axios.get(urlpolygon).then(res => {

      res.data.result.forEach((delg) => {

        if (delg.address == address) {
          //  console.log('delegator stake :',convertGweiExp(delg.stake.toString(),2));
          retobj.stakeamt = convertGweiExp(delg.stake.toString(), 2);
          retobj.stakerewardsamt = convertGweiExp(delg.claimedReward.toString(), 2);
          retobj.id = id;
          console.log('delegator retobj :', retobj);
          resolve(retobj);
        }


      });
    });

    //resolve(0);

  }).catch(err => {
    console.log('Error in getStakingMatic method api ', err.message);
    reject(err.message);
  });

  return promise;

}

function getStakingAmtSolana(address,id) {
  var promise = new Promise(function (resolve, reject) {
    var retobj = {
      id :0,
      stakeamt: 0,
      stakerewardsamt: 0
    };
    instance.get('/delegators?limit=1000&offset=0').then(res => {

      res.data.forEach((delg) => {
        if(delg.pubkey == address){
          var stakedSol = Number(delg.data.stake.delegation.stake);
          stakedSol = (stakedSol / 1000000000);
          console.log('stakedSol :', stakedSol);
          retobj.stakeamt = stakedSol;
          retobj.stakerewardsamt = 0;
          retobj.id = id;
          resolve(retobj);

        }
      
      });
    });

  }).catch(err => {
    console.log('Error in getStakingAmtSolana method eth api ', err.message);
    reject(err.message);
  });

  return promise;

}
function done(delgs){
    fs.writeFileSync('../data/delgs.json', JSON.stringify(delgs, null, 4));
    console.log('New file written .Done', delgs);
    console.log("Cron Job GetStakingAmts DONE, Ran at " + new Date());
// console.log("Every 60 secondes");
return delgs;

}
async function getAddAllStakingAmounts(callback) {

    let proms = [];
    let newdelgs = [];
    let delg = {};

    let delgs = require('../data/delgs.json');
   // console.log('delgs found', delgs);
    for (var i = 0; i < delgs.length; i++) {
      delg = delgs[i];
      if (delg.chain == 'Polygon') {
        proms.push(getStakingMatic(delg.address,delg.id));

      }
      if (delg.chain == 'Solana') {
        proms.push(getStakingAmtSolana(delg.address, delg.id));
      }
    }
   
        Promise.all(proms).then(values => {
          //setTimeout(myGreeting, 5000)
          console.log('values found', values);
            for (var j = 0; j < values.length; j++) {
              delg = delgs.filter(function(x){ return x.id==values[j].id;}); 
              delg = delg[0];  
              console.log('value found', values[j]);
              delg["amt"] = values[j].stakeamt ? values[j].stakeamt : 0;
              delg["stakingrewardsamt"] = values[j].stakerewardsamt ? values[j].stakerewardsamt : 0;
              console.log('delg found', delg);
              newdelgs.push(delg);

            }
                
             callback(newdelgs);
   
            }).catch(function (err) {
              console.log('err proms all', err.message);
              callback('Error' + err.message);
          });

      

  
    }
     //getAddAllStakingAmounts(done);

      

    const cron = require('node-cron');
    cron.schedule('*/1 * * * *', () => {

      console.log("Task is running every 1 minuteS " + new Date());
      getAddAllStakingAmounts(done);


    });
    app.listen(2400, () => {
      console.log("Server started at port 2400")
    });

   