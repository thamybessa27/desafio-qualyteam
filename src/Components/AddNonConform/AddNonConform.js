import React from "react";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useFetch from "use-http";
import { addNewNonConformity, departURLS } from "../../Service/service";
import style from "./AddNonConform.module.css";
import useForm from "../../Hooks/useForm";

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
  const [formDepartArr, setFormDepartArr] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const [reqResponse, setReqResponse] = React.useState("");

  const handleCheckChange = ({ target }) => {
    const id = parseInt(target.id);
    console.log("id", id);
    if (formDepartArr.includes(id)) {
      const index = formDepartArr.indexOf(id);
      formDepartArr.splice(index, 1);
    } else {
      setFormDepartArr([...formDepartArr, id]);
    }
  };

  const sendNewNonConform = async () => {
    if (
      formDate.validateInput() &&
      formDescript.validateInput() &&
      formDepartArr.length > 0
    ) {
      setLoading(true);
      const bodyReq = {
        description: formDescript.value,
        date: formDate.value,
        departments: [...formDepartArr],
        actions: [],
      };
      addNewNonConformity(bodyReq)
        .then((response) => {
          console.log(response);
          setLoading(false);
          formDate.setValue("");
          formDescript.setValue("");
          setFormDepartArr([]);
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
              <Form.Group controlId="descricao">
                <Form.Label>Descrição: </Form.Label>
                <Form.Control type="text" {...formDescript} />
                {formDescript.erro && <span>{formDescript.erro}</span>}
              </Form.Group>
              <Form.Group controlId="data">
                <Form.Label>Data: </Form.Label>
                <Form.Control type="text" {...formDate} />
                {formDate.erro && <span>{formDate.erro}</span>}
              </Form.Group>
              {dataDept.map((el) => {
                return (
                  <Form.Check
                    type="checkbox"
                    id={el.id}
                    label={el.name}
                    onChange={handleCheckChange}
                    checked={formDepartArr.includes(el.id) ? true : false}
                  />
                );
              })}
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
