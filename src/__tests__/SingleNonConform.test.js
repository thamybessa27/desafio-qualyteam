import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import SingleNonConform from "../Components/SingleNonConform/SingleNonConform";

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
it("clique do botão ativa/desativa o formulário", function () {
  //teste ainda em construção, vai falhar pois ainda não possui todos os mocks e matchers para rodar

  const onChange = jest.fn();
  act(() => {
    render(<SingleNonConform onChange={onChange} />, container);
  });
  const button = document.querySelector("button");
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(onChange).toHaveBeenCalledTimes(1);
});
