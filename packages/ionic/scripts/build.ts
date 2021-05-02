import * as del from 'del'
import * as execa from 'execa'
import * as fse from 'fs-extra'

const main = async () => {
  await del(['build', 'lib', 'ngx', '*.tsbuildinfo'])

  const s = await fse.readFile('./src/ngx/index.ts', 'utf8')
  await fse.outputFile(
    './src/lib/index.ts',
    s
      .replace("import { Injectable } from '@angular/core'\n", '')
      .replace('@Injectable()\n', ''),
  )

  await execa('tsc', { stdio: 'inherit' })
  await fse.copy('build/lib', 'lib', { overwrite: true })
  await fse.copy('build/ngx', 'ngx', { overwrite: true })

  await fse.outputJSON('./ngx/package.json', {
    ...require('../package.json'),
    typings: 'index.d.ts',
    main: 'index.js',
    module: 'index.js',
  })
}

main()
