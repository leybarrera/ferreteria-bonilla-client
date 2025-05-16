const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

const getData = (key) => {
  const data = localStorage.getItem(key)
  if (!data) return null
  const dataParse = JSON.parse(data)
  return dataParse
}

const updateData = (key, data) => {
  const storage = getData(key)
  const { token } = storage

  const newStorage = {
    user: data,
    token: token,
  }
  saveData(key, newStorage)
}

const removeData = (key) => {
  localStorage.removeItem(key)
}

export default {
  saveData,
  getData,
  updateData,
  removeData,
}
