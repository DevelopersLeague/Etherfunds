import { ethers } from "ethers";

export class EtherFundClient {
  constructor() {
    this._provider = null;
    this._signer = null;
    this._contract = null;
  }
  setProvider(web3provider) {
    this._provider = new ethers.providers.Web3Provider(web3provider);
    this._signer = this._provider.getSigner();
  }
  setContract(address, abi) {
    this._contract = new ethers.Contract(address, abi, this._signer);
  }
  async getAllCampaigns() {
    this._validate();
    return await this._contract.getAllCampaigns();
  }
  async createCampaign({ name, description, goal }) {
    this._validate();
    const tx = await this._contract.createCampaign(name, description, goal);
    const resp = await tx.wait();
    const campaign = resp.events.find(
      (e) => e.event === "CampaignCreated"
    ).args;
    return campaign;
  }
  _validate() {
    if (this._contract == null) {
      throw new Error("contract not set call setContract first");
    }
    if (this._provider == null) {
      throw new Error("provider not set call setProvider first");
    }
    if (this._signer == null) {
      throw new Error("signer not set call setProvider first");
    }
  }
}
