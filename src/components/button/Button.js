import React from "react";
import styled from 'styled-components'
import Proptypes from 'prop-types';
import {ReactComponent as DeleteIconSvgComponent} from '../../assets/icons/delete.svg';


// prop-types
Button.propTypes = {
    text: Proptypes.string,
    onClick: Proptypes.func,
    isInline: Proptypes.bool,
    isActive: Proptypes.bool,
    icon: Proptypes.string, // delete,
};

// styled-component
const StyledButtonWrap = styled.div`
    ${props => props.isInline ? `display : inline-block;` : `display : block;`};
    margin : 0 8px;
    > button {
        ${props => props.isActive ? `border : 1px solid #ffe6ff` : `border : 1px solid transparent`};
        outline : none;
        cursor : pointer;
        padding : 4px 8px;
        font-size : 15px;
        font-weight : 400;
        color : #828282;
        background-color: transparent;
        border-radius: 4px;
                
        > svg {
        
            width : 18px;
            height : 18px;
        }
        
        ${props => props.icon && `padding : 0 8px; display : flex; align-items : center`}
        
    }
`;

function Button({text, onClick, isInline, isActive, icon}) {
    return (
        <StyledButtonWrap isInline={isInline} isActive={isActive} icon={icon}>
            <button onClick={onClick}>{text}{icon === 'delete' && <DeleteIconSvgComponent fill="#b30000"/>}</button>
        </StyledButtonWrap>
    )
}

export default React.memo(Button);
