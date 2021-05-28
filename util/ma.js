export const ma = (data, field, size) => {
  const res = []
  if (data.length >= size) {
    let i = 0
    let sum = 0
    while (i < data.length) {
      if (i >= size) {
        res.push({ ...data[i - 1], [field]: sum / size })
        sum -= parseFloat(data[i - size][field])
      }
      sum += parseFloat(data[i][field])
      i += 1
    }
    res.push({ ...data[i - 1], [field]: sum / size })
  }

  return res
}

export default ma
