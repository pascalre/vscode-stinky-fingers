// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

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

              if (lastTypedChar === "h") {
                console.log("Replace char ;-)");
                // replace the last typed char with another char
                activeEditor.edit(builder => builder.replace(new vscode.Range(position, new vscode.Position(position.line,position.character+1)), "?"));
              }
            }
      }
  }, null, context.subscriptions);

  context.subscriptions.push(disposable);
}


// this method is called when your extension is deactivated
export function deactivate() {}
