import { toast } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

import { CabinSortFieldType, ICabin } from '../../types/types';
import { useCabins } from './useCabins';

import Table from '../../ui/Table';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import Menus from '../../ui/Menus';

export default function CabinTable() {
  const { cabins, error, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (error && error instanceof Error) {
    toast.error(error.message);
  }

  // 1. Filter

  const filterValue = searchParams.get('discount') || 'all';
  let filteredCabins: ICabin[] = [];

  if (filterValue === 'all') {
    filteredCabins = cabins as ICabin[];
  }

  if (filterValue === 'no-discount') {
    filteredCabins = cabins?.filter(cabin => cabin.discount === 0) as ICabin[];
  }

  if (filterValue === 'with-discount') {
    filteredCabins = cabins?.filter(
      cabin => cabin.discount && cabin.discount > 0
    ) as ICabin[];
  }

  // 2. Sort
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split('-') as [
    CabinSortFieldType,
    'asc' | 'desc'
  ];
  console.log(field, direction, cabins?.at(0)?.name);
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (Number(a[field]!) - Number(b[field]!)) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin: ICabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
