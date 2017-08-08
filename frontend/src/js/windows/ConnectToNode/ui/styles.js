import styled from 'styled-components'

export default {
  pageDiv: () => styled.div`
    font-size: 16px;
    height: 100vh;
    padding: 1em;
    margin: 0;
    background-color: ${props => props.theme.page.bgColor}
  `,
}
