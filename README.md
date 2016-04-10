# STG-Ludum-Dare

## Using Git

###### Getting Started
If you haven't yet, create your project directory. Be sure to replace the name and email with your git username and email.
```
git clone https://github.com/ericbo/STG-Ludum-Dare.git
git config --global user.name "Username"
git config --global user.email your-email@example.com
```

## Commenting

###### Functions and Classes
```
/*
* This function takes two arguments and returns null.
* Very helpful when trying to achive nothing.
*
* @param  arg1 This is the first argument, which is never refferenced in the function.
* @param  arg2 This is the second argument, which is also never refferenced.
* @return      null value.
*/
function Example(arg1, arg2) {
  return null;
}
```

## Naming Convention

###### Functions and Classes
CamelCase starting with a capitalized letter. For example:
```
class **PlayerSave()** {}
```

###### Variables and Global Variables
CamelCase starting with a lower case letter. For example:
```
var **playerScore** = 0;
```

###### Constants
All upper case with underscore to separate multiple words. For example:
```
var **GRAVITY_CONSTANT** = 9.81;
```
