// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export const allCharsToReplace = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export const originallyChar = allCharsToReplace.charAt(Math.floor(Math.random() * allCharsToReplace.length));
console.log(originallyChar);
export var notReplacedChars = allCharsToReplace.replace(originallyChar.toLocaleUpperCase(), "").replace(originallyChar.toLowerCase(), "");
console.log(notReplacedChars);
export const replacedChar = notReplacedChars.charAt(Math.floor(Math.random()* notReplacedChars.length));


let Dictionary = new Map<string, string>();
//Dictionary.set(originallyChar, replacedChar);
Dictionary.set('h', 'x');

/*export var replacedChars = {
  originallyChar: replacedChar,
};
*/
export const blameText = " \nDUDE YOU REALLY HAVE STINKY FINGERS! WANT TO WRITE SOME LYRICS BY MADONNA?: \n ";
export const lyrics = "Every little thing that you say or do \nI'm hung up \nI'm hung up on you \nWaiting for your call \nBaby night and day \nI'm fed up \nI'm tired of waiting on you \nTime goes by so slowly for those who wait \nNo time to hesitate \nThose who run seem to have all the fun \nI'm caught up \nI don't know what to do \nTime goes by so slowly \nTime goes by so slowly \nTime goes by so slowly \nI don't know what to do";
export const blameValue = blameText + lyrics;
export var blameIndex = 0;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "stinky-fingers" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.getstinky', () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage('You activated Stinky Fingers!');

  });

  let activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    console.log('Congratulations, your extension "stinky-fingers" is now active!');
  }

  vscode.window.onDidChangeActiveTextEditor(editor => {
      activeEditor = editor;
      if (editor) {
        console.log('change text editor');
      }
  }, null, context.subscriptions);


  vscode.workspace.onDidChangeTextDocument(event => {
      if (activeEditor && event.document === activeEditor.document) {
        console.log('change text document');
            // check if there is no selection
            if (activeEditor.selection.isEmpty) {
              // the Position object gives you the line and character where the cursor is
              const position = activeEditor.selection.active;

              // get last typed char
              var lastTypedChar = activeEditor.document.getText(new vscode.Range(position, new vscode.Position(position.line,position.character+1)));
              console.log("Last char was " + lastTypedChar);

//              if (lastTypedChar === "h") {
                console.log("Replace char ;-)");
                // replace the last typed char with another char
                activeEditor.edit(builder => builder.replace(new vscode.Range(position, new vscode.Position(position.line,position.character+1)), handleTypedChar(lastTypedChar
                  )));
  //            }
            }
      }
  }, null, context.subscriptions);

  context.subscriptions.push(disposable);
}



// this method is called when your extension is deactivated
export function deactivate() {}

export function handleTypedChar(char: string): string {
  // this block is executed when enough chars were replaced and we want to blame the user
  if (Dictionary.get.length > 10) {
    return blameValue[blameIndex++];
  }
  // should char been replaced?
  else if (Dictionary.has(char)) {
    return String(Dictionary.get(char));
  }
  // did the user just typed the next char we want to replace?
  //else if (char in Dictionary.replacedChars.lastElement) {
    Dictionary.forEach((origin, replace) => {
      if (char === replace) {
        console.log("replace char!!!!!!");
      }
    });
  //}
  // return the char the user typed
  return char;
}
/*
export function charHasToBeReplaced(s: string): boolean {
  if 
  return false;
}

export function replaceChar(s: string): string {
  if (15 chars; bereits; ersetzt;) {
    return blameValue[blameIndex++];
  }
  else {
    schaue; für; welchen;
  }
  return "x";
}
*/