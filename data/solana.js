//const web3 =require('@solana/web3.js');
//https://api.devnet.solana.com
//https://docs.solana.com/cluster/rpc-endpoints

// Connect to cluster
//   var connection = new web3.Connection(
//     web3.clusterApiUrl('devnet'),
//     'confirmed',
//   );
// var rpcurl =  web3.clusterApiUrl('devnet');
// console.log(rpcurl);
// var connection = new web3.Connection('https://api.devnet.solana.com');

// //console.log(connection);
// var stakingwalletaddress ='2RRBCVLXQYJWqaut9zFdwWJmrQbXg4xqmReLiCWfE7o4';
// var pkey = new web3.PublicKey(stakingwalletaddress);
// async function checkAccount(){
//     let account = await connection.getAccountInfo(pkey);
//     console.log(account);

// }
//checkAccount();
const apiconfig = require('./apiconfig.json');

var pk_del = 'xPrCrPNL5ZpbZe2yDUVf8LJBHaoPJ8YkC6SVE3sa1pM';

var urlbeach = apiconfig.solanabeachapiurl.replace('@pk', apiconfig.stakinsolvotingaddress);

console.log('beach', urlbeach);


const axios = require('axios');
var token = apiconfig.solanabeachtoken;
async function makeRequest() {

  // const config = {
  //   method: 'get',
  //   url: urlbeach,
  //   headers: {
  //     'Authorization': 'bearer ' + token
  //   }
  // };

  // let res = await axios(config);

  // console.log(res.data);
  // res.data.forEach((trans) => {
  //   console.log('trans :', trans);
  //   // trans.instructions.forEach((element) => {

  //   //   var stakedSol = 0;
  //   //   if(element.parsed.Withdraw ){

  //   //     stakedSol = (element.parsed.Withdraw.lamports/1000000000).toFixed(2);
  //   //     console.log('stakedSol :',stakedSol);;
  //   //     //console.log(stakedSol);
  //   //   }

  //   // });
  // });


  const instance = axios.create({
    baseURL: urlbeach,
    timeout: 1000,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  instance.get('/delegators?limit=1000&offset=0')
    .then(res => {
     // console.log(res.data);
   

      res.data.forEach((delg) => { 

        if(delg.pubkey == pk_del){
          var stakedSol = Number(delg.data.stake.delegation.stake)
          stakedSol = (stakedSol / 1000000000);
          console.log('stakedSol :', stakedSol);
          //console.log(delg.data.stake.delegation.stake);
          //elg.data.stake.delegation.stake
        }
      });
      //response.data[0].pubkey
      //return response.data;
    })
}

makeRequest();