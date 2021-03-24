SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

#Main User Table
CREATE TABLE IF NOT EXISTS `User`
(
    `UserId`              MEDIUMINT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `UserEmail`           VARCHAR(100)        NOT NULL UNIQUE, #figure out what this will be. Is it varchar
    `Password`            VARCHAR(100)        NOT NULL UNIQUE, #figure out what this will be. Is it varchar?
    `UUID`                BINARY(16)         NOT NULL UNIQUE,
    `UserType`            TINYINT(1)         NOT NULL DEFAULT (1) CHECK ( UserType >= 1 && UserType <= 2 ),
    `UserVerified`        BOOLEAN            NOT NULL DEFAULT (FALSE),
    `ConsentFormSigned`   BOOLEAN            NOT NULL DEFAULT (FALSE),
    `UserAccountDisabled` BOOLEAN            NOT NULL DEFAULT (FALSE),
    `CreatedDate`         DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `LastAccessDate`      DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (UserId),
    FOREIGN KEY (UserType) REFERENCES UserTypes (UserTypeId)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_unicode_ci;

#User Metadata Information Table ... metadata about the user
CREATE TABLE IF NOT EXISTS `UserMetadata`
(
    `UserId`           MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    `WeightPounds`     SMALLINT(3) UNSIGNED,
    `HeightInches`     TINYINT UNSIGNED,
    `RaceTypeId`       TINYINT(2) UNIQUE  NOT NULL,
    `Sex`              CHAR,
    `Gender`           TINYINT(2), #either varchar or change to string?
    `Birthday`         DATE,
    `UniversityYearId` TINYINT(1) UNSIGNED CHECK ( UniversityYearId >= 1 && UniversityYearId <= 7 ),
    PRIMARY KEY (UserId),
    FOREIGN KEY (UserId) REFERENCES User (UserId),
    FOREIGN KEY (Gender) REFERENCES GenderTypes (GenderTypeId),
    FOREIGN KEY (UniversityYearId) REFERENCES UniversityYear (UniversityYearId),
    FOREIGN KEY (RaceTypeId) REFERENCES RaceTypes (RaceTypeId)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_unicode_ci;

#Table stores verification codes for user. Ex: email verification
CREATE TABLE `VerificationCodes`
(
    `UserId` MEDIUMINT UNSIGNED,
    `ConfirmationCode` VARCHAR(10) NOT NULL,
    PRIMARY KEY (UserId),
    FOREIGN KEY (UserId) REFERENCES User(UserId)
);


#Table for User Base Questionnaire History Responses
CREATE TABLE IF NOT EXISTS `HistoryQuestionnaireResponses`
(
    `HistoryQuestionnaireId`            INT UNSIGNED       NOT NULL UNIQUE AUTO_INCREMENT, #should these be big ints or just unsigned ints?
    `UserId`                            MEDIUMINT UNSIGNED NOT NULL,
    `CreatedDate`                       DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `PhysicalActivityStage`             TINYINT(1),
    `OccupationalWellnessStage`         TINYINT(1),
    `EmotionalWellnessStage`            TINYINT(1),
    `SocialWellnessStage`               TINYINT(1),
    `FruitAndVegetableConsumptionStage` TINYINT(1),
    `SleepStage`                        TINYINT(1),
    `WaterConsumptionStage`             TINYINT(1),
    PRIMARY KEY (HistoryQuestionnaireId),
    FOREIGN KEY (UserId) REFERENCES User (UserId)
);

#Level user is inside each category
CREATE TABLE IF NOT EXISTS `CategoryLevels`
(
    `UserId`                            MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    `PhysicalActivityLevel`             TINYINT(1)         NOT NULL DEFAULT (0),
    `OccupationalWellnessLevel`         TINYINT(1)         NOT NULL DEFAULT (0),
    `EmotionalWellnessLevel`            TINYINT(1)         NOT NULL DEFAULT (0),
    `SocialWellnessLevel`               TINYINT(1)         NOT NULL DEFAULT (0),
    `FruitAndVegetableConsumptionLevel` TINYINT(1)         NOT NULL DEFAULT (0),
    `SleepLevel`                        TINYINT(1)         NOT NULL DEFAULT (0),
    `WaterConsumptionLevel`             TINYINT(1)         NOT NULL DEFAULT (0),
    PRIMARY KEY (UserId),
    FOREIGN KEY (UserId) REFERENCES User (UserId)
);


#Table to Store User Current Points per Category
CREATE TABLE IF NOT EXISTS `CategoryPoints`
(
    `UserId`                             MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    `PhysicalActivityPoints`             SMALLINT(3)        NOT NULL DEFAULT (0),
    `OccupationalWellnessPoints`         SMALLINT(3)        NOT NULL DEFAULT (0),
    `EmotionalWellnessPoints`            SMALLINT(3)        NOT NULL DEFAULT (0),
    `SocialWellnessPoints`               SMALLINT(3)        NOT NULL DEFAULT (0),
    `FruitAndVegetableConsumptionPoints` SMALLINT(3)        NOT NULL DEFAULT (0),
    `SleepPoints`                        SMALLINT(3)        NOT NULL DEFAULT (0),
    `WaterConsumptionPoints`             SMALLINT(3)        NOT NULL DEFAULT (0),
    PRIMARY KEY (UserId),
    FOREIGN KEY (UserId) REFERENCES User (UserId) ON DELETE CASCADE
);

#Table to Store User History Current Points per Category
CREATE TABLE `CategoryPointsHistory`
(
    `UserId`         MEDIUMINT UNSIGNED NOT NULL,
    `Category`       TINYINT            NOT NULL,
    `CategoryPoints` SMALLINT(3)        NOT NULL DEFAULT (0),
    `Date`           DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (UserId, Category, Date),
    FOREIGN KEY (UserId) REFERENCES User (UserId),
    FOREIGN KEY (Category) REFERENCES CategoryTypes (CategoryId)
);

#Table for storing user's next spin and number of spins a day
CREATE TABLE `UserSpins`
(
    `UserId`           MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    `SpinsPerDay`      TINYINT(2)         NOT NULL DEFAULT (1),
    `NextSpinDateTime` DATETIME                    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (UserId),
    FOREIGN KEY (UserId) REFERENCES User (UserId) ON DELETE CASCADE
);

#Dare History for all Users... assuming dares cannot be repeated
CREATE TABLE `DaresHistory`
(
    `UserId`         MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    `DareId`         SMALLINT UNSIGNED  NOT NULL UNIQUE, #will later reference the dare id in the other schema
    `DareResponseId` MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    `Issued`         DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `Expiration`     DATETIME           NOT NULL,
    `Completed`      TINYINT(1),
    PRIMARY KEY (UserId, DareId),
    FOREIGN KEY (UserId) REFERENCES User (UserId),       ##SHOULD i do cascade delete and maybe instead separately store how many of each was done so storage isnt used,
    FOREIGN KEY (DareId) REFERENCES Dares (DareId),
    FOREIGN KEY (DareResponseId) REFERENCES DaresResponses (DareResponseId),
    FOREIGN KEY (Completed) REFERENCES ActivityCompletedTypes (ActivityCompletedTypeId)
);

#Questions History for all Users ... assuming questions cannot be repeated
CREATE TABLE `QuestionsHistory`
(
    `UserId`             MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    `QuestionId`         SMALLINT UNSIGNED  NOT NULL UNIQUE,
    `Issued`             DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `Expiration`         DATETIME           NOT NULL,
    `QuestionResponseId` MEDIUMINT UNSIGNED NOT NULL UNIQUE, #decide whether to be int or medium INT.... maybe see if this reference even needed later
    `Completed`          TINYINT(1)                  DEFAULT (NULL),
    PRIMARY KEY (UserId, QuestionId),
    FOREIGN KEY (UserId) REFERENCES User (UserId),
    FOREIGN KEY (QuestionId) REFERENCES Questions (QuestionId),
    FOREIGN KEY (`QuestionResponseId`) REFERENCES QuestionsResponses (`QuestionResponseId`),
    FOREIGN KEY (Completed) REFERENCES ActivityCompletedTypes (ActivityCompletedTypeId)
);

#Truths History for all Users... assuming dares cannot be repeated
CREATE TABLE `TruthsHistory`
(
    `UserId`          MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    `TruthId`         SMALLINT UNSIGNED  NOT NULL UNIQUE, #will later reference the truth  id in the other schema
    `Issued`          DATETIME           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `Expiration`      DATETIME           NOT NULL,
    `TruthResponseId` MEDIUMINT UNSIGNED NOT NULL UNIQUE, #decide whether to have as INT or MEDIUMINT
    `Completed`       TINYINT(1),
    PRIMARY KEY (UserId, TruthId),
    FOREIGN KEY (UserId) REFERENCES User (UserId),
    FOREIGN KEY (TruthId) REFERENCES Truths (TruthId),
    FOREIGN KEY (`TruthResponseId`) REFERENCES TruthsResponses (`TruthResponseId`),
    FOREIGN KEY (Completed) REFERENCES ActivityCompletedTypes (ActivityCompletedTypeId)
);


#Table of Organizations Users are a Part of for all Users
CREATE TABLE `UserOrganizations`
(
    `UserId`         MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    `OrganizationId` SMALLINT UNSIGNED  NOT NULL, #will be id of communities which are created
    PRIMARY KEY (UserId, OrganizationId),
    FOREIGN KEY (UserId) REFERENCES User (UserId)
);

#User Reminders table for all Users (if needed)
CREATE TABLE `UserReminders`
(
    `UserId`   MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    `Reminder` VARCHAR(20)        NOT NULL UNIQUE,
    PRIMARY KEY (UserId, Reminder),
    FOREIGN KEY (UserId) REFERENCES User (UserId) ON DELETE CASCADE
);

#User Refresh Tokens for all Users
CREATE TABLE `UserRefreshTokens`
(
    `RefreshTokenId` INT UNSIGNED       NOT NULL UNIQUE,
    `UserId`         MEDIUMINT UNSIGNED NOT NULL,
    `RefreshToken`   VARCHAR(20), #change this based on what actual
    PRIMARY KEY (RefreshTokenId),
    FOREIGN KEY (UserId) REFERENCES User (UserId) ON DELETE CASCADE
);

#User Settings for all Users
CREATE TABLE `UserSettings`
(
    `SettingId`    INT UNSIGNED       NOT NULL UNIQUE,
    `UserId`       MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    `Setting`      VARCHAR(20)        NOT NULL,
    `SettingValue` VARCHAR(20)        NOT NULL,
    PRIMARY KEY (SettingId),
    FOREIGN KEY (UserId) REFERENCES User (UserId) ON DELETE CASCADE
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
    `UserTypeName` VARCHAR(15) UNIQUE NOT NULL,
    PRIMARY KEY (UserTypeId)
);

INSERT INTO UserTypes(UserTypeId, UserTypeName)
VALUES (1, 'Normal User');
INSERT INTO UserTypes(UserTypeId, UserTypeName)
VALUES (2, 'Admin');

#User year in university
CREATE TABLE `UniversityYear`
(
    `UniversityYearId`   TINYINT(1) UNSIGNED,
    `UniversityYearName` VARCHAR(16),
    PRIMARY KEY (UniversityYearId)
);

INSERT INTO UniversityYear(UniversityYearId, UniversityYearName)
VALUES (1, 'Freshman');
INSERT INTO UniversityYear(UniversityYearId, UniversityYearName)
VALUES (2, 'Sophomore');
INSERT INTO UniversityYear(UniversityYearId, UniversityYearName)
VALUES (3, 'Junior');
INSERT INTO UniversityYear(UniversityYearId, UniversityYearName)
VALUES (4, 'Senior');
INSERT INTO UniversityYear(UniversityYearId, UniversityYearName)
VALUES (5, 'Graduate student');
INSERT INTO UniversityYear(UniversityYearId, UniversityYearName)
VALUES (6, 'Fully Graduate');
INSERT INTO UniversityYear(UniversityYearId, UniversityYearName)
VALUES (7, 'Other');

#Store Race types
CREATE TABLE `RaceTypes`
(
    `RaceTypeId`   TINYINT(2) UNIQUE  NOT NULL,
    `RaceTypeName` VARCHAR(40) UNIQUE NOT NULL,
    PRIMARY KEY (RaceTypeId)
);

INSERT INTO RaceTypes(RaceTypeId, RaceTypeName)
VALUES (1, 'American Indian/Alaska Native');
INSERT INTO RaceTypes(RaceTypeId, RaceTypeName)
VALUES (2, 'Asian');
INSERT INTO RaceTypes(RaceTypeId, RaceTypeName)
VALUES (3, 'Black');
INSERT INTO RaceTypes(RaceTypeId, RaceTypeName)
VALUES (4, 'Hispanic/Latino');
INSERT INTO RaceTypes(RaceTypeId, RaceTypeName)
VALUES (5, 'White');
INSERT INTO RaceTypes(RaceTypeId, RaceTypeName)
VALUES (6, 'Other');
INSERT INTO RaceTypes(RaceTypeId, RaceTypeName)
VALUES (7, 'N/A');


#Store Gender types
CREATE TABLE `GenderTypes`
(
    `GenderTypeId`   TINYINT(2) UNIQUE  NOT NULL,
    `GenderTypeName` VARCHAR(20) UNIQUE NOT NULL,
    PRIMARY KEY (GenderTypeId)
);

INSERT INTO GenderTypes(GenderTypeId, GenderTypeName)
VALUES (1, 'Cisgender');
INSERT INTO GenderTypes(GenderTypeId, GenderTypeName)
VALUES (2, 'Transgender');
INSERT INTO GenderTypes(GenderTypeId, GenderTypeName)
VALUES (3, 'Two-spirit');
INSERT INTO GenderTypes(GenderTypeId, GenderTypeName)
VALUES (4, 'Non-binary');
INSERT INTO GenderTypes(GenderTypeId, GenderTypeName)
VALUES (5, 'Genderqueer');
INSERT INTO GenderTypes(GenderTypeId, GenderTypeName)
VALUES (6, 'Gender Expression');
INSERT INTO GenderTypes(GenderTypeId, GenderTypeName)
VALUES (7, 'Gender Fluid');
INSERT INTO GenderTypes(GenderTypeId, GenderTypeName)
VALUES (8, 'Gender Neutral');
INSERT INTO GenderTypes(GenderTypeId, GenderTypeName)
VALUES (9, 'Other');

#Activity Completion types
CREATE TABLE `ActivityCompletedTypes`
(
    `ActivityCompletedTypeId`   TINYINT(1) NOT NULL UNIQUE,
    `ActivityCompletedTypeName` VARCHAR(20),
    PRIMARY KEY (ActivityCompletedTypeId)
);

INSERT INTO ActivityCompletedTypes(ActivityCompletedTypeId, ActivityCompletedTypeName)
VALUES (1, 'Completed');
INSERT INTO ActivityCompletedTypes(ActivityCompletedTypeId, ActivityCompletedTypeName)
VALUES (2, 'Failed to Complete');
INSERT INTO ActivityCompletedTypes(ActivityCompletedTypeId, ActivityCompletedTypeName)
VALUES (3, 'No Attempt');


##########################################TruthsDaresQuestions######################

#All Truths in the dataset
CREATE TABLE IF NOT EXISTS `Truths`
(
    `TruthId`         SMALLINT UNSIGNED   NOT NULL UNIQUE AUTO_INCREMENT,
    `Truth`           VARCHAR(500) UNIQUE NOT NULL,
    `Points`          TINYINT UNSIGNED    NOT NULL CHECK ( Points > 0 ),
    `CategoryId`      TINYINT(1)          NOT NULL,
    `MinPointsNeeded` SMALLINT            NOT NULL CHECK ( MinPointsNeeded > 0 ),
    `HoursToComplete` DECIMAL(5, 1)       NOT NULL CHECK ( HoursToComplete > 0 ),
    `SentNum`         MEDIUMINT UNSIGNED  NOT NULL CHECK (SentNum >= 0),
    `CompleteNum`     MEDIUMINT UNSIGNED  NOT NULL CHECK ( CompleteNum >= 0 ),
    PRIMARY KEY (TruthId)
);

#All dares in the dataset
CREATE TABLE IF NOT EXISTS `Dares`
(
    `DareId`          SMALLINT UNSIGNED   NOT NULL UNIQUE AUTO_INCREMENT,
    `Dare`            VARCHAR(500) UNIQUE NOT NULL,
    `Points`          TINYINT UNSIGNED    NOT NULL CHECK ( Points > 0 ),
    `CategoryId`      TINYINT(1)          NOT NULL,
    `MinPointsNeeded` SMALLINT            NOT NULL CHECK ( MinPointsNeeded > 0 ),
    `HoursToComplete` DECIMAL(5, 1)       NOT NULL CHECK ( HoursToComplete > 0 ),
    `SentNum`         MEDIUMINT UNSIGNED  NOT NULL CHECK (SentNum >= 0),
    `CompleteNum`     MEDIUMINT UNSIGNED  NOT NULL CHECK ( CompleteNum >= 0 ),
    PRIMARY KEY (DareId)
);

#All questions in the dataset
CREATE TABLE IF NOT EXISTS `Questions`
(
    `QuestionId`      SMALLINT UNSIGNED   NOT NULL UNIQUE AUTO_INCREMENT,
    `Question`        VARCHAR(500) UNIQUE NOT NULL,
    `Points`          TINYINT UNSIGNED    NOT NULL CHECK ( Points > 0 ),
    `CategoryId`      TINYINT(1)          NOT NULL,
    `MinPointsNeeded` SMALLINT            NOT NULL CHECK ( MinPointsNeeded > 0 ),
    `HoursToComplete` DECIMAL(5, 1)       NOT NULL CHECK ( HoursToComplete > 0 ),
    `SentNum`         MEDIUMINT UNSIGNED  NOT NULL CHECK (SentNum >= 0),
    `CompleteNum`     MEDIUMINT UNSIGNED  NOT NULL CHECK ( CompleteNum >= 0 ),
    PRIMARY KEY (QuestionId)
);

#All Truth Responses
CREATE TABLE `TruthsResponses`
(
    `TruthResponseId` MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    `Data`            VARCHAR(250)       NOT NULL,
    PRIMARY KEY (`TruthResponseId`)
);

#All Dares Responses
CREATE TABLE `DaresResponses`
(
    `DareResponseId` MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    `Data`           BOOLEAN            NOT NULL,
    PRIMARY KEY (`DareResponseId`)
);

#All Question Responses
CREATE TABLE `QuestionsResponses`
(
    `QuestionResponseId` MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    `Data`               VARCHAR(250)       NOT NULL,
    PRIMARY KEY (`QuestionResponseId`)
);

######################FUNCTIONS##############################
CREATE FUNCTION UuidToBin(_uuid BINARY(36))
    RETURNS BINARY(16)
    LANGUAGE SQL DETERMINISTIC
    CONTAINS SQL SQL SECURITY INVOKER
    RETURN
        UNHEX(CONCAT(
                SUBSTR(_uuid, 15, 4),
                SUBSTR(_uuid, 10, 4),
                SUBSTR(_uuid, 1, 8),
                SUBSTR(_uuid, 20, 4),
                SUBSTR(_uuid, 25)));

CREATE FUNCTION UuidFromBin(_bin BINARY(16))
    RETURNS BINARY(36)
    LANGUAGE SQL DETERMINISTIC
    CONTAINS SQL SQL SECURITY INVOKER
    RETURN
        LCASE(CONCAT_WS('-',
                        HEX(SUBSTR(_bin, 5, 4)),
                        HEX(SUBSTR(_bin, 3, 2)),
                        HEX(SUBSTR(_bin, 1, 2)),
                        HEX(SUBSTR(_bin, 9, 2)),
                        HEX(SUBSTR(_bin, 11))
            ));