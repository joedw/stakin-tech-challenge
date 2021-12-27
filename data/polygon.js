const axios = require('axios');
const apiconfig = require('./apiconfig.json');
const Big = require('big.js');
function convertGweiExp(exp,decimals){
     var beeeg = new Big(exp);
  
    var retno = beeeg.div(1000000000000000000).toFixed(decimals);
   // console.log('beeeg:',beeeg.div(1000000000000000000).toFixed(decimals));
    return retno;

}
function getStakingMatic(address) {
  var promise = new Promise(function (resolve, reject) {

    var urlpolygon= apiconfig.polygonurl;
    let retobj = { stakeamt : 0,stakerewardsamt : 0};

    axios.get(urlpolygon ).then(res => {
  
      res.data.result.forEach((delg) => {

        if (delg.address == address){
        //  console.log('delegator stake :',convertGweiExp(delg.stake.toString(),2));
          retobj.stakeamt = convertGweiExp(delg.stake.toString(),2);
          retobj.stakerewardsamt = convertGweiExp(delg.claimedReward.toString(),2);

         console.log('delegator retobj :',retobj);
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

getStakingMatic('0x325c13ec4f14bfb6bee50b14adbcb25afcaf5a01').then(function(delg){

    console.log(delg)
 });