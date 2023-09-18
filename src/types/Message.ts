export type EmbedType = Partial<{
    title: string,
    type: 'rich',
    description: string,
    url: string,
    timestamp: string,
    color: `#${string}`|number,
    footer: {
        text: string,
        icon_url?: string,
        proxy_icon_url?: string
    },
    image: {
        url: string,
        proxy_url: string,
        height?: number,
        width?: number
    },
    thumbnail: {
        url: string,
        proxy_url: string,
        height?: number,
        width?: number
    },
    video: {
        url: string,
        proxy_url: string,
        height?: number,
        width?: number
    },
    provider: {
        name?: string,
        url?: string
    },
    author: {
        text: string,
        icon_url?: string,
        proxy_icon_url: string
    },
    fields: {
        name: string,
        value: string,
        inline: boolean
    }[]
}>

export type MessageOpts = {
    content?: string,
    embeds?: EmbedType[],
    allowedMentions?: {
        parse: ("roles" | "users" | "everyone")[]
    },
    thread_name?:string
}

export type AccountOpts = {
    username?: string,
    avatarUrl?: string
}