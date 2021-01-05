import { Flex, Image, Spinner, Text } from '@chakra-ui/core'
import styles from '@octane/styles/Table.module.scss'

export const Table = ({ children, isBordered }) => {
  return <table className={`${styles.table} ${isBordered && styles.bordered}`}>{children}</table>
}

export const Header = ({ children }) => {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  )
}

export const HeaderItem = ({ children, width, align, paddingLeft, onClick }) => {
  return (
    <th
      style={{
        ...(width && { width: width }),
        ...(onClick && { cursor: 'pointer' }),
        textAlign: align,
        padding: 4,
        paddingLeft: paddingLeft,
      }}
      onClick={onClick}>
      {children}
    </th>
  )
}

export const Body = ({ children }) => {
  return <tbody>{children}</tbody>
}

export const Row = ({ children, className }) => {
  return <tr className={styles[className]}>{children}</tr>
}

export const Cell = ({ children }) => {
  return <td>{children}</td>
}

export const ImageTwoTier = (props) => {
  const { src, prefix, label, description, reversed } = props
  return (
    <Flex
      direction={reversed ? 'row-reverse' : 'row'}
      marginLeft={2}
      marginRight={2}
      align="center"
      {...props}>
      {prefix && (
        <Flex justify="center" align="center" marginRight={2}>
          {prefix}
        </Flex>
      )}
      <Flex minWidth={6} display={{ base: 'none', sm: 'flex' }}>
        <Image height={6} src={src} />
      </Flex>
      <Flex
        direction="column"
        marginLeft={!reversed && 2}
        marginRight={reversed && 2}
        justify="flex-start"
        align={reversed ? 'flex-end' : 'flex-start'}>
        <Flex fontWeight="bold" fontSize="sm" align={reversed ? 'end' : 'start'}>
          {label}
        </Flex>
        {description && <Flex align={reversed ? 'end' : 'start'}>{description}</Flex>}
      </Flex>
    </Flex>
  )
}

export default Table
