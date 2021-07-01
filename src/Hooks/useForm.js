import React from "react";

//hook customizado que faz a validação dos campos do formulário

const types = {
  //nesse caso tá valendo tudo
  text: {
    initialValue: "",
    validate: (value) => {
      let regex = /[\s\S]+/;
      return regex.test(value);
    },
    errorMsg: "Entrada inválida",
  },
  checkbox: {
    initialValue: [],
    validate: (arrayCheck) => arrayCheck.length > 0,
    errorMsg: "Selecione uma entrada",
  },
};

const useForm = (type) => {
  const [erro, setErro] = React.useState(null);
  const [value, setValue] = React.useState(types[type].initialValue);

  function validateInput(value) {
    if (value.length === 0) {
      setErro("Preencha um valor");
      return false;
    } else if (types[type] && !types[type].validate(value)) {
      setErro(types[type].errorMsg);
      return false;
    } else {
      setErro(null);
      return true;
    }
  }

  function onChange({ target }) {
    //desestruturado o event.target
    if (erro) {
      validateInput(target.value);
    }
    setValue(target.value);
  }
  return {
    value,
    setValue,
    erro,
    onChange,
    onBlur: () => validateInput(value),
    validateInput: () => validateInput(value),
  };
};

export default useForm;
