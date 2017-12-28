const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(timestamp, data, previousHash) {
        this.index = 0;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
    }

    // mineBlock(difficulty) {
    //     while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
    //         this.nonce++;
    //         this.hash = this.calculateHash();
    //     }

    //     console.log("Block mined: " + this.hash);
    // }
}

class Blockchain{
    constructor() {
        this.chain = [this.createGenesis()];
        // this.difficulty = 3;
    }

    createGenesis() {
        return new Block(0, "01/01/2017", "Genesis block", "0")
    }

    latestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock){
        newBlock.index = this.latestBlock().index + 1;
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        // newBlock.mineBlock(this.  difficulty);
        this.chain.push(newBlock);
    }

    checkValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.log("Error in 1 " + "index is " + i);
                console.log(currentBlock.hash);
                console.log(currentBlock.calculateHash());
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}


let jsChain = new Blockchain();
jsChain.addBlock(new Block("12/25/2017", {amount: 5}));
jsChain.addBlock(new Block("12/26/2017", {amount: 10}));


console.log(JSON.stringify(jsChain, null, 4));
console.log("Is blockchain valid? " + jsChain.checkValid());




// jsChain.chain[1].data = {amount: 100};
// jsChain.chain[1].hash = jsChain.chain[1].calculateHash();
// jsChain.chain[2].previousHash = jsChain.chain[1].hash;
// jsChain.chain[2].hash = jsChain.chain[2].calculateHash();

// console.log(JSON.stringify(jsChain, null, 4));
// console.log("Is blockchain valid? " + jsChain.checkValid());
// console.log("Your Blockchain is now tampered with")
