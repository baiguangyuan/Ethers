import { ethers } from "ethers";

// 查询V神的ETH余额
const main = async () => {
  const provider = ethers.getDefaultProvider();
  const balance = await provider.getBalance("vitalik.eth");
  console.log(`ETH Balance: ${ethers.formatEther(balance)}`);
};

main();
