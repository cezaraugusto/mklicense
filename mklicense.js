#!/usr/bin/env node
'use strict'
// validar ES6
// condicional pra versao do node
// console antes de baixar isso ser show
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const jsdom = require('jsdom')
const username = require('git-user-name')
const Spinner = require('cli-spinner').Spinner

let loading = new Spinner('%s generating license')
loading.setSpinnerString('⣾⣽⣻⢿⡿⣟⣯⣷')
loading.setSpinnerDelay(100)

inquirer.prompt([
  {
    type: 'list',
    name: 'licenseList',
    message: 'Select your license:',
    choices: [
      'Unlicense', 'MIT', 'Apache 2.0', 'MPL 2.0', 'LGPL 3.0', 'GPL 3.0', 'AGPL 3.0'
    ],
    filter: function (val) {
      return val.toLowerCase().replace(/ /g, '-')
    }
  },
  {
    type: 'input',
    name: 'license_year',
    message: 'The project\'s license begins in:',
    default: function () {
      let getTheDate = new Date()
      let currentYear = getTheDate.getFullYear()
      return currentYear
    },
    when: function (answers) {
      let licenseOption = answers.licenseList
      if (licenseOption.match(/(mit|apache|^gpl|agpl)/)) {
        return licenseOption
      }
    }
  },
  {
    type: 'input',
    name: 'author_name',
    message: 'The project\'s author full name:',
    default: function () {
      return username()
    },
    when: function (answers) {
      let licenseOption = answers.licenseList
      if (licenseOption.match(/(mit|apache|^gpl|agpl)/)) {
        return licenseOption
      }
    }
  },
  {
    type: 'input',
    name: 'project_description',
    message: 'Give the project\'s name and a brief idea of what it does (one line):\n',
    default: function () {
      return 'mkdocs. A CLI tool that generates your next project\'s License. Available on NPM.'
    },
    when: function (answers) {
      let licenseOption = answers.licenseList
      if (licenseOption.match(/(^gpl|agpl)/)) {
        return licenseOption
      }
    }
  }
]).then(function (answers) {
  const thisLicense = answers.licenseList
  const licenseUrl = 'http://choosealicense.com/licenses/' + thisLicense
  const whereIsMyLicense = path.resolve('.')

  loading.start()

  jsdom.env(
    licenseUrl,
    function (err, window) {
      const license = window.document.getElementById('license-text').textContent
      if (err) {
        console.log('Getting the license was not possible. Error: ', err)
      }
      let customizer = function (thisLicense) {
        let rewrite = {
          'mit': function () {
            return license.replace(
              '[year]', answers.license_year
            )
            .replace(
              '[fullname]', answers.author_name
            )
          },
          'apache-2.0': function () {
            return license.replace(
                '{yyyy}', answers.license_year
              )
              .replace(
                '{name of copyright owner}', answers.author_name
              )
          },
          'gpl-3.0': function () {
            return license.replace(
                '{year}', answers.license_year
              )
              .replace(
                '{name of author}', answers.author_name
              )
              .replace(
                '{fullname}', answers.author_name
              )
              .replace(
                '{project}', answers.project_name
              )
              .replace(
                '{one line to give the program\'s name and a brief idea of what it does.}', answers.project_description
              )
          },
          'agpl-3.0': function () {
            return license.replace(
              '<year>', answers.license_year
            )
            .replace(
              '<name of author>', answers.author_name
            )
            .replace(
              '<one line to give the program\'s name and a brief idea of what it does.>', answers.project_description
            )
          },
          'default': function () {
            return license
          }
        }
        return (rewrite[thisLicense] || rewrite['default'])()
      }
      fs.writeFile('LICENSE', customizer(thisLicense), 'UTF-8', function (err) {
        if (err) {
          return console.log('error creating license', err)
        }
        loading.stop(true)
        console.log('Done. license created!\nYour license is under: ' + whereIsMyLicense + '\nLawyers are now happy.')
      })
    }
  )
})
