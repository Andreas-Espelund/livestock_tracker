drop schema cascade bapp if exists;

create schema bapp;

create table bapp.individuals(
	id int PRIMARY KEY,
	birthdate date NOT NULL DEFAULT CURRENT_DATE,
	gender varchar(8) CHECK(gender='S' OR gender='V'),
	status int CHECK (status >= 1 AND status <= 4),
	mother int REFERENCES bapp.individuals(id),
	father int REFERENCES bapp.individuals(id),
	weight int CHECK (weight > 0 AND weight < 150),
	bottle boolean DEFAULT false,
	field varchar(255) 
);

CREATE TABLE bapp.medicine(
	name varchar(255) PRIMARY KEY
);


CREATE TABLE bapp.administered(
	individual int REFERENCES bapp.individuals(id),
	medicine varchar(255) REFERENCES bapp.medicine(name),
	date_of_dose date NOT NULL DEFAULT CURRENT_DATE,
	PRIMARY KEY (individual, medicine)
);



