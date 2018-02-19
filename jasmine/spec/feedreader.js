/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL 
         * is not empty.
         */
        it('have URLs', function() {
            allFeeds.forEach(function(entry) {
                expect(entry.url).toBeDefined();
                expect(entry.url.length).not.toBe(0);
            });
        });

        /* This test loops through each feed in the allFeeds object and
         * ensures it has a name defined and that the name is not empty.
         */
        it('have names', function() {
            allFeeds.forEach(function(entry) {
                expect(entry.name).toBeDefined();
                expect(entry.name.length).not.toBe(0);
            });
        });
    });


    describe('The menu', function() {
        /* This test ensures the menu element is hidden by default.
         */
        it('is hidden by default', function() {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

         /* This test ensures the menu changes visibility when the
          * menu icon is clicked. It checks for the menu to display
          * when clicked and to hide when clicked again.
          */
         it('shows and hides when clicked', function() {
            document.querySelector(".menu-icon-link").click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            document.querySelector(".menu-icon-link").click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
         });
    });

    describe('Initial Entries', function() {
        /* This test ensures that when the loadFeed function is called
         * and completes its work, there is at least a single .entry
         * element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
              done();
            });
          });

        it('has at least a single .entry element in the .feed container', function(done) {
            expect(document.querySelector('.feed .entry')).not.toBe(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        /* This test ensures that when a new feed is loaded by the
         * loadFeed function, that content actually changes.
         */
        let firstFeed;
        /* I have declared firstFeed as an empty variable above and then
         * assigned it a value in the beforeEach function. If I had only
         * declared and assigned it beforeEach wholly, I would not have had
         * access to it in the spec to test against.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = document.querySelector('.feed').innerHTML;
                loadFeed(1, function() {
                    done();
                });
            });
        });

        it('new feed content changes', function(done) {
            expect(document.querySelector('.feed').innerHTML).not.toBe(firstFeed);
            done();
        });
    });
}());
