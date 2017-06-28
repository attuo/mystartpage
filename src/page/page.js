
$(document).ready(function () {
    startTime();
    createLinks();
});


$(document).keypress(function (e) {
    if (e.which == 13) {
        var userInput = $('#searchInput').val();
        console.log(userInput);
        search(userInput);
    }
});

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('currentTimeText').innerHTML =
        h + ":" + m;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}



function createLinks() {

    var settings = {
        categories: [{
                name: "General",
                links: [{
                        short: "r",
                        name: "Reddit",
                        url: "https://reddit.com",
                        queryUrl: "/r/"
                    },
                    {
                        short: "gm",
                        name: "Gmail",
                        url: "https://gmail.com"
                    },
                    {
                        short: "y",
                        name: "Youtube",
                        url: "https://youtube.com",
                        queryUrl: "results?search_query="
                    }
                ]
            },
            {
                name: "News",
                links: [{
                    short: "me",
                    name: "Medium",
                    url: "https://medium.com"
                }]
            },
            {
                name: "Study",
                links: [{
                    short: "!fcc",
                    name: "FreeCodeCamp",
                    url: "https://www.freecodecamp.com/map"
                }]
            },
            {
                name: "Programming",
                links: [{
                    short: "hn",
                    name: "Hacker News",
                    url: "https://news.ycombinator.com/news"
                }]
            }
        ]
    }

    var storingSettings = browser.storage.local.set({
        ["settings"]: settings
    });
    storingSettings.then(() => {
        setDisplay();
    });



}

function setDisplay() {
    var gettingItem = browser.storage.local.get("settings");
    gettingItem.then((result) => {
        var settingsLocal = result;
        var categories = settingsLocal.settings.categories;
        var bookmarksDiv = document.createElement('div');
        bookmarksDiv.className = "bookmarks";
        var listsUl = bookmarksDiv.appendChild(document.createElement('ul'));
        listsUl.className = "lists";

        for (var index in categories) {
            var categoryLi = listsUl.appendChild(document.createElement('li'));
            categoryLi.className = "category";
            var categoryName = categoryLi.appendChild(document.createElement('h2'));
            categoryName.className = "category-name";
            categoryName.innerHTML = categories[index].name;
            var categoryContent = categoryLi.appendChild(document.createElement('ul'));
            categoryContent.className = "category-content";
            console.log(categories[index].name);
            for (var i in categories[index].links) {
                var categoryRow = categoryContent.appendChild(document.createElement('li'));
                var categoryRowLink = categoryRow.appendChild(document.createElement('a'));
                categoryRowLink.textContent = categories[index].links[i].name;
                categoryRowLink.setAttribute('href', categories[index].links[i].url);
            }
        }
        $("body").append(bookmarksDiv);
    });
}

function search(input) {
    var prefix = "!";
    var commands = ["y", "gh", "r"];
    if (input.length > 1 && input.startsWith(prefix)) {
        var realInput = input.substring(1);
        var splitString = realInput.split(" ");
        switch (splitString[0]) {
            case ("y"):
                if (splitString.length == 1) {
                    window.location.href = ("https://www.youtube.com/");
                } else {
                    window.location.href = ("https://www.youtube.com/results?search_query=" + realInput);
                }
                break;
            case ("r"):
                if (splitString.length == 1) {
                    window.location.href = ("https://www.reddit.com/");
                } else {
                    window.location.href = ("https://www.reddit.com/r/" + splitString[1]);
                }
                break;
            case ("gh"):
                if (splitString.length == 1) {
                    window.location.href = ("https://www.github.com")
                }
                break;
            case ("gm"):
                if (splitString.length == 1) {
                    window.location.href = ("https://www.gmail.com");
                }
                break;
        }
    } else window.location.href = ("https://www.startpage.com/do/dsearch?query=" + input);
}