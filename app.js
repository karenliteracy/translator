/* =========================================================
   S'GAW KAREN TRANSLATOR
   app.js
   Version 1.1.0

   This file contains:
   - Translation engine
   - English → S'gaw Karen
   - S'gaw Karen → English
   - Automatic language detection
   - Special Karen grammar rules
   - Possessive pronouns
   - Noun / abstract noun expressions
   - Automatic translation while typing
   - Copy
   - Clear
   - Swap
   - Voice input
   - Example phrases

   IMPORTANT:
   Your dictionary can continue to grow in:

       data/dictionary.json

   The grammar rules below are intentionally kept separate
   from the dictionary so they can be expanded later.
========================================================= */


/* =========================================================
   DICTIONARY
   =========================================================

   This embedded dictionary allows the application to work
   even when index.html is opened directly from Windows.

   Keep your existing dictionary entries here.

   You can also continue updating:

       data/dictionary.json

   The entries below include the starter vocabulary and
   the new grammar-related vocabulary.
========================================================= */

const dictionary = [
    {
        english: "I love you",
        karen: "ယအဲၣ်နၤ"
    },
    {
        english: "Hello",
        karen: "မုၢ်ဆါ"
    },
    {
        english: "How are you?",
        karen: "နအိၣ်ဆူၣ်အိၣ်ချ့ဧါ"
    },
    {
        english: "I am fine",
        karen: "ယအိၣ်ဆူၣ်အိၣ်ချ့လီၤ"
    },
    {
        english: "Thank you",
        karen: "တၢ်ဘျုးတၢ်ဖှိၣ်"
    },
    {
        english: "Yes",
        karen: "မ့ၢ်"
    },
    {
        english: "No",
        karen: "တမ့ၢ်ဘၣ်"
    },
    {
        english: "My name is Soe.",
        karen: "ယမံၤမ့ၢ်စိ"
    },
    {
        english: "Where are you going?",
        karen: "နကလဲၤဖဲလဲၣ်"
    },
    {
        english: "I am going home.",
        karen: "ယကလဲၤဆူဟံၣ်"
    },
    {
        english: "I understand.",
        karen: "ယနၢ်ပၢၢ်"
    },
    {
        english: "I don't understand.",
        karen: "ယတနၢ်ပၢၢ်ဘၣ်"
    },
    {
        english: "Can you help me?",
        karen: "နမၤစၢၤယၤသ့ဧါ"
    },
    {
        english: "Help me.",
        karen: "မၤစၢၤယၤ"
    },
    {
        english: "Come here.",
        karen: "ဟဲဖဲအံၤ"
    },
    {
        english: "Water",
        karen: "ထံ"
    },
    {
        english: "Food",
        karen: "တၢ်အီၣ်"
    },
    {
        english: "House",
        karen: "ဟံၣ်"
    },
    {
        english: "School",
        karen: "ကၠိ"
    },
    {
        english: "Church",
        karen: "ဘူၣ်ကျီၢ်"
    },
    {
        english: "Friend",
        karen: "သကိး"
    },
    {
        english: "Mother",
        karen: "မိၢ်"
    },
    {
        english: "Father",
        karen: "ပၢ်"
    },
    {
        english: "Child",
        karen: "ဖိ"
    },
    {
        english: "Person",
        karen: "ပှၤ"
    },
    {
        english: "Today",
        karen: "မုၢ်မဆါတနံၤအံၤ"
    },
    {
        english: "Tomorrow",
        karen: "ခဲမုၢ်ဆါ"
    },
    {
        english: "What",
        karen: "မနုၤ"
    },
    {
        english: "Who",
        karen: "မတဂၤ"
    },
    {
        english: "Where",
        karen: "ဖဲလဲၣ်"
    },
    {
        english: "When",
        karen: "ဖဲလဲၣ်အခါ"
    },
    {
        english: "Why",
        karen: "ဘၣ်မနုၤလဲၣ်"
    },
    {
        english: "How",
        karen: "ဒ်လဲၣ်"
    },
    {
        english: "I",
        karen: "ယ"
    },
    {
        english: "Me",
        karen: "ယ"
    },
    {
        english: "You",
        karen: "န"
    },
    {
        english: "We",
        karen: "ပ"
    },
    {
        english: "Us",
        karen: "ပ၀ဲသ့ၣ်"
    },
    {
        english: "They",
        karen: "အ၀ဲသ့ၣ်"
    },
    {
        english: "Name",
        karen: "မံၤ"
    },
    {
        english: "Home",
        karen: "ဟံၣ်"
    },
    {
        english: "Love",
        karen: "အဲၣ်"
    },
    {
        english: "Go",
        karen: "လဲၤ"
    },
    {
        english: "Come",
        karen: "ဟဲ"
    },
    {
        english: "Eat",
        karen: "အီၣ်"
    },
    {
        english: "Drink",
        karen: "အီ"
    },
    {
        english: "See",
        karen: "ထံၣ်"
    },
    {
        english: "Hear",
        karen: "နၢ်"
    },
    {
        english: "Speak",
        karen: "စံး"
    },
    {
        english: "Read",
        karen: "ဖး"
    },
    {
        english: "Write",
        karen: "ကွဲး"
    },
    {
        english: "Learn",
        karen: "မၤလိ"
    },
    {
        english: "Work",
        karen: "မၤတၢ်"
    },
    {
        english: "Good",
        karen: "ဂ့ၤ"
    },
    {
        english: "Bad",
        karen: "အၢ"
    },
    {
        english: "Big",
        karen: "ဒိၣ်"
    },
    {
        english: "Small",
        karen: "ဆံး"
    },
    {
        english: "New",
        karen: "အသီ"
    },
    {
        english: "Health",
        karen: "တၢ်အိၣ်ဆူၣ်အိၣ်ချ့"
    },
    {
        english: "Doctor",
        karen: "ကသံၣ်သရၣ်"
    },
    {
        english: "Hospital",
        karen: "ဆေးရုံ"
    },
    {
        english: "Medicine",
        karen: "ကသံၣ်"
    },


    /* =====================================================
       NEW GRAMMAR / PRONOUN ENTRIES
    ===================================================== */

    {
        english: "He",
        karen: "အ"
    },
    {
        english: "She",
        karen: "အ"
    },
    {
        english: "He / She",
        karen: "အ"
    },

    {
        english: "My",
        karen: "ယတၢ်"
    },
    {
        english: "Mine",
        karen: "ယတၢ်"
    },
    {
        english: "My / Mine",
        karen: "ယတၢ်"
    },

    {
        english: "Your",
        karen: "နတၢ်"
    },
    {
        english: "Yours",
        karen: "နတၢ်"
    },
    {
        english: "Your / Yours",
        karen: "နတၢ်"
    },

    {
        english: "His",
        karen: "အတၢ်"
    },
    {
        english: "Hers",
        karen: "အတၢ်"
    },
    {
        english: "His / Hers",
        karen: "အတၢ်"
    },

    {
        english: "Our",
        karen: "ပတၢ်"
    },
    {
        english: "Ours",
        karen: "ပတၢ်"
    },
    {
        english: "Our / Ours",
        karen: "ပတၢ်"
    },

    {
        english: "Our / Ours (plural)",
        karen: "ပ၀ဲသ့ၣ်တၢ်"
    },

    {
        english: "Their",
        karen: "အ၀ဲသ့ၣ်တၢ်"
    },
    {
        english: "Theirs",
        karen: "အ၀ဲသ့ၣ်တၢ်"
    },
    {
        english: "Their / Theirs",
        karen: "အ၀ဲသ့ၣ်တၢ်"
    },

    {
        english: "Noun marker",
        karen: "တၢ်"
    },


    /* =====================================================
       NOUN / ABSTRACT NOUN EXPRESSIONS
    ===================================================== */

    {
        english: "Love (noun)",
        karen: "တၢ်အဲၣ်"
    },
    {
        english: "Love / Affection",
        karen: "တၢ်အဲၣ်တၢ်ကွံ"
    },
    {
        english: "Patience",
        karen: "တၢ်သူၣ်စူၤသးစူၤ"
    },
    {
        english: "Good deeds",
        karen: "တၢ်မၤဂ့ၤတၢ်"
    },
    {
        english: "A talk",
        karen: "တၢ်တဲတၢ်"
    },
    {
        english: "Conversation",
        karen: "တၢ်တဲတၢ်"
    },
    {
        english: "Speaking / Conversation",
        karen: "တၢ်ကတိၤတၢ်"
    }
];


/* =========================================================
   UTILITY FUNCTIONS
========================================================= */


/*
   Normalize English text for matching.
*/
function normalizeEnglish(text) {

    return text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
}


/*
   Normalize Karen text.

   We intentionally DO NOT change Karen characters.
   This prevents accidental changes to Karen Unicode.
*/
function normalizeKaren(text) {

    return text
        .trim()
        .replace(/\s+/g, " ");
}


/*
   Detect whether text is primarily S'gaw Karen / Myanmar
   Unicode or English / Latin text.
*/
function isKaren(text) {

    const karenCharacters =
        (text.match(/[\u1000-\u109F\uAA60-\uAA7F\uA9E0-\uA9FF]/g) || []).length;

    const englishCharacters =
        (text.match(/[A-Za-z]/g) || []).length;

    return karenCharacters > englishCharacters;
}


/*
   Escape special characters for regular expressions.
*/
function escapeRegex(text) {

    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}


/*
   Remove ending punctuation temporarily.
*/
function removeEndingPunctuation(text) {

    return text
        .trim()
        .replace(/[.,!?;:]+$/, "")
        .trim();
}


/*
   Put punctuation back after translation.
*/
function restorePunctuation(original, translated) {

    const punctuationMatch =
        original.trim().match(/[.,!?;:]+$/);

    if (punctuationMatch) {

        return translated + punctuationMatch[0];

    }

    return translated;
}


/* =========================================================
   S'GAW KAREN GRAMMAR RULES
========================================================= */


/*
   ---------------------------------------------------------
   POSSESSIVE PRONOUNS
   ---------------------------------------------------------

   IMPORTANT:

       ယတၢ်
       = my / mine

       နတၢ်
       = your / yours

       အတၢ်
       = his / hers

       ပတၢ်
       = our / ours

       ပ၀ဲသ့ၣ်တၢ်
       = our / ours / belonging to us

       အ၀ဲသ့ၣ်တၢ်
       = their / theirs

   The word တၢ် following the pronoun changes the
   construction into a possessive expression.
*/

const KAREN_POSSESSIVE = {

    "ယတၢ်": "my / mine",

    "နတၢ်": "your / yours",

    "အတၢ်": "his / hers",

    "ပတၢ်": "our / ours",

    "ပ၀ဲသ့ၣ်တၢ်": "our / ours",

    "ပဝဲသ့ၣ်တၢ်": "our / ours",

    "အ၀ဲသ့ၣ်တၢ်": "their / theirs",

    "အဝဲသ့ၣ်တၢ်": "their / theirs"
};


/*
   ---------------------------------------------------------
   STANDALONE PRONOUNS
   ---------------------------------------------------------

   အ by itself:

       he / she

   It is gender-neutral.

   အ၀ဲသ့ၣ် by itself:

       they

   It becomes possessive only when followed by တၢ်.
*/

const KAREN_PRONOUNS = {

    "ယ": "I / me",

    "န": "you",

    "အ": "he / she",

    "ပ": "we / us",

    "ပ၀ဲသ့ၣ်": "we / us",

    "ပဝဲသ့ၣ်": "we / us",

    "အ၀ဲသ့ၣ်": "they",

    "အဝဲသ့ၣ်": "they"
};


/*
   ---------------------------------------------------------
   NOUN / ABSTRACT NOUN EXPRESSIONS
   ---------------------------------------------------------

   These are treated as complete expressions.

   This is important because:

       တၢ်အဲၣ်
       = love

   and:

       တၢ်အဲၣ်တၢ်ကွံ
       = love / affection

   are both valid expressions.
*/

const KAREN_NOUNS = {

    "တၢ်အဲၣ်":
        "love",

    "တၢ်အဲၣ်တၢ်ကွံ":
        "love / affection",

    "တၢ်သူၣ်စူၤသးစူၤ":
        "patience",

    "တၢ်မၤဂ့ၤတၢ်":
        "good deeds",

    "တၢ်တဲတၢ်":
        "a talk / conversation",

    "တၢ်ကတိၤတၢ်":
        "speaking / conversation"
};


/* =========================================================
   SPECIAL KAREN → ENGLISH TRANSLATION
========================================================= */

function translateKarenSpecialCase(text) {

    const original = text.trim();

    const clean = removeEndingPunctuation(original);


    /*
       -----------------------------------------------------
       STEP 1
       POSSESSIVE CONSTRUCTIONS
       -----------------------------------------------------

       Check these FIRST.

       This prevents:

           အတၢ်

       from being incorrectly interpreted as:

           အ = he/she
           တၢ် = noun marker
    */

    if (
        Object.prototype.hasOwnProperty.call(
            KAREN_POSSESSIVE,
            clean
        )
    ) {

        return restorePunctuation(
            original,
            KAREN_POSSESSIVE[clean]
        );
    }


    /*
       -----------------------------------------------------
       STEP 2
       COMPLETE NOUN EXPRESSIONS
       -----------------------------------------------------

       Longer expressions must be checked before shorter
       expressions.

       Example:

           တၢ်အဲၣ်တၢ်ကွံ

       should be recognized as one expression.
    */

    if (
        Object.prototype.hasOwnProperty.call(
            KAREN_NOUNS,
            clean
        )
    ) {

        return restorePunctuation(
            original,
            KAREN_NOUNS[clean]
        );
    }


    /*
       -----------------------------------------------------
       STEP 3
       STANDALONE PRONOUNS
       -----------------------------------------------------
    */

    if (
        Object.prototype.hasOwnProperty.call(
            KAREN_PRONOUNS,
            clean
        )
    ) {

        return restorePunctuation(
            original,
            KAREN_PRONOUNS[clean]
        );
    }


    /*
       -----------------------------------------------------
       STEP 4
       GENERIC NOUN MARKER
       -----------------------------------------------------

       တၢ် is an indicator of a noun / thing / concept.

       If the phrase starts with တၢ်,
       we check the rest of the phrase.

       Example:

           တၢ် + noun

       Instead of automatically translating တၢ် as
       "thing", we try to translate the noun portion.
    */

    if (
        clean.startsWith("တၢ်") &&
        clean.length > 2
    ) {

        const nounPart =
            clean.substring(2).trim();


        /*
           First check our special noun dictionary.
        */

        if (
            Object.prototype.hasOwnProperty.call(
                KAREN_NOUNS,
                clean
            )
        ) {

            return restorePunctuation(
                original,
                KAREN_NOUNS[clean]
            );
        }


        /*
           Then search the normal dictionary.
        */

        const entry = dictionary.find(
            item =>
                item.karen &&
                normalizeKaren(item.karen) === nounPart
        );


        if (entry) {

            return restorePunctuation(
                original,
                entry.english
            );
        }
    }


    /*
       No special grammar rule matched.
       Let the normal translator handle it.
    */

    return null;
}


/* =========================================================
   ENGLISH → KAREN SPECIAL CASES
========================================================= */

const ENGLISH_SPECIAL_CASES = {


    /*
       -----------------------------------------------------
       GENDER-NEUTRAL PRONOUN
       -----------------------------------------------------

       Both "he" and "she" become:

           အ
    */

    "he": "အ",

    "she": "အ",

    "he / she": "အ",

    "he/she": "အ",


    /*
       -----------------------------------------------------
       POSSESSIVE
       -----------------------------------------------------
    */

    "my": "ယတၢ်",

    "mine": "ယတၢ်",

    "my / mine": "ယတၢ်",

    "my/mine": "ယတၢ်",


    "your": "နတၢ်",

    "yours": "နတၢ်",

    "your / yours": "နတၢ်",

    "your/yours": "နတၢ်",


    "his": "အတၢ်",

    "hers": "အတၢ်",

    "his / hers": "အတၢ်",

    "his/hers": "အတၢ်",


    "our": "ပတၢ်",

    "ours": "ပတၢ်",

    "our / ours": "ပတၢ်",

    "our/ours": "ပတၢ်",


    "us": "ပ၀ဲသ့ၣ်",


    "their": "အ၀ဲသ့ၣ်တၢ်",

    "theirs": "အ၀ဲသ့ၣ်တၢ်",

    "their / theirs": "အ၀ဲသ့ၣ်တၢ်",

    "their/theirs": "အ၀ဲသ့ၣ်တၢ်",


    /*
       -----------------------------------------------------
       NOUN / ABSTRACT NOUNS
       -----------------------------------------------------
    */

    "love (noun)": "တၢ်အဲၣ်",

    "love / affection": "တၢ်အဲၣ်တၢ်ကွံ",

    "patience": "တၢ်သူၣ်စူၤသးစူၤ",

    "good deeds": "တၢ်မၤဂ့ၤတၢ်",

    "a talk": "တၢ်တဲတၢ်",

    "conversation": "တၢ်တဲတၢ်",

    "speaking / conversation": "တၢ်ကတိၤတၢ်"
};


/* =========================================================
   SPECIAL ENGLISH → KAREN FUNCTION
========================================================= */

function translateEnglishSpecialCase(text) {

    const original = text.trim();

    const clean =
        removeEndingPunctuation(original)
            .toLowerCase();


    if (
        Object.prototype.hasOwnProperty.call(
            ENGLISH_SPECIAL_CASES,
            clean
        )
    ) {

        return restorePunctuation(
            original,
            ENGLISH_SPECIAL_CASES[clean]
        );
    }


    return null;
}


/* =========================================================
   BUILD DICTIONARY LOOKUP TABLES
========================================================= */

const englishDictionary = new Map();

const karenDictionary = new Map();


dictionary.forEach(entry => {

    if (!entry.english || !entry.karen) {
        return;
    }


    const englishKey =
        normalizeEnglish(entry.english);

    const karenKey =
        normalizeKaren(entry.karen);


    englishDictionary.set(
        englishKey,
        entry.karen
    );


    /*
       If multiple English meanings point to the same Karen
       word, keep the first English meaning.

       Grammar rules above take priority over this table.
    */

    if (!karenDictionary.has(karenKey)) {

        karenDictionary.set(
            karenKey,
            entry.english
        );
    }

});


/* =========================================================
   MAIN TRANSLATION FUNCTION
========================================================= */

function translate(text, source) {

    if (!text || !text.trim()) {

        return null;
    }


    const cleanText =
        text.trim();


    /* =====================================================
       SPECIAL GRAMMAR FIRST
    ===================================================== */

    if (source === "kar") {

        const specialResult =
            translateKarenSpecialCase(cleanText);


        if (specialResult !== null) {

            return specialResult;
        }
    }


    if (source === "en") {

        const specialResult =
            translateEnglishSpecialCase(cleanText);


        if (specialResult !== null) {

            return specialResult;
        }
    }


    /* =====================================================
       EXACT DICTIONARY MATCH
    ===================================================== */

    if (source === "en") {

        const exact =
            englishDictionary.get(
                normalizeEnglish(cleanText)
            );


        if (exact) {

            return exact;
        }

    } else {

        const exact =
            karenDictionary.get(
                normalizeKaren(cleanText)
            );


        if (exact) {

            return exact;
        }
    }


    /* =====================================================
       PHRASE / WORD-BY-WORD MATCH
    ===================================================== */

    let result =
        cleanText;


    /*
       Sort longest entries first.

       This is important for phrases such as:

           တၢ်အဲၣ်တၢ်ကွံ

       before:

           တၢ်အဲၣ်
    */

    let entries;


    if (source === "en") {

        entries =
            [...englishDictionary.entries()]
                .sort(
                    (a, b) =>
                        b[0].length - a[0].length
                );

    } else {

        entries =
            [...karenDictionary.entries()]
                .sort(
                    (a, b) =>
                        b[0].length - a[0].length
                );
    }


    entries.forEach(
        ([phrase, translation]) => {

            if (!phrase || phrase.length < 1) {
                return;
            }


            /*
               English → Karen
            */

            if (source === "en") {

                const escapedPhrase =
                    escapeRegex(phrase);


                const regex =
                    new RegExp(
                        "(^|\\s)" +
                        escapedPhrase +
                        "(?=\\s|[,.!?;:]|$)",
                        "gi"
                    );


                result =
                    result.replace(
                        regex,
                        (match, beginning) =>
                            beginning + translation
                    );
            }


            /*
               Karen → English
            */

            else {

                result =
                    result.split(
                        phrase
                    ).join(
                        translation
                    );
            }

        }
    );


    /*
       If something changed, return it.
    */

    if (result !== cleanText) {

        return result;
    }


    /*
       Nothing was found.
    */

    return null;
}


/* =========================================================
   MAIN UI TRANSLATION
========================================================= */

function runTranslation() {

    const inputElement =
        document.getElementById("input");

    const outputElement =
        document.getElementById("output");

    const fromElement =
        document.getElementById("from");

    const toElement =
        document.getElementById("to");

    const statusElement =
        document.getElementById("status");

    const countElement =
        document.getElementById("count");

    const fromTitle =
        document.getElementById("fromTitle");

    const toTitle =
        document.getElementById("toTitle");


    const text =
        inputElement.value.trim();


    /*
       Character count
    */

    if (countElement) {

        countElement.textContent =
            inputElement.value.length +
            " characters";
    }


    /*
       Update language labels
    */

    if (fromTitle) {

        if (fromElement.value === "en") {

            fromTitle.textContent =
                "English";

        } else if (fromElement.value === "kar") {

            fromTitle.textContent =
                "S'gaw Karen";

        } else {

            fromTitle.textContent =
                "English / S'gaw Karen";
        }
    }


    if (toTitle) {

        toTitle.textContent =
            toElement.value === "en"
                ? "English"
                : "S'gaw Karen";
    }


    /*
       Empty input
    */

    if (!text) {

        outputElement.textContent =
            "Your translation will appear here.";

        if (statusElement) {

            statusElement.textContent =
                "Ready";
        }

        return;
    }


    /*
       Detect source language.
    */

    let source;


    if (fromElement.value === "auto") {

        source =
            isKaren(text)
                ? "kar"
                : "en";

    } else {

        source =
            fromElement.value;
    }


    /*
       Target language
    */

    let target =
        toElement.value;


    /*
       If automatic detection selected the same target,
       automatically switch the target language.
    */

    if (
        fromElement.value === "auto" &&
        source === target
    ) {

        target =
            source === "en"
                ? "kar"
                : "en";


        toElement.value =
            target;


        if (toTitle) {

            toTitle.textContent =
                target === "en"
                    ? "English"
                    : "S'gaw Karen";
        }
    }


    /*
       Same language
    */

    if (source === target) {

        outputElement.textContent =
            text;

        if (statusElement) {

            statusElement.textContent =
                "Same language";
        }

        return;
    }


    /*
       Translate
    */

    const result =
        translate(
            text,
            source
        );


    /*
       Successful translation
    */

    if (result) {

        outputElement.textContent =
            result;


        if (statusElement) {

            statusElement.textContent =
                (
                    source === "en"
                        ? "English"
                        : "S'gaw Karen"
                ) +
                " → " +
                (
                    target === "en"
                        ? "English"
                        : "S'gaw Karen"
                );
        }


        return;
    }


    /*
       Translation not found
    */

    outputElement.textContent =
        "No translation found in the current dictionary.\n\n" +
        "Add this phrase to data/dictionary.json.";


    if (statusElement) {

        statusElement.textContent =
            "Phrase not found";
    }
}


/* =========================================================
   TRANSLATE BUTTON
========================================================= */

const translateButton =
    document.getElementById("translate");


if (translateButton) {

    translateButton.addEventListener(
        "click",
        runTranslation
    );
}


/* =========================================================
   CLEAR BUTTON
========================================================= */

const clearButton =
    document.getElementById("clear");


if (clearButton) {

    clearButton.addEventListener(
        "click",
        function () {

            const inputElement =
                document.getElementById("input");


            inputElement.value = "";


            runTranslation();


            inputElement.focus();
        }
    );
}


/* =========================================================
   COPY BUTTON
========================================================= */

const copyButton =
    document.getElementById("copy");


if (copyButton) {

    copyButton.addEventListener(
        "click",
        async function () {

            const outputElement =
                document.getElementById("output");

            const statusElement =
                document.getElementById("status");


            try {

                await navigator.clipboard.writeText(
                    outputElement.textContent
                );


                if (statusElement) {

                    statusElement.textContent =
                        "Copied!";
                }

            } catch (error) {

                /*
                   Fallback for browsers that do not allow
                   navigator.clipboard.
                */

                const range =
                    document.createRange();


                range.selectNodeContents(
                    outputElement
                );


                const selection =
                    window.getSelection();


                selection.removeAllRanges();

                selection.addRange(range);


                try {

                    document.execCommand("copy");

                    if (statusElement) {

                        statusElement.textContent =
                            "Copied!";
                    }

                } catch (copyError) {

                    if (statusElement) {

                        statusElement.textContent =
                            "Copy failed";
                    }
                }


                selection.removeAllRanges();
            }
        }
    );
}


/* =========================================================
   SWAP LANGUAGES
========================================================= */

const swapButton =
    document.getElementById("swap");


if (swapButton) {

    swapButton.addEventListener(
        "click",
        function () {

            const inputElement =
                document.getElementById("input");

            const outputElement =
                document.getElementById("output");

            const fromElement =
                document.getElementById("from");

            const toElement =
                document.getElementById("to");


            const oldInput =
                inputElement.value;


            const oldOutput =
                outputElement.textContent;


            /*
               Swap language selections.
            */

            const oldFrom =
                fromElement.value;

            fromElement.value =
                toElement.value;

            toElement.value =
                oldFrom;


            /*
               Put translation into input.
            */

            if (
                oldOutput &&
                !oldOutput.startsWith(
                    "Your translation"
                ) &&
                !oldOutput.startsWith(
                    "No translation found"
                )
            ) {

                inputElement.value =
                    oldOutput;

            } else {

                inputElement.value =
                    "";
            }


            /*
               Output receives old input.
            */

            outputElement.textContent =
                oldInput ||
                "Your translation will appear here.";


            runTranslation();
        }
    );
}


/* =========================================================
   VOICE INPUT
========================================================= */

const voiceButton =
    document.getElementById("voice");


if (voiceButton) {

    voiceButton.addEventListener(
        "click",
        function () {

            const SpeechRecognition =
                window.SpeechRecognition ||
                window.webkitSpeechRecognition;


            if (!SpeechRecognition) {

                alert(
                    "Speech recognition is not supported " +
                    "in this browser."
                );

                return;
            }


            const recognition =
                new SpeechRecognition();


            recognition.lang =
                "en-US";


            recognition.interimResults =
                false;


            recognition.maxAlternatives =
                1;


            recognition.onresult =
                function (event) {

                    const transcript =
                        event
                            .results[0][0]
                            .transcript;


                    const inputElement =
                        document.getElementById("input");


                    const fromElement =
                        document.getElementById("from");

                    const toElement =
                        document.getElementById("to");


                    inputElement.value =
                        transcript;


                    fromElement.value =
                        "en";


                    toElement.value =
                        "kar";


                    runTranslation();
                };


            recognition.onerror =
                function () {

                    const statusElement =
                        document.getElementById("status");


                    if (statusElement) {

                        statusElement.textContent =
                            "Voice input error";
                    }
                };


            recognition.start();
        }
    );
}


/* =========================================================
   SUGGEST A CORRECTION
========================================================= */

const feedbackButton =
    document.getElementById("feedback");


if (feedbackButton) {

    feedbackButton.addEventListener(
        "click",
        function () {

            alert(
                "Correction workflow can be connected here later."
            );
        }
    );
}


/* =========================================================
   LANGUAGE SELECTORS
========================================================= */

const fromSelect =
    document.getElementById("from");


const toSelect =
    document.getElementById("to");


if (fromSelect) {

    fromSelect.addEventListener(
        "change",
        runTranslation
    );
}


if (toSelect) {

    toSelect.addEventListener(
        "change",
        runTranslation
    );
}


/* =========================================================
   LIVE TRANSLATION WHILE TYPING
========================================================= */

const inputField =
    document.getElementById("input");


let translationTimer;


if (inputField) {

    inputField.addEventListener(
        "input",
        function () {

            clearTimeout(
                translationTimer
            );


            translationTimer =
                setTimeout(
                    runTranslation,
                    250
                );
        }
    );
}


/* =========================================================
   DATABASE COUNT
========================================================= */

const databaseCount =
    document.getElementById("dbCount");


if (databaseCount) {

    databaseCount.textContent =
        dictionary.length +
        " starter entries";
}


/* =========================================================
   EXAMPLE PHRASE CHIPS
========================================================= */

const chipsContainer =
    document.getElementById("chips");


if (chipsContainer) {

    /*
       Show the first examples.

       We use a fixed number so the UI does not become
       overloaded if the dictionary becomes very large.
    */

    const examples =
        dictionary.slice(
            0,
            Math.min(
                16,
                dictionary.length
            )
        );


    chipsContainer.innerHTML =
        examples
            .map(
                entry =>
                    `<button class="chip" type="button">${entry.english}</button>`
            )
            .join("");


    const chips =
        chipsContainer.querySelectorAll(
            ".chip"
        );


    chips.forEach(
        (chip, index) => {

            chip.addEventListener(
                "click",
                function () {

                    const inputElement =
                        document.getElementById(
                            "input"
                        );

                    const fromElement =
                        document.getElementById(
                            "from"
                        );

                    const toElement =
                        document.getElementById(
                            "to"
                        );


                    inputElement.value =
                        examples[index].english;


                    fromElement.value =
                        "en";


                    toElement.value =
                        "kar";


                    runTranslation();
                }
            );
        }
    );
}


/* =========================================================
   INITIALIZE APPLICATION
========================================================= */

runTranslation();
