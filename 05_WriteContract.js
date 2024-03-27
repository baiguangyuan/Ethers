import { ethers } from "ethers";

// Sepolia测试网RPC
const SEPOLIA_URL =
  "https://eth-sepolia.g.alchemy.com/v2/5IP53kWVROsP74Z3wLjSP6NwPs7pakTX";
const provider = new ethers.JsonRpcProvider(SEPOLIA_URL);
// 构造可读写钱包创建于 04_SendEth.js
const wallet = new ethers.Wallet(
  "0xa353e32887751619a115c83270716b5c7ea20a0f66cdff01e42281ff1c3638b4",
  provider
);
// WETH的ABI
const WETH_ABI = [
  "function balanceOf(address) public view returns(uint)",
  "function deposit() public payable",
  "function transfer(address, uint) public returns (bool)",
  "function withdraw(uint) public",
];
// WETH 合约地址（Sepolia测试网）
const WETH_ADDR = "0xb16F35c0Ae2912430DAc15764477E179D9B9EbEa";
// 声明可写合约
const contract = new ethers.Contract(WETH_ADDR, WETH_ABI, wallet);

const main = async () => {
  const balanceBefore = await contract.balanceOf(wallet.address);
  console.log(`转账前我的WETH余额：${ethers.formatEther(balanceBefore)} wETH`);
  // 如果钱包没有WETH需要先存款
  // const tx = await contractWETH.deposit({
  //   value: ethers.parseEther("0.001"),
  // });
  // await tx.wait();
  // console.log("交易详情", tx);
  // const balanceAfter = await contractWETH.balanceOf(wallet.address);
  // console.log(`存款后WETH余额：${ethers.formatEther(balanceAfter)}`);

  // 向V神发送0.001wETH
  const tx = await contract.transfer("vitalik.eth", ethers.parseEther("0.001"));
  console.log(`交易中，等待交易在区块链确认（需要几分钟）`);
  await tx.wait();
  console.log("交易详情", tx);
  const balanceAfter = await contract.balanceOf(wallet.address);
  console.log(`转账后我的WETH余额：${ethers.formatEther(balanceAfter)}`);
  const balanceOfV = await contract.balanceOf("vitalik.eth");
  console.log(`转账后V神的WETH余额：${ethers.formatEther(balanceOfV)}`);
};

main();
