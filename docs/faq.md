---
id: faq
title: Frequently Asked Questions
---

## How this project relates to `cordova-plugin-admob-free`?

`admob-suite` is the successor of [cordova-plugin-admob-free](https://github.com/ratson/cordova-plugin-admob-free), which provides a cleaner API and build with modern tools.

`cordova-plugin-admob-free` is orginally a fork by removing ad-sharing code from `cordova-plugin-admob-simple`, which is also fork from `cordova-plugin-admob`. Therefore, many hacks and APIs are inherited. As the project evolves, the code for Android was completely rewritten, and new APIs were added under constraints of existing code orginalization and architecture.

With the growing number of reported issues, it is clear that a better solution is needed, so `admob-suite` is borned with the following features in mind:

* Written in TypeScript
* First-class promise API
* Rewrite iOS part using Swift
* Official Ionic support
* Rich documentation
