import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import style from "./CustomAccordion.module.css";
//import Button from "react-bootstrap/Button";

const CustomAccordion = ({ actions }) => {
  return (
    <Accordion>
      <Card>
        {actions.map((el, index) => {
          return (
            <React.Fragment key={index}>
              {/* <Card.Header> */}
              <Accordion.Toggle
                eventKey={el.id}
                as={Card.Header}
                variant="light"
                style={{ width: "100%", textAlign: "left", cursor: "pointer" }}
              >
                <Card.Text>Ação corretiva: {el.id}</Card.Text>
              </Accordion.Toggle>
              {/* </Card.Header> */}
              <Accordion.Collapse eventKey={el.id}>
                <Card.Body>
                  <ul className={style.list}>
                    <li>What to do: {el["what-to-do"]}</li>
                    <li>Why to do it: {el["why-to-do-it"]}</li>
                    <li>How to do it: {el["how-to-do-it"]}</li>
                    <li>Where to do it: {el["where-to-do-it"]}</li>
                    <li>Until when: {el["until-when"]}</li>
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </React.Fragment>
          );
        })}
      </Card>
    </Accordion>
  );
};

export default CustomAccordion;
