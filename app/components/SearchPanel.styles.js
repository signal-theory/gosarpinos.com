import { styled } from '@mui/system';

export const StyledAutocomplete = styled('div')({
  width: 200,
  '& .MuiInputBase-root': {
    backgroundColor: 'white',
    borderRadius: '100px',
    padding: '0.2rem 1rem 0.25rem 1rem',
    fontFamily: 'museo-slab, Cambria, Cochin',
    fontSize: '0.875rem',
  },
  '& .MuiAutocomplete-popper': {
    fontFamily: 'museo-slab, Cambria, Cochin',
    fontSize: '0.875rem',
  },
  '& .MuiInputLabel-root': {
    fontFamily: 'museo-slab, Cambria, Cochin',
    fontSize: '0.875rem',
    transform: 'translate(20px, 0.7rem) scale(1)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    transform: 'translate(8px, -9px) scale(1)',
    fontSize: '0.7rem',
    color: 'white',
    backgroundColor: 'green',
    borderRadius: '100px',
    padding: '0 15px',
  },
  '& .MuiFormLabel-filled': {
    transform: 'translate(8px, -9px) scale(1)',
    fontSize: '0.7rem',
    color: 'white',
    backgroundColor: 'green',
    borderRadius: '100px',
    padding: '0 15px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ee3124',
    borderWidth: '0',
  },
});