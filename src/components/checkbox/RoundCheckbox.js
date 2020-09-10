import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

RoundCheckbox.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};

const StyledRoundCheckboxWrap = styled.div`
    position: relative;
    
    > input[type="checkbox"] {
        visibility: hidden;
    }
    
    > label {
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 50%;
        cursor: pointer;
        height: 24px;
        left: 0;
        position: absolute;
        top: 0;
        width: 24px;
                
        &:after {
            content: "✔";
            position: absolute;
            left: 4px;
            opacity: 0;
            font-size: 15px;
            color : #aeeaea;
        }
        
    }
    
    > input[type="checkbox"]:checked + label {
       
        border-color: #aeeaea;
        
        &:after {
            opacity: 1;
        }
        
    }
    
`;


export default function RoundCheckbox({checked, onChange}) {

    const onClickCheckbox = (e) => {
        onChange(e.target.checked);
    };

    return (
        <StyledRoundCheckboxWrap onClick={onClickCheckbox}>
            <input type="checkbox" checked={checked}/>
            <label></label>
        </StyledRoundCheckboxWrap>
    )
}
