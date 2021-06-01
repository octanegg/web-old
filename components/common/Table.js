import styles from '@octane/styles/Table.module.scss'

export const Table = ({ children, isBordered }) => (
  <table className={`${styles.table} ${isBordered && styles.bordered}`}>{children}</table>
)

export const Header = ({ children }) => (
  <thead>
    <tr>{children}</tr>
  </thead>
)

export const HeaderItem = ({ children, align, paddingLeft, onClick }) => (
  <th
    style={{
      ...(onClick && { cursor: 'pointer' }),
      textAlign: align,
      padding: 4,
      paddingLeft,
    }}
    onClick={onClick}>
    {children}
  </th>
)

export const Body = ({ children }) => <tbody>{children}</tbody>

export const Row = ({ children, className }) => <tr className={styles[className]}>{children}</tr>

export const Cell = ({ width, backgroundColor, children }) => (
  <td style={{ ...(width && { width }), ...(backgroundColor && { backgroundColor }) }}>
    {children}
  </td>
)

export default Table
