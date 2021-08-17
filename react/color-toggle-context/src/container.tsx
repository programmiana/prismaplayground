import * as React from "react";
import { FC } from "react";
import styled, { css } from "styled-components";
import { useMode } from "./mode-context";

const Container = styled.div<{ nightMode: boolean }>`
  display: flex;
  min-height: 100vh;
  margin: 0;
  padding:0;
  justify-content: center;
  align-items: center;
  background-color: rgb(193 160 218);
    color: rgb(12 35 64);
  ${({ nightMode }) =>
    nightMode &&
    css`
      color: rgb(193 160 218);
      background-color: rgb(12 35 64);
    `};
`;

export const LayoutContainer: FC = ({ children }) => {
  const { nightMode } = useMode();
  return <Container nightMode={nightMode}>{children}</Container>;
};
