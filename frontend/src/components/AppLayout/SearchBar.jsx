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
    setSubstring(e.target.value);
    const value = e.target.value;
<<<<<<< HEAD
    if (!value) return setResult([]);
=======
    if(!value) return setResult([])
>>>>>>> Sprint-5
    setSubstring(value);

    try {
      const response = await userApi().get(`search/${value}`);
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        onMouseLeave={() => {
          setResult([]);
          setSubstring("");
        }}
      >
        <div
          id="container"
          className={color ? styles.searchScroll : styles.search}
        >
          <input
            className={styles.buscador}
            value={substring}
            onChange={(e) => {
              searchUsernames(e);
            }}
            placeholder="Search"
            type="text"
          />
        </div>
        {result.length > 0 && (
          <div className={styles.results}>
            {result.map((user) => {
              return (
                <p className={styles.listOfUsers} key={user.username}>
                  <span
                    onClick={() => {
                      navigate(`/user/${user.username}`);
                      setResult([]);
                      setSubstring("");
                    }}
                    id={user.username}
                  >
                    {user.name} {user.surname}
                  </span>{" "}
                  (@{user.username})
                </p>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBar;
