export function passwordValidator(password) {
  if (!password) return "密碼欄位不可空。"
  if (password.length < 5) return 'Password must be at least 5 characters long.'
  return ''
}
