// Validate request
export function validateRequest(validationObj) {
    return async (ctx, next) => {
        // stubbed out - here is where the request will be validated
        if (ctx.request.body && validationObj.body) {
            console.log('Validated Post request')
        }
        return next()
    }
}