import { FieldConfig } from '@/components/FormControl.vue';

export const changeToCamelCase = (str: string) => {
  if (str === 'ID' || str === 'Id') {
    return 'id';
  } else {
    // 大驼峰命名改为小驼峰命名
    return str[0].toLowerCase() + str.substring(1);
  }
};

/**
 * 根据类型名获取ItemType展示类型
 * @param typeName 类型名
 * @returns ItemType展示类型，不识别的默认返回select，表示枚举
 */
export const typeNameToItemType = (typeName: string) => {
  switch (typeName) {
    case 'String':
      return 'input';
    case 'Int32':
    case 'Int64':
      return 'input';
    case 'Boolean':
      return 'switch';
    case 'DateTime':
      return 'datePicker';
    default:
      return 'select';
  }
};

/**
 * 设置字段的ItemType展示类型
 * @param config 字段配置
 */
export const setItemType = (config: FieldConfig) => {
  if (config.itemType) {
    return;
  }

  if (config.lovCode) {
    config.itemType = 'select';
    return
  } else if (config.typeName) {
    config.itemType = typeNameToItemType(config.typeName);
  }

  // 如果是select，说明可能是枚举，需要设置options
  if (config.itemType === 'select') {
    config.url = '/Cube/Lookup?codes=' + config.typeName;
    if (!config.options) {
      config.options = {
        method: 'get',
      };
    } else {
      config.options.method = 'get';
    }

    const typeName = changeToCamelCase(config.typeName);

    config.options.afterGetDataList = (data: any) => {
      return data[typeName];
    };
  }
};
