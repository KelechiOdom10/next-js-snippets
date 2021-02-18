import React, { useState } from "react";
import { Controlled as ControlledEditor } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/python/python";
import "codemirror/mode/sql/sql";
import "codemirror/mode/clike/clike";

function CodeEditor({ theme, language, code, setCode }) {
	const handleChange = (editor, data, value) => {
		setCode(value);
	};

	const switchLanguage = language => {
		switch (language?.toLowerCase()) {
			case "html":
			case "xml":
				return "htmlmixed";
			case "jsx":
				return "javascript";
			default:
				return language?.toLowerCase();
		}
	};

	return (
		<>
			<ControlledEditor
				onBeforeChange={handleChange}
				value={code}
				className="code-mirror-wrapper"
				options={{
					lineWrapping: true,
					lint: true,
					mode: `${switchLanguage(language)}`,
					theme: theme,
					lineNumbers: true,
					tabSize: 4,
				}}
			/>
		</>
	);
}

export default CodeEditor;
