import React from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';

const CodePanel = (props) => {
  // function capitalizeFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

  // let colorName = capitalizeFirstLetter(props.color);

  console.log(props);

  let displayCode = `
      "${props.color}": {${props.innerCode}},`;

  return (
    <div className="code-panel">
      <CopyBlock
        text={displayCode}
        language="javascript"
        theme={dracula}
        codeBlock
      />
    </div>
  );
};

export default CodePanel;
