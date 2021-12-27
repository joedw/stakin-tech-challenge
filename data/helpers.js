const Big = require('big.js');

function convertGweiExp(exp){
    // exp = '1.0430118953629498e+26';
    var beeeg = new Big(exp);
    var exparr = exp.split('+');

    var retno = beeeg.div(1000000000000000000).toFixed(3);
    console.log('beeeg:',beeeg.div(1000000000000000000).toFixed(3));
    //exp = exparr[0] + '+' + powno;
   return retno;


}
console.log('convertGweiExp()',convertGweiExp('1.0430118953629498e+26'));
module.exports.convertGweiExp = convertGweiExp;

//const {Helper} = require('helpers.js);