
import React, { useState } from 'react';
import { Calendar, ArrowUp, Users, ChevronDown, ChevronUp, MapPin, Clock, Share } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface EventCardProps {
  id: number;
  title: string;
  location: string;
  description: string;
  date?: string;
  category: 'event' | 'opportunity' | 'announcement';
  votes: number;
  time: string;
  tags: string[];
}

const EventCard = ({ id, title, location, description, date, category, votes, tags, time }: EventCardProps) => {
  const [voteCount, setVoteCount] = useState(votes || 0);
  const [hasVoted, setHasVoted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
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

  const getRandomLocation = () => {
    const locations = ['Student Center', 'Main Hall', 'Library', 'Engineering Building', 'Science Complex'];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const getRandomTime = () => {
    const hours = ['09', '10', '11', '13', '14', '15', '16', '17', '18'];
    const minutes = ['00', '15', '30', '45'];
    return `${hours[Math.floor(Math.random() * hours.length)]}:${minutes[Math.floor(Math.random() * minutes.length)]}`;
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card
          className={`h-full overflow-hidden card-hover animate-fade-in ${isExpanded ? 'card-expanded' : ''} cursor-pointer`}
          onClick={toggleExpand}
        >
          <CardContent className="p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getCategoryColor(category)}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Badge>
                  <div
                    className={`flex items-center p-1 rounded-md ${hasVoted ? 'bg-campus-purple bg-opacity-10' : 'bg-gray-50'}`}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVote();
                      }}
                    >
                      <ArrowUp
                        size={18}
                        className={`transition-colors ${hasVoted ? 'text-campus-purple' : 'text-gray-400'}`}
                      />
                    </Button>
                    <span className={`text-xs font-medium ${hasVoted ? 'text-campus-purple' : 'text-gray-600'}`}>
                      {voteCount}
                    </span>
                  </div>
                </div>

                <h3 className="mb-1 text-md font-bold line-clamp-2">{title}</h3>
                {date && (
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <Calendar size={12} className="mr-1" />
                    {date}
                  </div>
                )}
                <p className="mb-2 text-xs text-gray-600 line-clamp-2">{description}</p>

                <div className="flex flex-wrap gap-1 mt-auto">
                  {tags.slice(0, 3).map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {tags.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{tags.length - 3}</span>
                  )}
                </div>
              </div>

              <div className="card-detail-container bg-gray-50">
                <div className="p-4 border-t border-gray-100">
                  <h4 className="text-sm font-semibold mb-3">Event Details</h4>
                  <div className="space-y-3">
                    {date && (
                      <div className="flex items-center text-xs">
                        <Calendar size={14} className="mr-2 text-primary" />
                        <span>{date}</span>
                        <Clock size={14} className="ml-3 mr-2 text-primary" />
                        <span>{time}</span>
                      </div>
                    )}
                    <div className="flex items-center text-xs">
                      <MapPin size={14} className="mr-2 text-primary" />
                      <span>{location}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{description.substring(0,200)}...</p>
                    <div className="flex items-center justify-between mt-3">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-2 bg-gray-50 border-t flex justify-between items-center">
            <div className="flex items-center text-xs text-gray-500">
              <Users size={14} className="mr-1" />
              {voteCount} interested
            </div>

          </CardFooter>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="p-4 w-80 shadow-lg">
        <div className="space-y-2">
          <h4 className="font-semibold">{title}</h4>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar size={12} className="mr-1" />
            {date || "Date TBA"}
          </div>
          <p className="text-sm">{description.substring(0, 50)}...</p>
          <div className="text-xs text-primary font-medium">
            Hover to preview, click for more details
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default EventCard;
