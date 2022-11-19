import React, { useEffect, useRef, useState } from "react";
import { clickOutside } from "../utils/outSideClick";
import Select from "./InputWrapper";

interface optionsSelect {
  label: string | number;
  value: string | number;
}
interface customComboBox {
  className: string;
  onChange: (n: optionsSelect | Array<optionsSelect>) => void;
  isMulti: boolean;
  loadOptions: (n: string) => Promise<Array<optionsSelect>>;
  placeholder: string;
  isClearable: boolean;
  error: {
    error: boolean;
    message: string;
  };
}

const ComboCustom = ({
  className,
  isClearable,
  isMulti,
  loadOptions,
  onChange,
  placeholder,
  error,
}: customComboBox) => {
  const [isLoading, setIsLoading] = useState(0);
  const [valuesOut, setValuesOut] = useState<Array<string>>([]);

  const [optionsSelect, setOptionsSelect] = useState<string | Array<string>>(
    isMulti ? [] : ""
  );

  const [isOpen, setIsOpen] = useState(false);
  const [multiSelectOptions, setMultiSelectOptions] = useState<Array<string>>(
    []
  );

  const preventInit = useRef(true);

  const loadOptionsChange = async (e: any) => {
    const value = e;
    setIsLoading((n) => n + 1);
    const values = await loadOptions(value);
    values && setValuesOut(values.map((n) => n.value) as Array<string>);
    setIsLoading((n) => n - 1);
  };

  const onchangeOptions = (e: any) => {
    const value = e.target.value;
    loadOptionsChange(value);
    setOptionsSelect((n) => {
      if (isMulti) {
        return value;
      } else {
        return value;
      }
    });
  };

  const onselectOption = (value: string) => {
    setIsOpen(false);
    setValuesOut([]);
    setOptionsSelect((n) => {
      if (isMulti) {
        return n;
      } else {
        return value;
      }
    });
    if (isMulti) {
      setOptionsSelect("");
      setMultiSelectOptions((n) => [...n, value]);
    }
  };

  const formatOptions = (option: string) => {
    return {
      label: option,
      value: option,
    };
  };
  const formatOptionsList = (option: Array<string>) => {
    return option.map((n) => formatOptions(n));
  };

  const onChangeMapper = () => {
    onChange(
      !isMulti
        ? formatOptions(optionsSelect as string)
        : formatOptionsList(multiSelectOptions)
    );
  };

  const deleteMultySelect = (filter: string) => {
    setMultiSelectOptions((n) => n.filter((x) => x != filter));
  };
  const clearValues = () => {
    isMulti
      ? onChange([{ label: "", value: "" }])
      : onChange({ label: "", value: "" });
    setOptionsSelect(isMulti ? [] : "");
    setMultiSelectOptions([]);
  };

  useEffect(() => {
    if (!preventInit.current) {
      onChangeMapper();
    }
    preventInit.current = false;
  }, [multiSelectOptions, optionsSelect]);

  return (
    <Select
      className={`${className} relative`}
      onClick={(e) => {
        setIsOpen(true);
        clickOutside(() => {
          setIsOpen(false);
        }, e).addOnclick();
      }}
    >
      {isMulti &&
        Array.isArray(multiSelectOptions) &&
        multiSelectOptions.map((selectOption, index) => (
          <div
            key={index}
            className="p-1 mx-1 px-3 bg-gray-800 flex items-center gap-1 cursor-pointer"
          >
            {selectOption}
            {"         "}
            <span
              onClick={() => {
                deleteMultySelect(selectOption);
              }}
              className=""
            >
              x
            </span>
          </div>
        ))}
      <input
        className="bg-transparent border-none outline-none w-full "
        onChange={onchangeOptions}
        value={optionsSelect}
        placeholder={multiSelectOptions?.length === 0 ? placeholder : ""}
      />
      {isClearable && (
        <span
          className="cursor-pointer p-[2px]  px-2 bg-gray-700 rounded-md hover:bg-opacity-70 flex items-center justify-center"
          onClick={clearValues}
        >
          X
        </span>
      )}
      <div className="absolute top-[56px] z-20 w-full left-0 rounded-md">
        {isOpen && isLoading ? (
          <p className="py-3 px-5 cursor-pointer bg-gray-800 rounded-md">
            Loading...
          </p>
        ) : (
          isOpen && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="bg-gray-800 rounded-md"
            >
              {error.error ? (
                <></>
              ) : (
                valuesOut.map((value, index) => (
                  <div
                    key={index}
                    onClick={() => onselectOption(value)}
                    className=""
                  >
                    <p className="px-5 hover:bg-gray-700 cursor-pointer rounded-md py-[6px] transition-all duration-300 ease-in-out">
                      {value}
                    </p>
                  </div>
                ))
              )}
            </div>
          )
        )}
      </div>
    </Select>
  );
};

export default ComboCustom;
