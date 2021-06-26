import React from "react";
import style from "./FormCorrectAction.module.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import {
  addNewCorrectiveAction,
  updateNonConformWithAction,
} from "../../Service/service";
import useForm from "../../Hooks/useForm";
import { useParams } from "react-router-dom";

//PRECISO: depois que add a nova ação, tem que adicionar essa ação na não-conformidade ... pra isso preciso do array com departamentos e também array com as ações anteriores (talvez mexer na função que trabalha isso)

const FormCorrectAction = ({ originalData, setAddedAction, addedAction }) => {
  const { id } = useParams();
  const [reqResponse, setReqResponse] = React.useState("");

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

  const sendAddCorrectiveAction = async () => {
    if (
      formWhat.validateInput() &&
      formWhy.validateInput() &&
      formHow.validateInput() &&
      formWhere.validateInput() &&
      formDate.validateInput()
    ) {
      setLoading(true);
      const bodyReq = {
        what: formWhat.value,
        why: formWhy.value,
        how: formHow.value,
        where: formWhere.value,
        date: formDate.value,
      };
      addNewCorrectiveAction(bodyReq)
        .then((DataId) => {
          updateNonConformWithAction(id, {
            id: id,
            description: originalData.description,
            date: originalData.date,
            departments: originalData.departmentsArr,
            actions: [...originalData.actions, DataId],
          });
          setAddedAction([...addedAction, DataId]);
        })
        .then(() => {
          setLoading(false);
          //se a req for 200:
          formWhat.setValue("");
          formWhy.setValue("");
          formHow.setValue("");
          formWhere.setValue("");
          formDate.setValue("");
          setReqResponse("Sucesso! Ação corretiva cadastrada.");
          setTimeout(() => {
            setReqResponse("");
          }, 4000);
        })
        .catch((err) => {
          setReqResponse(`Erro: ${err}`);
          setTimeout(() => {
            setReqResponse("");
          }, 4000);
        });
    }
  };

  return (
    <Card border="light" style={{ boxShadow: "7px 7px 5px #f4f4f4" }}>
      <Card.Body>
        {loading && <Spinner animation="border" />}
        {!loading && (
          <Form>
            {formObjArr.map((el, idx) => {
              return (
                <Form.Group controlId={Object.keys(el.label)[0]} key={idx}>
                  <Form.Label>{el.label}: </Form.Label>
                  <Form.Control type="text" {...el.controller} />
                  {el.controller.erro && <span>{el.controller.erro}</span>}
                </Form.Group>
              );
            })}
            <Button variant="primary" onClick={sendAddCorrectiveAction}>
              Salvar
            </Button>
            {reqResponse && <span className={style.span}>{reqResponse}</span>}
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default FormCorrectAction;
