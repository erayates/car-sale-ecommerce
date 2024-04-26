import { faker } from "@faker-js/faker";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import Iconify from "src/components/iconify";

import AppTasks from "../app-tasks";
import AppNewsUpdate from "../app-news-update";
import AppOrderTimeline from "../app-order-timeline";
import AppCurrentVisits from "../app-current-visits";
import AppWebsiteVisits from "../app-website-visits";
import AppWidgetSummary from "../app-widget-summary";
import AppTrafficBySite from "../app-traffic-by-site";
import AppCurrentSubject from "../app-current-subject";
import AppConversionRates from "../app-conversion-rates";
import DashboardWidgetSummary from "./dashboard-widget-summary";
import Image from "next/image";
import DashboardLatestMessages from "./dashboard-latest-messages";
import DashboardLatestUsers from "./dashboard-latest-users";

// ----------------------------------------------------------------------

export default function DashboardContainer() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <DashboardWidgetSummary
            title="Total Adverts"
            total={714000}
            color="success"
            icon={
              <Image alt="icon" src="/assets/icons/ic_glass_bag.png" fill />
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <DashboardWidgetSummary
            title="New Users"
            total={1352831}
            color="info"
            icon={
              <Image alt="icon" src="/assets/icons/ic_glass_users.png" fill />
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <DashboardWidgetSummary
            title="Sold Cars"
            total={1723315}
            color="warning"
            icon={
              <Image alt="icon" src="/assets/icons/ic_glass_buy.png" fill />
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <DashboardWidgetSummary
            title="Messages"
            total={234}
            color="error"
            icon={
              <Image alt="icon" src="/assets/icons/ic_glass_message.png" fill />
            }
          />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <DashboardLatestMessages
            title="Latest Messages"
            list={[...Array(5)].map((_, index) => ({
              firstName: faker.person.firstName(),
              lastName: faker.person.lastName(),
              content: faker.commerce.productDescription(),
              createdAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <DashboardLatestUsers
            title="Latest Users"
            list={[...Array(5)].map((_, index) => ({
              firstName: faker.person.firstName(),
              lastName: faker.person.lastName(),
              email: faker.internet.email(),
              createdAt: faker.date.recent(),
              onlineStatus: faker.datatype.boolean({ probability: 0.5 }),
            }))}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
