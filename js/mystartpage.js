function openPage() {
    browser.tabs.update({
        "url": "page.html"
    });
}

browser.tabs.onCreated.addListener(openPage);