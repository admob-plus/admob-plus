import * as del from 'del'
import * as execa from 'execa'
import * as fse from 'fs-extra'

const main = async () => {
  await del(['build', 'lib', 'ngx'])

  await execa('tsc', { stdio: 'inherit' })

  const s = await fse.readFile('./src/index.ts', 'utf8')
  await fse.outputFile(
    './build/index.ts',
    s
      .replace("import { Injectable } from '@angular/core'\n", '')
      .replace('@Injectable()\n', ''),
  )
  await execa('tsc', ['-p', 'tsconfig.build.json'], {
    stdio: 'inherit',
  })
}

main()
