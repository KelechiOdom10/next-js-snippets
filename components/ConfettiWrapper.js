import { Box } from "@chakra-ui/react";
import React from "react";

function ConfettiWrapper(props) {
	return <Box position="absolute" top="0" right="0" {...props} />;
}

export default ConfettiWrapper;
