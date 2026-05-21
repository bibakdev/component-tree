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

// ===== افزوده‌شده برای ActionBar =====
import { TreeNode } from '@/modules/tree-core/types';

export function buildTreeText(
  node: TreeNode,
  prefix = '',
  isLast = true,
  parentPrefix = ''
): string {
  const connector = isLast ? '└── ' : '├── ';
  let result = parentPrefix + connector + node.name + '\n';

  const childPrefix = parentPrefix + (isLast ? '    ' : '│   ');
  node.children.forEach((child, index) => {
    result += buildTreeText(
      child,
      childPrefix,
      index === node.children.length - 1,
      childPrefix
    );
  });

  return result;
}
