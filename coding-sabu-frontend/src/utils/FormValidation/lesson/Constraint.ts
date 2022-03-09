import * as yup from 'yup';

class Constraint {
  private readonly title;
  private readonly price;

  constructor() {
    this.title = yup
      .string()
      .required('수련 이름을 입력해주세요.')
      .min(3, '3글자 이상 입력해주세요.')
      .max(255, '255글자 이하로 입력해주세요.');

    this.price = yup
      .number()
      .required('수련 가치를 입력해주세요.')
      .max(500000, '50만원보다 작은 숫자를 입력해주세요.')
      .default(() => 0);
  }

  getTitle() {
    return this.title;
  }

  getPrice() {
    return this.price;
  }
}

const constraint = new Constraint();
export default constraint;
