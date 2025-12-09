import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface EventDetailsModalProps {
    event: {
        id: number | string;
        title: string;
        description: string;
        date?: string;
        category: string;
        votes: number;
        tags: string[];
    };
    onClose: () => void;
    onDelete?: (id: number | string) => void;
}

const EventDetailsModal = ({ event, onClose, onDelete }: EventDetailsModalProps) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = async () => {
        if (onDelete) {
            try {
                await onDelete(event.id);
                setIsDeleteDialogOpen(false);
                onClose();
                toast.success('Event deleted successfully');
            } catch (error) {
                toast.error('Failed to delete event');
                console.error(error);
            }
        }
    };

    return (
        <>
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

                        <div className="flex justify-between pt-2">
                            {onDelete && (
                                <Button 
                                    variant="destructive" 
                                    onClick={() => setIsDeleteDialogOpen(true)}
                                    className="flex items-center gap-2"
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </Button>
                            )}
                            <Button variant="outline" onClick={onClose}>
                                Close
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the event
                            <span className="font-semibold"> "{event.title}"</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default EventDetailsModal;
