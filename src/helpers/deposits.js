// Deposit logic.
// make backend listen for deposits made with the smart contract and update the database accordingly.

// const Web3 = require("web3");
// const { depositsAbi } = require("../constants/abis");


// export const initListener = async () => {
//     console.log("Listen to Events...");

//     const web3 = new Web3(
//         new Web3.providers.WebsocketProvider(
//             `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_KEY}`
//         )
//     );

//     const depositsContract = new web3.eth.Contract(
//         depositsAbi,
//         process.env.DEPOSITS_CONTRACT_ADDRESS
//     );

//     depositsContract.events.Deposit()
//         .on("data", async (event) => {
//             console.log(event);
//         })
//         .on("error", console.error);
// }