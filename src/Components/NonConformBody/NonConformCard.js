import React from "react";
import Card from "react-bootstrap/Card";
import moment from "moment";

const NonConformCard = ({
  occurenceDate,
  description,
  departments,
  children,
}) => {
  const formattedDate = moment(occurenceDate, "DD-MM-YYYY").format(
    "MMMM Do YYYY"
  );
  return (
    <Card border="light" style={{ boxShadow: "7px 7px 5px #f4f4f4" }}>
      <Card.Body>
        <Card.Title>Data da ocorrência: {formattedDate.toString()}</Card.Title>
        <Card.Text>Descrição: {description}</Card.Text>
        <Card.Text>Departamentos: {departments}</Card.Text>
        {children}
      </Card.Body>
    </Card>
  );
};

export default NonConformCard;
