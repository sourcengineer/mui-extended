import React, { ReactNode } from "react";

import { Alert, AlertColor, AlertTitle, Typography } from "@mui/material";

type AlertExtendedProps = {
  type: AlertColor;
  title?: string;
  children: ReactNode;
};

export default function AlertExtended({ type, title, children: content }: AlertExtendedProps) {
  return (
    <Alert sx={{ width: 1 }} severity={type}>
      {title && <AlertTitle>{title}</AlertTitle>}
      <Typography component="div" marginTop="-2px" fontSize="14px !important" textAlign="justify">
        {content}
      </Typography>
    </Alert>
  );
}
