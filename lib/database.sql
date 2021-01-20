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
	'Go'
);
CREATE TABLE users (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	username VARCHAR(25) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	hashed_password VARCHAR(255) NOT NULL
);
CREATE TABLE snippet (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	language language,
	code TEXT NOT NULL,
	user_id int FOREIGN KEY REFERENCES users(id)
);
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
		1
	)