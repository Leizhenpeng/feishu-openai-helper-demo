/**
 * @name: ui.state.ts
 * @author: river
 * @date: 2023/3/19 5:15 PM
 * @contact: laolei@forkway.cn
 * @description：
 */
import {computed, ref} from '@vue/reactivity';
import {io_ui as io} from 'kiss-msg';
import {event as e} from '@/event';


io?.on(
    e.CODE_INIT_CONFIG, (data) => {
       changeLicenceKey(data.licence)
        console.log(data);
    },
)

io?.on(
    e.UI_QUERY_LICENCE_BACK, (data) => {
        changeLicenceKey(data)
    })

export const licenceKeyRef = ref('')

export const ifShowLicenseKey  = computed(() => {
    return licenceKeyRef.value === ''
})

export const changeLicenceKey = (key: string) => {
    licenceKeyRef.value = key
}



export const userUUID = ref('')
io?.on(e.CODE_UPDATE_USER_UUID, (data) => {
    userUUID.value = data||''
})
