export const base64StringEncode = (string: string):string => {
    let buff = new Buffer(string);
    let base64data = buff.toString('base64');
    return base64data
}


