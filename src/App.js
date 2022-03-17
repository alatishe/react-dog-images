import "./styles.css";
import React, { useEffect, useState } from "react";

export async function getDogList() {
  const data = await fetch(`https://dog.ceo/api/breeds/list/all`).then((res) =>
    res.json()
  );
  return Object.keys(data.message);
}

/**
 * Returns URL of a Dog image
 */
export async function getDogImageUrl(idx) {
  const dogUrl = await fetch(
    `https://dog.ceo/api/breed/${idx}/images/random`
  ).then((res) => res.json());
  return dogUrl.message;
}

export default function App() {
  const [dogList, setDogList] = useState([]);

  useEffect(() => {
    async function getData() {
      const apiData = await getDogList();
      setDogList(apiData);
    }
    getData();
  }, []);

  async function showImage(e) {
    const dogSrc = await getDogImageUrl(e);
    document.getElementById("dogImg").src = dogSrc;
  }

  const dogNames = dogList.map((dog, idx) => {
    return (
      <option key={idx} value={dog}>
        {dog}
      </option>
    );
  });

  return (
    <div className="App">
      <h1>Display Dog Image</h1>
      <h2>React Coding challenge!</h2>
      <select onChange={(e) => showImage(e.target.value)}>{dogNames}</select>
      <img
        alt="Dog"
        id="dogImg"
        style={{ paddingTop: 10, display: "block", top: 50 }}
      />
    </div>
  );
}
