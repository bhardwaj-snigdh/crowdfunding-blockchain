import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DisplayCampaigns, FundCard } from '../components';
import { useStateContext } from '../context';
import { searchThroughCampaigns } from '../utils';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    const activeCampaigns = data.filter((campaign) => campaign.isActive);

    if (searchQuery && searchQuery.length > 0) {
      const filteredCampaigns = searchThroughCampaigns(activeCampaigns, searchQuery);
      setCampaigns(filteredCampaigns);
    } else {
      setCampaigns(activeCampaigns);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

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
