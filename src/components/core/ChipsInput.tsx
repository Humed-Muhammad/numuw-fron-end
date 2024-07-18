import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<any>;
  name: string;
  placeholder?: string;
  value?: Array<string | undefined>;
}
export const ChipsInput = ({
  name,
  setFieldValue,
  placeholder,
  value,
}: Props) => {
  const [chips, setChips] = useState<Array<string | undefined>>(value ?? []);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setChips([...chips, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleChipRemove = (chipToRemove: string) => {
    setChips(chips.filter((chip) => chip !== chipToRemove));
  };

  useEffect(() => {
    if (setFieldValue) {
      setFieldValue(name, chips);
    }
  }, [chips, setFieldValue, name]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 my-3">
        {chips?.map((chip) => (
          <div
            key={chip}
            className="chips bg-gray-500 text-white flex items-center rounded-full px-3 py-1"
          >
            {chip}
            <button
              className="ml-2 focus:outline-none"
              onClick={() => handleChipRemove(chip!)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <input
        className="border border-gray-300 rounded px-3 py-2 w-full"
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyPress}
      />
    </div>
  );
};

export default ChipsInput;
