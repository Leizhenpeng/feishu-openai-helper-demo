import {io_ui} from 'kiss-msg';
import {ref} from '@vue/reactivity';
import {changeLicenceKey, licenceKeyRef} from '@/ui.state';

export const saveOpenAIKey = (key: string) => {
  localStorage.setItem('openAIKey', key)
}

export const loadOpenAIKey = () => {
  // return localStorage.getItem('openAIKey') || ''
  return ''
}

export const saveLicenseKey = (key: string) => {
  io_ui?.send('UI_UPDATE_LICENCE', key)
  changeLicenceKey(key)
}

export const loadLicenseKey = () => {
  return licenceKeyRef.value
}

// todo: 需要和ui层通信，让用户输入license key


