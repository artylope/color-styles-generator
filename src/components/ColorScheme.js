import React from 'react';
import ColorBox from './ColorBox';
import '../styles/ColorScheme.scss';

const ColorScheme = (props) => {
  return (
    <div className="color-scheme">
      <ColorBox color="#FFC75F" name="primary" />
      <ColorBox color="#FFC75F" name="primary" />
      <ColorBox color="#FFC75F" name="primary" />
      <ColorBox color="#FFC75F" name="primary" />
      <ColorBox color="#FFC75F" name="primary" />
      <ColorBox color="#FFC75F" name="primary" />
      <ColorBox color="#FFC75F" name="primary" />
    </div>
  );
};

export default ColorScheme;
