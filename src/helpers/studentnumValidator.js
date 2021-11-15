export function studentnumValidator(studentnum) {
    if (!studentnum || !studentnum.match(/^\d{9}$/)) return "學號欄位錯誤。"
    return ''
  }