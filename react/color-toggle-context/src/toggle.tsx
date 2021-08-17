import * as React from "react";
import { FC } from "react";
import styled, { css } from "styled-components";
import { useMode } from "./mode-context";

const Button = styled.button<{ nightMode?: boolean }>`
  background-color: rgb(193 160 218);
  color: rgb(12 35 64);
  border: 1px rgb(12 35 64) solid;
  ${({ nightMode }) =>
    nightMode &&
    css`
      color: rgb(193 160 218);
      background-color: rgb(12 35 64);
      border: 1px rgb(193 160 218) solid;
    `};
`;

export const Toggle: FC = () => {
  const { setNightMode, nightMode } = useMode();

  return (
    <Button
      onClick={() => {
        setNightMode(!nightMode);
      }}
      nightMode={nightMode}
    >
      hello worlds
    </Button>
  );
};
