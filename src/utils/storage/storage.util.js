const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

const getData = (key) => {
  const data = localStorage.getItem(key)
  if (!data) return null
  const dataParse = JSON.parse(data)
  return dataParse
}

export default {
  saveData,
  getData,
}
