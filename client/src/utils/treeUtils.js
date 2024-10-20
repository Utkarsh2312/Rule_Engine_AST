// src/utils.js
export function generateTreeHTML(node, prefix = '', isLeft = true, last = true) {
  if (!node) return '';

  // Construct the correct prefixes for each node
  let treeHTML = prefix;
  treeHTML += last ? '└── ' : '├── ';
  treeHTML += node.type === 'operator' ? node.operator : `${node.key} ${node.operator} ${node.value}`;
  treeHTML += '\n'; // Use newline for preformatted text

  // Update the prefix for the children
  prefix += last ? '    ' : '│   ';

  // Gather children nodes if they exist
  const children = [];
  if (node.left) children.push({ node: node.left, last: !node.right });
  if (node.right) children.push({ node: node.right, last: true });

  // Recursively generate HTML for each child node
  for (let i = 0; i < children.length; i++) {
    treeHTML += generateTreeHTML(children[i].node, prefix, true, children[i].last);
  }

  return treeHTML;
}
