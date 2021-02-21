-- create language enum for snippets
CREATE TYPE language AS ENUM (
	'HTML',
	'CSS',
	'JavaScript',
	'JSX',
	'SQL',
	'Python',
	'PHP',
	'Perl',
	'Dart',
	'Go',
	'XML',
	'Java',
	'C#',
	'C++',
	'C',
	'.NET',
	'TypeScript',
	'Ruby',
	'Scala'
);
-- create timestamp updater function
CREATE OR REPLACE FUNCTION trigger_set_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--create user table
CREATE TABLE users (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	username VARCHAR(25) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	hashed_password VARCHAR(255) NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
);
--create snippet table
CREATE TABLE snippet (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	language language,
	code TEXT NOT NULL,
	user_id int NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	FOREIGN KEY (user_id) REFERENCES users(id)
);
--Create trigger to execute function we defined
CREATE TRIGGER set_timestamp BEFORE
UPDATE ON snippet FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
-- Dummy Data INSERT QUERIES
INSERT INTO users (id, username, email, hashed_password)
VALUES (
		'id:bigint',
		'username:character varying',
		'email:character varying',
		'hashed_password:character varying'
	);
INSERT INTO snippet (id, name, description, language, code, user_id)
VALUES (
		'id:bigint',
		'name:character varying',
		'description:text',
		'language:USER-DEFINED',
		'code:text',
		user_id :integer
	);
--Example:
INSERT INTO snippet (name, description, language, code, user_id)
VALUES (
		'Next.js Router',
		'Use Router Hook in Next.js',
		'JavaScript',
		'const router = useRouter();',
		3
	)