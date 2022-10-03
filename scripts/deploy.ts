import { ethers } from "hardhat";

const PROPOSALS = ["Broccoli", "Bacon"];

function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
        bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
    }
    return bytes32Array;
}


async function main() {
    console.log("Deploying Ballot contract");
    console.log("Proposals: ");
    PROPOSALS.forEach((element, index) => {
        console.log(`Proposal N. ${index + 1}: ${element}`);
    });
    // TODO


    const ballotFactory = await ethers.getContractFactory("Ballot");
    const ballotContract = await ballotFactory.deploy(
        convertStringArrayToBytes32(PROPOSALS)
    );
    await ballotContract.deployed();

    for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index);
        const name = (ethers.utils.parseBytes32String(proposal.name));
        
        console.log({index, name, proposal});

    }

    const chairperson = await ballotContract.chairperson();
    console.log({chairperson});

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});