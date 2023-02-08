import { FC } from "react";
import { Item } from "react-stately";

import SearchComboBox from "../SearchComboBox/SearchComboBox";

type SchoolPickerProps = {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  schools: School[];
  defaultSchools?: School[];
  label: string;
};

export type School = {
  name: string;
  urn: string;
  la: string;
};

/**
 * A React aria combo box component school picker
 * use useSchoolPicker hook to fetch data and control input.
 *
 * ## Hook
 * const { inputValue, setInputValue, data } = useSchoolPicker();
 *
 * ## Usage
 * Used on downloads page
 */
const SchoolPicker: FC<SchoolPickerProps> = (props) => {
  return (
    <SearchComboBox
      allowsCustomValue
      label={props.label}
      inputValue={props.inputValue}
      onInputChange={props.setInputValue}
      defaultItems={props.schools || []}
    >
      {(item) => (
        <Item
          key={`${item.urn}-${item.name}`}
        >{`${item.name}, ${item.la}`}</Item>
      )}
    </SearchComboBox>
  );
};

export default SchoolPicker;
