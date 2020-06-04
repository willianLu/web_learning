class Vnode {
  constructor(tag, data, children, text, elm) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
  }
}

function normalizeChildren(children) {
  if (children && !Array.isArray(children)) {
    return [createTextNode(children)];
  }
  return children;
}

function createTextNode(text) {
  return new Vnode(undefined, undefined, undefined, String(text));
}

function createElement(tag, data, children) {
  return new Vnode(tag, data, normalizeChildren(children));
}

function createElm(vnode) {
  const { tag, data, children } = vnode;
  if (tag !== undefined) {
    vnode.elm = document.createElement(tag);
    if (data && data.attrs) {
      for (let key in data.attrs) {
        vnode.elm.setAttribute(key, data.attrs[key]);
      }
      if (children) {
        createChildren(vnode, children);
      }
    }
  } else {
    vnode.elm = document.createTextNode(vnode.text);
  }
  return vnode.elm;
}

function createChildren(vnode, children) {
  children.forEach((child) => vnode.elm.appendChild(createElm(child)));
}

function someNode(oldVnode, vnode) {
  // 为了简化算法，之判断tag是否相同
  return oldVnode.tag === vnode.tag;
}

function emptyVnode(elm) {
  return new Vnode(undefined, undefined, undefined, undefined, elm);
}

function patchVnode(oldVnode, vnode) {
  // 简化算法，默认子节点不变，只是数据变化
  vnode.elm = oldVnode.elm;
  const elm = oldVnode.elm;
  if (!vnode.text) {
    const oldCh = oldVnode.children;
    const ch = vnode.children;
    if (oldCh && ch) {
      updateChildren(oldCh, ch);
    }
  } else {
    elm.textContent = vnode.text;
  }
}

function updateChildren(oldChildren, children) {
  oldChildren.forEach((oldCh, index) => {
    patch(oldCh, children[index]);
  });
}

function patch(oldVnode, vnode) {
  const isRealNode = oldVnode.nodeType !== undefined;
  if (!isRealNode && someNode(oldVnode, vnode)) {
    patchVnode(oldVnode, vnode);
  } else {
    createElm(vnode);
    if (isRealNode) {
      oldVnode.appendChild(vnode.elm);
    } else {
      const parent = oldVnode.elm.parentNode;
      parent.insertBefore(vnode.elm, oldVnode.elm);
      parent.removeChild(oldVnode.elm);
    }
  }

  return vnode.elm;
}
