import styles from '@octane/styles/Table.module.scss'

export const Table = ({ children, isBordered }) => (
  <div className={styles.tableWrapper}>
    <table className={`${styles.table} ${isBordered && styles.bordered}`}>{children}</table>
  </div>
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

export const Cell = ({ width, children }) => <td style={{ ...(width && { width }) }}>{children}</td>

export default Table
