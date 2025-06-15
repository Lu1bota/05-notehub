import { useState } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (query: string) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  const [value, setValue] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    onChange(event.target.value);
  }
  return (
    <>
      <input
        className={css.input}
        value={value}
        onChange={handleChange}
        type="text"
        placeholder="Search notes"
      />
    </>
  );
}
