// extern modules 
import inquirer from 'inquirer'
import chalk from 'chalk'

// code modules
import fs from 'fs'

// Prompts for begin

    operation();

    function operation() {
        inquirer.prompt([{
            type: 'list',
            name: 'action',
            message: 'What do you need?',
            choices: ['Create an account', 'Check Balance', 'Deposit', 'To withdraw', 'Delete Account' ,'Exit']
        }]).then((answer)=> {
            const action = answer['action']
            if (action === 'Create an account') {
                createAccount();
            } else if (action === 'Check Balance') {
                check();
            } else if (action === 'Deposit') {
                depositLogin();
            }else if (action === 'To withdraw') {
                withdraw();
            }else if (action === 'Exit') {
                console.log(chalk.bgBlue.black('Thanks for using this Bank'))
                process.exit();
            }else if (action === 'Delete Account'){
                deleteAccount();
            }
        }).catch((err)=> console.log(err))
    }


// create an account

function createAccount() {
    console.log(chalk.bgGreen.black('Congratulations for chosing this bank'))
    console.log(chalk.green('Define the options for you account'))

    buildAccount();
}

function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Type your name',
        }
    ]).then((answer)=>{
        const accountName = answer['accountName']
        console.log(accountName)

        if (!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if (fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('This account already exist'))
            buildAccount();
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`,`{"balance": 0}`), function(err){console.log(err)};
        console.log(chalk.green('Congratulations, your account has been create'))
        backToMenu();
    }).catch(err => console.log(err))
}

// check balance

function check(){
    inquirer.prompt([
        {
            name: 'CheckName',
            message: 'Login Name Please: '
        }
    ]).then((answer)=> {
        const nameCheck = answer['CheckName'];
        
        const filePath = `./accounts/${nameCheck}.json`


    fs.readFile(filePath , 'utf8', (err, data)=> {
        if (err) {
            console.error('Error when try read file', err)
            return
        }
        try {
            const jsonData = JSON.parse(data);
            console.log(chalk.bgYellow.black(`Your bank balance is $${jsonData.balance}`))
            backToMenu();
        } catch (err) {
            console.log('Erro when try parse the Json', err);
        }
    })
    })
}

// deposit

function depositLogin(){
    inquirer.prompt([
        {
            name: 'depositAccount',
            message: 'Login Name Please: '
        }
    ]).then((answer)=> {
        const depositAccount = answer['depositAccount']
        const filePath = `./accounts/${depositAccount}.json`

        if (!fs.existsSync(`accounts/${depositAccount}.json`)) {
            console.log(chalk.bgRed.black('This account dont exist'))
            depositLogin();
        }else{
            console.log(chalk.bgGreen.black('Sucess Login'))
            inquirer.prompt([{
                name: 'depositValue',
                message: 'How much do you want deposite?'
            }]).then((answer)=>{
                const depositValue = answer['depositValue']
    
                fs.readFile(filePath , 'utf8', (err, data)=> {
                    if (err) {
                        console.error('Error when try read file', err)
                        return
                    }
                    try {
                        const jsonData = JSON.parse(data);
                        var money = jsonData.balance + parseFloat(depositValue);            
                        fs.writeFileSync(`accounts/${depositAccount}.json`,`{"balance": ${money}}`), function(err){console.log(err)};
                        console.log(chalk.green(`Your bank balance now is $${money}`))  
                        backToMenu();     
                    } catch (err) {
                        console.log('Erro when try parse the Json', err);
                    }
                })
            })
        }
    })
}

// withdraw

function withdraw(){
    inquirer.prompt([
        {
            name: 'depositAccount',
            message: 'Login Name Please'
        }
    ]).then((answer)=> {
        const depositAccount = answer['depositAccount']
        const filePath = `./accounts/${depositAccount}.json`

        if (!fs.existsSync(`accounts/${depositAccount}.json`)) {
            console.log(chalk.bgRed.black('This account dont exist'))
            withdraw();
        }else{
            console.log(chalk.bgGreen.black('Sucess Login'))
            inquirer.prompt([{
                name: 'withdrawValue',
                message: 'How much do you want to withdraw?'
            }]).then((answer)=>{
                const depositValue = answer['withdrawValue']
    
                fs.readFile(filePath , 'utf8', (err, data)=> {
                    if (err) {
                        console.error('Error when try read file', err)
                        return
                    }
                    try {
                        const jsonData = JSON.parse(data);
                        var money = jsonData.balance - parseFloat(depositValue);            
                        fs.writeFileSync(`accounts/${depositAccount}.json`,`{"balance": ${money}}`), function(err){console.log(err)};
                        console.log(chalk.green(`Your bank balance now is $${money}`))   
                        backToMenu();      
                    } catch (err) {
                        console.log('Erro when try parse the Json', err);
                    }
                })
            })
        }
    })
}

function deleteAccount(){
    inquirer.prompt([
        {
            name: 'deleteAccount',
            message: 'What account do you want delete?'
        }
    ]).then((answer)=>{
        const deleteThisAccount = answer['deleteAccount']
        const filePath = `./accounts/${deleteThisAccount}.json`

        if (!fs.existsSync(`accounts/${deleteThisAccount}.json`)) {
            console.log('this account dont exist')
        } else{
            fs.unlink(filePath, (err) => {
                if (err) {
                  console.error(`Error removing file: ${err}`);
                  return;
                }
              
                console.log(chalk.bgRed.black(`Account with name ${deleteThisAccount} has been successfully removed.`));
                backToMenu();
              });
        }
    })
}

function backToMenu() {
    inquirer.prompt([{
        type: 'list',
        name: 'backOrExit',
        message: 'What do you want?',
        choices: ['Back','Exit']
    }]).then((answer)=> {
        const backOrExit = answer['backOrExit']
        if (backOrExit === 'Back') {
            operation();
        } else if (action === 'Exit') {
            console.log(chalk.bgBlue.black('Thanks for using this Bank'))
            process.exit();
        }
    }).catch((err)=> console.log(err))
}