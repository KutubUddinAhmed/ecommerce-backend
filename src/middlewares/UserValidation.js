const joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = joi
    .object({
      user_first_name: joi.string().min(3).max(20).required(),
      user_last_name: joi.string().min(3).max(20).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).optional().messages({
        "string.min": "Password must be at least 6 characters long",
      }),
      confirm_password: joi
        .string()
        .valid(joi.ref("password"))
        .optional()
        .messages({ "any.only": "Passwords do not match" }),
      google_id: joi
        .string()
        .optional()
        .messages({ "string.base": "Google ID must be a string" }),
    })
    .custom((value, helpers) => {
      if (!value.password && !value.google_id) {
        return helpers.error("any.custom", {
          message: "Either password or Google ID must be provided",
        });
      }
      if (value.password && value.google_id) {
        return helpers.error("any.custom", {
          message: "Both password and Google ID cannot be provided together",
        });
      }
      return value;
    });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ msgs: "Validation Error", errors: error.details });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).when("google_id", {
      is: joi.exist(),
      then: joi.optional(),
      otherwise: joi.required(),
    }),
    google_id: joi.string().when("password", {
      is: joi.exist(),
      then: joi.optional(),
      otherwise: joi.required(),
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ msgs: "Bad Request", error: error.details });
  }
  next();
};

module.exports = { signupValidation, loginValidation };
