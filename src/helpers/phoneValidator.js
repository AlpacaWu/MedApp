export function phoneValidator(phone) {
  if (!phone || !phone.match(/^\d{10}$/)) return "電話欄位錯誤。"
  return ''
}
