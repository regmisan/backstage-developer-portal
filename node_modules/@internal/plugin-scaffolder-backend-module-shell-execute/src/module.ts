import {
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node/alpha';
import { shellExecuteAction } from './actions/shellExecute';

export const scaffolderModuleShellExecute = createBackendModule({
  pluginId: 'scaffolder',
  moduleId: 'shell-execute',
  register(env) {
    env.registerInit({
      deps: {
        scaffolder: scaffolderActionsExtensionPoint,
      },
      async init({ scaffolder }) {
        scaffolder.addActions(shellExecuteAction);
      },
    });
  },
});
