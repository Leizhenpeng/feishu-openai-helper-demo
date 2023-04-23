import fs, {access, mkdir} from 'fs-extra';
import {log, r} from './utils';
import clientNow from './clientParse';
// @ts-ignore
import type PkgType from '../package.json';
import {
    apiHandler, customHandler,
    editorTypeHandler,
    idHandler,
    menuHandler,
    nameHandler,
} from './util/configParser';

export async function genManifest() {
    const pkg = await fs.readJSON(r('package.json')) as typeof PkgType;
    const customManifest = customHandler.handle(pkg)
    // @ts-ignore
    const manifest: Manifest = {
        name: nameHandler.handle(pkg),
        id: idHandler.handle(pkg),
        api: apiHandler.handle(pkg),
        main: 'code/index.js',
        ui: 'ui/index.html',
        editorType: editorTypeHandler.handle(pkg) as any,
        ...customManifest,
    };
    const menu = menuHandler.handle(pkg);
    if (menu) {
        manifest.menu = menu;
    }

    return manifest;
}

export async function writeManifest(clientName = 'figma') {
    const clientPath = r(`plugin/${ clientName }`);
    const manifestPath = r(`plugin/${ clientName }/manifest.json`);

    await access(r('plugin')).catch(() => mkdir(r('plugin')));
    await access(clientPath).catch(() => mkdir(clientPath));

    await fs.writeJSON(manifestPath, await genManifest(), { spaces: 2 });
    log('manifest', 'update manifest.json');
}

writeManifest(clientNow);
