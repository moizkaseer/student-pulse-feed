
import React, { useState } from 'react';
import { Calendar, ArrowUp, Users } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  date?: string;
  category: 'event' | 'opportunity' | 'announcement';
  votes: number;
  tags: string[];
}

const EventCard = ({ id, title, description, date, category, votes, tags }: EventCardProps) => {
  const [voteCount, setVoteCount] = useState(votes);
  const [hasVoted, setHasVoted] = useState(false);
  
  const handleVote = () => {
    if (hasVoted) {
      setVoteCount(voteCount - 1);
      setHasVoted(false);
      toast.info("Vote removed");
    } else {
      setVoteCount(voteCount + 1);
      setHasVoted(true);
      toast.success("Vote added!");
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'event':
        return 'bg-campus-purple text-white';
      case 'opportunity':
        return 'bg-campus-blue text-white';
      case 'announcement':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="overflow-hidden card-hover animate-fade-in">
      <CardContent className="p-0">
        <div className="flex">
          <div 
            className={`flex flex-col items-center justify-center p-4 ${hasVoted ? 'bg-campus-purple bg-opacity-10' : 'bg-gray-50'}`}
          >
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 h-8 w-8"
              onClick={handleVote}
            >
              <ArrowUp 
                size={24} 
                className={`transition-colors ${hasVoted ? 'text-campus-purple' : 'text-gray-400'}`} 
              />
            </Button>
            <span className={`text-sm font-medium ${hasVoted ? 'text-campus-purple' : 'text-gray-600'}`}>
              {voteCount}
            </span>
          </div>
          <div className="p-5 w-full">
            <div className="flex items-center justify-between mb-2">
              <Badge className={getCategoryColor(category)}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
              {date && (
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar size={12} className="mr-1" />
                  {date}
                </div>
              )}
            </div>
            <h3 className="mb-1 text-lg font-bold">{title}</h3>
            <p className="mb-3 text-sm text-gray-600">{description}</p>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-2 bg-gray-50 border-t flex justify-between items-center">
        <div className="flex items-center text-xs text-gray-500">
          <Users size={14} className="mr-1" />
          {voteCount} interested
        </div>
        <Button variant="link" className="text-xs text-campus-purple p-0">
          View details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
