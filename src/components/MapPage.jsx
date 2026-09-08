import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { Search, Map as MapIcon, Route, ArrowLeft, Compass, LocateFixed, ChevronUp, Plus, X, Mic, Sun, Moon } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-rotate';
import './MapPage.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

import MarkerClusterGroup from 'react-leaflet-cluster';

// pujos-part1.js - Bonedi Baris & North Kolkata Batch 1
const batchOnePujos = [
  // BONEDI BARIR PUJOS (8)
  { name: "Srimani Barir Durga Pujo", category: "Bonedi Bari", lat: 22.5821, lng: 88.3612 },
  { name: "Hathkhola Dutta Barir Durga Pujo", category: "Bonedi Bari", lat: 22.5934, lng: 88.3651 },
  { name: "Sovabazar Rajbarir Durga Pujo", category: "Bonedi Bari", lat: 22.5971, lng: 88.3632 },
  { name: "Roychoudhury Barir Durga Pujo", category: "Bonedi Bari", lat: 22.5120, lng: 88.3410 },
  { name: "Khelat Ghose er Durga Pujo", category: "Bonedi Bari", lat: 22.5890, lng: 88.3620 },
  { name: "Rani Rashmoni er Durga Pujo", category: "Bonedi Bari", lat: 22.5640, lng: 88.3510 },
  { name: "RAMDULAL NIBAS er Durga Pujo", category: "Bonedi Bari", lat: 22.5912, lng: 88.3640 },
  { name: "Baghbazar Haldar Bari er Pujo", category: "Bonedi Bari", lat: 22.6005, lng: 88.3680 },

  // ICONIC & NORTH KOLKATA BATCH 1
  { name: "Ahiritola", category: "North Kolkata", lat: 22.5975, lng: 88.3643 },
  { name: "College Square", category: "North Kolkata", lat: 22.5760, lng: 88.3639 },
  { name: "Anupama Housing Complex", category: "North Kolkata", lat: 22.6150, lng: 88.4120 },
  { name: "Dum Dum Park Tarun Sangha", category: "North Kolkata", lat: 22.6200, lng: 88.4000 },
  { name: "Dum Dum Park Bharat Chakra", category: "North Kolkata", lat: 22.6240, lng: 88.4050 },
  { name: "Dum Dum Tarun Dal", category: "North Kolkata", lat: 22.6190, lng: 88.3980 },
  { name: "Dum Dum Park Yubak Brinda", category: "North Kolkata", lat: 22.6210, lng: 88.4010 },
  { name: "Baghbazar Sarbojonin Durgotsab & Exhibition", category: "North Kolkata", lat: 22.6001, lng: 88.3695 },
  { name: "Joramandir", category: "North Kolkata", lat: 22.5780, lng: 88.3720 },
  { name: "Telengabagan", category: "North Kolkata", lat: 22.5880, lng: 88.3750 },
  { name: "Karbagan Sarbojanin", category: "North Kolkata", lat: 22.5850, lng: 88.3720 },
  { name: "Gouriberia", category: "North Kolkata", lat: 22.5820, lng: 88.3700 },
  { name: "Kumartuli Park", category: "North Kolkata", lat: 22.5950, lng: 88.3621 },
  { name: "Laketown Adhibasi Brinda", category: "North Kolkata", lat: 22.6050, lng: 88.3950 },
  { name: "Laketown Netaji Sporting Club", category: "North Kolkata", lat: 22.6070, lng: 88.3970 },
  { name: "Md. Ali Park", category: "North Kolkata", lat: 22.5753, lng: 88.3582 },
  { name: "Mitali - Kankurgachi", category: "North Kolkata", lat: 22.5750, lng: 88.3900 },
  { name: "Salt Lake CJ Block", category: "Salt Lake", lat: 22.5790, lng: 88.4050 },
  { name: "Salt Lake BJ Block", category: "Salt Lake", lat: 22.5921, lng: 88.4110 },
  { name: "Salt Lake FD Block", category: "Salt Lake", lat: 22.5855, lng: 88.4072 },
  { name: "Salt Lake GD Block", category: "Salt Lake", lat: 22.5720, lng: 88.4120 },
  { name: "Salt Lake HA Block", category: "Salt Lake", lat: 22.5730, lng: 88.4020 },
  { name: "Swapnar Bagan", category: "North Kolkata", lat: 22.5925, lng: 88.3685 },
  { name: "Lalabagan Yubak Brinda - Nabankur Sangha", category: "North Kolkata", lat: 22.5895, lng: 88.3715 },
  { name: "Sammilita Lalabagan Sarbojanin", category: "North Kolkata", lat: 22.5905, lng: 88.3725 },
  { name: "Salt Lake AE Block - Part 1", category: "Salt Lake", lat: 22.5880, lng: 88.4050 },
  { name: "CIT Sarbojonin", category: "North Kolkata", lat: 22.5730, lng: 88.3750 },
  { name: "Baghbazar Jagodharti", category: "North Kolkata", lng: 88.3690, lat: 22.5995 },
  { name: "Beliaghata 33 No Palli", category: "North Kolkata", lat: 22.5620, lng: 88.3950 },
  { name: "Belgachia Sadharan Durgatsab", category: "North Kolkata", lat: 22.6100, lng: 88.3850 },
  { name: "Kumartuli Sarbojonin", category: "North Kolkata", lat: 22.5960, lng: 88.3615 },
  { name: "Satadal", category: "North Kolkata", lat: 22.5845, lng: 88.3735 },
  { name: "Salt Lake AE Block - Part 2", category: "Salt Lake", lat: 22.5885, lng: 88.4055 },
  { name: "Salt Lake BE Block - Part 2", category: "Salt Lake", lat: 22.5905, lng: 88.4165 },
  { name: "Salt Lake CK-CL Block", category: "Salt Lake", lat: 22.5975, lng: 88.4040 },
  { name: "Salt Lake DL block", category: "Salt Lake", lat: 22.5885, lng: 88.4120 },
  { name: "Karunamayee G Block", category: "Salt Lake", lat: 22.5835, lng: 88.4150 },
  { name: "Kamardanga Sitalatala - Howrah", category: "North Kolkata", lat: 22.5800, lng: 88.3400 },
  { name: "Arupara Milan Sangha - Howrah", category: "North Kolkata", lat: 22.5820, lng: 88.3380 },
  { name: "Naba Baghbazar", category: "North Kolkata", lat: 22.6010, lng: 88.3690 },
  { name: "Bangur Avenue Protirodh Bahini", category: "North Kolkata", lat: 22.6120, lng: 88.4080 },
  { name: "Goabagan Sarbojanin", category: "North Kolkata", lat: 22.5855, lng: 88.3705 },
  { name: "Hari Ghosh Street", category: "North Kolkata", lat: 22.5875, lng: 88.3715 }
];

// pujos-part2.js - North & South Kolkata Batch 2
const batchTwoPujos = [
  { name: "Sabeda Bagan", category: "North Kolkata", lat: 22.5915, lng: 88.3765 },
  { name: "Behala Club", category: "South Kolkata", lat: 22.4950, lng: 88.3300 },
  { name: "Debdaru Fatak", category: "South Kolkata", lat: 22.5020, lng: 88.3520 },
  { name: "Behala Sree Sangha", category: "South Kolkata", lat: 22.4910, lng: 88.3280 },
  { name: "Behala Youngmen's Association", category: "South Kolkata", lat: 22.4930, lng: 88.3290 },
  { name: "Behala Adarsha Pally", category: "South Kolkata", lat: 22.4900, lng: 88.3270 },
  { name: "Badamtala Ashar Sangha", category: "South Kolkata", lat: 22.5150, lng: 88.3480 },
  { name: "Behala Nutan Dal", category: "South Kolkata", lat: 22.4890, lng: 88.3260 },
  { name: "Bosepukur Talbagan", category: "South Kolkata", lat: 22.5140, lng: 88.3820 },
  { name: "Rajdanga Tribarna Sangha", category: "South Kolkata", lat: 22.5125, lng: 88.3860 },
  { name: "Bosepukur Sitala Mandir", category: "South Kolkata", lat: 22.5160, lng: 88.3800 },
  { name: "Singhi Park", category: "South Kolkata", lat: 22.5204, lng: 88.3618 },
  { name: "Ekdalia Evergreen Club", category: "South Kolkata", lat: 22.5152, lng: 88.3650 },
  { name: "Jodhpur Park", category: "South Kolkata", lat: 22.5115, lng: 88.3660 },
  { name: "Selimpur Pally", category: "South Kolkata", lat: 22.5040, lng: 88.3750 },
  { name: "Santoshpur Lake Pally", category: "South Kolkata", lat: 22.4980, lng: 88.3780 },
  { name: "Mudiali Club", category: "South Kolkata", lat: 22.5120, lng: 88.3450 },
  { name: "Shibmandir Sarbojonin Durgotsab", category: "South Kolkata", lat: 22.5100, lng: 88.3470 },
  { name: "Naktala Udayan Sangha", category: "South Kolkata", lat: 22.4850, lng: 88.3650 },
  { name: "Rajdanga Naba Uday Sangha", category: "South Kolkata", lat: 22.5110, lng: 88.3850 },
  { name: "Suruchi Sangha", category: "South Kolkata", lat: 22.5081, lng: 88.3377 },
  { name: "Tridhara Sammilani", category: "South Kolkata", lat: 22.5230, lng: 88.3620 },
  { name: "Pratapaditya Road Tricone Park", category: "South Kolkata", lat: 22.5135, lng: 88.3510 },
  { name: "Sanghasree", category: "South Kolkata", lat: 22.5145, lng: 88.3495 },
  { name: "Sebak Sangha", category: "South Kolkata", lat: 22.5010, lng: 88.3550 },
  { name: "Dilip Smriti Sangha", category: "South Kolkata", lat: 22.5030, lng: 88.3560 },
  { name: "Lake Youth Corner", category: "South Kolkata", lat: 22.5175, lng: 88.3585 },
  { name: "Ekush Pally Sarbojonin Durgotsab", category: "South Kolkata", lat: 22.5195, lng: 88.3595 },
  { name: "Acharya Prafulla Sangha - Behala", category: "South Kolkata", lat: 22.4885, lng: 88.3245 },
  { name: "Adi Ballygunge", category: "South Kolkata", lat: 22.5225, lng: 88.3645 },
  { name: "Ballygunge Cultural Association", category: "South Kolkata", lat: 22.5210, lng: 88.3610 },
  { name: "Barisha Player's Corner", category: "South Kolkata", lat: 22.4870, lng: 88.3230 },
  { name: "Barisha Sabuj Sathi Club", category: "South Kolkata", lat: 22.4860, lng: 88.3220 },
  { name: "Barisha Tapoban", category: "South Kolkata", lat: 22.4850, lng: 88.3210 },
  { name: "Behala Arcadia Sarbojonin", category: "South Kolkata", lat: 22.4925, lng: 88.3315 },
  { name: "Durgabari", category: "South Kolkata", lat: 22.5110, lng: 88.3530 },
  { name: "Ganbani Sangha", category: "South Kolkata", lat: 22.5065, lng: 88.3575 },
  { name: "Samaj Sebi Sangha", category: "South Kolkata", lat: 22.5250, lng: 88.3510 },
  { name: "Sodepur Pragati Sangha (Haridevpur)", category: "South Kolkata", lat: 22.4780, lng: 88.3500 },
  { name: "Santoshpur Sonar Tori Durgotsav", category: "South Kolkata", lat: 22.4970, lng: 88.3790 },
  { name: "Abasar Sarbojonin", category: "South Kolkata", lat: 22.5055, lng: 88.3590 },
  { name: "Goal Math", category: "South Kolkata", lat: 22.5025, lng: 88.3545 },
  { name: "Barisha Netaji Sangha", category: "South Kolkata", lat: 22.4840, lng: 88.3200 },
  { name: "Behala Buroshibtala Janakalyan Sangha", category: "South Kolkata", lat: 22.4940, lng: 88.3330 },
  { name: "Jogajatri Club", category: "South Kolkata", lat: 22.5005, lng: 88.3535 },
  { name: "Surya Nagar Sarbojonin", category: "South Kolkata", lat: 22.4795, lng: 88.3525 }
];

// pujos-part3.js - Remaining Pandals & Salt Lake Blocks Batch 3
const batchThreePujos = [
  { name: "Salt Lake IA Block", category: "Salt Lake", lat: 22.5750, lng: 88.4060 },
  { name: "Salt Lake Laboni", category: "Salt Lake", lat: 22.5830, lng: 88.4000 },
  { name: "Santosh Mitra Square", category: "North Kolkata", lat: 22.5697, lng: 88.3662 },
  { name: "Sealdah Railway Athletic Club", category: "North Kolkata", lat: 22.5652, lng: 88.3711 },
  { name: "Sovabazar Beniatola", category: "North Kolkata", lat: 22.5940, lng: 88.3630 },
  { name: "Sreebhumi Sporting Club", category: "North Kolkata", lat: 22.6074, lng: 88.3813 },
  { name: "Tala Barowari", category: "North Kolkata", lat: 22.6100, lng: 88.3750 },
  { name: "Manicktala Chaltabagan Loha Patty", category: "North Kolkata", lat: 22.5820, lng: 88.3740 },
  { name: "Pathuriaghata Pancher Pally", category: "North Kolkata", lat: 22.5890, lng: 88.3650 },
  { name: "Tala Palli", category: "North Kolkata", lat: 22.6110, lng: 88.3760 },
  { name: "Ghas Bagan", category: "North Kolkata", lat: 22.5840, lng: 88.3710 },
  { name: "Hatibagan Nabin Pally", category: "North Kolkata", lat: 22.5982, lng: 88.3731 },
  { name: "Nalin Sarkar Street Sarbojanin Durgotsab", category: "North Kolkata", lat: 22.5900, lng: 88.3730 },
  { name: "Hatibagan Sarbojanin", category: "North Kolkata", lat: 22.5950, lng: 88.3720 },
  { name: "Olabibitala Sarbojanin", category: "North Kolkata", lat: 22.5750, lng: 88.3350 },
  { name: "Yuva Brinda", category: "North Kolkata", lat: 22.6030, lng: 88.3780 },
  { name: "Kashi Bose Lane", category: "North Kolkata", lat: 22.5831, lng: 88.3694 },
  { name: "Purbachal Sarbojonin", category: "Salt Lake", lat: 22.5910, lng: 88.3950 },
  { name: "Sovabazar Rajbari", category: "North Kolkata", lat: 22.5971, lng: 88.3632 },
  { name: "37 Pally", category: "North Kolkata", lat: 22.5740, lng: 88.3680 },
  { name: "Salt Lake AJ Block", category: "Salt Lake", lat: 22.5860, lng: 88.4030 },
  { name: "Laketown Nutan Palli", category: "North Kolkata", lat: 22.6060, lng: 88.3960 },
  { name: "Pradeep Sangha", category: "North Kolkata", lat: 22.5815, lng: 88.3675 },
  { name: "Rammohan Sammilani", category: "North Kolkata", lat: 22.5725, lng: 88.3665 },
  { name: "Durga Puja of 4 Ghosh Lane", category: "North Kolkata", lat: 22.5885, lng: 88.3685 },
  { name: "Dakshineswar Dolpere Adi Sabojonin Durgapuja", category: "North Kolkata", lat: 22.6500, lng: 88.3700 },
  { name: "Milangarh Sarbojanin", category: "North Kolkata", lat: 22.6250, lng: 88.3900 },
  { name: "Motijheel Sarbojanin", category: "North Kolkata", lat: 22.6280, lng: 88.3920 },
  { name: "Beliaghata Nabamilan", category: "North Kolkata", lat: 22.5630, lng: 88.3960 },
  { name: "Sandhani", category: "North Kolkata", lat: 22.5710, lng: 88.3780 },
  { name: "Simla Byam Samity", category: "North Kolkata", lat: 22.5860, lng: 88.3670 },
  { name: "United Club", category: "North Kolkata", lat: 22.5680, lng: 88.3720 },
  { name: "Jagat Mukherjee Park", category: "North Kolkata", lat: 22.5960, lng: 88.3690 },
  { name: "Baghbazar Pally", category: "North Kolkata", lat: 22.6015, lng: 88.3705 },
  { name: "Beadon Street Sarbojanin", category: "North Kolkata", lat: 22.5850, lng: 88.3650 },
  { name: "Sammilita Malapara", category: "North Kolkata", lat: 22.5825, lng: 88.3660 },
  { name: "Darpanarayan Tagore Street Pally Samity", category: "North Kolkata", lat: 22.5835, lng: 88.3640 },
  { name: "Haritaki Bagan", category: "North Kolkata", lat: 22.5865, lng: 88.3635 },
  { name: "Sovabazar Sarbojonin", category: "North Kolkata", lat: 22.5955, lng: 88.3635 },
  { name: "Hatkhola Gosain Para", category: "North Kolkata", lat: 22.5925, lng: 88.3645 },
  { name: "Laketown Vivekananda Park", category: "North Kolkata", lat: 22.6080, lng: 88.3980 },
  { name: "Jawpur Bayam Samiti", category: "North Kolkata", lat: 22.6200, lng: 88.3900 },
  { name: "Pragati Pally Adhibasi Brindra", category: "North Kolkata", lat: 22.6040, lng: 88.3940 },
  { name: "Kabiraj Bagan", category: "North Kolkata", lat: 22.5870, lng: 88.3695 },
  { name: "Murari Pukur Bidhan Sangha", category: "North Kolkata", lat: 22.5935, lng: 88.3820 },
  { name: "Salt Lake AD Block", category: "Salt Lake", lat: 22.5890, lng: 88.4080 },
  { name: "Salt Lake AG Block", category: "Salt Lake", lat: 22.5840, lng: 88.4060 },
  { name: "Sangrami", category: "North Kolkata", lat: 22.5795, lng: 88.3810 },
  { name: "Tarun Sporting Club", category: "North Kolkata", lat: 22.5810, lng: 88.3830 },
  { name: "Shimla Vivekananda Sporting Club", category: "North Kolkata", lat: 22.5852, lng: 88.3672 },
  { name: "Shurir Bagan", category: "North Kolkata", lat: 22.5842, lng: 88.3682 },
  { name: "Salt Lake CA Block", category: "Salt Lake", lat: 22.5980, lng: 88.4050 },
  { name: "Salt Lake BG Block", category: "Salt Lake", lat: 22.5880, lng: 88.4180 },
  { name: "Salt Lake AH Block", category: "Salt Lake", lat: 22.5820, lng: 88.4040 },
  { name: "Park Circus", category: "South Kolkata", lat: 22.5450, lng: 88.3670 },
  { name: "Maddox Square", category: "South Kolkata", lat: 22.5332, lng: 88.3551 },
  { name: "Deshapriya Park", category: "South Kolkata", lat: 22.5222, lng: 88.3533 },
  { name: "41 Pally", category: "South Kolkata", lat: 22.5165, lng: 88.3505 },
  { name: "Ajeya Sanghati", category: "South Kolkata", lat: 22.5095, lng: 88.3515 },
  { name: "Vivekananda Sporting Club", category: "South Kolkata", lat: 22.5130, lng: 88.3490 },
  { name: "Vivekananda Park Athletic Club", category: "South Kolkata", lat: 22.5310, lng: 88.3540 },
  { name: "25 Pally", category: "South Kolkata", lat: 22.5185, lng: 88.3485 },
  { name: "Mukul Sangha", category: "South Kolkata", lat: 22.5215, lng: 88.3475 },
  { name: "66 Palli", category: "South Kolkata", lat: 22.5180, lng: 88.3490 },
  { name: "Hindustan Park", category: "South Kolkata", lat: 22.5180, lng: 88.3630 },
  { name: "Adi Lake Palli", category: "South Kolkata", lat: 22.5140, lng: 88.3600 },
  { name: "Azadgarh", category: "South Kolkata", lat: 22.4865, lng: 88.3605 },
  { name: "Bharat Mata", category: "South Kolkata", lat: 22.5155, lng: 88.3565 },
  { name: "Golfgreen Phase 2", category: "South Kolkata", lat: 22.4955, lng: 88.3685 },
  { name: "Santoshpur Trikon Park", category: "South Kolkata", lat: 22.5020, lng: 88.3760 },
  { name: "Yuba Sangha Club", category: "South Kolkata", lat: 22.5045, lng: 88.3585 },
  { name: "Netaji Nagar Sarbojanin", category: "South Kolkata", lat: 22.4820, lng: 88.3580 },
  { name: "Netaji Jatiya Sebadal", category: "South Kolkata", lat: 22.4835, lng: 88.3590 },
  { name: "New Alipore Children's Park", category: "South Kolkata", lat: 22.5050, lng: 88.3420 },
  { name: "Pally Mangal Samity", category: "South Kolkata", lat: 22.5060, lng: 88.3710 },
  { name: "Poddar Nagar Park", category: "South Kolkata", lat: 22.4920, lng: 88.3670 },
  { name: "Chakraberia Sarbojanin", category: "South Kolkata", lat: 22.5350, lng: 88.3580 },
  { name: "Babubagan Club", category: "South Kolkata", lat: 22.5090, lng: 88.3840 },
  { name: "Barisha Tarun Tirtha", category: "South Kolkata", lat: 22.4895, lng: 88.3275 },
  { name: "74 Pally", category: "South Kolkata", lat: 22.5170, lng: 88.3500 },
  { name: "Kabitirtha", category: "South Kolkata", lat: 22.5380, lng: 88.3300 },
  { name: "Pally Saradiya Club", category: "South Kolkata", lat: 22.5118, lng: 88.3598 },
  { name: "Behala 29 Palli", category: "South Kolkata", lat: 22.4960, lng: 88.3310 },
  { name: "Baishnabghata Patuli Upanagari", category: "South Kolkata", lat: 22.4750, lng: 88.3880 },
  { name: "Kendua Shanti Sangha - Patuli", category: "South Kolkata", lat: 22.4730, lng: 88.3860 },
  { name: "Falguni Sangha", category: "South Kolkata", lat: 22.5050, lng: 88.3600 },
  { name: "Chetla Agrani Club", category: "South Kolkata", lat: 22.5201, lng: 88.3392 },
  { name: "Chelta Sarbasadharaner Club", category: "South Kolkata", lat: 22.5190, lng: 88.3410 },
  { name: "Selimpur Naskarpara", category: "South Kolkata", lat: 22.5030, lng: 88.3735 },
  { name: "Bengal United Club", category: "South Kolkata", lat: 22.5270, lng: 88.3525 },
  { name: "Chandranath Chatterjee Street", category: "South Kolkata", lat: 22.5240, lng: 88.3515 },
  { name: "Greenwood Nook", category: "South Kolkata", lat: 22.5700, lng: 88.4150 },
  { name: "Udayan Sangha", category: "South Kolkata", lat: 22.4845, lng: 88.3640 },
  { name: "Uttar Panchanan Gram Milan", category: "South Kolkata", lat: 22.5120, lng: 88.3900 },
  { name: "Golden Arrow Club", category: "South Kolkata", lat: 22.5085, lng: 88.3730 },
  { name: "Purbachal Shakti Sangha", category: "Salt Lake", lat: 22.5915, lng: 88.3965 },
  { name: "Naskarpur Sarbojanin", category: "South Kolkata", lat: 22.4810, lng: 88.3450 },
  { name: "Kolkata", category: "North Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "64 Pally", category: "South Kolkata", lat: 22.5160, lng: 88.3470 },
  { name: "95 Pally", category: "South Kolkata", lat: 22.5100, lng: 88.3670 },
  { name: "Bandhab Sammilani", category: "South Kolkata", lat: 22.5260, lng: 88.3480 },
  { name: "The Bengal Boys Training Association", category: "South Kolkata", lat: 22.5280, lng: 88.3500 },
  { name: "Nepal Bhattacharjee Street", category: "South Kolkata", lat: 22.5200, lng: 88.3460 },
  { name: "Roynagar Unnayan Samity", category: "South Kolkata", lat: 22.4805, lng: 88.3635 },
  { name: "Shyamapally Shyama Sangha", category: "South Kolkata", lat: 22.4900, lng: 88.3750 },
  { name: "Garia Sreerampur Kalyan Samity", category: "South Kolkata", lat: 22.4680, lng: 88.3900 },
  { name: "Bhowanipur Swadhin Sangha", category: "South Kolkata", lat: 22.5320, lng: 88.3480 },
  { name: "Dakshin Phalguni Club", category: "South Kolkata", lat: 22.4740, lng: 88.3850 },
  { name: "Garia Pancha Durga", category: "South Kolkata", lat: 22.4690, lng: 88.3910 },
  { name: "Garia Sabuj Dal", category: "South Kolkata", lat: 22.4670, lng: 88.3890 },
  { name: "Harish Park Puja", category: "South Kolkata", lat: 22.5340, lng: 88.3520 },
  { name: "Jatra Suru Sangha", category: "South Kolkata", lat: 22.5138, lng: 88.3465 },
  { name: "Judge Bagan Recreation Club", category: "South Kolkata", lat: 22.4760, lng: 88.3520 },
  { name: "Green Avenue Sarbojanin", category: "South Kolkata", lat: 22.4720, lng: 88.3800 },
  { name: "Rupchand Mukherjee Lane Sarbojanin", category: "South Kolkata", lat: 22.5285, lng: 88.3465 },
  { name: "Santoshpur Agragami", category: "South Kolkata", lat: 22.4990, lng: 88.3775 },
  { name: "Santoshpur Bibekananda Sangha", category: "South Kolkata", lat: 22.4965, lng: 88.3765 },
  { name: "Lake Pally Sarbojanin", category: "South Kolkata", lat: 22.5168, lng: 88.3590 },
  { name: "Golfgreen Phase 1", category: "South Kolkata", lat: 22.4975, lng: 88.3675 },
  { name: "19 Pally", category: "South Kolkata", lat: 22.5172, lng: 88.3512 },
  { name: "Kumartuli Preparation", category: "North Kolkata", lat: 22.5958, lng: 88.3618 },
  { name: "Pally Unnayan Samity", category: "South Kolkata", lat: 22.5015, lng: 88.3435 },
  { name: "Paschim Putiary", category: "South Kolkata", lat: 22.4830, lng: 88.3410 },
  { name: "Naskarpara Pally Unnayan Samity - Haridevpur", category: "South Kolkata", lat: 22.4775, lng: 88.3515 },
  { name: "Barisha Club", category: "South Kolkata", lat: 22.4875, lng: 88.3260 },
  { name: "Barisha Janakalyan Sangha", category: "South Kolkata", lat: 22.4845, lng: 88.3225 },
  { name: "68 Pally", category: "South Kolkata", lat: 22.5178, lng: 88.3498 },
  { name: "77 Palli", category: "South Kolkata", lat: 22.5162, lng: 88.3508 },
  { name: "Abasarika Club", category: "South Kolkata", lat: 22.5052, lng: 88.3588 },
  { name: "Bakul Bagan Sarbojanin", category: "South Kolkata", lat: 22.5280, lng: 88.3550 },
  { name: "Haridevpur Adarsha Samiti", category: "South Kolkata", lat: 22.4800, lng: 88.3480 },
  { name: "Hindustan Club", category: "South Kolkata", lat: 22.5190, lng: 88.3560 },
  { name: "Manoharpukur Youngs", category: "South Kolkata", lat: 22.5265, lng: 88.3570 },
  { name: "Padmapukur Youth Association", category: "South Kolkata", lat: 22.5305, lng: 88.3505 },
  { name: "Padmapukur Baroyari", category: "South Kolkata", lat: 22.5315, lng: 88.3515 },
  { name: "Park Circus - Uddipani", category: "South Kolkata", lat: 22.5440, lng: 88.3680 },
  { name: "Triangular Park Sarbojanin", category: "South Kolkata", lat: 22.5208, lng: 88.3592 },
  { name: "Sitalatala Kishore Sangha", category: "South Kolkata", lat: 22.4985, lng: 88.3400 },
  { name: "Prasanta Disha Sarbojanin", category: "South Kolkata", lat: 22.4855, lng: 88.3540 },
  { name: "Barisha Yubak Brinda", category: "South Kolkata", lat: 22.4865, lng: 88.3240 },
  { name: "Aikya Sammilani", category: "South Kolkata", lat: 22.5125, lng: 88.3485 },
  { name: "AC Block", category: "Salt Lake", lat: 22.5910, lng: 88.4060 },
  { name: "AB Block", category: "Salt Lake", lat: 22.5930, lng: 88.4040 },
  { name: "AA Block", category: "Salt Lake", lat: 22.5920, lng: 88.4020 },
  { name: "AK Block", category: "Salt Lake", lat: 22.5900, lng: 88.4090 },
  { name: "AE Block", category: "Salt Lake", lat: 22.5880, lng: 88.4050 },
  { name: "AJ Block", category: "Salt Lake", lat: 22.5860, lng: 88.4030 },
  { name: "AL Block", category: "Salt Lake", lat: 22.5800, lng: 88.4020 },
  { name: "BA Block", category: "Salt Lake", lat: 22.5950, lng: 88.4080 },
  { name: "BB Block", category: "Salt Lake", lat: 22.5960, lng: 88.4100 },
  { name: "BC Block", category: "Salt Lake", lat: 22.5940, lng: 88.4120 },
  { name: "BD Block", category: "Salt Lake", lat: 22.5920, lng: 88.4140 },
  { name: "BE Block", category: "Salt Lake", lat: 22.5900, lng: 88.4160 },
  { name: "BH Block", category: "Salt Lake", lat: 22.5860, lng: 88.4160 },
  { name: "BJ Block", category: "Salt Lake", lat: 22.5921, lng: 88.4110 },
  { name: "BK Block", category: "Salt Lake", lat: 22.5930, lng: 88.4130 },
  { name: "BL Block", category: "Salt Lake", lat: 22.5950, lng: 88.4150 },
  { name: "CB Block", category: "Salt Lake", lat: 22.5990, lng: 88.4070 },
  { name: "CD Block", category: "Salt Lake", lat: 22.5970, lng: 88.4030 },
  { name: "CE Block", category: "Salt Lake", lat: 22.5960, lng: 88.4010 },
  { name: "JC Block", category: "Salt Lake", lat: 22.5780, lng: 88.4100 },
  { name: "IB Block", category: "Salt Lake", lat: 22.5760, lng: 88.4080 },
  { name: "HB Block", category: "Salt Lake", lat: 22.5740, lng: 88.4040 },
  { name: "HA Block", category: "Salt Lake", lat: 22.5730, lng: 88.4020 },
  { name: "GC Block", category: "Salt Lake", lat: 22.5710, lng: 88.4140 },
  { name: "FE Block", category: "Salt Lake", lat: 22.5810, lng: 88.4160 },
  { name: "FC Block", category: "Salt Lake", alt: "Salt Lake", lat: 22.5830, lng: 88.4180 },
  { name: "EE Block", category: "Salt Lake", lat: 22.5850, lng: 88.4200 },
  { name: "EC Market", category: "Salt Lake", lat: 22.5870, lng: 88.4150 },
  { name: "DB Block", category: "Salt Lake", lat: 22.5895, lng: 88.4100 },
  { name: "DA Block", category: "Salt Lake", lat: 22.5905, lng: 88.4080 },
  { name: "CG Block", category: "Salt Lake", lat: 22.5770, lng: 88.4030 }
];

const rawPujos = [...batchOnePujos, ...batchTwoPujos, ...batchThreePujos];

// Remove duplicate items based on exact lowercase name matching
const uniquePujosMap = new Map();
rawPujos.forEach(pujo => {
  const cleanName = pujo.name.trim().toLowerCase();
  if (!uniquePujosMap.has(cleanName)) {
    uniquePujosMap.set(cleanName, pujo);
  }
});

const allPujos = Array.from(uniquePujosMap.values());

// Format the new data and combine with some sample metro/toilet data
const formattedPujos = allPujos.map((p, index) => ({
  id: `pujo-${index}`,
  type: 'pandal',
  name: p.name,
  category: p.category,
  lat: p.lat,
  lng: p.lng
}));

const locationData = [
  ...formattedPujos,
  { id: 'm1', type: 'metro', name: 'Dum Dum Metro', lat: 22.6225, lng: 88.3912 },
  { id: 'm2', type: 'metro', name: 'Sealdah Metro', lat: 22.5683, lng: 88.3714 },
  { id: 't1', type: 'toilet', name: 'Public Toilet', lat: 22.5710, lng: 88.3650 },
  { id: 'tr1', type: 'train', name: 'Howrah Junction', lat: 22.5839, lng: 88.3426 },
  { id: 'tr2', type: 'train', name: 'Bidhannagar Road Station', lat: 22.5938, lng: 88.3934 }
];

// Helper to create custom HTML markers
const createCustomIcon = (type, count) => {
  let bgColor = '#c0392b'; // deep red/coral for pandals
  if (type === 'metro') bgColor = '#2980b9'; // blue for metro
  if (type === 'toilet') bgColor = '#16a085'; // teal for toilet
  if (type === 'train') bgColor = '#8e44ad'; // purple for train

  const getEmoji = (t) => {
    if (t === 'pandal') return '⛩️';
    if (t === 'metro') return '🚇';
    if (t === 'toilet') return '🚻';
    if (t === 'train') return '🚆';
    return '📍';
  };

  const html = `
    <div class="custom-marker" style="background-color: ${bgColor};">
      <span>${getEmoji(type)}</span>
    </div>
  `;

  return L.divIcon({
    className: 'custom-marker-wrapper',
    html,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

// Component to handle recentering when clicking a marker
const RecenterMap = ({ center, zoom }) => {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      if (typeof map.setBearing === 'function') {
        try { map.setBearing(0); } catch(e){}
      }
      map.flyTo(center, zoom, { animate: true, duration: 1 });
    }
  }, [center, zoom, map]);
  return null;
};

const MapEvents = ({ onDrag }) => {
  const map = useMap();
  React.useEffect(() => {
    map.on('dragstart', onDrag);
    return () => map.off('dragstart', onDrag);
  }, [map, onDrag]);
  return null;
};

const CustomMapControls = ({ handleLocateClick, isFollowing }) => {
  const map = useMap();
  const [bearing, setBearing] = useState(0);
  const [isCompassActive, setIsCompassActive] = useState(false);

  React.useEffect(() => {
    const updateBearing = () => {
      if (typeof map.getBearing === 'function') {
        setBearing(map.getBearing());
      }
    };
    
    updateBearing();
    map.on('rotate', updateBearing);
    map.on('move', updateBearing);
    return () => {
      map.off('rotate', updateBearing);
      map.off('move', updateBearing);
    };
  }, [map]);

  React.useEffect(() => {
    let handler;
    if (isCompassActive) {
      handler = (e) => {
        let heading = null;
        if (e.webkitCompassHeading) {
          heading = e.webkitCompassHeading;
        } else if (e.alpha !== null) {
          heading = 360 - e.alpha;
        }
        if (heading !== null && typeof map.setBearing === 'function') {
          try { map.setBearing(heading); } catch(err){}
        }
      };
      
      if ('ondeviceorientationabsolute' in window) {
        window.addEventListener('deviceorientationabsolute', handler);
      } else {
        window.addEventListener('deviceorientation', handler);
      }
    }
    return () => {
      if (handler) {
        window.removeEventListener('deviceorientationabsolute', handler);
        window.removeEventListener('deviceorientation', handler);
      }
    };
  }, [isCompassActive, map]);

  React.useEffect(() => {
    const onDrag = () => setIsCompassActive(false);
    map.on('dragstart', onDrag);
    return () => map.off('dragstart', onDrag);
  }, [map]);

  const handleCompassClick = async (e) => {
    e.stopPropagation();
    
    if (isCompassActive) {
      setIsCompassActive(false);
      if (typeof map.setBearing === 'function') {
        try { map.setBearing(0); } catch(err){}
      }
      return;
    }

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permissionState = await DeviceOrientationEvent.requestPermission();
        if (permissionState === 'granted') {
          setIsCompassActive(true);
        }
      } catch (err) {
        console.error("Device orientation permission error", err);
      }
    } else {
      setIsCompassActive(true);
    }
  };
  
  return (
    <div className="map-action-buttons">
      <button className={`map-action-btn ${isCompassActive ? 'following-active' : ''}`} onClick={handleCompassClick}>
        <svg 
          width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ transform: `rotate(${-bearing}deg)`, transition: 'transform 0.1s ease-out' }}
        >
          <circle cx="12" cy="12" r="9" stroke="#4285F4" strokeWidth="2"/>
          <path d="M12 5 L14.5 12 L9.5 12 Z" fill="#EA4335"/>
          <path d="M12 19 L14.5 12 L9.5 12 Z" fill="#4285F4"/>
        </svg>
      </button>
      <button className={`map-action-btn ${isFollowing ? 'following-active' : ''}`} onClick={handleLocateClick}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="5" stroke={isFollowing ? "#1a73e8" : "#4285F4"} strokeWidth="2"/>
          <circle cx="12" cy="12" r="2" fill={isFollowing ? "#1a73e8" : "#4285F4"}/>
          <path d="M12 2 v3" stroke={isFollowing ? "#1a73e8" : "#4285F4"} strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 22 v-3" stroke={isFollowing ? "#1a73e8" : "#4285F4"} strokeWidth="2" strokeLinecap="round"/>
          <path d="M2 12 h3" stroke={isFollowing ? "#1a73e8" : "#4285F4"} strokeWidth="2" strokeLinecap="round"/>
          <path d="M22 12 h-3" stroke={isFollowing ? "#1a73e8" : "#4285F4"} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      <button className="map-action-btn" onClick={(e) => { e.stopPropagation(); map.zoomIn(); }}>
        <span style={{ fontSize: '28px', fontWeight: '500', paddingBottom: '4px' }} className="leading-none text-gray-700">+</span>
      </button>
      <button className="map-action-btn" onClick={(e) => { e.stopPropagation(); map.zoomOut(); }}>
        <span style={{ fontSize: '28px', fontWeight: '500', paddingBottom: '4px' }} className="leading-none text-gray-700">−</span>
      </button>
    </div>
  );
};

const LiveTracker = ({ isFollowing, position }) => {
  const map = useMap();
  React.useEffect(() => {
    if (isFollowing && position) {
      map.panTo(position, { animate: true, duration: 0.5 });
    }
  }, [isFollowing, position, map]);
  return null;
};

// Removed nearbyMockData as we calculate dynamically

const MapPage = ({ onClose }) => {
  const [activeFilter, setActiveFilter] = useState('all'); // all, pandal, metro, toilet
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isNearbyOpen, setIsNearbyOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mapCenter, setMapCenter] = useState([22.5726, 88.3639]); // Default Kolkata
  const [mapZoom, setMapZoom] = useState(12);
  const [activeTab, setActiveTab] = useState('map'); // 'map' or 'routes'
  const [isRouteMenuOpen, setIsRouteMenuOpen] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [userLocation, setUserLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [poorAccuracy, setPoorAccuracy] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const isFollowingRef = React.useRef(false);
  const watchIdRef = React.useRef(null);

  const [nearbyPandals, setNearbyPandals] = useState([]);

  // Calculate distance in km (Haversine formula)
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;  
    const dLon = (lon2 - lon1) * Math.PI / 180; 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c; 
  };

  useEffect(() => {
    const pandalsOnly = locationData.filter(loc => loc.type === 'pandal');
    if (userLocation) {
      const [lat, lng] = userLocation;
      const distances = pandalsOnly.map(p => {
        const distKm = getDistance(lat, lng, p.lat, p.lng);
        return {
          ...p,
          dist: distKm < 1 ? `${Math.round(distKm * 1000)} m away` : `${distKm.toFixed(1)} km away`,
          rawDist: distKm
        };
      });
      const within1km = distances.filter(p => p.rawDist <= 1);
      within1km.sort((a, b) => a.rawDist - b.rawDist);
      setNearbyPandals(within1km.slice(0, 5));
    } else {
      // Fallback state (shuffles randomly each time sheet is opened or location denied)
      const fallback = [...pandalsOnly]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5)
        .map(p => ({
          ...p,
          dist: "Distance unknown",
          rawDist: Infinity
        }));
      setNearbyPandals(fallback);
    }
  }, [userLocation, isNearbyOpen]);

  const setFollowingStatus = (status) => {
    setIsFollowing(status);
    isFollowingRef.current = status;
  };

  const startTracking = () => {
    setShowLocationPopup(false);
    if (navigator.geolocation) {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      
      // Center the map immediately on first lock without polluting the live watch loop
      navigator.geolocation.getCurrentPosition((position) => {
        setFollowingStatus(true);
        setMapCenter([position.coords.latitude, position.coords.longitude]);
        setMapZoom(17);
      }, () => {}, { enableHighAccuracy: true, timeout: 5000 });
      
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          
          if (accuracy > 100) {
            setPoorAccuracy(true);
          } else {
            setPoorAccuracy(false);
          }

          setUserLocation([latitude, longitude]);
          setIsTracking(true);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsTracking(false);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 }
      );
      watchIdRef.current = id;
    }
  };

  // --- Browser History Management for Modals ---
  React.useEffect(() => {
    if (isNearbyOpen) {
      window.history.pushState({ id: 'nearby' }, '');
    } else if (window.history.state?.id === 'nearby') {
      window.history.back();
    }
  }, [isNearbyOpen]);

  React.useEffect(() => {
    if (selectedLocation) {
      window.history.pushState({ id: 'preview' }, '');
    } else if (window.history.state?.id === 'preview') {
      window.history.back();
    }
  }, [selectedLocation]);

  React.useEffect(() => {
    if (showLocationPopup) {
      window.history.pushState({ id: 'location-popup' }, '');
    } else if (window.history.state?.id === 'location-popup') {
      window.history.back();
    }
  }, [showLocationPopup]);

  React.useEffect(() => {
    if (activeTab === 'routes') {
      window.history.pushState({ id: 'routes' }, '');
    } else if (window.history.state?.id === 'routes') {
      window.history.back();
    }
  }, [activeTab]);

  React.useEffect(() => {
    const handlePopState = (e) => {
      const stateId = e.state?.id;
      if (stateId !== 'nearby' && isNearbyOpen) setIsNearbyOpen(false);
      if (stateId !== 'preview' && selectedLocation) setSelectedLocation(null);
      if (stateId !== 'location-popup' && showLocationPopup) setShowLocationPopup(false);
      if (stateId !== 'routes' && activeTab === 'routes') setActiveTab('map');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isNearbyOpen, selectedLocation, showLocationPopup, activeTab]);
  // ---------------------------------------------

  React.useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const handleLocateClick = async (e) => {
    if (e) e.stopPropagation();
    
    if (isTracking && userLocation) {
      setFollowingStatus(true);
      setMapCenter([...userLocation]);
      setMapZoom(17);
      return;
    }

    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      if (result.state === 'granted') {
        startTracking();
      } else {
        setShowLocationPopup(true);
      }
    } catch (error) {
      setShowLocationPopup(true);
    }
  };

  const filteredData = locationData.filter(loc => activeFilter === 'all' || loc.type === activeFilter);
  
  const getRawDist = (loc) => {
    if (!userLocation) return Infinity;
    return getDistance(userLocation[0], userLocation[1], loc.lat, loc.lng);
  };

  const getDistString = (rawDist) => {
    if (rawDist === Infinity) return '';
    return rawDist < 1 ? `${Math.round(rawDist * 1000)} m away` : `${rawDist.toFixed(1)} km away`;
  };

  const nearbySearchList = React.useMemo(() => {
    const list = [...filteredData].map(loc => ({ ...loc, rawDist: getRawDist(loc) }));
    list.sort((a, b) => a.rawDist - b.rawDist);
    return list.slice(0, 5);
  }, [userLocation, filteredData]);

  const searchResults = React.useMemo(() => {
    if (searchQuery.trim() === '') return [];
    const query = searchQuery.toLowerCase().trim();
    const matches = filteredData
      .filter(loc => {
        const nameMatch = loc.name ? loc.name.toLowerCase().includes(query) : false;
        const catMatch = loc.category ? loc.category.toLowerCase().includes(query) : false;
        const typeMatch = loc.type ? loc.type.toLowerCase().includes(query) : false;
        return nameMatch || catMatch || typeMatch;
      })
      .map(loc => ({ ...loc, rawDist: getRawDist(loc) }));
    matches.sort((a, b) => a.rawDist - b.rawDist);
    return matches.slice(0, 5);
  }, [searchQuery, userLocation, filteredData]);

  const handleMarkerClick = (loc) => {
    setSelectedLocation(loc);
    setMapCenter([loc.lat, loc.lng]);
    setMapZoom(16);
  };

  const handleSearchSelect = (loc) => {
    setSearchQuery('');
    setIsSearchFocused(false);
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
    setSelectedLocation(loc);
    setMapCenter([loc.lat, loc.lng]);
    setMapZoom(16);
  };

  const getItemTheme = (type) => {
    switch(type) {
      case 'pandal': 
        return { 
          color: '#ef4444', 
          bg: '#fee2e2', 
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12h3v10h14V12h3L12 2zm0 2.8L18 10h-3v10H9V10H6l6-5.2z"/><path d="M11 2h2v4h-2z" /><path d="M13 2l4 2-4 2z" /></svg> 
        };
      case 'toilet': 
        return { 
          color: '#0d9488', 
          bg: '#ccfbf1', 
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 3h8v3H6zm11 6c0-1.7-1.3-3-3-3H4c-1.1 0-2 .9-2 2v6h12v-5z"/><path d="M10 17H5v5h5v-5zm7-7c0 3.3-2.7 6-6 6H7v2h4c4.4 0 8-3.6 8-8z"/></svg> 
        };
      case 'metro': 
        return { 
          color: '#2563eb', 
          bg: '#dbeafe', 
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 2 4 2.5 4 6v9.5C4 17.4 5.6 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.9 0 3.5-1.6 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.8 0-1.5-.7-1.5-1.5S6.7 14 7.5 14s1.5.7 1.5 1.5S8.3 17 7.5 17zm9 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm1.5-6H6V7h12v4z"/></svg> 
        };
      case 'train': 
        return { 
          color: '#9333ea', 
          bg: '#f3e8ff', 
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 2 4 2.5 4 6v9.5C4 17.4 5.6 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.9 0 3.5-1.6 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.8 0-1.5-.7-1.5-1.5S6.7 14 7.5 14s1.5.7 1.5 1.5S8.3 17 7.5 17zm9 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm1.5-6H6V7h12v4z"/></svg> 
        };
      default: 
        return { 
          color: '#6b7280', 
          bg: '#f3f4f6', 
          icon: <Search size={20} /> 
        };
    }
  };

  const renderSearchItem = (loc) => {
    const theme = getItemTheme(loc.type);
    const distStr = getDistString(loc.rawDist);
    const distFormatted = distStr ? distStr.replace(' away', '') : '';
    const categoryDisplay = loc.category ? `${loc.type.charAt(0).toUpperCase() + loc.type.slice(1)} • ${loc.category}` : loc.type;

    return (
      <div 
        key={loc.id} 
        className="px-5 py-3 flex items-center gap-4 cursor-pointer"
        style={{ borderBottom: '1px solid #f9fafb' }}
        onMouseDown={() => handleSearchSelect(loc)}
      >
        <div className="w-11 h-11 rounded-[12px] flex justify-center items-center shrink-0" style={{ backgroundColor: theme.bg, color: theme.color }}>
          {theme.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-bold truncate" style={{ color: '#111827' }}>{loc.name}</div>
          <div className="text-[12px] mt-0.5 truncate" style={{ color: '#6b7280', fontWeight: '500' }}>
            {categoryDisplay}
          </div>
        </div>
        {distFormatted && (
          <div className="flex flex-col items-end justify-center shrink-0 ml-2">
            <span className="text-[13px] font-bold leading-none" style={{ color: theme.color }}>{distFormatted}</span>
            <span className="text-[10px] text-gray-400 font-bold leading-none mt-[3px]">away</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`map-page-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Top Search & Filter Bar */}
      <div className="map-top-bar">
        <div className="map-search-container relative">
          <button onClick={onClose} className="map-back-btn">
            <ArrowLeft size={20} />
          </button>
          <div className="map-search-bar" style={{ display: 'flex', flex: 1, alignItems: 'center', background: 'white', borderRadius: '999px', padding: '12px 16px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <Search size={18} className="text-gray-400 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Search pandals, metro, toilets" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '15px', fontWeight: '500', color: '#333' }}
            />
            <button 
              onClick={() => searchQuery ? setSearchQuery('') : null} 
              className="text-gray-600 ml-2 shrink-0"
            >
              {searchQuery ? <X size={20} /> : <Mic size={20} />}
            </button>
          </div>
          
          {/* Search Dropdown */}
          {isSearchFocused && (
            <div 
              className="absolute top-full left-0 right-0 mt-2 z-[10001] pointer-events-auto flex flex-col overflow-y-auto hide-scrollbar"
              style={{
                backgroundColor: '#ffffff',
                opacity: 1,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                borderRadius: '24px',
                padding: '16px 0',
                maxHeight: '65vh'
              }}
            >
              {searchQuery.trim() === '' ? (
                // NEARBY LIST
                <>
                  <div className="px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400">NEARBY</div>
                  {nearbySearchList.length > 0 ? (
                    nearbySearchList.map(loc => renderSearchItem(loc))
                  ) : (
                    <div className="px-5 py-6 text-sm text-center" style={{ color: '#6b7280' }}>No nearby locations found.</div>
                  )}
                </>
              ) : (
                // BEST MATCHES LIST
                <>
                  <div className="px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400">BEST MATCHES</div>
                  {searchResults.length > 0 ? (
                    searchResults.map(loc => renderSearchItem(loc))
                  ) : (
                    <div className="px-5 py-6 flex flex-col items-center justify-center">
                      <div className="text-sm font-bold mb-1" style={{ color: '#111827' }}>No nearby matches.</div>
                      <div className="text-xs" style={{ color: '#6b7280' }}>Try searching for a different area.</div>
                      <button 
                        className="mt-4 px-5 py-2.5 rounded-full text-xs font-bold" 
                        style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                        onMouseDown={() => setSearchQuery('')}
                      >
                        Clear Search
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Filter Pills & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', paddingRight: '16px' }}>
          <div className="map-filter-scroll hide-scrollbar" style={{ flex: 1 }}>
            <button 
              onClick={() => setActiveFilter(activeFilter === 'pandal' ? 'all' : 'pandal')}
              className={`map-filter-pill ${activeFilter === 'pandal' ? 'active-pandal' : ''}`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 12h3v10h14V12h3L12 2zm0 2.8L18 10h-3v10H9V10H6l6-5.2z"/>
                <path d="M11 2h2v4h-2z" />
                <path d="M13 2l4 2-4 2z" />
              </svg>
              PANDALS
            </button>
            <button 
              onClick={() => setActiveFilter(activeFilter === 'toilet' ? 'all' : 'toilet')}
              className={`map-filter-pill ${activeFilter === 'toilet' ? 'active-toilet' : ''}`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 3h8v3H6zm11 6c0-1.7-1.3-3-3-3H4c-1.1 0-2 .9-2 2v6h12v-5z"/>
                <path d="M10 17H5v5h5v-5zm7-7c0 3.3-2.7 6-6 6H7v2h4c4.4 0 8-3.6 8-8z"/>
              </svg>
              TOILETS
            </button>
            <button 
              onClick={() => setActiveFilter(activeFilter === 'metro' ? 'all' : 'metro')}
              className={`map-filter-pill ${activeFilter === 'metro' ? 'active-metro' : ''}`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8 2 4 2.5 4 6v9.5C4 17.4 5.6 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.9 0 3.5-1.6 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.8 0-1.5-.7-1.5-1.5S6.7 14 7.5 14s1.5.7 1.5 1.5S8.3 17 7.5 17zm9 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm1.5-6H6V7h12v4z"/>
              </svg>
              METRO
            </button>
            <button 
              onClick={() => setActiveFilter(activeFilter === 'train' ? 'all' : 'train')}
              className={`map-filter-pill ${activeFilter === 'train' ? 'active-train' : ''}`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8 2 4 2.5 4 6v9.5C4 17.4 5.6 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.9 0 3.5-1.6 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.8 0-1.5-.7-1.5-1.5S6.7 14 7.5 14s1.5.7 1.5 1.5S8.3 17 7.5 17zm9 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm1.5-6H6V7h12v4z"/>
              </svg>
              TRAIN
            </button>
          </div>
          
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className="shrink-0"
            style={{
              marginLeft: '8px',
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
              color: isDarkMode ? '#f9fafb' : '#374151',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* Map Area */}
      <div className="map-wrapper">
        <MapContainer 
          center={[22.5726, 88.3639]} 
          zoom={12} 
          zoomControl={false}
          rotate={true}
          touchRotate={true}
          rotateControl={false}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            key={isDarkMode ? 'dark' : 'light'}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={isDarkMode 
              ? `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}`
              : `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}`
            }
            maxZoom={20}
          />
          
          <RecenterMap center={mapCenter} zoom={mapZoom} />
          <MapEvents onDrag={() => setFollowingStatus(false)} />
          <LiveTracker isFollowing={isFollowing} position={userLocation} />

          <CustomMapControls handleLocateClick={handleLocateClick} isFollowing={isFollowing} />

          {userLocation && (
            <Marker 
              position={userLocation}
              icon={L.divIcon({
                className: 'custom-user-marker',
                html: `<div class="user-location-dot"><div class="pulse"></div></div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              })}
              zIndexOffset={1000} // Keep it above other markers
            />
          )}

          <MarkerClusterGroup chunkedLoading>
            {filteredData.map(loc => (
              <Marker 
                key={loc.id} 
                position={[loc.lat, loc.lng]} 
                eventHandlers={{
                  click: () => handleMarkerClick(loc)
                }}
              />
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>

      {/* Bottom Floating Preview Card */}
      <div className={`map-preview-card ${selectedLocation ? 'active' : ''}`}>
        <div className="detailed-preview-card">
          <div className="preview-header">
            <div className="preview-icon-box">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#cc5550">
                <path d="M12 4 L14 8 H10 Z" />
                <path d="M6 9 h12 v3 H6 Z" />
                <path d="M7 12 h2 v8 H7 Z" />
                <path d="M15 12 h2 v8 H15 Z" />
              </svg>
            </div>
            <div className="preview-title-block">
              <h3 className="preview-title">{selectedLocation ? selectedLocation.name : 'Select a location'}</h3>
              <p className="preview-subtitle">Ballygunge Place, Ballygunge</p>
            </div>
            <button className="preview-close-btn" onClick={() => setSelectedLocation(null)}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div className="preview-status-row">
            <div className="preview-status-card rain">
              <div className="status-card-header">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="#6b7280" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg> Rain status
              </div>
              <div className="status-card-value">...</div>
              <div className="status-card-desc">No recent reports</div>
            </div>
            <div className="preview-status-card crowd">
              <div className="status-card-header">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="#6b7280" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Crowd level
              </div>
              <div className="status-card-value">...</div>
              <div className="status-card-desc">Waiting for an update</div>
            </div>
          </div>

          <div className="preview-update-card">
            <div className="flex gap-3">
              <div className="mt-1">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#d97706">
                  <path d="M11 17l-5-5 5-5v10z" />
                  <path d="M18 17l-5-5 5-5v10z" />
                </svg>
              </div>
              <div className="update-text-block">
                <div className="update-title">Visited recently?</div>
                <div className="update-desc">Help others — your update is valid for 30 minutes</div>
              </div>
            </div>
            <button className="update-btn">Update now ›</button>
          </div>

          <div className="preview-metro-info">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#2563eb">
              <path d="M12 2C8 2 4 5 4 9v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9c0-4-4-7-8-7zm0 2c3.3 0 6 2.2 6 5H6c0-2.8 2.7-5 6-5zm-3 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
              <path d="M6 19v3h2v-3H6zm10 0v3h2v-3h-2z" />
            </svg>
            <span className="metro-name">Jatin Das Park</span> • exit <span className="metro-gate">Gate 3</span> • 2.4 km walk
          </div>

          <div className="preview-actions">
            <button className="btn-navigate">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
              </svg>
              Navigate
            </button>
            <button className="btn-route">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Route
            </button>
          </div>
        </div>
      </div>

      {/* Poor GPS Warning */}
      {poorAccuracy && (
        <button 
          className="poor-gps-warning"
          onClick={(e) => { e.stopPropagation(); startTracking(); }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Poor GPS signal. Tap to force refresh.
        </button>
      )}

      {/* Nearby Floating Button */}
      <div className={`map-nearby-btn-container ${(!selectedLocation && !isNearbyOpen) ? 'active' : ''}`}>
        <button className="nearby-pill-btn" onClick={() => setIsNearbyOpen(true)}>
          <div className="nearby-icon-circle">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#cc5550">
              <path d="M12 4 L14 8 H10 Z" />
              <path d="M6 9 h12 v3 H6 Z" />
              <path d="M7 12 h2 v8 H7 Z" />
              <path d="M15 12 h2 v8 H15 Z" />
            </svg>
          </div>
          <div className="nearby-text-container">
            <div className="nearby-title">{userLocation ? `${nearbyPandals.length} pandals nearby` : "5 pandals nearby"}</div>
            <div className="nearby-subtitle">Tap any pin to preview</div>
          </div>
        </button>
      </div>

      {/* Nearby Overlay & Bottom Sheet */}
      <div className={`map-nearby-overlay ${isNearbyOpen ? 'open' : ''}`} onClick={() => setIsNearbyOpen(false)} />
      <div className={`map-nearby-sheet ${isNearbyOpen ? 'open' : ''}`}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center cursor-pointer" onClick={() => setIsNearbyOpen(false)}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 flex justify-center items-center">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#cc5550">
                <path d="M12 4 L14 8 H10 Z" />
                <path d="M6 9 h12 v3 H6 Z" />
                <path d="M7 12 h2 v8 H7 Z" />
                <path d="M15 12 h2 v8 H15 Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm m-0">{userLocation ? `${nearbyPandals.length} pandals nearby` : "5 pandals nearby"}</h3>
              <p className="text-gray-500 text-xs m-0">Tap a pandal to preview • + to add to route</p>
            </div>
          </div>
          <ChevronUp className="text-gray-400" />
        </div>
        <div className="p-0 flex flex-col overflow-y-auto">
          {userLocation && nearbyPandals.length === 0 ? (
            <div className="p-4 text-gray-500 text-sm">No pandals within 1 km.</div>
          ) : (
            nearbyPandals.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-red-50 flex justify-center items-center shrink-0">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="#cc5550">
                    <path d="M12 4 L14 8 H10 Z" />
                    <path d="M6 9 h12 v3 H6 Z" />
                    <path d="M7 12 h2 v8 H7 Z" />
                    <path d="M15 12 h2 v8 H15 Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm m-0 leading-tight">{item.name}</h4>
                  <p className="text-gray-500 text-xs m-0 mt-0.5">{item.dist} • {item.category}</p>
                </div>
                <button className="w-8 h-8 rounded-full border border-gray-200 flex justify-center items-center text-gray-600 hover:bg-gray-100 transition-colors shrink-0">
                  <Plus size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Routes View Overlay */}
      {activeTab === 'routes' && (
        <div className="routes-view-container">
          <div className="routes-header">
            <div>
              <h2 className="routes-header-title">Your route</h2>
              <p className="routes-header-subtitle">Tonight • 0 stops planned</p>
            </div>
            <div className="routes-menu-container">
              <button 
                className="routes-header-menu"
                onClick={() => setIsRouteMenuOpen(!isRouteMenuOpen)}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="12" cy="5" r="1"></circle>
                  <circle cx="12" cy="19" r="1"></circle>
                </svg>
              </button>
              
              {isRouteMenuOpen && (
                <div className="routes-dropdown-menu">
                  <button 
                    className="routes-dropdown-item"
                    onClick={() => {
                      // Add clear route logic here if needed in the future
                      setIsRouteMenuOpen(false);
                    }}
                  >
                    Clear route
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="routes-content">
            <div className="routes-empty-card">
              <div className="routes-empty-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="#cc5550" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11l19-9-9 19-2-8-8-2z" />
                </svg>
              </div>
              <h3 className="routes-empty-title">No stops yet</h3>
              <p className="routes-empty-desc">
                Tap any pandal, metro or toilet on the map and add it to plan your route.
              </p>
              <button className="routes-browse-btn" onClick={() => setActiveTab('map')}>
                Browse the map
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="map-bottom-nav">
        <div className="flex justify-around items-center h-full bg-white border-t border-gray-100 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
          <button 
            className="flex flex-col items-center justify-center w-full h-full" 
            style={{ color: activeTab === 'map' ? '#dc2626' : '#9ca3af' }}
            onClick={() => setActiveTab('map')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '4px' }}>
              <path d="M 3 21 L 21 21 L 17 13 L 7 13 Z" />
              <path d="M 8.5 13 L 12 21 L 15.5 13" />
              <path d="M12 2 C8.5 2 5.5 4.5 5.5 8 C5.5 12.5 12 17.5 12 17.5 C12 17.5 18.5 12.5 18.5 8 C18.5 4.5 15.5 2 12 2 Z" fill="#ffffff" />
              <circle cx="12" cy="8" r="2.5" />
            </svg>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '500' }}>Map</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center w-full h-full" 
            style={{ color: activeTab === 'routes' ? '#dc2626' : '#9ca3af' }}
            onClick={() => setActiveTab('routes')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" style={{ marginBottom: '4px' }}>
              <path d="M 7 2 C 4.24 2 2 4.24 2 7 C 2 11.5 7 16 7 16 C 7 16 12 11.5 12 7 C 12 4.24 9.76 2 7 2 Z M 7 9 C 5.9 9 5 8.1 5 7 C 5 5.9 5.9 5 7 5 C 8.1 5 9 5.9 9 7 C 9 8.1 8.1 9 7 9 Z" fill="currentColor" />
              <path d="M 17 8 C 14.24 8 12 10.24 12 13 C 12 17.5 17 22 17 22 C 17 22 22 17.5 22 13 C 22 10.24 19.76 8 17 8 Z M 17 15 C 15.9 15 15 14.1 15 13 C 15 11.9 15.9 11 17 11 C 18.1 11 19 11.9 19 13 C 19 14.1 18.1 15 17 15 Z" fill="currentColor" />
              <path d="M 11.5 6 L 16.5 6 C 17.6 6 18.2 6.8 17.5 7.7 L 6.5 16.3 C 5.8 17.2 6.4 18 7.5 18 L 12.5 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '500' }}>Routes</span>
          </button>
        </div>
      </div>

      {/* Location Request Popup */}
      {showLocationPopup && (
        <div className="location-popup-overlay" onClick={() => setShowLocationPopup(false)}>
          <div className="location-popup-card" onClick={e => e.stopPropagation()}>
            <button className="location-popup-close" onClick={() => setShowLocationPopup(false)}>
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="#71717a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 1L1 13M1 1l12 12" />
              </svg>
            </button>
            <div className="location-popup-icon-container">
              <div className="location-popup-icon-bg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#b91c1c">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
            </div>
            <h2 className="location-popup-title">Turn on location to find you</h2>
            <p className="location-popup-desc">
              Sharodiya needs your location to centre the map on where you are and show pandals near you.
            </p>
            <button className="location-popup-allow" onClick={startTracking}>
              Allow location
            </button>
            <button className="location-popup-deny" onClick={() => setShowLocationPopup(false)}>
              Not now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;
