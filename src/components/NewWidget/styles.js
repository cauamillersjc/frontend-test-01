import { Button, Row } from "react-bootstrap";
import styled from "styled-components";

export const Card = styled.div`
  border: 1px solid #d4d4d4;
  border-bottom: none;
  width: 40rem;
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

export const CardHeader = styled(Row)`
  border-bottom: 1px solid #d4d4d4;
  padding: 8px;
  display: flex;
  align-self: center;
  width: inherit;
`;

export const CardBody = styled.div`
  padding: 8px;
  flex-grow: 1;
  display: flex;
`;

export const IconButton = styled(Button)`
  background-color: transparent;
  border: none;
  color: #aaa;
  transition: color 0.5s ease;

  &:hover, &:focus-visible {
    color: #333 !important;
    background-color: transparent !important;
  }

  &:active {
    color: #bbb !important;
    background-color: #fff !important;
  }

  &.active {
    background-color: #555 !important;
    transition: background-color 250ms ease-in;
  }

  &.active:hover {
    background-color: #555 !important;
    color: #fff !important;
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

export const ChartContainer = styled.div`
  flex-grow: 1;
  padding: 4px 8px;
  align-self: center;
`;

export const ChartTitle = styled.p`
  font-weight: 600;
  font-size: 1.1rem;
`

export const ChartFooter = styled.div`
  border-top: 1px solid #d4d4d4;
  border-bottom: 1px solid #d4d4d4;
`

export const DataContainer = styled.div`
  max-height: 10rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
  border-bottom: 1px solid #d4d4d4;
`