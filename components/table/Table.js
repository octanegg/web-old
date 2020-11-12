import { Flex, Image, Spinner, Text } from '@chakra-ui/core'
import styles from './Table.module.scss'

export const Table = ({ children }) => {
  return <table className={styles.table}>{children}</table>
}

export const Header = ({ children }) => {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  )
}

export const HeaderItem = ({ children, width }) => {
  return <th style={{ ...(width && { width: width }) }}>{children}</th>
}

export const Body = ({ children }) => {
  return <tbody>{children}</tbody>
}

export const Row = ({ children }) => {
  return <tr>{children}</tr>
}

export const Cell = ({ children }) => {
  return <td>{children}</td>
}

export const Loading = () => {
  return (
    <Flex
      width="full"
      justify="center"
      align="center"
      height="sm"
      backgroundColor="white"
      border="main">
      <Spinner width={24} height={24} color="secondary.800" />
    </Flex>
  )
}

export const ImageTwoTier = (props) => {
  const { src, prefix, label, description, reversed } = props
  return (
    <Flex direction={reversed ? 'row-reverse' : 'row'} align="center" {...props}>
      {prefix && (
        <Flex fontSize="xs" fontStyle="italic">
          {prefix}
        </Flex>
      )}
      <Flex minWidth={6} marginLeft={2} display={{ base: 'none', sm: 'flex' }}>
        <Image height={6} src={src} />
      </Flex>
      <Flex
        direction="column"
        marginLeft={2}
        justify="flex-start"
        align={reversed ? 'flex-end' : 'flex-start'}>
        <Text fontWeight="bold" fontSize="sm" align={reversed ? 'end' : 'start'}>
          {label}
        </Text>
        <Text
          fontWeight="regular"
          fontStyle="italic"
          fontSize="xs"
          align={reversed ? 'end' : 'start'}>
          {description}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Table
