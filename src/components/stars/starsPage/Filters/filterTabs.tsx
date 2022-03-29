import { useState } from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { filterField } from '../../../../types/configurations';
import FilterTab from './filterTab';

interface FilterProps {
    filterFields: filterField[];
    lastTab: string;
    displayOptions: boolean;
    search: boolean;
    handleFilterChoice: (field: filterField) => void;
    setDisplayOptions: (param: boolean) => void;
    setSearch: (param: boolean) => void;
}

const FilterTabs = ({
  filterFields,
  lastTab,
  displayOptions,
  search,
  handleFilterChoice,
  setDisplayOptions,
  setSearch,
}: FilterProps) => {
  const [displayMore, setDisplayMore] = useState<boolean>(false);

  return (
    <>
      <TableRow>
        <TableCell sx={{ width: '20px', textAlign: 'center' }}>
          <Button sx={{ textAlign: 'center' }}>
            <MoreVert
              fontSize="small"
              onClick={() => {
                setDisplayMore(!displayMore);
                setDisplayOptions(false);
                setSearch(false);
              }}
            />
          </Button>
        </TableCell>
        {filterFields.filter((f) => f.isPrimary).map((field: filterField) => (
          <FilterTab
            field={field}
            lastTab={lastTab}
            handleFilterChoice={handleFilterChoice}
            displayOptions={displayOptions}
            search={search}
          />
        ))}
      </TableRow>
      {displayMore && (
        <TableRow>
          {filterFields.filter((f) => !f.isPrimary)
            .map((field: filterField) => (
              <FilterTab
                field={field}
                lastTab={lastTab}
                handleFilterChoice={handleFilterChoice}
                displayOptions={displayOptions}
                search={search}
              />
            ))}
        </TableRow>
      )}
    </>
  );
};

export default FilterTabs;
