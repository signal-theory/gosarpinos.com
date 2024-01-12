import styles from './TabContent.module.css';
const TabContent = ({ activeTab, content }) => {
  const activeContent = content.find(item => item.id === activeTab);
  return (
    <div className={styles.tabContent}>
      {activeContent && activeContent.component}
    </div>
  );
};

export default TabContent;