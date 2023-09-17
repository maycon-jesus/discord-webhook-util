export function waitTime(time:number): Promise<void>{
    return new Promise<void>((resolve)=>{
        setTimeout(()=>{
            resolve()
        }, time)
    })
}