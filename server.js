const express = require("express");
const app = express();
const Web3 = require("web3");
const gameContract = require("./build/contracts/GameBoard.json");
const web3 = new Web3(
  new Web3.providers.HttpProvider("http://localhost:8545")
);
const contractAddress = "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"; // Address of deployed contract

const gameBoard = new web3.eth.Contract(
  gameContract.abi,
  contractAddress,
  { gasLimit: "1000000" }
);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')
app.set('views', __dirname + '/src/views')

app.get("/", async (req, res) => {
  let address = ''
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);

  // const board = await gameBoard.methods.getBoard().call()
  // const score = await gameBoard.methods.getScore().call()
  // console.log(board);
  res.render('index');
});

app.post("/move", async (req, res) => {
  const direction = req.body.direction;
  const accounts = await web3.eth.getAccounts();
  const result = await gameBoard.methods[direction]().send({
    from: accounts[0],
  });
  const board =await gameBoard.methods.getBoard().call().then((board) => {
    return board
  })
  const score =await gameBoard.methods.getScore().call().then((score) => {
    return score
  })
  console.log(board);
  res.send({...result, board, score});
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
