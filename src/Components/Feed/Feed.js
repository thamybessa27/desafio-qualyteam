import React from "react";
import { naoConformsURL } from "../../Service/service";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import useFetch from "use-http";

const Feed = () => {
  const { data = [], loading, error } = useFetch(naoConformsURL, []);

  return (
    <main className="conteudo">
      {loading && <Spinner animation="border" />}
      {error && "Error!"}
      {data.map((el, index) => {
        return (
          <Card
            key={index}
            border="light"
            style={{ boxShadow: "7px 7px 5px #f4f4f4" }}
          >
            <Card.Body>
              <Card.Title>
                Data da ocorrência: {el["ocurrence-date"]}
              </Card.Title>
              <Card.Text>Descrição: {el.description}</Card.Text>
              <Card.Text>Departamentos: {el.departments}</Card.Text>
              <Button variant="primary">Ver mais</Button>
            </Card.Body>
          </Card>
        );
      })}
    </main>
  );
};

export default Feed;
