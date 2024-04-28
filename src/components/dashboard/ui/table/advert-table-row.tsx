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

const advertStatus: {
  [key: string]: React.JSX.Element;
  pending: React.JSX.Element;
  approved: React.JSX.Element;
  denied: React.JSX.Element;
} = {
  pending: <Chip label="Pending" color="primary" />,
  approved: <Chip label="Approved" color="success" />,
  denied: <Chip label="Denied" color="error" />,
};

interface CustomTableRowProps {
  title: string;
  description: string;
  handleClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uid: string;
  slug: string;
  status: string;
  selected: any;
}

const CustomAdvertTableRow: React.FC<CustomTableRowProps> = ({
  selected,
  title,
  description,
  uid,
  slug,
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
            <Typography variant="subtitle2" noWrap>
              {title.slice(0, title.length > 15 ? 15 : title.length) + "..."}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          {description.slice(
            0,
            description.length > 30 ? 30 : description.length
          ) + "..."}
        </TableCell>
        <TableCell>
          {slug.slice(0, slug.length > 10 ? 10 : slug.length) + "..."}
        </TableCell>

        <TableCell>{uid}</TableCell>

        <TableCell align="center">{advertStatus[status]}</TableCell>

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

export default CustomAdvertTableRow;
