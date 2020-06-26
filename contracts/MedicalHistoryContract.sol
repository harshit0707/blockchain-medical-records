pragma solidity ^0.5.4;
pragma experimental ABIEncoderV2;

contract MedicalHistory {
    struct medicalData {
        address provider_address;
        string date;
        string[] medicine_name;
        uint[] quantity;
        uint index;
    }
    
    struct permissionData {
        address provider_address;
        string date;
        string message;
        uint index;
    }
    
    struct allowedPermissions {
        address provider_address;
        string date;
        uint time;
        uint index;
    }

    mapping (address=>medicalData[]) medicalDataHistory;

    mapping(address => medicalData[]) approvalQueue;
    
    mapping(address => permissionData[]) permissionsQueue;
    
    mapping(address => allowedPermissions[]) allowedPermissionsQueue;

    function getMedicalDataHistoryLength() public view returns(uint) {
        uint length = 0;
        uint dataLength = medicalDataHistory[msg.sender].length;
        for(uint i=0; i<dataLength; i++) {
            if(medicalDataHistory[msg.sender][i].index == 0) {
                continue;
            }
            length++;
        }
        return length;
    }
    
    function getApprovalQueueLength() public view returns(uint) {
        uint length = 0;
        uint dataLength = approvalQueue[msg.sender].length;
        for(uint i=0; i<dataLength; i++) {
            if(approvalQueue[msg.sender][i].index == 0) {
                continue;
            }
            length++;
        }
        return length;
    }
    
    function getPermissionsQueueLength() public view returns(uint) {
        uint length = 0;
        uint dataLength = permissionsQueue[msg.sender].length;
        for(uint i=0; i<dataLength; i++) {
            if(permissionsQueue[msg.sender][i].index == 0) {
                continue;
            }
            length++;
        }
        return length;
    }
    
    function getAllowedPermissionsQueueLength() public view returns(uint) {
        uint length = 0;
        uint dataLength = allowedPermissionsQueue[msg.sender].length;
        for(uint i=0; i<dataLength; i++) {
            if(allowedPermissionsQueue[msg.sender][i].index == 0) {
                continue;
            }
            length++;
        }
        return length;
    }

    function getMyData() public view returns(medicalData[] memory) {
        return medicalDataHistory[msg.sender];
    }

    function getOtherPatientData(address patient_address) public view returns(medicalData[] memory) {
        uint flag = 0;
        uint length = allowedPermissionsQueue[patient_address].length;
        for(uint i=0; i<length; i++) {
            if(allowedPermissionsQueue[patient_address][i].provider_address == msg.sender) {
                if(allowedPermissionsQueue[patient_address][i].time > now) {
                    flag = 1;
                }
                break;
            }
        }
        require(flag==1);
        return medicalDataHistory[patient_address];
    }

    function setData(address patient_address,string memory d, string[] memory s, uint[] memory u) public {
        medicalData memory m = medicalData(msg.sender, d, s, u, approvalQueue[patient_address].length + 1);
        approvalQueue[patient_address].push(m);
    }
    
    function getApprovalQueueData() public view returns(medicalData[] memory) {
        return approvalQueue[msg.sender];
    }
    
    function approveData(uint index) public {
        uint dataLength = approvalQueue[msg.sender].length;
        for(uint i=0; i<dataLength; i++) {
            if(approvalQueue[msg.sender][i].index == index) {
                index = i;
                break;
            }
        }
        medicalData memory m = approvalQueue[msg.sender][index];
        medicalDataHistory[msg.sender].push(m);
        delete approvalQueue[msg.sender][index];
    }

    function denyData(uint index) public {
        uint dataLength = approvalQueue[msg.sender].length;
        for(uint i=0; i<dataLength; i++) {
            if(approvalQueue[msg.sender][i].index == index) {
                index = i;
                break;
            }
        }
        delete approvalQueue[msg.sender][index];
    }
    
    function getPermissionsQueueData() public view returns(permissionData[] memory) {
        return permissionsQueue[msg.sender];
    }
    
    function getAllowedPermissionsQueueData() public view returns(allowedPermissions[] memory) {
        return allowedPermissionsQueue[msg.sender];
    }
    
    function askPermission(address patient_address, string memory date, string memory message) public {
        permissionData memory p = permissionData(msg.sender, date, message, permissionsQueue[patient_address].length + 1);
        permissionsQueue[patient_address].push(p);
    }
    
    function grantPermission(uint index, uint time, string memory date) public {
        uint pLength = permissionsQueue[msg.sender].length;
        for(uint i=0; i<pLength; i++) {
            if(permissionsQueue[msg.sender][i].index == index) {
                index = i;
                break;
            }
        }
        address provider_address = permissionsQueue[msg.sender][index].provider_address;
        uint apLength = allowedPermissionsQueue[msg.sender].length;
        for(uint i=0; i<apLength; i++) {
            if(allowedPermissionsQueue[msg.sender][i].provider_address == provider_address) {
                allowedPermissionsQueue[msg.sender][i].time = now + time;
                delete permissionsQueue[msg.sender][index];
                return;
             }
        }
        allowedPermissions memory ap = allowedPermissions(provider_address, date, time, allowedPermissionsQueue[msg.sender].length);
        allowedPermissionsQueue[msg.sender].push(ap);
        delete permissionsQueue[msg.sender][index];
    }

    function denyPermission(uint index) public {
    uint dataLength = permissionsQueue[msg.sender].length;
        for(uint i=0; i<dataLength; i++) {
            if(permissionsQueue[msg.sender][i].index == index) {
                index = i;
                break;
            }
        }
        delete permissionsQueue[msg.sender][index];
    }
}