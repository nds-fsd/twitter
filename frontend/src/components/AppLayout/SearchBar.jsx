import React, { useState, useEffect, useRef } from "react";
import { userApi } from "../../functions/apiWrapper";
import styles from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [color, setColor] = useState(false);
  const [substring, setSubstring] = useState("");
  const [result, setResult] = useState([]);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const changeColor = () => {
    if (window.scrollY >= 70) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  const searchUsernames = async (e) => {
    const value = e.target.value;
    if(!value) return setResult([])
    setSubstring(value); // Actualizamos el estado substring con el valor del campo de entrada

    try {
      const response = await userApi().get(`search/${value}`);
      setResult(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.tagName === "SPAN") navigate(`user/${event.target.id}`)
      if (containerRef.current && !containerRef.current.contains(event.target)) {
       setResult([])
       setSubstring('')
        console.log("Clic fuera del contenedor");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} id="container" className={color ? styles.searchScroll : styles.search}>
        <input
          className={styles.buscador}
          value={substring}
          onChange={(e) => searchUsernames(e)} // Llamamos a la función searchUsernames en el evento onChange
          placeholder="Search"
          type="text"
        />
      </div>
      {result.length > 0 && (
        <div className={styles.results}>
          {result.map((user) => {
            return (
              <p className={styles.listOfUsers} key={user.username}>
                <span id={user.username} >{user.name} {user.surname}</span> (@{user.username})
              </p>
            );
          })}
        </div>
      )}
    </>
  );
}

export default SearchBar;