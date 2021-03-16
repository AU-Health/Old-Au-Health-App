SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

#All Truths in the dataset
CREATE TABLE IF NOT EXISTS `Truths`
(
    `TruthId`         SMALLINT UNSIGNED   NOT NULL UNIQUE AUTO_INCREMENT,
    `Truth`           VARCHAR(500) UNIQUE NOT NULL,
    `Points`          TINYINT UNSIGNED    NOT NULL CHECK ( Points > 0 ),
    `CategoryId`      TINYINT(1)          NOT NULL,
    `MinPointsNeeded` SMALLINT            NOT NULL CHECK ( MinPointsNeeded > 0 ),
    `HoursToComplete` DECIMAL(5, 1)       NOT NULL CHECK ( HoursToComplete > 0 ),
    `SentNum`         MEDIUMINT UNSIGNED  NOT NULL CHECK (SentNum = 0),
    `CompleteNum`     MEDIUMINT UNSIGNED  NOT NULL CHECK ( CompleteNum = 0 ),
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
    `SentNum`         MEDIUMINT UNSIGNED  NOT NULL CHECK (SentNum = 0),
    `CompleteNum`     MEDIUMINT UNSIGNED  NOT NULL CHECK ( CompleteNum = 0 ),
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
    `SentNum`         MEDIUMINT UNSIGNED  NOT NULL CHECK (SentNum = 0),
    `CompleteNum`     MEDIUMINT UNSIGNED  NOT NULL CHECK ( CompleteNum = 0 ),
    PRIMARY KEY (QuestionId)
);


#User and Truth responses to
CREATE TABLE `J_UserTruth`
(
    `UserId`          MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    `TruthId`         SMALLINT UNSIGNED  NOT NULL,
    `TruthResponseId` MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    PRIMARY KEY (UserId, TruthId),
    FOREIGN KEY (`TruthResponseId`) REFERENCES TruthsResponses (`TruthResponseId`)
);

#All Truth Responses
CREATE TABLE `TruthsResponses`
(
    `TruthResponseId` MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    `Data`            VARCHAR(250)       NOT NULL,
    PRIMARY KEY (`TruthResponseId`)
);

#User and Dare responses to
CREATE TABLE `J_UserDares`
(
    `UserId`         MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    `DareId`         SMALLINT UNSIGNED  NOT NULL,
    `DareResponseId` MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    PRIMARY KEY (UserId, DareId),
    FOREIGN KEY (`DareResponseId`) REFERENCES DaresResponses (`DareResponseId`)
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

#User and Truth responses to
CREATE TABLE `J_UserQuestions`
(
    `UserId`             MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    `QuestionId`         SMALLINT UNSIGNED  NOT NULL,
    `QuestionResponseId` MEDIUMINT UNSIGNED NOT NULL UNIQUE,
    PRIMARY KEY (UserId, QuestionId),
    FOREIGN KEY (`QuestionResponseId`) REFERENCES QuestionsResponses (`QuestionResponseId`)
);