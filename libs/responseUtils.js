export function responseError(error, res, code = 501) {
    console.error(error);
    res.status(code).send({msg: error.message});
}

export function responseCreate(data, res) {
    res.status(201).send({id: data.id});
}

export function responseUpdate(id, res) {
    res.status(200).send({id});
}

export function responseHttpOk(data, res) {
    res.status(200).send(data);
}