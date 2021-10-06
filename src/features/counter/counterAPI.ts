interface Data {
  data: number
}

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1): Promise<Data> {
  return new Promise<{ data: number }>(resolve => setTimeout(() => resolve({ data: amount }), 500))
}
