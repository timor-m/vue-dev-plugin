const TEMPLATE_DATA = require("./templateData")

const replaceTemplate = (content, data) => {
  let newContent = content
  for(const key in data) {
    newContent = newContent.replace(new RegExp(key,'g'), data[key])
  }
  return newContent
}

const injectContent = (source, assets, data) => {
  for (const key in assets) {
    const { content, container } = assets[key];
    let newContent = replaceTemplate(content, data)
    source = injectTag(newContent, source, container);
  }

  return source;
};

const injectTag = (content, source, container = "body") => {
    const endTagReg = new RegExp(`</${container}>`);
    return source.replace(
      endTagReg,
      `${content} \n </${container}>`
    );
  };

  module.exports = {
    replaceTemplate,
    injectTag,
    injectContent
  }