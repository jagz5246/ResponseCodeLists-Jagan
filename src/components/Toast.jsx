import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function GrowTransition(props) {
  return <Grow {...props} />;
}

export default function Toast({message}) {
  const [state, setState] = React.useState({
    open: false,
    Transition: Slide,
  });

  // const handleClick = (Transition) => () => {
  //   setState({
  //     open: true,
  //     Transition,
  //   });
  // };

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
