import styled from 'styled-components'

export default {
  overlayDiv: () => styled.div`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: #000;
    opacity: 0.8;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
}
