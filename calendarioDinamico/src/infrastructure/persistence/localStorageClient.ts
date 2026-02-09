export class LocalStorageClient {
  load<T>(key: string): T | null {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  }

  save<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
