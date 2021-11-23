import { FC } from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const WrapperComponent: FC = ({ children }) => {
  const history = createMemoryHistory();

  return <Router history={history}>{children}</Router>;
};

const customRender = (components: JSX.Element) => {
  render(components, { wrapper: WrapperComponent });
};

export * from "@testing-library/react";
export { customRender as render };
