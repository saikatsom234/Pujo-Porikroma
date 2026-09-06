import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { Search, Map as MapIcon, Route, ArrowLeft, Compass, LocateFixed, ChevronUp, Plus } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
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
  lat: p.lat,
  lng: p.lng
}));

const locationData = [
  ...formattedPujos,
  { id: 'm1', type: 'metro', name: 'Dum Dum Metro', lat: 22.6225, lng: 88.3912 },
  { id: 'm2', type: 'metro', name: 'Sealdah Metro', lat: 22.5683, lng: 88.3714 },
  { id: 't1', type: 'toilet', name: 'Public Toilet', lat: 22.5710, lng: 88.3650 }
];

// Helper to create custom HTML markers
const createCustomIcon = (type, count) => {
  let bgColor = '#c0392b'; // deep red/coral for pandals
  if (type === 'metro') bgColor = '#2980b9'; // blue for metro
  if (type === 'toilet') bgColor = '#16a085'; // teal for toilet

  const html = `
    <div class="custom-marker" style="background-color: ${bgColor};">
      <span>${type === 'pandal' ? '⛩️' : type === 'metro' ? '🚇' : '🚻'}</span>
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
      map.flyTo(center, zoom, { animate: true, duration: 1 });
    }
  }, [center, zoom, map]);
  return null;
};

const CustomMapControls = () => {
  const map = useMap();
  
  return (
    <div className="map-action-buttons">
      <button className="map-action-btn" onClick={(e) => { e.stopPropagation(); /* compass logic */ }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="#4285F4" strokeWidth="2"/>
          <path d="M12 5 L14.5 12 L9.5 12 Z" fill="#EA4335"/>
          <path d="M12 19 L14.5 12 L9.5 12 Z" fill="#4285F4"/>
        </svg>
      </button>
      <button className="map-action-btn" onClick={(e) => { e.stopPropagation(); /* locate logic */ }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="5" stroke="#4285F4" strokeWidth="2"/>
          <circle cx="12" cy="12" r="2" fill="#4285F4"/>
          <path d="M12 2 v3" stroke="#4285F4" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 22 v-3" stroke="#4285F4" strokeWidth="2" strokeLinecap="round"/>
          <path d="M2 12 h3" stroke="#4285F4" strokeWidth="2" strokeLinecap="round"/>
          <path d="M22 12 h-3" stroke="#4285F4" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      <button className="map-action-btn" onClick={(e) => { e.stopPropagation(); map.zoomIn(); }}>
        <span className="text-2xl leading-none text-gray-700 font-medium pb-1">+</span>
      </button>
      <button className="map-action-btn" onClick={(e) => { e.stopPropagation(); map.zoomOut(); }}>
        <span className="text-2xl leading-none text-gray-700 font-medium pb-1">−</span>
      </button>
    </div>
  );
};

const nearbyMockData = [
  { id: 1, name: "Ekdalia Evergreen Club", dist: "250 m away", loc: "Ekdalia, Ballygunge" },
  { id: 2, name: "Singhi Park Sarbojanin Durga Puja Committee", dist: "400 m away", loc: "Ballygunge" },
  { id: 3, name: "Hindusthan Park Sarbojanin Durgotsav", dist: "430 m away", loc: "Dhakuria, Hindustan Park, Gariahat" },
  { id: 4, name: "Gariahat Hindusthan Club", dist: "540 m away", loc: "Dover Terrace, Ballygunge" },
  { id: 5, name: "Ballygunge Pratisthan Durgabari", dist: "810 m away", loc: "Ballygunge Place, Ballygunge" }
];

const MapPage = ({ onClose }) => {
  const [activeFilter, setActiveFilter] = useState('all'); // all, pandal, metro, toilet
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isNearbyOpen, setIsNearbyOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mapCenter, setMapCenter] = useState([22.5726, 88.3639]); // Default Kolkata
  const [mapZoom, setMapZoom] = useState(12);

  const filteredData = locationData.filter(loc => activeFilter === 'all' || loc.type === activeFilter);
  
  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : locationData.filter(loc => loc.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);

  const handleMarkerClick = (loc) => {
    setSelectedLocation(loc);
    setMapCenter([loc.lat, loc.lng]);
    setMapZoom(16);
  };

  const handleSearchSelect = (loc) => {
    setSearchQuery(loc.name);
    setIsSearchFocused(false);
    setSelectedLocation(loc);
    setActiveFilter('all');
    setMapCenter([loc.lat, loc.lng]);
    setMapZoom(17);
  };

  return (
    <div className="map-page-container">
      {/* Top Search & Filter Bar */}
      <div className="map-top-bar">
        <div className="map-search-container relative">
          <button onClick={onClose} className="map-back-btn">
            <ArrowLeft size={20} />
          </button>
          <div className="map-search-bar">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search pandals, metro, toilets" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
          </div>
          
          {/* Search Dropdown */}
          {isSearchFocused && searchQuery && (
            <div className="absolute top-full left-[56px] right-0 mt-2 bg-white rounded-2xl shadow-xl overflow-hidden z-[10001] pointer-events-auto border border-gray-100">
              {searchResults.length > 0 ? (
                searchResults.map(loc => (
                  <div 
                    key={loc.id} 
                    className="px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 flex items-center gap-3 cursor-pointer"
                    onMouseDown={() => handleSearchSelect(loc)}
                  >
                    <Search size={14} className="text-gray-400 shrink-0" />
                    <div className="text-sm font-medium text-gray-700 truncate">{loc.name}</div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">No locations found</div>
              )}
            </div>
          )}
        </div>

        {/* Filter Pills */}
        <div className="map-filter-scroll hide-scrollbar">
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
      </div>

      {/* Map Area */}
      <div className="map-wrapper">
        <MapContainer 
          center={[22.5726, 88.3639]} 
          zoom={12} 
          zoomControl={false}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            maxZoom={20}
          />
          
          <RecenterMap center={mapCenter} zoom={mapZoom} />

          <CustomMapControls />

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
        <div className="preview-card-inner bg-white rounded-3xl p-4 shadow-xl mx-4 mb-20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex justify-center items-center text-red-500 text-xl">
            {selectedLocation?.type === 'pandal' ? '⛩️' : selectedLocation?.type === 'metro' ? '🚇' : '🚻'}
          </div>
          <div>
            <h3 className="font-bold text-gray-800 m-0">{selectedLocation ? selectedLocation.name : 'Select a location'}</h3>
            <p className="text-gray-500 text-sm m-0 mt-1">Tap any pin to preview</p>
          </div>
        </div>
      </div>

      {/* Nearby Floating Button */}
      <div className={`map-nearby-btn-container ${(!selectedLocation && !isNearbyOpen) ? 'active' : ''}`}>
        <button 
          className="bg-white rounded-[32px] p-2 pr-5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center gap-3 border border-gray-100" 
          onClick={() => setIsNearbyOpen(true)}
        >
          <div className="w-10 h-10 rounded-full bg-red-50 flex justify-center items-center">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#cc5550">
              <path d="M12 4 L14 8 H10 Z" />
              <path d="M6 9 h12 v3 H6 Z" />
              <path d="M7 12 h2 v8 H7 Z" />
              <path d="M15 12 h2 v8 H15 Z" />
            </svg>
          </div>
          <div className="text-left flex flex-col justify-center">
            <div className="font-bold text-gray-800 text-sm leading-tight">5 pandals nearby</div>
            <div className="text-gray-500 text-xs mt-0.5">Tap any pin to preview</div>
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
              <h3 className="font-bold text-gray-800 text-sm m-0">5 pandals nearby</h3>
              <p className="text-gray-500 text-xs m-0">Tap a pandal to preview • + to add to route</p>
            </div>
          </div>
          <ChevronUp className="text-gray-400" />
        </div>
        <div className="p-0 flex flex-col overflow-y-auto">
          {nearbyMockData.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
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
                <p className="text-gray-500 text-xs m-0 mt-0.5">{item.dist} • {item.loc}</p>
              </div>
              <button className="w-8 h-8 rounded-full border border-gray-200 flex justify-center items-center text-gray-600 hover:bg-gray-100 transition-colors shrink-0">
                <Plus size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="map-bottom-nav">
        <div className="flex justify-around items-center h-full bg-white border-t border-gray-100 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
          <button className="flex flex-col items-center justify-center w-full h-full text-red-600 font-medium">
            <MapIcon size={24} className="mb-1" />
            <span className="text-[10px] uppercase tracking-wider">Map</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-400 font-medium">
            <Route size={24} className="mb-1" />
            <span className="text-[10px] uppercase tracking-wider">Routes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
