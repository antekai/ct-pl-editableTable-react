​​​​​# Exercise

## Aim

Create an angular app which displays a pre-defined data set in a table and 
allows the user to edit a single item in a different view. To simulate an API 
call we've created a mockup-data-file (json). This is the server response. 

## Basic Requirements

- The app should be build using the following stack
	- Angular
	- Typescript    
	- Observables
	- (feel free to use any 3rd party plugin which helps you)

- Two seperate views
	- Table-View: displays the whole data
	- Edit-View: form for editing single item

## Table View

- Create a table and show the data in a formatted way
	- "camp_cpc" should be formatted as currency (€) 
	- "date" should be formatted in german style (DD.MM.YYYY - HH:MM)
	- create a button / link in each row to access the Edit-View

## Edit View (form)

- Create a simple form with the following fields. Use suitable form elements 
  given in parentheses
	- camp_cpc ( number // format: currency (€) )
	- date ( date / time // format: DD.MM.YYYY / HH:MM )
	- freeclick ( checkbox // options: true | false )
	- network (radio // options: a | b | c )
	- PlistaProduct ( select // options: Product 1 | Product 2 | Product n )

- Use Angular Reactive Forms, Observable/Promises
- Add a basic validation which prevents the user from inputting invalid values 
  or leaving an input blank.
- In case of validation error notify the user about that (it is up to you how 
  you could do that)

## Nice to have

- Simple responsive layout
    (If you have experiences in any CSS grid system feel free to use it!)
