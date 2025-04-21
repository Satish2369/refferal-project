import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import PropTypes from 'prop-types';

// Mock rewards data
const mockRewards = [
  {
    id: '1',
    name: 'Amazon Gift Card',
    description: '$10 Amazon Gift Card',
    image: '/rewards/amazon.png',
    pointsCost: 100,
  },
  {
    id: '2',
    name: 'Starbucks Gift Card',
    description: '$5 Starbucks Gift Card',
    image: '/rewards/starbucks.png',
    pointsCost: 50,
  },
  {
    id: '3',
    name: 'Netflix Subscription',
    description: '1 Month Netflix Basic Plan',
    image: '/rewards/netflix.png',
    pointsCost: 150,
  },
];

export const RewardsContext = createContext({
  rewards: [],
  redeemReward: () => {},
  canRedeem: () => false,
});

export const useRewards = () => useContext(RewardsContext);

export function RewardsProvider({ children }) {
  const [rewards] = useState(mockRewards);
  const { currentUser, addRedemption } = useAuth();

  const canRedeem = (rewardId) => {
    if (!currentUser) return false;
    const reward = rewards.find(r => r.id === rewardId);
    return reward ? currentUser.points >= reward.pointsCost : false;
  };

  const redeemReward = (rewardId) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward || !canRedeem(rewardId)) return;

    addRedemption({
      rewardId: reward.id,
      rewardName: reward.name,
      pointsCost: reward.pointsCost,
    });
  };

  const value = {
    rewards,
    redeemReward,
    canRedeem,
  };

  return <RewardsContext.Provider value={value}>{children}</RewardsContext.Provider>;
}

RewardsProvider.propTypes = {
  children: PropTypes.node.isRequired
}; 