import React, { ReactNode, useState, useEffect } from "react";

import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import { KeyboardArrowRight } from "@mui/icons-material";

const transitionProps = {
  timeout: 500,
};

const style = (theme: Theme): SxProps => {
  return {
    p: 0,
    pl: "10px",
    backgroundColor: theme.palette.grey[50],
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      ml: 1,
    },
  };
};

type SectionProps = {
  title: string;
  defaultExpanded?: boolean;
  children: ReactNode;
};

export default function Section({ title, defaultExpanded = true, children: content }: SectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  useEffect(() => setExpanded(defaultExpanded), [defaultExpanded]);

  return (
    <Box>
      <Accordion
        variant="outlined"
        sx={(theme) => ({
          borderWidth: "1px",
          borderColor: theme.palette.grey[100],
        })}
        expanded={expanded}
        onChange={(e, expanded) => setExpanded(expanded)}
        TransitionProps={transitionProps}
      >
        <AccordionSummary expandIcon={<KeyboardArrowRight />} sx={(theme) => ({ ...style(theme) })}>
          <Typography fontSize={18}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>{content}</AccordionDetails>
      </Accordion>
    </Box>
  );
}
