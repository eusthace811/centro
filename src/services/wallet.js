import { Observable } from 'rxjs/Observable';
import Web3 from 'web3';
import ethers from 'ethers';

//////////////////////////////////////////////////////////////////////////////

const config = require('../config/config.json');

//////////////////////////////////////////////////////////////////////////////

export const web3 = new Web3( new Web3.providers.HttpProvider(config.ethereum.host) );

// web3.eth.Contract(config.contract.abi); - latest version
//export const centroContract = web3.eth.contract(config.contract.abi).at(config.contract.address); - 0.20.0
export const infuraProvider = new ethers.providers.InfuraProvider(true, 'Pjuqwe1f8zc0UUwAkZRJ');
export var wallet = null;

//////////////////////////////////////////////////////////////////////////////

export const isAddress = (address) => {
    return web3.isAddress(address);
};

//////////////////////////////////////////////////////////////////////////////

export const privateKeyToAccount = (privateKey) => {
    try {
        if ( !infuraProvider ) { return Observable.of( null ); }
        // Different issues using new version of web3, by now using web3 0.20.0 and ethers.js
        //return web3.eth.defaultAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
        return Observable.of( wallet = new ethers.Wallet( `0x${privateKey}`, infuraProvider ));
    } catch (error) {
        console.error('privateKeyToAccount - error', error);
    }
};

//////////////////////////////////////////////////////////////////////////////

export const getEthBalance = () => {
    try {
        if ( !wallet || !infuraProvider ) { return Observable.of( 0 ); }
        //return Observable.of( web3.fromWei(web3.eth.getBalance( web3.eth.defaultAccount.address ), 'ether') );
        wallet.provider = infuraProvider;
        return Observable.fromPromise( wallet.getBalance() );
    } catch (error) {
        console.error('getEthBalance - error', error);
    }
};

//////////////////////////////////////////////////////////////////////////////

export const getTokensBalance = () => {
    try {
        if ( !wallet || !infuraProvider ) { return Observable.of( [0] ); }
        // centroContract.balanceOf( wallet.address ).call()
        const centroContract = new ethers.Contract(config.contract.address, config.contract.abi, infuraProvider);

        return Observable.fromPromise( centroContract.balanceOf( wallet.address ) );
    } catch (error) {
        console.error('getTokensBalance - error', error);
    }
};

//////////////////////////////////////////////////////////////////////////////

export const signTransaction = (amount) => {
    try {
        if ( !wallet || !infuraProvider ) { return Observable.of( '' ); }
        // const rawTx = {
        //     to: to,
        //     gasLimit: this.web3.toHex(150000),
        //     value: this.web3.toHex( this.web3.toWei(value, 'ether') ),
        // };
        // return Observable.fromPromise( this.web3.eth.defaultAccount.signTransaction(rawTx) );

        var transaction = {
            gasLimit: 150000,
            to: config.contract.address,
            data: '0x',
            value: ethers.utils.parseEther(amount)
        };        
        //const signedTransaction = wallet.sign(transaction);
        //console.log('signedTransaction', transaction, signedTransaction);

        // infuraProvider.sendTransaction(signedTransaction)
        //wallet.send(config.contract.address, ethers.utils.parseEther('1.0'))

        // send signed transaction with current wallet
        return Observable.fromPromise( wallet.sendTransaction(transaction)  );
    } catch (error) {
        console.error('signTransaction - error', error);
    }
}

//////////////////////////////////////////////////////////////////////////////
