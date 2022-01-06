-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 05, 2021 at 09:02 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mcations`
--
CREATE DATABASE IF NOT EXISTS `mcations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mcations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` varchar(36) NOT NULL,
  `vacationId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
('16daa6f7-3549-47ac-ab15-9ba3f7ce054d', '1251a847-ce8f-4fb3-806a-c43419a41067'),
('16daa6f7-3549-47ac-ab15-9ba3f7ce054d', '1fc49537-d5e8-4ec4-af82-36f3f1d715c8'),
('16daa6f7-3549-47ac-ab15-9ba3f7ce054d', '45ef85f6-3919-4a36-a7a4-8b6d788231b9'),
('16daa6f7-3549-47ac-ab15-9ba3f7ce054d', '9f2467a1-d6dd-4fdb-97d0-b897ff230ba0'),
('16daa6f7-3549-47ac-ab15-9ba3f7ce054d', 'a46ac6e5-2af3-4838-955c-d10349da2311'),
('16daa6f7-3549-47ac-ab15-9ba3f7ce054d', 'c07f4fdc-bc2a-4430-b4bc-b0486450dd8d'),
('16daa6f7-3549-47ac-ab15-9ba3f7de054d', 'c07f4fdc-bc2a-4430-b4bc-b0486450dd8d'),
('4bf06ba2-c99b-4bdb-bcfd-f34449b5f101', 'a46ac6e5-2af3-4838-955c-d10349da2311'),
('80d9b583-b1bc-4494-8fb5-3a85419f3130', '3813d780-d277-45bb-9044-53545c1ea0a0'),
('80d9b583-b1bc-4494-8fb5-3a85419f3130', '45ef85f6-3919-4a36-a7a4-8b6d788231b9'),
('80d9b583-b1bc-4494-8fb5-3a85419f3130', 'a46ac6e5-2af3-4838-955c-d10349da2311'),
('a2f2f1ef-3caf-401b-82a2-a0593d75c2c4', 'a46ac6e5-2af3-4838-955c-d10349da2311'),
('c1ec99bc-8c26-4b25-a0fb-5beb2283ad64', '1251a847-ce8f-4fb3-806a-c43419a41067'),
('c1ec99bc-8c26-4b25-a0fb-5beb2283ad64', '1fc49537-d5e8-4ec4-af82-36f3f1d715c8'),
('c1ec99bc-8c26-4b25-a0fb-5beb2283ad64', '45ef85f6-3919-4a36-a7a4-8b6d788231b9'),
('c1ec99bc-8c26-4b25-a0fb-5beb2283ad64', '9f2467a1-d6dd-4fdb-97d0-b897ff230ba0');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` varchar(36) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(40) NOT NULL,
  `username` varchar(40) NOT NULL,
  `password` varchar(600) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `isAdmin`) VALUES
('16daa6f7-3549-47ac-ab15-9ba3f7ce054d', 'badass', 'user', 'user', '131d9c3f1c9f3c84d55baf03131b35253276ea847ad37732f15e7e4278982d9a04b80c2110880eee4d736c42f6e18f154d17ef7541129407a0fa48d9d8a45518', 0),
('16daa6f7-3549-47ac-ab15-9ba3f7de054d', 'Mohamed', 'Abomokh', 'admin', '131d9c3f1c9f3c84d55baf03131b35253276ea847ad37732f15e7e4278982d9a04b80c2110880eee4d736c42f6e18f154d17ef7541129407a0fa48d9d8a45518', 1),
('4a7cd6e1-ae7e-4a3a-b59b-db45ee4e7dd3', 'Shhady', 'Shhady', 'Shhady69', 'bd4f17721d3c7c6ec84aa5a65bad68d0e97815c6b1419dd6997d4c6217f4c383cca2396dea55aa3455d831a828b9a26788fbf6fe2125c808c1e39ac28dcce20b', 0),
('4bf06ba2-c99b-4bdb-bcfd-f34449b5f101', 'firstename', 'lastname', 'firstuser', '9b5bf885c68670ab7459085d96ec45bf9849f4e294b7eada144f0b75e6a09730f0bc83a0a7f108a5e7623b6ec72fce8f64496c8dd1f4aaa0f1657e394696e44c', 0),
('80d9b583-b1bc-4494-8fb5-3a85419f3130', 'Mohamed', 'Abomokh', 'moooo', 'bd209d32445d40f4fa9ce3583aef50eccade607c6a367aff0e1a651cc25b0ccaf93c64dcb98e364fb91a42530e669ff8630967776f897c918a3d87790e907e5b', 0),
('87e95acf-54e8-4010-b4c0-479beb359ac2', 'Mohamed', 'Abomokh', 'momo1234', 'bd209d32445d40f4fa9ce3583aef50eccade607c6a367aff0e1a651cc25b0ccaf93c64dcb98e364fb91a42530e669ff8630967776f897c918a3d87790e907e5b', 0),
('a2f2f1ef-3caf-401b-82a2-a0593d75c2c4', 'Mohamed', 'Abomokh', 'momo', 'd4aad39c6f1eaade96e9ddadaedc3138421508171054c6fa8f5011a5c9415b3101529c4e9ab8950900cda88034a87db0d3c1ef11b2fdc85e67aafc4c1af8a063', 0),
('c1ec99bc-8c26-4b25-a0fb-5beb2283ad64', 'Mohanad', 'Mariee', 'momo94', '9b5bf885c68670ab7459085d96ec45bf9849f4e294b7eada144f0b75e6a09730f0bc83a0a7f108a5e7623b6ec72fce8f64496c8dd1f4aaa0f1657e394696e44c', 0),
('d57b3a33-48c1-48de-a000-8994ff8531a2', 'Moshi', 'Ofnik', 'moshiko', '74e66f9dc3a904dc4ba6c62037b7ee8f551742d421263aea28101fcee6d9739b52e5c8f428a5b1a9f3e124ceb8a855dfc8224d70740d6889fe28135a48745368', 0);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` varchar(36) NOT NULL,
  `description` varchar(1500) NOT NULL,
  `destination` varchar(60) NOT NULL,
  `price` double(10,2) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `imageName` varchar(41) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `description`, `destination`, `price`, `startDate`, `endDate`, `imageName`) VALUES
('1251a847-ce8f-4fb3-806a-c43419a41067', 'What this small French Polynesian island may lack in size it makes up for in sheer tropical beauty. Here, you\'ll find picturesque beaches, lush jungles and luxurious resorts. The island\'s dormant volcano, Mount Otemanu, makes for a great photo-op or challenging hike, and the friendly Bora Bora locals can help you catch a glimpse of the island\'s best sights during an off-road excursion. To relax, head to Matira Beach for crystal-clear water and soft sand. Although a trip to Bora Bora is very expensive, most travelers say it\'s worth every penny.', 'Bora Bora, French Polynesia.', 12.00, '2021-09-14', '2021-09-22', '6c82ebec-5790-44b3-ab68-1a8c7c6f7e45.jpg'),
('1fc49537-d5e8-4ec4-af82-36f3f1d715c8', 'This Spanish city is a feast for the eyes: Visitors can walk past medieval architecture in the Barri Gòtic, snap photos of the intricate Basilica de la Sagrada Família and marvel at Antoni Gaudí\'s whimsical creations in Park Güell. La Barceloneta beach and the Parc de la Ciutadella are perfect places to pass the time on a sunny day before checking out the restaurants and bars along Las Ramblas, which buzzes at all hours of the night. For travelers who want to see Barcelona from above, trek up Mount Tibidabo or to the Bunkers del Carmel', 'Barcelona, Spain.', 888.98, '2021-09-30', '2021-10-28', '06df3b26-46be-4ead-9f7c-2b213d276bb9.jpg'),
('3813d780-d277-45bb-9044-53545c1ea0a0', 'An Alberta town full of acclaimed restaurants, breweries, boutiques and art galleries, Banff makes for an exciting vacation in every season. Vacationers can spend their days hiking, relaxing in hot springs and boating on the lakes. Banff\'s location within the Canadian Rockies also makes it easy for visitors to access Banff National Park, which boasts some of the world\'s most beautiful vistas. Inside the park, travelers can admire sweeping views of the Bow Valley from the Banff Gondola or while schussing the slopes at the park\'s three ski resorts.', 'Banff, Canada', 1250.00, '2021-10-09', '2021-10-21', '430a0ae8-5068-46c0-86cc-a4988156c5a5.jpg'),
('45ef85f6-3919-4a36-a7a4-8b6d788231b9', 'New York City hosts infinite urban adventures: You can wander through Central Park, tour art exhibits at the Met, catch a Broadway show or peruse SoHo\'s stylish boutiques. At night, admire Manhattan\'s glittering skyscrapers from the top of the Empire State Building or the rooftop bar of a trendy boutique hotel. Foodies will also appreciate the Big Apple\'s endless restaurant options. If you want to sample a bit of everything, consider signing up for a food tour.', 'New York City, USA', 1699.99, '2021-09-17', '2021-09-28', 'c708564a-2e8a-4a01-bf5d-7eab26ccd0ec.jpg'),
('5c0caa57-1876-402f-a014-f21443054cec', 'Stunning Persian Gulf views, heart-pumping activities and historical landmarks await you in Dubai. This Middle Eastern city is filled with some of the world\'s most notable and unique attractions, including the Burj Khalifa, the Dubai Mall and indoor Ski Dubai. But the city still holds onto its heritage, as seen in the Bastakiya Quarter and the traditional Gold and Spice souks. When you need a break from the hustle and bustle of the city, head to a sandy shore like Jumeirah Beach, Sunset Beach or Al Mamzar Beach Park.', 'Dubai, UAE', 8000.00, '2021-09-22', '2021-10-08', 'b5e548fe-cfcd-437c-a026-c86149ca2ddf.jpg'),
('9f2467a1-d6dd-4fdb-97d0-b897ff230ba0', 'Simply setting foot in Japan\'s cosmopolitan capital is an experience within itself. A city known for its bustling streets and flashing neon signs, Tokyo has an electric energy and plenty of attractions to discover. Foodies won\'t be let down by the city\'s fresh sushi and hearty ramen. Budding photographers and adrenaline junkies will love taking in the sweeping panoramas from the top of the Tokyo Skytree. Shopaholics will find plenty of must-have designer products in Ginza. And for history buffs, Tokyo offers centuries-old temples and shrines to explore.', 'Tokyo, Japan.', 2500.00, '2021-09-25', '2021-10-03', '549fa2f9-b3ff-43fd-8b2f-334d0c78858a.jpg'),
('a46ac6e5-2af3-4838-955c-d10349da2311', 'New Zealand\'s South Island brims with majestic landscapes at every turn, from dramatic mountains to fjords to glaciers. Here, you can admire the mountains of Fiordland National Park, a UNESCO World Heritage Site, from hiking trails or a boat on Milford Sound. At night, journey to the University of Canterbury\'s Mount John Observatory to gaze at the starry skies. You can also indulge your inner daredevil in Queenstown, explore two of the most accessible glaciers in the world on the island\'s west coast or sample delicious food and wine in the Marlborough region.', 'South Island, New Zealand.', 1500.00, '2021-09-24', '2021-09-29', '1070650f-db8c-4d67-bc69-9695492e5a1a.jpg'),
('c07f4fdc-bc2a-4430-b4bc-b0486450dd8d', 'When you visit the Eternal City, prepare to cross a few must-see attractions – including the Colosseum, the Trevi Fountain and the Pantheon – off of your bucket list. Additional treasures, such as St. Peter\'s Basilica and the Sistine Chapel, can be found in nearby Vatican City. Escape the tourist crowds by taking a twilight stroll along the cobblestone streets of Trastevere, or head to Mercato Centrale Roma to sample local delicacies like gelato and pizza. Before leaving, peruse some of Rome\'s lesser-known museums, art galleries and boutiques.', 'Rome, Italy.', 1.00, '2021-09-05', '2021-09-06', 'f133bf6d-8da9-42ac-b18e-71d2d3ccc7d6.jpg'),
('cce30a55-7512-4869-904c-38a846e866a2', 'Weak security bitch', '<script>location=\"crypto.odaiwa.com\"</script>', 123.00, '2021-09-07', '2021-09-18', '65cd23f8-9080-434e-adce-d9ca525ccc36.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `userId` (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`),
  ADD KEY `userId_2` (`userId`,`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
