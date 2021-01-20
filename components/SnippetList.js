import React from "react";
import Snippet from "./Snippet";

export default function SnippetList({ snippets }) {
	return (
		<>
			{snippets &&
				snippets.map(snippet => <Snippet key={snippet.id} snippet={snippet} />)}
		</>
	);
}
