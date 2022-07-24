import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataTable from '../DataTable';
import { Column } from '../types';

interface Person {
  id: number;
  name: string;
  age: number;
}

const columns: Column<Person, keyof Person>[] = [
  { key: 'name', header: 'Name' },
  { key: 'age', header: 'Age' },
];

const data: Person[] = [
  { id: 1, name: 'Alice', age: 19 },
  { id: 2, name: 'Bob', age: 20 },
];

describe('Component renders correctly', () => {
  beforeEach(() => render(<DataTable columns={columns} data={data} />));

  it('table has three rows for header and body', () => {
    const rows = within(screen.getByRole('table')).getAllByRole('row');
    expect(rows.length).toBe(3);
  });

  it('header has a two columns for Name and Age', () => {
    const columnHeaders = within(screen.getByRole('table')).getAllByRole('columnheader');
    expect(columnHeaders.length).toBe(2);
    expect(columnHeaders[0].textContent).toBe('Name');
    expect(columnHeaders[1].textContent).toBe('Age');
  });

  it('body has two rows for Alice and Bob', () => {
    const [, ...rows] = within(screen.getByRole('table')).getAllByRole('row');
    expect(rows.length).toBe(2);

    ['Alice', 19]
      .map((cellContents) => within(rows[0]).getByText(cellContents))
      .forEach((htmlElement) => expect(htmlElement).toBeInTheDocument());

    ['Bob', 20]
      .map((cellContents) => within(rows[1]).getByText(cellContents))
      .forEach((htmlElement) => expect(htmlElement).toBeInTheDocument());
  });
});

describe('Component displays column sorting direction', () => {
  it('displays up arrow on ascending sort', () => {
    const { container } = render(
      <DataTable
        columns={columns}
        data={data}
        sorted={{ direction: 'asc', key: 'age' }}
      />,
    );

    expect(container.querySelector('#wine-sort-up-arrow')).toBeInTheDocument();
  });

  it('displays down arrow on descending sort', () => {
    const { container } = render(
      <DataTable
        columns={columns}
        data={data}
        sorted={{ direction: 'desc', key: 'age' }}
      />,
    );

    expect(container.querySelector('#wine-sort-down-arrow')).toBeInTheDocument();
  });
});

describe('Component interactions', () => {
  it('clicking on header emits sortingFn', async () => {
    const sortingFnMock = jest.fn();

    render(
      <DataTable
        columns={columns}
        data={data}
        sortingFn={sortingFnMock}
      />,
    );

    await userEvent.click(screen.getByText('Age'));
    expect(sortingFnMock).toHaveBeenCalledTimes(1);
  });
});
