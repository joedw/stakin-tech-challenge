const axios = require('axios');
const apiconfig = require('./apiconfig.json');
function convertGweiExp(exp){
    var beeeg = new Big(exp);
    var exparr = exp.split('+');

    var retno = beeeg.div(1000000000000000000).toFixed(3);
    console.log('beeeg:',beeeg.div(1000000000000000000).toFixed(3));
    //exp = exparr[0] + '+' + powno;
   return retno;

}
function getStakingMatic() {
  var promise = new Promise(function (resolve, reject) {

    var urlpolygon= apiconfig.polygonurl;
    
    axios.get(urlpolygon).then(res => {
  
      res.data.forEach((delgs) => {
     
        delgs.forEach((delg) => {
            console.log('stakedSol :',delg);
                resolve(delg);
           });
        });
    });
 

  }).catch(err => {
    console.log('Error in getStakingMatic method api ', err.message);
    reject(err.message);
  });

  return promise;

}

getStakingMatic().then(function(delg){

    console.log(delg)
 });