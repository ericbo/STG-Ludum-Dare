# STG-Ludum-Dare

## Using Git
The following steps are intended as a quick reference, it is highly suggested you read the [official git documentation](https://git-scm.com/doc).

###### Getting Started
If you haven't yet, create your project directory. Be sure to replace the name and email with your git username and email.
```
git clone https://github.com/ericbo/STG-Ludum-Dare.git
git config --global user.name "Username"
git config --global user.email your-email@example.com
```

###### Update Your Project Folder
If changes have been made to the repository you can update it local by using the following command.
```
git pull
```

###### Contributing Your First Work
Navigate to your project directory. Add all of your folders to a commit, then push them to the repository.
```
git add .
git commit -m "You message here"
git push
```

###### Creating a Branch
When implementing new functionality it is recommend that you work off the master branch to reduce commit errors.
```
git branch game-engine
git checkout game-engine
```

###### Merging to master
When you are done implementing feature on a non-master branch you can merge it to the main branch by doing the following:
```
git checkout master
git merge game-engine
```
**Note:** You can optionally delete your branch by running the following: ```git branch -d game-engine```

## Commenting
The commenting conventions listed below were pulled from an [oracle article](http://www.oracle.com/technetwork/articles/java/index-137868.html).

###### Functions and Classes
A code block above each function and class that contain a description. If applicable each parameter is listed below, prefixed with **@param** the description with a description. Similar to parameters return values are prefixed with **@return**.
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
class PlayerSave() {}
```

###### Variables and Global Variables
CamelCase starting with a lower case letter. For example:
```
var playerScore = 0;
```

###### Constants
All upper case with underscore to separate multiple words. For example:
```
var GRAVITY_CONSTANT = 9.81;
```
