import { useState } from "react";
import { userApi } from "../../functions/apiWrapper";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const [color, setColor] = useState(false);
  const [substring, setSubstring] = useState('');
  const [result, setResult] = useState([]);

  const changeColor = () => {
    if (window.scrollY >= 70) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  const searchUsernames = async (e) => {
    const value = e.target.value;
    setSubstring(value); // Actualizamos el estado substring con el valor del campo de entrada
    
    try {
      const response = await userApi().get(`search/${value}`);
      setResult(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
    <>
     <div className={color ? styles.searchScroll : styles.search}>
      <input
        className={styles.buscador}
        onChange={(e) => searchUsernames(e)} // Llamamos a la función searchUsernames en el evento onChange
        placeholder="Search"
        type="text"
      />
     
    </div>
    {result.length > 0 && <div className={styles.results}>{
      (result.map((user)=>{
        return <p>{user.username}</p>
      }))}</div> }</>
   
  );
}

export default SearchBar;
