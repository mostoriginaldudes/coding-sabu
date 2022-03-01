import * as yup from 'yup';
import constraint from 'utils/FormValidation/auth/Constraint';

class ValidationSchema {
  private readonly login;
  private readonly signup;
  private readonly editUser;

  constructor() {
    this.login = yup.object({
      email: constraint.getEmail(),
      password: constraint.getPassword()
    });

    this.signup = yup.object({
      email: constraint.getEmailComparingSameEmail(),
      password: constraint.getPassword(),
      passwordCheck: constraint.getPasswordCheck(),
      nickname: constraint.getNickname(),
      description: constraint.getDescription()
    });

    this.editUser = yup.object({
      email: constraint.getEmail(),
      password: constraint.getPassword(),
      passwordCheck: constraint.getPasswordCheck(),
      nickname: constraint.getNickname(),
      description: constraint.getDescription()
    });
  }

  getLogin() {
    return this.login;
  }

  getSignup() {
    return this.signup;
  }

  getEditUser() {
    return this.editUser;
  }
}

const validationSchema = new ValidationSchema();
export default validationSchema;
