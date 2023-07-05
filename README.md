
# Comics Room

Scrap datas from an online collection manager, insert into database, allow users to create account, create collections, display it.


## Installation

It needs theses cmds and the database running (don't forget to configure in .env file)
-> npm i
-> npm apply

Required DB tables

```sql
  CREATE TABLE comics (

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
  PRIMARY KEY (isbn)
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

## Documentation

Available cli commands

```bash
db-up : A command I use in my dev environment to build the database container.

apply : Compile a module because it's patched.

start : start the server.

watch : start the server with nodemon.

installation-client : compile the front-end.

client : start the front-end.

build : build the front-end.

patch : can patch a module, it needs the module to be already edited, don't forget to target the module after the "patch" word.    
```