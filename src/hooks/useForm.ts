import { useState } from 'react';

export type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export type Form<T> = {
  data: T;
  setData: (key: keyof T) => (e: ChangeEvent) => void;
  resetForm: () => void;
};

export const useForm = <T>(initialState: T): Form<T> => {
  const [state, setState] = useState<T>(initialState);

  const setData = (key: keyof T) => (e: ChangeEvent): void => {
    const edited: T = {
      ...state,
      [key]: e.target.value,
    };
    setState(edited);
  };

  const resetForm = (): void => {
    setState(initialState);
  };

  return {
    data: state,
    setData,
    resetForm,
  };
};

export default { useForm };
