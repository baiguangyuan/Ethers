import { ethers } from "ethers";

// 钱包1 余额 0.5
// 钱包地址： 0x3a94777F9EE10F70344D79f753eCcddC6132837E
// 钱包私钥： 0xa353e32887751619a115c83270716b5c7ea20a0f66cdff01e42281ff1c3638b4
// 钱包助记词： trophy mad group earn stomach soldier poverty snap appear scrap wrap confirm
// 钱包2 余额 0
// 钱包地址：0x888FEAc77Ef0C83873DcbA118801245f563f926e
// 钱包私钥：0x83ce5ee94c8ea98a0d9440220db62be344074bb830b2f8850fe49d317ce09a53
// 钱包助记词：quit blast become action pact way echo used reopen main unlock indicate

// 创建钱包
const creatWallet = async () => {
  const wallet = ethers.Wallet.createRandom();
  console.log(`钱包地址：${wallet.address}`);
  console.log(`钱包私钥：${wallet.privateKey}`);
  console.log(`钱包助记词：${wallet.mnemonic.phrase}`);
};

const main = async () => {
  const ALCHEMY_URL =
    "https://eth-sepolia.g.alchemy.com/v2/5IP53kWVROsP74Z3wLjSP6NwPs7pakTX";
  const provider = new ethers.JsonRpcProvider(ALCHEMY_URL);
  const fromWallet = new ethers.Wallet(
    "0xa353e32887751619a115c83270716b5c7ea20a0f66cdff01e42281ff1c3638b4",
    provider
  );
  const toWallet = new ethers.Wallet(
    "0x83ce5ee94c8ea98a0d9440220db62be344074bb830b2f8850fe49d317ce09a53",
    provider
  );
  console.log(`交易前`);
  console.log(
    `钱包From   余额：${ethers.formatEther(
      await provider.getBalance(fromWallet)
    )}`
  );
  console.log(
    `钱包To     余额：${ethers.formatEther(
      await provider.getBalance(toWallet)
    )}`
  );
  console.log(`交易中，等待交易在区块链确认（需要几分钟）`);
  const tx = await fromWallet.sendTransaction({
    to: toWallet.address,
    value: ethers.parseEther("0.01"),
  });
  await tx.wait();
  console.log("***************************");
  console.log(tx);
  console.log("***************************");

  console.log(`交易后`);
  console.log(
    `钱包From   余额：${ethers.formatEther(
      await provider.getBalance(fromWallet)
    )}`
  );
  console.log(
    `钱包To     余额：${ethers.formatEther(
      await provider.getBalance(toWallet)
    )}`
  );
};

main();
