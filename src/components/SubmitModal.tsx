import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmitModal = ({ isOpen, onClose }: SubmitModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    category: '',
    date: '',
    time: '',
    description: '',
    tags: '',
    votes: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create the payload from formData state
    const payload = {
      title: formData.title,
      location: formData.location,
      category: formData.category,
      date: formData.date,
      time: formData.time,
      description: formData.description,
      tags: formData.tags.split(',').map(tag => tag.trim())
    };

    try {
      // First, send the POST request to json-server to save the data
      const response = await fetch('http://localhost:3001/userSubmits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Your submission has been received!');

        // Second, trigger the email sending
        // const emailResponse = await fetch('http://localhost:3000/sendEmails', {
        //   method: 'GET',
        //   mode: 'cors', // Explicitly request CORS mode
        //   credentials: 'include', // If you need to send cookies
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });

        // if (emailResponse.ok) {
        //   console.log('Emails sent successfully');
        // } else {
        //   throw new Error('Failed to send emails');
        // }

        // Close the modal after successful submission
        onClose();
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again!');
      console.error(error);
    }
  };


  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gradient-text">Submit to CampusConnect</DialogTitle>
            <DialogDescription>
              Share events, opportunities, or announcements with the campus community.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title*</Label>
              <Input
                  id="title"
                  placeholder="Give your submission a clear title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                  id="location"
                  placeholder="Enter location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                  id="category"
                  value={formData.category}
                  onValueChange={handleCategoryChange} // Update category state on value change
                  required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="opportunity">Opportunity</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-row items-end gap-4">
              <div className="flex-1">
                <Label htmlFor="date">Date (optional)</Label>
                <Input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="time">Time (optional)</Label>
                <Input
                    type="time"
                    id="time"
                    value={formData.time}
                    onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                  id="description"
                  placeholder="Provide details about your submission"
                  className="min-h-[120px]"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                  id="tags"
                  placeholder="e.g. CS, Workshop, Career"
                  value={formData.tags}
                  onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-campus-purple hover:bg-campus-lightPurple">
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
  );
};

export default SubmitModal;