import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import useFetch from "use-http";
import { correctActionsURL } from "../../Service/service";

const SingleNonConform = () => {
  //fetching the corrective actions
  const { data = [], loading, error } = useFetch(correctActionsURL, []);
  return (
    <section className="conteudo">
      {loading && <Spinner animation="border" />}
      {error && "Error!"}
      <Card border="light" style={{ boxShadow: "7px 7px 5px #f4f4f4" }}>
        <Card.Body>
          <Card.Title>Data da ocorrência:</Card.Title>
          <Card.Text>Descrição: </Card.Text>
          <Card.Text>Departamentos:</Card.Text>
          <Button variant="primary">Ver mais</Button>
        </Card.Body>
      </Card>
    </section>
  );
};

export default SingleNonConform;
