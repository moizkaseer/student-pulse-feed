import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import EventCard from '@/components/EventCard';
import FilterTabs from '@/components/FilterTabs';
import SubmitModal from '@/components/SubmitModal';
import { Input } from '@/components/ui/input';
import { Search, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for initial display
// const mockData = [
//   {
//     id: 1,
//     title: "Hackathon 2023: Build for Change",
//     description: "Join us for a 48-hour coding marathon to build solutions that make a difference on campus.",
//     date: "Nov 15, 2023",
//     category: "event",
//     votes: 42,
//     tags: ["Tech", "Coding", "Competition"]
//   },
//   {
//     id: 2,
//     title: "Summer Internship at Tech Giant",
//     description: "Applications open for summer internships at Tech Giant Inc. Great opportunity for CS students.",
//     date: "Deadline: Dec 1, 2023",
//     category: "opportunity",
//     votes: 29,
//     tags: ["Internship", "CS", "Industry"]
//   },
//   {
//     id: 3,
//     title: "Library Hours Extended for Finals",
//     description: "The main campus library will be open 24/7 during finals week to accommodate student study needs.",
//     date: undefined,
//     category: "announcement",
//     votes: 56,
//     tags: ["Campus", "Library", "Finals"]
//   },
//   {
//     id: 4,
//     title: "Debate Night: Tech Ethics",
//     description: "Join the Philosophy Club for a night of debate on ethical issues in modern technology.",
//     date: "Nov 22, 2023",
//     category: "event",
//     votes: 18,
//     tags: ["Debate", "Ethics", "Philosophy"]
//   },
//   {
//     id: 5,
//     title: "Research Assistant Position",
//     description: "Prof. Johnson is looking for undergraduate research assistants for the Spring semester.",
//     date: "Apply by Nov 30, 2023",
//     category: "opportunity",
//     votes: 35,
//     tags: ["Research", "Academic", "Part-time"]
//   }
// ];

import axios from "axios";
console.log("HEREEE")
type UserSubmit = {
    id: number;
    title: string;
    category: string;
    date: string;
    description: string;
    tags: string[];
    votes: number;
};

const Index = () => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [submissions, setSubmissions] = useState<UserSubmit[]>([]); // ← this replaces mockData
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    axios
        .get<UserSubmit[]>("http://localhost:3001/userSubmits")
        .then((res) => {
          // Optional: if tags are stored as comma string
          const cleaned = res.data.map((item) => ({
            ...item,
            tags: typeof item.tags === "string" ? item.tags.split(",").map(t => t.trim()) : item.tags,
          }));
          setSubmissions(cleaned);
        })
        .catch((err) => console.error("Error fetching data:", err));
  }, []);

    const filteredData = submissions.filter(item => {
        const matchesTab =
            activeTab === "all" ||
            (activeTab === "events" && item.category === "event") ||
            (activeTab === "opportunities" && item.category === "opportunity") ||
            (activeTab === "announcements" && item.category === "announcement");

        const matchesSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesTab && (searchQuery === "" || matchesSearch);
    });
    console.log("sfdsfjjdsflsjgklsjgkljgkljdklf")
    console.log("JEREEEE")

    return (
    <div className="min-h-screen flex flex-col bg-background bg-pattern">
      <Header openSubmitModal={() => setIsSubmitModalOpen(true)} />
      
      <main className="flex-grow container max-w-5xl mx-auto px-4 py-8">
        <section className="mb-10">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold mb-3 gradient-text">CampusConnect</h1>
            <p className="text-lg text-muted-foreground">Discover, share, and vote on campus events and opportunities</p>
          </div>
          
          <div className="relative mb-8">
            <div className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground">
              <Search className="h-5 w-5" />
            </div>
            <Input
              placeholder="Search for events, opportunities, or tags..."
              className="pl-10 border-accent bg-white dark:bg-card shadow-soft"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredData.map((item) => (
                <EventCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  category={item.category as 'event' | 'opportunity' | 'announcement'}
                  votes={item.votes}
                  tags={item.tags}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-card rounded-xl shadow-soft p-8">
              <p className="text-lg text-muted-foreground">No items found</p>
              <p className="text-muted-foreground/70">Try adjusting your filters or search</p>
            </div>
          )}
        </section>
      </main>
      
      <footer className="bg-white dark:bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© 2023 CampusConnect. All rights reserved.</p>
          <p className="mt-2 text-muted-foreground/70">Subscribe to our weekly digest for campus updates.</p>
        </div>
      </footer>
      
      <SubmitModal 
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />

      {/* Floating Subscribe Button */}
      <Button
        onClick={() => setIsSubscribeOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-campus-purple hover:bg-campus-lightPurple shadow-lg flex items-center"
        style={{ borderRadius: '9999px', padding: '0.75rem 1.5rem' }}
      >
        <Mail size={20} className="mr-2" />
        Subscribe
      </Button>

      {/* Subscribe Modal */}
      {isSubscribeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white dark:bg-card rounded-lg shadow-xl p-6 w-full max-w-xs relative transition-all duration-200">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
              onClick={() => setIsSubscribeOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            {!subscribed ? (
              <>
                <h2 className="text-lg font-semibold mb-2 text-center text-campus-purple">Subscribe to Weekly Digest</h2>
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  Get the best campus updates in your inbox.
                </p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-campus-purple/40 transition"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <Button
                  className="w-full bg-campus-purple hover:bg-campus-lightPurple text-base py-2 rounded-lg"
                  style={{ fontWeight: 500 }}
                  onClick={() => setSubscribed(true)}
                >
                  Subscribe
                </Button>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-base font-medium mb-2 text-campus-purple">Thank you for subscribing!</h3>
                <Button
                  className="mt-3 w-full"
                  onClick={() => {
                    setIsSubscribeOpen(false);
                    setSubscribed(false);
                    setEmail('');
                  }}
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
