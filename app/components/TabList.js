import styles from './TabList.module.css';
const TabList = ({ activeTab, tabs, bkgVariant }) => (
  <ul className={`${styles.tabList}  ${bkgVariant === "green" ? styles.greenTabs : ""}`}>
    {tabs.map((tab, index) => (
      <li
        key={index}
        className={`${styles.tabItem} ${activeTab === tab.id ? styles.active : ""}`}
        onClick={tab.handler}
      >
        <span>{tab.label}</span>
      </li>
    ))}
  </ul>
);

export default TabList;