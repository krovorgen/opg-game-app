export function localize(errors: SchemaValidationError[]) {
  if (!(errors && errors.length)) return;
  for (const e of errors) {
    let outMessage;
    switch (e.keyword) {
      case 'maxItems':
      case 'additionalItems':
      case 'items': {
        outMessage = '';
        const n = e.params.limit;
        outMessage += 'должно иметь не более, чем ' + n + ' элемент';
        if (n >= 2 && n <= 4) {
          outMessage += 'а';
        } else if (n != 1) {
          outMessage += 'ов';
        }
        break;
      }
      case 'additionalProperties':
        outMessage = 'не должно иметь дополнительных полей';
        break;
      case 'anyOf':
        outMessage = 'должно соответствовать одной их схем в "anyOf"';
        break;
      case 'const':
        outMessage = 'должно быть равно заданному значению';
        break;
      case 'contains':
        outMessage = 'должно содержать значение соответствующее схеме';
        break;
      case 'dependencies':
      case 'dependentRequired': {
        outMessage = '';
        const n = e.params.depsCount;
        outMessage += 'должно иметь пол';
        if (n == 1) {
          outMessage += 'е';
        } else {
          outMessage += 'я';
        }
        outMessage += ' ' + e.params.deps + ', когда присутствует поле ' + e.params.property;
        break;
      }
      case 'discriminator':
        switch (e.params.error) {
          case 'tag':
            outMessage = 'поле "' + e.params.tag + '" должно быть строкой';
            break;
          case 'mapping':
            outMessage = 'значение поля "' + e.params.tag + '" должно быть в одной из oneOf схем ';
            break;
          default:
            outMessage = 'должно соответствовать правилу "' + e.keyword + '"';
        }
        break;
      case 'enum':
        outMessage = 'должно быть равно одному из разрешенных значений';
        break;
      case 'false schema':
        outMessage = 'схема равна false';
        break;
      case 'format':
        outMessage = 'должно соответствовать формату "' + e.params.format + '"';
        break;
      case 'formatMaximum':
      case 'formatExclusiveMaximum': {
        outMessage = '';
        const cond = e.params.comparison + ' ' + e.params.limit;
        outMessage += 'должно быть ' + cond;
        break;
      }
      case 'formatMinimum':
      case 'formatExclusiveMinimum': {
        outMessage = '';
        const cond = e.params.comparison + ' ' + e.params.limit;
        outMessage += 'должно быть ' + cond;
        break;
      }
      case 'if':
        outMessage = 'должно соответствовать схемe "' + e.params.failingKeyword + '"';
        break;
      case 'maximum':
      case 'exclusiveMaximum': {
        outMessage = '';
        const cond = e.params.comparison + ' ' + e.params.limit;
        outMessage += 'должно быть ' + cond;
        break;
      }
      case 'maxLength': {
        outMessage = '';
        const n = e.params.limit;
        outMessage += 'должно быть не длиннее, чем ' + n + ' символ';
        if (n >= 2 && n <= 4) {
          outMessage += 'а';
        } else if (n != 1) {
          outMessage += 'ов';
        }
        break;
      }
      case 'maxProperties': {
        outMessage = '';
        const n = e.params.limit;
        outMessage += 'должно иметь не более, чем ' + n + ' пол';
        if (n == 1) {
          outMessage += 'е';
        } else if (n >= 2 && n <= 4) {
          outMessage += 'я';
        } else {
          outMessage += 'ей';
        }
        break;
      }
      case 'minimum':
      case 'exclusiveMinimum':
        outMessage = '';
        const cond = e.params.comparison + ' ' + e.params.limit;
        outMessage += 'должно быть ' + cond;
        break;
      case 'minItems': {
        outMessage = '';
        const n = e.params.limit;
        outMessage += 'должно иметь не менее, чем ' + n + ' элемент';
        if (n >= 2 && n <= 4) {
          outMessage += 'а';
        } else if (n != 1) {
          outMessage += 'ов';
        }
        break;
      }
      case 'minLength': {
        outMessage = '';
        const n = e.params.limit;
        outMessage += 'должно быть не короче, чем ' + n + ' символ';
        if (n >= 2 && n <= 4) {
          outMessage += 'а';
        } else if (n != 1) {
          outMessage += 'ов';
        }
        break;
      }
      case 'minProperties': {
        outMessage = '';
        const n = e.params.limit;
        outMessage += 'должно иметь не менее, чем ' + n + ' пол';
        if (n == 1) {
          outMessage += 'е';
        } else if (n >= 2 && n <= 4) {
          outMessage += 'я';
        } else {
          outMessage += 'ей';
        }
        break;
      }
      case 'multipleOf':
        outMessage = 'должно быть кратным ' + e.params.multipleOf;
        break;
      case 'not':
        outMessage = 'должно не соответствовать схеме в "not"';
        break;
      case 'oneOf':
        outMessage = 'должно соответствовать в точности одной схемe в "oneOf"';
        break;
      case 'pattern':
        outMessage = 'должно соответствовать образцу "' + e.params.pattern + '"';
        break;
      case 'patternRequired':
        outMessage = 'должно иметь поле, соответствующее образцу "' + e.params.missingPattern + '"';
        break;
      case 'propertyNames':
        outMessage = 'имя поля не соответствует схеме';
        break;
      case 'required':
        outMessage = 'Обязательное поле ' + e.params.missingProperty;
        break;
      case 'type':
        outMessage = 'должно быть ' + e.params.type;
        break;
      case 'unevaluatedItems': {
        outMessage = '';
        const n = e.params.len;
        outMessage += 'должно иметь не более, чем ' + n + ' элемент';
        if (n >= 2 && n <= 4) {
          outMessage += 'а';
        } else if (n != 1) {
          outMessage += 'ов';
        }
        break;
      }
      case 'unevaluatedProperties':
        outMessage = 'не должно иметь непроверенных полей';
        break;
      case 'uniqueItems':
        outMessage =
          'не должно иметь повторяющихся элементов (элементы ' + e.params.j + ' и ' + e.params.i + ' идентичны)';
        break;
      default:
        outMessage = 'должно соответствовать правилу "' + e.keyword + '"';
    }
    e.message = outMessage;
  }
}

export interface SchemaValidationError {
  keyword: string;
  dataPath: string;
  schemaPath: string;
  params: {
    ref: string;
    additionalProperty: string;
    format: string;
    multipleOf: number;
    pattern: string;
    type: string;
    keyword: string;
    missingPattern: string;
    propertyName: string;
    failingKeyword: string;
    caseIndex: number;
    allowedValues: Array<any>;
    property: string;
    missingProperty: string;
    depsCount: number;
    deps: string;
    error: string;
    tag: string;
    comparison: string;
    limit: number | string;
    exclusive: boolean;
    len: number;
    i: number;
    j: number;
  };
  propertyName?: string;
  message?: string;
  schema?: any;
  parentSchema?: object;
  data?: any;
}
