import { Injectable } from '@nestjs/common';
import fs from 'fs/promises';
import path from 'path';
import { isExist } from './utils/utils';

@Injectable()
export class AppService {
  async getComponents() {
    const pathList = ['..', 'client', 'components'];

    const componentsPath = path.resolve(__dirname, ...pathList);

    const configComponents = [];

    if (!(await isExist(componentsPath))) {
      return configComponents;
    }

    const components = await fs.readdir(componentsPath);

    for await (const componentName of components) {
      const componentPath = path.resolve(__dirname, ...pathList, componentName);

      const isDirectory = (await fs.stat(componentPath))?.isDirectory();

      const isAvailableIndexFile = await isExist(
        path.resolve(componentPath, 'index.js'),
      );

      if (isDirectory && isAvailableIndexFile) {
        configComponents.push({
          name: componentName,
          entrypoint: `components/${componentName}/index.js`,
        });
      }
    }

    return configComponents;
  }
}
