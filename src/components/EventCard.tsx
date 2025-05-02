
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
  description: string;
  date?: string;
  category: 'event' | 'opportunity' | 'announcement';
  votes: number;
  tags: string[];
}

const EventCard = ({ id, title, description, date, category, votes, tags }: EventCardProps) => {
  const [voteCount, setVoteCount] = useState(votes);
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

  const mockLocation = getRandomLocation();
  const mockTime = getRandomTime();
  const mockDetailsText = "Join us for this exciting event that brings together students from all disciplines. Network with peers, learn new skills, and have fun! Space is limited, so make sure to RSVP soon.";

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card 
          className={`overflow-hidden card-hover animate-fade-in ${isExpanded ? 'card-expanded' : ''}`}
          onClick={toggleExpand}
        >
          <CardContent className="p-0">
            <div className="flex">
              <div 
                className={`flex flex-col items-center justify-center p-4 ${hasVoted ? 'bg-campus-purple bg-opacity-10' : 'bg-gray-50'}`}
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVote();
                  }}
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
            
            <div className="card-detail-container bg-gray-50">
              <div className="p-5 border-t border-gray-100">
                <h4 className="text-md font-semibold mb-3">Event Details</h4>
                <div className="space-y-3">
                  {date && (
                    <div className="flex items-center text-sm">
                      <Calendar size={16} className="mr-2 text-primary" />
                      <span>{date}</span>
                      <Clock size={16} className="ml-4 mr-2 text-primary" />
                      <span>{mockTime}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <MapPin size={16} className="mr-2 text-primary" />
                    <span>{mockLocation}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">{mockDetailsText}</p>
                  <div className="flex items-center justify-between mt-4">
                    <Button variant="outline" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      toast.success("RSVP confirmed!");
                    }}>
                      RSVP
                    </Button>
                    <Button variant="ghost" size="sm" className="text-primary" onClick={(e) => {
                      e.stopPropagation();
                      toast.info("Event link copied to clipboard!");
                    }}>
                      <Share size={16} className="mr-1" />
                      Share
                    </Button>
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
            <Button 
              variant="ghost" 
              size="sm"
              className="text-xs text-primary p-0 flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
            >
              {isExpanded ? (
                <>
                  <span className="mr-1">Less details</span>
                  <ChevronUp size={14} />
                </>
              ) : (
                <>
                  <span className="mr-1">More details</span>
                  <ChevronDown size={14} />
                </>
              )}
            </Button>
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
          <p className="text-sm">{mockDetailsText.substring(0, 100)}...</p>
          <div className="text-xs text-primary font-medium">
            Hover to preview, click for more details
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default EventCard;
