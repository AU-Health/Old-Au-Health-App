SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


#Create the main User Table
CREATE TABLE IF NOT EXISTS `User`
(
    `UserId`              INT         NOT NULL AUTO_INCREMENT,
    `UserEmail`           VARCHAR(50) NOT NULL UNIQUE, #figure out what this will be. Is it varchar
    `Password`            VARCHAR(50) NOT NULL UNIQUE, #figure out what this will be. Is it varchar?
    `PasswordSalt`        VARCHAR(50) NOT NULL UNIQUE, #figure out if this is needed
    `AccountCreateDate`   TIMESTAMP   NOT NULL,        #maybe use date instead?
    `LastLogin`           TIMESTAMP   NOT NULL,        #maybe use date instead?
    `UserType`            TINYINT(1)  NOT NULL,
    `UserVerified`        BOOLEAN     NOT NULL,
    `ConsentFormSigned`   BOOLEAN     NOT NULL,
    `UserAccountDisabled` BOOLEAN     NOT NULL,
    PRIMARY KEY (UserId),
    FOREIGN KEY (UserType) REFERENCES UserTypes(UserTypeId)
#     FOREIGN KEY (UserType) REFERENCES User(UserId)#change this to actual when you make it
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_unicode_ci;

#User Metadata Info table ..... ..... will be updated as more information comes in
CREATE TABLE IF NOT EXISTS `UserMetadata`
(
    `UserId`       INT NOT NULL UNIQUE,
    `Weight`       SMALLINT(3),
    `HeightInches` TINYINT CHECK ( heightInches > 0 ),
    `Race`         VARCHAR(20), #change length if needed
    `Sex`          CHAR(1),
    `Gender`       TINYINT(2),  #either varchar or change to string?
    PRIMARY KEY (UserId),
    FOREIGN KEY (UserId) REFERENCES User (UserId),
    FOREIGN KEY (Gender) REFERENCES GenderTypes (GenderTypeId)
);

#Table for User current questionnaire response ..... will be updated as more information comes in
CREATE TABLE IF NOT EXISTS `CurrentQuestionnaireResponse`
(
    `UserId`      INT NOT NULL UNIQUE,
    `SleepRating` TINYINT(1), #if hours of sleep is added, then sleep will be own table
    PRIMARY KEY (UserId)
);

#Table for User questionnaire history
CREATE TABLE IF NOT EXISTS `HistoryQuestionnaireResponse`
(
    `HistoryQuestionnaireId` BIGINT NOT NULL UNIQUE AUTO_INCREMENT,
    `UserId`                 INT    NOT NULL,
    `SleepRating`            TINYINT(1),#there will be a continuation of other attributes later
    PRIMARY KEY (HistoryQuestionnaireId),
    FOREIGN KEY (UserId) REFERENCES User (UserId)
);

#Table to store user current points
CREATE TABLE IF NOT EXISTS `CategoryPoints`
(
    `UserId`                             INT         NOT NULL UNIQUE,
    `PhysicalActivityPoints`             SMALLINT(3) NOT NULL DEFAULT (0),
    `OccupationalWellnessPoints`         SMALLINT(3) NOT NULL DEFAULT (0),
    `EmotionalWellnessPoints`            SMALLINT(3) NOT NULL DEFAULT (0),
    `SocialWellnessPoints`               SMALLINT(3) NOT NULL DEFAULT (0),
    `FruitAndVegetableConsumptionPoints` SMALLINT(3) NOT NULL DEFAULT (0),
    `SleepPoints`                        SMALLINT(3) NOT NULL DEFAULT (0),
    `WaterConsumptionPoints`             SMALLINT(3) NOT NULL DEFAULT (0),
    PRIMARY KEY (UserId),
    FOREIGN KEY (UserId) REFERENCES User (UserId)
);

#Table to store user history current points
CREATE TABLE `CategoryPointsHistory`
(
    `UserId`         INT         NOT NULL,
    `Category`       TINYINT(1)  NOT NULL,
    `CategoryPoints` SMALLINT(3) NOT NULL DEFAULT (0),
    `Date`           DATE        NOT NULL,
    PRIMARY KEY (UserId, Category, Date),
    FOREIGN KEY (UserId) REFERENCES User (UserId),
    FOREIGN KEY (Category) REFERENCES CategoryTypes (CategoryId)
);

#Table for storing user's next spin and number of spins a day
CREATE TABLE `USER SPINS`
(
    `UserId`           INT        NOT NULL UNIQUE,
    `SpinsPerDay`      TINYINT(2) NOT NULL DEFAULT (1),
    `NextSpinDateTime` DATETIME            DEFAULT (SYSDATE())
);

#Stores types of categories
CREATE TABLE `CategoryTypes`
(
    `CategoryId`   TINYINT(1) UNIQUE  NOT NULL,
    `CategoryName` VARCHAR(20) UNIQUE NOT NULL,
    PRIMARY KEY (CategoryId)
);

#Store user types
CREATE TABLE `UserTypes`
(
    `UserTypeId`   TINYINT(1) UNIQUE  NOT NULL,
    `UserTypeName` VARCHAR(10) UNIQUE NOT NULL,
    PRIMARY KEY (UserTypeId)
);

#Store Gender types
CREATE TABLE `GenderTypes`
(
    `GenderTypeId`   TINYINT(2) UNIQUE  NOT NULL,
    `GenderTypeName` VARCHAR(10) UNIQUE NOT NULL,
    PRIMARY KEY (GenderTypeId)
);