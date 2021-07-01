//import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import NonConformCard from "../Components/NonConformBody/NonConformCard";

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

it("renderiza as props corretamente", function () {
  act(() => {
    render(
      <NonConformCard
        occurenceDate="12-09-2020"
        description="teste descrição"
        departments="teste dept"
      />,
      container
    );
  });
  expect(container.textContent).toMatch("Descrição: teste descrição");
  expect(container.textContent).toMatch("Departamentos: teste dept");
  expect(container.textContent).toMatch(
    "Data da ocorrência: September 12th 2020"
  );
});
