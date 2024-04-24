import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export default function CustomTableEmptyRows({
  emptyRows,
  height,
}: {
  emptyRows: number;
  height: number;
}) {
  if (!emptyRows) {
    return null;
  }

  return (
    <TableRow
      sx={{
        ...(height && {
          height: height * emptyRows,
        }),
      }}
    >
      <TableCell colSpan={9} />
    </TableRow>
  );
}
