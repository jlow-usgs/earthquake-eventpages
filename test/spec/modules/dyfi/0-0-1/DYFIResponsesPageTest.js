/* global define, describe, it, beforeEach, afterEach */
define([
	'chai',
	'sinon',
	'dyfi/DYFIModule',
	'dyfi/DYFIResponsesPage',
	'./nc72119970',
	'./cdi_zip',
	'util/Xhr'
], function (
	chai,
	sinon,
	DYFIModule,
	DYFIResponsesPage,
	eventData,
	cdi_zip,
	Xhr
) {

	'use strict';

	var expect = chai.expect,
			stub, content, tbody, rows, hiddenRows, page,
			options = {
					hash: 'responses',
					title: 'Responses',
					eventDetails: eventData,
					module: new DYFIModule()
			};

	describe('DYFIResponsesPage test suite.', function () {

		beforeEach(function() {
			page = new DYFIResponsesPage(options);
			stub = sinon.stub(Xhr, 'ajax', function () {
				var xmlDoc;
				if (window.DOMParser) {
					var parser=new DOMParser();
					xmlDoc=parser.parseFromString(cdi_zip.xml,'text/xml');
				}
				page._buildResponsesTable(page._buildResponsesArray(xmlDoc));
			});

			page._setContentMarkup();

			content = page.getContent();
			tbody = content.querySelector('tbody');
			rows  = tbody.querySelectorAll('tr');
			hiddenRows = tbody.querySelectorAll('.hidden');
		});

		afterEach(function() {
			stub.restore();
		});

		describe('Constructor', function () {
			it('Can be defined.', function () {
				/* jshint -W030 */
				expect(DYFIResponsesPage).not.to.be.undefined;
				/* jshint +W030 */
			});

			it('Can be instantiated', function () {
				expect(page).to.be.an.instanceof(DYFIResponsesPage);
			});
		});

		describe('_setContentMarkup', function () {

			it('can set content.', function () {
				var content = page.getContent();
				expect(content).not.to.be.undefined;
			});
		});

		describe('getContent', function () {

			it('can get content.', function () {
				var content = page.getContent();
				// should equal 2, the table and button should exist
				expect(content.childNodes.length).not.to.equal(0);
			});

			it('will only display 10 rows by default', function () {
				expect(rows.length - hiddenRows.length).to.equal(10);
			});

			it('has all 104 locations from event "nc72119970" in the DOM', function () {
				expect(rows.length).to.equal(104);
			});

			it('shows all 104 locations after the button click', function () {

				var button = content.querySelector('#showResponses');

				button.click();

				content = page.getContent();
				tbody = content.querySelector('tbody');
				rows  = tbody.querySelectorAll('tr');
				hiddenRows = tbody.querySelectorAll('.hidden');

				expect(rows.length - hiddenRows.length).to.equal(104);
			});

		});
	});




});