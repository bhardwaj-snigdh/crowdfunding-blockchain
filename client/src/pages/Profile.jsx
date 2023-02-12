import React, { useState, useEffect } from 'react';

import { DisplayCampaigns, FundCard } from '../components';
import { useStateContext } from '../context';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    data.sort((a, b) => {
      if (a.isActive === b.isActive) return 0;
      if (a.isActive) return -1;
      return 1;
    });
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
      renderCard={(campaign) => <FundCard key={campaign.pId} campaign={campaign} />}
    />
  );
};

export default Profile;
