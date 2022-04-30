import React from 'react';
import Swatch from './Swatch';
import '../styles/Palette.scss';

const Palette = (props) => {
  return (
    <div className="palette">
      <Swatch hValue="227" sValue="76" bValue="71" />
    </div>
  );
};

export default Palette;
