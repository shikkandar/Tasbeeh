import { useEffect, useState } from "react";
import "./App.css";
import bg from "./assets/dark-landscape-with-bird-flying.jpg";

function App() {
  const [count, setCount] = useState(0);
  const [hundredCount, setHundredCount] = useState(0);
  const [thousandCount, setThousandCount] = useState(0);

  useEffect(() => {
    const storedCount100 = localStorage.getItem("count_100");
    const storedCount1000 = localStorage.getItem("count_1000");

    if (storedCount100) {
      setHundredCount(parseInt(storedCount100));
    }
    if (storedCount1000) {
      setThousandCount(parseInt(storedCount1000));
    }
  }, []);

  const handleClick = () => {
    setCount(count + 1);

    if (count === 100) {
      localStorage.setItem("count_100", (0).toString());
    }

    if (count === 100) {
      setCount(0);
      setHundredCount(hundredCount + count);
      localStorage.setItem("count_100", (hundredCount + count).toString());
    }
    if (hundredCount === 1000) {
      setHundredCount(0);
      setThousandCount(thousandCount + hundredCount);
      localStorage.setItem(
        "count_1000",
        (thousandCount + hundredCount).toString()
      );
    }
  };

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="flex flex-col gap-5 min-w-[300px]  p-6 ">
        <input
          value={count}
          className="p-5 text-xl font-bold text-center "
          type="text"
        />
        <input
          value={hundredCount}
          disabled
          className="p-5 text-xl font-bold text-center "
          type="text"
        />
        <input
          value={thousandCount}
          disabled
          className="p-5 text-xl font-bold text-center"
          type="text"
        />
        <button
          onClick={handleClick}
          className="p-3 bg-blue-500 text-white font-bold rounded-lg">
          Insha Allah
        </button>
      </div>
    </div>
  );
}

export default App;
