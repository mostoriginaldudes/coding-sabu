import * as yup from 'yup';
import validateEmail from 'utils/FormValidation/common/validateUtils';

class Constraint {
  private readonly email;
  private readonly emailComparingSameEmail;
  private readonly password;
  private readonly passwordCheck;
  private readonly nickname;
  private readonly phoneNum;
  private readonly description;

  constructor() {
    this.email = yup
      .string()
      .email('이메일 형식이 올바르지 않습니다.')
      .required('이메일을 입력해주세요.')
      .min(10, '10글자 이상 입력해주세요.')
      .max(255, '255글자 이하로 입력해주세요.');

    this.emailComparingSameEmail = this.email.test({
      name: 'same-email',
      message: '중복된 이메일입니다.',
      test: (email, testContext: yup.TestContext) =>
        new Promise(resolve => validateEmail(email, testContext, resolve))
    });

    this.password = yup
      .string()
      .required('비밀번호를 입력해주세요.')
      .min(8, '8글자 이상 입력해주세요.')
      .max(20, '20글자 이하로 입력해주세요.')
      .matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,20}$/g,
        '비밀번호 형식이 올바르지 않습니다.'
      );

    this.passwordCheck = yup
      .string()
      .required('비밀번호를 한번 더 입력해주세요.')
      .test({
        name: 'matched-password',
        message: '비밀번호가 일치하지 않습니다.',
        test: (passwordCheck, testContext) =>
          passwordCheck === testContext.parent.password
      });

    this.nickname = yup
      .string()
      .required('닉네임을 입력해주세요.')
      .max(20, '20글자 이하로 입력해주세요.');

    this.phoneNum = yup
      .string()
      .required('연락처를 입력해주세요.')
      .matches(/^010-[0-9]{4}-[0-9]{4}$/, '연락처 형식이 올바르지 않습니다.');

    this.description = yup
      .string()
      .required('자기 소개를 입력해주세요.')
      .min(5, '5글자 이상 입력해주세요.');
  }

  getEmail() {
    return this.email;
  }

  getEmailComparingSameEmail() {
    return this.emailComparingSameEmail;
  }

  getPassword() {
    return this.password;
  }

  getPasswordCheck() {
    return this.passwordCheck;
  }

  getNickname() {
    return this.nickname;
  }

  getPhoneNum() {
    return this.phoneNum;
  }

  getDescription() {
    return this.description;
  }
}

const constraint = new Constraint();
export default constraint;
