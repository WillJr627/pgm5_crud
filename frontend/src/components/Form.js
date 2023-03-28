import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.marca.value = onEdit.marca;
      user.modelo.value = onEdit.modelo;
      user.cor.value = onEdit.cor;
      user.ano.value = onEdit.ano;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.marca.value ||
      !user.modelo.value ||
      !user.cor.value ||
      !user.ano.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          marca: user.marca.value,
          modelo: user.modelo.value,
          cor: user.cor.value,
          ano: user.ano.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          marca: user.marca.value,
          modelo: user.modelo.value,
          cor: user.cor.value,
          ano: user.ano.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.marca.value = "";
    user.modelo.value = "";
    user.cor.value = "";
    user.ano.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>marca</Label>
        <Input name="marca" />
      </InputArea>
      <InputArea>
        <Label>modelo</Label>
        <Input name="modelo" type="modelo" />
      </InputArea>
      <InputArea>
        <Label>cor</Label>
        <Input name="cor" />
      </InputArea>
      <InputArea>
        <Label>ano</Label>
        <Input name="ano" type="number" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
