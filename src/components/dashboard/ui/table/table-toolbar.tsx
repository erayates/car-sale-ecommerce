import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import { IoIosSearch } from "react-icons/io";
import { GoTrash } from "react-icons/go";
import { toast } from "react-toastify";

export default function CustomTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  type,
  selectedItems,
}: {
  numSelected: number;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  selectedItems: string[];
}) {
  const handleDeleteItems = async () => {
    let deleteSuccessCount = 0;
    for (const itemId of selectedItems) {
      console.log(itemId);
      const response = await fetch(`/api/v1/${type}/${itemId}`, {
        method: "DELETE",
      });

      if (response.ok && response.status === 200) {
        deleteSuccessCount += 1;
      }
    }

    toast.success(
      `${deleteSuccessCount} / ${selectedItems.length} ${type} deleted successfully.`
    );

    if (deleteSuccessCount !== selectedItems.length) {
      toast.error(
        `${
          selectedItems.length - deleteSuccessCount
        } items failed when try to delete.`
      );
    }
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: "flex",
        justifyContent: "space-between",
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <IoIosSearch
                style={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteItems}>
            <GoTrash />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
