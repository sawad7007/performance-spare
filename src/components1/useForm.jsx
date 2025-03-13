import { useState } from "react";

export const useForm = (intialValue) => {
  const [value, setvalue] = useState(intialValue);

  return [
    value,
    (event) => {
      setvalue({
        ...value,
        [event.target.name]: event.target.value,
      });
    },
  ];
};
