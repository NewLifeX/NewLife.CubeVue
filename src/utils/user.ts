import Storage from '@/utils/storage'

const Key = 'userInfo'

export function getUserInfo(): any | null {
  const u = Storage.getItem(Key)
  if (u && u !== 'undefined') {
    return JSON.parse(u)
  }

  return null
}

export function setUserInfo(value: object) {
  return Storage.setItem(Key, JSON.stringify(value))
}

export function removeUserInfo() {
  return Storage.removeItem(Key)
}
