CREATE TABLE owners(id SERIAL PRIMARY KEY, name VARCHAR (50) NOT NULL);

CREATE TABLE pets(
  id SERIAL PRIMARY KEY,
  name VARCHAR (50) NOT NULL,
  owner INTEGER NOT NULL,
  CONSTRAINT fk_owner FOREIGN KEY(owner) REFERENCES owners(id)
);