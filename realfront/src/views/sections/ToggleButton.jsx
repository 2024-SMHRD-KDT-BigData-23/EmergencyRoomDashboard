import React from 'react';
import styled from 'styled-components';

const ToggleWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 50px;
  height: 30px;
  @media (max-width: 768px) {
    width: 60px;
    height: 34px;
  }
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const ToggleSlider = styled.label`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #0c3d54;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 30px;

  &:before {
    position: absolute;
    content: '';
    height: 22px;
    width: 22px;
    left: ${({ checked }) => (checked ? 'calc(100% - 26px)' : '4px')};
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
    @media (max-width: 768px) {
      height: 26px;
      width: 26px;
      left: ${({ checked }) => (checked ? 'calc(100% - 30px)' : '4px')};
      bottom: 4px;
    }
  }
`;

const ToggleButton = ({ checked, onChange }) => {
  return (
    <ToggleWrapper>
      <ToggleInput
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id="toggle-button"
      />
      <ToggleSlider checked={checked} htmlFor="toggle-button" />
    </ToggleWrapper>
  );
};

export default ToggleButton;
