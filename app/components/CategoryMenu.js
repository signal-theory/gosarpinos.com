// import { useState } from 'react';
import styles from './CategoryMenu.module.css';
const CategorySelector = ({ selectionTitle, availableTerms, selectedCategory, onCategorySelect }) => {
// const [selectedCategory, setSelectedCategory] = useState(null);

  // const handleCategorySelect = (option) => {
  //   setSelectedCategory(option);
  //   onCategorySelect(option); // Call the function passed as a prop
  // };

  return (
  <>
    <h4 className="text-align-center" style={{ marginTop: '4rem' }}>{selectionTitle}</h4>
    <div className={styles.categoryFilter}>
      {availableTerms.map((option, index) => (
        <button
        //  onClick={() => handleCategorySelect(option)}
          key={`term${index}`}
          value={option}
          className={selectedCategory === option ? styles.active : ''}
        >
          {option}
        </button>
      ))}
    </div>
  </>
)};

export default CategorySelector;