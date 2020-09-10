import React from "react";
import styled from 'styled-components'
import PropTypes from 'prop-types';

import { ReactComponent as CheckIconSvgComponent } from '../../assets/icons/check.svg';

InputText.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeyUp : PropTypes.func,
    placeholder: PropTypes.string,
    isIcon : PropTypes.bool,
    checked : PropTypes.bool,
    isInset : PropTypes.bool,
};

const StyledInputTextWrap = styled.div`

    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    background-color : white;
    padding : 16px;
    
    > input[type="text"] {
        font-size : 16px;
        border : none;
        outline : none;
        width : 100%;
        padding : 8px;
        
        &::placeholder {
          color: #dedede;
          font-style: italic;
        }
        
    }
    
    ${props => props.isIcon && `display : flex; align-items : stretch`}
    ${props => props.isInset && `box-shadow: inset 0 1px 5px rgba(0,0,0,0.65); width:100%`}

`;

const StyledCheckIconSvgWrap = styled.div`
    display : flex;
    align-items : center;
    padding : 8px;
    cursor : pointer;
    > svg {
        width : 16px;
        height : 16px;
    }
`;

function InputText({value, onChange, onKeyUp, placeholder, isIcon, checked, onClick, isInset}) {

    const onChangeInputText = (e) => {
        onChange(e.target.value);
    };

    const onKeyUpInputText = (e) => {
      if(e.key === `Enter`) {
          onKeyUp();
      }
    };

    return (
        <StyledInputTextWrap isIcon={isIcon} isInset={isInset}>
            {isIcon && <StyledCheckIconSvgWrap onClick={onClick}><CheckIconSvgComponent fill={checked ? `#6e6e6e` : `#dedede` } /> </StyledCheckIconSvgWrap>}
            <input type="text" value={value} onChange={onChangeInputText} placeholder={placeholder} onKeyUp={onKeyUpInputText}/>
        </StyledInputTextWrap>
    )
}

export default React.memo(InputText);
