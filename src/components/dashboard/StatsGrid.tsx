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
        px: 2,
        flexWrap: { xs: "wrap", sm: "nowrap" },
      }}
    >
      {stats.map((stat, index) => (
        <Box
          key={stat.title || index}
          sx={{
            flex: 1,
            minWidth: { xs: "100%", sm: 0 },
          }}
        >
          <StatBox {...stat} />
        </Box>
      ))}
    </Box>
  );
};

export default StatsGrid;

