/**
 * تولید پیشوند یک گره در عمق مشخص
 * @param parentPrefix  رشتهٔ پیشوندی که از والد به ارث رسیده
 * @param isLast        آیا گره آخرین فرزند است؟
 * @returns              پیشوند نهایی برای خط جاری
 */
export function buildNodePrefix(parentPrefix: string, isLast: boolean): string {
  return parentPrefix + (isLast ? '└── ' : '├── ');
}

/**
 * تولید پیشوند فرزندان (برای عمق بعدی)
 * @param parentPrefix  پیشوند فعلی
 * @param isLast        آیا گره آخرین است؟
 * @returns              پیشوندی که به فرزندان ارسال می‌شود
 */
export function getChildPrefix(parentPrefix: string, isLast: boolean): string {
  return parentPrefix + (isLast ? '    ' : '│   ');
}
