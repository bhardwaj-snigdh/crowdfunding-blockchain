import React from 'react';
import { loader } from '../assets';

const DisplayCampaigns = ({ title, isLoading, campaigns, emptyListMessage, renderCard }) => {
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            {emptyListMessage}
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => renderCard(campaign))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
