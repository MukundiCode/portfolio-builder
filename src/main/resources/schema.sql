create table roles (

id  serial not null,

name varchar(20),

primary key (id)

)

create table user_roles (

user_id int8 not null,

role_id int4 not null,

primary key (user_id, role_id)

)

create table users (

id  bigserial not null,

email varchar(50),

password varchar(120),

username varchar(20),

portfolio_id int8,

primary key (id)

)