export type GenerateApiInput = {
    userInput: string
    id?: string
    prompt?: string
    userKey?: string
}


export type CreateInputs = {
    name: string
    description: string
    icon: string
    demoInput: string
    prompt: string
}

export type AppBaseInfo = {
    id: string
    name: string
    description: string
    icon: string
    demoInput: string
}
