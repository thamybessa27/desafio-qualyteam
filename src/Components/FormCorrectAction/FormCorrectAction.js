import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  addNewCorrectiveAction,
  updateNonConformWithAction,
} from "../../Service/service";
import useForm from "../../Hooks/useForm";

//PRECISO: depois que add a nova ação, tem que adicionar essa ação na não-conformidade ... pra isso preciso do array com departamentos e também array com as ações anteriores (talvez mexer na função que trabalha isso)

const FormCorrectAction = ({ originalData }) => {
  const formWhat = useForm("text");
  const formWhy = useForm("text");
  const formHow = useForm("text");
  const formWhere = useForm("text");
  const formDate = useForm("text");
  const [loading, setLoading] = React.useState(false);

  const formObjArr = [
    { label: "What to do", controller: formWhat },
    { label: "Why to do it", controller: formWhy },
    { label: "How to do it", controller: formHow },
    { label: "Where to do it", controller: formWhere },
    { label: "Until when", controller: formDate },
  ];

  const sendAddCorrectiveAction = () => {
    setLoading(true);
    const bodyReq = {
      what: formWhat,
      why: formWhy,
      how: formHow,
      where: formWhere,
      date: formDate,
    };
    const idFromNewAction = addNewCorrectiveAction(bodyReq);
  };

  return (
    <Card border="light" style={{ boxShadow: "7px 7px 5px #f4f4f4" }}>
      <Card.Body>
        <Form>
          {formObjArr.map((el) => {
            return (
              <Form.Group controlId={Object.keys(el.label)[0]}>
                <Form.Label>{el.label}: </Form.Label>
                <Form.Control type="text" {...el.controller} />
              </Form.Group>
            );
          })}
          <Button variant="primary" onClick={sendAddCorrectiveAction}>
            Salvar
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FormCorrectAction;
