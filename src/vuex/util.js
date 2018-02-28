/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  return window.sessionStorage.setItem('name', content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.sessionStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  return window.sessionStorage.removeItem(name)
}
