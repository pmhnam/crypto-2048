const GameBoard = artifacts.require('GameBoard');

module.exports = async function (deployer) {
  await deployer.deploy(GameBoard);
};