import { Injectable } from '@angular/core';
import Web3 from 'web3';
// import { Drizzle } from 'drizzle';
import { Subject, Observable } from 'rxjs';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';

declare global {
	interface Window { web3: any; }
}
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			},
			{
				"name": "time",
				"type": "uint256"
			},
			{
				"name": "date",
				"type": "string"
			}
		],
		"name": "grantPermission",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getPermissionsQueueData",
		"outputs": [
			{
				"components": [
					{
						"name": "provider_address",
						"type": "address"
					},
					{
						"name": "date",
						"type": "string"
					},
					{
						"name": "message",
						"type": "string"
					},
					{
						"name": "index",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "patient_address",
				"type": "address"
			}
		],
		"name": "getOtherPatientData",
		"outputs": [
			{
				"components": [
					{
						"name": "provider_address",
						"type": "address"
					},
					{
						"name": "date",
						"type": "string"
					},
					{
						"name": "medicine_name",
						"type": "string[]"
					},
					{
						"name": "quantity",
						"type": "uint256[]"
					},
					{
						"name": "index",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getPermissionsQueueLength",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "patient_address",
				"type": "address"
			},
			{
				"name": "d",
				"type": "string"
			},
			{
				"name": "s",
				"type": "string[]"
			},
			{
				"name": "u",
				"type": "uint256[]"
			}
		],
		"name": "setData",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "approveData",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "patient_address",
				"type": "address"
			},
			{
				"name": "date",
				"type": "string"
			},
			{
				"name": "message",
				"type": "string"
			}
		],
		"name": "askPermission",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "denyData",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllowedPermissionsQueueLength",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllowedPermissionsQueueData",
		"outputs": [
			{
				"components": [
					{
						"name": "provider_address",
						"type": "address"
					},
					{
						"name": "date",
						"type": "string"
					},
					{
						"name": "time",
						"type": "uint256"
					},
					{
						"name": "index",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "denyPermission",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getApprovalQueueLength",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getApprovalQueueData",
		"outputs": [
			{
				"components": [
					{
						"name": "provider_address",
						"type": "address"
					},
					{
						"name": "date",
						"type": "string"
					},
					{
						"name": "medicine_name",
						"type": "string[]"
					},
					{
						"name": "quantity",
						"type": "uint256[]"
					},
					{
						"name": "index",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getMyData",
		"outputs": [
			{
				"components": [
					{
						"name": "provider_address",
						"type": "address"
					},
					{
						"name": "date",
						"type": "string"
					},
					{
						"name": "medicine_name",
						"type": "string[]"
					},
					{
						"name": "quantity",
						"type": "uint256[]"
					},
					{
						"name": "index",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getMedicalDataHistoryLength",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
const address = '0x1493c54050a4ab7c0f07f4bb45b8C95636afE337';

@Injectable({
	providedIn: 'root'
})
export class MedicalDataService {
	web3: any;
	MedicalContract: any;
	patient_address: string;
	options: {};
	medicalHistoryDataSubject = new Subject<any>();
	approvalQueueDataSubject = new Subject<any>();
	permissionsQueueDataSubject = new Subject<any>();
	constructor() {
		this.web3 = new Web3('ws://localhost:8545');
		this.MedicalContract = new this.web3.eth.Contract(abi, address);
		this.patient_address = "0x9B59f65a147124E2e6E9edB6492302C1B84559bB";
		this.options = { from: this.patient_address, gas: 3000000 };
		// if (typeof window.web3 !== 'undefined') {
		// 	console.log('Current Provider');
		// 	console.log(window.web3.currentProvider);
		//   this.web3 = new Web3(window.web3.currentProvider);
		// //   this.web3.eth.defaultAccount = window.web3.eth.defaultAccount;
		// } else {
		// 	console.log('localhost');
		//   this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
		// }
		// console.log(this.web3);
		// let patient_address: string = "0x9B59f65a147124E2e6E9edB6492302C1B84559bB";
		// const options = { from: patient_address, gas: 3000000 };
		// for(let i=0;i<medicalData.length;i++) {
		// MedicalContract.methods.setData(medicalData[i].provider_address, medicalData[i].date, medicalData[i].medicine_names, medicalData[i].medicine_quantity).send(options).then(console.log("Data Added"));
		// }
		// const drizzleOptions = {
		// 	contracts: [
		// 		{
		// 			"contractName": "MedicalHistory",
		// 			"abi": abi
		// 		}
		// 	]
		// }
		// const drizzle = new Drizzle(drizzleOptions);
		// console.log(drizzle);
		// var state = drizzle.store.getState()
		// if (state.drizzleStatus.initialized) {
		// console.log('initialized');
		// console.log(drizzle.contracts.MedicalContract.methods.getData.cacheCall());
		// }
		// drizzle.contracts.MedicalHistory.methods.getData().call().then((result) => { this.newData = result; console.log("Before wait: " + this.newData) });
	}

	getMyData(): Observable<any> {
		this.MedicalContract.methods.getMyData().call().then((result) => {
			this.medicalHistoryDataSubject.next(result);
		});
		return this.medicalHistoryDataSubject.asObservable();
	}

	getApprovalQueueData(): Observable<any> {
		this.MedicalContract.methods.getApprovalQueueData().call().then((result) => {
			this.approvalQueueDataSubject.next(result);
		});
		return this.approvalQueueDataSubject.asObservable();
	}

	approveData(index) {
		this.MedicalContract.methods.approveData(index).send(this.options).then();
	}

	denyData(index) {
		this.MedicalContract.methods.denyData(index).send(this.options).then();
	}

	getPermissionsQueueData() {
		this.MedicalContract.methods.getPermissionsQueueData().call().then((result) => {
			this.permissionsQueueDataSubject.next(result);
		})
		return this.permissionsQueueDataSubject.asObservable();
	}

	grantPermission(index, time) {
		let date:any = new Date();
		date = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
		this.MedicalContract.methods.grantPermission(index, time, date).send(this.options).then();
	}

	denyPermission(index) {
		this.MedicalContract.methods.denyPermission(index).send(this.options).then();
	}
}
