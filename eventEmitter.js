const pubSub = () => {
  const subscribers = new Set()

  const sub = (fn) => {
    subscribers.add(fn)

    return () => subscribers.delete(fn)
  }

  const pub = (data) => subscribers.forEach((fn) => fn(data))

  return Object.freeze({ pub, sub })
}

module.exports = () => {
  const events = new Map()

  const on = (eventName, fn) => {
    if (!events.has(eventName)) {
      events.set(eventName, pubSub())
    }

    return events.get(eventName).sub(fn)
  }

  const emit = (eventName, data) => {
    events.has(eventName) && events.get(eventName).pub(data);
  }

  return Object.freeze({ on, emit })
}


