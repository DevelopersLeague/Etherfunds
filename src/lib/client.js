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
    const resp = campaigns.map((campaign) => {
      return {
        id: campaign[0],
        manager: campaign[1],
        name: campaign[2],
        description: campaign[3],
        goal: Number(ethers.utils.formatEther(campaign[4])),
        balance: Number(ethers.utils.formatEther(campaign[5])),
        timestamp: campaign[6],
        contributorCount: campaign[7],
      };
    });
    return resp;
  }

  _mapCampaign(campaign) {
    return {
      id: campaign[0],
      manager: campaign[1],
      name: campaign[2],
      description: campaign[3],
      goal: Number(ethers.utils.formatEther(campaign[4])),
      balance: Number(ethers.utils.formatEther(campaign[5])),
      timestamp: campaign[6],
      contributorCount: campaign[7],
    };
  }

  _mapWithdrawRequest(request) {
    return {
      id: request[0],
      campaignId: request[1],
      beneficiaryAddress: request[2],
      isProcessed: request[3],
      description: request[4],
      amount: Number(ethers.utils.formatEther(request[5])),
      timestamp: request[6],
      approvalCount: request[7],
      rejectionCount: request[8],
    };
  }

  _mapWithdrawRequests(requests) {
    const resp = requests.map((request) => {
      return this._mapWithdrawRequest(request);
    });
    return resp;
  }

  async getAllCampaigns() {
    this._validate();
    const campaigns = await this._contract.getAllCampaigns();
    return this._mapCampaigns(campaigns);
  }

  async createCampaign({ name, description, goal }) {
    this._validate();
    const goalwei = ethers.utils.parseEther(goal.toString());
    const tx = await this._contract.createCampaign(name, description, goalwei);
    const resp = await tx.wait();
    const campaign = resp.events.find(
      (e) => e.event === "CampaignCreated"
    ).args;
    // return campaign;
    return this._mapCampaign(campaign);
  }

  async createWithdrawalRequest({campaignId, amount, beneficiary, description}){
    const amountWei = ethers.utils.parseEther(amount.toString());
    const tx = await this._contract.createWithdrawRequest(campaignId, amount, beneficiary, description);
    const resp = await tx.wait();
    return this._mapWithdrawRequest(resp.events[0].args);
  }

  async contribute({ campaignId, amount }) {
    this._validate();
    const wei = ethers.utils.parseEther(amount.toString());
    const tx = await this._contract.contribute(campaignId, wei, {
      value: wei.toString(),
    });
    const resp = await tx.wait();
  }

  async withdrawFunds({campaignId, amount, beneficiary}){
    const amoutWei = ethers.utils.parseEther(amount.toString());
    const tx = await this._contract.withdrawFunds(campaignId, amoutWei, beneficiary);
    const resp = await tx.wait();
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
