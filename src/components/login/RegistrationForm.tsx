import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getNames } from "country-list";
import { useHotelStore } from "../../zustand/store";
import type { Guest } from "../../interfaces/interfaces";

const RegistartionForm = function () {
  const navigate = useNavigate();
  const nations = getNames();
  const [validated, setValidated] = useState(false);
  //
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [docType, setDocType] = useState("");
  const [document, setDocument] = useState("");

  const { addGuest } = useHotelStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    const newGuest: Guest = {
      id: Date.now(),
      name: nome,
      surname: cognome,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      nationality: nationality,
      docType: docType,
      document: document,
      role: "user",
    };
    addGuest(newGuest);
    navigate("/");
  };

  return (
    <Container>
      <Row className="text-center mt-2">
        <h1>Hotel Casa Brunetti</h1>
      </Row>
      <Form noValidate onSubmit={handleSubmit} validated={validated}>
        <Row className="gap-2 justify-content-center">
          {/* NOME */}
          <Form.Group as={Col} lg={8}>
            <Form.Control
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Inserisci il nome
            </Form.Control.Feedback>
          </Form.Group>
          {/* COGNOME */}
          <Form.Group as={Col} lg={8}>
            <Form.Control
              type="text"
              placeholder="Cognome"
              value={cognome}
              onChange={(e) => setCognome(e.target.value)}
              required
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Inserisci il cognome
            </Form.Control.Feedback>
          </Form.Group>
          {/* EMAIL */}
          <Form.Group as={Col} lg={8}>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Email non valida !!
            </Form.Control.Feedback>
          </Form.Group>
          {/* PASSWORD */}
          <Form.Group as={Col} lg={8}>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Password non valida !!
            </Form.Control.Feedback>
          </Form.Group>
          {/* PHONENUMBER */}
          <Form.Group as={Col} lg={8}>
            <Form.Control
              type="text"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Inserisci un numero di telefono valido
            </Form.Control.Feedback>
          </Form.Group>
          {/* NAZIONALITA */}
          <Form.Group as={Col} lg={8}>
            <Form.Select
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              required
            >
              <option value="">Seleziona</option>
              {nations.map((n: string) => {
                return (
                  <option value={n} key={n}>
                    {n}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              seleziona un paese
            </Form.Control.Feedback>
          </Form.Group>
          {/* TIPO DI DOCUMENTO */}
          <Form.Group as={Col} lg={8} controlId="validationDocType">
            <Form.Select
              value={docType}
              onChange={(e) => {
                setDocType(e.target.value);
                setDocument("");
              }}
              required
            >
              <option value="">seleziona tipo di documento</option>
              <option value="Personal Id">Personal Id</option>
              <option value="Passport">Passport</option>
              <option value="Drive License">Drive License</option>
            </Form.Select>
          </Form.Group>
          {/* CARTA D'IDENTITA */}
          {docType === "Personal Id" && (
            <Form.Group controlId="validationIdCard" lg={8} as={Col}>
              <Form.Label>ID Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex. CA12345AB"
                pattern="[A-Z]{2}[0-9]{5}[A-Z]{2}"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Format: 2 letters, 5 numbers, 2 letters
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please provide a valid ID Card number
              </Form.Control.Feedback>
            </Form.Group>
          )}
          {/* PASSAPORTO */}
          {docType === "Passport" && (
            <Form.Group controlId="validationPassport" lg={8} as={Col}>
              <Form.Label>Passport Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex. AB1234567"
                pattern="[A-Z]{2}[0-9]{7}"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Format: 2 letters followed by 7 numbers
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please provide a valid Passport number
              </Form.Control.Feedback>
            </Form.Group>
          )}
          {/* PATENTE */}
          {docType === "Drive License" && (
            <Form.Group controlId="validationLicense" lg={8} as={Col}>
              <Form.Label>Driving License Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex. U99999AB999T"
                pattern="[A-Z0-9]{8,12}"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Format: 8 to 12 alphanumeric characters
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please provide a valid Driving License number
              </Form.Control.Feedback>
            </Form.Group>
          )}
          <Col lg={6} className="text-center">
            <Button type="submit">Registrati</Button>
          </Col>
        </Row>
      </Form>
      <Row className="text-center">
        <p>
          Sei gia registrato ? <Link to={"/"}>accedi</Link>
        </p>
      </Row>
    </Container>
  );
};

export default RegistartionForm;
