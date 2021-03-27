import kleur from 'kleur'
import ora from 'ora'
import path from 'path'

const cwd = process.cwd()
const relativePath = (p: string) => path.relative(cwd, p)

export const spinner = ora()

export default class Context {
  issueCount = 0

  logTitle(s: string) {
    spinner.info(kleur.bold(s))
  }

  logPath(p: string) {
    this.logTitle(relativePath(p))
  }

  logIssue(text: string) {
    this.issueCount += 1
    spinner.fail(text)
  }

  logSummary() {
    spinner.stop()

    if (this.issueCount === 0) {
      spinner.succeed('No issue found.')
    } else {
      spinner.fail(
        `Found ${this.issueCount} issue${this.issueCount === 1 ? '' : 's'}.`,
      )
    }
  }

  indented(f: () => any) {
    if (spinner.prefixText) {
      spinner.prefixText += ' '
    } else {
      spinner.prefixText = ' '
    }

    f()

    if (spinner.prefixText) {
      spinner.prefixText = spinner.prefixText.toString().slice(0, -1)
    }
    if (!spinner.prefixText) {
      // @ts-expect-error wrong type
      spinner.prefixText = undefined
    }
  }
}
