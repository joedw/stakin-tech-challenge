import { apiHandler, delgsRepo, omit } from 'helpers/api';

export default apiHandler({
    get: getDelgs()
    });

function getDelgs(req, res) {
    // return users without hashed passwords in the response
    const response = delgsRepo.getAll();
    return res.status(200).json(response);
}
