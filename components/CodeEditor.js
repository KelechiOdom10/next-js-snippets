import React, { useState } from "react";
import { Controlled as ControlledEditor } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/python/python";

function CodeEditor({ theme, language }) {
	const [value, setValue] = useState("");

	const handleChange = (editor, data, value) => {
		setValue(value);
	};

	return (
		<>
			<ControlledEditor
				onBeforeChange={handleChange}
				value={value}
				className="code-mirror-wrapper"
				options={{
					lineWrapping: true,
					lint: true,
					mode: language === "html" ? "htmlmixed" : language,
					theme: theme,
					lineNumbers: true,
					tabSize: 4,
				}}
			/>
		</>
	);
}

export default CodeEditor;
