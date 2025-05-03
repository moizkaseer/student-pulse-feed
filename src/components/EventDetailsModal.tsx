import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EventDetailsModalProps {
    event: {
        title: string;
        description: string;
        date?: string;
        category: string;
        votes: number;
        tags: string[];
    };
    onClose: () => void;
}

const EventDetailsModal = ({ event, onClose }: EventDetailsModalProps) => {
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{event.title}</DialogTitle>
                    <DialogDescription className="flex items-center gap-2 text-sm mt-1">
                        <Badge variant="secondary" className="capitalize">
                            {event.category}
                        </Badge>
                        {event.date ? `• ${event.date}` : '• Date TBA'}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 text-sm mt-4">
                    <div className="space-y-2">
                        <div>
                            <span className="font-medium text-muted-foreground">Description:</span>
                            <p className="text-gray-800 mt-1">{event.description}</p>
                        </div>

                        <div>
                            <span className="font-medium text-muted-foreground">Tags:</span>
                            <p className="text-gray-700 mt-1">{event.tags.join(', ') || 'None'}</p>
                        </div>

                        <div>
                            <span className="font-medium text-muted-foreground">Votes:</span>
                            <p className="text-gray-700 mt-1">{event.votes}</p>
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EventDetailsModal;
