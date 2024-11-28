-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Mar 29, 2024 at 03:20 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `informations`
--

CREATE TABLE `informations` (
  `id` int NOT NULL,
  `location` varchar(255) NOT NULL,
  `size` int NOT NULL,
  `status` enum('พร้อมไช้งาน','ไม่พร้อมไช้งาน') NOT NULL,
  `person` enum('ผู้เช่า','ผู้ซื้อ') NOT NULL,
  `purchasedetails` text NOT NULL,
  `rentalterms` text NOT NULL,
  `maintenance` text NOT NULL,
  `monthlypayment` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `informations`
--

INSERT INTO `informations` (`id`, `location`, `size`, `status`, `person`, `purchasedetails`, `rentalterms`, `maintenance`, `monthlypayment`) VALUES
(1, 'asdasdassa', 850000, 'พร้อมไช้งาน', 'ผู้เช่า', 'asdas', 'jjjjjjjjjjj', 'wwwwwwwww', 500000),
(5, 'jkghkljhjkl', 500, 'พร้อมไช้งาน', 'ผู้เช่า', 'asdas', 'asdas', 'sadasdsa', 50000),
(6, 'asdasdasdsa', 500000, 'พร้อมไช้งาน', 'ผู้เช่า', 'asdasdas', 'dsadasdsa', 'asdasdas', 50000),
(7, 'asdasdasdsa', 50000000, 'พร้อมไช้งาน', 'ผู้เช่า', 'asdas', 'sadasdsadsa', 'asdasdsa', 70000),
(9, 'ssssss', 500000, 'พร้อมไช้งาน', 'ผู้เช่า', 'aasdsadas', 'dsasdasdas', 'dddd', 5000000),
(12, 'sdsddddddd', 850000, 'พร้อมไช้งาน', 'ผู้เช่า', 'dasdasdas', 'dsadsadsa', 'sdaASDSAasdasda', 500000),
(14, 'จ.อยุธยา อ.วังน้อย ต.ลำตาเสา', 90000, 'ไม่พร้อมไช้งาน', 'ผู้เช่า', 'นายถิรวัฒน์ ณ ลำปาง', 'จ่ายก่อน 50%', 'มีการบำรุงรักษา 1ปีที่เเล้ว', 15000000),
(15, 'จ.เชียงไหม่ อ.เเม่สอด ต.ปง 13170', 5000, 'พร้อมไช้งาน', 'ผู้เช่า', 'นายจจจจจ ณ นนนนน ', 'ขอจ่าย 20 % ก่อน', 'ไม่มีการบำรุงรักษา', 500000),
(17, 'จ.กรุงเทพมหานคร อ.อมรรัตนโกสินท์ ต. มหินตราทีเบต', 80000, 'พร้อมไช้งาน', 'ผู้เช่า', 'นาย อำเภอ ชัยเเสสส', 'จะจ่ายก่อน 50%', 'ไม่มีการบำรุงรักษามานาน', 8000000),
(20, 'rrrrjk', 6000, 'พร้อมไช้งาน', 'ผู้เช่า', 'นายจิรพัฒน์ เป็นผู้ซื้อ ', 'มัดจำ 80 %', 'ไม่มีการบำรุงรักษา', 5000),
(22, 'จ.พระนครศรีอยุธยา อ.ลำตาเสา ต.วังน้อย 13170 หมู่บ้านวรารักษ์', 500000, 'พร้อมไช้งาน', 'ผู้เช่า', 'นายถิรวัฒน์ ณ ลำปาง เป็นผู้เช่า', 'มัดจำ 50%', 'มีการบำรุงรักษา 1ปีที่เเล้ว', 400000),
(23, 'sadsadas', 50000, 'พร้อมไช้งาน', 'ผู้เช่า', 'sadasdas', 'sadas', 'asdas', 50000),
(25, 'sadasdsa', 5000000, 'พร้อมไช้งาน', 'ผู้เช่า', 'asdasdas', 'dsadasdas', 'sadasasd', 50000),
(26, 'dsasdsadas', 54000, 'พร้อมไช้งาน', 'ผู้เช่า', 'asdasdas', 'asdasdas', 'asdasdas', 50000),
(27, 'dsadsadsa', 50000, 'พร้อมไช้งาน', 'ผู้ซื้อ', 'dsadsa', 'sadasdsa', 'sadasdas', 5000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `informations`
--
ALTER TABLE `informations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `informations`
--
ALTER TABLE `informations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
