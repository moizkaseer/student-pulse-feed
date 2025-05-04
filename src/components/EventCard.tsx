import React, { useState } from 'react';
import { ArrowUp, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import EventDetailsModal from './EventDetailsModal.tsx';

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
  const [voteCount, setVoteCount] = useState(votes || 0);
  const [hasVoted, setHasVoted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventCardProps | null>(null);

  const handleVote = () => {
    let newCount = hasVoted ? voteCount - 1 : voteCount + 1;
    hasVoted ? toast.info('Vote removed') : toast.success('Vote added!');
    setVoteCount(newCount);
    setHasVoted(!hasVoted);
  };

  const handleCardClick = () => {
    setSelectedEvent({
      id,
      title,
      description,
      date,
      category,
      votes: voteCount,
      tags
    });
    setIsModalOpen(true);
  };

  const getCategoryColor = () => {
    switch (category) {
      case 'event':
        return 'bg-purple-500 text-white';
      case 'opportunity':
        return 'bg-blue-500 text-white';
      case 'announcement':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-gray-300 text-black';
    }
  };

  return (
      <>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Card
                className={`h-full overflow-hidden card-hover animate-fade-in ${isExpanded ? 'card-expanded' : ''}`}
                onClick={handleCardClick}
            >
              <CardContent className="p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getCategoryColor()}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Badge>

                      <div
                          className={`flex items-center p-1 rounded-md ${
                              hasVoted ? 'bg-campus-purple bg-opacity-10' : 'bg-gray-50'
                          }`}
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
                        <span
                            className={`text-xs font-medium ${
                                hasVoted ? 'text-campus-purple' : 'text-gray-600'
                            }`}
                        >
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
                {date || 'Date TBA'}
              </div>
              <p className="text-sm">{description}</p>
              <div className="text-xs text-primary font-medium">
                Hover to preview, click for more details
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        {isModalOpen && selectedEvent && (
            <EventDetailsModal event={selectedEvent} onClose={() => setIsModalOpen(false)} />
        )}
      </>
  );
};

export default EventCard;
