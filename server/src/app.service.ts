import { Injectable } from '@nestjs/common';
import fs from 'fs/promises';
import path from 'path';

@Injectable()
export class AppService {
  async getComponents() {
    const pathList = ['..', 'client', 'components'];
    const components = await fs.readdir(path.resolve(__dirname, ...pathList));

    const configComponents = [];

    for await (const componentName of components) {
      const manifestPath = path.resolve(
        __dirname,
        ...pathList,
        componentName,
        'asset-manifest.json',
      );

      if ((await fs.stat(manifestPath)).isFile()) {
        const manifest = await fs.readFile(manifestPath, { encoding: 'utf-8' });

        configComponents.push({
          name: componentName,
          entrypoint: `components/${componentName}/index.js`,
        });
      }
    }

    return configComponents;
  }
}
