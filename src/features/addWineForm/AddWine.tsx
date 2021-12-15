import {
  Button, Radio, RadioGroup, Stack,
} from '@chakra-ui/react';
import React from 'react';
import { useAddNewWine } from './hooks';
import { useAppSelector } from '../../app/hooks';
import { selectWineCountries, selectWineDescriptions, selectWineFoorPairings } from '../../app/selectors';
import { Combobox, Input, NumberInput } from '../../components/index';
import { NewWine, WineType } from '../wine/wineAPI';

const AddWine: React.FC = () => {
  const {
    wine,
    setName,
    setType,
    setCountry,
    setPrice,
    setVolume,
    setDescription,
    setFoodPairings,
    setUrl,
  } = useAddNewWine();

  // const dispatch = useAppDispatch();
  const countries = useAppSelector(selectWineCountries);
  const descriptions = useAppSelector(selectWineDescriptions);
  const foodPairings = useAppSelector(selectWineFoorPairings);

  const handleAddWine = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    console.log(wine);
    // void dispatch(addWine(wine));
  };

  return (
    <form>
      <Input
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <Combobox
        onChange={(e) => setCountry(e.target.value)}
        options={countries}
        value={wine.country}
        placeholder="Country"
      />

      <RadioGroup
        onChange={(type: NewWine.type) => setType(type)}
        value={wine.type}
      >
        <Stack direction="row" spacing={4}>
          {Object.keys(WineType).map((type) => (
            <Radio key={type} value={type}>
              {type.toLowerCase()}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>

      <NumberInput
        label="Price"
        onChange={(e) => setPrice(parseFloat(e.target.value))}
      />

      <NumberInput
        label="Volume (l)"
        onChange={(e) => setVolume(parseFloat(e.target.value))}
      />

      <Combobox
        onChange={(e) => setDescription([e.target.value])}
        options={descriptions}
        value={wine.description[0]}
        placeholder="Description"
      />

      <Combobox
        onChange={(e) => setFoodPairings([e.target.value])}
        options={foodPairings}
        value={wine.foodPairings[0]}
        placeholder="Foor pairings"
      />

      <Input
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL"
      />

      <Button
        colorScheme="red"
        onClick={handleAddWine}
        type="submit"
      >
        Add wine
      </Button>
    </form>
  );
};

export default AddWine;
