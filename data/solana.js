const web3 =require('@solana/web3.js');
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


var pk = 'xPrCrPNL5ZpbZe2yDUVf8LJBHaoPJ8YkC6SVE3sa1pM';

var urlbeach = 'https://prod-api.solana.surf/v1/account/@pk/transactions?'.replace('@pk',pk);

console.log('beach',urlbeach);


const axios = require('axios');

async function makeRequest() {

    const config = {
        method: 'get',
        url: urlbeach 
    };

    let res = await axios(config);

    //console.log(res.data);
    res.data.forEach((trans) => {
    // console.log(trans.instructions);
      trans.instructions.forEach((element) => {

        var stakedSol = 0;
        if(element.parsed.Withdraw ){

          stakedSol = (element.parsed.Withdraw.lamports/1000000000).toFixed(2);
          console.log('stakedSol :',stakedSol);;
          //console.log(stakedSol);
        }
      
      });
    });
}

makeRequest();

