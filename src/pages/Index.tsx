import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import EventCard from '@/components/EventCard';
import FilterTabs from '@/components/FilterTabs';
import SubmitModal from '@/components/SubmitModal';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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

type UserSubmit = {
    id: number;
    title: string;
    location: string;
    category: string;
    date: string;
    description: string;
    time: string;
    tags: string[];
    votes: number;
};

const Index = () => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [submissions, setSubmissions] = useState<UserSubmit[]>([]); // ← this replaces mockData

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
                  location={item.location}
                  description={item.description}
                  date={item.date}
                  category={item.category as 'event' | 'opportunity' | 'announcement'}
                  votes={item.votes}
                  time={item.time}
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
          <p className="text-muted-foreground">© 2023 CampusConnect. Built with ❤️ for students.</p>
          <p className="mt-2 text-muted-foreground/70">Subscribe to our weekly digest for campus updates.</p>
        </div>
      </footer>
      
      <SubmitModal 
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />
    </div>
  );
};

export default Index;
