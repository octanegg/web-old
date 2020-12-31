import { Box } from '@chakra-ui/core'
import ReactDatePicker from 'react-datepicker'
import { FilterLabel } from './Filter'
import styles from './Date.module.scss'

export const DateFilter = ({ width, label, date, onChange }) => {
  return (
    <Box direction="column" width={width} height={16} textAlign="left">
      <FilterLabel>{label}</FilterLabel>
      <ReactDatePicker
        selected={date}
        onChange={onChange}
        showPopperArrow={false}
        dateFormat="yyyy-MM-dd"
        className={styles.datepicker}
        isClearable
        placeholderText="Select..."
      />
    </Box>
  )
}
