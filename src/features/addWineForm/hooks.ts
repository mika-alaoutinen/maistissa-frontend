import { useAppDispatch } from '../../app/hooks';
import { NewWine, Wine } from '../../api/wineAPI';
import { addWine } from '../../app/wineSlice';
import { initialState, validationRules } from './constants';
import { useForm } from '../form/useForm';
import { ValidationError } from '../form/validation';

const useAddWine = (): (wine: NewWine) => Promise<Wine> => {
  const dispatch = useAppDispatch();

  return async (newWine: NewWine) => {
    const response = dispatch(addWine(newWine));
    // Note that unwrap can throw an error!
    return response.unwrap();
  };
};

// type WineFormType = Omit<Form<NewWine>, 'onSubmit' | 'resetForm'>;
type SubmitEvent = React.MouseEvent<HTMLElement, MouseEvent>;
type Response = Promise<Wine | ValidationError<NewWine>>;

/**
 * Initializes a generic Form hook with NewWine fields.
 * @returns Form hook.
 */
export const useWineForm = () => {
  const {
    data, errors, onChange, onSubmit, resetForm,
  } = useForm<NewWine>(initialState, validationRules);

  const addWineAction = useAddWine();

  const handleSubmit = (newWine: NewWine): Promise<Wine> => {
    resetForm();
    return addWineAction(newWine);
  };

  const onSubmitHandler = (e: SubmitEvent): Response => onSubmit(e, handleSubmit);

  return {
    data,
    errors,
    onChange,
    onSubmit: onSubmitHandler,
  };
};

export default { useAddWine };
