/* eslint-disable class-methods-use-this */
import Joi from 'joi';
import User from '../models/userModel';
import status from '../helpers/StatusCode';


class UserController {
    signUp = (req, res) => {
      // validation using JOI npm
      const schema = {
        first_name: Joi.string().alphanum().required(),
        last_name: Joi.string().alphanum().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        address: Joi.string().required(),
        bio: Joi.string().required(),
        occupation: Joi.string().required(),
        expertise: Joi.string().required(),
        is_mentor: Joi.boolean().default(false),
        is_admin: Joi.boolean().default(false),
      };
      const result = Joi.validate(req.body, schema);
      if (result.error == null) {
        if (User.isEmailTaken(req.body.email)) {
          // 409 = Conflict due to existing email
          return res.status(status.REQUEST_CONFLICT).send({ status: status.REQUEST_CONFLICT, error: `${req.body.email} already exists` });
        }

        const user = User.create(req.body);
        return res.status(status.RESOURCE_CREATED).send(user);
      }
      return res.status(400).send({ status: 400, error: `${result.error.details[0].message}` });
    };

    signIn = (req, res) => {
      // validation using JOI package from npm registry
      const schema = {
        email: Joi.string().email().required(),
        password: Joi.required(),
      };
      const result = Joi.validate(req.body, schema);
      if (result.error == null) {
      // Everything is okay
        // We fire up User model to login user
        const user = User.login(req.body);
        if (user.status === status.REQUEST_SUCCEDED) {
          res.set('x-auth-token', user.data.token);
          return res.status(status.REQUEST_SUCCEDED).send(user);
        }

        return res.status(status.UNAUTHORIZED).send(user);
      }
      return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: `${result.error.details[0].message}` });
    };
}
export default UserController;