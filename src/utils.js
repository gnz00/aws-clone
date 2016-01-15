import inquirer from 'inquirer';

export function Prompt (prompt) { 
  return new Promise((resolve, reject) => {
    inquirer.prompt(prompt, (answer) => {
      resolve(answer);
    })
  }); 
}