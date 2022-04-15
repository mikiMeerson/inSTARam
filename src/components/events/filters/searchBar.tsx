import { Autocomplete, TextField } from '@mui/material';
import { IStar, IEvent } from '../../../types/interfaces';

interface Props {
  list: IStar[] | IEvent[];
  setSearch: (param: string) => void;
  placeholder: string;
}

const SearchBar = ({ list, setSearch, placeholder }: Props) => (
  <Autocomplete
    sx={{ width: '80%' }}
    freeSolo
    options={list.map((listItem) => listItem.name)}
    onChange={(event, value) => (value ? setSearch(value) : setSearch(''))}
    renderInput={(params) => (
      <TextField
        {...params}
        label={placeholder}
        onChange={(e) => setSearch(e.target.value)}
      />
    )}
  />
);

export default SearchBar;
