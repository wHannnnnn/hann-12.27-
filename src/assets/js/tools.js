const tools = {
    phoneReplace: (tel)=> {
        tel = "" + tel;
        var reg = /(\d{3})\d{4}(\d{4})/;
        var tel1 = tel.replace(reg, "$1****$2")
        return tel1
    }
}
export default tools