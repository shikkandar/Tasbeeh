import { useEffect, useState, ChangeEvent } from "react";
import "./App.css";
import { Pencil } from "lucide-react";

function App() {
  const [count, setCount] = useState<number>(0);
  const [hundredCount, setHundredCount] = useState<number>(0);
  const [thousandCount, setThousandCount] = useState<number>(0);
  const [edit, setEdit] = useState<boolean>(true);

  console.log(thousandCount / 100);

  useEffect(() => {
    const storedCount100 = localStorage.getItem("count_100");
    const storedCount1000 = localStorage.getItem("count_1000");

    if (storedCount100) {
      setHundredCount(parseInt(storedCount100));
    }
    if (storedCount1000) {
      setThousandCount(parseInt(storedCount1000));
    }
  }, [edit]);

  const handleEdit = () => {
    setEdit(false);
  };

  const handleSubmit = () => {
    if (thousandCount % 1000 === 0 && thousandCount > 100) {
      localStorage.setItem("count_1000", thousandCount.toString());
    }

    if (hundredCount % 100 === 0) {
      localStorage.setItem("count_100", hundredCount.toString());
    }

    setEdit(true);
  };

  const handleClick = () => {
    setCount(count + 1);

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

  const handleHundredCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHundredCount(parseInt(e.target.value));
  };

  const handleThousandCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setThousandCount(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="flex flex-col gap-5 min-w-[300px] p-6">
        <input
          value={count}
          className="p-5 text-xl font-bold text-center"
          type="text"
          readOnly
        />
        <input
          value={hundredCount}
          disabled={edit}
          onChange={handleHundredCountChange}
          className="p-5 text-xl font-bold text-center"
          type="text"
        />
        <input
          value={thousandCount}
          disabled={edit}
          onChange={handleThousandCountChange}
          className="p-5 text-xl font-bold text-center"
          type="text"
        />
        {edit ? (
          <button
            onClick={handleEdit}
            className="edit p-3 bg-blue-500 text-white font-bold rounded-lg"
          >
            <Pencil />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="p-3 bg-blue-500 text-white font-bold rounded-lg"
          >
            Submit
          </button>
        )}
        <button
          onClick={handleClick}
          className="p-3 bg-blue-500 text-white font-bold rounded-lg"
        >
          Insha Allah
        </button>
      </div>
    </div>
  );
}

export default App;
