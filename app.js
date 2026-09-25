/*
  S'gaw Karen Translator
  The JavaScript is the engine only.
  Dictionary + grammar data live in remote JSON files.

  IMPORTANT:
  Replace DATA_BASE_URL with your GitHub repository's raw data folder.
  Example:
  https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO/main/data
*/

const DATA_BASE_URL =
  "https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO/main/data";

const LOCAL_DATA_BASE = "./data";

const $ = id => document.getElementById(id);

const input = $("input");
const output = $("output");
const from = $("from");
const to = $("to");
const status = $("status");

let DATA = {
  dictionary: null,
  grammar: null
};


/* ============================================================
   DATA LOADING
   ============================================================ */

async function fetchJSON(base, file) {
  const response = await fetch(`${base}/${file}?v=${Date.now()}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`${file}: HTTP ${response.status}`);
  }

  return response.json();
}

async function loadLanguageData() {
  const bases = [];

  if (
    DATA_BASE_URL &&
    !DATA_BASE_URL.includes("YOUR-USERNAME") &&
    !DATA_BASE_URL.includes("YOUR-REPO")
  ) {
    bases.push(DATA_BASE_URL);
  }

  bases.push(LOCAL_DATA_BASE);

  let lastError = null;

  for (const base of bases) {
    try {
      const [dictionary, grammar] = await Promise.all([
        fetchJSON(base, "dictionary.json"),
        fetchJSON(base, "grammar.json")
      ]);

      DATA.dictionary = dictionary;
      DATA.grammar = grammar;

      setDataStatus("Language data loaded", "online");

      return;
    } catch (error) {
      lastError = error;
    }
  }

  setDataStatus("Language data unavailable", "error");
  console.error(lastError);

  DATA.dictionary = {
    nouns: {},
    phrases: [],
    pronouns: {},
    special_nouns: [],
    possession_indicator: "တၢ်"
  };

  DATA.grammar = {
    pronoun_order: [],
    variants: {},
    rules: {},
    possession: {}
  };
}

function setDataStatus(message, state) {
  const dot = $("dataDot");
  const label = $("dataStatus");

  if (dot) {
    dot.className = state || "";
  }

  if (label) {
    label.textContent = message;
  }
}


/* ============================================================
   TEXT HELPERS
   ============================================================ */

function normalize(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function normalizeKaren(s) {
  let value = String(s).trim();

  const variants = DATA.grammar?.variants || {};

  for (const [variant, canonical] of Object.entries(variants)) {
    value = value.split(variant).join(canonical);
  }

  return value;
}

function isKaren(s) {
  const k =
    (s.match(/[\u1000-\u109F\uAA60-\uAA7F\uA9E0-\uA9FF]/g) || [])
      .length;

  const e = (s.match(/[A-Za-z]/g) || []).length;

  return k > e;
}

function esc(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripPunctuation(word) {
  return word.replace(/^[“"‘'([{]+|[,.!?;:၊။”"’')\]}]+$/g, "");
}


/* ============================================================
   DATA ACCESS
   ============================================================ */

function getNouns() {
  return Object.entries(DATA.dictionary?.nouns || {})
    .sort((a, b) => b[0].length - a[0].length);
}

function getPhrases() {
  return Array.isArray(DATA.dictionary?.phrases)
    ? DATA.dictionary.phrases
    : [];
}

function getSpecialNouns() {
  return Array.isArray(DATA.dictionary?.special_nouns)
    ? DATA.dictionary.special_nouns
    : [];
}

function getPronounOrder() {
  return (
    DATA.grammar?.pronoun_order ||
    Object.keys(DATA.dictionary?.pronouns || {})
  ).slice().sort((a, b) => b.length - a.length);
}


/* ============================================================
   CONTEXT-AWARE KAREN GRAMMAR
   ============================================================ */

/*
  Instead of translating every word independently, inspect
  the surrounding structure.

  Examples:

  အ
  -> he/she

  အတၢ်
  -> his/her

  အမံၤ
  -> his/her name

  အဝဲသ့ၣ်
  -> they

  အဝဲသ့ၣ်တၢ်
  -> their

  အဝဲသ့ၣ်ဟံၣ်
  -> their house
*/

function getPronounInfo(pronoun) {
  const canonical =
    DATA.grammar?.variants?.[pronoun] || pronoun;

  return DATA.dictionary?.pronouns?.[canonical] || null;
}

function translateKarenPossessive(prefix, noun) {
  const info = getPronounInfo(prefix);

  if (!info) {
    return null;
  }

  const nouns = getNouns();

  const nounEntry = nouns.find(
    ([karen]) => normalizeKaren(karen) === normalizeKaren(noun)
  );

  if (!nounEntry) {
    return null;
  }

  return `${info.possessive} ${nounEntry[1]}`;
}

function translateKarenToken(token) {
  const raw = token;
  const clean = stripPunctuation(token);
  const punctuation = token.slice(clean.length);

  if (!clean) {
    return raw;
  }

  const word = normalizeKaren(clean);
  const pronouns = getPronounOrder();

  /*
    1. Full pronoun + noun combinations.
    This must happen before checking a single pronoun.
  */

  for (const prefix of pronouns) {
    const p = normalizeKaren(prefix);

    if (!word.startsWith(p) || word === p) {
      continue;
    }

    const remainder = word.slice(p.length);

    /*
      Pronoun + တၢ် = possessive indicator.
    */

    if (remainder === (DATA.dictionary?.possession_indicator || "တၢ်")) {
      const info = getPronounInfo(prefix);
      if (info) {
        return info.possessive + punctuation;
      }
    }

    /*
      Pronoun + noun.
    */

    const translated = translateKarenPossessive(prefix, remainder);

    if (translated) {
      return translated + punctuation;
    }
  }

  /*
    2. Standalone pronouns.
  */

  const info = getPronounInfo(word);

  if (info) {
    return info.subject + punctuation;
  }

  /*
    3. Standalone noun.
  */

  const nounEntry = getNouns().find(
    ([karen]) => normalizeKaren(karen) === word
  );

  if (nounEntry) {
    return nounEntry[1] + punctuation;
  }

  return raw;
}


/* ============================================================
   SPECIAL NOUN / COUPLET EXPRESSIONS
   ============================================================ */

function translateSpecialKarenExpression(text) {
  let result = text;

  const entries = getSpecialNouns()
    .slice()
    .sort((a, b) => b.karen.length - a.karen.length);

  for (const entry of entries) {
    const re = new RegExp(
      `(^|\\s)${esc(entry.karen)}(?=\\s|[,.!?;:၊။]|$)`,
      "g"
    );

    result = result.replace(
      re,
      (match, prefix) => prefix + entry.english
    );
  }

  return result;
}


/* ============================================================
   KAREN -> ENGLISH CONTEXT ENGINE
   ============================================================ */

function translateKarenToEnglish(text) {
  /*
    Long expressions first.
  */
  let result = translateSpecialKarenExpression(text);

  /*
    Token-level grammar handles:
      ယမံၤ
      နဟံၣ်
      အမံၤ
      အဝဲသ့ၣ်ဟံၣ်
      အတၢ်
      etc.
  */

  result = result
    .split(/(\s+)/)
    .map(token => {
      if (/^\s+$/.test(token)) {
        return token;
      }

      /*
        If a special expression already became English,
        leave it alone.
      */
      if (/^[A-Za-z]/.test(token)) {
        return token;
      }

      return translateKarenToken(token);
    })
    .join("");

  /*
    Context-sensitive pronoun correction.

    If အ is immediately followed by an English noun
    after grammar processing, its possessive meaning has
    already been resolved as his/her.
  */

  return result;
}


/* ============================================================
   ENGLISH -> KAREN CONTEXT ENGINE
   ============================================================ */

function translateEnglishPossessiveNouns(text) {
  let result = text;

  const pronouns = DATA.dictionary?.pronouns || {};

  /*
    Build reverse possessive map from remote data.
  */

  const possessionMap = [];

  for (const [karen, info] of Object.entries(pronouns)) {
    if (info?.possessive) {
      possessionMap.push([
        info.possessive,
        karen
      ]);
    }
  }

  /*
    Longer/more specific forms first.
  */

  possessionMap.sort(
    (a, b) => b[0].length - a[0].length
  );

  const nouns = getNouns();

  for (const [englishPossessive, karenPronoun] of possessionMap) {
    for (const [karenNoun, englishNoun] of nouns) {
      const re = new RegExp(
        `\\b${esc(englishPossessive)}\\s+${esc(englishNoun)}\\b`,
        "gi"
      );

      result = result.replace(
        re,
        () => karenPronoun + karenNoun
      );
    }
  }

  return result;
}

function translateEnglishSpecialNouns(text) {
  let result = text;

  const entries = getSpecialNouns()
    .slice()
    .sort((a, b) => b.english.length - a.english.length);

  for (const entry of entries) {
    /*
      Prefer exact expression matching.
    */
    const phrase = entry.english.split(" / ")[0];

    const re = new RegExp(
      `\\b${esc(phrase)}\\b`,
      "gi"
    );

    result = result.replace(re, entry.karen);
  }

  return result;
}


/* ============================================================
   NORMAL DICTIONARY TRANSLATION
   ============================================================ */

function translateWithDictionary(text, source) {
  const phrases = getPhrases();

  let result = text;

  const entries = phrases
    .slice()
    .sort(
      (a, b) =>
        (source === "en"
          ? b.english.length - a.english.length
          : b.karen.length - a.karen.length)
    );

  for (const entry of entries) {
    const sourcePhrase =
      source === "en"
        ? entry.english
        : entry.karen;

    const targetPhrase =
      source === "en"
        ? entry.karen
        : entry.english;

    const re = new RegExp(
      `(^|\\s)${esc(sourcePhrase)}(?=\\s|[,.!?;:]|$)`,
      source === "en" ? "gi" : "g"
    );

    result = result.replace(
      re,
      (match, prefix) => prefix + targetPhrase
    );
  }

  return result;
}


/* ============================================================
   MAIN TRANSLATOR
   ============================================================ */

function translate(text, source) {
  const clean = text.trim();

  if (!clean) {
    return null;
  }

  /*
    Exact phrase lookup first.
  */

  const exact = getPhrases().find(entry =>
    source === "en"
      ? normalize(entry.english) === normalize(clean)
      : normalizeKaren(entry.karen) === normalizeKaren(clean)
  );

  if (exact) {
    return source === "en"
      ? exact.karen
      : exact.english;
  }

  /*
    Context-aware grammar before generic word matching.
  */

  if (source === "kar") {
    const grammarResult =
      translateKarenToEnglish(clean);

    if (grammarResult !== clean) {
      return grammarResult;
    }

    return translateWithDictionary(clean, source);
  }

  /*
    English -> Karen.
  */

  let result =
    translateEnglishPossessiveNouns(clean);

  result =
    translateEnglishSpecialNouns(result);

  result =
    translateWithDictionary(result, source);

  return result !== clean
    ? result
    : null;
}


/* ============================================================
   APP
   ============================================================ */

function run() {
  $("count").textContent =
    input.value.length + " characters";

  $("fromTitle").textContent =
    from.value === "en"
      ? "English"
      : from.value === "kar"
        ? "S'gaw Karen"
        : "English / S'gaw Karen";

  $("toTitle").textContent =
    to.value === "en"
      ? "English"
      : "S'gaw Karen";

  const text = input.value.trim();

  if (!text) {
    output.textContent =
      "Your translation will appear here.";

    status.textContent = "Ready";
    return;
  }

  let source =
    from.value === "auto"
      ? (isKaren(text) ? "kar" : "en")
      : from.value;

  let target = to.value;

  if (
    from.value === "auto" &&
    source === target
  ) {
    target =
      source === "en"
        ? "kar"
        : "en";

    to.value = target;

    $("toTitle").textContent =
      target === "en"
        ? "English"
        : "S'gaw Karen";
  }

  if (source === target) {
    output.textContent = text;
    status.textContent = "Same language";
    return;
  }

  const result = translate(text, source);

  if (result) {
    output.textContent = result;

    status.textContent =
      (source === "en"
        ? "English"
        : "S'gaw Karen") +
      " → " +
      (target === "en"
        ? "English"
        : "S'gaw Karen");
  } else {
    output.textContent =
      "No translation found in the current dictionary.";

    status.textContent = "Phrase not found";
  }
}


/* ============================================================
   UI
   ============================================================ */

$("translate").onclick = run;

$("clear").onclick = () => {
  input.value = "";
  run();
  input.focus();
};

$("copy").onclick = async () => {
  try {
    await navigator.clipboard.writeText(
      output.textContent
    );

    $("copy").classList.add("copied");
    status.textContent = "Copied!";

    setTimeout(() => {
      $("copy").classList.remove("copied");
    }, 1000);

  } catch {
    status.textContent = "Copy failed";
  }
};

$("swap").onclick = () => {
  const oldInput = input.value;
  const oldOutput = output.textContent;

  const source =
    from.value === "auto"
      ? (isKaren(oldInput) ? "kar" : "en")
      : from.value;

  from.value = to.value;
  to.value = source;

  input.value =
    oldOutput.startsWith("Your translation") ||
    oldOutput.startsWith("No translation")
      ? ""
      : oldOutput;

  output.textContent =
    oldInput ||
    "Your translation will appear here.";

  run();
};

$("feedback").onclick = () => {
  alert(
    "Correction workflow can be connected to your online language database later."
  );
};

$("voice").onclick = () => {
  const Recognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!Recognition) {
    alert(
      "Speech recognition is not supported in this browser."
    );
    return;
  }

  const recognition = new Recognition();

  recognition.lang = "en-US";

  recognition.onresult = event => {
    input.value =
      event.results[0][0].transcript;

    from.value = "en";
    to.value = "kar";

    run();
  };

  recognition.start();
};

from.onchange = run;
to.onchange = run;

let timer;

input.oninput = () => {
  clearTimeout(timer);

  timer = setTimeout(run, 200);
};


/* ============================================================
   START
   ============================================================ */

(async function init() {
  setDataStatus("Loading language data…", "");

  await loadLanguageData();

  run();
})();
