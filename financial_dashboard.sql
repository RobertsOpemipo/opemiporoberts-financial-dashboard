-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2025 at 11:10 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `financial_dashboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `financial_data`
--

CREATE TABLE `financial_data` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `revenue` decimal(10,2) NOT NULL,
  `expenses` decimal(10,2) NOT NULL,
  `profit` decimal(10,2) NOT NULL,
  `customer_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `financial_data`
--

INSERT INTO `financial_data` (`id`, `date`, `revenue`, `expenses`, `profit`, `customer_count`) VALUES
(1, '2023-01-01', 5000.00, 3000.00, 2000.00, 120),
(2, '2023-01-02', 6000.00, 3500.00, 2500.00, 150),
(3, '2023-01-03', 5500.00, 3200.00, 2300.00, 140),
(4, '2023-01-04', 7000.00, 4000.00, 3000.00, 180),
(5, '2023-01-05', 7500.00, 4200.00, 3300.00, 200),
(6, '2023-01-06', 8000.00, 4500.00, 3500.00, 220),
(7, '2023-01-07', 7800.00, 4400.00, 3400.00, 210);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `financial_data`
--
ALTER TABLE `financial_data`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `financial_data`
--
ALTER TABLE `financial_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
