'use client';
import {useState} from 'react';
import styles from './ItemInfo.module.css';

const ItemInfo = () => {

  const [multiplier, setMultiplier] = useState(1);
  const [activeSize, setActiveSize] = useState("size1");
  //  Functions to handle Size Switching
  const handleSize1 = () => {
    // update the state to Size1
    setActiveSize("size1");
    setMultiplier(1);
  };
  const handleSize2 = () => {
    // update the state to Size2
    setActiveSize("size2");
    setMultiplier(1.5);
  };
  const handleSize3 = () => {
    // update the state to Size2
    setActiveSize("size3");
    setMultiplier(2);
  };
  const handleSize4 = () => {
    // update the state to Size2
    setActiveSize("size4");
    setMultiplier(2.5);
  };
  const handleSize5 = () => {
    // update the state to Size2
    setActiveSize("size5");
    setMultiplier(3);
  };
  const activeClass = styles.active;
  return (
    <div className={styles.itemInfo}>
      <div className={styles.sizes}>
        <button onClick={handleSize1} className={`${styles.sizeBtn} ${activeSize === "size1" ? styles.active : ""}`}>8&quot;</button>
        <button onClick={handleSize2} className={`${styles.sizeBtn} ${activeSize === "size2" ? styles.active : ""}`}>10&quot;</button>
        <button onClick={handleSize3} className={`${styles.sizeBtn} ${activeSize === "size3" ? styles.active : ""}`}>12&quot;</button>
        <button onClick={handleSize4} className={`${styles.sizeBtn} ${activeSize === "size4" ? styles.active : ""}`}>14&quot;</button>
        <button onClick={handleSize5} className={`${styles.sizeBtn} ${activeSize === "size5" ? styles.active : ""}`}>16&quot;</button>
      </div>
      <table className={styles.table}>
        <tr>
          <td className={styles.title}>CALORIES</td>
          <td>{(1028.27 * multiplier).toFixed(2)} Cals</td>
        </tr>
        <tr>
          <td>Fat Cals</td>
          <td>{(589.25 * multiplier).toFixed(2)} Cals</td>
        </tr>
        <tr>
          <td>Saturated Cals</td>
          <td>{(137.06 * multiplier).toFixed(2)} Cals</td>
        </tr>
        <tr>
          <th colSpan="2"><hr className={styles.hr}/></th>
        </tr>
        <tr>
          <td className={styles.title}>TOTAL FAT</td>
          <td>{(65.36 * multiplier).toFixed(2)} g</td>
        </tr>
        <tr>
          <td>Saturated Fat</td>
          <td>{(15.23 * multiplier).toFixed(2)} g</td>
        </tr>
        <tr>
          <td>Trans Fat</td>
          <td>{(0 * multiplier).toFixed(2)} g</td>
        </tr>
        <tr>
          <th colSpan="2"><hr className={styles.hr}/></th>
        </tr>
        <tr>
          <td>Cholesterol</td>
          <td>{(305.61 * multiplier).toFixed(2)} mg</td>
        </tr>
        <tr>
          <td>Sodium</td>
          <td>{(2701.42 * multiplier).toFixed(2)} mg</td>
        </tr>
        <tr>
          <th colSpan="2"><hr className={styles.hr}/></th>
        </tr>
        <tr>
          <td className={styles.title}>Total Carbohydrates</td>
          <td>{(38.87 * multiplier).toFixed(2)} g</td>
        </tr>
        <tr>
          <td>Fiber</td>
          <td>{(5.34 * multiplier.toFixed(2))} g</td>
        </tr>
        <tr>
          <td>Sugar</td>
          <td>{(6.2 * multiplier).toFixed(2)} g</td>
        </tr>
        <tr>
          <th colSpan="2"><hr className={styles.hr}/></th>
        </tr>
        <tr>
          <td>Protein</td>
          <td>{(65.56 * multiplier).toFixed(2)} g</td>
        </tr>
        <tr>
          <td>Vitamin A</td>
          <td>{(266.82).toFixed(2)} IU</td>
        </tr>
        <tr>
          <td>Vitamin C</td>
          <td>{(3.2 * multiplier).toFixed(2)} mg</td>
        </tr>
        <tr>
          <td>Calcium</td>
          <td>{(373.55 * multiplier).toFixed(2)} mg</td>
        </tr>
        <tr>
          <td>Iron</td>
          <td>{(8.64 * multiplier).toFixed(2)} mg</td>
        </tr>
      </table>
    </div>
  );
}

export default ItemInfo;