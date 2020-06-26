const Migrations = artifacts.require("MedicalHistory");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
