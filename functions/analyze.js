
const MARKET_DEFAULTS = {
  brandName: "TruthFinder",
  competitors: [
    {
      id: "truthfinder",
      name: "TruthFinder",
      focus: "current brand creative reference from Meta Ad Library",
      metaUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&is_targeted_country=false&media_type=all&search_type=keyword_unordered&q=TruthFinder",
      patterns: ["dark premium gradients", "trust-forward utility messaging", "search-led framing"],
      observedFormats: ["static image", "product-led UI mockup", "bold trust card"]
    },
    {
      id: "beenverified",
      name: "BeenVerified",
      focus: "broad people search + phone and contact lookup",
      metaUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&is_targeted_country=false&media_type=all&search_type=page&view_all_page_id=506883915831965",
      patterns: ["urgency-led headlines", "identity and caller anxiety", "bright callout badges"],
      observedFormats: ["static image", "UGC-style testimonial", "benefit collage"]
    },
    {
      id: "instantcheckmate",
      name: "Instant Checkmate",
      focus: "identity, people search, public-record confidence",
      metaUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&is_targeted_country=false&media_type=all&search_type=keyword_unordered&q=Instant%20Checkmate",
      patterns: ["fear + curiosity", "bold before/after framing", "trust-and-safety headlines"],
      observedFormats: ["clean static", "mobile search UI mockup", "testimonial card"]
    },
    {
      id: "spokeo",
      name: "Spokeo",
      focus: "contact discovery, people search, reverse lookup",
      metaUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&is_targeted_country=false&media_type=all&search_type=keyword_unordered&q=Spokeo",
      patterns: ["light UI screenshots", "simple utility framing", "problem/solution headline structure"],
      observedFormats: ["product UI mockup", "search-result visual", "carousel-style value stack"]
    },
    {
      id: "peoplefinders",
      name: "PeopleFinders",
      focus: "public record and people search utility",
      metaUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&is_targeted_country=false&media_type=all&search_type=keyword_unordered&q=PeopleFinders",
      patterns: ["low-friction search CTAs", "authority cues", "consumer reassurance copy"],
      observedFormats: ["search-box visual", "badge-led static", "list-style benefit card"]
    }
  ],
  angles: [
    "Personal safety before meeting someone",
    "Facebook Marketplace trust check",
    "Reverse phone lookup for suspicious calls",
    "Reconnect or verify before reaching out",
    "Protect your family from unknown contacts",
    "Know who is tied to an address",
    "Modern dating due diligence",
    "Find context before hiring or hosting"
  ],
  hooks: [
    "Before you meet, know more.",
    "That number keeps calling. Find out why.",
    "The internet knows more than you think. Use it wisely.",
    "Your next search could save you a bad decision.",
    "When something feels off, verify first.",
    "Trust your gut. Then check the facts.",
    "Unknown caller? Unknown person? Start with a search.",
    "A quick search now beats regret later."
  ],
  useCases: [
    "Online dating",
    "Facebook Marketplace",
    "Unknown caller / spam concern",
    "New neighbor curiosity",
    "Teen safety / parent peace of mind",
    "Roommate screening",
    "Selling items locally",
    "Reconnecting with someone from your past"
  ],
  platformTrends: [
    {
      id: "ugc-proof",
      name: "UGC proof card",
      description: "Looks like a social proof screenshot with punchy text blocks, creator-style authenticity, and a direct product utility reveal.",
      elements: ["testimonial quote", "comment bubbles", "soft gradient card", "mobile-native typography"]
    },
    {
      id: "neo-safety",
      name: "Neo safety dashboard",
      description: "Dark-mode trust and safety aesthetic with glowing UI fragments, signal icons, and verification language.",
      elements: ["signal lines", "dark gradient", "verification badge", "high-contrast CTA"]
    },
    {
      id: "editorial-pop",
      name: "Editorial pop graphic",
      description: "Magazine-like composition using oversized headline text, one dominant shape, and an intentional color pop.",
      elements: ["oversized headline", "clean margin system", "graphic punch shape", "minimal copy"]
    },
    {
      id: "app-capture",
      name: "App capture + highlight",
      description: "Search box or result-page style visual with highlighted findings, built to feel useful and product-led.",
      elements: ["search field", "result snippet", "highlight stroke", "utility-focused layout"]
    },
    {
      id: "social-alert",
      name: "Social alert banner",
      description: "Fast, thumb-stopping alert treatment with callout chips, urgency bars, and emotionally direct headlines.",
      elements: ["alert chip", "warning stripe", "CTA button", "scan-fast hierarchy"]
    }
  ]
};

const state = {
  brand: {
    color1: "#16c1b0",
    color2: "#5eead4",
    color3: "#0f1720",
    cta: "Search Now"
  },
  competitors: [],
  selectedAngle: "",
  selectedHook: "",
  selectedUseCase: "",
  selectedTrend: "",
  competitorNotes: "",
  customCopy: "",
  generatedAds: [],
  selectedCompetitorId: "truthfinder"
};

const els = {};

document.addEventListener("DOMContentLoaded", init);

function init() {
  cacheElements();
  hydrateState();
  bindEvents();
  renderAll();
}

function cacheElements() {
  els.angleInput = document.getElementById("angleInput");
  els.hookInput = document.getElementById("hookInput");
  els.useCaseInput = document.getElementById("useCaseInput");
  els.platformTrendInput = document.getElementById("platformTrendInput");
  els.angleSuggestions = document.getElementById("angleSuggestions");
  els.hookSuggestions = document.getElementById("hookSuggestions");
  els.useCaseSuggestions = document.getElementById("useCaseSuggestions");
  els.trendSuggestions = document.getElementById("trendSuggestions");
  els.ctaInput = document.getElementById("ctaInput");
  els.customCopyInput = document.getElementById("customCopyInput");
  els.notesInput = document.getElementById("notesInput");
  els.brand1 = document.getElementById("brand1");
  els.brand2 = document.getElementById("brand2");
  els.brand3 = document.getElementById("brand3");
  els.competitorList = document.getElementById("competitorList");
  els.insightsList = document.getElementById("insightsList");
  els.ideaGrid = document.getElementById("ideaGrid");
  els.trendGrid = document.getElementById("trendGrid");
  els.adsGrid = document.getElementById("adsGrid");
  els.promptGrid = document.getElementById("promptGrid");
  els.insightsStatus = document.getElementById("insightsStatus");

  els.generateAdsBtn = document.getElementById("generateAdsBtn");
  els.generateAdsTopBtn = document.getElementById("generateAdsTopBtn");
  els.generateInsightsBtn = document.getElementById("generateInsightsBtn");
  els.saveStateBtn = document.getElementById("saveStateBtn");
  els.clearSavedBtn = document.getElementById("clearSavedBtn");
  els.loadSeedDataBtn = document.getElementById("loadSeedDataBtn");
  els.downloadJsonBtn = document.getElementById("downloadJsonBtn");
  els.downloadHtmlBtn = document.getElementById("downloadHtmlBtn");
}

function hydrateState() {
  const saved = localStorage.getItem("truthfinderCreativeStudioState");
  const parsed = saved ? safelyParseJson(saved) : null;

  state.competitors = clone(MARKET_DEFAULTS.competitors);
  state.selectedAngle = MARKET_DEFAULTS.angles[1];
  state.selectedHook = MARKET_DEFAULTS.hooks[4];
  state.selectedUseCase = MARKET_DEFAULTS.useCases[1];
  state.selectedTrend = MARKET_DEFAULTS.platformTrends[1].name;
  state.selectedCompetitorId = "truthfinder";

  if (parsed) {
    Object.assign(state, parsed);
  }

  state.selectedTrend = state.selectedTrend || getTrendById(parsed?.selectedTrendId)?.name || MARKET_DEFAULTS.platformTrends[1].name;
  state.selectedAngle = state.selectedAngle || MARKET_DEFAULTS.angles[1];
  state.selectedHook = state.selectedHook || MARKET_DEFAULTS.hooks[4];
  state.selectedUseCase = state.selectedUseCase || MARKET_DEFAULTS.useCases[1];
  state.selectedCompetitorId = state.selectedCompetitorId || "truthfinder";

  renderSuggestionLists();

  els.angleInput.value = state.selectedAngle;
  els.hookInput.value = state.selectedHook;
  els.useCaseInput.value = state.selectedUseCase;
  els.platformTrendInput.value = state.selectedTrend;
  els.ctaInput.value = state.brand.cta || "Search Now";
  els.customCopyInput.value = state.customCopy || "";
  els.notesInput.value = state.competitorNotes || "";
  els.brand1.value = state.brand.color1 || "#16c1b0";
  els.brand2.value = state.brand.color2 || "#5eead4";
  els.brand3.value = state.brand.color3 || "#0f1720";

  if (!state.generatedAds?.length) {
    state.generatedAds = generateAdSet();
  }
}

function renderSuggestionLists() {
  fillDataList(els.angleSuggestions, MARKET_DEFAULTS.angles);
  fillDataList(els.hookSuggestions, MARKET_DEFAULTS.hooks);
  fillDataList(els.useCaseSuggestions, MARKET_DEFAULTS.useCases);
  fillDataList(els.trendSuggestions, MARKET_DEFAULTS.platformTrends.map(item => item.name));
}

function fillDataList(el, values) {
  el.innerHTML = values.map(value => `<option value="${escapeAttribute(value)}"></option>`).join("");
}

function bindEvents() {
  bindTextField(els.angleInput, "selectedAngle");
  bindTextField(els.hookInput, "selectedHook");
  bindTextField(els.useCaseInput, "selectedUseCase");
  bindTextField(els.platformTrendInput, "selectedTrend");

  els.ctaInput.addEventListener("input", () => {
    state.brand.cta = els.ctaInput.value.trim() || "Search Now";
    renderAds();
    renderPromptGrid();
  });

  els.customCopyInput.addEventListener("input", () => {
    state.customCopy = els.customCopyInput.value;
    refreshInsightsOnly();
  });

  els.notesInput.addEventListener("input", () => {
    state.competitorNotes = els.notesInput.value;
    refreshInsightsOnly();
  });

  [els.brand1, els.brand2, els.brand3].forEach((input, idx) => {
    input.addEventListener("input", () => {
      state.brand[`color${idx + 1}`] = input.value;
      syncCssVariables();
      renderAds();
    });
  });

  els.generateAdsBtn.addEventListener("click", handleGenerateAds);
  els.generateAdsTopBtn.addEventListener("click", handleGenerateAds);
  els.generateInsightsBtn.addEventListener("click", refreshInsightsOnly);
  els.saveStateBtn.addEventListener("click", saveState);
  els.clearSavedBtn.addEventListener("click", clearSaved);
  els.loadSeedDataBtn.addEventListener("click", loadSeedData);
  els.downloadJsonBtn.addEventListener("click", exportAdSetJson);
  els.downloadHtmlBtn.addEventListener("click", exportAdBoardHtml);
}

function bindTextField(input, key) {
  input.addEventListener("input", () => {
    state[key] = input.value.trim();
    refreshInsightsOnly();
  });
  input.addEventListener("change", () => {
    state[key] = input.value.trim();
    refreshInsightsOnly();
  });
}

function renderAll() {
  syncCssVariables();
  renderCompetitors();
  renderInsights();
  renderIdeaGrid();
  renderTrendGrid();
  renderAds();
  renderPromptGrid();
}

function syncCssVariables() {
  document.documentElement.style.setProperty("--brand-1", state.brand.color1);
  document.documentElement.style.setProperty("--brand-2", state.brand.color2);
  document.documentElement.style.setProperty("--brand-3", state.brand.color3);
}

function renderCompetitors() {
  els.competitorList.innerHTML = "";

  state.competitors.forEach((competitor, index) => {
    const isBrandReference = competitor.id === "truthfinder";
    const card = document.createElement("div");
    card.className = `competitor-card ${state.selectedCompetitorId === competitor.id ? "active" : ""}`;

    card.innerHTML = `
      <div class="competitor-top">
        <div>
          <div style="font-size:18px;font-weight:800;">${escapeHtml(competitor.name)}</div>
          <div class="muted">${escapeHtml(competitor.focus)}</div>
        </div>
        <div class="mini-stat">${isBrandReference ? "brand ref" : `#${index}`}</div>
      </div>

      <div class="field">
        <label>Meta Ad Library URL</label>
        <input data-competitor-url="${competitor.id}" value="${escapeAttribute(competitor.metaUrl)}" />
      </div>

      <div class="field">
        <label>Observed creative patterns</label>
        <textarea data-competitor-patterns="${competitor.id}">${escapeHtml(competitor.patterns.join(", "))}</textarea>
      </div>

      <div class="field">
        <label>Formats showing up</label>
        <input data-competitor-formats="${competitor.id}" value="${escapeAttribute(competitor.observedFormats.join(", "))}" />
      </div>

      <div class="pill-row">
        ${competitor.patterns.slice(0, 2).map(item => `<span class="pill">${escapeHtml(item)}</span>`).join("")}
        ${competitor.observedFormats.slice(0, 2).map(item => `<span class="pill">${escapeHtml(item)}</span>`).join("")}
      </div>

      <div class="small-actions">
        <button class="btn-secondary" data-choose-competitor="${competitor.id}">${isBrandReference ? "Use as TruthFinder reference" : "Use as comparison reference"}</button>
        <a class="btn-secondary" href="${escapeAttribute(competitor.metaUrl)}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;justify-content:center;padding:12px 16px;">Open Meta library</a>
      </div>
    `;

    els.competitorList.appendChild(card);
  });

  els.competitorList.querySelectorAll("[data-choose-competitor]").forEach(button => {
    button.addEventListener("click", () => {
      state.selectedCompetitorId = button.getAttribute("data-choose-competitor");
      renderCompetitors();
      refreshInsightsOnly();
    });
  });

  els.competitorList.querySelectorAll("[data-competitor-url]").forEach(input => {
    input.addEventListener("input", () => {
      const id = input.getAttribute("data-competitor-url");
      const target = state.competitors.find(item => item.id === id);
      if (target) target.metaUrl = input.value.trim();
    });
  });

  els.competitorList.querySelectorAll("[data-competitor-patterns]").forEach(textarea => {
    textarea.addEventListener("input", () => {
      const id = textarea.getAttribute("data-competitor-patterns");
      const target = state.competitors.find(item => item.id === id);
      if (target) target.patterns = splitCsv(textarea.value);
      refreshInsightsOnly();
    });
  });

  els.competitorList.querySelectorAll("[data-competitor-formats]").forEach(input => {
    input.addEventListener("input", () => {
      const id = input.getAttribute("data-competitor-formats");
      const target = state.competitors.find(item => item.id === id);
      if (target) target.observedFormats = splitCsv(input.value);
      refreshInsightsOnly();
    });
  });
}

function renderInsights() {
  const insights = buildInsights();
  const primary = getSelectedCompetitor();
  els.insightsStatus.textContent = primary.id === "truthfinder"
    ? "Using TruthFinder's Meta Ad Library as the primary creative reference."
    : `Using ${primary.name} as the comparison set, while keeping TruthFinder as the brand baseline.`;
  els.insightsList.innerHTML = insights
    .map(item => `<div class="insight-item">${escapeHtml(item)}</div>`)
    .join("");
}

function buildInsights() {
  const primary = getSelectedCompetitor();
  const truthfinder = getCompetitorById("truthfinder");
  const trend = getSelectedTrendObject();
  const notes = state.competitorNotes.trim();
  const noteSummary = notes
    ? `Your notes suggest the market is leaning on: ${notes.replace(/\n/g, " ").slice(0, 220)}${notes.length > 220 ? "…" : ""}`
    : `No pasted notes yet, so the read is based on TruthFinder's saved patterns (${joinHumanList(truthfinder.patterns)}).`;

  return [
    `Primary brand reference: TruthFinder currently leans on ${joinHumanList(truthfinder.patterns)}. That should remain the schematic anchor for the next five ads.`,
    `${primary.name} is emphasizing ${joinHumanList(primary.patterns)} and ${joinHumanList(primary.observedFormats)}. That opens room for TruthFinder to push ${state.selectedAngle.toLowerCase()} with a cleaner ${trend.name.toLowerCase()} treatment.`,
    `Typed brief received: angle = “${state.selectedAngle}”, hook = “${state.selectedHook}”, use case = “${state.selectedUseCase}”, visual trend = “${state.selectedTrend}”. The generator will use these exact inputs across all five concepts.`,
    `Best move: keep the ad feeling premium and brand-safe while still making ${state.selectedUseCase.toLowerCase()} feel urgent and actionable in the first second.`,
    noteSummary
  ];
}

function renderIdeaGrid() {
  const ideas = buildUseCaseIdeas();
  els.ideaGrid.innerHTML = ideas.map(idea => `
    <div class="idea-card">
      <div style="font-size:17px;font-weight:800;margin-bottom:6px;">${escapeHtml(idea.title)}</div>
      <div class="muted" style="margin-bottom:10px;">${escapeHtml(idea.why)}</div>
      <div class="pill-row">
        ${idea.hooks.map(h => `<span class="pill">${escapeHtml(h)}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

function buildUseCaseIdeas() {
  const typedAngle = state.selectedAngle || "Scenario-led trust check";
  const typedHook = state.selectedHook || "Search first";
  const typedUseCase = state.selectedUseCase || "people search";

  return [
    {
      title: `Primary concept: ${typedUseCase}`,
      why: `Built directly from your typed brief so the next 5 creatives stay anchored to ${typedAngle.toLowerCase()}.`,
      hooks: [typedHook, `Proof for ${typedUseCase}`, `TruthFinder-first utility framing`]
    },
    {
      title: "Marketplace meetup confidence",
      why: "Targets local transactions and first-time meetups where trust and safety matter immediately.",
      hooks: ["Check before you meet", "Seller or buyer—verify first", "A quick search can reduce risk"]
    },
    {
      title: "Modern dating due diligence",
      why: "Positions TruthFinder as a practical pre-date step without feeling overly negative or accusatory.",
      hooks: ["Before date night, know more", "Trust your gut—then verify", "Confidence before chemistry"]
    },
    {
      title: "Unknown caller clarity",
      why: "Speaks to constant spam fatigue and converts well because the problem is immediate and familiar.",
      hooks: ["That number again?", "Unknown caller, known answer", "Search the number first"]
    },
    {
      title: "Neighbor and address context",
      why: "Broadens demand by speaking to new moves, rentals, and basic household peace of mind.",
      hooks: ["Who is tied to that address?", "Get context, not rumors", "Know more about where you live"]
    },
    {
      title: "Parent peace-of-mind utility",
      why: "Frames the product around family safety and real-world caution, not just curiosity.",
      hooks: ["Your teen is meeting who?", "Know who’s in the picture", "A search for extra peace of mind"]
    }
  ];
}

function renderTrendGrid() {
  const selectedTrend = normalize(state.selectedTrend);
  const trendCards = MARKET_DEFAULTS.platformTrends.map(trend => `
    <div class="trend-card">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:8px;">
        <div style="font-size:17px;font-weight:800;">${escapeHtml(trend.name)}</div>
        <div class="mini-stat">${normalize(trend.name) === selectedTrend ? "selected" : "available"}</div>
      </div>
      <div class="muted" style="margin-bottom:10px;">${escapeHtml(trend.description)}</div>
      <div class="pill-row">
        ${trend.elements.map(el => `<span class="pill">${escapeHtml(el)}</span>`).join("")}
      </div>
    </div>
  `).join("");

  const customTrendCard = getSelectedTrendObject().isCustom ? `
    <div class="trend-card">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:8px;">
        <div style="font-size:17px;font-weight:800;">${escapeHtml(state.selectedTrend)}</div>
        <div class="mini-stat">custom</div>
      </div>
      <div class="muted" style="margin-bottom:10px;">Custom trend typed into the form. The generator will infer a visual system from the phrase you entered.</div>
      <div class="pill-row">
        ${getSelectedTrendObject().elements.map(el => `<span class="pill">${escapeHtml(el)}</span>`).join("")}
      </div>
    </div>
  ` : "";

  els.trendGrid.innerHTML = customTrendCard + trendCards;
}

function handleGenerateAds() {
  const missing = [
    [state.selectedAngle, "angle"],
    [state.selectedHook, "hook"],
    [state.selectedUseCase, "use case"],
    [state.selectedTrend, "visual trend"]
  ].filter(([value]) => !String(value || "").trim()).map(([, label]) => label);

  if (missing.length) {
    els.insightsStatus.textContent = `Add a ${joinHumanList(missing)} before generating.`;
    return;
  }

  state.generatedAds = generateAdSet();
  renderAds();
  renderPromptGrid();
  els.insightsStatus.textContent = "Generated 5 new TruthFinder display creatives from your typed brief.";
}

function generateAdSet() {
  const selectedTrend = getSelectedTrendObject();
  const primaryReference = getSelectedCompetitor();
  const truthfinder = getCompetitorById("truthfinder");
  const copyHint = state.customCopy.trim();
  const useCase = state.selectedUseCase.trim();
  const angle = state.selectedAngle.trim();
  const hook = state.selectedHook.trim();

  const frameworks = [
    { style: "scenario-led", kicker: useCase, socialProof: `Grounded in ${angle.toLowerCase()}.` },
    { style: "product-led", kicker: "TruthFinder utility", socialProof: `Uses TruthFinder's Meta reference look and feel.` },
    { style: "proof-card", kicker: selectedTrend.name, socialProof: `Built to feel current in-feed without drifting off brand.` },
    { style: "comparison-led", kicker: primaryReference.name === "TruthFinder" ? "Category gap" : `Versus ${primaryReference.name}`, socialProof: `Pushes beyond ${primaryReference.name}'s current pattern set.` },
    { style: "premium-editorial", kicker: hook, socialProof: `Premium visual system anchored in TruthFinder's current schematic.` }
  ];

  return frameworks.map((framework, idx) => {
    const headline = buildHeadline(framework.style, { hook, useCase, angle, variantSeed: idx + 1, copyHint });
    const body = buildBody(framework.style, { useCase, angle, hook, copyHint, primaryReference, truthfinder, trend: selectedTrend });
    const cta = state.brand.cta || "Search Now";
    const visualTags = buildVisualTags(selectedTrend, framework.style, idx);
    const prompt = buildCreativePrompt({ framework, selectedTrend, headline, body, useCase, visualTags, primaryReference, truthfinder });

    return {
      id: `ad-${Date.now()}-${idx}`,
      name: `${capitalize(framework.style.replace(/-/g, " "))} ${idx + 1}`,
      kicker: framework.kicker,
      headline,
      body,
      socialProof: framework.socialProof,
      cta,
      style: framework.style,
      visualTags,
      prompt
    };
  });
}

function buildHeadline(style, { hook, useCase, angle, variantSeed, copyHint }) {
  const shortUseCase = titleWrap(useCase, 18);
  const shortAngle = titleWrap(angle, 18);
  const heads = {
    "scenario-led": [
      titleWrap(hook, 18),
      `${shortUseCase}?\nSearch First.`,
      `${shortAngle}\nStarts With Context.`
    ],
    "product-led": [
      `TruthFinder Helps\nYou Check First.`,
      `More Context.\nLess Guesswork.`,
      `Search Smarter\nBefore You Move.`
    ],
    "proof-card": [
      `${titleWrap(hook, 18)}\nThen Verify.`,
      `A Quick Search\nCan Change The Call.`,
      `Built For ${titleWrap(useCase, 14)}`
    ],
    "comparison-led": [
      `What Others Miss,\nTruthFinder Surfaces.`,
      `More Than A Guess.\nStart With Search.`,
      `${titleWrap(angle, 16)}\nWith Real Context.`
    ],
    "premium-editorial": [
      `${titleWrap(hook, 16)}`,
      `The Better First Move?\nKnow More.`,
      `TruthFinder For\n${titleWrap(useCase, 14)}`
    ]
  };

  const list = heads[style] || heads["product-led"];
  let picked = list[(variantSeed - 1) % list.length];

  if (/phone|call|caller/i.test(copyHint)) picked = `That Number Again?\nSearch It.`;
  if (/marketplace/i.test(copyHint)) picked = `Before The Meetup,\nKnow More.`;
  if (/date|dating/i.test(copyHint)) picked = `Before Date Night,\nKnow More.`;

  return picked;
}

function buildBody(style, { useCase, angle, hook, copyHint, primaryReference, truthfinder, trend }) {
  const customSentence = copyHint ? ` ${sentenceCase(copyHint.trim())}` : "";
  const map = {
    "scenario-led": `Use TruthFinder before ${useCase.toLowerCase()} moments turn uncertain. ${sentenceCase(angle)} is the lens, and ${hook.toLowerCase()} is the opening move.${customSentence}`,
    "product-led": `TruthFinder helps surface names, numbers, and address context fast, using a cleaner trust-forward system than the category usually shows.${customSentence}`,
    "proof-card": `This concept turns the ${trend.name.toLowerCase()} trend into a premium TruthFinder unit built for ${useCase.toLowerCase()}.${customSentence}`,
    "comparison-led": `Compared with ${primaryReference.name}'s current Meta patterns, this pushes a more brand-owned and product-useful message while staying consistent with TruthFinder's ${joinHumanList(truthfinder.patterns)}.${customSentence}`,
    "premium-editorial": `A more elevated static for Meta feeds: sharp headline, restrained copy, and a confidence-first frame around ${angle.toLowerCase()}.${customSentence}`
  };
  return map[style] || map["product-led"];
}

function buildVisualTags(trend, style, idx) {
  const shared = trend.elements || [];
  const styleMap = {
    "scenario-led": ["scenario chip", "fast hierarchy"],
    "product-led": ["search box UI", "result card framing"],
    "proof-card": ["social proof module", "comment-stack detail"],
    "comparison-led": ["category contrast framing", "proof badge"],
    "premium-editorial": ["oversized headline", "restrained body copy"]
  };
  return [...shared, ...(styleMap[style] || []), `variant ${idx + 1}`];
}

function renderAds() {
  els.adsGrid.innerHTML = state.generatedAds.map(ad => `
    <div class="ad-card">
      <div class="ad-preview" style="background:${buildAdBackground(ad.style)};">
        <div class="ad-noise"></div>
        <div class="ad-orb one"></div>
        <div class="ad-orb two"></div>

        <div class="tf-copy">
          <div class="tf-brand">
            <div class="tf-mark">TF</div>
            <div>
              <div style="font-weight:800;">TruthFinder</div>
              <div style="font-size:12px;color:rgba(232,241,248,0.7);">Inspired by TruthFinder Meta reference</div>
            </div>
          </div>

          <div class="ad-kicker">${escapeHtml(ad.kicker)}</div>
          <div class="ad-headline">${escapeHtml(ad.headline)}</div>
          <div class="ad-body">${escapeHtml(ad.body)}</div>
        </div>

        <div class="ad-bottom">
          <div class="social-proof">
            <div class="big">${escapeHtml(ad.socialProof)}</div>
            <div class="small">${escapeHtml(ad.visualTags.slice(0, 3).join(" • "))}</div>
          </div>
          <div class="ad-cta">${escapeHtml(ad.cta)}</div>
        </div>
      </div>

      <div class="ad-editor">
        <div class="field" style="margin-bottom:0;">
          <label>Headline</label>
          <textarea data-ad-field="headline" data-ad-id="${ad.id}">${escapeHtml(ad.headline)}</textarea>
        </div>
        <div class="field" style="margin-bottom:0;">
          <label>Body copy</label>
          <textarea data-ad-field="body" data-ad-id="${ad.id}">${escapeHtml(ad.body)}</textarea>
        </div>
        <div class="row-2">
          <div class="field" style="margin-bottom:0;">
            <label>Kicker</label>
            <input data-ad-field="kicker" data-ad-id="${ad.id}" value="${escapeAttribute(ad.kicker)}" />
          </div>
          <div class="field" style="margin-bottom:0;">
            <label>CTA</label>
            <input data-ad-field="cta" data-ad-id="${ad.id}" value="${escapeAttribute(ad.cta)}" />
          </div>
        </div>
        <div class="ad-editor-actions">
          <div class="muted">${escapeHtml(ad.name)}</div>
          <button class="btn-secondary" data-copy-prompt="${ad.id}">Copy designer prompt</button>
        </div>
      </div>
    </div>
  `).join("");

  els.adsGrid.querySelectorAll("[data-ad-field]").forEach(input => {
    input.addEventListener("input", () => {
      const adId = input.getAttribute("data-ad-id");
      const field = input.getAttribute("data-ad-field");
      const ad = state.generatedAds.find(item => item.id === adId);
      if (!ad) return;
      ad[field] = input.value;
      if (["headline", "body", "kicker", "cta"].includes(field)) {
        renderAds();
        renderPromptGrid();
      }
    });
  });

  els.adsGrid.querySelectorAll("[data-copy-prompt]").forEach(button => {
    button.addEventListener("click", async () => {
      const adId = button.getAttribute("data-copy-prompt");
      const ad = state.generatedAds.find(item => item.id === adId);
      if (!ad) return;
      await navigator.clipboard.writeText(ad.prompt);
      button.textContent = "Prompt copied";
      setTimeout(() => { button.textContent = "Copy designer prompt"; }, 1200);
    });
  });
}

function buildAdBackground(style) {
  const dark = state.brand.color3;
  const c1 = state.brand.color1;
  const c2 = state.brand.color2;
  const map = {
    "scenario-led": `linear-gradient(145deg, ${dark}, ${mixHex(dark, c1, 0.24)})`,
    "product-led": `linear-gradient(145deg, ${mixHex(dark, c2, 0.1)}, ${mixHex(dark, c1, 0.22)})`,
    "proof-card": `linear-gradient(145deg, ${dark}, ${mixHex(c1, c2, 0.48)})`,
    "comparison-led": `linear-gradient(145deg, ${mixHex(dark, "#000000", 0.18)}, ${mixHex(dark, c2, 0.18)})`,
    "premium-editorial": `linear-gradient(145deg, ${mixHex(dark, c1, 0.15)}, ${mixHex(dark, c2, 0.08)})`
  };
  return map[style] || map["product-led"];
}

function renderPromptGrid() {
  els.promptGrid.innerHTML = state.generatedAds.map(ad => `
    <div class="prompt-card">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:8px;">
        <div style="font-size:17px;font-weight:800;">${escapeHtml(ad.name)}</div>
        <span class="mini-stat">${escapeHtml(ad.style)}</span>
      </div>
      <div class="muted" style="white-space:pre-line;line-height:1.5;">${escapeHtml(ad.prompt)}</div>
    </div>
  `).join("");
}

function buildCreativePrompt({ framework, selectedTrend, headline, body, useCase, visualTags, primaryReference, truthfinder }) {
  return [
    `Create a premium paid-social static ad for TruthFinder.`,
    `Concept style: ${framework.style}.`,
    `Primary brand reference: TruthFinder Meta Ad Library (${joinHumanList(truthfinder.patterns)}).`,
    `Comparison reference: ${primaryReference.name} (${joinHumanList(primaryReference.patterns)}).`,
    `Audience/use case: ${useCase}.`,
    `Input angle: ${state.selectedAngle}.`,
    `Input hook: ${state.selectedHook}.`,
    `Visual direction: ${selectedTrend.name} with ${visualTags.join(", ")}.`,
    `Brand treatment: dark premium background, teal-to-aqua TruthFinder accents, modern trust-and-utility aesthetic.`,
    `Headline: ${headline.replace(/\n/g, " ")}.`,
    `Body copy: ${body}.`,
    `CTA: ${state.brand.cta}.`,
    `Make the composition feel native to Meta feeds, thumb-stopping, mobile-first, and conversion oriented.`
  ].join("\n");
}

function refreshInsightsOnly() {
  renderInsights();
  renderIdeaGrid();
  renderTrendGrid();
}

function getSelectedCompetitor() {
  return state.competitors.find(item => item.id === state.selectedCompetitorId) || getCompetitorById("truthfinder") || state.competitors[0];
}

function getCompetitorById(id) {
  return state.competitors.find(item => item.id === id) || MARKET_DEFAULTS.competitors.find(item => item.id === id);
}

function getTrendById(id) {
  return MARKET_DEFAULTS.platformTrends.find(item => item.id === id);
}

function getSelectedTrendObject() {
  const exact = MARKET_DEFAULTS.platformTrends.find(item => normalize(item.name) === normalize(state.selectedTrend));
  if (exact) return { ...exact, isCustom: false };
  return {
    id: slugify(state.selectedTrend || "custom-trend"),
    name: state.selectedTrend || "Custom visual trend",
    description: "Derived from the custom trend typed into the control panel.",
    elements: inferTrendElements(state.selectedTrend),
    isCustom: true
  };
}

function inferTrendElements(trendName = "") {
  const cleaned = String(trendName).trim();
  if (!cleaned) return ["mobile-first layout", "premium gradient", "high-contrast CTA", "scroll-stop headline"];
  const words = cleaned.split(/\s+/).filter(Boolean).slice(0, 4);
  const normalized = words.map(word => word.toLowerCase());
  const inferred = [
    cleaned,
    ...normalized.map(word => `${word} motif`),
    "mobile-first layout",
    "high-contrast CTA"
  ];
  return [...new Set(inferred)].slice(0, 6);
}

function saveState() {
  localStorage.setItem("truthfinderCreativeStudioState", JSON.stringify(state));
  els.insightsStatus.textContent = "Saved locally in your browser.";
}

function clearSaved() {
  localStorage.removeItem("truthfinderCreativeStudioState");
  els.insightsStatus.textContent = "Saved local state cleared.";
}

function loadSeedData() {
  localStorage.removeItem("truthfinderCreativeStudioState");
  Object.assign(state, {
    brand: {
      color1: "#16c1b0",
      color2: "#5eead4",
      color3: "#0f1720",
      cta: "Search Now"
    },
    competitors: clone(MARKET_DEFAULTS.competitors),
    selectedAngle: MARKET_DEFAULTS.angles[1],
    selectedHook: MARKET_DEFAULTS.hooks[4],
    selectedUseCase: MARKET_DEFAULTS.useCases[1],
    selectedTrend: MARKET_DEFAULTS.platformTrends[1].name,
    competitorNotes: "",
    customCopy: "",
    generatedAds: [],
    selectedCompetitorId: "truthfinder"
  });

  els.angleInput.value = state.selectedAngle;
  els.hookInput.value = state.selectedHook;
  els.useCaseInput.value = state.selectedUseCase;
  els.platformTrendInput.value = state.selectedTrend;
  els.ctaInput.value = state.brand.cta;
  els.customCopyInput.value = "";
  els.notesInput.value = "";
  els.brand1.value = state.brand.color1;
  els.brand2.value = state.brand.color2;
  els.brand3.value = state.brand.color3;

  state.generatedAds = generateAdSet();
  renderAll();
  els.insightsStatus.textContent = "Seed data reloaded.";
}

function exportAdSetJson() {
  const payload = {
    exportedAt: new Date().toISOString(),
    angle: state.selectedAngle,
    hook: state.selectedHook,
    useCase: state.selectedUseCase,
    trend: state.selectedTrend,
    competitor: getSelectedCompetitor().name,
    customCopy: state.customCopy,
    competitorNotes: state.competitorNotes,
    ads: state.generatedAds
  };
  downloadFile("truthfinder-ad-set.json", JSON.stringify(payload, null, 2), "application/json");
}

function exportAdBoardHtml() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TruthFinder Ad Board</title>
  <style>
    body { font-family: Inter, Arial, sans-serif; margin: 0; background: #08131d; color: #eef5fb; padding: 24px; }
    h1 { margin-top: 0; }
    .grid { display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 18px; }
    .card { border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; overflow: hidden; background: rgba(255,255,255,0.03); }
    .preview { aspect-ratio: 4/5; padding: 22px; display: flex; flex-direction: column; justify-content: space-between; background: linear-gradient(145deg, ${state.brand.color3}, ${state.brand.color1}); }
    .kicker { display: inline-block; padding: 6px 10px; border-radius: 999px; background: rgba(255,255,255,0.12); font-size: 12px; }
    .headline { font-size: 30px; font-weight: 800; line-height: 1.02; margin: 10px 0; white-space: pre-line; }
    .body { font-size: 14px; line-height: 1.45; opacity: 0.92; max-width: 84%; }
    .bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; }
    .cta { padding: 10px 14px; border-radius: 999px; background: linear-gradient(135deg, ${state.brand.color1}, ${state.brand.color2}); color: #07201c; font-weight: 800; font-size: 13px; }
    .meta { padding: 14px; font-size: 13px; color: #c6d6e4; }
    @media (max-width: 820px) { .grid { grid-template-columns: 1fr; } .headline { font-size: 25px; } }
  </style>
</head>
<body>
  <h1>TruthFinder Ad Board</h1>
  <p>Angle: ${escapeHtml(state.selectedAngle)}<br>Hook: ${escapeHtml(state.selectedHook)}<br>Use case: ${escapeHtml(state.selectedUseCase)}<br>Visual trend: ${escapeHtml(state.selectedTrend)}</p>
  <div class="grid">
    ${state.generatedAds.map(ad => `
      <div class="card">
        <div class="preview">
          <div>
            <div style="font-weight:800; margin-bottom:12px;">TruthFinder</div>
            <div class="kicker">${escapeHtml(ad.kicker)}</div>
            <div class="headline">${escapeHtml(ad.headline)}</div>
            <div class="body">${escapeHtml(ad.body)}</div>
          </div>
          <div class="bottom">
            <div>${escapeHtml(ad.socialProof)}</div>
            <div class="cta">${escapeHtml(ad.cta)}</div>
          </div>
        </div>
        <div class="meta">${escapeHtml(ad.prompt)}</div>
      </div>
    `).join("")}
  </div>
</body>
</html>`;

  downloadFile("truthfinder-ad-board.html", html, "text/html");
}

function downloadFile(filename, contents, mimeType) {
  const blob = new Blob([contents], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function splitCsv(value) {
  return value
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);
}

function mixHex(a, b, weight = 0.5) {
  const colorA = hexToRgb(a);
  const colorB = hexToRgb(b);
  const mix = {
    r: Math.round(colorA.r + (colorB.r - colorA.r) * weight),
    g: Math.round(colorA.g + (colorB.g - colorA.g) * weight),
    b: Math.round(colorA.b + (colorB.b - colorA.b) * weight)
  };
  return rgbToHex(mix.r, mix.g, mix.b);
}

function hexToRgb(hex) {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map(v => v.toString(16).padStart(2, "0")).join("")}`;
}

function joinHumanList(list) {
  if (!list.length) return "no saved patterns yet";
  if (list.length === 1) return list[0];
  if (list.length === 2) return `${list[0]} and ${list[1]}`;
  return `${list.slice(0, -1).join(", ")}, and ${list[list.length - 1]}`;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function sentenceCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function safelyParseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalize(value = "") {
  return String(value).trim().toLowerCase();
}

function titleWrap(value = "", maxLength = 16) {
  const words = String(value).trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "";
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxLength && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 2).join("\n");
}

function slugify(value = "") {
  return String(value).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "custom";
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value = "") {
  return escapeHtml(value).replace(/`/g, "&#96;");
}
