import styled from 'styled-components'

export default {
  pageDiv: () => styled.div`
    height: 100vh;
    width: 100vw;
    background-color: ${props => props.theme.page.bgColor};
  `,
}
