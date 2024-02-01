'use client';
import { useState } from 'react';
import TabList from '../components/TabList';
import TabContent from '../components/TabContent';

const ItemTabs = ({ bkgVariant, tab1, tab2, tab3, content }) => {

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
  const handleTab3 = () => {
    // update the state to tab2
    setActiveTab("tab3");
  };

  const tabs = [
    { id: 'tab1', label: tab1, handler: handleTab1 },
    { id: 'tab2', label: tab2, handler: handleTab2 },
    { id: 'tab3', label: tab3, handler: handleTab3 },
    // Add more tabs as needed
  ];

  return (
    <div className="tab-container">
      <TabList
        bkgVariant={bkgVariant}
        activeTab={activeTab}
        tabs={tabs} />
      <TabContent
        activeTab={activeTab}
        content={content} />
    </div>
  );
}

export default ItemTabs;