import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { css } from 'styled-components';
import { Link } from 'react-router-dom'

const buttonStyle = css`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline : pointer;
    cursor: pointer;
    
${props =>
props.fullWidth &&
css`
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    width: 100%;
    font-size: 1.125rem;
    `}

${props => 
props.cyan &&
css`
    background: ${palette.cyan[5]};
    &:hover {
        background: ${palette.cyan[4]};
    }
`}

&:disabled {
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursur: not-allowed;
}
`;

const StyledButton = styled.button`
${buttonStyle}`


const StyledLink = styled(Link)`
${buttonStyle}`





const Button = props => {
    return props.to ? (
        <StyledLink {...props} cyan={props.cyan? 1 : 0} />
    ) : (
        <StyledButton {...props}  />
    )
};




export default Button;