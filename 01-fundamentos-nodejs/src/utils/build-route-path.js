
// /users/:id
export function buildRoutePath(path) {
    // regex é uma expressão regular
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const paramsWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    //return new RegExp()

    const pathRegex = new RegExp(`^${paramsWithParams}(?<query>\\?(.*))?$`)

   // pathRegex.test

    return pathRegex

}