import { FC, InputHTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import { IOptions } from 'interfaces/Form'
import FormError from 'components/Form/Error'
import { FormWrapper, FormLabel, FormHelper } from '../style'
import { SelectBox } from './style'

interface IFormSelect extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helper?: string
  options: IOptions[]
  theme?: string
  change: Function
  mapOptions?: Boolean
  instanceId: string
}

const FormSelect: FC<IFormSelect> = ({
  label,
  error,
  helper,
  options,
  required,
  theme,
  value,
  change,
  mapOptions,
  instanceId
}) => (
  <FormWrapper>
    <div>
      <FormLabel required={required}>{label}</FormLabel>
      {helper && <FormHelper>({helper})</FormHelper>}
    </div>
    <SelectBox
      theme={theme}
      isSearchable={false}
      placeholder='กรุณาเลือก'
      options={options}
      classNamePrefix='react-select'
      onChange={(option) => change(option)}
      instanceId={`${instanceId}`}
      value={
        mapOptions ? options.find((option) => option.value === value) : value
      }
      styles={{
        option: (styles, { isSelected }) => ({
          ...styles,
          background: isSelected ? theme ?? '#222529' : 'white',
          ':hover': {
            ...styles[':active'],
            background: theme ?? '#222529',
            color: '#ffffff',
            opacity: 0.7,
            cursor: 'pointer'
          }
        })
      }}
    />
    <FormError type='invalid' label={error} />
  </FormWrapper>
)

FormSelect.defaultProps = {
  label: undefined,
  error: undefined,
  helper: undefined,
  theme: undefined,
  mapOptions: false
}
FormSelect.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  helper: PropTypes.string,
  theme: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  instanceId: PropTypes.string.isRequired
}

export default FormSelect
