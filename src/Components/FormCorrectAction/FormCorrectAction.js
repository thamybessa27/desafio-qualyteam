import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  addNewCorrectiveAction,
  updateNonConformWithAction,
} from "../../Service/service";

const FormCorrectAction = () => {
  const [formWhat, setFormWhat] = React.useState("");
  const [formWhy, setFormWhy] = React.useState("");
  const [formHow, setFormHow] = React.useState("");
  const [formWhere, setFormWhere] = React.useState("");
  const [formDate, setFormDate] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const sendAddCorrectiveAction = () => {
    setLoading(true);
    const bodyReq = {
      what: formWhat,
      why: formWhy,
      how: formHow,
      where: formWhere,
      date: formDate,
    };
    const idFromNewAction = addNewCorrectiveAction(bodyReq).then((response) =>
      setLoading(false)
    );
  };

  return (
    <Card border="light" style={{ boxShadow: "7px 7px 5px #f4f4f4" }}>
      <Card.Body>
        <Form>
          <Form.Group controlId="formGroupWhat">
            <Form.Label>What to do: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter what to do"
              value={formWhat}
              onChange={(e) => setFormWhat(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupWhy">
            <Form.Label>Why to do it: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter why to do it"
              value={formWhy}
              onChange={(e) => setFormWhy(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupHow">
            <Form.Label>How to do it: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter how to do it"
              value={formHow}
              onChange={(e) => setFormHow(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupWhere">
            <Form.Label>Where to do it: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter where to do it"
              value={formWhere}
              onChange={(e) => setFormWhere(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupDeadline">
            <Form.Label>Until when: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter "
              value={formDate}
              onChange={(e) => setFormDate(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={sendAddCorrectiveAction}>
            Salvar
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FormCorrectAction;
