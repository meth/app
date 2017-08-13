import styled from 'styled-components/native'

export default {
  containerView: () => styled.View`
    padding: 1em;
    margin: 0;
    background-color: #fff;
    width: 50%;
    min-width: 640px;
    height: 50%;
    min-height: 480px;
    border-radius: 10px;
  `,
  todoText: () => styled.Text`
    color: '#000';
  `,
}
