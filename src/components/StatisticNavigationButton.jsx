import { Box } from "@chakra-ui/react";

function StatisticNavigationButton({ children, onClick }) {
  return (
    <Box cursor="pointer" _hover={{ opacity: 0.5 }} onClick={onClick}>
      {children}
    </Box>
  );
}

export default StatisticNavigationButton;
