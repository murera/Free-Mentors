import userInfo from '../helpers/userInfos';
import status from '../helpers/StatusCode';
import User from './userModel';


class Session {
  constructor() {
    this.sessions = [
      // set default session1
      {
        sessionId: 1,
        mentorId: 4,
        menteeId: 1,
        questions: 'fbsdbfsbdfwjsebfwjebfj fbvsdjbvskdzvb vdjzvb sjdvb sdzbv xsdzmv',
        menteeEmail: 'Mureraamani@gmail.com',
        status: 'pending',
      },
      // set default session2
      {
        sessionId: 2,
        mentorId: 4,
        menteeId: 3,
        questions: 'fbsdbfsbdfwjsebfwjebfj fbvsdjbvskdzvb vdjzvb sjdvb sdzbv xsdzmv',
        menteeEmail: 'rosineumrerwa@gmail.com',
        status: 'pending',
      },
    ];
  }

  // create sessions
  createSession = (res, payload, token) => {
    let sessionid = this.sessions.length + 1;

    let newSession = {
      sessionId: sessionid,
      mentorId: payload.mentorId,
      menteeId: userInfo(res, token),
      questions: payload.questions,
      menteeEmail: User.userEmail(userInfo(res, token)),
      status: 'pending',
    };
    this.sessions.push(newSession);
    newSession = {
      status: status.REQUEST_SUCCEEDED,
      message: 'Session successfully created',
      data: newSession,
    };
    return newSession;
  };
  // accept session
  accept = (res, id) => {
    const session = this.sessions.find((sid) => sid.sessionId === parseInt(id, 10));
    if (!session) {
      return res.status(status.NOT_FOUND).send({
        status: status.NOT_FOUND,
        error: 'This session  is not found!',
      });
    }
    if (session.status == 'Accept') {
      return res.status(status.FORBIDDEN).send({
        status: status.FORBIDDEN,
        error: 'This session is already accepted',
      });
    }
    if (session.status === 'Reject') {
      return res.status(status.FORBIDDEN).send({
        status: status.FORBIDDEN,
        error: 'This session is already rejected',
      });
    }

    session.status = 'Accept';
    return session;
  }



}
export default new Session();
