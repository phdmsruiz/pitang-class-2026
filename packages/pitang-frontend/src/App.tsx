import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

type HeaderProps = {
  description?: string;
  title: string;
  onClick: () => void;
};

function Divider() {
  return <hr />;
}

function Header({ description, title, onClick }: HeaderProps) {
  return (
    <div>
      <h1 className="text-8xl">{title}</h1>
      <p>{description}</p>

      <button onClick={onClick}>Click me</button>

      <Divider />
    </div>
  );
}

function Counter() {
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <div>
      {counter}

      <button onClick={increment}>+</button>
    </div>
  );
}

function GoToFileInput() {
  const [input, setInput] = useState("");

  function onChange(event) {
    setInput(event.target.value);
  }

  function onClickGoToFile() {
    alert(input);
  }

  return (
    <div>
      <h6>{input}</h6>

      <input
        id="goToFile"
        name="goToFile"
        placeholder="Go to file"
        onChange={onChange}
        value={input}
      ></input>

      <button onClick={onClickGoToFile}>Search</button>
    </div>
  );
}

export default function App() {
  return (
    <Fragment>
      <Header
        title="My first component"
        onClick={function () {
          alert("Cliquei no header");
        }}
      />

      {/* <Counter /> */}

      <GoToFileInput />
    </Fragment>
  );
}
