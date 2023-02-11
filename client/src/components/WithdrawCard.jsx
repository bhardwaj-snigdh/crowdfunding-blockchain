import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useStateContext } from '../context';

import { daysLeft } from '../utils';
import CustomButton from './CustomButton';

const WithdrawCard = ({ campaign }) => {
  const { title, description, image, amountCollected, target, deadline } = campaign;

  const { withdrawFunds } = useStateContext();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/campaign-details/${title}`, { state: campaign });
  };

  const remainingDays = daysLeft(deadline);
  const canWithdraw = amountCollected >= target;

  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
      onClick={handleNavigate}
    >
      <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]" />

      <div className="flex flex-col p-4">
        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>

        <CustomButton
          btnType="button"
          title="Withdraw"
          styles={`mt-[20px] bg-[#1dc071] ${!canWithdraw && 'grayscale cursor-not-allowed'}`}
          handleClick={(evt) => {
            evt.stopPropagation();

            if (!canWithdraw) {
              toast.info('Funds can only be withdrawn after the campaign has reached its target');
              return;
            }
            withdrawFunds(campaign.pId);
          }}
        />
      </div>
    </div>
  );
};

export default WithdrawCard;
