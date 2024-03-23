CREATE DATABASE authorisation;


create table authorise(
    id uuid PRIMARY KEY default uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_role VARCHAR(255) default "USER"
);