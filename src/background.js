function openPage() {
    browser.tabs.update({
        "url": "src/page/page.html"
    });
}

browser.tabs.onCreated.addListener(openPage);