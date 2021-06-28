import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import CustomAccordion from "../Components/CustomAccordion/CustomAccordion";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renderiza as props corretamente passando pela função que faz o casamento das ações corretivas registradas para a não conformidade x todas as ações corretivas existentes", function () {
  const testActions = [
    {
      id: 1,
      "what-to-do": "Solve the problem",
      "why-to-do-it": "Because it hurts our company",
      "how-to-do-it": "Send an letter to anvisa",
      "where-to-do-it": "On the company",
      "until-when": "12-12-2019",
    },
  ];
  const testNonConformActions = [1];
  act(() => {
    render(
      <CustomAccordion
        allActions={testActions}
        nonConfomActions={testNonConformActions}
      />,
      container
    );
  });
  expect(container.textContent).toMatch("O que fazer: Solve the problem");
  expect(container.textContent).toMatch(
    "Porque fazer: Because it hurts our company"
  );
  expect(container.textContent).toMatch("Como fazer: Send an letter to anvisa");
  expect(container.textContent).toMatch("Onde fazer: On the company");
  expect(container.textContent).toMatch("Até quando: December 12th 2019");
});
