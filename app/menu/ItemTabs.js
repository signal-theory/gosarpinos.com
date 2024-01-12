'use client';
import {useState} from 'react';
import TabList from "../components/TabList";
import TabContent from "../components/TabContent";

const ItemTabs = ({content}) => {

  const [activeTab, setActiveTab] = useState("tab1");
  //  Functions to handle Tab Switching
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };

  const tabs = [
    { id: 'tab1', label: 'Nutritional Info', handler: handleTab1 },
    { id: 'tab2', label: 'Allergens', handler: handleTab2 },
    // Add more tabs as needed
  ];

  return (
    <div className="tab-container">
      <TabList
        activeTab={activeTab}
        tabs={tabs} />
      <TabContent
       activeTab={activeTab} 
       content={content} />
    </div>
  );
}

export default ItemTabs;