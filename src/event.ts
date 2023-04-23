import type { MsgDto } from 'kiss-msg'

const notifyEvent = () => {
  return {
    NOTIFY: 'NOTIFY',
    WARN: 'WARN',
  }
}

const commonEvent = () => {
  return {
    UI_INIT: 'UI_INIT',
    UI_CLOSE: 'UI_CLOSE',
    CODE_INIT_CONFIG: 'CODE_INIT_CONFIG',
  }
}

const customEvent = () => {
  return {
    UI_UPDATE_LICENCE: 'UI_UPDATE_LICENCE',
    UI_QUERY_LICENCE: 'UI_QUERY_LICENCE',
    UI_QUERY_LICENCE_BACK: 'UI_QUERY_LICENCE_BACK',
    CODE_UPDATE_USER_UUID: 'CODE_UPDATE_USER_UUID',
  }
}

export const event = {
  ...notifyEvent(),
  ...commonEvent(),
  ...customEvent(),
}

export interface Dto_Resize extends MsgDto {
  msg: 'UI_CHANGE_SIZE'
  body: {
    iconSize: number
    boxSize: number
  }
}

export { event as e }
