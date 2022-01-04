const Joi = require('joi');

const registerValidation = (data)=>{
    
    const schema =Joi.object({

        name: Joi.string().min(6).max(20).required().messages({
            'string.base': `"Name" should be a type of 'text'`,
            'string.empty': `"Name" cannot be empty`,
            'string.min': `"Name" should have a minimum {#limit} character!`,
            'string.max': `"Name" should have a maximum {#limit} character!`,
            'any.required': `"Name" is required `
          }),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
        password: Joi.string()
                     .min(6)
                     .required()
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;