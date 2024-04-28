"use client";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { GoPlus } from "react-icons/go";
import CustomTable from "@/components/dashboard/ui/table";

export default function AdvertsContainer({
  adverts,
}: {
  adverts: AdvertInterface[];
}) {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Adverts</Typography>

        <Button variant="contained" color="inherit" startIcon={<GoPlus />}>
          New Advert
        </Button>
      </Stack>

      <CustomTable data={adverts} type="adverts" />
    </Container>
  );
}
