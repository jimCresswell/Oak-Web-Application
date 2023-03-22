import React, { FC, useEffect, useState } from "react";
import { FieldErrorsImpl } from "react-hook-form";

import Box from "../../Box";
import Flex from "../../Flex";
import Radio from "../../RadioButtons/Radio";
import RadioGroup from "../../RadioButtons/RadioGroup";
import SchoolPicker from "../../SchoolPicker";
import useSchoolPicker from "../../SchoolPicker/useSchoolPicker";
import { Heading, P } from "../../Typography";

export type SchoolPickerRadioProps = {
  setSchool: (value: string) => void;
  errors?: Partial<
    FieldErrorsImpl<{
      school: string;
    }>
  >;
};

const SchoolPickerRadio: FC<SchoolPickerRadioProps> = ({
  setSchool,
  errors,
}) => {
  const [selectedRadio, setSelectedRadio] = useState("");
  const {
    selectedSchool,
    setSelectedSchool,
    schoolPickerInputValue,
    setSchoolPickerInputValue,
    schools,
  } = useSchoolPicker();

  useEffect(() => {
    if (selectedSchool) {
      setSelectedRadio("");
      setSchool(selectedSchool.toString());
    }
  }, [selectedSchool, setSchool]);

  const onRadioChange = (value: string) => {
    if (selectedSchool) {
      setSchoolPickerInputValue("");
    }
    setSelectedRadio(value);
    setSchool(value);
  };

  const onSchoolPickerInputChange = (value: React.SetStateAction<string>) => {
    if (value === "" && !selectedRadio) {
      setSchool("");
    }
    setSchoolPickerInputValue(value);
  };
  return (
    <>
      <Heading tag="h2" $font={"heading-5"} $mb={16} $mt={[24, 48]}>
        Your details
      </Heading>
      <Heading tag="h3" $font={"heading-7"} $mt={0} $mb={24}>
        Find your school in the field below (required)
      </Heading>
      <SchoolPicker
        hasError={errors?.school !== undefined}
        schoolPickerInputValue={schoolPickerInputValue}
        setSchoolPickerInputValue={onSchoolPickerInputChange}
        schools={schools}
        label={"Name of school"}
        setSelectedSchool={setSelectedSchool}
        required={true}
      />
      <Box $mt={12} $ml={24} $mb={32}>
        <P $mb={12} $font={"body-2"}>
          Or select one of the following:
        </P>
        <Flex>
          <RadioGroup
            validationState={"valid"}
            errorMessage={errors?.school?.message}
            aria-label={"home school or my school isn't listed"}
            value={selectedRadio}
            onChange={onRadioChange}
            hasError={errors?.school !== undefined}
          >
            <Radio data-testid={"radio-download"} value={"homeschool"}>
              Homeschool
            </Radio>
            <Radio value={"notListed"}>My school isn’t listed</Radio>
          </RadioGroup>
        </Flex>
      </Box>
    </>
  );
};

export default SchoolPickerRadio;