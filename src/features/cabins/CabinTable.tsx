import styled from 'styled-components';
import { toast } from 'react-hot-toast';

import { useCabins } from './useCabins';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import Table from '../../ui/Table';

// const Table = styled.div`
//   background-color: var(--color-grey-0);
//   font-size: 1.4rem;
//   border: 1px solid var(--color-grey-200);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   background-color: var(--color-grey-50);
//   color: var(--color-grey-600);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   padding: 1.6rem 2.4rem;
//   border-bottom: 1px solid var(--color-grey-100);
// `;

export default function CabinTable() {
  const { cabins, error, isLoading } = useCabins();

  if (isLoading) return <Spinner />;

  if (error && error instanceof Error) {
    toast.error(error.message);
  }

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      {cabins?.map(cabin => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </Table>
  );
}
