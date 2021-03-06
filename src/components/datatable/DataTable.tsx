import React from 'react';
import DataTableBody from './DataTableBody';
import DataTableHead from './DataTableHead';
import { Column, Identifiable, SortedByKey } from './types';
import './DataTable.module.css';

interface Props<T, K extends keyof T> {
  columns: Column<T, K>[];
  data: T[];
  sorted?: SortedByKey<T, K>;
  sortingFn?: (key: K) => void;
}

const DataTable = <T extends Identifiable, K extends keyof T>({
  columns,
  data,
  sorted = { direction: 'unsorted' },
  sortingFn = () => {},
}: Props<T, K>): JSX.Element => (
  <table>
    <DataTableHead columns={columns} sorted={sorted} sortingFn={sortingFn} />
    <DataTableBody columns={columns} data={data} />
  </table>
  );

export default DataTable;
