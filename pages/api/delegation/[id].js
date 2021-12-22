import {
    apiHandler
} from 'helpers/api';
import {
    delgsRepo,
    omit
} from 'helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

function getById(req, res) {
    const delg = delgsRepo.getById(req.query.id);

    if (!delg) throw 'Address Not Found';

    return res.status(200).json(delg);
}

function update(req, res) {
    const delg = delgsRepo.getById(req.query.id);

    if (!delg) throw 'Address Not Found';

    // split out password from delg details 
    const {
        password,
        ...params
    } = req.body;

    // validate
    if (delg.address !== params.address && delgsRepo.find(x => x.address === params.address))
        throw `Address with the address "${params.address}" already exists`;





    delgsRepo.update(req.query.id, params);
    return res.status(200).json({});
}

function _delete(req, res) {
    delgsRepo.delete(req.query.id);
    return res.status(200).json({});
}