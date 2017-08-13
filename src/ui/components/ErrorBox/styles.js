import styled from 'styled-components/native'

export default {
  containerView: () => styled.View`
    padding: 1em;
    margin: 0;
    background-color: ${props => props.theme.error.bgColor};
  `,
  text: () => styled.Text`
    color: ${props => props.theme.error.txtColor};
  `,
}
