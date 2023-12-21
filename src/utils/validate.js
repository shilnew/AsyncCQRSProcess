import Joi from 'joi'
// Validate request
export function validateRequest(validationObj) {
    return async (ctx, next) => {
        try {
            // here is where the request body will be validated
            if (ctx.request.body && validationObj.body) {
                validateObject(ctx.request.body, 'Request Body', validationObj.body)
                console.log('Validated Post request')
            }
            return next()
        } catch (err) {
            ctx.throw(400, err.message)
        }
    }
}

function validateObject(object = {}, label, schema, options) {
    // Skip validation if no schema is provided
    if (schema) {
      // Validate the object against the provided schema
      const { error } = Joi.object().keys(schema).validate(object, options)
      if (error) {
        // Throw error with custom message if validation failed
        throw new Error(`Invalid ${label} - ${error.message}`)
      }
    }
  }