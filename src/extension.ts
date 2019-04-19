// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export const allCharsToReplace = "abcdfghijklmnopqrtuvwxyz";
export const originallyChar = allCharsToReplace.charAt(Math.floor(Math.random() * allCharsToReplace.length));
export var notReplacedChars = allCharsToReplace.replace(originallyChar.toLocaleUpperCase(), "").replace(originallyChar.toLowerCase(), "");
export const replacedChar = notReplacedChars.charAt(Math.floor(Math.random()* notReplacedChars.length));
export var lastCharWasReplaced = false;
export var numberOfCharsUntilBlame = 2;

export var dictionary = new Map<string, string>();
dictionary.set('e', 's');

export const blameText = "\nDUDE YOU REALLY HAVE STINKY FINGERS! WANT TO WRITE SOME LYRICS BY MADONNA?:";
export const lyrics = "\nEvery little thing that you say or do \nI'm hung up \nI'm hung up on you \nWaiting for your call \nBaby night and day \nI'm fed up \nI'm tired of waiting on you \nTime goes by so slowly for those who wait \nNo time to hesitate \nThose who run seem to have all the fun \nI'm caught up \nI don't know what to do \nTime goes by so slowly \nTime goes by so slowly \nTime goes by so slowly \nI don't know what to do";
export const blameValue = blameText + lyrics;
export var blameIndex = 0;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "stinky-fingers" is now active!');
    // Display a message box to the user
    vscode.window.showInformationMessage('You activated Stinky Fingers!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.getstinky', () => {
  // The code you place here will be executed every time your command is executed

  });

  let activeEditor = vscode.window.activeTextEditor;

  vscode.workspace.onDidChangeTextDocument(event => {

    if (activeEditor && event.document === activeEditor.document) {
      // check if there is no selection
      if (activeEditor.selection.isEmpty) {
        // the Position object gives you the line and character where the cursor is
        var position = activeEditor.selection.active;

        // get last typed char
        var lastTypedChar = activeEditor.document.getText(new vscode.Range(position, new vscode.Position(position.line,position.character+1)));

        if (lastTypedChar === "") {
          return;
        }
        console.log("User typed char " + lastTypedChar);

        activeEditor.edit(builder => builder.replace(new vscode.Range(position, new vscode.Position(position.line,position.character+1)), handleTypedChar(lastTypedChar)));

        // check if a new line was written and update position
        if ( (blameIndex === 2) || (blameValue.substr(blameIndex-1, blameIndex-1).startsWith('\n'))) {
          position = new vscode.Position(activeEditor.selection.end.line+1, activeEditor.selection.end.character+1); 
        } else {
          position = new vscode.Position(activeEditor.selection.end.line, activeEditor.selection.end.character+1); 
        }
        activeEditor.selection = new vscode.Selection(position, position);
      }
    }
  }, null, context.subscriptions);

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

export function handleTypedChar(char: string): string {
  char = char.toLocaleLowerCase();
  if (dictionary.size >= numberOfCharsUntilBlame) {
    // this block is executed when enough chars were replaced and we want to blame the user
    console.log("Blame char " + blameValue[blameIndex]);
    console.log("next char " + blameValue[blameIndex+1]);
    
    if (blameValue.substr(blameIndex, blameIndex+1).valueOf() === "\n" ) {
      blameIndex=blameIndex+1;
      return "\n"+ blameValue[blameIndex++];
    }
    return blameValue[blameIndex++];
  }
  // should char be replaced?
  else if (dictionary.has(char)) {
    console.log("Replace " + char + "  with " + dictionary.get(char));
    lastCharWasReplaced = true;
    return String(dictionary.get(char));
  }
  // did the user just typed the next char we want to replace?
  console.log("See if " + char + " matches " + Array.from(dictionary)[dictionary.size-1][1]);
  if (char.charAt(0) === Array.from(dictionary)[dictionary.size-1][1].charAt(0)){
    notReplacedChars = notReplacedChars.replace(char.toLocaleUpperCase(), "").replace(char.toLowerCase(), "");
    var replaceWith = notReplacedChars.charAt(Math.floor(Math.random()* notReplacedChars.length));
    dictionary.set(char, replaceWith);
    console.log("character " + char + " will now be replaced by " + replaceWith);
    return replaceWith;
  }
  return char;
}
