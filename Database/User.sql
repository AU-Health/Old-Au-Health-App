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
    FOREIGN KEY (UserType) REFERENCES UserTypes (UserTypeId)
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
    PRIMARY KEY (UserId),
    FOREIGN KEY (UserId) REFERENCES User (UserId)
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
    `NextSpinDateTime` DATETIME            DEFAULT (SYSDATE()),
    PRIMARY KEY (UserId)
);

#Current Dares
CREATE TABLE `DaresCurrent`
(
    `UserId`         INT      NOT NULL UNIQUE,
    `DareId`         SMALLINT NOT NULL UNIQUE, #will later reference the dare id in the other schema
    `IssuedDateTime` DATETIME NOT NULL,
    `ExpireDateTime` DATETIME NOT NULL,
    PRIMARY KEY (UserId, DareId),
    FOREIGN KEY (UserId) REFERENCES User (UserId)
);

#Current Questions
CREATE TABLE `QuestionsCurrent`
(
    `UserId`         INT      NOT NULL UNIQUE,
    `QuestionId`     SMALLINT NOT NULL UNIQUE, #will later reference the question id in the other schema
    `IssuedDateTime` DATETIME NOT NULL,
    `ExpireDateTime` DATETIME NOT NULL,
    PRIMARY KEY (UserId, QuestionId),
    FOREIGN KEY (UserId) REFERENCES User (UserId)
);

#Current Truths
CREATE TABLE `TruthsCurrent`
(
    `UserId`         INT      NOT NULL UNIQUE,
    `TruthId`        SMALLINT NOT NULL UNIQUE, #will later reference the truth id in the other schema
    `IssuedDateTime` DATETIME NOT NULL,
    `ExpireDateTime` DATETIME NOT NULL,
    PRIMARY KEY (UserId, TruthId),
    FOREIGN KEY (UserId) REFERENCES User (UserId)
);

#Dare History ... assuming dares cannot be repeated
CREATE TABLE `DaresHistory`
(
    `UserId`         INT      NOT NULL UNIQUE,
    `DareId`         SMALLINT NOT NULL UNIQUE, #will later reference the dare id in the other schema
    `UserResponse`   BOOLEAN DEFAULT (FALSE),  #response to dare (whether success or not). Decide if this needs to be there or will it be in the jumble with all truth responses
    `ExpireDateTime` DATETIME NOT NULL,
    `Completed`      TINYINT(1),
    PRIMARY KEY (UserId, DareId),
    FOREIGN KEY (UserId) REFERENCES User (UserId),
    FOREIGN KEY (Completed) REFERENCES ActivityCompletedTypes (ActivityCompletedTypeId)
);

#Questions History ... assuming questions cannot be repeated
CREATE TABLE `QuestionsHistory`
(
    `UserId`         INT      NOT NULL UNIQUE,
    `QuestionId`     SMALLINT NOT NULL UNIQUE,    #will later reference the question id in the other schema
    `ExpireDateTime` DATETIME NOT NULL,
    `UserResponse`   VARCHAR(100) DEFAULT (NULL), #response to question. Decide if this needs to be there or will it be in the jumble with all question responses
    `Completed`      TINYINT(1),
    PRIMARY KEY (UserId, QuestionId),
    FOREIGN KEY (UserId) REFERENCES User (UserId),
    FOREIGN KEY (Completed) REFERENCES ActivityCompletedTypes (ActivityCompletedTypeId)
);

#Truths History ... assuming dares cannot be repeated
CREATE TABLE `TruthsHistory`
(
    `UserId`         INT      NOT NULL UNIQUE,
    `TruthId`        SMALLINT NOT NULL UNIQUE,    #will later reference the truth  id in the other schema
    `ExpireDateTime` DATETIME NOT NULL,
    `UserResponse`   VARCHAR(100) DEFAULT (NULL), #response to truth. Decide if this needs to be there or will it be in the jumble with all truth responses
    `Completed`      TINYINT(1),
    PRIMARY KEY (UserId, TruthId),
    FOREIGN KEY (UserId) REFERENCES User (UserId),
    FOREIGN KEY (Completed) REFERENCES ActivityCompletedTypes (ActivityCompletedTypeId)
);

#Table of Organizations user is apart of
CREATE TABLE `UserOrganizations`
(
    `UserId`         INT      NOT NULL UNIQUE,
    `OrganizationId` SMALLINT NOT NULL, #will be id of communities which are created
    PRIMARY KEY (UserId, OrganizationId),
    FOREIGN KEY (UserId) REFERENCES User (UserId)
);

#User Reminders table (if needed)
CREATE TABLE `UserReminders`
(
    `UserId`   INT         NOT NULL UNIQUE,
    `Reminder` VARCHAR(20) NOT NULL UNIQUE,
    PRIMARY KEY (UserId, Reminder),
    FOREIGN KEY (UserId) REFERENCES User (UserId)
);

#User Refresh tokens
CREATE TABLE `UserRefreshTokens`
(
    `RefreshTokenId` INT NOT NULL UNIQUE,
    `UserId`         INT NOT NULL,
    `RefreshToken`   VARCHAR(20), #change this based on what actual
    PRIMARY KEY (RefreshTokenId),
    FOREIGN KEY (UserId) REFERENCES User (UserId)
);

#Category of each level
CREATE TABLE IF NOT EXISTS `CategoryLevels`
(
    `UserId`                            INT        NOT NULL UNIQUE,
    `PhysicalActivityLevel`             TINYINT(1) NOT NULL DEFAULT (0),
    `OccupationalWellnessLevel`         TINYINT(1) NOT NULL DEFAULT (0),
    `EmotionalWellnessLevel`            TINYINT(1) NOT NULL DEFAULT (0),
    `SocialWellnessLevel`               TINYINT(1) NOT NULL DEFAULT (0),
    `FruitAndVegetableConsumptionLevel` TINYINT(1) NOT NULL DEFAULT (0),
    `SleepLevel`                        TINYINT(1) NOT NULL DEFAULT (0),
    `WaterConsumptionLevel`             TINYINT(1) NOT NULL DEFAULT (0),
    PRIMARY KEY (UserId),
    FOREIGN KEY (UserId) REFERENCES User (UserId)
);

#User Settings
CREATE TABLE `UserSettings`
(
    `SettingId`    INT         NOT NULL UNIQUE,
    `UserId`       INT         NOT NULL UNIQUE,
    `Setting`      VARCHAR(20) NOT NULL,
    `SettingValue` VARCHAR(20) NOT NULL,
    PRIMARY KEY (SettingId),
    FOREIGN KEY (UserId) REFERENCES User (UserId)
);

#############  KNOWN TYPES #############

#Stores types of categories
CREATE TABLE `CategoryTypes`
(
    `CategoryId`   TINYINT(1) UNIQUE  NOT NULL,
    `CategoryName` VARCHAR(30) UNIQUE NOT NULL,
    PRIMARY KEY (CategoryId)
);

INSERT INTO CategoryTypes(CategoryId, CategoryName)
VALUES (1, 'Physical Activity');
INSERT INTO CategoryTypes(CategoryId, CategoryName)
VALUES (2, 'Occupational Wellness');
INSERT INTO CategoryTypes(CategoryId, CategoryName)
VALUES (3, 'Emotional Wellness');
INSERT INTO CategoryTypes(CategoryId, CategoryName)
VALUES (4, 'Social Wellness');
INSERT INTO CategoryTypes(CategoryId, CategoryName)
VALUES (5, 'Fruit & Vegetable Consumption');
INSERT INTO CategoryTypes(CategoryId, CategoryName)
VALUES (6, 'Sleep');
INSERT INTO CategoryTypes(CategoryId, CategoryName)
VALUES (7, 'Water Consumption');


#Store user types
CREATE TABLE `UserTypes`
(
    `UserTypeId`   TINYINT(1) UNIQUE  NOT NULL,
    `UserTypeName` VARCHAR(10) UNIQUE NOT NULL,
    PRIMARY KEY (UserTypeId)
);

INSERT INTO UserTypes(UserTypeId, UserTypeName)
VALUES (1, 'Normal User');
INSERT INTO UserTypes(UserTypeId, UserTypeName)
VALUES (1, 'Admin');


#Store Gender types
CREATE TABLE `GenderTypes`
(
    `GenderTypeId`   TINYINT(2) UNIQUE  NOT NULL,
    `GenderTypeName` VARCHAR(10) UNIQUE NOT NULL,
    PRIMARY KEY (GenderTypeId)
);

INSERT INTO GenderTypes(GenderTypeId, GenderTypeName) VALUES (1,'Cisgender');
INSERT INTO GenderTypes(GenderTypeId, GenderTypeName) VALUES (2,'Trasgender');
INSERT INTO GenderTypes(GenderTypeId, GenderTypeName) VALUES (3,'Two-spirit');
INSERT INTO GenderTypes(GenderTypeId, GenderTypeName) VALUES (4,'Non-binary');
INSERT INTO GenderTypes(GenderTypeId, GenderTypeName) VALUES (5,'Genderqueer');
INSERT INTO GenderTypes(GenderTypeId, GenderTypeName) VALUES (6,'Gender expression');
INSERT INTO GenderTypes(GenderTypeId, GenderTypeName) VALUES (7,'Gender Fluid');
INSERT INTO GenderTypes(GenderTypeId, GenderTypeName) VALUES (8,'Gender Neutral');
INSERT INTO GenderTypes(GenderTypeId, GenderTypeName) VALUES (9,'Other');

#Activity Completion types
CREATE TABLE `ActivityCompletedTypes`
(
    `ActivityCompletedTypeId`   TINYINT(1) NOT NULL UNIQUE,
    `ActivityCompletedTypeName` VARCHAR(10),
    PRIMARY KEY (ActivityCompletedTypeId)
);

INSERT INTO ActivityCompletedTypes(ActivityCompletedTypeId, ActivityCompletedTypeName) VALUES (1,'Completed');
INSERT INTO ActivityCompletedTypes(ActivityCompletedTypeId, ActivityCompletedTypeName) VALUES (2,'Failed to Complete');
INSERT INTO ActivityCompletedTypes(ActivityCompletedTypeId, ActivityCompletedTypeName) VALUES (3,'No Attempt');