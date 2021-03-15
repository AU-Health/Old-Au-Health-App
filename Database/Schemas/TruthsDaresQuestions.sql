SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


CREATE TABLE IF NOT EXISTS `Truths`
(
    `TruthId`         SMALLINT UNSIGNED  NOT NULL UNIQUE AUTO_INCREMENT,
    `Points`          TINYINT UNSIGNED   NOT NULL CHECK ( Points > 0 ),
    `SentNum`         MEDIUMINT UNSIGNED NOT NULL CHECK (SentNum = 0),
    `CompleteNum`     MEDIUMINT UNSIGNED NOT NULL CHECK ( CompleteNum = 0 ),
    `CategoryId`      TINYINT(1)         NOT NULL,
    `MinPointsNeeded` SMALLINT           NOT NULL CHECK ( MinPointsNeeded > 0 ),
    `HoursToComplete` DECIMAL(5, 1)      NOT NULL CHECK ( HoursToComplete > 0 ),
    PRIMARY KEY (TruthId)
);

CREATE TABLE IF NOT EXISTS `Dares`
(
    `DareId`          SMALLINT UNSIGNED  NOT NULL UNIQUE AUTO_INCREMENT,
    `Points`          TINYINT UNSIGNED   NOT NULL CHECK ( Points > 0 ),
    `SentNum`         MEDIUMINT UNSIGNED NOT NULL CHECK (SentNum = 0),
    `CompleteNum`     MEDIUMINT UNSIGNED NOT NULL CHECK ( CompleteNum = 0 ),
    `CategoryId`      TINYINT(1)         NOT NULL,
    `MinPointsNeeded` SMALLINT           NOT NULL CHECK ( MinPointsNeeded > 0 ),
    `HoursToComplete` DECIMAL(5, 1)      NOT NULL CHECK ( HoursToComplete > 0 ),
    PRIMARY KEY (DareId)
);

CREATE TABLE IF NOT EXISTS `Questions`
(
    `QuestionId`      SMALLINT UNSIGNED  NOT NULL UNIQUE AUTO_INCREMENT,
    `Points`          TINYINT UNSIGNED   NOT NULL CHECK ( Points > 0 ),
    `SentNum`         MEDIUMINT UNSIGNED NOT NULL CHECK (SentNum = 0),
    `CompleteNum`     MEDIUMINT UNSIGNED NOT NULL CHECK ( CompleteNum = 0 ),
    `CategoryId`      TINYINT(1)         NOT NULL,
    `MinPointsNeeded` SMALLINT           NOT NULL CHECK ( MinPointsNeeded > 0 ),
    `HoursToComplete` DECIMAL(5, 1)      NOT NULL CHECK ( HoursToComplete > 0 ),
    PRIMARY KEY (QuestionId)
);

CREATE TABLE TruthsResponses
(
    `TruthId`        SMALLINT UNSIGNED  NOT NULL,
    `UserResponseId` MEDIUMINT UNSIGNED NOT NULL,
    `TruthResponse`  VARCHAR(250)       NOT NULL,
    PRIMARY KEY (TruthId, UserResponseId),
    FOREIGN KEY (TruthId) REFERENCES Truths (TruthId)
);

CREATE TABLE DaresResponses
(
    `DareId`         SMALLINT UNSIGNED  NOT NULL,
    `UserResponseId` MEDIUMINT UNSIGNED NOT NULL,
    `DareResponse`   BOOLEAN            NOT NULL DEFAULT (FALSE),
    PRIMARY KEY (DareId, UserResponseId),
    FOREIGN KEY (DareId) REFERENCES Dares (DareId)
);

CREATE TABLE QuestionsResponses
(
    `QuestionId`       SMALLINT UNSIGNED  NOT NULL,
    `UserResponseId`   MEDIUMINT UNSIGNED NOT NULL,
    `QuestionResponse` VARCHAR(250)       NOT NULL,
    PRIMARY KEY (QuestionId, UserResponseId),
    FOREIGN KEY (QuestionId) REFERENCES Questions(QuestionId)
);