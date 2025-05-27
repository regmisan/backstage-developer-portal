import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { spawn } from 'child_process';

export const shellExecuteAction = createTemplateAction<{
  command: string;
  workingDirectory?: string;
}>({
  id: 'shell:execute',
  description: 'Runs shell commands in the workspace directory',
  schema: {
    input: {
      type: 'object',
      required: ['command'],
      properties: {
        command: {
          type: 'string',
          title: 'Shell command',
          description: 'The shell command to execute',
        },
        workingDirectory: {
          type: 'string',
          title: 'Working Directory',
          description: 'Directory relative to the workspace',
        },
      },
    },
  },
  async handler(ctx) {
    const { command, workingDirectory } = ctx.input;

    const cwd = workingDirectory
      ? `${ctx.workspacePath}/${workingDirectory}`
      : ctx.workspacePath;

    ctx.logger.info(`📁 Workspace: ${ctx.workspacePath}`);
    ctx.logger.info(`📂 Working directory: ${cwd}`);
    ctx.logger.info(`🚀 Executing shell command: ${command}`);

    await new Promise((resolve, reject) => {
      const child = spawn('/bin/sh', ['-c', command], {
        cwd,
        stdio: 'inherit',
      });

      child.on('close', code => {
        if (code !== 0) {
          reject(new Error(`Shell command failed with exit code ${code}`));
        } else {
          resolve(undefined);
        }
      });

      child.on('error', err => {
        reject(err);
      });
    });
  },
});
