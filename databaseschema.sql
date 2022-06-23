


-- Creating the Schemas
CREATE SCHEMA Participants
Go

Create Schema MeetingRooms
Go


CREATE TABLE Participants. Participants (
    ParticipantID int NOT NULL AUTO_INCREMENT,
    FirstName varchar(255) Not NULL,
    LastName varchar(255),
    Token long UNIQUE,
    Primary Key (ParticipantID)
);

CREATE TABLE MeetingRooms.MeetingRooms(
    MeetingRoomID int not NULL AUTO_INCREMENT,
    MeetingRoomName varchar(255),
    OpeningTime date,
    ClosingTime date,
    Primary Key (MeetingRoomID)
);

CREATE TABLE MeetingRoomParticipants(
    MeetingRoomParticipantsID int not NULL AUTO_INCREMENT,
    MeetingRoomID int not null,
    ParticipantID int not null,
    TimeOfVisit date,
    TimeInRoom date,
    Primary Key (MeetingRoomParticipantsID),
    Foreign Key (MeetingRoomID) references MeetingRooms.MeetingRooms(MeetingRoomID),
    Foreign Key (ParticipantID) references Participants.Participants(ParticipantID)
);
