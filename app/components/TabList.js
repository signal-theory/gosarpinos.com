import styles from './TabList.module.css';
const TabList = ({ activeTab, tabs }) => (
  <ul className={styles.tabList}>
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