import { Autocomplete, TextField } from '@mui/material';
import { IStar, IEvent } from '../../../types/interfaces';

interface Props {
  list: IStar[] | IEvent[];
  setSearch: (param: string) => void;
}

const SearchBar = ({ list, setSearch }: Props) => (
  <Autocomplete
    sx={{ width: '80%' }}
    options={list.map((e) => e.name)}
    onChange={(event, value) => (value ? setSearch(value) : setSearch(''))}
    renderInput={(params) => (
      <TextField
        {...params}
        label="חפש לפי שם האירוע"
        onChange={(e) => setSearch(e.target.value)}
      />
    )}
  />
);

export default SearchBar;
