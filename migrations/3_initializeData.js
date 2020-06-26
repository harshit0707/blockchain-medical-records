// let MyContract;MedicalHistory.deployed().then((instance) => {MyContract = instance;var address = '0xB50Bf904016a2f3a943b7e3828cED484666FFa64';var date = '01-01-2018';var name = ["Codeine", "Acetaminophen", "Adderall", "Hydrochlorothiazide", "Trazodone", "Xanax"];var quantity = [10, 10, 20, 20, 10, 5];MyContract.setData(address, date, name, quantity).then((result) => {MyContract.getData().then((response) => {console.log(response);});});});
// const medicalData = [
// 	{ provider_address: '0xB50Bf904016a2f3a943b7e3828cED484666FFa64', date: '01-01-2018', medicine_names: ["Codeine", "Acetaminophen", "Adderall", "Hydrochlorothiazide", "Trazodone", "Xanax"], medicine_quantity: [10, 10, 20, 20, 10, 5] },
// 	{ provider_address: '0x484ec9eD02B0b2476eBB1BB762ddDA3dC9c1D14B', date: '02-03-2018', medicine_names: ["Gabapentin", "Codeine", "Hydrochlorothiazide", "Wellbutrin"], medicine_quantity: [10, 50, 20, 20] },
// 	{ provider_address: '0x484ec9eD02B0b2476eBB1BB762ddDA3dC9c1D14B', date: '03-04-2018', medicine_names: ["Loratadine", "Acetaminophen", "Wellbutrin"], medicine_quantity: [20, 20, 20] },
// 	{ provider_address: '0x3f81d9f113C4aA53Eaa3932E66EF107A540196cc', date: '07-07-2018', medicine_names: ["Metoprolol", "Adderall", "Lisinopril", "Trazodone"], medicine_quantity: [30, 30, 30, 30] },
// 	{ provider_address: '0x409F058def5D554f854F38258c2d6Bb110aCe28B', date: '15-08-2018', medicine_names: ["Omeprazole", "Zoloft", "Doxycycline", "Wellbutrin"], medicine_quantity: [10, 10, 10, 10] },
// 	{ provider_address: '0xB50Bf904016a2f3a943b7e3828cED484666FFa64', date: '16-09-2018', medicine_names: ["Omeprazole", "Ibuprofen", "Wellbutrin"], medicine_quantity: [15, 20, 30] },
// 	{ provider_address: '0xB50Bf904016a2f3a943b7e3828cED484666FFa64', date: '03-11-2018', medicine_names: ["Codeine", "Gabapentin", "Ibuprofen"], medicine_quantity: [50, 50, 50] },
// 	{ provider_address: '0x409F058def5D554f854F38258c2d6Bb110aCe28B', date: '03-12-2018', medicine_names: ["Adderall", "Zoloft", "Cymbalta", "Hydrochlorothiazide"], medicine_quantity: [10, 10, 10, 10] },
// 	{ provider_address: '0x409F058def5D554f854F38258c2d6Bb110aCe28B', date: '01-01-2019', medicine_names: ["Metoprolol", "Lisinopril", "Zoloft", "Prednisone"], medicine_quantity: [10, 20, 10, 20] },
// 	{ provider_address: '0x409F058def5D554f854F38258c2d6Bb110aCe28B', date: '02-01-2019', medicine_names: ["Acetaminophen", "Loratadine", "Xanax", "Wellbutrin"], medicine_quantity: [20, 30, 30, 20] },
// 	{ provider_address: '0x3f81d9f113C4aA53Eaa3932E66EF107A540196cc', date: '03-01-2019', medicine_names: ["Meloxicam", "Prednisone", "Doxycycline", "Wellbutrin"], medicine_quantity: [10, 20, 30, 40] },
// 	{ provider_address: '0x3f81d9f113C4aA53Eaa3932E66EF107A540196cc', date: '04-01-2019', medicine_names: ["Prednisone", "Lisinopril", "Xanax", "Wellbutrin"], medicine_quantity: [10, 10, 20, 20] },
// 	{ provider_address: '0x484ec9eD02B0b2476eBB1BB762ddDA3dC9c1D14B', date: '03-02-2019', medicine_names: ["Meloxicam", "Loratadine", "Omeprazole"], medicine_quantity: [20, 20, 20] },
// 	{ provider_address: '0xeef17fD0A023cDf26f96A2574361b9787534Bd72', date: '04-02-2019', medicine_names: ["Lisinopril", "Codeine", "Metoprolol", "Trazodone", "Xanax"], medicine_quantity: [100, 100, 200, 200, 150] },
// 	{ provider_address: '0xeef17fD0A023cDf26f96A2574361b9787534Bd72', date: '05-02-2019', medicine_names: ["Gabapentin", "Wellbutrin", "Meloxicam"], medicine_quantity: [60, 20, 20] },
// 	{ provider_address: '0xeef17fD0A023cDf26f96A2574361b9787534Bd72', date: '06-02-2019', medicine_names: ["Zoloft", "Prednisone", "Cymbalta", "Doxycycline"], medicine_quantity: [30, 20, 35, 45] },
// 	{ provider_address: '0xB50Bf904016a2f3a943b7e3828cED484666FFa64', date: '07-02-2019', medicine_names: ["Prednisone", "Cymbalta", "Doxycycline"], medicine_quantity: [15, 15, 30] },
// 	{ provider_address: '0x409F058def5D554f854F38258c2d6Bb110aCe28B', date: '08-02-2019', medicine_names: ["Ibuprofen", "Metoprolol", "Trazodone"], medicine_quantity: [10, 10, 20] },
// 	{ provider_address: '0x484ec9eD02B0b2476eBB1BB762ddDA3dC9c1D14B', date: '28-02-2019', medicine_names: ["Acetaminophen", "Ibuprofen", "Cymbalta", "Trazodone"], medicine_quantity: [10, 10, 20, 30] },
// ];
// let cmd = 	{ provider_address: '0x484ec9eD02B0b2476eBB1BB762ddDA3dC9c1D14B', date: '02-03-2018', medicine_names: ["Gabapentin", "Codeine", "Hydrochlorothiazide", "Wellbutrin"], medicine_quantity: [10, 50, 20, 20] };

// let MyContract;
// MedicalHistory.deployed().then((instance) => {MyContract = instance;var address = cmd[0];var date = cmd[1];var name = cmd[2];var quantity = cmd[3];MyContract.setData(address, date, name, quantity).then((result) => {MyContract.getData().then((response) => {console.log(response);});});});
