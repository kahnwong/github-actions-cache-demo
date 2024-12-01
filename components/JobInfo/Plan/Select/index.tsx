import { FC, InputHTMLAttributes, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { IOptions } from 'interfaces/Form'
import { Select } from 'components/JobInfo/style'
import { FormWrapper, FormLabel } from './style'

interface IFormSelect extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: IOptions[]
  theme?: string
  change: Function
  instanceId: string
}
const FormSelect: FC<IFormSelect> = ({
  label,
  options,
  theme,
  change,
  instanceId
}) => {
  const [optionSelect, setOptionSelect] = useState<IOptions | object>({})

  useEffect(() => {
    setOptionSelect(options[0])
  }, [options])

  const handleSelect = (value: IOptions) => {
    setOptionSelect(value)
    change(value)
  }

  return (
    <FormWrapper>
      <div>
        <FormLabel>{label}</FormLabel>
      </div>
      <div>
        <Select
          // theme={theme}
          isSearchable={false}
          placeholder='กรุณาเลือก'
          options={options}
          value={optionSelect}
          onChange={(option) => handleSelect(option as IOptions)}
          instanceId={instanceId}
          styles={{
            option: (styles, { isSelected }) => ({
              ...styles,
              backgroundColor: isSelected ? theme : '',
              ':hover': {
                ...styles[':active'],
                backgroundColor: theme ?? '#222529',
                color: '#ffffff',
                opacity: 0.7,
                cursor: 'pointer'
              }
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? theme ?? '#222529' : '#6C757D'
            })
          }}
        />
      </div>
    </FormWrapper>
  )
}

FormSelect.defaultProps = {
  label: undefined,
  theme: undefined
}
FormSelect.propTypes = {
  label: PropTypes.string,
  theme: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  change: PropTypes.func.isRequired,
  instanceId: PropTypes.string.isRequired
}

export default FormSelect
