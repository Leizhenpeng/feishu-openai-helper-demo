

// import superjson from 'superjson'
import { z } from 'zod'


//todo use superjson
export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '' // 浏览器应该使用相对路径
  if (import.meta.env.VITE_VERCEL_URL) return `https://${import.meta.env.VITE_VERCEL_URL}` // SSR 应该使用 Vercel 的 URL
  return `http://localhost:${import.meta.env.VITE_PORT ?? 3000}` // 开发环境中 SSR 应该使用 localhost
}



export const createAppSchema = z.object({
  icon: z.string().emoji({message: '输入一个超可爱的 emoji 吧~'}),
  name: z.string().min(1,{ message: '给锦囊起一个萌萌哒的名字吧~' }),
  description: z.string().min(1,{ message: '输入一个超好懂的简介哦~' }),
  prompt: z.string().min(1,{ message: '输入一条超神奇的咒语吧~' }),
  demoInput: z.string().min(1,{ message: '输入一个示例唤醒语吧~' }),
});


