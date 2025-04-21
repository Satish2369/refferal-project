import React from 'react';
import { useRewards } from '@/contexts/RewardsContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PropTypes from 'prop-types';

const RewardCard = ({ reward }) => {
  const { redeemReward, canRedeem } = useRewards();
  const { currentUser } = useAuth();
  
  const isRedeemable = canRedeem(reward.id);
  const pointsNeeded = currentUser ? reward.pointsCost - currentUser.points : reward.pointsCost;
  
  const handleRedeem = () => {
    if (isRedeemable) {
      redeemReward(reward.id);
    }
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative bg-gray-100 aspect-[4/3] flex items-center justify-center">
        <img 
          src={reward.image}
          alt={reward.name}
          className="object-cover w-full h-full"
        />
        <Badge className="absolute top-2 right-2 bg-brand-purple">
          {reward.pointsCost} Points
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{reward.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{reward.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          disabled={!isRedeemable}
          onClick={handleRedeem}
          variant={isRedeemable ? "default" : "outline"}
        >
          {isRedeemable 
            ? "Redeem Reward" 
            : `Need ${pointsNeeded} more ${pointsNeeded === 1 ? 'point' : 'points'}`
          }
        </Button>
      </CardFooter>
    </Card>
  );
};

RewardCard.propTypes = {
  reward: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    pointsCost: PropTypes.number.isRequired
  }).isRequired
};

export default RewardCard; 