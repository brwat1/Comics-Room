
# Comics Room

Scrap datas from an online collection manager, insert into database, allow users to create account, create collections, display it.

Required DB tables


## Installation

It only needs a npm install and the database running (don't forget to configure in .env file)

```sql
  CREATE TABLE comics (
  id int(30) NOT NULL,
  author varchar(255) NOT NULL,
  volume int(11) NOT NULL,
  title varchar(255) NOT NULL,
  series varchar(255) NOT NULL,
  collection varchar(255) NOT NULL,
  publisher varchar(255) NOT NULL,
  release_date varchar(255) NOT NULL,
  content text NOT NULL,
  page_count int(11) NOT NULL,
  isbn varchar(255) NOT NULL,
  createdAt timestamp NOT NULL DEFAULT current_timestamp(),
  updatedAt timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE users (
  id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  createdAt timestamp NOT NULL DEFAULT current_timestamp(),
  updatedAt timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (id),
  UNIQUE KEY email (email),
  UNIQUE KEY username (username)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
```
