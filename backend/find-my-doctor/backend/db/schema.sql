create extension if not exists "uuid-ossp";

-- drop table admin;
-- drop table patient;
-- drop table doctor;
-- drop table hospital;

create table hospital (
    hospital_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name varchar,
    latitude decimal(10, 7),
    longitude decimal(10, 7)
);

create table doctor (
    doctor_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    uid varchar(10) NOT NULL,
    pass varchar,
    name varchar,
    image_url varchar,
    hospital_id uuid NOT NULL,
    specialization varchar(15) NOT NULL,
    rating decimal(3, 2) default 0.00 NOT NULL,
    avg_wait_time decimal(8, 2) default 0 NOT NULL,
    FOREIGN KEY(hospital_id) REFERENCES hospital(hospital_id),
    UNIQUE(uid)
);

create table patient (
    patient_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id uuid NOT NULL,
    arrived_at timestamptz NOT NULL,
    consulted_at timestamptz,
    FOREIGN KEY(doctor_id) REFERENCES doctor(doctor_id)
);
