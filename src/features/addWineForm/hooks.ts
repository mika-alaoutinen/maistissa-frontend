import { useAppDispatch } from '../../app/hooks';
import { NewWine, Wine } from '../../api/wineAPI';
import { addWine } from '../../app/wineSlice';
import { initialState, validationRules } from './constants';
import { Form, useForm } from '../form/useForm';

/**
 * Dispatches a new wine thunk and retunrs the response as a Promise.
 * @returns Added wine response from backend.
 */
export const useAddWine = (): (wine: NewWine) => Promise<Wine> => {
  const dispatch = useAppDispatch();

  return async (wine: NewWine) => {
    const response = dispatch(addWine(wine));
    // Note that unwrap can throw an error!
    return response.unwrap();
  };
};

/**
 * Initializes a generic Form hook with NewWine fields.
 * @returns Form hook.
 */
export const useWineForm = (): Form<NewWine> => {
  const {
    data, errors, onChange, resetForm, validate,
  } = useForm<NewWine>(initialState, validationRules);

  return {
    data,
    errors,
    onChange,
    resetForm,
    validate,
  };
};
