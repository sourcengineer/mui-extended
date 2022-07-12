import React, { useState, useRef, ReactNode } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Divider,
  Grow,
  Hidden,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Stack,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { ArrowDropDown } from "@mui/icons-material";

const style: SxProps = {
  "&:hover": {
    backgroundColor: "secondary.main",
  },
};

type MenuButtonOption = {
  label: string;
  link: string;
  icon: ReactNode;
};

type MenuButtonProps = {
  label: string;
  icon: ReactNode;
  options: Array<MenuButtonOption>;
};

export default function MenuButton({ label, icon, options }: MenuButtonProps) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup ref={anchorRef} onClick={handleToggle}>
        <Button sx={{ ...style }} startIcon={icon}>
          <Hidden smDown>{label}</Hidden>
        </Button>
        <Button sx={{ ...style }} size="small">
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper sx={{ mt: "2px" }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {options.map((option, index) => (
                    <Stack key={index}>
                      <MenuItem component={Link} to={option.link} onClick={() => setOpen(false)}>
                        <ListItemIcon>{option.icon}</ListItemIcon>
                        <ListItemText>{option.label}</ListItemText>
                      </MenuItem>
                      {options.length - 1 > index && <Divider />}
                    </Stack>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
