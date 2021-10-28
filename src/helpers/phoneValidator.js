export function phoneValidator(phone) {
  if (!phone || !phone.match(/^\d{10}$/)) return "電話欄位不可空。"
  return ''
}
