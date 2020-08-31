Using frontend framework / bootstrap / (optional) a bootstrap template, go through the following steps:

For info:
- choose the order of tasks that is most convenient for you
- Create separate commits per task (preferrably one commit per task, reference the task in the commit msg)
- **Create a DEVELOPMENT.md** file that explains how to build and run the app 


# Task 1: Create relations between words

Create a page where a user can fill in 2 words and a relation:

* a word (W1)
* another word (W2)
* a relation: one of (R)
** synonym
** antonym
** related

For example:

| w1   | w2 | r | 
|------|----|---|
| son  |  daughter  | antonym  | 
| road | street   |  synonym |  
| road |  avenue  |  related |  
| synonym |  match  |  related | 
| antonym |  synonym  |  antonym | 

All three parameters need to be non-empty when creating a relation!
This information needs to be stored. You can store this in local storage, but treat it like it would be stored in an external system (API).



# Task 2: List entries

Show a page that prints out a table of words and their relationship


# Task 3: Filter on a type of relation

Allow the user to filter on the relation field on the page that displays the table of all words and relations


| w1   | w2 | r | 
|------|----|---|
| road  |  avenue  | related  | 
| synonym | match   |  related |  



# Task 4: Add an option to also show the inverse relations

If a word has a certain relation, the inverse where W1 and W2 are swapped has the same relation.
For example (based on sample data at top)

| w1   | w2 | r | inverse? | 
|------|----|---|---|
| son  |  daughter  | antonym  | no  | 
| road | street   |  synonym |  no  | 
| road |  avenue  |  related |  no  | 
| synonym |  match  |  related | no  | 
| antonym |  synonym  |  antonym | no  | 
| daughter |  son  |  antonym | yes  | 
| street |  road  |  synonym | yes  | 
| avenue |  road  |  related | yes  | 
| match |  synonym  |  related | yes  | 
| synonym |  antonym  |  antonym | yes  | 


It would show both original data and inverses!


# Task 5: Lowercase all words

Words are always lowercased on save. When a user enters uppercase letters, show a warning explaining that words will be lowercase.
Also trim spaces at start and end.

For example: 
```
Son => son
```


# Task 6: Limit allowed characters

Only characters from A to Z (both lower and uppercase) and space are allowed.

Entering/submitting illegal characters will fail and display a warning to the user. The user should not be able to submit this.


# Task 7: Adding another relation between two words will fail.

If for example
```
   W1: son        W2: daughter  R: antonym
```

then no other relation between these to words is allowed.
An error is reported to the user.


# Task 8: Inverse relation check

Adding the inverse relation also give an error (and does not add the relation)

If I have
```
   W1: son       W2: daughter  R: antonym
```

then adding this
```
   W2: daugther  W2: son       R: antonym
```

would fail.

Display a warning to the user


# Task 9: Create a page for path search

A new page should be created where a user can fill in a form with 2 inputs:
* source
* target

On entering as source "street" and target "avenue" the path would be
```
   street ==(synonym)=> road ==(related)=> avenue
```

Show this path to the user.

> Note: you will need to also look at inverse or transitive relations (if any).



# Task 10: Bonus task

* Option to also return transitive relations

For transitive relations these rules apply
```
   if [W1: x, W2: y, R:synonym] and [W1: y, W2: z, R:synonym] then [W1: x, W2: z, R: synonym]
   if [W1: x, W2: y, R:synonym] and [W1: y, W2: z, R:related] then [W1: x, W2: z, R: related]
```

For example:
```
   W1: road     W2: street    R: synonym
   W1: street   W2: avenue    R: related
```

results in a new 
```
   W1: road     W2: avenue    R: related
```
based on the second rule.

