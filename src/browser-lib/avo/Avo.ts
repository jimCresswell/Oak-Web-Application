// Generated by Avo VERSION 108.0.0. You should never have to make changes to this file.
// If you find yourself in the situation where you have to edit the file please contact us at hi@avo.app.
// If you encounter a git conflict in this file run `avo pull` and it will be resolved automatically.
/* tslint:disable */
/* eslint-disable */

// fetch() polyfill
(function () {
  if (typeof window === "undefined") {
    return;
  }
  var support = {
    searchParams: "URLSearchParams" in self,
    iterable: "Symbol" in self && "iterator" in Symbol,
    blob:
      "FileReader" in self &&
      "Blob" in self &&
      (function () {
        try {
          new Blob();
          return true;
        } catch (e) {
          return false;
        }
      })(),
    formData: "FormData" in self,
    arrayBuffer: "ArrayBuffer" in self,
  };

  function isDataView(obj: any) {
    return obj && DataView.prototype.isPrototypeOf(obj);
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      "[object Int8Array]",
      "[object Uint8Array]",
      "[object Uint8ClampedArray]",
      "[object Int16Array]",
      "[object Uint16Array]",
      "[object Int32Array]",
      "[object Uint32Array]",
      "[object Float32Array]",
      "[object Float64Array]",
    ];

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function (obj) {
        return (
          obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
        );
      };
  }

  function normalizeName(name: any) {
    if (typeof name !== "string") {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
      throw new TypeError("Invalid character in header field name");
    }
    return name.toLowerCase();
  }

  function normalizeValue(value: any) {
    if (typeof value !== "string") {
      value = String(value);
    }
    return value;
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items: any) {
    var iterator: any = {
      next: function () {
        var value = items.shift();
        return { done: value === undefined, value: value };
      },
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }

  function Headers(headers: any) {
    // @ts-ignore
    (this as any).map = {};

    if (headers instanceof Headers) {
      (headers as any).forEach(function (value: any, name: any) {
        // @ts-ignore
        this.append(name, value);
        // @ts-ignore
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function (header: any) {
        // @ts-ignore
        this.append(header[0], header[1]);
        // @ts-ignore
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name: any) {
        // @ts-ignore
        this.append(name, headers[name]);
        // @ts-ignore
      }, this);
    }
  }

  Headers.prototype.append = function (name: any, value: any) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ", " + value : value;
  };

  Headers.prototype["delete"] = function (name: any) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name: any) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  };

  Headers.prototype.has = function (name: any) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name: any, value: any) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function (callback: any, thisArg: any) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function () {
    var items: any = [];
    this.forEach(function (_value: any, name: any) {
      items.push(name);
    });
    return iteratorFor(items);
  };

  Headers.prototype.values = function () {
    var items: any = [];
    this.forEach(function (value: any) {
      items.push(value);
    });
    return iteratorFor(items);
  };

  Headers.prototype.entries = function () {
    var items: any = [];
    this.forEach(function (value: any, name: any) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body: any) {
    if (body.bodyUsed) {
      return true;
    }
    body.bodyUsed = true;
    return false;
  }

  function fileReaderReady(reader: any) {
    return new Promise(function (resolve: any, reject: any) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob: any) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }

  function readBlobAsText(blob: any) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise;
  }

  function readArrayBufferAsText(buf: any) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]!);
    }
    return chars.join("");
  }

  function bufferClone(buf: any) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }

  function Body() {
    // @ts-ignore
    (this as any).bodyUsed = false;

    // @ts-ignore
    (this as any)._initBody = function (body: any) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = "";
      } else if (typeof body === "string") {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (
        support.searchParams &&
        URLSearchParams.prototype.isPrototypeOf(body)
      ) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (
        support.arrayBuffer &&
        (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))
      ) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get("content-type")) {
        if (typeof body === "string") {
          this.headers.set("content-type", "text/plain;charset=UTF-8");
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set("content-type", this._bodyBlob.type);
        } else if (
          support.searchParams &&
          URLSearchParams.prototype.isPrototypeOf(body)
        ) {
          this.headers.set(
            "content-type",
            "application/x-www-form-urlencoded;charset=UTF-8"
          );
        }
      }
    };

    if (support.blob) {
      // @ts-ignore
      (this as any).blob = function () {
        var rejected = consumed(this);
        if (rejected) {
          return Promise.reject(new TypeError("Already read"));
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error("could not read FormData body as blob");
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      // @ts-ignore
      (this as any).arrayBuffer = function () {
        if (this._bodyArrayBuffer) {
          if (consumed(this)) {
            return Promise.reject(new TypeError("Already read"));
          } else {
            return Promise.resolve(this._bodyArrayBuffer);
          }
        } else {
          return this.blob().then(readBlobAsArrayBuffer);
        }
      };
    }

    // @ts-ignore
    (this as any).text = function () {
      var rejected = consumed(this);
      if (rejected) {
        return Promise.reject(new TypeError("Already read"));
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error("could not read FormData body as text");
      } else {
        return Promise.resolve(this._bodyText);
      }
    };

    if (support.formData) {
      // @ts-ignore
      (this as any).formData = function () {
        return this.text().then(decode);
      };
    }

    // @ts-ignore
    (this as any).json = function () {
      return this.text().then(JSON.parse);
    };

    // @ts-ignore
    return this;
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];

  function normalizeMethod(method: any) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input: any, options: any) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if ((input as any).bodyUsed) {
        throw new TypeError("Already read");
      }
      // @ts-ignore
      (this as any).url = (input as any).url;
      // @ts-ignore
      this.credentials = (input as any).credentials;
      if (!options.headers) {
        // @ts-ignore
        this.headers = new Headers((input as any).headers);
      }
      // @ts-ignore
      this.method = (input as any).method;
      // @ts-ignore
      this.mode = (input as any).mode;
      // @ts-ignore
      this.signal = (input as any).signal;
      if (!body && (input as any)._bodyInit != null) {
        body = (input as any)._bodyInit;
        (input as any).bodyUsed = true;
      }
    } else {
      // @ts-ignore
      this.url = String(input);
    }

    // @ts-ignore
    this.credentials = options.credentials || this.credentials || "same-origin";
    // @ts-ignore
    if (options.headers || !this.headers) {
      // @ts-ignore
      this.headers = new Headers(options.headers);
    }
    // @ts-ignore
    this.method = normalizeMethod(options.method || this.method || "GET");
    // @ts-ignore
    this.mode = options.mode || this.mode || null;
    // @ts-ignore
    this.signal = options.signal || this.signal;
    // @ts-ignore
    this.referrer = null;

    // @ts-ignore
    if ((this.method === "GET" || this.method === "HEAD") && body) {
      throw new TypeError("Body not allowed for GET or HEAD requests");
    }
    // @ts-ignore
    this._initBody(body);
  }

  Request.prototype.clone = function () {
    // @ts-ignore
    return new Request(this, { body: this._bodyInit });
  };

  function decode(body: any) {
    var form = new FormData();
    body
      .trim()
      .split("&")
      .forEach(function (bytes: any) {
        if (bytes) {
          var split = bytes.split("=");
          var name = split.shift().replace(/\+/g, " ");
          var value = split.join("=").replace(/\+/g, " ");
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form;
  }

  function parseHeaders(rawHeaders: any) {
    // @ts-ignore
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
    preProcessedHeaders.split(/\r?\n/).forEach(function (line: any) {
      var parts = line.split(":");
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(":").trim();
        headers.append(key, value);
      }
    });
    return headers;
  }

  Body.call(Request.prototype);

  function Response(bodyInit: any, options: any) {
    if (!options) {
      options = {};
    }

    // @ts-ignore
    this.type = "default";
    // @ts-ignore
    this.status = options.status === undefined ? 200 : options.status;
    // @ts-ignore
    this.ok = this.status >= 200 && this.status < 300;
    // @ts-ignore
    this.statusText = "statusText" in options ? options.statusText : "OK";
    // @ts-ignore
    this.headers = new Headers(options.headers);
    // @ts-ignore
    this.url = options.url || "";
    // @ts-ignore
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function () {
    // @ts-ignore
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      // @ts-ignore
      headers: new Headers(this.headers),
      url: this.url,
    });
  };

  Response.error = function () {
    // @ts-ignore
    var response = new Response(null, { status: 0, statusText: "" });
    response.type = "error";
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function (url: any, status: any) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError("Invalid status code");
    }

    // @ts-ignore
    return new Response(null, { status: status, headers: { location: url } });
  };

  (self as any).DOMException = (self as any).DOMException;
  try {
    new (self as any).DOMException();
  } catch (err) {
    (self as any).DOMException = function (message: any, name: any) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    (self as any).DOMException.prototype = Object.create(Error.prototype);
    (self as any).DOMException.prototype.constructor = (
      self as any
    ).DOMException;
  }

  function fetch(input: any, init: any) {
    return new Promise(function (resolve, reject) {
      // @ts-ignore
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new (self as any).DOMException("Aborted", "AbortError"));
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || ""),
        };
        (options as any).url =
          "responseURL" in xhr
            ? xhr.responseURL
            : options.headers.get("X-Request-URL");
        var body = "response" in xhr ? xhr.response : (xhr as any).responseText;
        // @ts-ignore
        resolve(new Response(body, options));
      };

      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };

      xhr.ontimeout = function () {
        reject(new TypeError("Network request failed"));
      };

      xhr.onabort = function () {
        reject(new (self as any).DOMException("Aborted", "AbortError"));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === "include") {
        xhr.withCredentials = true;
      } else if (request.credentials === "omit") {
        xhr.withCredentials = false;
      }

      if ("responseType" in xhr && support.blob) {
        xhr.responseType = "blob";
      }

      request.headers.forEach(function (value: any, name: any) {
        xhr.setRequestHeader(name, value);
      });

      if (request.signal) {
        request.signal.addEventListener("abort", abortXhr);

        xhr.onreadystatechange = function () {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener("abort", abortXhr);
          }
        };
      }

      xhr.send(
        typeof request._bodyInit === "undefined" ? null : request._bodyInit
      );
    });
  }

  fetch.polyfill = true;

  if (!self.fetch) {
    (self as any).fetch = fetch;
    (self as any).Headers = Headers;
    (self as any).Request = Request;
    (self as any).Response = Response;
  }
})();

export enum AvoEnv {
  Prod = "prod",
  Dev = "dev",
}

export interface CustomDestination {
  make?(env: string, apiKey: string): void;
  logEvent?: (eventName: string, eventProperties: object) => void;
  setUserProperties?: (userId: string, userProperties: object) => void;
  identify?: (userId: string) => void;
  unidentify?: () => void;
  logPage?: (pageName: string, eventProperties: object) => void;
  revenue?: (amount: number, eventProperties: object) => void;
  setGroupProperties?: (
    groupType: string,
    groupId: string,
    groupProperties: object
  ) => void;
  addCurrentUserToGroup?: (
    groupType: string,
    groupId: string,
    groupProperties: object
  ) => void;
  logEventWithGroups?: (
    eventName: string,
    eventProperties: object,
    groupTypesToGroupIds: object
  ) => void;
}

// @ts-ignore
interface AvoAssertMessage {
  eventName?: string;
  tag?: string;
  propertyId?: string;
  message?: string;
  additionalProperties?: string[];
  shape?: object;
  shapeUserProps?: object;
  actualType?: string;
}

let __AVO_ENV__: AvoEnv | null = null;
// @ts-ignore
let __AVO_NOOP__: boolean = false;
// @ts-ignore
let __AVO_LOGGER__: AvoLogger | null = null;
// @ts-ignore
let __STRICT__: boolean | null = null;
// @ts-ignore
let __REPORT_FAILURE_AS__: "error" | "warn" | "log" | null = null;

// @ts-ignore
let __WEB_DEBUGGER__: boolean = true;
export const avoInspectorApiKey = "y47zGw9z6nGvrmpXdNxF";
// @ts-ignore
interface AvoInspector {}
let __INSPECTOR__: AvoInspector | null = null;

// polyfill Object.assign
// @ts-ignore
declare interface ObjectConstructor {
  assign: any;
}
// @ts-ignore
if (typeof Object.assign !== "function") {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target: any, _varArgs: any) {
      // .length of function is 2
      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError("Cannot convert undefined or null to object");
      }

      let to = Object(target);

      for (let index = 1; index < arguments.length; index++) {
        let nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (let nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true,
  });
}

interface AvoLogger {
  logDebug(env: AvoEnv | null, message: string): boolean;
  logWarn(env: AvoEnv | null, message: string): boolean;
  logError(env: AvoEnv | null, error: string): boolean;
}

let InternalAvoLogger: any = {
  logEventSent: function logEventSent(
    eventName: string,
    eventProperties: any,
    userProperties: any
  ) {
    const message =
      "Event Sent:" +
      eventName +
      "Event Props:" +
      JSON.stringify(eventProperties) +
      "User Props:" +
      JSON.stringify(userProperties);

    if (
      __AVO_LOGGER__ &&
      __AVO_LOGGER__.logDebug &&
      __AVO_LOGGER__.logDebug(__AVO_ENV__, message)
    ) {
      return;
    }
    typeof console !== "undefined" &&
      console.log(
        "[avo] Event Sent:",
        eventName,
        "Event Props:",
        eventProperties,
        "User Props:",
        userProperties
      );
  },

  log: function log(message: string) {
    if (
      __AVO_LOGGER__ &&
      __AVO_LOGGER__.logDebug &&
      __AVO_LOGGER__.logDebug(__AVO_ENV__, message)
    ) {
      return;
    }
    typeof console !== "undefined" && console.log("[avo] " + message);
  },

  warn: function warn(message: string) {
    if (
      __AVO_LOGGER__ &&
      __AVO_LOGGER__.logWarn &&
      __AVO_LOGGER__.logWarn(__AVO_ENV__, message)
    ) {
      return;
    }
    typeof console !== "undefined" && console.warn("[avo] " + message);
  },

  error: function error(message: string, error: string) {
    if (
      __AVO_LOGGER__ &&
      __AVO_LOGGER__.logError &&
      __AVO_LOGGER__.logError(__AVO_ENV__, message + error)
    ) {
      return;
    }
    typeof console !== "undefined" && console.error("[avo] " + message, error);
  },
};

// @ts-ignore
let array_difference: any;
// @ts-ignore
let AvoAssert: any;
array_difference = function array_difference(a1: any[], a2: any[]) {
  let result: any[] = [];
  for (let i = 0; i < a1.length; i++) {
    if (a2.indexOf(a1[i]) === -1) {
      result.push(a1[i]);
    }
  }
  return result;
};

AvoAssert = {
  assertObject: function assertObject(
    propertyId: string,
    propName: string,
    obj: object
  ) {
    if (typeof obj !== "object") {
      let message =
        propName +
        " should be of type object but you provided type " +
        typeof obj +
        " with value " +
        JSON.stringify(obj);
      return [
        {
          tag: "expectedObjectType",
          propertyId,
          message,
          actualType: typeof obj,
        },
      ];
    } else {
      return [];
    }
  },

  assertString: function assertString(
    propertyId: string,
    propName: string,
    str: string
  ) {
    if (typeof str !== "string") {
      let message =
        propName +
        " should be of type string but you provided type " +
        typeof str +
        " with value " +
        JSON.stringify(str);
      return [
        {
          tag: "expectedStringType",
          propertyId,
          message,
          actualType: typeof str,
        },
      ];
    } else {
      return [];
    }
  },

  assertInt: function assertInt(
    propertyId: string,
    propName: string,
    int: number
  ) {
    if (typeof int === "number" && int !== Math.round(int)) {
      let message =
        propName +
        " should be of type int but you provided type float with value " +
        JSON.stringify(int);
      return [
        { tag: "expectedIntType", propertyId, message, actualType: "float" },
      ];
    } else if (typeof int !== "number") {
      let message =
        propName +
        " should be of type int but you provided type " +
        typeof int +
        " with value " +
        JSON.stringify(int);
      return [
        { tag: "expectedIntType", propertyId, message, actualType: typeof int },
      ];
    } else {
      return [];
    }
  },

  assertLong: function assertLong(
    propertyId: string,
    propName: string,
    long: number
  ) {
    if (typeof long === "number" && long !== Math.round(long)) {
      let message =
        propName +
        " should be of type long but you provided type float with value " +
        JSON.stringify(long);
      return [
        { tag: "expectedLongType", propertyId, message, actualType: "float" },
      ];
    } else if (typeof long !== "number") {
      let message =
        propName +
        " should be of type long but you provided type " +
        typeof long +
        " with value " +
        JSON.stringify(long);
      return [
        {
          tag: "expectedLongType",
          propertyId,
          message,
          actualType: typeof long,
        },
      ];
    } else {
      return [];
    }
  },

  assertFloat: function assertFloat(
    propertyId: string,
    propName: string,
    float: number
  ) {
    if (typeof float !== "number") {
      let message =
        propName +
        " should be of type float but you provided type " +
        typeof float +
        " with value " +
        JSON.stringify(float);
      return [
        {
          tag: "expectedFloatType",
          propertyId,
          message,
          actualType: typeof float,
        },
      ];
    } else {
      return [];
    }
  },

  assertBool: function assertBool(
    propertyId: string,
    propName: string,
    bool: boolean
  ) {
    if (typeof bool !== "boolean") {
      let message =
        propName +
        " should be of type boolean but you provided type " +
        typeof bool +
        " with value " +
        JSON.stringify(bool);
      return [
        {
          tag: "expectedBoolType",
          propertyId,
          message,
          actualType: typeof bool,
        },
      ];
    } else {
      return [];
    }
  },

  assertMax: function assertMax(
    propertyId: string,
    propName: string,
    max: number,
    value: number
  ) {
    if (value > max) {
      let message =
        propName +
        " has a maximum value of " +
        max +
        " but you provided the value " +
        JSON.stringify(value);
      return [{ tag: "expectedMax", propertyId, message }];
    } else {
      return [];
    }
  },

  assertMin: function assertMin(
    propertyId: string,
    propName: string,
    min: number,
    value: number
  ) {
    if (value < min) {
      let message =
        propName +
        " has a minimum value of " +
        min +
        " but you provided the value " +
        JSON.stringify(value);
      return [{ tag: "expectedMin", propertyId, message }];
    } else {
      return [];
    }
  },

  assertList: function assertList(
    propertyId: string,
    propName: string,
    value: any
  ) {
    if (!Array.isArray(value)) {
      let message =
        propName +
        " should be of type list but you provided type " +
        typeof value;
      return [{ tag: "expectedList", propertyId, message }];
    } else {
      return [];
    }
  },

  assertNoAdditionalProperties: function assertNoAdditionalProperties(
    eventName: string,
    input: string[],
    spec: string[]
  ) {
    let additionalKeys = array_difference(input, spec);
    if (additionalKeys.length) {
      let message =
        "Additional properties when sending event " +
        eventName +
        ": " +
        JSON.stringify(additionalKeys);
      return [
        {
          tag: "expectedNoAdditionalProperties",
          additionalProperties: additionalKeys,
          message: message,
        },
      ];
    } else {
      return [];
    }
  },

  assertNoAdditionalUserProperties: function assertNoAdditionalProperties(
    eventName: string,
    input: string[],
    spec: string[]
  ) {
    let additionalKeys = array_difference(input, spec);
    if (additionalKeys.length) {
      let message =
        "Additional user properties when sending event " +
        eventName +
        ": " +
        JSON.stringify(additionalKeys);
      return [
        {
          tag: "expectedNoAdditionalUserProperties",
          additionalProperties: additionalKeys,
          message: message,
        },
      ];
    } else {
      return [];
    }
  },
};

let _avo_invoke: any;
let _avo_invoke_meta: any;
let _avo_sampling_rate = 1.0;
_avo_invoke = function _avo_invoke(
  env: string,
  eventId: string,
  hash: string,
  messages: { tag: string; propertyId: string }[],
  origin: string
) {
  // @ts-ignore
  if (typeof (window as any) === "undefined") {
    return;
  }
  if (_avo_sampling_rate > 0) {
    if (Math.random() < _avo_sampling_rate) {
      // @ts-ignore
      fetch("https://api.avo.app/i", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ac: "to4O0RO7fKnoyI0Q2RKk",
          br: "K1r2E3SJM",
          en: env,
          ev: eventId,
          ha: hash,
          sc: "5PhajbVijwhXVKIJtGMT",
          se: new Date().toISOString(),
          so: "GwV5t09tc",
          va: messages.length === 0,
          me: messages,
          or: origin,
        }),
      })
        .then(function (res: any) {
          return res.json();
        })
        .then(function (data: any) {
          _avo_sampling_rate = data.sa;
        })
        .catch(function () {});
    }
  }
};

_avo_invoke_meta = function _avo_invoke_meta(
  env: string,
  type: string,
  messages: { tag: string; propertyId: string }[],
  origin: string
) {
  // @ts-ignore
  if (typeof (window as any) === "undefined") {
    return;
  }
  if (_avo_sampling_rate > 0) {
    if (Math.random() < _avo_sampling_rate) {
      // @ts-ignore
      fetch("https://api.avo.app/i", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ac: "to4O0RO7fKnoyI0Q2RKk",
          br: "K1r2E3SJM",
          en: env,
          ty: type,
          sc: "5PhajbVijwhXVKIJtGMT",
          se: new Date().toISOString(),
          so: "GwV5t09tc",
          va: messages.length === 0,
          me: messages,
          or: origin,
        }),
      })
        .then(function (res: any) {
          return res.json();
        })
        .then(function (data: any) {
          _avo_sampling_rate = data.sa;
        })
        .catch(function () {});
    }
  }
};

let _avo_debugger_log: any;
let _avo_debugger_events_during_boot: any = [];
let _avo_debugger_ready = false;

if (typeof (window as any) !== "undefined") {
  window.addEventListener("message", function (event) {
    if (event.origin !== "https://www.avo.app") {
      return;
    }
    let iframe: any = document.getElementById("avo-debugger");
    if (
      iframe &&
      event &&
      event.data &&
      event.data.type_ === "avo-debugger-update-style"
    ) {
      iframe.style = event.data.style;
    } else if (
      iframe &&
      event &&
      event.data &&
      event.data.type_ === "avo-debugger-ready"
    ) {
      let message = {
        type_: "avo-debugger-boot-events",
        schemaId: "5PhajbVijwhXVKIJtGMT",
        href: window.location.href,
        events: _avo_debugger_events_during_boot,
      };
      _avo_debugger_events_during_boot = [];
      _avo_debugger_ready = true;
      iframe.contentWindow.postMessage(
        message,
        "https://www.avo.app/_debugger"
      );
    }
  });
}

_avo_debugger_log = function _avo_debugger_log(
  eventId: string,
  eventName: string,
  messages: any[],
  eventProperties: any[],
  userProperties: any[]
) {
  if (typeof (window as any) === "undefined") {
    return;
  }
  let event = {
    eventId: eventId,
    eventName: eventName,
    messages: messages,
    timestamp: Date.now(),
    eventProperties,
    userProperties,
  };

  if (_avo_debugger_ready) {
    let message = { type_: "avo-debugger-events", events: [event] };
    (document.getElementById("avo-debugger") as any).contentWindow.postMessage(
      message,
      "https://www.avo.app/_debugger"
    );
  } else {
    _avo_debugger_events_during_boot.push(event);
  }
};

let PostHog: any;

export function initAvo(
  options: {
    env: AvoEnv;
    webDebugger?: boolean;
    strict?: boolean;
    noop?: boolean;
    reportFailureAs?: "error" | "warn" | "log";
    inspector?: AvoInspector;
    avoLogger?: AvoLogger;
  },
  destinationOptions: any,
  PostHogDestination: CustomDestination
) {
  if (__AVO_ENV__ !== null) {
    return;
  }
  __AVO_ENV__ = options.env;
  if (options.avoLogger !== undefined) {
    __AVO_LOGGER__ = options.avoLogger;
  }
  if (options.noop === true) {
    __AVO_NOOP__ = true;
  }
  if (__AVO_NOOP__ && __AVO_ENV__ == AvoEnv.Prod) {
    InternalAvoLogger.warn(
      "[avo] ****************************************************"
    );
    InternalAvoLogger.warn(
      "[avo] WARNING Avo cannot be initialized in noop mode in production:"
    );
    InternalAvoLogger.warn(
      "[avo] - Overwriting configuration with noop=false."
    );
    InternalAvoLogger.warn(
      "[avo] - Please reach out if you want to be able to run Avo in production mode with noop=true"
    );
    InternalAvoLogger.warn(
      "[avo] ****************************************************"
    );
    __AVO_NOOP__ = false;
  }
  if (__AVO_NOOP__) {
    InternalAvoLogger.log(
      "[avo] ****************************************************"
    );
    InternalAvoLogger.log(
      "[avo] Avo is now initialized in noop mode. This means:"
    );
    InternalAvoLogger.log("[avo] - No events will be sent");
    InternalAvoLogger.log("[avo] - No network requests are made");
    InternalAvoLogger.log(
      "[avo] ****************************************************"
    );
  }
  if (options.strict !== undefined) {
    __STRICT__ = options.strict !== false;
  }
  if (options.reportFailureAs !== undefined) {
    __REPORT_FAILURE_AS__ = options.reportFailureAs;
  }
  __WEB_DEBUGGER__ =
    !__AVO_NOOP__ &&
    ((typeof window !== "undefined" &&
      (window as any).location.search.indexOf("avo_debug=1") > -1) ||
      (options.webDebugger !== false && __AVO_ENV__ !== AvoEnv.Prod));
  if (!__AVO_NOOP__ && options.inspector !== undefined) {
    __INSPECTOR__ = options.inspector;
  } else if (__AVO_ENV__ !== "prod") {
    InternalAvoLogger.warn(
      "[avo] Avo Inspector not provided in initAvo() call"
    );
  }

  destinationOptions = destinationOptions || {};

  if (__WEB_DEBUGGER__ && !__AVO_NOOP__) {
    (function () {
      if (typeof (window as any) === "undefined") {
        return;
      }
      let init = function () {
        let iframe: any = document.createElement("iframe");
        document.body.appendChild(iframe);
        iframe.id = "avo-debugger";
        iframe.src = "https://www.avo.app/_debugger";
        iframe.style = "display: none;";
      };

      if (document.body) {
        init();
      } else {
        document.addEventListener("DOMContentLoaded", init);
      }
    })();
  }
  if (!__AVO_NOOP__) {
    if (__AVO_ENV__ === AvoEnv.Prod) {
    }
    if (__AVO_ENV__ === AvoEnv.Dev) {
    }

    PostHog = PostHogDestination;
    if (__AVO_ENV__ === "prod") {
      PostHog && PostHog.make && PostHog.make(__AVO_ENV__, null);
    } else if (__AVO_ENV__ === "dev") {
      PostHog && PostHog.make && PostHog.make(__AVO_ENV__, null);
    } else {
      console[__REPORT_FAILURE_AS__ || "error"](
        "[avo] No staging key is set for PostHog. Head to destination settings in Avo to set a staging key."
      );
      PostHog && PostHog.make && PostHog.make(__AVO_ENV__, null);
    }
    if (__AVO_ENV__ === AvoEnv.Dev) {
      // debug console in Avo
      _avo_invoke_meta(__AVO_ENV__, "init", [], "init");
    }
  }
}

export function setAvoLogger(avoLogger: AvoLogger | null) {
  __AVO_LOGGER__ = avoLogger;
}

export interface HomeButtonClickedProperties {
  clickedOnText: boolean;
}
/**
 * Home Button Clicked: When the user clicks the home button
 *
 * @param properties the properties associatied with this event
 * @param properties.clickedOnText: was it the text that was clicked on?
 *
 * @see {@link https://www.avo.app/schemas/5PhajbVijwhXVKIJtGMT/branches/K1r2E3SJM/events/RsDNYprEyc}
 */
export function homeButtonClicked(properties: HomeButtonClickedProperties) {
  // assert properties
  if (__AVO_ENV__ !== AvoEnv.Prod || __WEB_DEBUGGER__) {
    let messages: AvoAssertMessage[] = [];
    // debug console in Avo
    if (!__AVO_NOOP__) {
      _avo_invoke(
        __AVO_ENV__,
        "RsDNYprEyc",
        "0bf2a842ff74bf21c94dda0d536a918a8ca877b89e3b1de4bded628bdd0a1cba",
        messages.map((m) =>
          Object.assign(
            {},
            {
              tag: m.tag,
              propertyId: m.propertyId,
              additionalProperties: m.additionalProperties,
              actualType: m.actualType,
            }
          )
        ),
        "event"
      );
    }
    InternalAvoLogger.logEventSent(
      "Home Button Clicked",
      {
        "Clicked on text": properties.clickedOnText,
      },
      {}
    );
    if (__WEB_DEBUGGER__) {
      // Avo web debugger
      _avo_debugger_log(
        "RsDNYprEyc",
        "Home Button Clicked",
        messages,
        [
          {
            id: "uNgcaDvVdC",
            name: "Clicked on text",
            value: properties.clickedOnText,
          },
        ],
        []
      );
    }
  }

  // @ts-ignore
  let eventProperties: any = {};
  eventProperties["Clicked on text"] = properties.clickedOnText;

  // @ts-ignore
  let userProperties: any = {};

  if (!__AVO_NOOP__) {
    if (__INSPECTOR__ != null) {
      // @ts-ignore
      __INSPECTOR__._avoFunctionTrackSchemaFromEvent(
        "Home Button Clicked",
        {
          "Clicked on text": properties.clickedOnText,
        },
        "RsDNYprEyc",
        "0bf2a842ff74bf21c94dda0d536a918a8ca877b89e3b1de4bded628bdd0a1cba"
      );
    }
    // destination PostHog
    PostHog.logEvent(
      "Home Button Clicked",
      (Object as any).assign({}, eventProperties)
    );
  } else {
    // do nothing
  }
}

export interface ButtonClickedProperties {
  buttonIdentifier: string;
}
/**
 * Button Clicked: User clicked a button
 *
 * @param properties the properties associatied with this event
 * @param properties.buttonIdentifier: Unique identifier for the button, which button was clicked?
 *
 * @see {@link https://www.avo.app/schemas/5PhajbVijwhXVKIJtGMT/branches/K1r2E3SJM/events/rN-mhyPzHT}
 */
export function buttonClicked(properties: ButtonClickedProperties) {
  // assert properties
  if (__AVO_ENV__ !== AvoEnv.Prod || __WEB_DEBUGGER__) {
    let messages: AvoAssertMessage[] = [];
    // debug console in Avo
    if (!__AVO_NOOP__) {
      _avo_invoke(
        __AVO_ENV__,
        "rN-mhyPzHT",
        "d5227d7fd99d7e73757056ae79901ab11e8eb895a2b22f5b6e408618e25f2a8c",
        messages.map((m) =>
          Object.assign(
            {},
            {
              tag: m.tag,
              propertyId: m.propertyId,
              additionalProperties: m.additionalProperties,
              actualType: m.actualType,
            }
          )
        ),
        "event"
      );
    }
    InternalAvoLogger.logEventSent(
      "Button Clicked",
      {
        "Button identifier": properties.buttonIdentifier,
      },
      {}
    );
    if (__WEB_DEBUGGER__) {
      // Avo web debugger
      _avo_debugger_log(
        "rN-mhyPzHT",
        "Button Clicked",
        messages,
        [
          {
            id: "PwsCd0oFus",
            name: "Button identifier",
            value: properties.buttonIdentifier,
          },
        ],
        []
      );
    }
  }

  // @ts-ignore
  let eventProperties: any = {};
  eventProperties["Button identifier"] = properties.buttonIdentifier;

  // @ts-ignore
  let userProperties: any = {};

  if (!__AVO_NOOP__) {
    if (__INSPECTOR__ != null) {
      // @ts-ignore
      __INSPECTOR__._avoFunctionTrackSchemaFromEvent(
        "Button Clicked",
        {
          "Button identifier": properties.buttonIdentifier,
        },
        "rN-mhyPzHT",
        "d5227d7fd99d7e73757056ae79901ab11e8eb895a2b22f5b6e408618e25f2a8c"
      );
    }
    // destination PostHog
    PostHog.logEvent(
      "Button Clicked",
      (Object as any).assign({}, eventProperties)
    );
  } else {
    // do nothing
  }
}

export default {
  AvoEnv,
  initAvo,
  avoInspectorApiKey,
  homeButtonClicked,
  buttonClicked,
};

// AVOMODULEMAP:"Avo"
// AVOEVENTMAP:["homeButtonClicked","buttonClicked"]