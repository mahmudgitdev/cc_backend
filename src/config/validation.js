const Joi = require('joi');

const registerValidation = (data)=>{
    
    const schema =Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
        password: Joi.string()
                     .min(6)
                     .required()
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;