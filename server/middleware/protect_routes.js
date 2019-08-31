
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

class Authorisation {
  // eslint-disable-next-line class-methods-use-this
  checkAdmin(req, res, next) {
    const token = req.headers.authorisation;

    if (!token) {
      return res.status(401).send({
        status: 401,
        error: 'Token not provided',
      });
    }

    try {
      const decode = jwt.verify(token, process.env.Token_Key);
      if (!decode) {
        return res.status(400).send({ error: 'token is invalid' });
      }
      if (decode.is_admin != true) {
        return res.status(403).send({ error: 'you are not admin' });
      }

      if (!User.isUserExist(decode.id)) {
        return res.status(400).send({ status: 400, error: 'The User doesn\'t exist.' });
      }
      next();
    } catch (error) {
      return res.status(400).send(
        { status: 400, error: error.message },
      );
    }
    // const decode = jwt.verify(token, process.env.Token_Key);
    // if(decode.is_admin != true){
    //   return res.status(403).send({  'message': 'you are not admin'});
    // }

    // next();
  }

  // eslint-disable-next-line class-methods-use-this

  // eslint-disable-next-line class-methods-use-this
 
}

export default Authorisation;
