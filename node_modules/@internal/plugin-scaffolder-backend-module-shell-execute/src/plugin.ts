import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const shellExecuteAction = createTemplateAction<{
  command: string;
  workingDirectory?: string;
}>({
  id: 'shell:execute',
  description: 'Run a shell command from a template',
  schema: {
    input: {
      type: 'object',
      required: ['command'],
      properties: {
        command: {
          type: 'string',
          title: 'Shell command to run',
        },
        workingDirectory: {
          type: 'string',
          title: 'Optional working directory',
        },
      },
    },
  },
  async handler(ctx) {
    const { command, workingDirectory } = ctx.input;
    ctx.logger.info(`Executing: ${command}`);
    const { stdout, stderr } = await execAsync(command, {
      cwd: workingDirectory,
    });
    ctx.logger.info(`stdout: ${stdout}`);
    if (stderr) ctx.logger.warn(`stderr: ${stderr}`);
  },
});
