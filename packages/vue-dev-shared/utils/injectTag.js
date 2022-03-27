const replaceTemplate = (content, data) => {
  let newContent = content
  for(const key in data) {
    newContent = newContent.replace(new RegExp(key,'g'), data[key])
  }
  return newContent
}

const injectTag = (content, source, container = "body") => {
    const endTagReg = new RegExp(`</${container}>`);
    return source.replace(
      endTagReg,
      `${content} \n </${container}>`
    );
  };

  module.exports = {
    replaceTemplate,
    injectTag
  }