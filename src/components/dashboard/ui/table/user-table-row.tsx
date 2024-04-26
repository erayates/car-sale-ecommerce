import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { FiEdit2 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { FiMoreVertical } from "react-icons/fi";
import { Chip } from "@mui/material";

interface CustomTableRowProps {
  avatar: string;
  firstName: string;
  handleClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  lastName: string;
  role: string;
  email: string;
  status: string;
  selected: any;
}

const CustomUserTableRow: React.FC<CustomTableRowProps> = ({
  selected,
  firstName,
  lastName,
  email,
  role = "User",
  avatar,
  status,
  handleClick,
}) => {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={firstName + "+" + lastName + "Avatar"} src={avatar} />
            <Typography variant="subtitle2" noWrap>
              {firstName + " " + lastName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{role}</TableCell>

        <TableCell align="center">
          {status ? (
            <Chip label="Online" color="success" size="small" />
          ) : (
            <Chip label="Offline" size="small" />
          )}
        </TableCell>


        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <FiMoreVertical />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <FiEdit2 className="mr-2" />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: "error.main" }}>
          <GoTrash className="mr-2" />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
};

export default CustomUserTableRow;
