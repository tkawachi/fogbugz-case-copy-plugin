// shared script between content script and extension code.

// Url for each case page
var casePageUrlRe = /^(.+\.fogbugz\.com\/default\.asp\?\d+)/;
// Url for list page
var listPageUrlRe = /^(.+\.fogbugz\.com\/)(?:default\.asp(?:\?.*pg=pgList.*)?)?$/;
