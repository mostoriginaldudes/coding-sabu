import { AxiosError } from 'axios';
import { checkEmail } from 'apis';

const existSameEmail = async (email: string) => {
  try {
    const fetchedEmail = await checkEmail(email);
    return fetchedEmail !== email || '중복된 이메일입니다.';
  } catch (error) {
    if ((error as AxiosError).response?.status === 409) {
      return '같은 이메일이 존재합니다.';
    }
  }
};

const formValidationOptions = {
  email: {
    required: {
      value: true,
      message: '이메일을 입력해주세요.'
    },
    minLength: {
      value: 10,
      message: '10글자 이상 입력해주세요.'
    },
    maxLength: {
      value: 255,
      message: '255글자 이하로 입력해주세요.'
    },
    pattern: {
      value:
        /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/,
      message: '이메일 형식이 올바르지 않습니다.'
    },
    validate: existSameEmail,
    shouldUnregister: true
  },
  password: {
    minLength: {
      value: 8,
      message: '8글자 이상 입력해주세요.'
    },
    maxLength: {
      value: 20,
      message: '20글자 이하로 입력해주세요.'
    },
    pattern: {
      value: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,20}$/g,
      message: '비밀번호 형식이 올바르지 않습니다.'
    },
    deps: ['passwordCheck'],
    shouldUnregister: true
  },
  passwordCheck: {
    minLength: {
      value: 8,
      message: '8글자 이상 입력해주세요.'
    },
    maxLength: {
      value: 20,
      message: '20글자 이하로 입력해주세요.'
    },
    pattern: {
      value: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,20}$/g,
      message: '비밀번호 형식이 올바르지 않습니다.'
    },
    deps: ['password'],
    shouldUnregister: true
  },
  nickname: {
    required: {
      value: true,
      message: '닉네임을 입력해주세요.'
    },
    maxLength: {
      value: 20,
      message: '20글자 이하로 입력해주세요.'
    },
    shouldUnregister: true
  },
  phoneNum: {
    required: {
      value: true,
      message: '연락처를 입력해주세요.'
    },
    pattern: {
      value: /^010-[0-9]{4}-[0-9]{4}$/,
      message: '연락처 형식이 올바르지 않습니다.'
    },
    shouldUnregister: true
  },
  description: {
    required: {
      value: true,
      message: '자기소개를 입력해주세요.'
    },
    minLength: {
      value: 5,
      message: '5글자 이상 입력해주세요.'
    },
    shouldUnregister: true
  }
};

export default formValidationOptions;
