import { EtherFundClient } from "./client";
import ContractInfo from "../backend/artifacts/contracts/EtherFund.sol/EtherFund.json";
import { useEffect, useState } from "react";

const client = new EtherFundClient();

export default function ClientTest() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!window.etherium) {
      console.log("install metamask");
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        client.setProvider(window.ethereum);
        client.setContract(
          process.env.REACT_APP_CONTRACT_ADDRESS,
          ContractInfo.abi
        );
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1>Client Test</h1>
      <button
        onClick={async () => {
          const camp1 = await client.createCampaign({
            name: "Test Campaign",
            description: "This is a test campaign",
            goal: 100,
          });
          console.log(camp1);
          const camp2 = await client.createCampaign({
            name: "Test Campaign 2",
            description: "This is a test campaign 2",
            goal: 200,
          });
          console.log(camp2);
          const all = await client.getAllCampaigns();
          console.log(all);
        }}
      >
        {" "}
        run test{" "}
      </button>
    </div>
  );
}
