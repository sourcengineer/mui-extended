import React, { ReactNode } from "react";

import { Card, CardContent, Divider, Icon, Stack, Typography } from "@mui/material";

type CardBoxProps = {
  icon?: ReactNode;
  title: ReactNode;
  titleColor?: any;
  children: ReactNode;
};

export default function CardBox({ icon, title, titleColor, children: content }: CardBoxProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" alignItems="center" spacing={1}>
            {icon && (
              <Icon component="svg" fontSize="large" color={titleColor}>
                {icon}
              </Icon>
            )}
            <Typography variant="h5" color={titleColor}>
              {title}
            </Typography>
          </Stack>
          <Divider />
          {content}
        </Stack>
      </CardContent>
    </Card>
  );
}
