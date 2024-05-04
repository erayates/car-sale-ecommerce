import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button, Chip } from "@mui/material";

import { FiEdit2, FiMoreVertical } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import { MdPublishedWithChanges } from "react-icons/md";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
  id: string;
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
  id,
  handleClick,
}) => {
  const [open, setOpen] = useState(null);
  const [openStatus, setOpenStatus] = useState(null);
  const router = useRouter();

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleOpenStatusMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenStatus(event.currentTarget);
  };

  const handleCloseStatusMenu = () => {
    setOpenStatus(null);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleChangeStatus = async (status: string) => {
    handleCloseStatusMenu();
    const response = await fetch(`/api/v1/adverts/${id}?status=${status}`, {
      method: "PUT",
    });

    if (response.ok && response.status === 200) {
      toast.success("Advert status changed successfully!");
      router.refresh();
      return;
    }
    toast.error("Something went wrong!");
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

        <TableCell align="left">
          <Button onClick={handleOpenStatusMenu} sx={{ mr: 1 }}>
            <MdPublishedWithChanges style={{ fontSize: 24 }} />
          </Button>
          {advertStatus[status]}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <FiMoreVertical />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openStatus}
        anchorEl={openStatus}
        onClose={handleCloseStatusMenu}
        anchorOrigin={{ vertical: "center", horizontal: "right" }}
        transformOrigin={{ vertical: "center", horizontal: "right" }}
        PaperProps={{
          sx: { width: 160 },
        }}
      >
        <MenuItem
          onClick={() => handleChangeStatus("approved")}
          sx={{ color: "success.main" }}
        >
          Approved
        </MenuItem>
        <MenuItem
          onClick={() => handleChangeStatus("pending")}
          sx={{ color: "primary.main" }}
        >
          Pending
        </MenuItem>
        <MenuItem
          onClick={() => handleChangeStatus("denied")}
          sx={{ color: "error.main" }}
        >
          Denied
        </MenuItem>
      </Popover>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 160 },
        }}
      >
        <MenuItem
          onClick={handleCloseMenu}
          sx={{ gap: 1, color: "primary.main" }}
          component="a"
          href={`/advert/preview/${slug}`}
        >
          <FaEye />
          Preview
        </MenuItem>
        <MenuItem
          onClick={handleCloseMenu}
          sx={{ color: "error.main", gap: 1 }}
        >
          <GoTrash />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
};

export default CustomAdvertTableRow;
