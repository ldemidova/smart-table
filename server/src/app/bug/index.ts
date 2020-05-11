
import { bugViewHandler } from './view'
import { bugRecordHandler } from './record'


const bugHandler = {
  ...bugViewHandler,
  ...bugRecordHandler
}


export {
  bugHandler
}
