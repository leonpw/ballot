import { ethers } from "hardhat";

async function main() {

    const contractAddress = "0xe0943B596E5180e09C78c0daE8fF2a89F877dc2c";
    
    console.log("Getting ballot contract with address: " + contractAddress);
    
    const ballotFactory = await ethers.getContractFactory("Ballot");
    const ballotContract  = ballotFactory.attach(contractAddress);

    const winnerName = await ballotContract.winnerName();
 
    console.log("The winner: " + (ethers.utils.parseBytes32String(winnerName)));
   
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});