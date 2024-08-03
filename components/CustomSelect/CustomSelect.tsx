import React, { useState } from 'react';
import Select, { components } from 'react-select';
import styles from './CustomSelect.module.scss';
import Image, { StaticImageData } from 'next/image';

interface OptionType {
    value: string;
    label: string;
    icon?: StaticImageData;
}

interface CustomSelectProps {
    options: OptionType[];
    setSelectedValue: (value: string) => void;
    value: OptionType | null;
}

const customStyles = {
    control: (base, state) => ({
        ...base,
        borderRadius: 0,
        border: state.isFocused ? 0 : 0,
        boxShadow: state.isFocused ? 0 : 0,
        cursor: 'pointer',
        '&:hover': {
            border: state.isFocused ? 0 : 0
        }
    }),
    menu: base => ({
        ...base,
        borderRadius: 10,
        marginLeft: -7,
        padding: 5,
        overflow: 'hidden',
        marginTop: 10,
        backgroundColor: 'white'
    }),
    menuList: base => ({
        ...base,
        width: "600px",
        borderRadius: 10,
        border: 'none',
        boxShadow: 30,
        backgroundColor: 'white'
    }),
    option: (base, state) => ({
        ...base,
        borderRadius: 10,
        height: "60px",
        width: "97%",
        marginLeft: 2,
        marginTop: 2,
        backgroundColor: state.isSelected ? 'rgba(0, 0, 0, 0.05)' : '#fff',
        border: 0,
        boxShadow: 0,
        cursor: 'pointer',
        color: '#000',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '&:hover': {
            border: state ? 0 : 0,
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
        }
    }),
    dropdownIndicator: base => ({
        ...base,
        color: "rgba(0, 0, 0, 0.5)"
    }),
    indicatorSeparator: base => ({
        ...base,
        display: 'none',
    }),
};

const Option = (props: any) => (
  <components.Option {...props}>
      <div className={styles.option}>
          {props?.data?.icon ? (
            <Image src={props.data.icon} alt={props.data.label} className={styles.optionLogo} />
          ) : null}
          {props.data.label}
      </div>
  </components.Option>
);

const CustomSelect: React.FC<CustomSelectProps> = ({ options, setSelectedValue }) => {
    const [value, setValue] = useState<OptionType | null>(options[0] || null);

    const handleChange = (selectedOption: OptionType | null) => {
        setSelectedValue(selectedOption ? selectedOption.value : '');
        setValue(selectedOption)
    };

    const SingleValue = (props: any) => (
      <components.SingleValue {...props}>
          <div className={styles.option}>
              {value?.icon ? (
                <Image src={value.icon} alt={value.label} className={styles.optionLogo} />
              ) : null}
              {props.children}
          </div>
      </components.SingleValue>
    );

    return (
      <div>
          <Select
            value={value}
            options={options}
            onChange={handleChange}
            className={styles.selectInput}
            styles={customStyles}
            components={{
                Option,
                SingleValue
            }}
          />
      </div>
    );
};

export default CustomSelect;
