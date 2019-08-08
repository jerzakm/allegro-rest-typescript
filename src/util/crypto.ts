export const base64StringEncode = (string: string):string => {
    let buff = Buffer.from(string);
    let base64data = buff.toString('base64');
    return base64data
}


