import * as yup from 'yup';
import constraint from './Constraint';

class ValidationSchema {
  private readonly lesson;

  constructor() {
    this.lesson = yup.object({
      title: constraint.getTitle(),
      price: constraint.getPrice()
    });
  }

  getLesson() {
    return this.lesson;
  }
}

const validationSchema = new ValidationSchema();
export default validationSchema;
