const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const inquirer = require('inquirer')
const app = require('./app1')

clear()
console.log(
  chalk.yellow(
    figlet.textSync('COYS', {
      horizontalLayout: 'full'
    })
  )
)

const askMode = () => {
  const questions = [{
    type: 'list',
    name: 'mode',
    message: 'Select Mode:',
    choices: ['Hashtags', 'Account', 'Locations','Saved'],
    validate: function (value) {
      if (value.length) {
        return true
      } else {
        return 'Please select Mode'
      }
    }
  }]
  return inquirer.prompt(questions)
}

const askQuestionsHashtag = () => {
  const questions = [{
    name: 'hashtags',
    type: 'input',
    message: 'Hashtags (comma separated):',
    validate: function (value) {
      if (value) {
        return true
      } else {
        return 'Please enter hashtags'
      }
    }
  },
  {
    type: 'input',
    name: 'scroll',
    default: '50',
    message: 'Enter Scroll Limit:',
    validate: function (value) {
      var pass = value.match(
        /^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/
      )
      if (pass) {
        return true
      }
      return 'Please enter number'
    }
  }
  ]
  return inquirer.prompt(questions)
}

const askQuestionsAccount = () => {
  const questions = [{
    name: 'account',
    type: 'input',
    message: 'Enter Account:',
    validate: function (value) {
      if (value.length) {
        return true
      } else {
        return 'Please enter Account'
      }
    }
  },
  {
    type: 'input',
    name: 'scroll',
    default: '50',
    message: 'Enter Scroll Limit:',
    validate: function (value) {
      var pass = value.match(
        /^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/
      )
      if (pass) {
        return true
      }
      return 'Please enter number'
    }
  }
  ]
  return inquirer.prompt(questions)
}

const askQuestionsLocation = () => {
  const questions = [{
    name: 'locations',
    type: 'input',
    message: 'Enter Location Id:',
    validate: function (value) {
      var pass = value.match(
        /^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/
      )
      if (pass) {
        return true
      }
      return 'Please enter number'
    }
  },
  {
    type: 'input',
    name: 'scroll',
    default: '50',
    message: 'Enter Scroll Limit:',
    validate: function (value) {
      var pass = value.match(
        /^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/
      )
      if (pass) {
        return true
      }
      return 'Please enter number'
    }
  }
  ]
  return inquirer.prompt(questions)
}

const setQuest = async () => {
  const mode = await askMode()
  if (mode.mode === 'Hashtags') {
    const quest = await askQuestionsHashtag()
    await app.main(quest, 'hashtags')
  } else if (mode.mode === 'Account' || mode.mode === 'Saved') {
    const quest = await askQuestionsAccount()
    await app.main(quest, mode.mode === 'Account'?'account':'saved')
  } else if (mode.mode === 'Locations') {
    const quest = await askQuestionsLocation()
    await app.main(quest, 'locations')
  }
}

// setQuest()

app.main(null,'account')
