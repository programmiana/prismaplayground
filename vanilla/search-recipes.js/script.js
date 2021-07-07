let state = {
  searchString: "",
  wordFound: "",
  somethingFound: false,
  fetch: false,
  showError: false,
  clear: false,
};

const statusMessages = {
  200: "OK",
  201: "Created",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status (WebDAV)",
  208: "Already Reported (WebDAV)",
  226: "IM Used",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  306: "(Unused)",
  307: "Temporary Redirect",
  308: "Permanent Redirect (experimental)",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Request Entity Too Large",
  414: "Request-URI Too Long",
  415: "Unsupported Media Type",
  416: "Requested Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a teapot (RFC 2324)",
  420: "Enhance Your Calm (Twitter)",
  422: "Unprocessable Entity (WebDAV)",
  423: "Locked (WebDAV)",
  424: "Failed Dependency (WebDAV)",
  425: "Reserved for WebDAV",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  444: "No Response (Nginx)",
  449: "Retry With (Microsoft)",
  450: "Blocked by Windows Parental Controls (Microsoft)",
  451: "Unavailable For Legal Reasons",
  499: "Client Closed Request (Nginx)",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates (Experimental)",
  507: "Insufficient Storage (WebDAV)",
  508: "Loop Detected (WebDAV)",
  509: "Bandwidth Limit Exceeded (Apache)",
  510: "Not Extended",
  511: "Network Authentication Required",
  598: "Network read timeout error",
  599: "Network connect timeout error",
};

window.addEventListener("load", () => dispatch(state));

function renderHTML(state) {
  return (app.innerHTML = `<div class="flexbox">
  <h1>Hello, let's look for some HTTP codes</h1>
  <div>
  <form id="form">
    <div>
      <label >Search something:</label>
     
      <input placeholder="search" name="search">
      ${
        state.showError
          ? `<p style="color: red">Oops. This is not a valid HTTP code.</p>`
          : ""
      }
      ${state.searchString !== "" ? "<p>Your search term was:" : ""}
      ${state.searchString !== "" ? state.searchString : ""}
      ${
        state.somethingFound
          ? `<div>
          <img src="https://http.cat/${state.wordFound}.jpg">
      </div>`
          : state.searchString === ""
          ? ""
          : " <p>We found no results.</p>"
      }
    </form>
    </div>

</div>`);
}

function dispatch(state) {
  return renderHTML(state);
}

app.addEventListener("change", (e) => searchValue(e));

function searchValue(e) {
  if (state.wordFound !== "") state.searchValue = "";
  searchValue = e.target.value;
  state.searchString = searchValue;

  if ([...searchValue].length < 3) {
    state.showError = true;
    state.wordFound = "404";
    dispatch(state);
  } else if ([...searchValue].length === 3) {
    const found = Array.from(Object.keys(statusMessages))
      .map((item) => (item.includes(searchValue) ? item : undefined))
      .filter((value) => value !== undefined);

    state.wordFound = found;

    if (found) state.somethingFound = true;

    return dispatch(state);
  }
}
