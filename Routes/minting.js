
const express = require ('express');
const router  = express.Router();

const testContract = require('../Models/ABIs/TestContractABI.json');
var Web3 = require('web3');

require ('dotenv/config');

let web3        = new Web3(new Web3.providers.HttpProvider(process.env.GANACHE_TEST_URL));
let contract    = new web3.eth.Contract(testContract,process.env.CONTRACT_ADDRESS);

//Below Method Transfers Ethers to the Recipient Address 
router.post('/TransferTokens', function (req, res) {

    //Encode the Input Param VAlues w.r.to the ABI 
    var encodedData = contract.methods.transfer(req.body.address, req.body.tokenAmount).encodeABI();

    var transactionObject = {
        gas: process.env.GAS_AMOUNT,
        data: encodedData,
        from: process.env.WALLET_ACCOUNT,
        to: process.env.CONTRACT_ADDRESS
    };

    web3.eth.accounts.signTransaction(transactionObject, process.env.PRIVATE_KEY, function (error, trans) {
        web3.eth.sendSignedTransaction(trans.rawTransaction)
            .on("receipt", function (result) {
                //console.log(result);
                res.send(result);
            })
    })
})


//Checks the Balance after Token Transfering
router.get('/CheckBalance', function (req, res) {
    contract.methods.balanceOf(req.body.address).call().then(function(balance) {
        res.send({"Current Balance (Ethers)" : balance });
    });
})


//Below Method Call Gives All the Address with the Available Ethers.
router.get('/AddressWithEtherAmount', function (req, res) {
    let ds = web3.eth.getAccounts(function (error, lstAddresses) {
        lstAddresses.forEach(eachAddress => {
            web3.eth.getBalance(eachAddress).then(etherBalance => {
                console.log('The Address is :' + eachAddress + ' and carries the Ether Balance ' +
                    web3.utils.fromWei(etherBalance, 'ether') + '  Ethers(ETH).');
            });
        });
    });
})


//Directly Transfer Ethers From One Wallet Address to Another Wallet Address
router.post('/DirectEthersTransfer', function (req, res) {    
    web3.eth.sendTransaction({
        from: req.body.fromAddress,
        to: req.body.toAddress,
        value: web3.utils.toWei(req.body.transferAmount, 'ether')
    });
    res.send({"response": "Successfully transferred " + req.body.transferAmount + '(Ehters).'});
})


module.exports = router;