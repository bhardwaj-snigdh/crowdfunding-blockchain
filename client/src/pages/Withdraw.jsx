import React, { useState, useEffect } from 'react';

import { DisplayCampaigns, WithdrawCard } from '../components';
import { useStateContext } from '../context';

const Withdraw = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      emptyListMessage={
        address !== undefined
          ? 'You have not created any campigns yet'
          : 'Connect your Metamask wallet to access your created crowdfunding campaigns.'
      }
      isLoading={isLoading}
      campaigns={campaigns}
      isAuthenticated={address !== undefined}
      renderCard={(campaign) => <WithdrawCard key={campaign.pId} campaign={campaign} />}
    />
  );
};

export default Withdraw;
