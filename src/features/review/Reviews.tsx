import {
  Table, Tbody, Th, Thead, Tr,
} from '@chakra-ui/react';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectReviews } from '../../app/selectors';
import { ReviewProps } from './reviewAPI';
import { sortAsc } from './reviewSlice';

type Header = {
  key: ReviewProps,
  text: string
};

const reviewHeaders: Header[] = [
  {
    key: 'date',
    text: 'Päivämäärä',
  },
  {
    key: 'author',
    text: 'Arvostelija',
  },
  {
    key: 'reviewText',
    text: 'Arvostelu',
  },
  {
    key: 'rating',
    text: 'Arvosana',
  },
  {
    key: 'wine',
    text: 'Viini',
  },
];

const Reviews: React.FC = () => {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(selectReviews);

  const renderTableHead = (): JSX.Element => (
    <Thead>
      <Tr>
        {reviewHeaders.map(({ key, text }) => (
          <Th
            key={key}
            onClick={() => dispatch(sortAsc(key))}
            style={{ cursor: 'pointer' }}
          >
            {text}
          </Th>
        ))}
      </Tr>
    </Thead>
  );

  const renderTableBody = (): JSX.Element => (
    <Tbody>
      {reviews.map(({
        id, date, author, reviewText, rating, wine,
      }) => (
        <Tr key={id}>
          <Th>{date}</Th>
          <Th>{author}</Th>
          <Th>{reviewText}</Th>
          <Th>{rating}</Th>
          <Th>{wine?.name}</Th>
        </Tr>
      ))}
    </Tbody>
  );

  return (
    <Table variant="striped">
      {renderTableHead()}
      {renderTableBody()}
    </Table>
  );
};

export default Reviews;