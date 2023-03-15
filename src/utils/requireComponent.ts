import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

/**
 * 组件自动化全局注册
 * @param app
 * @param fileContext const fileContext = require.context('@/views/components', true, /\w+\.(vue|js)$/)
 */
export const requireComponent = (app: any, fileContext: any) => {
  // fileContext.keys().forEach((fileName: string) => {
  //   // 获取组件配置
  //   const componentConfig = fileContext(fileName)
  Object.entries(fileContext).forEach(([fileName, val]) => {
    const componentConfig = val as any;

    // 如果name不存在则使用文件名
    // 获取组件的 PascalCase 名，
    const componentName =
      (componentConfig.default || componentConfig).name ||
      upperFirst(
        camelCase(
          // 获取目录深度无关的文件名
          fileName
            .split('/')
            .pop()
            ?.replace(/\.\w+$/, ''),
        ),
      );

    app.component(
      componentName,
      // 在 `.default` 上查找组件选项。
      // 如果组件导出了 `export default` 的话，该选项会存在。
      // 否则回退到模块的根。
      componentConfig.default || componentConfig,
    );
  });
};
