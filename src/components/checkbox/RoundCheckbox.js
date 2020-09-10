import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

RoundCheckbox.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.number,
    name: PropTypes.string,
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

function RoundCheckbox({checked, onChange, value, name}) {

    return (
        <StyledRoundCheckboxWrap>
            <input id={name} type="checkbox" checked={checked} value={value}
                   onChange={(e) => onChange(e.target.checked, e.target.value)}/>
            <label htmlFor={name}></label>
        </StyledRoundCheckboxWrap>
    )
}

export default React.memo(RoundCheckbox)
