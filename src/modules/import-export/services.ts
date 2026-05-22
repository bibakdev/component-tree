import { TreeNode } from '@/modules/tree-core/types';
import { createNode } from '@/modules/tree-core/services';

export function parseTreeText(text: string): TreeNode | null {
  const lines = text.split('\n').filter((line) => line.trim() !== '');
  if (lines.length === 0) return null;

  const stack: TreeNode[] = [];
  let newRoot: TreeNode | null = null;
  const firstLine = lines[0];
  const firstConnector = firstLine.match(/^[├└]── /);
  const rootHasConnector = !!firstConnector;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const connectorMatch = line.match(/[├└]── /);
    let depth: number;
    let name: string;

    if (!connectorMatch) {
      if (i === 0 && !rootHasConnector) {
        depth = 0;
        name = line.trim();
      } else if (/^[│\s]+$/.test(line)) {
        continue;
      } else {
        throw new Error('خط بدون نشانگر فقط برای ریشه مجاز است');
      }
    } else {
      const connectorIndex = connectorMatch.index!;
      const prefix = line.substring(0, connectorIndex);
      if (i === 0 && rootHasConnector) {
        depth = 0;
        name = line
          .substring(connectorIndex)
          .replace(/^[├└]── /, '')
          .trim();
      } else {
        if (prefix.length === 0) {
          if (!rootHasConnector && newRoot) depth = 1;
          else throw new Error('پیشوند نامعتبر');
        } else {
          const blockCount = prefix.length / 4;
          if (!Number.isInteger(blockCount))
            throw new Error('طول پیشوند باید مضربی از ۴ باشد');
          depth = rootHasConnector ? blockCount : blockCount + 1;
        }
        name = line
          .substring(connectorIndex)
          .replace(/^[├└]── /, '')
          .trim();
      }
    }

    const node = createNode(name);
    if (depth === 0) {
      if (newRoot) throw new Error('تنها یک ریشه می‌تواند وجود داشته باشد');
      newRoot = node;
      stack.length = 0;
      stack.push(node);
    } else {
      while (stack.length > depth) stack.pop();
      if (stack.length !== depth)
        throw new Error(`والد در عمق ${depth - 1} پیدا نشد`);
      const parent = stack[stack.length - 1];
      parent.children.push(node);
      stack.push(node);
    }
  }

  return newRoot;
}
