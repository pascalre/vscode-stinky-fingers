//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';
import { handleTypedChar, dictionary, numberOfCharsUntilBlame, blameText, blameIndex, lastCharWasReplaced } from '../extension';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode';
// import * as myExtension from '../extension';

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function () {

  test("Test 1/4: Char should not be replaced.", function() {
    assert.equal(handleTypedChar('p'), 'p');
  });


  test("Test 2/4: Char should be replaced by char from map.", function() {
    dictionary.set('g', 'h')
    assert.equal(handleTypedChar('g'), 'h');
  });


  test("Test 3/4: A new char <-> replace entry should be done into map.", function() {
    var keys = dictionary.size;
    assert.notEqual(handleTypedChar('h'), 'h');
    assert.equal(keys+1, dictionary.size);
  });

  test("Test 4/4: Char should be replaced by char from blameValue.", function() {
    dictionary.clear();
    var i;
    // set some random stuff
    for (i = 0; i < numberOfCharsUntilBlame; i++) { 
      dictionary.set(i.toString(), 'x');
    }

    assert.equal(handleTypedChar('g'), "\n" + blameText.charAt(1));
    assert.equal(handleTypedChar('g'), blameText.charAt(1));

  });
});