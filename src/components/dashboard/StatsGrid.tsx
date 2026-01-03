"use client";

import { Box } from "@mui/material";
import StatBox, { StatBoxProps } from "@/features/dashboard/StatBox";

interface StatsGridProps {
  stats: StatBoxProps[];
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: 3,
        flexWrap: { xs: "wrap", sm: "nowrap" },
        boxSizing: "border-box",
      }}
    >
      {stats.map((stat, index) => (
        <Box
          key={stat.label || index}
          sx={{
            flex: 1,
            minWidth: { xs: "100%", sm: 0 },
            maxWidth: { sm: "none" },
            boxSizing: "border-box",
          }}
        >
          <StatBox {...stat} />
        </Box>
      ))}
    </Box>
  );
};

export default StatsGrid;

