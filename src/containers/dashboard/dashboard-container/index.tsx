import { faker } from "@faker-js/faker";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import DashboardWidgetSummary from "./dashboard-widget-summary";
import Image from "next/image";
import DashboardLatestMessages from "./dashboard-latest-messages";
import DashboardLatestUsers from "./dashboard-latest-users";
import { MessageType } from "@/types/message";
import { UserType } from "@/types/user";

export default function DashboardContainer({
  adverts,
  messages,
  users,
}: {
  adverts: AdvertInterface[];
  messages: MessageType[];
  users: UserType[];
}) {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <DashboardWidgetSummary
            title="Total Adverts"
            total={adverts.length ?? NaN}
            color="success"
            icon={
              <Image alt="icon" src="/assets/icons/ic_glass_bag.png" fill />
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <DashboardWidgetSummary
            title="New Users"
            total={users.length ?? NaN}
            color="info"
            icon={
              <Image alt="icon" src="/assets/icons/ic_glass_users.png" fill />
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <DashboardWidgetSummary
            title="Messages"
            total={messages.length ?? NaN}
            color="error"
            icon={
              <Image alt="icon" src="/assets/icons/ic_glass_message.png" fill />
            }
          />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <DashboardLatestMessages
            title="Latest Messages"
            list={messages?.slice(0, messages.length > 5 ? 5 : messages.length)}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <DashboardLatestUsers
            title="Latest Users"
            list={users?.slice(0, users.length > 5 ? 5 : users.length)}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
