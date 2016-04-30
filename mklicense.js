#!/usr/bin/env node
'use strict'

var fs = require('fs')
var inquirer = require('inquirer')
var jsdom = require('node-jsdom')
var username = require('git-user-name')
var Spinner = require('cli-spinner').Spinner

var loading = new Spinner('%s generating license')

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
    message: 'The program license begins in:',
    default: function () {
      var getTheDate = new Date()
      var currentYear = getTheDate.getFullYear()
      return currentYear
    },
    when: function (answers) {
      var licenseOption = answers.licenseList
      if (licenseOption.match(/(mit|apache|^gpl|agpl)/)) {
        return licenseOption
      }
    }
  },
  {
    type: 'input',
    name: 'author_name',
    message: 'What\'s the program author full name?',
    default: function () {
      return username()
    },
    when: function (answers) {
      var licenseOption = answers.licenseList
      if (licenseOption.match(/(mit|apache|^gpl|agpl)/)) {
        return licenseOption
      }
    }
  },
  {
    type: 'input',
    name: 'project_description',
    message: 'Give the program\'s name and a brief idea of what it does (one line).',
    default: function () {
      return 'i.e. Mkdocs. A CLI tool to generate Licenses. Available on NPM.'
    },
    when: function (answers) {
      var licenseOption = answers.licenseList
      if (licenseOption.match(/(^gpl|agpl)/)) {
        return licenseOption
      }
    }
  }
]).then(function (answers) {
  loading.start()

  var thisLicense = answers.licenseList
  var licenseUrl = 'http://choosealicense.com/licenses/' + thisLicense

  jsdom.env({
    url: licenseUrl,
    loaded: function (errors, window) {
      if (errors) {
        console.log('Error downloading license:', errors)
      }
      var license = window.document.getElementById('license-text').textContent

      var customizer = function () {
        var rewrite
        switch (thisLicense) {
          case 'mit':
            rewrite = license.replace(
              '[year]',
              answers.license_year
            )
            .replace(
              '[fullname]',
              answers.author_name
            )
            return rewrite

          case 'apache-2.0':
            rewrite = license.replace(
                '{yyyy}',
                answers.license_year
              )
              .replace(
                '{name of copyright owner}',
                answers.author_name
              )
            return rewrite

          case 'gpl-3.0':
            rewrite = license.replace(
                '{year}',
                answers.license_year
              )
              .replace(
                '{name of author}',
                answers.author_name
              )
              .replace(
                '{fullname}',
                answers.author_name
              )
              .replace(
                '{project}',
                answers.project_name
              )
              .replace(
                '{one line to give the program\'s name and a brief idea of what it does.}',
                answers.project_description
              )
            return rewrite

          case 'agpl-3.0':
            rewrite = license.replace(
              '<year>',
              answers.license_year
            )
            .replace(
              '<name of author>',
              answers.author_name
            )
            .replace(
              '<one line to give the program\'s name and a brief idea of what it does.>',
              answers.project_description
            )
            return rewrite

          case 'unlicense':
          case 'mpl-2.0':
          case 'lgpl':
            return rewrite

          default:
            return license
        }
      }
      fs.writeFile('LICENSE', customizer(), 'UTF-8', function (err) {
        if (err) {
          return console.log('error creating license', err)
        }
      })
    },
    done: function (errors, window) {
      if (errors) {
        console.log('Error while transfering the content for your file', errors)
      }
      loading.stop(true)
      console.log('Done, license created ;)')
    }
  })
})
