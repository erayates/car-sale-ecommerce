"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TechnicalDetailsTab from "./technical-details-tab";

export default function AdvertTabs({ advert }: { advert: any }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: React.SetStateAction<string>
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Advert Details" value="1" />
            <Tab label="Technical Details" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">{advert.description}</TabPanel>
        <TabPanel value="2">
          <TechnicalDetailsTab advert={advert} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
