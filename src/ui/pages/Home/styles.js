import styled from 'styled-components/native'

export default {
  pageView: () => styled.View`
    height: 100%;
    width: 100%;
    background-color: ${props => props.theme.page.bgColor};
  `,
}
