import { User } from './type';

export function generateUniqueUser(template: User): User {
  if (!template || !template.firstName || !template.lastName || !template.email) {
    throw new Error('Invalid user template provided');
  }
  const email = `ytz_${Math.random().toString(20).substring(2, 8)}@email.com`;

  return {
    firstName: `${template.firstName}_${randomString()}`,
    lastName: `${template.lastName}_${randomString()}`,
    email,
    password: `${generateStrongPassword()}`,
    phone: `${generateRandomPhone()}`,
  };
}

function generateRandomPhone(): string {
  const areaCode = Math.floor(100 + Math.random() * 900); // 3 digits
  const prefix = Math.floor(100 + Math.random() * 900); // 3 digits
  const lineNumber = Math.floor(1000 + Math.random() * 9000); // 4 digits
  return `${areaCode}${prefix}${lineNumber}`;
}

function generateStrongPassword(length: number = 15): string {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const symbols = '@';

  // Ensure at least one of each required character type
  const mustHave = [
    upper[Math.floor(Math.random() * upper.length)],
    digits[Math.floor(Math.random() * digits.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];

  const allChars = upper + lower + digits + symbols;
  const remainingLength = length - mustHave.length;
  const remaining = Array.from({ length: remainingLength }, () =>
    allChars.charAt(Math.floor(Math.random() * allChars.length))
  );

  // Shuffle the final password
  const fullPassword = [...mustHave, ...remaining].sort(() => Math.random() - 0.5).join('');

  return fullPassword;
}

export function randomString(length = 6): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}
