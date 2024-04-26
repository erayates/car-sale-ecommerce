"use client";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { GoPlus } from "react-icons/go";
import CustomTable from "@/components/dashboard/ui/table";
import { UserType } from "@/types/user";

// ----------------------------------------------------------------------

export default function UsersContainer({ users }: { users: UserType[] }) {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Users</Typography>

        <Button variant="contained" color="inherit" startIcon={<GoPlus />}>
          New User
        </Button>
      </Stack>

      <CustomTable data={users} type="users" />
    </Container>
  );
}
