import {HOST_URL} from '@/utils/hostUrl';
import {fetchGet, fetchPost} from '@/utils/fetchEnhance';


export const getAllApps = async () => {
    const response = await fetchGet(HOST_URL + '/api/app');
    // console.log(response);
    if (response.code != 0) {
        throw new Error('Failed to fetch design-tips');
    }
    return response.data;
};

export const validateLicenseKey = async (key: string) => {
    const response = await fetchPost(HOST_URL + '/api/validate-license/' + key);
    // console.log(response);
    if (response.code != 0) {
        throw new Error('Failed to fetch design-tips');
    }
    return response.data;
}


export const getFakeApps = async () => {
    return [
        {
            id: '7',
            name: 'UI前辈',
            description: '从网页开发和网页设计角度，输出界面和功能建议，提供高用户体验。',
            icon: '🥷',
        },
        {
            id: '5',
            name: 'svg画家',
            description: '按照你的指示用svg代码设计logo，并输出svg代码',
            icon: '🎨',
        },
        {
            id: '6',
            name: '创意工厂',
            description: '输入你想要设计的主题/问题、目标用户、设计需求，即可获得3个专业的设计idea',
            icon: '🍎',
        },
        {
            id: '1',
            name: '回复老板',
            description: '用婉转的方式回复老板，拒绝PUA从我做起',
            icon: '☺️',
        },
        {
            id: '2',
            name: '赛博佛祖',
            description: '佛祖在线帮你排忧解难，这位施主，你有什么烦恼？',
            icon: '🎱',
        },
        {
            id: '3',
            name: '广告语设计',
            description: '这款App能够生成好用的广告语，让你的广告语更加吸引人',
            icon: '📣',
        },
        {
            id: '4',
            name: '翻译',
            description: '这款App能够帮你翻译任何语言，让你的语言不再障碍你的交流',
            icon: '🌍',
        },
    ];
}
