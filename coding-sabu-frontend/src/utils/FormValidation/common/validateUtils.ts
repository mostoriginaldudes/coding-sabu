import debounce from 'lodash.debounce';
import * as yup from 'yup';
import { checkEmailRequest } from 'apis';

const validateEmail = debounce(
  (email: string | undefined, _: yup.TestContext, resolve: (val: boolean) => void) => {
    if (email) {
      setTimeout(() => {
        checkEmailRequest(email as string)
          .then(() => resolve(true))
          .catch(() => resolve(false));
      }, 300);
    }
  },
  300
);

export default validateEmail;
