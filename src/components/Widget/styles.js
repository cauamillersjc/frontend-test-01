import { Dropdown } from "react-bootstrap";
import styled from "styled-components";

export const Card = styled.div`
  border: 1px solid #d4d4d4;
  width: 35rem;
  height: max-content;
  display: flex;
  flex-direction: column;

  /* SM Smartphone */
  @media only screen and (max-width : 419px) {
    width: 100%;   
  }

  /* Smartphone */
  @media only screen and (min-width : 420px) and (max-width : 767px) {
    width: 100%;
  }
`;

export const CardHeader = styled.div`
  border-bottom: 1px solid #d4d4d4;
  padding: 8px;
  display: flex;
  align-self: center;
  width: inherit;
`;

export const CardBody = styled.div`
  padding: 4px 8px;
  width: 100%;
`;

export const IconButton = styled(Dropdown.Toggle)`
  background-color: transparent;
  border: none;
  color: #aaa;
  transition: color 0.5s ease;

  &:hover, &:focus-visible, &.show {
    color: #333 !important;
    background-color: transparent !important;
  }

  &:active {
    color: #bbb !important;
    background-color: transparent;
  }
`;

export const ButtonsColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #ddd;
  padding-right: 4px;
  margin-left: -4px;
`;

export const WidgetTitle = styled.label`
    font-size: 1.5em;
    font-weight: 600;
`