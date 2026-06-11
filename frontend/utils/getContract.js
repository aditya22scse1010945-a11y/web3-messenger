/*import { ethers } from "ethers";

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
  */

import { ethers } from "ethers";

export const contractAddress =
  "0x69b2a3D6109BaA8f683d04281A951ed2A467f38c";

export const contractABI = [
  "function sendMessage(address _receiver, string _content)",

  "function getConversation(address otherUser) view returns ((address sender,address receiver,string content,uint256 timestamp)[])",

  "function getTotalMessages() view returns (uint256)",

  "event MessageSent(address indexed sender,address indexed receiver,string content,uint256 timestamp)"
];

export async function getContract() {
  if (typeof window === "undefined") return null;

  if (!window.ethereum) {
    alert("Please install MetaMask");
    return null;
  }

  const provider = new ethers.BrowserProvider(
    window.ethereum
  );

  const signer = await provider.getSigner();

  return new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
}