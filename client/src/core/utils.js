const wrapMap = {
  option: [1, "<select multiple='multiple'>", "</select>"],
  legend: [1, "<fieldset>", "</fieldset>"],
  area: [1, "<map>", "</map>"],
  param: [1, "<object>", "</object>"],
  thead: [1, "<table>", "</table>"],
  tr: [2, "<table><tbody>", "</tbody></table>"],
  col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
  td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
  body: [0, "", ""],
  _default: [1, "<div>", "</div>"]
};
wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;
const str2DOMElement = (html) => {

  var match = /<\s*\w.*?>/g.exec(html);
  var element = document.createElement('div');
  if (match != null) {
    var tag = match[0].replace(/</g, '').replace(/>/g, '').split(' ')[0];
    if (tag.toLowerCase() === 'body') {
      var dom = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
      var body = document.createElement("body");
      // keeping the attributes
      element.innerHTML = html.replace(/<body/g, '<div').replace(/<\/body>/g, '</div>');
      var attrs = element.firstChild.attributes;
      body.innerHTML = html;
      for (var i = 0; i < attrs.length; i++) {
        body.setAttribute(attrs[i].name, attrs[i].value);
      }
      return body;
    } else {
      var map = wrapMap[tag] || wrapMap._default,
        element;
      html = map[1] + html + map[2];
      element.innerHTML = html;
      // Descend through wrappers to the right content
      var j = map[0] + 1;
      while (j--) {
        element = element.lastChild;
      }
    }
  } else {
    element.innerHTML = html;
    element = element.lastChild;
  }
  return element;
}



const isCustomElement = (node) => {
  return node.tagName && typeof customElements.get(node.tagName.toLowerCase()) != "undefined";
}


const isTemplate = (template) => {
  return (template instanceof HTMLScriptElement || template instanceof HTMLTemplateElement || typeof template === "string");
}
const getElementFromTemplate = (template) => {
  console.log()
  if (template instanceof HTMLScriptElement) {
    var clearInnerHTML = template.innerHTML.trim();

    var result = str2DOMElement(clearInnerHTML);
    return result;
  } else if (template instanceof HTMLTemplateElement) {
    var clone = document.importNode(template.content, true)
    return [...clone.childNodes].find((child) => child.nodeType === Node.ELEMENT_NODE)
  } else if (typeof template === "string") {
    return str2DOMElement(template)
  } else if (template instanceof HTMLElement) {
    return template.cloneNode(true)
  } else {
    throw new Error("Cannot get content of template")
  }
}

const set = (object, path, value) => {
  const split = path.split('.')
  const name = split.pop()
  for (const segment of split) {
    object = object[segment]
  }
  object[name] = value
}

const get = (object, path) => {
  path.split('.').forEach((s) => {
    object = object[s]
  })
  return object
}

const createFunction = (stringFunction, variables = {}) => {
  const functionArgs = []
  const variablesArgs = []

  for (var [name, value] of Object.entries(variables)) {
    functionArgs.push(name)
    variablesArgs.push(value)
  }
  functionArgs.push(stringFunction)
  return function () {

    const fn = Function.apply(null, functionArgs)
    return fn.apply(this, variablesArgs)
  }
}


const dashToCamel = (string) => string.replace(/-([a-z])/g, (g) => g[1].toUpperCase())

module.exports = {
  dashToCamel,
  createFunction,
  set,
  get,
  isCustomElement,
  isTemplate,
  getElementFromTemplate,
}