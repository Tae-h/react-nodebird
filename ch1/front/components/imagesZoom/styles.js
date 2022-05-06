import styled, {createGlobalStyle} from "styled-components";
import {CloseOutlined} from "@ant-design/icons";

export const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const Header = styled.header`
  height: 44px;
  background: white;
  position: relative;
  padding: 0;Ï
  text-align: center;
  
  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }
  /*& button {
    position: absolute;
    right: 0;
    top: 0;
    padding: 15px;
    line-height: 14px;
    cursor: pointer;
  }*/
`;

/*const CloseButton = styled.button`

`;*/

export const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #090909;
`;

export const ImageWrapper = styled.div`
    padding: 32px;
  text-align: center;
  
  & img {
    margin: 0 auto;
    max-height: 750px;
  }
`;

export const Indicator = styled.div`
  text-align: center;
  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #313131;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
  }
`;

export const CloseBtn  = styled(CloseOutlined)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
`;

// 아무대나 넣어주면 됨
export const Global = createGlobalStyle`
  .slick-slide { // 이렇게 하면 덮어써짐
    display: inline-block;
  }
  .ant-card-cover {
    transform: none;
  }
`;