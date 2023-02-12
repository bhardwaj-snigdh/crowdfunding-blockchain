import React, { useState, useEffect } from 'react';

import { DisplayCampaigns, InactiveCampaignCard } from '../components';
import { useStateContext } from '../context';

const InactiveCampaigns = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    const inactiveCampaigns = data.filter((campaign) => !campaign.isActive);
    setCampaigns(inactiveCampaigns);
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
      renderCard={(campaign) => <InactiveCampaignCard key={campaign.pId} campaign={campaign} />}
    />
  );
};

export default InactiveCampaigns;
