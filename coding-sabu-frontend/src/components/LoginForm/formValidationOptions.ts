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
    }
  },
  password: {
    required: { value: true, message: '비밀번호를 입력해주세요.' },
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
    shouldUnregister: true
  }
} as const;

export default formValidationOptions;
