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
  _mapCampaigns(campaigns) {
    const resp = campaigns.map(campaign => {
      return {
        id: campaign[0],
        manager: campaign[1],
        name: campaign[2],
        description: campaign[3],
        goal: campaign[4],
        balance: campaign[5],
        timestamp: campaign[6],
        contributorCount: campaign[7]
      }
    })
    return resp;
  }
  async getAllCampaigns() {
    this._validate();
    const campaigns = await this._contract.getAllCampaigns();
    const resp = campaigns.map(campaign => {
      return {
        id: campaign[0],
        manager: campaign[1],
        name: campaign[2],
        description: campaign[3],
        goal: campaign[4],
        balance: campaign[5],
        timestamp: campaign[6],
        contributorCount: campaign[7]
      }
    })
    return resp;
  }
  async createCampaign({ name, description, goal }) {
    this._validate();
    const tx = await this._contract.createCampaign(name, description, goal);
    const resp = await tx.wait();
    const campaign = resp.events.find(
      (e) => e.event === "CampaignCreated"
    ).args;
    // return campaign;
    const campResp = {
      id: campaign[0],
      manager: campaign[1],
      name: campaign[2],
      description: campaign[3],
      goal: campaign[4],
      balance: campaign[5],
      timestamp: campaign[6],
    }
    return campResp;
  }
  async contribute({ campaignId, amount }) {
    this._validate();
    const tx = await this._contract.contribute(campaignId, amount, {
      value: amount.toString()
    });
    const resp = await tx.wait();
    return;
  }

  async getCampaignsContributedBySender() {
    const camps = await this._contract.getCampaignsContributedBySender();
    return this._mapCampaigns(camps);
  }

  async getCampaignsCreatedBySender() {
    const camps = await this._contract.getCampaignsCreatedBySender();
    return this._mapCampaigns(camps);
  }
}
