CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() NOT NULL,
    username TEXT NOT NULL,
	avatar_url TEXT NOT NULL,
	PRIMARY KEY (id)
)
