admob-plus
==========

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g admob-plus
$ admob-plus COMMAND
running command...
$ admob-plus (-v|--version|version)
admob-plus/0.15.1 darwin-x64 node-v11.11.0
$ admob-plus --help [COMMAND]
USAGE
  $ admob-plus COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`admob-plus help [COMMAND]`](#admob-plus-help-command)
* [`admob-plus info`](#admob-plus-info)

## `admob-plus help [COMMAND]`

display help for admob-plus

```
USAGE
  $ admob-plus help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `admob-plus info`

Get relevant version info about OS, toolchain and libraries

```
USAGE
  $ admob-plus info

OPTIONS
  -h, --help   show CLI help
  --clipboard  copy the environment report output to the clipboard

EXAMPLE
  $ admob-plus info
```

_See code: [src/commands/info.ts](https://github.com/admob-plus/admob-plus/blob/v0.15.1/src/commands/info.ts)_
<!-- commandsstop -->
