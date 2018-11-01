import { Command, flags } from '@oclif/command'

export default class Hello extends Command {
  public static description = 'describe the command here'

  public static examples = [
    `$ admob-plus hello
hello world from ./src/hello.ts!
`,
  ]

  public static flags = {
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'name to print' }),
  }

  public static args = [{ name: 'file' }]

  public async run() {
    const { args, flags: parsedFlags } = this.parse(Hello)

    const name = parsedFlags.name || 'world'
    this.log(`hello ${name} from ./src/commands/hello.ts`)
    if (args.file && parsedFlags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
