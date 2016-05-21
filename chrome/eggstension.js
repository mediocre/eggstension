var eggcorns = [
    { find: 'acorn', replace: 'eggcorn' },
    { find: 'ad hoc', replace: 'and hoc' },
    { find: 'ado', replace: 'to do' },
    { find: 'all fours', replace: 'our fours' },
    { find: 'bona fide', replace: 'bonified' },
    { find: 'bull in a china shop', replace: 'bowl in a china shop' },
    { find: 'all is said and done', replace: 'all is set and done' },
    { find: 'catalytic converter', replace: 'cadillac converter' },
    { find: 'chifforobe', replace: 'shiffer robe' },
    { find: 'chute', replace: 'shoot' },
    { find: 'clique', replace: 'click' },
    { find: 'cole slaw', replace: 'cold slaw' },
    { find: 'coleslaw', replace: 'coldslaw' },
    { find: 'compliments to the chef', replace: 'condiments to the chef' },
    { find: 'commander in chief', replace: 'command her in cheese' },
    { find: 'cut to the chase', replace: 'cut to the cheese' },
    { find: 'disingenuous', replace: 'disingenuine' },
    { find: 'down pat', replace: 'down packed' },
    { find: 'eavesdrop', replace: 'ease drop' },
    { find: 'eclair', replace: 'eggclair' },
    { find: 'entree', replace: 'ontray' },
    { find: 'ethnic roots', replace: 'ethnic routes' },
    { find: 'euphemism', replace: 'youthamism' },
    { find: 'expatriate', replace: 'ex-patriot' },
    { find: 'fetal position', replace: 'feeble position' },
    { find: 'figment of', replace: 'pigment of' },
    { find: 'fiscal year', replace: 'physical year' },
    { find: 'for all intents and purposes', replace: 'for all intensive purposes' },
    { find: 'for granted', replace: 'for granite' },
    { find: 'front and center', replace: 'front in center' },
    { find: 'gobbledygook', replace: 'garbledygook' },
    { find: 'handkerchiefs', replace: 'hanker chiefs' },
    { find: 'interim', replace: 'in-term' },
    { find: 'knickers in a twist', replace: 'nipples in a twist'},
    { find: 'maiden name', replace: 'mating name'},
    { find: 'might as well', replace: 'minus whale' },
    { find: 'migraine', replace: 'mindgrain' },
    { find: 'moot point', replace: 'mute point' },
    { find: 'new lease on life', replace: 'new leash on life' },
    { find: 'nip it in the bud', replace: 'nip it in the butt' },
    { find: 'opposable thumb', replace: 'a poseable thumb' },
    { find: 'paprika', replace: 'pepperika' },
    { find: 'paramour', replace: 'power mower' },
    { find: 'per se', replace: 'per say' },
    { find: 'perennial', replace: 'preannual' },
    { find: 'postpartum', replace: 'post pardon' },
    { find: 'potatoes au gratin', replace: 'potatoes old rotten' },
    { find: 'praying mantis', replace: 'preying mantis' },
    { find: 'prima donna', replace: 'premadonna' },
    { find: 'root cause', replace: 'route cause' },
    { find: 'segue', replace: 'segway' },
    { find: 'singled out', replace: 'signaled out' },
    { find: 'skim milk', replace: 'skimp milk' },
    { find: 'soaking wet', replace: 'soaping wet' },
    { find: 'sophomore', replace: 'southmore' },
    { find: 'spur of the moment', replace: 'spurt of the moment' },
    { find: 'straight and narrow', replace: 'straight and arrow' },
    { find: 'straight as an arrow', replace: 'straight as a narrow' },
    { find: 'tartar sauce', replace: 'tarter sauce' },
    { find: 'tounge in cheek', replace: 'tounge and cheek' },
    { find: 'treasure trove', replace: 'treasure cove' },
    { find: 'two cents\' worth', replace: 'two sense worth' },
    { find: 'up to snuff', replace: 'up to stuff' },
    { find: 'vantage point', replace: 'vintage point' },
    { find: 'wide awake', replace: 'wild awake' },
    { find: 'wind chill factor', replace: 'windshield factor' },
    { find: 'with a grain of salt', replace: 'with a grain assault' },
    { find: 'with flying colors', replace: 'with flying collars' },
    { find: 'wives\' tale', replace: 'wise tale' },
    { find: 'worth your while', replace: 'worth your wild' },
    { find: 'worthwhile', replace: 'worthwild' }
];

walk(document.body);

if (window.MutationObserver) {
    var observer = new MutationObserver(function(mutations) {
        Array.prototype.forEach.call(mutations, function(m) {
            if (m.type === 'childList') {
                walk(m.target);
            } else if (m.target.nodeType === 3) {
                handleText(m.target);
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        attributes: false,
        characterData: true,
        subtree: true
    });
}

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function handleText(textNode) {
    var originalText = textNode.nodeValue;
    var text = originalText;

    eggcorns.forEach(function(eggcorn) {
        var regexp = new RegExp('\\b' + eggcorn.find + '\\b', 'gi');

        text = text.replace(regexp, function(match) {
            var replace = eggcorn.replace;

            if (match.charAt(0) === match.charAt(0).toUpperCase()) {
                replace = capitalize(replace);
            }

            return replace;
        });
    });
    
    // Avoid infinite series of DOM changes
    if (originalText !== text) {
        textNode.nodeValue = text;
    }
}

function walk(node)  {
    var child, next;

    switch (node.nodeType)  
    {
        case 1:  // Element
        case 9:  // Document
        case 11: // Document fragment
            child = node.firstChild;

            while (child) 
            {
                next = child.nextSibling;
                walk(child);
                child = next;
            }

            break;

        case 3: // Text node
            handleText(node);
            break;
    }
}

// I stole a bunch of the code from here: https://raw.githubusercontent.com/panicsteve/cloud-to-butt/master/Source/content_script.js
