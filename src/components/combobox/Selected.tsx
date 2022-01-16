import React from 'react';
import SelectedItem from './SelectedItem';

interface Props {
  remove: (item: string) => void;
  selected: string[];
}

const Selected: React.FC<Props> = ({ remove, selected }) => (
  <div>
    {selected.map((item) => (
      <SelectedItem
        key={item}
        item={item}
        removeSelected={remove}
      />
    ))}
  </div>
);

export default Selected;
