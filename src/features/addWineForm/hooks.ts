import { useAppDispatch } from '../../app/hooks';
import { NewWine, Wine } from '../../api/wineAPI';
import { addWine } from '../../app/wineSlice';
import { initialState, validationRules } from './constants';
import {
  Form, SubmitEvent, SubmitResponse, useForm,
} from '../form/useForm';

type WineResponse = SubmitResponse<NewWine, Wine>;
type PartialForm = Omit<Form<NewWine>, 'isValid' | 'onSubmit' | 'resetForm'>;

// "Override" the onSubmit type from Form
interface WineForm extends PartialForm {
  onSubmit: (e: SubmitEvent) => WineResponse;
}

const useAddWine = (): (wine: NewWine) => Promise<Wine> => {
  const dispatch = useAppDispatch();

  return async (newWine: NewWine) => {
    const response = dispatch(addWine(newWine));
    // Note that unwrap can throw an error!
    return response.unwrap();
  };
};

/**
 * Initializes a generic Form hook with NewWine fields.
 * @returns Form hook.
 */
export const useWineForm = (): WineForm => {
  const {
    data, errors, onChange, onSubmit, resetForm,
  } = useForm<NewWine>(initialState, validationRules);

  const addWineAction = useAddWine();

  const handleSubmit = (newWine: NewWine): Promise<Wine> => {
    resetForm();
    return addWineAction(newWine);
  };

  const onSubmitHandler = (e: SubmitEvent): WineResponse => onSubmit(e, handleSubmit);

  return {
    data,
    errors,
    onChange,
    onSubmit: onSubmitHandler,
  };
};

export default { useAddWine };
