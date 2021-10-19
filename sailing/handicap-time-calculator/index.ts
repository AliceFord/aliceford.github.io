const pyNumbers = {
    "420": 1105,
    "2000": 1114,
    "29er": 903,
    "505": 903,
    "Albacore": 1040,
    "Blaze": 1033,
    "Comet": 1210,
    "Contender": 969,
    "Devoti D-One": 948,
    "Devoti D-Zero": 1029,
    "Enterprise": 1122,
    "Europe": 1141,
    "Finn": 1049,
    "Fireball": 952,
    "Firefly": 1172,
    "Gp14": 1130,
    "Graduate": 1132,
    "Hadron": 0,
    "Kestrel": 1038,
    "Lark": 1073,
    "Laser Full Rig": 1100,
    "Laser 4.7": 1208,
    "Laser Radial": 1147,
    "Lightning 368": 1162,
    "Megabyte": 1076,
    "Merlin-Rocket": 980,
    "Miracle": 1194,
    "Mirror": 1385,
    "Musto Skiff": 849,
    "National 12": 1064,
    "Ok": 1104,
    "Optimist": 1642,
    "Osprey": 930,
    "Phantom": 1004,
    "Rooster 8.1": 1045,
    "RS 100 8.4": 1004,
    "RS 100 10.2": 981,
    "RS 200": 1046,
    "RS 300": 970,
    "RS 400": 942,
    "RS 500": 966,
    "RS 600": 920,
    "RS 700": 845,
    "RS 800": 799,
    "RS Aero 5": 1136,
    "RS Aero 7": 1065,
    "RS Aero 9": 1014,
    "RS Feva XL": 1244,
    "RS Tera Pro": 1359,
    "RS Tera Sport": 1445,
    "RS Vareo": 1093,
    "RS Vision": 1137,
    "Scorpion": 1041,
    "Seafly": 1071,
    "Snipe": 1108,
    "Solo": 1142,
    "Solution": 1092,
    "Streaker": 1128,
    "Supernova": 1077,
    "Tasar": 1022,
    "Topper": 1365,
    "Wanderer": 1193,
    "Wayfarer": 1102,
    "B14": 860,
    "Byte CI": 1215,
    "Cadet": 1430,
    "Canoe International": 884,
    "Hornet": 955,
    "Laser Stratos": 1103,
    "Topper 4.2": 1409,
    "Flying Fifteen": 1021,
    "K1": 1064,
    "K6": 919,
    "A Class": 684,
    "Catapult": 898,
    "Challenger": 1173,
    "Dart 18": 832,
    "Formula 18": 670,
    "Hurricane 5.9 SX": 695,
    "Spitfire": 719,
    "Sprint 15": 926,
    "Sprint 15 Sport": 904,
    "RS Quba": 1260,
    "RS Quest": 1110,
    "RS Zest": 1260,
    "RS Neo": 1180,
    "2Win Sonic":881,
    "2Win Sonic Solo":867,
    "2Win Twincat 13 (without spinnaker)":1029,
    "2Win Twincat 15 Sport":845,
    "2Win Tyka":942,
    "A-Class Foils":667,
    "A-Classic (straight constant curve foils)":690,
    "AHPC Capricorn F18":678,
    "AHPC Taipan 4.9":739,
    "AHPC Taipan 4.9 Solo":757,
    "AHPC Taipan 4.9 Solo Spinnaker":708,
    "AHPC Taipan 4.9 Spinnaker":702,
    "Alado 18 Aileron":740,
    "Alado 18 F18":678,
    "Bim 16 Double Spinnaker":791,
    "Bim 16 Javelin 16 Solo Spinnaker":700,
    "Bim 16 Javelin Double Spinnaker":765,
    "Bim 18 Class A (>100kg)":740,
    "Bim 18 Double":729,
    "Bim 18 Double Sloop":716,
    "Bim 20":699,
    "Bim Javelin 18 Hightech":691,
    "Bim Javelin 2 (not 18HT)":712,
    "Bimare F16":708,
    "Bimare X16 Double Spinnaker":770,
    "Bimare X16 Solo":752,
    "Bimare X16 Solo Spinnaker":713,
    "Bimare X16FPlus":704,
    "Bimare X4 F18":678,
    "Blade 16 Double light (WS <123kg)":693,
    "Blade 16 Solo light (WS <119kg)":696,
    "C 4.8":881,
    "C 4.8 Major":856,
    "Cirrus 16 Q F 16":711,
    "Cirrus 16 Q Solo F16":726,
    "Cirrus B1 F18":678,
    "Cirrus Ecole":750,
    "Cirrus Energy Regate":759,
    "Cirrus Energy Regate Solo":780,
    "Cirrus Evolution":709,
    "Cirrus Evolution Solo":742,
    "Cirrus F18":678,
    "Condor 16":809,
    "Dart 16":890,
    "Dart 16 X Race Spinnaker":842,
    "Dart 18 Cat Boat":839,
    "Dart 18 Spinnaker":797,
    "Dart 20":750,
    "Dart 20 TSX":756,
    "Dart 20 TSX Spinnaker":728,
    "Dart 6000":769,
    "Dart Hawk F18":678,
    "Dart Sting Double":920,
    "Dart Sting Solo (with jib)":858,
    "Dart Sting Solo (without jib)":931,
    "Diam 3 F18":678,
    "Drake":700,
    "Falcon 16 Double light (WS <123kg)":693,
    "Falcon 16 Solo light (WS <119kg)":696,
    "Falcon F16 Cat Boat":720,
    "Falcon F16 Double":706,
    "Flying Phantom":612,
    "Flying Phantom Essentiel":647,
    "Flying Phantom Essentiel (with side racks)":643,
    "Formula 16 Double":703,
    "Formula 16 Solo":713,
    "Goodall C2 F18":678,
    "Goodall Viper Double":712,
    "Goodall Viper Foiling":678,
    "Goodall Viper Solo":723,
    "Gwynt 14":852,
    "Hawke Surfcat 7020":883,
    "Hawke Surfcat 7020 (main only)":1003,
    "Hobie 13":1082,
    "Hobie 14":967,
    "Hobie 14 Race (with jib)":877,
    "Hobie 15":892,
    "Hobie 16":819,
    "Hobie 16 Easy":891,
    "Hobie 16 Spinnaker":781,
    "Hobie 17 (with wings)":820,
    "Hobie 17 (without wings)":829,
    "Hobie 18":746,
    "Hobie 18 Formula":740,
    "Hobie 18 Formula 104":721,
    "Hobie 18 Formula Spinnaker":703,
    "Hobie 18 Magnum (with wings)":749,
    "Hobie 18 SX":759,
    "Hobie 20 Formula":732,
    "Hobie 20 Formula Spinnaker":690,
    "Hobie 21":677,
    "Hobie 21 Formula":642,
    "Hobie 21 Spinnaker":642,
    "Hobie 21 Spinnaker (3 Crew)":669,
    "Hobie Advance":1045,
    "Hobie Catsy":1435,
    "Hobie Dragoon Club":1010,
    "Hobie Dragoon Xtrem":961,
    "Hobie Fox F20":658,
    "Hobie FX One Cat Boat":739,
    "Hobie FX One Double":711,
    "Hobie FX Xtrem":712,
    "Hobie Getaway":850,
    "Hobie Max":773,
    "Hobie Max Youth":780,
    "Hobie Pacific (no spinnaker no wings)":778,
    "Hobie Pacific (spinnaker no wings)":744,
    "Hobie T1":996,
    "Hobie T1 Spinnaker":953,
    "Hobie Teddy":1086,
    "Hobie Tiger F18":678,
    "Hobie Twixxy":975,
    "Hobie Wave":1023,
    "Hobie Wildcat F18":678,
    "Hurricane 4.9":780,
    "Hurricane 5.5":714,
    "Hurricane 5.9":719,
    "Hurricane 5.9 Spinnaker":683,
    "Hurricane 5.9 Sport":695,
    "Hurricane 500":812,
    "Hurricane 500 Spinnaker":753,
    "IFLY 15 Double":824,
    "IFLY 15 Double (with code F) ":794,
    "IFLY 15 Solo":767,
    "IFLY 15 Solo (with code F)":740,
    "KL 15.5 (SL 15.5)":838,
    "KL 16":799,
    "KL 17 Power":780,
    "KL 17 Regate":801,
    "KL 17 Regate Spinnaker":764,
    "KL 17.5 Tonic (without spinnaker)":814,
    "KL 18 Regate":746,
    "KL Booster":772,
    "KL Phoenix F18":678,
    "M by Erplast":1026,
    "M Race by Erplast":963,
    "Magic F18":678,
    "Mattia 14":1012,
    "Mattia 16":851,
    "Mattia 17":709,
    "Mattia 18 (104)":762,
    "Mattia 18 (104) Spinnaker":724,
    "Mattia 18 F18":678,
    "Mattia 18 Raid Spinnaker":696,
    "Mattia 20":712,
    "Mattia 20 Sloop":684,
    "Mattia 20 Spinnaker":701,
    "Mattia 20 Venti":693,
    "Mattia Declic":836,
    "Mattia Esse":742,
    "Mattia Esse Solo":814,
    "Mattia Esse Sport":710,
    "Mattia Esse Sport Solo":742,
    "Mattia Flash F18":678,
    "Mattia Smile":777,
    "Mattia Smile Sport":749,
    "Miracle 20":692,
    "Miracle 20 (without spinnaker)":730,
    "Mystere 2000 F20":673,
    "Mystere 5.0":819,
    "Mystere 5.0 Xl":782,
    "Mystere 5.5 Fun":751,
    "Mystere 5.5 Master":727,
    "Mystere 5.5 Master Spinnaker":694,
    "Mystere 6.0":676,
    "Mystere Twister F18":678,
    "Nacra 15":749,
    "Nacra 15 FCS":734,
    "Nacra 15 One":749,
    "Nacra 17 C foils":678,
    "Nacra 17 Olympic Class full foiler":666,
    "Nacra 18 FCS":657,
    "Nacra 18m2":746,
    "Nacra 20 One Design":658,
    "Nacra 4.5":873,
    "Nacra 4.5 Solo":909,
    "Nacra 460":874,
    "Nacra 460 Solo":897,
    "Nacra 460 Solo Spinnaker":844,
    "Nacra 460 Sport":827,
    "Nacra 5.0 Cat Boat":861,
    "Nacra 5.0 Double":797,
    "Nacra 5.0 Double Spinnaker":766,
    "Nacra 5.2":767,
    "Nacra 5.2 Spinnaker":734,
    "Nacra 5.5 Raid":744,
    "Nacra 5.5 Raid Spinnaker":706,
    "Nacra 5.5 SL":730,
    "Nacra 5.5 SL Spinnaker":698,
    "Nacra 5.7 Race":767,
    "Nacra 5.7 Race Spinnaker":738,
    "Nacra 5.8 Spinnaker":694,
    "Nacra 500 Double":801,
    "Nacra 500 Solo":843,
    "Nacra 500 Solo Spinnaker":793,
    "Nacra 500 Sport Spinnaker":761,
    "Nacra 570 (without spinnaker)":748,
    "Nacra 570 Sport Spinnaker":711,
    "Nacra 580 (without spinnaker)":727,
    "Nacra 580 Sport Spinnaker":689,
    "Nacra 6.0 Raid Spinnaker":685,
    "Nacra 6.0 SE Spinnaker":667,
    "Nacra 6.0 Spinnaker":676,
    "Nacra Blast":804,
    "Nacra F16 Double":711,
    "Nacra F16 Double curved foils":697,
    "Nacra F16 One ":724,
    "Nacra F16 One curved foils":709,
    "Nacra F17 Sloop":712,
    "Nacra F17 Solo":732,
    "Nacra F18":678,
    "Nacra F20 Carbon":604,
    "Nacra F20 Carbon FCS":589,
    "Nacra Infusion F18":678,
    "Nacra Inter 17 Xl Solo":807,
    "Nacra Inter 17 Xl Solo Spinnaker":754,
    "Nacra Inter 18 F18":678,
    "Nacra Inter 20 F20":660,
    "New Cat 14":960,
    "New Cat 14 Spinnaker":919,
    "New Cat F1":976,
    "New Cat F1 Spinnaker":933,
    "New Cat F2":1005,
    "New Cat Swing":838,
    "New Marine 16 Swing Cat Boat":850,
    "New Marine 16 Swing Double":812,
    "Paper Tiger":909,
    "Prindle 15":904,
    "Prindle 16":850,
    "Prindle 18":786,
    "Prindle 18-2":746,
    "Prindle 18-2 Spinnaker":714,
    "Prindle 19":728,
    "Prindle 19 Pacer":740,
    "Prindle 19 Pacer Spinnaker":692,
    "Prindle 19 Spinnaker":688,
    "Prindle Play Cat":887,
    "Raptor F16":699,
    "RS Cat 14 XL Spinnaker":960,
    "RS Cat 16 Club":937,
    "RS Cat 16 S":919,
    "RS Cat 16 XL":873,
    "S9 Stunt Solo":761,
    "Shadow":765,
    "Shadow X":758,
    "Shearwater":860,
    "Shearwater Spinnaker":809,
    "Shockwave F18":678,
    "SL 15.5 (KL15.5)":838,
    "SL 16":774,
    "SL 5.2":741,
    "Spitfire S":708,
    "Spitfire Solo (without jib)":738,
    "Sprint 15 Cat Boat":961,
    "Sprint 15 DX":839,
    "Sprint 15 GTI":956,
    "Sprint 15 Sport Solo":872,
    "Stealth F16 Double":692,
    "Stealth F16 Solo":695,
    "Stingray 5.5":704,
    "Supercat 15 Double":789,
    "Supercat 15 Solo":835,
    "Supercat 17":739,
    "Supercat 19":715,
    "Supercat 20":666,
    "Supercat 20 (tall rig)":643,
    "Thundercat 18":739,
    "Tomahawk F20":679,
    "Topaz 14C":984,
    "Topaz 14CX Spinnaker":940,
    "Topaz 14Xtreme":875,
    "Topaz 16C":899,
    "Topaz 16CX":856,
    "Topaz 16S":948,
    "Topaz 16S Spinnaker":896,
    "Topcat 4.5 Solo":843,
    "Topcat Chico":1201,
    "Topcat F1":932,
    "Topcat F2":889,
    "Topcat K1 Classic":791,
    "Topcat K1 Regatta Spinnaker":713,
    "Topcat K1 Streamcut":745,
    "Topcat K2 Classic":810,
    "Topcat K2 Spinnaker":750,
    "Topcat K2 Streamcut Regatta":783,
    "Topcat K2X Classic":806,
    "Topcat K2X Regatta Gennaker":744,
    "Topcat K2X Streamcut":779,
    "Topcat K3 Classic":850,
    "Topcat K3 Regatta Spinnaker (no jib)":785,
    "Topcat K3 Streamcut":823,
    "Topcat K3X Solo Regatta (with gennaker DS)":755,
    "Topcat K3X Solo Streamcut Jib Spinnaker":720,
    "Topcat K4X (with reacher)":854,
    "Topcat K4X Classic (with jib)":923,
    "Topcat K4X Classic Solo":915,
    "Topcat K4x Streamcut (with jib)":891,
    "Topcat Spifire 2.3":767,
    "Topcat Spitfire 2.5":763,
    "Tornado":647,
    "Tornado 24m2 Spinnaker":666,
    "Tornado Classic":709,
    "Tropic GTI":780,
    "Tropic GTI Spinnaker":745,
    "Unicorn":805,
    "Ventilo 18":713,
    "Ventilo 18 HT":691,
    "Ventilo 609":660,
    "Ventilo M3 Cat Boat Spinnaker":673,
    "Ventilo Quickie":700,
    "Ventilo Zippo":729,
    "Warp 18":782,
    "Warp 18 Spinnaker":745,
    "Whisper":649
}

const classInput = document.getElementById("inputClass");

var entries = Object.entries(pyNumbers);
entries.sort((a, b) => a[0] === b[0] ? 0 : a[0] < b[0] ? -1 : 1);
entries.forEach(boat => {
    var option = document.createElement("option");
    option.innerHTML = boat[0];
    classInput.appendChild(option);
});

var form = document.getElementById("submit-boat-form");

const tableBody = <HTMLInputElement>document.getElementById("results-table-body");
const boatClassInput = <HTMLInputElement>document.getElementById("inputClass");
const boatNumberInput = <HTMLInputElement>document.getElementById("inputBoatNumber");
const boatNameInput = <HTMLInputElement>document.getElementById("inputBoatName");
const boatTimeInput = <HTMLInputElement>document.getElementById("inputTime");

function formattedTimeToMS(time: String) {
    let outputTime = 0;
    outputTime += Number.parseInt(time.substr(0, 2)) * 3.6e6;
    outputTime += Number.parseInt(time.substr(3, 2)) * 60000;
    outputTime += Number.parseInt(time.substr(6, 2)) * 1000;
    outputTime += Number.parseInt(time.substr(9, 3));
    return outputTime;
}

function msToFormattedTime(time: number) {
    let output = "";
    output += (time % 3.6e6).toString();
    console.log(output)
    time = Math.ceil(time / 3.6e6);
    output += ":";
    
    output += (time % 60000).toString();
    time = Math.ceil(time / 60000);
    output += ":";

    output += (time % 1000).toString();
    time = Math.ceil(time / 1000);
    output += ".";

    output += time.toString();

    return output;
}

function submitBoat(event) {
    event.preventDefault();
    var row = document.createElement("tr");

    let boatClass = document.createElement("td");
    let boatNum = document.createElement("td");
    let boatName = document.createElement("td");
    let pyNumber = document.createElement("td");
    let boatTime = document.createElement("td");
    let adjustedTime = document.createElement("td");

    boatClass.innerHTML = boatClassInput.value;
    boatNum.innerHTML = boatNumberInput.value;
    boatName.innerHTML = boatNameInput.value;
    pyNumber.innerHTML = pyNumbers[boatClassInput.value];
    boatTime.innerHTML = boatTimeInput.value;
    console.log(msToFormattedTime(Math.floor(formattedTimeToMS(boatTimeInput.value)))); //  / pyNumbers[boatClassInput.value]
    adjustedTime.innerHTML = boatTimeInput.value;
    // adjustedTime.value = "MS";

    row.appendChild(boatClass);
    row.appendChild(boatNum);
    row.appendChild(boatName);
    row.appendChild(pyNumber);
    row.appendChild(boatTime);
    row.appendChild(adjustedTime);

    tableBody.appendChild(row);
    console.log("boat");
}

form.addEventListener('submit', submitBoat);
