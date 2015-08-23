'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {

    yeoman.Base.apply(this, arguments);

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });
  },
  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awesome ' + chalk.red('GeneratorTypo3Extension') + ' generator!'
    ));

    var questions = [];

    questions.push({
      type: 'input',
      name: 'extensionTitle',
      message: 'Please Enter the title that should be displayed in the Extension Manager',
      default: this.config.get('extensionTitle') || 'Sitepackage for example.com'
    });

    questions.push({
      type: 'input',
      name: 'extensionDescription',
      message: 'Please Enter the description that should be displayed in the Extension Manager',
      default: this.config.get('extensionDescription') || 'All that is needed for example.com'
    });

    questions.push({
      type: 'input',
      name: 'versionNumber',
      message: 'Please enter the version number in semver-compatible format (ex. 0.2.3)',
      default: this.config.get('versionNumber') || '0.1.0'
    });

    questions.push({
      type: 'input',
      name: 'extensionKey',
      message: 'What extension key would you like?',
      default: this.config.get('extensionKey') || 'bro_do_you_even'
    });

    questions.push({
      type: 'input',
      name: 'vendorName',
      message: 'Please enter the Vendor name for generated PHP Classes',
      default: this.config.get('vendorName') || 'TYPO3'
    });

    questions.push({
      type: 'input',
      name: 'authorName',
      message: 'Please enter your name',
      default: this.config.get('authorName') || 'John Doe'
    });

    questions.push({
      type: 'input',
      name: 'authorEmail',
      message: 'Please enter your email',
      default: this.config.get('authorEmail') || 'john@example.com'
    });

    this.prompt(questions, function (answers) {
      this.props = answers;
      // To access props later use this.props.someOption;

      //save config to .yo-rc.json
      this.config.set(answers);
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
      this.fs.copyTpl(
        this.templatePath('_ext_emconf.php'),
        this.destinationPath('ext_emconf.php'), {
          authorName: this.config.get('authorName'),
          authorEmail: this.config.get('authorEmail'),
          versionNumber: this.config.get('versionNumber'),
          extensionTitle: this.config.get('extensionTitle'),
          extensionDescription: this.config.get('extensionDescription')
        }
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'), {
          extensionKey: this.config.get('extensionKey'),
          extensionAuthor: this.config.get('authorName'),
          extensionEmail: this.config.get('authorEmail'),
          extensionVersion: this.config.get('versionNumber')
        }
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
