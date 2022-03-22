require("mocha");
const { expect } = require("chai");
const { id } = require("ethers/lib/utils");
const { ethers, waffle } = require("hardhat");

describe("Etherfunds", () => {
  /**@type {import("ethers").ContractFactory} */
  let EtherFund;
  /**@type {import("ethers").Contract} */
  let etherFund;
  /**@type {import("ethers").Signer[]} */
  let addresses;

  beforeEach(async () => {
    EtherFund = await ethers.getContractFactory("EtherFund");
    etherFund = await EtherFund.deploy();
    await etherFund.deployed();
    addresses = await ethers.getSigners();
  });

  describe("createCampaign", () => {
    it("should create a new campaign", async () => {
      let user = addresses[1];
      let tx = await etherFund
        .connect(user)
        .createCampaign("test1", "test1", 100);
      let receipt = await tx.wait();
      let id = receipt.events.find((e) => e.event === "CampaignCreated").args
        .id;
      expect(id.toString()).to.equal("1");
    });
  });

  describe("getCampaignById", async () => {
    it("should get campaign by id", async () => {
      let user = addresses[1];
      await etherFund.connect(user).createCampaign("test2", "test2", 100);
      let campaign = await etherFund.connect(user).getCampaignById(1);
      expect(campaign.name).to.equal("test2");
    });
  });

  describe("getAllCampaigns", async () => {
    it("should get all campaigns", async () => {
      let user = addresses[1];
      await etherFund.connect(user).createCampaign("test3", "test3", 100);
      await etherFund.connect(user).createCampaign("test4", "test4", 100);
      let campaigns = await etherFund.connect(user).getAllCampaigns();
      expect(campaigns.length).to.equal(2);
    });
  });

  describe("getCampaignsByManagerAddress", async () => {
    it("should get campaigns by managerId", async () => {
      let user = addresses[1];
      await etherFund.connect(user).createCampaign("test5", "test5", 100);
      await etherFund.connect(user).createCampaign("test6", "test6", 100);
      let campaigns = await etherFund
        .connect(user)
        .getCampaignsByManagerAddress(user.address);
      expect(campaigns.length).to.equal(2);
    });
  });

  describe("contribute", async () => {
    it("should increase contract balance when contributed", async () => {
      let owner = addresses[1];
      let user = addresses[2];
      const provider = waffle.provider;

      await etherFund.connect(owner).createCampaign("test7", "test7", 1000);
      await etherFund.connect(user).contribute(1, 100, {
        value: "100",
      });
      const finalContractBalance = await provider.getBalance(etherFund.address);

      expect(finalContractBalance.toString()).to.equal("100");
    });

    it("should increase campaign balance when contributed", async () => {
      const user1 = addresses[1];
      const user2 = addresses[2];

      const tx = await etherFund
        .connect(user1)
        .createCampaign("test8", "test8", 100);
      const resp = await tx.wait();
      const id = resp.events[0].args.id;
      await etherFund.connect(user2).contribute(id, 100, {
        value: "100",
      });
      const campaign = await etherFund.connect(user1).getCampaignById(id);

      expect(campaign.balance.toString()).to.equal("100");
    });

    it("should increase contributor count when contributed", async () => {
      let owner = addresses[1];
      let user = addresses[2];

      const tx = await etherFund
        .connect(owner)
        .createCampaign("test9", "test9", 100);
      const resp = await tx.wait();
      const id = resp.events[0].args.id;
      await etherFund.connect(user).contribute(id, 100, {
        value: "100",
      });
      let campaign = await etherFund.connect(user).getCampaignById(1);

      expect(campaign.contributorCount.toString()).to.equal("1");
    });
  });

  describe("getSendersContribution", async () => {
    it("should get sender contribution", async () => {
      let owner = addresses[1];
      let user = addresses[2];

      const tx = await etherFund
        .connect(owner)
        .createCampaign("test11", "test11", 100);
      const resp = await tx.wait();
      const id = resp.events[0].args.id;
      await etherFund.connect(user).contribute(id, 100, {
        value: "100",
      });
      let contribution = await etherFund
        .connect(user)
        .getSendersContribution(id);

      expect(contribution.toString()).to.equal("100");
    });
    it("should get correct contribution when contributed multiple times", async () => {
      let owner = addresses[1];
      let user = addresses[2];

      const tx = await etherFund
        .connect(owner)
        .createCampaign("test12", "test12", 100);
      const resp = await tx.wait();
      const id = resp.events[0].args.id;
      await etherFund.connect(user).contribute(id, 100, {
        value: "100",
      });
      await etherFund.connect(user).contribute(id, 100, {
        value: "100",
      });
      let contribution = await etherFund
        .connect(user)
        .getSendersContribution(id);

      expect(contribution.toString()).to.equal("200");
    });
  });

  describe("getCampaignsContributedBySender", async () => {
    it("should get campaigns contributed by sender", async () => {
      let owner = addresses[1];
      let user = addresses[2];

      const tx = await etherFund
        .connect(owner)
        .createCampaign("test12", "test12", 100);
      const resp = await tx.wait();
      const id = resp.events[0].args.id;
      const tx2 = await etherFund
        .connect(owner)
        .createCampaign("test12", "test12", 100);
      const resp2 = await tx2.wait();
      const id2 = resp2.events[0].args.id;
      await etherFund.connect(user).contribute(id, 100, {
        value: "100",
      });
      await etherFund.connect(user).contribute(id2, 100, {
        value: "100",
      });
      let campaigns = await etherFund
        .connect(user)
        .getCampaignsContributedBySender();
      expect(campaigns.length).to.equal(2);
    });

    it("should show one campaign even if contributed multiple times", async () => {
      let owner = addresses[1];
      let user = addresses[2];

      const tx = await etherFund
        .connect(owner)
        .createCampaign("test13", "test13", 100);
      const resp = await tx.wait();
      const id = resp.events[0].args.id;
      await etherFund.connect(user).contribute(id, 100, {
        value: "100",
      });
      await etherFund.connect(user).contribute(id, 100, {
        value: "100",
      });
      let campaigns = await etherFund
        .connect(user)
        .getCampaignsContributedBySender();
      expect(campaigns.length).to.equal(1);
    });
  });
  describe("createWithdrawRequest", async () => {
    it("should create withdraw request", async () => {
      //setup
      let owner = addresses[1];
      let user = addresses[2];
      const tx = await etherFund
        .connect(owner)
        .createCampaign("test14", "test14", 100);
      const resp = await tx.wait();
      const id = resp.events[0].args.id;
      await etherFund.connect(user).contribute(id, 100, {
        value: "100",
      });
      //action
      let tx2 = await etherFund
        .connect(owner)
        .createWithdrawRequest(id, 50, user.address, "test description");
      let resp2 = await tx2.wait();
      let request = resp2.events[0].args;
      //assertion
      expect(request.id.toString()).to.equal("1");
      expect(request.amount.toString()).to.equal("50");
      expect(request.beneficiaryAddress).to.equal(user.address);
      expect(request.description).to.equal("test description");
    });
  });
  describe("getWithdrawRequestById", async () => {
    it("should get withdraw request by id", async () => {
      //setup
      let owner = addresses[1];
      let user = addresses[2];
      const tx = await etherFund
        .connect(owner)
        .createCampaign("test15", "test15", 100);
      const resp = await tx.wait();
      const id = resp.events[0].args.id;
      await etherFund.connect(user).contribute(id, 100, {
        value: "100",
      });
      //action
      let tx2 = await etherFund
        .connect(owner)
        .createWithdrawRequest(id, 50, user.address, "test description");
      let resp2 = await tx2.wait();
      let request = resp2.events[0].args;
      //assertion
      let withdrawRequest = await etherFund.getWithdrawRequestById(request.id);
      expect(withdrawRequest.id.toString()).to.equal("1");
      expect(withdrawRequest.amount.toString()).to.equal("50");
      expect(withdrawRequest.beneficiaryAddress).to.equal(user.address);
      expect(withdrawRequest.description).to.equal("test description");
    });
  });
});

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
