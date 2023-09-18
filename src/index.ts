import axios from "axios"
import {AccountOpts, MessageOpts} from "./types/Message";
import {waitTime} from "./utils/waitTime";

export type Webhooks = Record<string, string[]>

let webhooksRegistred: Webhooks = {}
let actualQueueEnd = 0

export function registerWebhookInCategory(category: string, url: string): void {
    if (webhooksRegistred[category]) {
        webhooksRegistred[category].push(url)
    } else {
        webhooksRegistred[category] = [url]
    }
}

function makeWebhookMessageBody(messageOptions: MessageOpts, accountOptions: AccountOpts | undefined, libraryOptions: {
    splitEmbedsToLimit: boolean
}): any[] {
    const messagesOptions = []
    const bodys: any[] = []

    const payloadJsonBase:any = {}

    if (accountOptions) {
        if (accountOptions.avatarUrl) payloadJsonBase.avatar_url = accountOptions.avatarUrl
        if (accountOptions.username) payloadJsonBase.username = accountOptions.username
    }

    if (libraryOptions.splitEmbedsToLimit && messageOptions.embeds && messageOptions.embeds.length > 10) {
        const messagesCount = Math.ceil(messageOptions.embeds.length / 10)
        for (let i = 0; i < messagesCount; i++) {
            const messageOptionsClone = {...messageOptions}
            messageOptionsClone.embeds = messageOptions.embeds.slice(i * 10, i * 10 + 10)
            messagesOptions.push(messageOptionsClone)
        }
    }else{
        messagesOptions.push(messageOptions)
    }

    for (const messageOptions of messagesOptions) {
        const body = {
            payload_json: ""
        }
        const payloadJson = {
            ...payloadJsonBase,
            ...messageOptions,
            embeds: messageOptions.embeds?.map(embed => {
                if (embed.color) {
                    const typeOfColor = typeof embed.color
                    if (typeOfColor === 'string') {
                        const embedColor = embed.color as string
                        embed.color = parseInt(embedColor.substring(1) || '0', 16)
                    }
                }
                return embed
            })
        }
        body.payload_json = JSON.stringify(payloadJson)
        bodys.push(body)
    }


    return bodys
}

export async function sendMessageToCategory(toCategory: string[] | string, messageData: MessageOpts, webhookAccountData?: AccountOpts) {
    const categories: string[] = []

    if (Array.isArray(toCategory)) {
        categories.push(...toCategory)
    } else {
        categories.push(toCategory)
    }

    const allWebhooksToSendUrls: string[] = []

    for (const category of categories) {
        const webhooksOnCategory = webhooksRegistred[category]
        if (!webhooksOnCategory) continue;
        for (const webhookUrl of webhooksOnCategory) {
            if(allWebhooksToSendUrls.includes(webhookUrl)) continue;
            allWebhooksToSendUrls.push(webhookUrl)
        }
    }

    const messagesBody = makeWebhookMessageBody(messageData, webhookAccountData, {
        splitEmbedsToLimit: true
    })

    const delayBetweenRequests = 1000

    const sendMessages = async () => {
        for (const webhookUrl of allWebhooksToSendUrls) {
            for (const messageBody of messagesBody) {
                await axios.post(webhookUrl, messageBody)
                await waitTime(delayBetweenRequests)
            }
        }
    }

    if (actualQueueEnd < Date.now()) {
        actualQueueEnd = Date.now() + (allWebhooksToSendUrls.length * messagesBody.length * delayBetweenRequests)

        await sendMessages()
    } else {
        const timeToAdd = delayBetweenRequests * messagesBody.length * allWebhooksToSendUrls.length
        actualQueueEnd += timeToAdd
        await waitTime(actualQueueEnd - Date.now() - timeToAdd)
        await sendMessages()
    }

}