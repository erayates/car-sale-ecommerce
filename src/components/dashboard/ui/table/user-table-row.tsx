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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import UpdateUserModal from "../../modals/user/update-user";

interface CustomTableRowProps {
  avatar: string;
  firstName: string;
  handleClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  lastName: string;
  role: string;
  id: string;
  email: string;
  onlineStatus: boolean;
  selected: any;
  user: any;
}

const CustomUserTableRow: React.FC<CustomTableRowProps> = ({
  selected,
  id,
  firstName,
  lastName,
  email,
  role,
  avatar,
  onlineStatus,
  handleClick,
  user,
}) => {
  const [open, setOpen] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const router = useRouter();

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDeleteUser = async () => {
    handleCloseMenu();
    const response = await fetch(`/api/v1/users/${id}`, { method: "DELETE" });
    if (response.ok && response.status === 200) {
      toast.success("User deleted successfully!");
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
            <Avatar alt={firstName + "+" + lastName + "Avatar"} src={avatar} />
            <Typography variant="subtitle2" noWrap>
              {firstName + " " + lastName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{role}</TableCell>

        <TableCell align="center">
          {onlineStatus ? (
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
        <MenuItem
          onClick={() => setOpenUpdateModal(true)}
          sx={{ color: "primary.main", gap: 1 }}
        >
          <FiEdit2 className="mr-2" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={handleDeleteUser}
          sx={{ color: "error.main", gap: 1 }}
        >
          <GoTrash className="mr-2" />
          Delete
        </MenuItem>
      </Popover>

      <UpdateUserModal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        user={user}
      />
    </>
  );
};

export default CustomUserTableRow;
