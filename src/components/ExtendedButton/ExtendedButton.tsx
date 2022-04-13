import { Button } from "@mui/material";
import React from "react";

export type ExtendedButtonProps = {
  text: string;
};

function ExtendedButton({ text }: ExtendedButtonProps) {
  return <Button variant="contained">{text}</Button>;
}

export default ExtendedButton;
