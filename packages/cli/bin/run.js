#!/usr/bin/env node
import updateNotifier from 'update-notifier';
import {createRequire} from 'module';
import main from '../lib/index.js';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

updateNotifier({pkg}).notify();

main(pkg.name);
