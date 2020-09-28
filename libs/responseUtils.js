export function responseError(error, res, code = 501) {
    res.status(code).send({msg: error.message})
}