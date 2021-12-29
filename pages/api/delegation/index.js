import { apiHandler, delgsRepo, omit } from 'helpers/api';


export default apiHandler({
    get: getDelgs
    });

function getDelgs(req, res) {
    //.filter(x => x.userid==userSubject.value.id);
    const delgs = delgsRepo.getAll();
    const response = delgs ? delgs : [];
    return res.status(200).json(response);
}
