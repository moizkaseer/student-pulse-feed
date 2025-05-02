
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilterTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const FilterTabs = ({ activeTab, setActiveTab }: FilterTabsProps) => {
  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default FilterTabs;
