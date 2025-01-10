import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { use } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [includeNum, setNum] = useState(false);
  const [includeChar, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null); // Initialize a ref with null

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeNum) str += "1234567890";
    if (includeChar) str += "!@#$%^&*()_+-=[]{}~`";
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [length, includeNum, includeChar]);

  useEffect(() => {
    passwordGenerator();
  }, [length, includeNum, includeChar, passwordGenerator]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="mx-4 my-4 font-bold font-mono bg-blue-800 text-white w-full max-w-lg h-[400px] rounded-lg shadow-lg flex flex-col align-center items-center justify-center">
          <h1 className="text-2xl text-center py-7">Password Generator</h1>
          <textarea
            ref={passwordRef} // Attach the ref to the textarea
            className="text-xl pt-2 px-5 font-bold font-mono bg-blue-300 text-white h-[40px] w-[400px] rounded-lg shadow-lg"
            value={password}
            readOnly
          />
          <div className="flex gap-4 justify-center items-center">
            <button
              className="bg-blue-500 cursor-pointer px-4 py-4 rounded-md my-3 hover:bg-blue-600 transition duration-500 ease-in-out"
              onClick={() => {
                passwordRef.current.select();
                navigator.clipboard.writeText(password);
              }}
            >
              Copy
            </button>
          </div>
          <input
            className="cursor-pointer"
            type="range"
            min="8"
            max="16"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <span>Length: {length}</span>
          <div className="pt-4 text-lg flex gap-4 justify-center items-center space-around">
            <input type="checkbox" checked={includeNum} onChange={(e) => setNum(e.target.checked)} /> <span>Numbers</span>
            <input type="checkbox" checked={includeChar} onChange={(e) => setChar(e.target.checked)} /> <span>Characters</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
