const eventEmitter = require('./eventEmitter')

// Event Emitter

const events = eventEmitter()

events.on('click', (target) => {
  console.log(`${target} element was clicked`)
})

events.emit('click', 'button')
// => button element was clicked

events.on('hover', (target) => {
  console.log(`${target} hovered state active`)
})
// => button element was clicked

events.emit('hover', 'link')
// => link hovered state active

const unSub= events.on('update', (value) => {
  console.log(`Updated to ${value}`)
})

events.emit('update', 2018)
// => Updated to 2018

unSub()

events.emit('change', 1968)
// event unsubscribed, no change