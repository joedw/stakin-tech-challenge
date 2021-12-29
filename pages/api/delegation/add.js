const bcrypt = require('bcryptjs');

import { apiHandler, delgsRepo } from 'helpers/api';

export default apiHandler({
    post: add
});

function add(req, res) {
    // split out password from user details 
    const { ...delg } = req.body;

    // validate
    if (delgsRepo.find(x => x.address=== delg.address && x.chain === delg.chain))
        throw `Address : "${delg.address}" already exists on chain :"${delg.chain}"`;

    switch(delg.chain){
        case "Polygon" : delg["coin"] = "MATIC";break;
        case "Solana" : delg["coin"] = "SOL";break;
    }
    delg.userid = Number(delg.userid);
  

    delgsRepo.create(delg);
    return res.status(200).json({});
}
