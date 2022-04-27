//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
//import hardhat console.log
import "hardhat/console.sol";

struct Campaign {
    uint256 id;
    address manager;
    string name;
    string description;
    uint256 goal;
    uint256 balance;
    uint256 timestamp;
    uint256 contributorCount;
}

struct Contribution {
    uint256 id;
    address contributor;
    uint256 campaignId;
    uint256 amount;
    uint256 timestamp;
}

struct RequestDecision {
    uint256 id;
    uint256 requestId;
    address contributorAddress;
    bool isApproved;
}

struct WithdrawRequest {
    uint256 id;
    uint256 campaignId;
    address payable beneficiaryAddress;
    bool isProcessed;
    string description;
    uint256 amount;
    uint256 timestamp;
    uint256 approvalCount;
    uint256 rejectionCount;
}

contract EtherFund {
    uint256 public nextCampaignId = 1;
    uint256 public nextWithdrawRequestId = 1;
    uint256 public nextRequestDecisionId = 1;
    uint256 public nextContributionId = 1;
    uint256[] public campaignIds;
    mapping(uint256 => Campaign) public campaigns;
    uint256[] public withdrawRequestIds;
    mapping(uint256 => WithdrawRequest) public withdrawRequests;
    uint256[] public requestDecisionIds;
    mapping(uint256 => RequestDecision) public requestDecisions;
    uint256[] public contributionIds;
    mapping(uint256 => Contribution) public contributions;

    constructor() {}

    // SECTION: Campaigns
    event CampaignCreated(
        uint256 id,
        address manager,
        string name,
        string description,
        uint256 goal,
        uint256 balance,
        uint256 timestamp
    );

    function createCampaign(
        string memory _name,
        string memory _description,
        uint256 _goal
    ) public {
        uint256 id = nextCampaignId;
        nextCampaignId++;
        Campaign storage campaign = campaigns[id];
        campaignIds.push(id);
        campaign.id = id;
        campaign.manager = msg.sender;
        campaign.name = _name;
        campaign.description = _description;
        campaign.goal = _goal;
        campaign.balance = 0;
        campaign.timestamp = block.timestamp;
        emit CampaignCreated(
            id,
            campaign.manager,
            campaign.name,
            campaign.description,
            campaign.goal,
            campaign.balance,
            campaign.timestamp
        );
    }

    function getCampaignById(uint256 _campaignId)
        public
        view
        returns (Campaign memory)
    {
        return _getCampaignById(_campaignId);
    }

    function getAllCampaigns() public view returns (Campaign[] memory) {
        return _getAllCampaigns();
    }

    function getCampaignsByManagerAddress(address _manager)
        public
        view
        returns (Campaign[] memory)
    {
        return _getCampaignsByManagerAddress(_manager);
    }

    function getCampaignsCreatedBySender()
        public
        view
        returns (Campaign[] memory)
    {
        return _getCampaignsByManagerAddress(msg.sender);
    }

    // SECTION: Contribute
    function contribute(uint256 _campaignId, uint256 _amount) public payable {
        Campaign storage campaign = campaigns[_campaignId];
        require(
            msg.sender != campaign.manager,
            "Cannot contribute to own campaign"
        );
        require(_amount >= 0, "Amount must be greater than 0");
        require(_amount == msg.value, "Amount must be equal to msg.value");
        bool alreadyContributed = _hasUserContributedToCampaign(
            msg.sender,
            _campaignId
        );
        if (!alreadyContributed) {
            uint256 contributionId = nextContributionId;
            nextContributionId++;
            contributionIds.push(contributionId);
            Contribution storage contribution = contributions[contributionId];
            contribution.id = contributionId;
            contribution.contributor = msg.sender;
            contribution.campaignId = _campaignId;
            contribution.amount = _amount;
            contribution.timestamp = block.timestamp;

            campaign.contributorCount++;
        } else {
            // add to existing contribution
            for (uint256 i = 0; i < contributionIds.length; i++) {
                Contribution storage contribution = contributions[
                    contributionIds[i]
                ];
                if (
                    contribution.contributor == msg.sender &&
                    contribution.campaignId == _campaignId
                ) {
                    contribution.amount += _amount;
                }
            }
        }
        // if not already contributed
        campaign.balance += _amount;
    }

    function getSendersContribution(uint256 _campaignId)
        public
        view
        returns (uint256)
    {
        //return senders contribution
        uint256 senderContribution = 0;
        for (uint256 i = 0; i < contributionIds.length; i++) {
            Contribution storage contribution = contributions[
                contributionIds[i]
            ];
            if (
                contribution.contributor == msg.sender &&
                contribution.campaignId == _campaignId
            ) {
                senderContribution = contribution.amount;
            }
        }
        return senderContribution;
    }

    function getCampaignsContributedBySender()
        public
        view
        returns (Campaign[] memory)
    {
        Campaign[] memory campaignsAll = _getAllCampaigns();
        uint256 count = 0;
        for (uint256 i = 0; i < campaignsAll.length; i++) {
            if (campaignsAll[i].manager != msg.sender) {
                if (
                    _hasUserContributedToCampaign(
                        msg.sender,
                        campaignsAll[i].id
                    )
                ) {
                    count++;
                }
            }
        }
        Campaign[] memory resp = new Campaign[](count);
        uint256 j = 0;
        for (uint256 i = 0; i < campaignsAll.length; i++) {
            if (campaignsAll[i].manager != msg.sender) {
                if (
                    _hasUserContributedToCampaign(
                        msg.sender,
                        campaignsAll[i].id
                    )
                ) {
                    resp[j++] = campaignsAll[i];
                }
            }
        }
        return resp;
    }

    // SECTION: Withdraw
    event WithdrawRequestedCreated(
        uint256 id,
        uint256 campaignId,
        address beneficiaryAddress,
        string description,
        uint256 amount,
        uint256 timestamp,
        uint256 approvalCount
    );

    function createWithdrawRequest(
        uint256 _campaignId,
        uint256 _amount,
        address payable _beneficiary,
        string memory _description
    ) public {
        Campaign storage campaign = campaigns[_campaignId];
        require(
            msg.sender == campaign.manager,
            "Only campaign manager can create withdraw request"
        );
        require(_amount >= 0, "Amount must be greater than 0");
        require(
            _amount <= campaign.balance,
            "Amount must be less than or equal to campaign balance"
        );
        uint256 withdrawRequestId = nextWithdrawRequestId;
        nextWithdrawRequestId++;
        withdrawRequestIds.push(withdrawRequestId);
        WithdrawRequest storage withdrawRequest = withdrawRequests[
            withdrawRequestId
        ];
        withdrawRequest.id = withdrawRequestId;
        withdrawRequest.campaignId = _campaignId;
        withdrawRequest.beneficiaryAddress = _beneficiary;
        withdrawRequest.amount = _amount;
        withdrawRequest.description = _description;
        withdrawRequest.timestamp = block.timestamp;
        withdrawRequest.approvalCount = 0;
        emit WithdrawRequestedCreated(
            withdrawRequest.id,
            withdrawRequest.campaignId,
            withdrawRequest.beneficiaryAddress,
            withdrawRequest.description,
            withdrawRequest.amount,
            withdrawRequest.timestamp,
            withdrawRequest.approvalCount
        );
    }

    function getWithdrawRequestById(uint256 _withdrawRequestId)
        public
        view
        returns (WithdrawRequest memory)
    {
        WithdrawRequest storage withdrawRequest = withdrawRequests[
            _withdrawRequestId
        ];
        return withdrawRequest;
    }

    function getWithdrawRequestsByCampaignId(uint256 _campaignId)
        public
        view
        returns (WithdrawRequest[] memory)
    {
        WithdrawRequest[]
            memory withdrawRequestsAll = _getAllWithdrawRequests();
        uint256 count = 0;
        for (uint256 i = 0; i < withdrawRequestsAll.length; i++) {
            if (withdrawRequestsAll[i].campaignId == _campaignId) {
                count++;
            }
        }
        WithdrawRequest[] memory resp = new WithdrawRequest[](count);
        uint256 j = 0;
        for (uint256 i = 0; i < withdrawRequestsAll.length; i++) {
            if (withdrawRequestsAll[i].campaignId == _campaignId) {
                resp[j++] = withdrawRequestsAll[i];
            }
        }
        return resp;
    }

    function getPendingWithdrawRequestsByCampaignId(uint256 _campaignId)
        public
        view
        returns (WithdrawRequest[] memory)
    {
        //find all withdraw requests with given _campaignId
        WithdrawRequest[] memory requests = getWithdrawRequestsByCampaignId(
            _campaignId
        );
        // find all withdraw requests not approved or rejected by sender
        uint256 count = 0;
        for (uint256 i = 0; i < requests.length; i++) {
            if (
                !_isWithdrawRequestApproved(msg.sender, requests[i].id) &&
                !_isWithdrawRequestRejected(msg.sender, requests[i].id)
            ) {
                count++;
            }
        }
        WithdrawRequest[] memory resp = new WithdrawRequest[](count);
        uint256 j = 0;
        for (uint256 i = 0; i < requests.length; i++) {
            if (
                !_isWithdrawRequestApproved(msg.sender, requests[i].id) &&
                !_isWithdrawRequestRejected(msg.sender, requests[i].id)
            ) {
                resp[j] = requests[i];
                j++;
            }
        }
        return resp;
    }

    function approveWithdrawRequest(uint256 _withdrawRequestId) public {
        require(
            (!_isWithdrawRequestApproved(msg.sender, _withdrawRequestId) &&
                !_isWithdrawRequestRejected(msg.sender, _withdrawRequestId)),
            "Request has already been approved or rejected"
        );

        //create request decision
        uint256 requestDecisionId = nextRequestDecisionId;
        nextRequestDecisionId++;
        requestDecisionIds.push(requestDecisionId);
        RequestDecision storage requestDecision = requestDecisions[
            requestDecisionId
        ];
        requestDecision.id = requestDecisionId;
        requestDecision.requestId = _withdrawRequestId;
        requestDecision.contributorAddress = msg.sender;
        requestDecision.isApproved = true;
        //update withdraw request
        WithdrawRequest storage withdrawRequest = withdrawRequests[
            _withdrawRequestId
        ];
        withdrawRequest.approvalCount++;
    }

    function rejectWithdrawRequest(uint256 _withdrawRequestId) public {
        require(
            (!_isWithdrawRequestApproved(msg.sender, _withdrawRequestId) &&
                !_isWithdrawRequestRejected(msg.sender, _withdrawRequestId)),
            "Request has already been approved or rejected"
        );
        //create request decision
        uint256 requestDecisionId = nextRequestDecisionId;
        nextRequestDecisionId++;
        requestDecisionIds.push(requestDecisionId);
        RequestDecision storage requestDecision = requestDecisions[
            requestDecisionId
        ];
        requestDecision.id = requestDecisionId;
        requestDecision.requestId = _withdrawRequestId;
        requestDecision.contributorAddress = msg.sender;
        requestDecision.isApproved = false;
        //update withdraw request
        WithdrawRequest storage withdrawRequest = withdrawRequests[
            _withdrawRequestId
        ];
        withdrawRequest.rejectionCount++;
    }

    // process withdraw request by manager when more than 50% of contributors have approved
    function processWithdrawRequest(uint256 _id) public {
        // only managers can approve withdraw requests
        WithdrawRequest storage withdrawRequest = withdrawRequests[_id];
        require(
            msg.sender == campaigns[withdrawRequest.campaignId].manager,
            "Only campaign manager can process withdraw request"
        );
        WithdrawRequest memory request = _getWithdrawRequestById(_id);
        uint256 campaignId = request.campaignId;
        Campaign memory campaign = _getCampaignById(campaignId);
        uint256 required = campaign.contributorCount / 2;
        require(
            request.approvalCount >= required,
            "Not enough contributors have approved"
        );
        require(
            request.amount <= campaign.balance,
            "Amount must be less than or equal to campaign balance"
        );
        //transer money to benificiery
        campaign.balance -= request.amount;
        _transfer(request.beneficiaryAddress, request.amount);
        //update withdraw request
        request.isProcessed = true;
        //update campaign
        campaigns[campaignId] = campaign;
        withdrawRequests[_id] = request;
    }

    function isWithdrawRequestApproved(uint256 _id) public view returns (bool) {
        return _isWithdrawRequestApproved(msg.sender, _id);
    }

    function _transfer(address payable benificiary, uint256 amount) private {
        require(benificiary != address(0), "Beneficiary address cannot be 0x0");
        require(amount > 0, "Amount must be greater than 0");
        benificiary.transfer(amount);
    }

    //SECTION: private DAO methods
    //SECTION: Campaign DAO
    function _getAllCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory resp = new Campaign[](campaignIds.length);
        for (uint256 i = 0; i < campaignIds.length; i++) {
            resp[i] = getCampaignById(campaignIds[i]);
        }
        return resp;
    }

    function _getCampaignById(uint256 _campaignId)
        private
        view
        returns (Campaign memory)
    {
        Campaign storage campaign = campaigns[_campaignId];
        return campaign;
    }

    function _getCampaignCountByManagerAddress(address _manager)
        private
        view
        returns (uint256)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < campaignIds.length; i++) {
            uint256 id = campaignIds[i];
            Campaign storage campaign = campaigns[id];
            if (campaign.manager == _manager) {
                count++;
            }
        }
        return count;
    }

    function _getCampaignsByManagerAddress(address _manager)
        private
        view
        returns (Campaign[] memory)
    {
        uint256 managerCampaignsCount = _getCampaignCountByManagerAddress(
            _manager
        );
        Campaign[] memory resp = new Campaign[](managerCampaignsCount);
        uint256 j = 0;
        for (uint256 k = 0; k < campaignIds.length; k++) {
            uint256 id = campaignIds[k];
            Campaign storage campaign = campaigns[id];
            if (campaign.manager == _manager) {
                resp[j] = getCampaignById(id);
                j++;
            }
        }
        return resp;
    }

    // SECTION: Contribution DAO
    function _getContributionById(uint256 _contributionId)
        private
        view
        returns (Contribution memory)
    {
        Contribution storage contribution = contributions[_contributionId];
        return contribution;
    }

    function _getContributionCountByCampaignId(uint256 _campaignId)
        private
        view
        returns (uint256)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < contributionIds.length; i++) {
            uint256 id = contributionIds[i];
            Contribution storage contribution = contributions[id];
            if (contribution.campaignId == _campaignId) {
                count++;
            }
        }
        return count;
    }

    function _getContributionsByCampaignId(uint256 _campaignId)
        private
        view
        returns (Contribution[] memory)
    {
        uint256 campaignContributionsCount = _getContributionCountByCampaignId(
            _campaignId
        );
        Contribution[] memory resp = new Contribution[](
            campaignContributionsCount
        );
        uint256 j = 0;
        for (uint256 k = 0; k < contributionIds.length; k++) {
            uint256 id = contributionIds[k];
            Contribution storage contribution = contributions[id];
            if (contribution.campaignId == _campaignId) {
                resp[j] = contribution;
                j++;
            }
        }
        return resp;
    }

    function _getContributionsCountByContributorAddress(address _contributor)
        private
        view
        returns (uint256)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < contributionIds.length; i++) {
            uint256 id = contributionIds[i];
            Contribution storage contribution = contributions[id];
            if (contribution.contributor == _contributor) {
                count++;
            }
        }
        return count;
    }

    function _getContributionsByContributorAddress(address _contributor)
        private
        view
        returns (Contribution[] memory)
    {
        uint256 contributorContributionsCount = _getContributionsCountByContributorAddress(
                _contributor
            );
        Contribution[] memory resp = new Contribution[](
            contributorContributionsCount
        );
        uint256 j = 0;
        for (uint256 k = 0; k < contributionIds.length; k++) {
            uint256 id = contributionIds[k];
            Contribution storage contribution = contributions[id];
            if (contribution.contributor == _contributor) {
                resp[j] = contribution;
                j++;
            }
        }
        return resp;
    }

    function _hasUserContributedToCampaign(address _user, uint256 _campaignId)
        private
        view
        returns (bool)
    {
        for (uint256 i = 0; i < contributionIds.length; i++) {
            uint256 id = contributionIds[i];
            Contribution storage contribution = contributions[id];
            if (
                contribution.contributor == _user &&
                contribution.campaignId == _campaignId
            ) {
                return true;
            }
        }
        return false;
    }

    function _getContributionOfUserInCampaign(
        uint256 _campaignId,
        address _userAddress
    ) private view returns (Contribution memory) {
        require(
            _hasUserContributedToCampaign(_userAddress, _campaignId),
            "User has not contributed to this campaign"
        );
        Contribution storage contribution = contributions[0];
        for (uint256 i = 0; i < contributionIds.length; i++) {
            uint256 id = contributionIds[i];
            contribution = contributions[id];
            if (
                contribution.campaignId == _campaignId &&
                contribution.contributor == _userAddress
            ) {
                contribution = contributions[id];
                return contribution;
            }
        }
        return contribution;
    }

    // SECTION: Withdraw Request DAO
    function _getAllWithdrawRequests()
        private
        view
        returns (WithdrawRequest[] memory)
    {
        WithdrawRequest[] memory resp = new WithdrawRequest[](
            withdrawRequestIds.length
        );
        uint256 j = 0;
        for (uint256 i = 0; i < withdrawRequestIds.length; i++) {
            uint256 id = withdrawRequestIds[i];
            WithdrawRequest storage withdrawRequest = withdrawRequests[id];
            resp[j] = withdrawRequest;
            j++;
        }
        return resp;
    }

    function _getWithdrawRequestById(uint256 _withdrawRequestId)
        private
        view
        returns (WithdrawRequest memory)
    {
        WithdrawRequest storage withdrawRequest = withdrawRequests[
            _withdrawRequestId
        ];
        return withdrawRequest;
    }

    function _getAllRequestDecisions()
        private
        view
        returns (RequestDecision[] memory)
    {
        RequestDecision[] memory resp = new RequestDecision[](
            requestDecisionIds.length
        );
        uint256 j = 0;
        for (uint256 i = 0; i < requestDecisionIds.length; i++) {
            uint256 id = requestDecisionIds[i];
            RequestDecision storage requestDecision = requestDecisions[id];
            resp[j] = requestDecision;
            j++;
        }
        return resp;
    }

    function _getRequestDecisionById(uint256 _requestDecisionId)
        private
        view
        returns (RequestDecision memory)
    {
        RequestDecision storage requestDecision = requestDecisions[
            _requestDecisionId
        ];
        return requestDecision;
    }

    function _isWithdrawRequestApproved(address _addr, uint256 _id)
        private
        view
        returns (bool)
    {
        RequestDecision storage requestDecision = requestDecisions[0];
        for (uint256 i = 0; i < requestDecisionIds.length; i++) {
            uint256 id = requestDecisionIds[i];
            requestDecision = requestDecisions[id];
            if (
                requestDecision.requestId == _id &&
                requestDecision.isApproved == true &&
                requestDecision.contributorAddress == _addr
            ) {
                return true;
            }
        }
        return false;
    }

    function _isWithdrawRequestRejected(address _addr, uint256 _id)
        private
        view
        returns (bool)
    {
        RequestDecision storage requestDecision = requestDecisions[0];
        for (uint256 i = 0; i < requestDecisionIds.length; i++) {
            uint256 id = requestDecisionIds[i];
            requestDecision = requestDecisions[id];
            if (
                requestDecision.requestId == _id &&
                requestDecision.isApproved == false &&
                requestDecision.contributorAddress == _addr
            ) {
                return true;
            }
        }
        return false;
    }
}
