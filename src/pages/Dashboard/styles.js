import styled from "styled-components";
import { Navbar, Button } from 'react-bootstrap';

export const TopNavbar = styled(Navbar)`
  border: 1px solid #d4d4d4;
  background-color: #fff;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 24px;
`;

export const FixedButton = styled(Button)`
  position: absolute;
  bottom: 0px;
  right: 0px;
  padding: 12px;
  margin: 24px;
  display: flex;
`;