import styled from 'styled-components'

export default {
  containerDiv: () => styled.div`
    font-size: 1rem;
    padding: 1em;
    margin: 0;
    background-color: ${props => props.theme.error.bgColor};
    color: ${props => props.theme.error.txtColor};
  `,
}
