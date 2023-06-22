CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() NOT NULL,
    username TEXT NOT NULL,
	avatar_url TEXT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE user_hair_types (
    id UUID DEFAULT uuid_generate_v4() NOT NULL,
    user_id UUID NOT NULL UNIQUE,
    hair_type TEXT,
    is_public BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
