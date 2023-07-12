import styled from 'styled-components';
import { useState } from 'react';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import { ICabin } from '../../types/types';
import { formatCurrency } from '../../utils/helpers';
import { useDeleteCabin } from './useDeleteCabin';
import { useCreateCabin } from './useCreateCabin';
import CreateCabinForm from './CreateCabinForm';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

interface CabinRowProps {
  cabin: ICabin;
}

export default function CabinRow({ cabin }: CabinRowProps) {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  function duplicateCabin() {
    createCabin({
      name: `Copy of ${cabin.name!}`,
      maxCapacity: cabin.maxCapacity!,
      regularPrice: cabin.regularPrice!,
      description: cabin.description!,
      discount: cabin.discount!,
      image: cabin.image!,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={cabin.image || undefined} />
        <Cabin>{cabin.name}</Cabin>
        <div>Fits up to {cabin.maxCapacity} guests</div>
        <Price>
          {cabin.regularPrice ? formatCurrency(cabin.regularPrice) : 'unknown'}
        </Price>
        {cabin.discount ? (
          <Discount>
            {cabin.discount ? formatCurrency(cabin.discount) : 'unknown'}
          </Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={duplicateCabin} disabled={isCreating}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm(state => !state)}>
            <HiPencil />
          </button>
          <button
            onClick={() => cabin.id && deleteCabin(cabin.id)}
            disabled={isDeleting}
          >
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}
