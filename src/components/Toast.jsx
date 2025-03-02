import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

export default function Toast({message}) {
  const [state, setState] = React.useState({
    open: false,
    Transition: Slide,
  });

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <div>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        slots={{ transition: state.Transition }}
        message={message}
        key={state.Transition.name}
        autoHideDuration={1200}
      />
      <p onClick={handleClose}>x</p>
    </div>
  );
}
