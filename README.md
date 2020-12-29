UX Developer Intern & Web Developer Intern Challenge - Summer 2021

Submission by Muherthan Thalayasingam (You can call me Muher - pronounced 'moohere').

As soon as I saw the example screenshot of what you guys would expect, at the bare minimum,
I knew I wanted to split the project into 3 components and React felt like a great way to start.
I decided to practice more React and opted to use the library for this challenge.

I have successfully implemented what was required:
-> Search the OMDB and display the results (movies only).
-> Add a movie from the search results to the nomination list.
-> View the list of films already nominated.
-> Remove a nominee from the nomination list.

And as for the extras/bonuses, I have implemented the ability to save nomination lists if the user
leaves the page. I have also decided to add a few transition/animations for buttons and lists.

I successfully matched all the technical requirements:
    * Used my API key to make the API calls from OMDB.
    * Search result lists the title, year of release, and a button to nominate.
        - The button is disabled upon nominating the movie.
        - (Bonus) The button's text value is changed to Nominated upon disabling.
        - (Bonus) The button has a small animation that I added simply to learn basic transitions.
    * Result list dynamically changes everytime the search field changes. 
        - Using react state changes, the result list is updated everytime the textfield state is changed.
        - (Bonus) Added a button next to the search field to give some helping tips since the API has some limitations.
    * Movies in search results can be added and removed from the nomination list.
        - The button to nominate becomes disabled after nominating the movie, and returns to its original state when 
        the movie is removed from the list.
        - (Bonus) The button to remove nominations has a small animation.
    * Display a banner when the user has 5 nominations.
        - A snackbar is popped up when the user nominates the 5th movie, and for everytime the user tries to
        nominate more.

Extras details:
    * I use cookies to store nomination list upon leaving the page. 
        - I simply conver the list to string and save it in cookie.
        - Whenever the user adds/removes nominations, I update the cookie.
        - When the user re-enters the website, the cookie is converted from string to list.
        - The nomination list is updated based on the list from the cookie.
    * I added some animations/transitions.
        - When the site is launched, there is a loading of the data for about >1s, there is a loading animation there but it's negligible.
        - Whenever you add a nomination, the list grows in size. This is done with a transition.
        - Whenever you remove a nomination, the list decreases in size. This is also done with a transition.
        - When you hover over the Nominatie or Remove button, it will do a small transition.
