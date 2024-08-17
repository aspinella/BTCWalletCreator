//importando dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
//Rede principal -> mainnet
//Rede de teste -> testnet
const network = bitcoin.networks.testnet

//Carteira hierarquica deterministica (HD)
//Dentro de uma carteira principal, criamos diversas carteiras a partir desta
//para mainnet usar: const path = `m/49'/0'/0'/0`
const path = `m/49'/1'/0'/0`

//Seed - Criando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//Criando a raiz da carteira HD
let root = bip32.fromSeed(seed,network)

//Criando uma conta - par private-public keys
let account = root.derivePath(path)
//Gera um nó inicial
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
/*
    WIF: Wallet Import Format, formata a chave privada para 
        conseguir importar em um software de gerenciamento de carteiras, utilizaremos o Electra
*/
console.log("Chave privada: ", node.toWIF())
console.log("Seed: ", mnemonic)