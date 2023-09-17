import {registerWebhook, sendMessage} from "./index"

registerWebhook('global', 'https://discord.com/api/webhooks/574258181082185728/IKAh73erXeKarevghNg9h2xqPNtSp4gVWUkT7rTC8Q7bPfcv1_5bVkvda0OUUgKUeDHm')

for (let i = 0; i < 2; i++) {
    sendMessage('global', {
        content: `ola mundo ${i}`,
        embeds: [
            {
                title: `Titulo ${i}`,
                color: '#fffccc',
                provider: {
                    name: 'Provider name',
                    url: 'https://youtube.com'
                }
            }, {
                title: `Titulo ${i}`
            }, {
                title: `Titulo ${i}`
            }, {
                title: `Titulo ${i}`
            }, {
                title: `Titulo ${i}`
            }, {
                title: `Titulo ${i}`
            }, {
                title: `Titulo ${i}`
            }, {
                title: `Titulo ${i}`
            }, {
                title: `Titulo ${i}`
            }, {
                title: `Titulo ${i}`
            }, {
                title: `Titulo ${i} split`
            },
        ]
    }).then(console.log).catch(console.error)
}