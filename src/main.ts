import {
  attributeRegexp,
  blockElements,
  decodeRegexp,
  defaultIgnoreElements,
  defaultTransMap,
  endElementRegexp,
  errorMap,
  selfClosingElementRegexp,
  selfClosingElements,
  startElementRegexp,
} from "./const";
import { AttrsMapType, ConfigType, ErrorType, JsonDataType } from "./types";

class MiniParser {
  private readonly config;
  constructor(htmlStr: string, config?: ConfigType) {
    this.config = config || {};
    return htmlStr ? this.steps(htmlStr) : "";
  }

  // 处理步骤
  steps(htmlStr: string) {
    const decodedHtml = this.decodeHtml(htmlStr);
    const jsonData = this.htmlToJson(decodedHtml);
    return this.jsonToSkeleton(jsonData);
  }

  // 替换被转义的字符串
  decodeHtml(htmlStr: string) {
    if (!htmlStr) return "";
    decodeRegexp.forEach((item) => {
      const [_regexp, replacement] = item;
      htmlStr = htmlStr.replace(_regexp, replacement);
    });
    return htmlStr;
  }

  // 是否为合规元素
  isInvalidElement(name: string): boolean {
    const { ignoredElement = defaultIgnoreElements } = this.config;
    return ignoredElement.includes(name);
  }

  // 是否是自闭合标签
  isSelfClosingElement(str: string, name: string): boolean {
    return (
      selfClosingElementRegexp.test(str) || selfClosingElements.includes(name)
    );
  }

  // 将元素名进行转换
  formatElementName(name: string): string {
    const { transMap = defaultTransMap } = this.config;
    if (name in transMap) return transMap[name];
    return "view";
  }

  // 根据配置项处理属性
  attributeProcessor(
    attrsMap: { [key: string]: any },
    elementName: string
  ): AttrsMapType {
    const { format = {} } = this.config;
    // 如果存在对应的格式化配置
    if (format[elementName]) {
      // 对应元素配置项
      const formatConfig = format[elementName];
      // 设置/调用每一个配置项
      Object.keys(formatConfig).forEach((item) => {
        const formatFactory = formatConfig[item];
        // 如果是配置项是函数，则调用，若为其他则直接赋值
        if (typeof formatFactory === "function") {
          attrsMap[item] = formatFactory(attrsMap[item]);
        } else {
          attrsMap[item] = formatFactory;
        }
      });
    }
    return attrsMap;
  }

  // 将属性字符串转为对象
  formatAttributes(str: string, elementName: string): AttrsMapType {
    if (!str) return {};
    // 正则匹配属性
    let attrsMap: AttrsMapType = {};
    str.replace(
      attributeRegexp,
      function (_match, name: string, value: string) {
        const args = Array.prototype.slice.call(arguments);
        if (args.length >= 3) {
          // 将属性值进行格式化
          console.log(value);
          attrsMap[name] = value ? value.replace(/(^|[^\\])"/g, '$1\\"') : "";
        }
        return "";
      }
    );
    return this.attributeProcessor(attrsMap, elementName);
  }

  // 更新解析字符串
  updateHtmlStr(decodedHtml: string, str: string) {
    return decodedHtml.substring(str.length);
  }

  // 解析html字符串并转为json结构
  htmlToJson(decodedHtml: string) {
    const jsonData = [];

    try {
      while (decodedHtml) {
        // 如果是结束标签
        if (decodedHtml.indexOf("</") === 0) {
          const match = decodedHtml.match(endElementRegexp);
          if (!match) continue;
          const [str, name] = match;
          // 去除当前匹配字符串的新字符串
          const newStr = this.updateHtmlStr(decodedHtml, str);
          // 判断元素是否需要解析
          if (this.isInvalidElement(name)) {
            // 去掉当前解析的字符
            decodedHtml = newStr;
            continue;
          }
          decodedHtml = newStr;
          // 判断是否是自闭合标签
          const selfClosing = selfClosingElements.includes(name);
          // 将当前数据追加到数组
          jsonData.push({
            type: selfClosing ? "selfClosing" : "end",
            name: this.formatElementName(name),
            originName: name,
          });
          continue;
        }

        // 如果是起始标签
        if (decodedHtml.indexOf("<") === 0) {
          const match = decodedHtml.match(startElementRegexp);
          if (!match) continue;
          // 如果是起始标签，需要额外考虑属性
          const [str, name, attrString = ""] = match;
          // 去除当前匹配字符串的新字符串
          const newStr = this.updateHtmlStr(decodedHtml, str);
          // 判断元素是否需要解析
          if (this.isInvalidElement(name)) {
            // 去掉当前解析的字符
            decodedHtml = newStr;
            continue;
          }
          // 去掉当前解析的字符
          decodedHtml = newStr;
          // 判断是否是自闭合标签
          const selfClosing = this.isSelfClosingElement(str, name);
          // 获取属性
          const attrs = this.formatAttributes(attrString, name);
          // 配置display属性
          let display = blockElements.includes(name) ? "block" : "inline";
          // 将当前数据追加到数组
          jsonData.push({
            type: selfClosing ? "selfClosing" : "start",
            name: this.formatElementName(name),
            originName: name,
            attrs,
            display,
          });
          continue;
        }

        // 寻找<符号，将之前的字符视为文字
        const index = decodedHtml.indexOf("<");
        const isExist = index < 0;
        let content = isExist ? decodedHtml : decodedHtml.substring(0, index);
        decodedHtml = isExist ? "" : decodedHtml.substring(index);
        jsonData.push({
          type: "text",
          name: "text",
          // 允许使用配置项的文字转换函数
          attrs: this.attributeProcessor({ content }, "text"),
        });
      }
    } catch (ev) {
      this.emitError("htmlToJson");
      console.error(ev);
    }

    return jsonData;
  }

  // 结构数据生成器
  skeletonGenerator(jsonData: JsonDataType, parentId = 0): any {
    if (jsonData.length <= 0) return [];
    let count = 0;
    const skeleton = [];
    while (count < jsonData.length) {
      const current = jsonData[count];
      const id = `${parentId}_${count}_${current.name}`;
      // 优化输出数据的type
      const newType = ["start", "end"].includes(current.type)
        ? "default"
        : current.type;
      // 通过起始标签的genKey去寻找对应的闭合标签
      if (current.type === "start") {
        const endElementIndex = jsonData.findIndex(
          ({ type, genKey }) => type === "end" && genKey === current.genKey
        );
        // 如果找不到对应的闭合标签，则抛出错误并跳出循环
        if (endElementIndex === -1) {
          this.emitError("closure");
          break;
        }
        // 如果找到对应的标签，则将两者间的元素作为其子元素
        skeleton.push({
          id,
          ...current,
          type: newType,
          children: this.skeletonGenerator(
            jsonData.slice(count + 1, endElementIndex),
            count
          ),
        });
        count = endElementIndex + 1;
      } else {
        skeleton.push({ id, ...current, type: newType });
        count++;
      }
    }

    return skeleton;
  }

  // json数据转结构数据
  jsonToSkeleton(jsonData: JsonDataType) {
    const keyMap: number[] = [];

    // 对起始和闭合标签进行标注，便于梳理结构
    jsonData.forEach((item, index) => {
      const { type } = item;
      switch (type) {
        case "start":
          item["genKey"] = index;
          keyMap.push(index);
          break;
        case "end":
          const startKey = keyMap.splice(keyMap.length - 1, 1)[0];
          item["genKey"] = startKey;
          break;
      }
    });

    return this.skeletonGenerator(jsonData);
  }

  // 报告错误
  emitError(type: ErrorType) {
    const { onError } = this.config;
    if (onError) onError(errorMap[type]);
    console.error(`MiniParser: ${errorMap[type].message}`);
  }
}

export { MiniParser, defaultIgnoreElements, defaultTransMap };
