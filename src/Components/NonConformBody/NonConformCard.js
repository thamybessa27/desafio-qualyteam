import React from "react";
import Card from "react-bootstrap/Card";

const NonConformCard = ({
  occurenceDate,
  description,
  departments,
  children,
}) => {
  return (
    <Card
      // key={index}
      border="light"
      style={{ boxShadow: "7px 7px 5px #f4f4f4" }}
    >
      <Card.Body>
        <Card.Title>Data da ocorrência: {occurenceDate}</Card.Title>
        <Card.Text>Descrição: {description}</Card.Text>
        <Card.Text>Departamentos: {departments}</Card.Text>
        {children}
      </Card.Body>
    </Card>
  );
};

export default NonConformCard;
