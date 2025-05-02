
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilterTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const FilterTabs = ({ activeTab, setActiveTab }: FilterTabsProps) => {
  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-secondary text-secondary-foreground">
          <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All</TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Events</TabsTrigger>
          <TabsTrigger value="opportunities" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Opportunities</TabsTrigger>
          <TabsTrigger value="announcements" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Announcements</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default FilterTabs;
