import React from "react";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useFetch from "use-http";
import { addNewNonConformity } from "../../Service/service";
import { departURLS } from "../../Service/urls";
import style from "./AddNonConform.module.css";
import useForm from "../../Hooks/useForm";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddNonConform = () => {
  //fetching the departments
  const {
    data: dataDept = [],
    loading: loadingDept,
    error: errorDept,
  } = useFetch(departURLS, []);

  //controlando o formulário
  const formDescript = useForm("text");
  const formDate = useForm("text");
  const formDept = useForm("checkbox");

  //const [formDepartArr, setFormDepartArr] = React.useState([]);
  //const [erroDept, setErroDept] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [reqResponse, setReqResponse] = React.useState("");

  const handleCheckChange = ({ target }) => {
    const id = parseInt(target.id);
    if (formDept.value.includes(id)) {
      const index = formDept.value.indexOf(id);
      const newValue = formDept.value.filter((idx) => idx !== index);
      formDept.setValue([...newValue]);
    } else {
      formDept.setValue([...formDept.value, id]);
    }
  };

  const sendNewNonConform = async () => {
    if (
      formDate.validateInput() &&
      formDescript.validateInput() &&
      formDept.validateInput()
    ) {
      //setErroDept("");
      setLoading(true);
      const bodyReq = {
        description: formDescript.value,
        date: moment(formDate.value).format("DD-MM-YYYY"),
        departments: [...formDept.value],
        actions: [],
      };
      addNewNonConformity(bodyReq)
        .then(() => {
          // console.log(response);
          setLoading(false);
          formDate.setValue("");
          formDescript.setValue("");
          formDept.setValue([]);
          setReqResponse("Sucesso! Não conformidade cadastrada.");
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
    // else if (formDepartArr.length === 0) {
    //   setErroDept("Selecione pelo menos um departamento");
    // }
  };
  return (
    <section className="conteudo">
      {(loadingDept || loading) && <Spinner animation="border" />}
      <Card
        border="light"
        style={{ boxShadow: "7px 7px 5px #f4f4f4", width: "80vw" }}
      >
        {errorDept && <span>Erro: {errorDept}</span>}
        <Card.Header>
          <Card.Title>Adicionar Nova Não-conformidade</Card.Title>
        </Card.Header>
        {!errorDept && !loadingDept && (
          <Card.Body>
            <Form>
              <Form.Group controlId="data">
                <Form.Label>Data da ocorrência: </Form.Label>
                <div className="datepicker">
                  <DatePicker
                    selected={formDate.value}
                    maxDate={new Date()}
                    showDisabledMonthNavigation
                    onChange={(date) => formDate.setValue(date)}
                  />
                </div>
                {formDate.erro && <span>{formDate.erro}</span>}
              </Form.Group>
              <Form.Group controlId="descricao">
                <Form.Label>Descrição: </Form.Label>
                <Form.Control
                  onChange={formDescript.onChange}
                  onBlur={formDescript.onBlur}
                  value={formDescript.value}
                  as="textarea"
                  rows={3}
                />
                {formDescript.erro && <span>{formDescript.erro}</span>}
              </Form.Group>
              <Form.Group controlId="departamentos">
                <Form.Label>Departamentos: </Form.Label>
                {dataDept.map((el, idx) => {
                  return (
                    <Form.Check
                      key={idx}
                      type="checkbox"
                      id={el.id}
                      label={el.name}
                      onChange={handleCheckChange}
                      checked={formDept.value.includes(el.id) ? true : false}
                    />
                  );
                })}
                {formDept.erro && <span>{formDept.erro}</span>}
              </Form.Group>
              <Button
                onClick={sendNewNonConform}
                className={style.btnCustom}
                variant="primary"
              >
                Salvar
              </Button>
              {reqResponse && <span className={style.span}>{reqResponse}</span>}
            </Form>
          </Card.Body>
        )}
      </Card>
    </section>
  );
};

export default AddNonConform;
