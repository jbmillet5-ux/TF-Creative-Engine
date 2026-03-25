const DEFAULTS = {
  competitors: [
    {
      id: 'truthfinder',
      name: 'TruthFinder',
      metaUrl: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&is_targeted_country=false&media_type=all&search_type=keyword_unordered&q=TruthFinder',
      focus: 'Primary brand reference',
      patterns: ['dark premium gradients', 'trust-forward utility messaging', 'search-led framing'],
      formats: ['static image', 'product-led UI mockup', 'headline-led card']
    },
    {
      id: 'beenverified',
      name: 'BeenVerified',
      metaUrl: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&is_targeted_country=false&media_type=all&search_type=keyword_unordered&q=BeenVerified',
      focus: 'Category comparison',
      patterns: ['urgency-led headlines', 'caller anxiety', 'bright badges'],
      formats: ['static image', 'testimonial card', 'benefit collage']
    },
    {
      id: 'instantcheckmate',
      name: 'Instant Checkmate',
      metaUrl: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&is_targeted_country=false&media_type=all&search_type=keyword_unordered&q=Instant%20Checkmate',
      focus: 'Category comparison',
      patterns: ['fear plus curiosity', 'bold contrast', 'trust-and-safety headlines'],
      formats: ['clean static', 'mobile search UI', 'testimonial card']
    }
  ],
  angles: [
    'First-date confidence check',
    'Facebook Marketplace trust check',
    'Reverse phone lookup for suspicious calls',
    'Know more before you meet someone',
    'Family peace-of-mind search',
    'Neighbor or address context'
  ],
  hooks: [
    'Before you meet, know more.',
    'Unknown caller? Start with a search.',
    'Trust your gut. Then verify.',
    'Search first. Decide better.',
    'A quick search beats regret later.'
  ],
  useCases: [
    'Online dating',
    'Facebook Marketplace',
    'Unknown caller',
    'New neighbor awareness',
    'Teen safety / family peace of mind',
    'Local buying and selling'
  ],
  trends: [
    'UGC proof card',
    'Dark safety dashboard',
    'Editorial pop graphic',
    'Search UI screenshot',
    'Alert banner static'
  ]
};

const state = {
  selectedCompetitorId: 'truthfinder',
  selectedAngle: '',
  selectedHook: '',
  selectedUseCase: '',
  selectedTrend: '',
  customCopy: '',
  competitorNotes: '',
  generatedAds: [],
  brand: {
    cta: 'Search Now',
    color1: '#16c1b0',
    color2: '#5eead4',
    color3: '#0f1720'
  }
};

const els = {};

document.addEventListener('DOMContentLoaded', init);

function init() {
  cacheElements();
  hydrateState();
  bindEvents();
  renderAll();
}

function cacheElements() {
  const ids = [
    'angleInput','hookInput','useCaseInput','platformTrendInput','angleSuggestions','hookSuggestions','useCaseSuggestions','trendSuggestions',
    'ctaInput','customCopyInput','notesInput','brand1','brand2','brand3','competitorList','insightsList','ideaGrid','trendGrid','adsGrid','promptGrid','insightsStatus',
    'generateAdsBtn','generateAdsTopBtn','generateInsightsBtn','saveStateBtn','clearSavedBtn','loadSeedDataBtn','downloadJsonBtn','downloadHtmlBtn'
  ];
  ids.forEach(id => els[id] = document.getElementById(id));
}

function hydrateState() {
  const saved = safeParse(localStorage.getItem('truthfinderCreativeStudioState'));
  if (saved) {
    Object.assign(state, saved);
    state.brand = Object.assign({}, state.brand, saved.brand || {});
  }

  state.selectedAngle = state.selectedAngle || DEFAULTS.angles[0];
  state.selectedHook = state.selectedHook || DEFAULTS.hooks[0];
  state.selectedUseCase = state.selectedUseCase || DEFAULTS.useCases[0];
  state.selectedTrend = state.selectedTrend || DEFAULTS.trends[0];

  fillDatalist(els.angleSuggestions, DEFAULTS.angles);
  fillDatalist(els.hookSuggestions, DEFAULTS.hooks);
  fillDatalist(els.useCaseSuggestions, DEFAULTS.useCases);
  fillDatalist(els.trendSuggestions, DEFAULTS.trends);

  els.angleInput.value = state.selectedAngle;
  els.hookInput.value = state.selectedHook;
  els.useCaseInput.value = state.selectedUseCase;
  els.platformTrendInput.value = state.selectedTrend;
  els.ctaInput.value = state.brand.cta;
  els.customCopyInput.value = state.customCopy;
  els.notesInput.value = state.competitorNotes;
  els.brand1.value = state.brand.color1;
  els.brand2.value = state.brand.color2;
  els.brand3.value = state.brand.color3;

  if (!Array.isArray(state.generatedAds) || state.generatedAds.length !== 5) {
    state.generatedAds = generateAdSet();
  }
}

function bindEvents() {
  ['angleInput','hookInput','useCaseInput','platformTrendInput'].forEach(key => {
    els[key].addEventListener('input', refreshInsightsOnly);
    els[key].addEventListener('change', refreshInsightsOnly);
  });
  els.ctaInput.addEventListener('input', () => { readFormIntoState(); renderAds(); renderPromptGrid(); });
  els.customCopyInput.addEventListener('input', refreshInsightsOnly);
  els.notesInput.addEventListener('input', refreshInsightsOnly);
  [els.brand1, els.brand2, els.brand3].forEach(input => input.addEventListener('input', () => { readFormIntoState(); syncCss(); renderAds(); }));

  els.generateAdsBtn.addEventListener('click', handleGenerateAds);
  els.generateAdsTopBtn.addEventListener('click', handleGenerateAds);
  els.generateInsightsBtn.addEventListener('click', refreshInsightsOnly);
  els.saveStateBtn.addEventListener('click', saveState);
  els.clearSavedBtn.addEventListener('click', clearSaved);
  els.loadSeedDataBtn.addEventListener('click', loadSeedData);
  els.downloadJsonBtn.addEventListener('click', exportJson);
  els.downloadHtmlBtn.addEventListener('click', exportHtml);
}

function readFormIntoState() {
  state.selectedAngle = (els.angleInput.value || '').trim();
  state.selectedHook = (els.hookInput.value || '').trim();
  state.selectedUseCase = (els.useCaseInput.value || '').trim();
  state.selectedTrend = (els.platformTrendInput.value || '').trim();
  state.customCopy = els.customCopyInput.value || '';
  state.competitorNotes = els.notesInput.value || '';
  state.brand.cta = (els.ctaInput.value || 'Search Now').trim() || 'Search Now';
  state.brand.color1 = els.brand1.value || state.brand.color1;
  state.brand.color2 = els.brand2.value || state.brand.color2;
  state.brand.color3 = els.brand3.value || state.brand.color3;
}

function renderAll() {
  syncCss();
  renderCompetitors();
  renderInsights();
  renderIdeas();
  renderTrends();
  renderAds();
  renderPromptGrid();
}

function syncCss() {
  document.documentElement.style.setProperty('--brand-1', state.brand.color1);
  document.documentElement.style.setProperty('--brand-2', state.brand.color2);
  document.documentElement.style.setProperty('--brand-3', state.brand.color3);
}

function renderCompetitors() {
  els.competitorList.innerHTML = DEFAULTS.competitors.map(c => `
    <div class="competitor-card ${c.id === state.selectedCompetitorId ? 'active' : ''}">
      <div class="competitor-top">
        <div>
          <div style="font-size:18px;font-weight:800;">${escapeHtml(c.name)}</div>
          <div class="muted">${escapeHtml(c.focus)}</div>
        </div>
        <span class="mini-stat">${c.id === 'truthfinder' ? 'brand ref' : 'compare'}</span>
      </div>
      <div class="pill-row">
        ${c.patterns.map(v => `<span class="pill">${escapeHtml(v)}</span>`).join('')}
        ${c.formats.map(v => `<span class="pill">${escapeHtml(v)}</span>`).join('')}
      </div>
      <div class="small-actions">
        <button class="btn-secondary" data-comp="${c.id}">${c.id === 'truthfinder' ? 'Use TruthFinder ref' : 'Use comparison ref'}</button>
        <a class="btn-secondary" href="${escapeAttr(c.metaUrl)}" target="_blank" rel="noopener noreferrer">Open Meta library</a>
      </div>
    </div>
  `).join('');

  els.competitorList.querySelectorAll('[data-comp]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedCompetitorId = btn.getAttribute('data-comp');
      renderCompetitors();
      renderInsights();
    });
  });
}

function renderInsights() {
  readFormIntoState();
  const truthfinder = DEFAULTS.competitors.find(c => c.id === 'truthfinder');
  const primary = DEFAULTS.competitors.find(c => c.id === state.selectedCompetitorId) || truthfinder;
  const notes = state.competitorNotes.trim();
  const list = [
    `TruthFinder is the primary brand reference. Current saved signals: ${joinList(truthfinder.patterns)} and ${joinList(truthfinder.formats)}.`,
    `Typed brief: angle = "${state.selectedAngle}", hook = "${state.selectedHook}", use case = "${state.selectedUseCase}", visual trend = "${state.selectedTrend}".`,
    `${primary.name} gives the category comparison frame, but all generated ads stay in a TruthFinder-branded schematic.`,
    `Best opportunity: make ${state.selectedUseCase.toLowerCase()} feel immediately relevant while keeping the visual treatment cleaner and more premium than the typical category ad.`
  ];
  if (notes) list.push(`Observed Meta notes: ${notes.slice(0, 260)}${notes.length > 260 ? '…' : ''}`);

  els.insightsStatus.textContent = 'Generator ready. Clicking Generate will create 5 new display creative variations.';
  els.insightsList.innerHTML = list.map(item => `<div class="insight-item">${escapeHtml(item)}</div>`).join('');
}

function renderIdeas() {
  readFormIntoState();
  const useCase = state.selectedUseCase || 'general people-search';
  const angle = state.selectedAngle || 'trust-led angle';
  const hook = state.selectedHook || 'Search first';
  const ideas = [
    { title: `Primary route: ${useCase}`, why: `Directly tied to your typed brief and ${angle.toLowerCase()}.`, hooks: [hook, `Proof for ${useCase}`, 'TruthFinder utility first'] },
    { title: 'Marketplace meetup confidence', why: 'Pushes local transaction trust and in-person caution.', hooks: ['Check before you meet', 'Verify first', 'Know more first'] },
    { title: 'Modern dating due diligence', why: 'Positions TruthFinder as a practical step before meeting.', hooks: ['Before date night, know more', 'Trust your gut. Then verify.', 'More context first'] },
    { title: 'Unknown caller clarity', why: 'Converts on a familiar problem with strong urgency.', hooks: ['That number again?', 'Search the number first', 'Unknown caller, known answer'] }
  ];
  els.ideaGrid.innerHTML = ideas.map(idea => `
    <div class="idea-card">
      <div style="font-size:17px;font-weight:800;margin-bottom:6px;">${escapeHtml(idea.title)}</div>
      <div class="muted">${escapeHtml(idea.why)}</div>
      <div class="pill-row">${idea.hooks.map(h => `<span class="pill">${escapeHtml(h)}</span>`).join('')}</div>
    </div>
  `).join('');
}

function renderTrends() {
  readFormIntoState();
  const typed = normalize(state.selectedTrend);
  const cards = DEFAULTS.trends.map(name => `
    <div class="trend-card">
      <div class="competitor-top">
        <div style="font-size:17px;font-weight:800;">${escapeHtml(name)}</div>
        <span class="mini-stat">${normalize(name) === typed ? 'selected' : 'available'}</span>
      </div>
      <div class="muted">${escapeHtml(buildTrendDescription(name))}</div>
    </div>
  `).join('');
  els.trendGrid.innerHTML = cards;
}

function handleGenerateAds() {
  readFormIntoState();
  const missing = [
    ['angle', state.selectedAngle],
    ['hook', state.selectedHook],
    ['use case', state.selectedUseCase],
    ['visual trend', state.selectedTrend]
  ].filter(([,v]) => !String(v || '').trim()).map(([k]) => k);

  if (missing.length) {
    els.insightsStatus.textContent = `Fill in ${joinList(missing)} and try again.`;
    return;
  }

  state.generatedAds = generateAdSet();
  renderAds();
  renderPromptGrid();
  renderInsights();
  els.insightsStatus.textContent = 'Generated 5 new TruthFinder display creatives.';
  saveState(false);
}

function generateAdSet() {
  const primary = DEFAULTS.competitors.find(c => c.id === state.selectedCompetitorId) || DEFAULTS.competitors[0];
  const styles = ['problem-solution', 'fear-relief', 'utility-first', 'social-proof', 'bold-alert'];
  return styles.map((style, idx) => {
    const headline = buildHeadline(style, idx);
    const body = buildBody(style, primary);
    const kicker = buildKicker(style, idx);
    const visualTags = buildVisualTags(style, idx);
    return {
      id: `ad-${Date.now()}-${idx}`,
      name: `Concept ${idx + 1}`,
      style,
      kicker,
      headline,
      body,
      cta: state.brand.cta,
      socialProof: socialProofLine(idx),
      visualTags,
      prompt: buildPrompt(style, headline, body, kicker, visualTags, primary)
    };
  });
}

function buildHeadline(style, idx) {
  const a = state.selectedAngle;
  const h = state.selectedHook;
  const u = state.selectedUseCase;
  const options = {
    'problem-solution': [h, `Before ${shortUseCase(u)},\nknow more.`, `A smarter move for\n${shortUseCase(u)}.`],
    'fear-relief': [`When something feels off,\nsearch first.`, `A little context\nchanges everything.`, `More confidence for\n${shortUseCase(u)}.`],
    'utility-first': [`Search names, numbers,\nand addresses.`, `TruthFinder for\n${shortUseCase(u)}.`, `${capitalize(shortUseCase(u))}\nstarts with context.`],
    'social-proof': [`${capitalize(shortUseCase(u))},\nbut smarter.`, `The extra step\nworth taking.`, `${h.replace(/\.$/, '')}\nNow make it visual.`],
    'bold-alert': [`Pause. Search.\nThen decide.`, `Before you trust,\nknow more.`, `${capitalize(a)}\nstarts here.`]
  };
  const list = options[style] || [h, a, u];
  return list[idx % list.length];
}

function buildBody(style, primary) {
  const extra = state.customCopy.trim() ? ` ${sentence(state.customCopy.trim())}` : '';
  const map = {
    'problem-solution': `Use TruthFinder before ${state.selectedUseCase.toLowerCase()} moments turn into bad decisions.${extra}`,
    'fear-relief': `Built around ${state.selectedAngle.toLowerCase()} so the ad feels urgent, useful, and practical without going off-brand.${extra}`,
    'utility-first': `A cleaner, more premium utility-led message than the category usually shows on Meta.${extra}`,
    'social-proof': `Leverages TruthFinder's branded schematic while pushing beyond ${primary.name}'s current creative patterns.${extra}`,
    'bold-alert': `Fast, scroll-stopping creative for ${state.selectedUseCase.toLowerCase()} situations where people want clarity right now.${extra}`
  };
  return map[style];
}

function buildKicker(style, idx) {
  const map = {
    'problem-solution': state.selectedUseCase,
    'fear-relief': 'Confidence first',
    'utility-first': 'TruthFinder search',
    'social-proof': state.selectedTrend,
    'bold-alert': `Variation ${idx + 1}`
  };
  return map[style] || state.selectedUseCase;
}

function buildVisualTags(style, idx) {
  const tags = {
    'problem-solution': [state.selectedTrend, 'split hierarchy', 'result chip'],
    'fear-relief': [state.selectedTrend, 'dark premium gradient', 'signal glow'],
    'utility-first': [state.selectedTrend, 'search UI', 'clean card'],
    'social-proof': [state.selectedTrend, 'proof module', 'comment stack'],
    'bold-alert': [state.selectedTrend, 'alert stripe', 'oversized CTA']
  };
  return [...(tags[style] || [state.selectedTrend]), `variant ${idx + 1}`];
}

function renderAds() {
  if (!Array.isArray(state.generatedAds) || !state.generatedAds.length) {
    els.adsGrid.innerHTML = '<div class="empty-state">No ads generated yet.</div>';
    return;
  }

  els.adsGrid.innerHTML = state.generatedAds.map(ad => `
    <div class="ad-card">
      <div class="ad-preview" style="background:${buildBackground(ad.style)};">
        <div class="ad-noise"></div>
        <div class="ad-orb one"></div>
        <div class="ad-orb two"></div>
        <div class="tf-copy">
          <div class="tf-brand">
            <div class="tf-mark">TF</div>
            <div>
              <div style="font-weight:800;">TruthFinder</div>
              <div style="font-size:12px;color:rgba(232,241,248,.72);">Inspired by TruthFinder Meta reference</div>
            </div>
          </div>
          <div class="ad-kicker">${escapeHtml(ad.kicker)}</div>
          <div class="ad-headline">${escapeHtml(ad.headline)}</div>
          <div class="ad-body">${escapeHtml(ad.body)}</div>
        </div>
        <div class="ad-bottom">
          <div class="social-proof">
            <div class="big">${escapeHtml(ad.socialProof)}</div>
            <div class="small">${escapeHtml(ad.visualTags.slice(0,3).join(' • '))}</div>
          </div>
          <div class="ad-cta">${escapeHtml(ad.cta)}</div>
        </div>
      </div>
      <div class="ad-editor">
        <div class="field" style="margin-bottom:0;"><label>Headline</label><textarea data-ad-field="headline" data-ad-id="${ad.id}">${escapeHtml(ad.headline)}</textarea></div>
        <div class="field" style="margin-bottom:0;"><label>Body copy</label><textarea data-ad-field="body" data-ad-id="${ad.id}">${escapeHtml(ad.body)}</textarea></div>
        <div class="field" style="margin-bottom:0;"><label>Kicker</label><input data-ad-field="kicker" data-ad-id="${ad.id}" value="${escapeAttr(ad.kicker)}" /></div>
        <div class="field" style="margin-bottom:0;"><label>CTA</label><input data-ad-field="cta" data-ad-id="${ad.id}" value="${escapeAttr(ad.cta)}" /></div>
        <div class="ad-editor-actions">
          <div class="muted">${escapeHtml(ad.name)}</div>
          <button class="btn-secondary" data-copy-prompt="${ad.id}">Copy designer prompt</button>
        </div>
      </div>
    </div>
  `).join('');

  els.adsGrid.querySelectorAll('[data-ad-field]').forEach(el => {
    el.addEventListener('input', () => {
      const ad = state.generatedAds.find(item => item.id === el.getAttribute('data-ad-id'));
      if (!ad) return;
      ad[el.getAttribute('data-ad-field')] = el.value;
      renderAds();
      renderPromptGrid();
    });
  });

  els.adsGrid.querySelectorAll('[data-copy-prompt]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const ad = state.generatedAds.find(item => item.id === btn.getAttribute('data-copy-prompt'));
      if (!ad) return;
      try { await navigator.clipboard.writeText(ad.prompt); btn.textContent = 'Prompt copied'; }
      catch { btn.textContent = 'Copy failed'; }
      setTimeout(() => btn.textContent = 'Copy designer prompt', 1000);
    });
  });
}

function renderPromptGrid() {
  els.promptGrid.innerHTML = state.generatedAds.map(ad => `
    <div class="prompt-card">
      <div class="competitor-top">
        <div style="font-size:17px;font-weight:800;">${escapeHtml(ad.name)}</div>
        <span class="mini-stat">${escapeHtml(ad.style)}</span>
      </div>
      <div class="muted" style="white-space:pre-line;">${escapeHtml(ad.prompt)}</div>
    </div>
  `).join('');
}

function buildPrompt(style, headline, body, kicker, visualTags, primary) {
  return [
    'Create a premium paid-social static ad for TruthFinder.',
    `Angle: ${state.selectedAngle}.`,
    `Hook: ${state.selectedHook}.`,
    `Use case: ${state.selectedUseCase}.`,
    `Visual trend: ${state.selectedTrend}.`,
    `Competitive reference: ${primary.name}.`,
    `Kicker: ${kicker}.`,
    `Headline: ${headline.replace(/\n/g, ' ')}.`,
    `Body copy: ${body}.`,
    `Visual details: ${visualTags.join(', ')}.`,
    `Brand treatment: dark premium background, TruthFinder teal-to-aqua accents, mobile-first feed composition, CTA ${state.brand.cta}.`
  ].join('\n');
}

function buildBackground(style) {
  const d = state.brand.color3, c1 = state.brand.color1, c2 = state.brand.color2;
  const map = {
    'problem-solution': `linear-gradient(145deg, ${d}, ${mix(d,c1,.25)})`,
    'fear-relief': `linear-gradient(145deg, ${mix(d,'#000000',.12)}, ${mix(d,c2,.18)})`,
    'utility-first': `linear-gradient(145deg, ${mix(d,c2,.08)}, ${mix(d,c1,.22)})`,
    'social-proof': `linear-gradient(145deg, ${d}, ${mix(c1,c2,.5)})`,
    'bold-alert': `linear-gradient(145deg, ${mix(d,c1,.32)}, ${mix(d,c2,.12)})`
  };
  return map[style] || map['utility-first'];
}

function refreshInsightsOnly() {
  readFormIntoState();
  renderInsights();
  renderIdeas();
  renderTrends();
}

function saveState(withMessage = true) {
  localStorage.setItem('truthfinderCreativeStudioState', JSON.stringify(state));
  if (withMessage) els.insightsStatus.textContent = 'Saved locally.';
}

function clearSaved() {
  localStorage.removeItem('truthfinderCreativeStudioState');
  state.generatedAds = generateAdSet();
  renderAll();
  els.insightsStatus.textContent = 'Saved local data cleared.';
}

function loadSeedData() {
  state.selectedAngle = DEFAULTS.angles[1];
  state.selectedHook = DEFAULTS.hooks[2];
  state.selectedUseCase = DEFAULTS.useCases[1];
  state.selectedTrend = DEFAULTS.trends[1];
  state.selectedCompetitorId = 'truthfinder';
  state.customCopy = 'Make it feel premium, urgent, and clearly built for Facebook Marketplace meetups.';
  state.competitorNotes = 'TruthFinder can win by staying cleaner and more premium than the category while keeping the utility obvious.';
  state.brand.cta = 'Search Now';
  els.angleInput.value = state.selectedAngle;
  els.hookInput.value = state.selectedHook;
  els.useCaseInput.value = state.selectedUseCase;
  els.platformTrendInput.value = state.selectedTrend;
  els.customCopyInput.value = state.customCopy;
  els.notesInput.value = state.competitorNotes;
  els.ctaInput.value = state.brand.cta;
  handleGenerateAds();
}

function exportJson() {
  const payload = {
    exportedAt: new Date().toISOString(),
    brief: {
      angle: state.selectedAngle,
      hook: state.selectedHook,
      useCase: state.selectedUseCase,
      trend: state.selectedTrend
    },
    competitorReference: state.selectedCompetitorId,
    ads: state.generatedAds
  };
  download('truthfinder-ad-set.json', JSON.stringify(payload, null, 2), 'application/json');
}

function exportHtml() {
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>TruthFinder Ad Board</title><style>body{font-family:Inter,Arial,sans-serif;background:#08131d;color:#eef5fb;padding:24px}.grid{display:grid;grid-template-columns:repeat(2,minmax(280px,1fr));gap:18px}.card{border:1px solid rgba(255,255,255,.08);border-radius:18px;overflow:hidden;background:rgba(255,255,255,.03)}.preview{aspect-ratio:4/5;padding:22px;display:flex;flex-direction:column;justify-content:space-between;background:linear-gradient(145deg,${state.brand.color3},${state.brand.color1})}.headline{font-size:30px;font-weight:800;line-height:1.03;white-space:pre-line}.body{font-size:14px;line-height:1.45;max-width:84%}.kicker,.cta{display:inline-block;padding:8px 12px;border-radius:999px}.kicker{background:rgba(255,255,255,.1)}.cta{background:linear-gradient(135deg,${state.brand.color1},${state.brand.color2});color:#08221f;font-weight:800}.meta{padding:14px;font-size:13px;color:#c6d6e4}</style></head><body><h1>TruthFinder Ad Board</h1><div class="grid">${state.generatedAds.map(ad=>`<div class="card"><div class="preview"><div><div style="font-weight:800;margin-bottom:12px">TruthFinder</div><div class="kicker">${escapeHtml(ad.kicker)}</div><div class="headline">${escapeHtml(ad.headline)}</div><div class="body">${escapeHtml(ad.body)}</div></div><div style="display:flex;justify-content:space-between;align-items:flex-end;gap:12px"><div>${escapeHtml(ad.socialProof)}</div><div class="cta">${escapeHtml(ad.cta)}</div></div></div><div class="meta">${escapeHtml(ad.prompt)}</div></div>`).join('')}</div></body></html>`;
  download('truthfinder-ad-board.html', html, 'text/html');
}

function fillDatalist(el, items) { el.innerHTML = items.map(v => `<option value="${escapeAttr(v)}"></option>`).join(''); }
function buildTrendDescription(name) { return `${name} adapted into a TruthFinder-branded static that feels premium, mobile-first, and clearer than the average category ad.`; }
function shortUseCase(v) { return String(v || 'this moment').replace(/facebook /i,'').replace(/teen safety \/ /i,'').toLowerCase(); }
function socialProofLine(i) { return ['Built for Meta feed speed.','Cleaner than the category.','TruthFinder-branded utility.','Sharper hook, lower clutter.','Mobile-first conversion frame.'][i] || 'Meta-ready static.'; }
function normalize(v) { return String(v || '').trim().toLowerCase(); }
function capitalize(v) { v = String(v || ''); return v.charAt(0).toUpperCase() + v.slice(1); }
function sentence(v) { v = String(v || ''); return v ? capitalize(v.replace(/[.\s]+$/,'')) + '.' : ''; }
function joinList(arr) { return arr.length < 2 ? (arr[0] || '') : arr.length === 2 ? `${arr[0]} and ${arr[1]}` : `${arr.slice(0,-1).join(', ')}, and ${arr[arr.length-1]}`; }
function safeParse(v) { try { return JSON.parse(v); } catch { return null; } }
function mix(a,b,w){const A=hexToRgb(a),B=hexToRgb(b);return rgbToHex(Math.round(A.r+(B.r-A.r)*w),Math.round(A.g+(B.g-A.g)*w),Math.round(A.b+(B.b-A.b)*w));}
function hexToRgb(h){h=h.replace('#','');const n=parseInt(h,16);return{r:(n>>16)&255,g:(n>>8)&255,b:n&255};}
function rgbToHex(r,g,b){return '#' + [r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');}
function download(name, content, type){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);}
function escapeHtml(v=''){return String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
function escapeAttr(v=''){return escapeHtml(v).replace(/`/g,'&#96;');}
