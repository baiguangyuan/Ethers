import { ethers } from "ethers";

// 学习Provider类，然后利用它连接上Infura节点，读取链上的信息。
const main = async () => {
  const provider = new ethers.JsonRpcProvider(
    "https://goerli.infura.io/v3/3d86031a006a4e0590db79431e6256b3"
  );
  const network = await provider.getNetwork();
  console.log("1.查询当前网络", network.toJSON());
  const feeData = await provider.getFeeData();
  console.log("2.查询当前建议的gas设置", feeData);
  const txCount = await provider.getTransactionCount(address);
  console.log(`3.查询我的钱包历史交易次数: ${txCount} 次`);
  const address = "0xD1DA2627dDaC20E0777E9C650F446AEA69E820e6";
  const balance = await provider.getBalance(address);
  console.log(`4.查询我的钱包余额: ${ethers.formatEther(balance)}`);
  const usdcAddress = "0xa3e0Dfbf8DbD86e039f7CDB37682A776D66dae4b";
  const code = await provider.getCode(usdcAddress);
  console.log(`5.查询USDC合约代码:\n ${code}`);
};

main();
