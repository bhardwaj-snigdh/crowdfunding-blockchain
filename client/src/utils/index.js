import Fuse from 'fuse.js';

export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export const searchThroughCampaigns = (campaigns, query) => {
  const fuse = new Fuse(campaigns, {
    keys: ['title', 'description'],
    shouldSort: true,
    threshold: 0.7,
  });

  const results = fuse.search(query);

  return results.map((result) => result.item);
};
