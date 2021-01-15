-- MySQL Script generated by MySQL Workbench
-- Wed Nov 22 19:59:21 2017
-- Model: HMS    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema hms
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema hms
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `hms` DEFAULT CHARACTER SET utf8 ;
USE `hms` ;

-- -----------------------------------------------------
-- Table `hms`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hms`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `name` VARCHAR(50) NOT NULL,
  `lastname` VARCHAR(50) NOT NULL,
  `username` VARCHAR(20) NOT NULL unique,
  `password` VARCHAR(100) NOT NULL,
  `type` ENUM('admin', 'user') NOT NULL,
  `active` TINYINT NOT NULL DEFAULT 0,
   `phone` VARCHAR(30) NULL,
  `mobile` VARCHAR(30) NULL,
  `city` VARCHAR(50) NOT NULL,
  `country` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NULL,
  `organization` VARCHAR(50) NULL,
  `age` SMALLINT NULL,
  `gender` varchar(50) NULL,
  PRIMARY KEY (`id`))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hms`.`guests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hms`.`guests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(30) NULL,
  `mobile` VARCHAR(30) NULL,
  `city` VARCHAR(50) NOT NULL,
  `country` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NULL,
  `organization` VARCHAR(50) NULL,
  `age` SMALLINT NULL,
  `gender` ENUM('M', 'F') NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_customers_user_id` (`user_id` ASC))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hms`.`bookings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hms`.`bookings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `checkin` DATETIME NOT NULL,
  `checkout` DATETIME NOT NULL,
  `currency` VARCHAR(3) NULL DEFAULT 'USD',
  `amount` DECIMAL(6,2) NULL DEFAULT 0,
  `breakfast` TINYINT NULL DEFAULT 0,
  `nights` TINYINT NULL DEFAULT 1,
  `adults` INT NULL DEFAULT 1,
  `children` INT NULL DEFAULT 0,
  `type` ENUM('online', 'phone', 'agency', 'desk') NULL DEFAULT 'desk',
  `comments` TEXT NULL,
  `confirmed` TINYINT NULL DEFAULT 0,
  `guest_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_bookings_guest_id` (`guest_id` ASC),
  INDEX `fk_bookings_user_id` (`user_id` ASC))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hms`.`rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hms`.`rooms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `name` VARCHAR(20) NOT NULL,
  `currency` VARCHAR(3) NOT NULL DEFAULT 'USD',
  `price_night` DECIMAL(6,2) NOT NULL DEFAULT 0,
  `type` ENUM('standard', 'double', 'suite') NOT NULL DEFAULT 'standard',
  `max_guests` INT NULL DEFAULT 1,
  `available` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hms`.`cancellations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hms`.`cancellations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `comments` TEXT NOT NULL,
  `booking_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cancellations_booking_id` (`booking_id` ASC),
  INDEX `fk_cancellations_user_id` (`user_id` ASC))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hms`.`payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hms`.`payments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` DECIMAL(6,2) NOT NULL,
  `method` ENUM('cash', 'card', 'online') NOT NULL,
  `currency` VARCHAR(3) NOT NULL DEFAULT 'USD',
  `comments` TEXT NULL,
  `booking_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_payments_booking_id` (`booking_id` ASC),
  INDEX `fk_payments_user_id` (`user_id` ASC))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hms`.`services`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hms`.`services` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `description` VARCHAR(255) NOT NULL,
  `currency` VARCHAR(3) NOT NULL DEFAULT 'USD',
  `amount` DECIMAL(6,2) NOT NULL,
  `is_active` TINYINT NOT NULL DEFAULT 1,
  `user_id` INT NOT NULL,
  `booking_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_services_user_id` (`user_id` ASC),
  INDEX `fk_services_booking_id` (`booking_id` ASC))
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `hms`.`bookings_has_rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hms`.`bookings_has_rooms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `booking_id` INT NOT NULL,
  `room_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_bookings_has_rooms_room_id` (`room_id` ASC),
  INDEX `fk_bookings_has_rooms_booking_id` (`booking_id` ASC))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `hms`.`facilities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hms`.`facilities` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `description` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hms`.`rooms_has_facilities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hms`.`rooms_has_facilities` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `room_id` INT NOT NULL,
  `facilitie_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_rooms_has_facilities_facility_id` (`facilitie_id` ASC),
  INDEX `fk_rooms_has_facilities_room_id` (`room_id` ASC))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `hms`.`role`
-- -----------------------------------------------------

CREATE TABLE `role` (
  `rid` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Table `hms`.`permissions`
-- -----------------------------------------------------
CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module` varchar(45) DEFAULT NULL,
  `pname` varchar(255) DEFAULT NULL,
  `create` char(1) DEFAULT NULL,
  `read` char(1) DEFAULT NULL,
  `edit` char(1) DEFAULT NULL,
  `delete` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Table `hms`.`role_permission`
-- -----------------------------------------------------
CREATE TABLE `role_permission` (
  `rid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  PRIMARY KEY (`rid`,`pid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Table `hms`.`user_role`
-- -----------------------------------------------------
CREATE TABLE `user_role` (
  `uid` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  PRIMARY KEY (`uid`,`rid`),
  KEY `userFK_idx` (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;