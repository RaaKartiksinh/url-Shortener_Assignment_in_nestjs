export function generateRandomString(length: number): string {
  const charset: string =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result: string = '';
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
}
