/** @jsxImportSource @emotion/react */
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const wrapperStyles = {
  position: 'absolute',
  top: 7,
  left: '20%',
};

const Loader = () => {
  return (
    <div css={wrapperStyles}>
      <ClipLoader margin={1} size={23} color={'#ff4b0a'} />
    </div>
  );
};

export default Loader;
