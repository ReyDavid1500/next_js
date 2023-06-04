import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

const Index = () => {
  const [counter, setCounter] = useState<number>(0);
  const [theme, setTheme] = useState<string>("light");
  const [characters, setCharacters] = useState<
    Array<{ id: number; name: string; status: string; image: string }>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCounter = (event) => {
    event.preventDefault();
    setCounter(counter - 1);
  };

  const handleCounterPlus = (event) => {
    event.preventDefault();
    setCounter(counter + 1);
  };
  const handleChangeTheme = (event) => {
    event.preventDefault();
    setTheme(theme === "light" ? "black" : "light");
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCounter(Number(value));
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );
      setLoading(false);
      setCharacters(data.results);
    };
    fetch();
  }, []);

  return (
    <div className={` ${theme === "light" ? "bg-slate-400" : "bg-black"}`}>
      <div>
        <button onClick={handleCounter}>-</button>
        Counter {counter}
        <button onClick={handleCounterPlus}>+</button>
      </div>
      <div>
        <input onChange={handleChangeInput} type="number" />
        <button onClick={handleChangeTheme}>Cambiar tema</button>
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          characters.map(({ image, name, id }) => {
            return <Card key={id} image={image} name={name} />;
          })
        )}
      </div>
    </div>
  );
};

export default Index;
