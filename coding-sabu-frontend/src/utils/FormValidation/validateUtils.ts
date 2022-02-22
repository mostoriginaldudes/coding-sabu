import { checkEmail } from 'apis';
import debounce from 'lodash.debounce';
import * as yup from 'yup';

const validateEmail = debounce(
  (
    email: string | undefined,
    _: yup.TestContext,
    resolve: (val: boolean) => void
  ) => {
    if (email) {
      setTimeout(() => {
        checkEmail(email as string)
          .then(() => resolve(true))
          .catch(() => resolve(false));
      }, 300);
    }
  },
  300
);

export default validateEmail;
