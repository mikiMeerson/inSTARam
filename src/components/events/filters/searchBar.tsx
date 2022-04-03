import { Autocomplete, TextField } from '@mui/material';
import { IEvent } from '../../../types/interfaces';

interface Props {
  events: IEvent[];
  setSearch: (param: string) => void;
}

const SearchBar = ({ events, setSearch }: Props) => (
  <Autocomplete
    sx={{ width: '80%' }}
    options={events.map((e) => e.name)}
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
