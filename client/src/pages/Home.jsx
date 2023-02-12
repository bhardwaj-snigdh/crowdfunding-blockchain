import React, { useState, useEffect } from 'react';

import { DisplayCampaigns, FundCard } from '../components';
import { useStateContext } from '../context';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    const activeCampaigns = data.filter((campaign) => campaign.isActive);
    setCampaigns(activeCampaigns);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  console.log({ campaigns });

  return (
    <DisplayCampaigns
      title="All Campaigns"
      emptyListMessage="There are no active campaigns at the moment."
      isLoading={isLoading}
      campaigns={campaigns}
      renderCard={(campaign) => <FundCard key={campaign.pId} campaign={campaign} />}
    />
  );
};

export default Home;
