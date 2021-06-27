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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

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
    { label: "O que fazer", controller: formWhat },
    { label: "Porque fazer", controller: formWhy },
    { label: "Como fazer", controller: formHow },
    { label: "Onde fazer", controller: formWhere },
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
        date: moment(formDate.value).format("DD-MM-YYYY"),
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
          setLoading(false);
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
                  <Form.Control
                    onChange={el.controller.onChange}
                    value={el.controller.value}
                    onBlur={el.controller.onBlur}
                    type="text"
                  />
                  {el.controller.erro && <span>{el.controller.erro}</span>}
                </Form.Group>
              );
            })}
            <Form.Group controlId="occurence-date">
              <Form.Label>Até quando: </Form.Label>
              <div className="datepicker">
                <DatePicker
                  selected={formDate.value}
                  minDate={new Date()}
                  showDisabledMonthNavigation
                  onChange={(date) => formDate.setValue(date)}
                />
              </div>
              {formDate.erro && <span>{formDate.erro}</span>}
            </Form.Group>
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
