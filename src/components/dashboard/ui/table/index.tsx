import {
  Card,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import CustomTableToolbar from "./table-toolbar";
import CustomTableHead from "./table-head";
import CustomTableNoData from "./table-no-data";
import CustomTableEmptyRows from "./table-empty-rows";
import { useState } from "react";
import { applyFilter, emptyRows, getComparator } from "./utils";
import CustomUserTableRow from "./user-table-row";
import CustomAdvertTableRow from "./advert-table-row";

interface TableHeadItem {
  id: string;
  label?: string;
  align?: string;
}

interface TableHeads {
  [key: string]: TableHeadItem[];
}

const tableHeads: TableHeads = {
  users: [
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "role", label: "Role" },
    { id: "status", label: "Status", align: "center" },
    { id: "" },
  ],
  adverts: [
    { id: "title", label: "Title" },
    { id: "description", label: "Description" },
    { id: "slug", label: "Slug" },
    { id: "uid", label: "UID" },
    { id: "status", label: "Status" },
    { id: "" },
  ],
};

const CustomTable = ({ data, type }: { data: any[]; type: string }) => {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const renderUsersTableBody = () => {
    return dataFiltered
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row: any, idx: number) => (
        <CustomUserTableRow
          user={row}
          key={idx}
          firstName={row.firstName}
          id={row.id}
          email={row.email}
          role={row.role}
          onlineStatus={row.onlineStatus}
          lastName={row.lastName}
          avatar={row.avatar}
          selected={selected.indexOf(row.id) !== -1}
          handleClick={(event) => handleClick(event, row.id)}
        />
      ));
  };

  const renderAdvertsTableBody = () => {
    return dataFiltered
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row: any, idx: number) => (
        <CustomAdvertTableRow
          key={idx}
          id={row.id}
          title={row.title}
          description={row.description}
          status={row.status}
          uid={row.uid}
          slug={row.slug}
          selected={selected.indexOf(row.id) !== -1}
          handleClick={(event) => handleClick(event, row.id)}
        />
      ));
  };

  const handleSort = (event: React.MouseEvent<HTMLSpanElement>, id: string) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: any[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(order, orderBy),
    type: type,
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Card>
      <CustomTableToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
        selectedItems={selected}
        type={type}
      />

      <TableContainer sx={{ overflow: "unset" }}>
        <Table sx={{ minWidth: 800, overflowX: "scroll" }}>
          <CustomTableHead
            order={order}
            orderBy={orderBy}
            rowCount={data.length}
            numSelected={selected.length}
            onRequestSort={handleSort}
            onSelectAllClick={handleSelectAllClick}
            headLabel={tableHeads[type]}
          />
          <TableBody>
            {type === "users" && renderUsersTableBody()}
            {type === "adverts" && renderAdvertsTableBody()}

            <CustomTableEmptyRows
              height={77}
              emptyRows={emptyRows(page, rowsPerPage, data.length)}
            />

            {notFound && <CustomTableNoData query={filterName} />}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        page={page}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default CustomTable;
