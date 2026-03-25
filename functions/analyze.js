const MARKET_DEFAULTS = {
  brandName: "TruthFinder",
  competitors: [
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
      metaUrl: "https://www.facebook.com/ads/library/",
      patterns: ["fear + curiosity", "bold before/after framing", "trust-and-safety headlines"],
      observedFormats: ["clean static", "mobile search UI mockup", "testimonial card"]
    },
    {
      id: "spokeo",
      name: "Spokeo",
      focus: "contact discovery, people search, reverse lookup",
      metaUrl: "https://www.facebook.com/ads/library/",
      patterns: ["light UI screenshots", "simple utility framing", "problem/solution headline structure"],
      observedFormats: ["product UI mockup", "search-result visual", "carousel-style value stack"]
    },
    {
      id: "peoplefinders",
      name: "PeopleFinders",
      focus: "public record and people search utility",
      metaUrl: "https://www.facebook.com/ads/library/",
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
  selectedTrendId: "",
  competitorNotes: "",
  customCopy: "",
  generatedAds: [],
  selectedCompetitorId: "beenverified"
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
  els.angleSelect = document.getElementById("angleSelect");
  els.hookSelect = document.getElementById("hookSelect");
  els.useCaseSelect = document.getElementById("useCaseSelect");
  els.platformTrendSelect = document.getElementById("platformTrendSelect");
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
  state.selectedTrendId = MARKET_DEFAULTS.platformTrends[1].id;

  if (parsed) {
    Object.assign(state, parsed);
  }

  populateSelect(els.angleSelect, MARKET_DEFAULTS.angles, state.selectedAngle);
  populateSelect(els.hookSelect, MARKET_DEFAULTS.hooks, state.selectedHook);
  populateSelect(els.useCaseSelect, MARKET_DEFAULTS.useCases, state.selectedUseCase);
  populateSelect(
    els.platformTrendSelect,
    MARKET_DEFAULTS.platformTrends.map(t => t.name),
    getTrendById(state.selectedTrendId)?.name || MARKET_DEFAULTS.platformTrends[0].name
  );

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

function bindEvents() {
  els.angleSelect.addEventListener("change", () => {
    state.selectedAngle = els.angleSelect.value;
    refreshInsightsOnly();
  });

  els.hookSelect.addEventListener("change", () => {
    state.selectedHook = els.hookSelect.value;
    refreshInsightsOnly();
  });

  els.useCaseSelect.addEventListener("change", () => {
    state.selectedUseCase = els.useCaseSelect.value;
    refreshInsightsOnly();
  });

  els.platformTrendSelect.addEventListener("change", () => {
    const trend = MARKET_DEFAULTS.platformTrends.find(t => t.name === els.platformTrendSelect.value);
    state.selectedTrendId = trend?.id || MARKET_DEFAULTS.platformTrends[0].id;
    refreshInsightsOnly();
  });

  els.ctaInput.addEventListener("input", () => {
    state.brand.cta = els.ctaInput.value.trim() || "Search Now";
    renderAds();
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
    const card = document.createElement("div");
    card.className = `competitor-card ${state.selectedCompetitorId === competitor.id ? "active" : ""}`;

    card.innerHTML = `
      <div class="competitor-top">
        <div>
          <div style="font-size:18px;font-weight:800;">${escapeHtml(competitor.name)}</div>
          <div class="muted">${escapeHtml(competitor.focus)}</div>
        </div>
        <div class="mini-stat">#${index + 1}</div>
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
        <span class="pill">${escapeHtml(competitor.patterns[0] || "pattern")}</span>
        <span class="pill">${escapeHtml(competitor.observedFormats[0] || "format")}</span>
        <span class="pill">${escapeHtml(competitor.observedFormats[1] || "format")}</span>
      </div>

      <div class="small-actions">
        <button class="btn-secondary" data-choose-competitor="${competitor.id}">Use as reference</button>
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
  els.insightsStatus.textContent = `Using ${getSelectedCompetitor().name} as the primary competitive reference.`;
  els.insightsList.innerHTML = insights
    .map(item => `<div class="insight-item">${escapeHtml(item)}</div>`)
    .join("");
}

function buildInsights() {
  const competitor = getSelectedCompetitor();
  const trend = getTrendById(state.selectedTrendId);
  const notes = state.competitorNotes.trim();
  const noteSummary = notes
    ? `Your notes suggest the market is leaning on: ${notes.replace(/\n/g, " ").slice(0, 220)}${notes.length > 220 ? "…" : ""}`
    : `No pasted notes yet, so the read is based on the saved patterns for ${competitor.name}.`;

  return [
    `${competitor.name} appears to be emphasizing ${joinHumanList(competitor.patterns)}. That creates room for TruthFinder to win with a cleaner, more premium utility-led frame instead of just more fear.` ,
    `Recommended attack angle: ${state.selectedAngle}. Pair it with the hook “${state.selectedHook}” so the ad feels situational rather than generic.` ,
    `Best visual treatment for this concept: ${trend.name}. It matches ${state.selectedUseCase.toLowerCase()} because it supports thumb-stop speed and makes the product feel immediately useful.` ,
    noteSummary,
    `Creative gap to exploit: build more specific, scenario-based ads around ${state.selectedUseCase.toLowerCase()} and make the result feel actionable in the first second.`
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
  const base = [
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
    },
    {
      title: "Reconnect with context",
      why: "Lets the brand feel useful and positive, not just fear-based—great for softer top- and mid-funnel creative.",
      hooks: ["Before you reach back out", "Reconnect with confidence", "A little context goes a long way"]
    }
  ];

  return base;
}

function renderTrendGrid() {
  els.trendGrid.innerHTML = MARKET_DEFAULTS.platformTrends.map(trend => `
    <div class="trend-card">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:8px;">
        <div style="font-size:17px;font-weight:800;">${escapeHtml(trend.name)}</div>
        <div class="mini-stat">${trend.id === state.selectedTrendId ? "selected" : "available"}</div>
      </div>
      <div class="muted" style="margin-bottom:10px;">${escapeHtml(trend.description)}</div>
      <div class="pill-row">
        ${trend.elements.map(el => `<span class="pill">${escapeHtml(el)}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

function handleGenerateAds() {
  state.generatedAds = generateAdSet();
  renderAds();
  renderPromptGrid();
}

function generateAdSet() {
  const selectedTrend = getTrendById(state.selectedTrendId);
  const competitor = getSelectedCompetitor();
  const copyHint = state.customCopy.trim();
  const useCase = state.selectedUseCase;
  const angle = state.selectedAngle;
  const hook = state.selectedHook;

  const frameworks = [
    { style: "problem-solution", kicker: useCase, socialProof: "Built for quick, practical peace of mind." },
    { style: "fear-relief", kicker: angle, socialProof: `Inspired by ${competitor.name} category pressure, differentiated with cleaner trust design.` },
    { style: "utility-first", kicker: "Public record utility", socialProof: "Designed to feel useful, not spammy." },
    { style: "social-proof", kicker: "Why people search first", socialProof: "Turns curiosity into a concrete action." },
    { style: "bold-alert", kicker: selectedTrend.name, socialProof: "Built to stop the scroll in-feed." }
  ];

  return frameworks.map((framework, idx) => {
    const variantSeed = idx + 1;
    const headline = buildHeadline(framework.style, { hook, useCase, angle, variantSeed, copyHint });
    const body = buildBody(framework.style, { useCase, angle, hook, copyHint, competitor });
    const cta = state.brand.cta || "Search Now";
    const visualTags = buildVisualTags(selectedTrend, framework.style, idx);
    const prompt = buildCreativePrompt({ framework, selectedTrend, headline, body, useCase, visualTags, competitor });

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
  const heads = {
    "problem-solution": [
      `${hook}`,
      `Meeting Someone From ${useCase}?\nSearch First.`,
      `A Quick Search Before\nA Big Decision.`
    ],
    "fear-relief": [
      `When Something Feels Off,\nCheck First.`,
      `${angle.split(" ").slice(0, 4).join(" ")}\nStarts With Context.`,
      `Don’t Guess.\nSearch The Facts.`
    ],
    "utility-first": [
      `Search The Person.\nReduce The Guesswork.`,
      `Useful Context In\nSeconds.`,
      `Find More Before\nYou Move Forward.`
    ],
    "social-proof": [
      `People Search First\nFor A Reason.`,
      `A Little Context\nChanges Everything.`,
      `The Safer Move?\nStart With A Search.`
    ],
    "bold-alert": [
      `Unknown Person?\nUnknown Number?`,
      `Search Before\nYou Show Up.`,
      `Pause. Search.\nThen Decide.`
    ]
  };

  const list = heads[style] || heads["utility-first"];
  const picked = list[(variantSeed - 1) % list.length];

  if (!copyHint) return picked;
  if (/marketplace/i.test(copyHint)) return `Before The Meetup,\nKnow More.`;
  if (/phone|call/i.test(copyHint)) return `That Number Again?\nSearch It.`;
  return picked;
}

function buildBody(style, { useCase, angle, hook, copyHint, competitor }) {
  const customSentence = copyHint ? ` ${sentenceCase(copyHint.trim())}` : "";
  const map = {
    "problem-solution": `TruthFinder helps you get more context before ${useCase.toLowerCase()} moments turn into bad decisions.${customSentence}`,
    "fear-relief": `Use public-record search to reduce uncertainty when ${angle.toLowerCase()}.${customSentence}`,
    "utility-first": `Search names, numbers, and addresses to get useful context fast—without relying on guesswork alone.${customSentence}`,
    "social-proof": `In a category crowded with loud ads like ${competitor.name}, a cleaner utility-led message can feel more trustworthy.${customSentence}`,
    "bold-alert": `Fast, scroll-stopping creative for ${useCase.toLowerCase()} situations where people want clarity right now.${customSentence}`
  };
  return map[style] || map["utility-first"];
}

function buildVisualTags(trend, style, idx) {
  const shared = trend?.elements || [];
  const styleMap = {
    "problem-solution": ["split problem/solution layout", "result highlight chip"],
    "fear-relief": ["dark contrast background", "signal glow"],
    "utility-first": ["search box UI", "clean app-card framing"],
    "social-proof": ["quote bubble", "comment-style annotation"],
    "bold-alert": ["warning stripe", "oversized CTA treatment"]
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
              <div style="font-size:12px;color:rgba(232,241,248,0.7);">Search with more confidence</div>
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
    "problem-solution": `linear-gradient(145deg, ${dark}, ${mixHex(dark, c1, 0.25)})`,
    "fear-relief": `linear-gradient(145deg, ${mixHex(dark, "#000000", 0.15)}, ${mixHex(dark, c2, 0.18)})`,
    "utility-first": `linear-gradient(145deg, ${mixHex(dark, c2, 0.08)}, ${mixHex(dark, c1, 0.22)})`,
    "social-proof": `linear-gradient(145deg, ${dark}, ${mixHex(c1, c2, 0.5)})`,
    "bold-alert": `linear-gradient(145deg, ${mixHex(dark, c1, 0.32)}, ${mixHex(dark, c2, 0.12)})`
  };
  return map[style] || map["utility-first"];
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

function buildCreativePrompt({ framework, selectedTrend, headline, body, useCase, visualTags, competitor }) {
  return [
    `Create a premium paid-social static ad for TruthFinder.`,
    `Concept style: ${framework.style}.`,
    `Audience/use case: ${useCase}.`,
    `Competitive reference to outperform: ${competitor.name}.`,
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
}

function getSelectedCompetitor() {
  return state.competitors.find(item => item.id === state.selectedCompetitorId) || state.competitors[0];
}

function getTrendById(id) {
  return MARKET_DEFAULTS.platformTrends.find(item => item.id === id);
}

function populateSelect(selectEl, values, selectedValue) {
  selectEl.innerHTML = values.map(value => `
    <option ${value === selectedValue ? "selected" : ""}>${escapeHtml(value)}</option>
  `).join("");
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
    selectedTrendId: MARKET_DEFAULTS.platformTrends[1].id,
    competitorNotes: "",
    customCopy: "",
    generatedAds: [],
    selectedCompetitorId: "beenverified"
  });

  populateSelect(els.angleSelect, MARKET_DEFAULTS.angles, state.selectedAngle);
  populateSelect(els.hookSelect, MARKET_DEFAULTS.hooks, state.selectedHook);
  populateSelect(els.useCaseSelect, MARKET_DEFAULTS.useCases, state.selectedUseCase);
  populateSelect(els.platformTrendSelect, MARKET_DEFAULTS.platformTrends.map(t => t.name), getTrendById(state.selectedTrendId)?.name);

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
    trend: getTrendById(state.selectedTrendId)?.name,
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
  <p>Angle: ${escapeHtml(state.selectedAngle)}<br>Hook: ${escapeHtml(state.selectedHook)}<br>Use case: ${escapeHtml(state.selectedUseCase)}</p>
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
