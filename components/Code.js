import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import { Box, Button } from "@chakra-ui/react";
import Confetti from "react-dom-confetti";
import ConfettiWrapper from "./ConfettiWrapper";
import CodeWrapper from "./CodeWrapper";

const exampleCode = `
import React, { useState } from "react";
 
function Example() {
  const [count, setCount] = useState(0);
 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
`.trim();

const config = {
	angle: 90,
	spread: 360,
	startVelocity: 40,
	elementCount: 70,
	dragFriction: 0.12,
	duration: 3000,
	stagger: 3,
	width: "10px",
	height: "10px",
	perspective: "500px",
	colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const Code = ({ code, language, ...props }) => {
	const [isCopied, setIsCopied] = React.useState(false);

	const copyToClipboard = str => {
		const el = document.createElement("textarea");
		el.value = str;
		el.setAttribute("readonly", "");
		el.style.position = "absolute";
		el.style.left = "-9999px";
		document.body.appendChild(el);
		el.select();
		document.execCommand("copy");
		document.body.removeChild(el);
	};

	const handleCopy = () => {
		copyToClipboard(code);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 3000);
	};
	return (
		<CodeWrapper>
			<Highlight
				{...defaultProps}
				theme={theme}
				code={code}
				language={language.toLowerCase()}
			>
				{({ className, style, tokens, getLineProps, getTokenProps }) => (
					<Box
						as="pre"
						textAlign="left"
						m="1em 1.2rem"
						pt={4}
						px={1}
						pb={2}
						zIndex="0"
						fontSize={{ base: "xs", md: "sm" }}
						overflowX="auto"
						className={className}
						style={style}
					>
						<Button
							size="sm"
							position="absolute"
							textTransform="uppercase"
							colorScheme="teal"
							fontSize="xs"
							fontFamily="sans-serif"
							height="24px"
							top={1}
							letterSpacing="wide"
							zIndex="1"
							right={{ base: "1.4rem", md: "1.7rem" }}
							cursor="pointer"
							onClick={handleCopy}
						>
							{isCopied ? "🎉 Copied!" : "Copy"}
						</Button>
						{tokens.map((line, i) => (
							<Box
								display="table-row"
								key={i}
								{...getLineProps({ line, key: i })}
							>
								<Box
									as="span"
									display="table-cell"
									textAlign="right"
									pr="1em"
									userSelect="none"
									opacity="0.5"
									fontSize="xs"
								>
									{i + 1}
								</Box>
								<Box as="span" display="table-cell">
									{line.map((token, key) => (
										<span key={key} {...getTokenProps({ token, key })} />
									))}
								</Box>
							</Box>
						))}
					</Box>
				)}
			</Highlight>
			<ConfettiWrapper>
				<Confetti active={isCopied} config={config} />
			</ConfettiWrapper>
		</CodeWrapper>
	);
};

export default Code;
