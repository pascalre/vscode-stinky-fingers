// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export const allCharsToReplace = "abcdfghijklmnopqrtuvwxyz";
export const originallyChar = allCharsToReplace.charAt(Math.floor(Math.random() * allCharsToReplace.length));
export var notReplacedChars = allCharsToReplace.replace(originallyChar.toLocaleUpperCase(), "").replace(originallyChar.toLowerCase(), "");
export const replacedChar = notReplacedChars.charAt(Math.floor(Math.random()* notReplacedChars.length));
export var numberOfCharsUntilBlame = 10;

export var dictionary = new Map<string, string>();
dictionary.set('e', 's');

export const blameText = "\nDUDE YOU REALLY HAVE STINKY FINGERS! WANT TO WRITE SOME LYRICS BY MADONNA?\nEvery little thing that you say or do \nI'm hung up \nI'm hung up on you \nWaiting for your call \nBaby night and day \nI'm fed up \nI'm tired of waiting on you \nTime goes by so slowly for those who wait \nNo time to hesitate \nThose who run seem to have all the fun \nI'm caught up \nI don't know what to do \nTime goes by so slowly \nTime goes by so slowly \nTime goes by so slowly \nI don't know what to do";
export var blameIndex = 0;

// this position marks where our blametext will start
export var blameStartPosition: vscode.Position;

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

        // handle the typed char, this means we are checking if the char will be replaced and if neccessary the char will be replaced
        var replaceText = '';
        var increaseCursorLinePosition = 0;
        if (dictionary.size >= numberOfCharsUntilBlame) {
          // print blameText ;-)
          if (blameIndex === 0 ) {
            // take notice of the first position of the blametext
            blameStartPosition = position;
          }
          blameIndex++;
          replaceText = blameText.substr(0,blameIndex);
          activeEditor.edit(builder => builder.replace(new vscode.Range(blameStartPosition, new vscode.Position(position.line,position.character+1)), replaceText));
          // check if a new line was written and update position
          increaseCursorLinePosition = replaceText.split('\n').length - 1;
        } else {
          // print simple chars
          activeEditor.edit(builder => builder.replace(new vscode.Range(position, new vscode.Position(position.line,position.character+1)), handleTypedChar(lastTypedChar)));
        }
        position = new vscode.Position(activeEditor.selection.end.line+increaseCursorLinePosition, activeEditor.selection.end.character+1); 
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
  // should char be replaced?
  if (dictionary.has(char)) {
    console.log("Replace " + char + "  with " + dictionary.get(char));
    return String(dictionary.get(char));
  }
  // did the user just typed the next char we want to replace?
  else if (char.charAt(0) === Array.from(dictionary)[dictionary.size-1][1].charAt(0)){
    console.log("See if " + char + " matches " + Array.from(dictionary)[dictionary.size-1][1]);
    notReplacedChars = notReplacedChars.replace(char.toLocaleUpperCase(), "").replace(char.toLowerCase(), "");
    var replaceWith = notReplacedChars.charAt(Math.floor(Math.random()* notReplacedChars.length));
    dictionary.set(char, replaceWith);
    console.log("Character " + char + " will now be replaced by " + replaceWith);
    return replaceWith;
  }
  return char;
}
