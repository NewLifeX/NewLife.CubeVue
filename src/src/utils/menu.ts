import Storage from '@/utils/storage'

const Key = 'menu'

export function getMenu(): any | null {
  const u = Storage.getItem(Key)
  if (u) {
    return JSON.parse(u)
  }

  return null
}

export function setMenu(value: object) {
  return Storage.setItem(Key, JSON.stringify(value))
}

export function removeMenu() {
  return Storage.removeItem(Key)
}
