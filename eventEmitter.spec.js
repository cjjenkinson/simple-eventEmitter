/* eslint-env jest */

const eventEmitter = require('./eventEmitter')

describe('Event Emitter', () => {
  let emitter
  const callback1 = jest.fn()
  const callback2 = jest.fn()

  beforeEach(() => {
    emitter = eventEmitter();
    callback1.mockClear()
    callback2.mockClear()
  })

  it('passes data to registered callbacks', () => {
    emitter.on('event', callback1)
    emitter.on('click', callback2)

    emitter.emit('event', 'foo')
    emitter.emit('click', 'button')

    expect(callback1).toHaveBeenCalledTimes(1)
    expect(callback1).toHaveBeenCalledWith('foo')
    expect(callback2).toHaveBeenCalledTimes(1)
    expect(callback2).toHaveBeenCalledWith('button')
  })

  it('removes callback when it is unsubscibed', () => {
    const unSub = emitter.on('event', callback1)
    unSub();
    emitter.emit('event', 'foo')
    
    expect(callback1).not.toHaveBeenCalled()
  })

  it('does not call a callback twice', () => {
    emitter.on('click', callback1)
    emitter.on('click', callback1)
    emitter.emit('click', 'button')

    expect(callback1).toHaveBeenCalledTimes(1)
    expect(callback1).toHaveBeenCalledWith('button')
  })

  it('does not leak on sucessfull emit', () => {
    emitter.on('click', callback1)
    const result = emitter.emit('click', 'button')

    expect(result).toBeUndefined()
  })

});