/* Copyright 2016 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*globals require, chrome */

'use strict';

var DEFAULT_URL = 'compressed.tracemonkey-pldi-09.pdf';
var IS_INITIALIZED = false;
var printContainerNode = document.createElement('div');
var printLabelNode = document.createElement('span');
var printNode = document.createElement('button');
var secondaryPrintNode = document.createElement('button');
var downloadNode = document.createElement('button');
var secondaryDownloadNode = document.createElement('button');
var downloadLabelNode = document.createElement('span');

printContainerNode.setAttribute('id', 'printContainer');

printLabelNode.setAttribute('data-l10n-id', 'print_label');
printLabelNode.innerText = 'Print';

printNode.setAttribute('id', 'print');
printNode.setAttribute('class', 'toolbarButton print hiddenMediumView');
printNode.setAttribute('title', 'Print');
printNode.setAttribute('tabindex', 33);
printNode.setAttribute('data-l10n-id', 'print');
printNode.appendChild(printLabelNode);

secondaryPrintNode.setAttribute('id', 'secondaryPrint');
secondaryPrintNode.setAttribute('class', 'secondaryToolbarButton print visibleMediumView');
secondaryPrintNode.setAttribute('title', 'Print');
secondaryPrintNode.setAttribute('tabindex', 53);
secondaryPrintNode.setAttribute('data-l10n-id', 'print');
secondaryPrintNode.appendChild(printLabelNode);

downloadLabelNode.setAttribute('data-l10n-id', 'download_label');
downloadLabelNode.innerText = 'Download';

downloadNode.setAttribute('id', 'download');
downloadNode.setAttribute('class', 'toolbarButton download hiddenMediumView');
downloadNode.setAttribute('title', 'Download');
downloadNode.setAttribute('tabindex', 34);
downloadNode.setAttribute('data-l10n-id', 'download');
downloadNode.appendChild(downloadLabelNode);

secondaryDownloadNode.setAttribute('id', 'secondaryDownload');
secondaryDownloadNode.setAttribute('class', 'secondaryToolbarButton download visibleMediumView');
secondaryDownloadNode.setAttribute('title', 'Download');
secondaryDownloadNode.setAttribute('tabindex', 54);
secondaryDownloadNode.setAttribute('data-l10n-id', 'download');
secondaryDownloadNode.appendChild(downloadLabelNode);

//#if PRODUCTION
//var pdfjsWebLibs = {
//  pdfjsWebPDFJS: window.pdfjsDistBuildPdf
//};
//
//(function () {
//#expand __BUNDLE__
//}).call(pdfjsWebLibs);
//#endif

//#if FIREFOX || MOZCENTRAL
//// FIXME the l10n.js file in the Firefox extension needs global FirefoxCom.
//window.FirefoxCom = pdfjsWebLibs.pdfjsWebFirefoxCom.FirefoxCom;
//#endif

//#if CHROME
//(function rewriteUrlClosure() {
//  // Run this code outside DOMContentLoaded to make sure that the URL
//  // is rewritten as soon as possible.
//  var queryString = document.location.search.slice(1);
//  var m = /(^|&)file=([^&]*)/.exec(queryString);
//  DEFAULT_URL = m ? decodeURIComponent(m[2]) : '';
//
//  // Example: chrome-extension://.../http://example.com/file.pdf
//  var humanReadableUrl = '/' + DEFAULT_URL + location.hash;
//  history.replaceState(history.state, '', humanReadableUrl);
//  if (top === window) {
//    chrome.runtime.sendMessage('showPageAction');
//  }
//})();
//#endif

function getViewerConfiguration() {
  return {
    appContainer: document.body,
    mainContainer: document.getElementById('viewerContainer'),
    viewerContainer:  document.getElementById('viewer'),
    toolbar: {
      numPages: document.getElementById('numPages'),
      pageNumber: document.getElementById('pageNumber'),
      scaleSelectContainer: document.getElementById('scaleSelectContainer'),
      scaleSelect: document.getElementById('scaleSelect'),
      customScaleOption: document.getElementById('customScaleOption'),
      previous: document.getElementById('previous'),
      next: document.getElementById('next'),
      firstPage: document.getElementById('firstPage'),
      lastPage: document.getElementById('lastPage'),
      zoomIn: document.getElementById('zoomIn'),
      zoomOut: document.getElementById('zoomOut'),
      viewFind: document.getElementById('viewFind'),
      openFile: document.createElement('div'),
      print: printNode,
      presentationModeButton: document.getElementById('presentationMode'),
      download: downloadNode,
      viewBookmark: document.createElement('div')
    },
    secondaryToolbar: {
      toolbar: document.getElementById('secondaryToolbar'),
      toggleButton: document.getElementById('secondaryToolbarToggle'),
      presentationModeButton:
        document.getElementById('secondaryPresentationMode'),
      openFile: document.getElementById('secondaryOpenFile'),
      print: secondaryPrintNode,
      download: secondaryDownloadNode,
      viewBookmark: document.createElement('div'),
      firstPage: document.getElementById('firstPage'),
      lastPage: document.getElementById('lastPage'),
      pageRotateCw: document.getElementById('pageRotateCw'),
      pageRotateCcw: document.getElementById('pageRotateCcw'),
      documentPropertiesButton: document.getElementById('documentProperties'),
      toggleHandTool: document.getElementById('toggleHandTool'),
    },
    fullscreen: {
      contextFirstPage: document.getElementById('contextFirstPage'),
      contextLastPage: document.getElementById('contextLastPage'),
      contextPageRotateCw: document.getElementById('contextPageRotateCw'),
      contextPageRotateCcw: document.getElementById('contextPageRotateCcw'),
    },
    sidebar: {
      // Divs (and sidebar button)
      mainContainer: document.getElementById('mainContainer'),
      outerContainer: document.getElementById('outerContainer'),
      toggleButton: document.getElementById('sidebarToggle'),
      // Buttons
      thumbnailButton: document.getElementById('viewThumbnail'),
      outlineButton: document.getElementById('viewOutline'),
      attachmentsButton: document.createElement('div'),

      // Views
      thumbnailView: document.getElementById('thumbnailView'),
      outlineView: document.getElementById('outlineView'),
      attachmentsView: document.createElement('div')
    },
    findBar: {
      bar: document.getElementById('findbar'),
      toggleButton: document.getElementById('viewFind'),
      findField: document.getElementById('findInput'),
      highlightAllCheckbox: document.getElementById('findHighlightAll'),
      caseSensitiveCheckbox: document.getElementById('findMatchCase'),
      findMsg: document.getElementById('findMsg'),
      findResultsCount: document.getElementById('findResultsCount'),
      findStatusIcon: document.getElementById('findStatusIcon'),
      findPreviousButton: document.getElementById('findPrevious'),
      findNextButton: document.getElementById('findNext')
    },
    passwordOverlay: {
      overlayName: 'passwordOverlay',
      container: document.getElementById('passwordOverlay'),
      label: document.getElementById('passwordText'),
      input: document.getElementById('password'),
      submitButton: document.getElementById('passwordSubmit'),
      cancelButton: document.getElementById('passwordCancel')
    },
    documentProperties: {
      overlayName: 'documentPropertiesOverlay',
      container: document.getElementById('documentPropertiesOverlay'),
      closeButton: document.getElementById('documentPropertiesClose'),
      fields: {
        'fileName': document.getElementById('fileNameField'),
        'fileSize': document.getElementById('fileSizeField'),
        'title': document.getElementById('titleField'),
        'author': document.getElementById('authorField'),
        'subject': document.getElementById('subjectField'),
        'keywords': document.getElementById('keywordsField'),
        'creationDate': document.getElementById('creationDateField'),
        'modificationDate': document.getElementById('modificationDateField'),
        'creator': document.getElementById('creatorField'),
        'producer': document.getElementById('producerField'),
        'version': document.getElementById('versionField'),
        'pageCount': document.getElementById('pageCountField')
      }
    },
    errorWrapper: {
      container: document.getElementById('errorWrapper'),
      errorMessage: document.getElementById('errorMessage'),
      closeButton: document.getElementById('errorClose'),
      errorMoreInfo: document.getElementById('errorMoreInfo'),
      moreInfoButton: document.getElementById('errorShowMore'),
      lessInfoButton: document.getElementById('errorShowLess'),
    },
    printContainer: printContainerNode,
    openFileInputName: 'fileInput',
  };
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function sendMessage(msg) {
  if (window === window.parent) {
    return;
  }

  window.parent.postMessage(msg, window.location.origin);
}

function receiveMessage(e) {
  if (e.origin !== window.location.origin) {
    return;
  }

  switch (e.data.type) {
    case 'initialize':
      webViewerLoad(e.data.allowPrinting, e.data.allowDownloading);
      // intentional fall-through case statement. 'initialize' should also 'open'
    case 'open':
      PDFViewerApplication.open(e.data.url);
      break;
    default:
      console.warn('no handler for message type:', e.data.type);
  }
}

function onDOMContentLoaded() {
  sendMessage('ready');
}

function webViewerLoad() {
  var config = getViewerConfiguration();
//#if !PRODUCTION
  require.config({paths: {'pdfjs': '../src', 'pdfjs-web': '.'}});
  require(['pdfjs-web/app'], function (web) {
    window.PDFViewerApplication = web.PDFViewerApplication;
    web.PDFViewerApplication.run(config);
  });
//#else
//window.PDFViewerApplication = pdfjsWebLibs.pdfjsWebApp.PDFViewerApplication;
//pdfjsWebLibs.pdfjsWebApp.PDFViewerApplication.run(config);
//#endif
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded, true);
window.addEventListener('message', recieveMessage, false);
