import { client, env } from 'kiss-core'
import { io_hook as io } from 'kiss-msg'
import './utils/notification'
import { event } from './event'
import {firstParserConfig, updateNewConfig} from '@/code.state';

if (env.inMg) {
  client.mg.showUI(__html__, {
    width: 510,
    height: 850,
    visible: true,
  })
} else {
  client.figma.showUI(__html__, {
    width: 510,
    height: 825,
  })
}

if(!env.inMg){
    console.log(client.figma.currentUser);
    io?.send(event.CODE_UPDATE_USER_UUID, client.figma.currentUser?.id)
}

io?.on(event.UI_CLOSE, () => {
  client.mg.closePlugin()
})

io?.on(event.UI_INIT, () => {
  firstParserConfig().then((config) => {
    console.log('config', config)
    io?.send(event.CODE_INIT_CONFIG, config)
  })
})

io?.on(event.UI_UPDATE_LICENCE, (data) => {
    console.log('data', data)
    updateNewConfig(data)
})

io?.on(event.UI_QUERY_LICENCE, () => {
    firstParserConfig().then((config) => {
        const licence = config?.licence
        io?.send(event.UI_QUERY_LICENCE_BACK, licence)
    })
})

// io?.answer<Dto_Resize>('UI_CHANGE_SIZE', (data) => {
//   const sel = new SelParser().sel
//   const resizer = new IconResizer(sel, data)
//   resizer.run()
// })

// io?.on(event.UI_CHANGE_SIZE, (data) => {
//   const sel = new SelParser().sel
//   console.log(sel)
//   const resizer = new IconResizer(sel, data)
//   resizer.run()
// })
