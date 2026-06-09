import { ethers } from "ethers";

export const contractAddress = "0x59618AD8a899AA90b7889D7009B318eb3Ee82393";

export const contractABI = [
  "function sendMessage(string _content)",
  "function getMessages() view returns (tuple(address sender,string content,uint256 timestamp)[])"
];

export async function getContract() {
  if (typeof window === "undefined") return null;

  if (!window.ethereum) {
    alert("Install MetaMask");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
}