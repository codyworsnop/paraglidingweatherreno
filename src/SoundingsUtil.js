export const GetSoundingsDateLink = () => {
    const baseLink = "https://www.spc.noaa.gov/exper/soundings/"
    const extension = "_OBS/REV.gif"
    const date = new Date() //21091312
    const year = date.getUTCFullYear().toString().substr(-2)
    let month = (date.getUTCMonth() + 1).toString()
    const day = date.getUTCDate()
    let time = "12"; 

    if (month.length === 1) {
        month = "0" + month 
    }

    if (date.getUTCHours() < 12) { 
        time = "00"
    }
    console.log( baseLink + year + month + day + time + extension)
    return baseLink + year + month + day + time + extension
}