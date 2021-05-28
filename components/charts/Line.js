import {
  CartesianGrid,
  Line,
  LineChart as LChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import moment from 'moment'

export const LineChart = ({ data, keys }) => (
  <ResponsiveContainer width="90%" height={400}>
    <LChart
      data={data}
      margin={{
        top: 30,
        bottom: 30,
      }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        tick={{ fontSize: '12px' }}
        tickCount={96}
        domain={[data[0].date, data[data.length - 1].date]}
        tickFormatter={(unixTime) => moment(unixTime).format('MMM D YYYY')}
        dataKey="date"
        type="number"
      />
      <YAxis tick={{ fontSize: '12px' }} domain={['auto', 'auto']} />
      {keys.map((key) => (
        <Line name={key} type="monotone" dataKey={key} stroke="#30C97B" dot={false} />
      ))}
    </LChart>
  </ResponsiveContainer>
)

export default LineChart
