import styled from 'styled-components'

export default {
  containerDiv: () => styled.div`
    font-size: 1rem;
    padding: 1em;
    margin: 0;
    background-color: #fff;
    color: #000;
    width: 50%;
    min-width: 640px;
    height: 50%;
    min-height: 480px;
    border-radius: 10px;
  `,
  listSelect: () => styled.select`
    margin-top: 10px;
  `,
  listOption: () => styled.option`
    padding: 0.1em;
  `,
}
