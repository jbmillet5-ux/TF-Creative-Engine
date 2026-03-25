const DATA = {
  competitors: [
    {
      id: 'truthfinder',
      name: 'TruthFinder',
      metaUrl: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&is_targeted_country=false&media_type=all&search_type=keyword_unordered&q=TruthFinder',
      patterns: ['dark premium gradient', 'trust-forward utility copy', 'search-led framing'],
      formats: ['headline-led static', 'UI mockup', 'premium card layout']
    },
    {
      id: 'beenverified',
      name: 'BeenVerified',
      metaUrl: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&is_targeted_country=false&media_type=all&search_type=keyword_unordered&q=BeenVerified',
      patterns: ['utility-first headline', 'consumer urgency', 'badge-led design'],
      formats: ['static image', 'benefit collage', 'caller lookup card']
    },
    {
      id: 'spokeo',
      name: 'Spokeo',
      metaUrl: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&is_targeted_country=false&media_type=all&search_type=keyword_unordered&q=Spokeo',
      patterns: ['clean trust design', 'light UI treatment', 'clarity-led messaging'],
      formats: ['simple static', 'search result mockup', 'minimal card']
    },
    {
      id: 'peoplefinders',
      name: 'PeopleFinders',
      metaUrl: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&is_targeted_country=false&media_type=all&search_type=keyword_unordered&q=PeopleFinders',
      patterns: ['direct-response utility', 'lookup framing', 'functional layout'],
      formats: ['headline static', 'simple search card', 'benefit panel']
    },
    {
      id: 'peoplelooker',
      name: 'PeopleLooker',
      metaUrl: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&is_targeted_country=false&media_type=all&search_type=keyword_unordered&q=PeopleLooker',
      patterns: ['approachable tone', 'curiosity plus safety', 'soft trust language'],
      formats: ['mobile card', 'story-style static', 'simple CTA card']
    }
  ],
  angles: [
    'First-date confidence',
    'Facebook Marketplace trust check',
    'Unknown caller clarity',
    'Know who you are dealing with',
    'Family peace of mind',
    'Neighbor and address awareness',
    'Online seller verification',
    'Reverse phone lookup utility'
  ],
  hooks: [
    'Before you meet, know more.',
    'Before you buy, check first.',
    'Unknown caller? Start with a search.',
    'Search first. Decide better.',
    'Trust your gut. Then verify.',
    'A quick search beats regret later.'
  ],
  useCases: [
    'Online dating',
    'Facebook Marketplace',
    'Unknown caller',
    'New neighbor awareness',
    'Family safety',
    'Meeting someone from a marketplace app',
    'Reverse phone lookup',
    'Seller or buyer verification'
  ],
  trends: [
    'Dark safety dashboard',
    'Search UI screenshot',
    'UGC proof card',
    'Minimal premium typography',
    'Alert banner static',
    'Mobile card stack'
  ],
  ctas: ['Search Now', 'Learn More', 'Check Now', 'See More', 'View Report'],
  sampleCreatives: [
    { competitorId: 'beenverified', kicker: 'Unknown caller', headline: 'Who keeps calling?', body: 'A lookup-first static focused on speed, badges, and immediate utility.', cta: 'Check Now' },
    { competitorId: 'spokeo', kicker: 'Know more first', headline: 'A cleaner way to search.', body: 'Trust-forward, lighter visual treatment with a simple utility promise.', cta: 'Learn More' },
    { competitorId: 'peoplefinders', kicker: 'Buyer or seller', headline: 'Before the meetup, verify.', body: 'Direct-response framing built around practical caution before a transaction.', cta: 'Search Now' },
    { competitorId: 'peoplelooker', kicker: 'Curiosity + safety', headline: 'More context before you connect.', body: 'Approachable language that softens the category without losing the safety angle.', cta: 'See More' },
    { competitorId: 'truthfinder', kicker: 'Premium utility', headline: 'Search first. Decide better.', body: 'A darker, more premium TruthFinder direction designed to feel stronger than the category.', cta: 'Search Now' }
  ]
};

const state = {
  angle: DATA.angles[0],
  hook: DATA.hooks[0],
  useCase: DATA.useCases[0],
  trend: DATA.trends[0],
  cta: DATA.ctas[0],
  competitorId: 'truthfinder',
  copyGuidance: '',
  notes: '',
  generatedAds: []
};

const els = {};

document.addEventListener('DOMContentLoaded', init);

function init() {
  cache();
  fillSelect(els.angleSelect, DATA.angles, state.angle);
  fillSelect(els.hookSelect, DATA.hooks, state.hook);
  fillSelect(els.useCaseSelect, DATA.useCases, state.useCase);
  fillSelect(els.trendSelect, DATA.trends, state.trend);
  fillSelect(els.ctaSelect, DATA.ctas, state.cta);
  fillSelect(els.competitorSelect, DATA.competitors.map(c => c.name), 'TruthFinder');
  bind();
  renderCompetitorCards();
  renderSamples();
  renderInsights();
  state.generatedAds = generateAds();
  renderGeneratedAds();
}

function cache() {
  [
    'angleSelect','hookSelect','useCaseSelect','trendSelect','ctaSelect','competitorSelect','copyInput','notesInput',
    'generateBtn','generateTopBtn','refreshBtn','resetBtn','loadDefaultsBtn','statusText',
    'signalList','opportunityList','visualList','competitorGrid','sampleGrid','adsGrid'
  ].forEach(id => els[id] = document.getElementById(id));
}

function bind() {
  ['angleSelect','hookSelect','useCaseSelect','trendSelect','ctaSelect','competitorSelect','copyInput','notesInput'].forEach(id => {
    els[id].addEventListener('change', refreshStateAndInsights);
    els[id].addEventListener('input', refreshStateAndInsights);
  });
  els.generateBtn.addEventListener('click', onGenerate);
  els.generateTopBtn.addEventListener('click', onGenerate);
  els.refreshBtn.addEventListener('click', refreshStateAndInsights);
  els.resetBtn.addEventListener('click', resetForm);
  els.loadDefaultsBtn.addEventListener('click', loadDefaults);
}

function fillSelect(el, items, selected) {
  el.innerHTML = items.map(v => `<option value="${escAttr(v)}" ${v === selected ? 'selected' : ''}>${esc(v)}</option>`).join('');
}

function refreshStateAndInsights() {
  readForm();
  renderInsights();
}

function readForm() {
  state.angle = els.angleSelect.value;
  state.hook = els.hookSelect.value;
  state.useCase = els.useCaseSelect.value;
  state.trend = els.trendSelect.value;
  state.cta = els.ctaSelect.value;
  state.competitorId = DATA.competitors.find(c => c.name === els.competitorSelect.value)?.id || 'truthfinder';
  state.copyGuidance = els.copyInput.value.trim();
  state.notes = els.notesInput.value.trim();
}

function renderCompetitorCards() {
  els.competitorGrid.innerHTML = DATA.competitors.map(c => `
    <div class="card ${c.id === state.competitorId ? 'active' : ''}">
      <div class="card-top">
        <div>
          <div style="font-size:18px;font-weight:800;">${esc(c.name)}</div>
          <div class="status">${esc(c.patterns.join(' • '))}</div>
        </div>
        <span class="pill">reference</span>
      </div>
      <div class="pill-row">${c.formats.map(v => `<span class="pill">${esc(v)}</span>`).join('')}</div>
      <div class="small-actions" style="margin-top:12px;">
        <a class="btn btn-secondary" href="${escAttr(c.metaUrl)}" target="_blank" rel="noopener noreferrer">Open Meta Ad Library</a>
      </div>
    </div>
  `).join('');
}

function renderSamples() {
  els.sampleGrid.innerHTML = DATA.sampleCreatives.map((item, idx) => {
    const comp = DATA.competitors.find(c => c.id === item.competitorId);
    return renderAdCard({
      id: `sample-${idx}`,
      sourceLabel: `${comp.name} reference sample`,
      kicker: item.kicker,
      headline: item.headline,
      body: item.body,
      cta: item.cta,
      meta: comp.patterns.slice(0,2).join(' • '),
      editable: false
    });
  }).join('');
}

function renderInsights() {
  readForm();
  const comp = DATA.competitors.find(c => c.id === state.competitorId) || DATA.competitors[0];

  const signals = [
    `${comp.name} reference points: ${comp.patterns.join(', ')}.`,
    `TruthFinder opportunity: keep the utility obvious but present it in a cleaner premium dark system.`,
    state.notes ? `Meta notes captured: ${state.notes}` : `No manual Meta notes entered yet.`
  ];

  const opps = [
    `Selected angle: ${state.angle}.`,
    `Selected hook: ${state.hook}`,
    `Best use-case framing: ${state.useCase.toLowerCase()} with a faster feed-stop opening line.`
  ];

  const visuals = [
    `Visual trend selected: ${state.trend}.`,
    `CTA selected: ${state.cta}.`,
    state.copyGuidance ? `Copy guidance: ${state.copyGuidance}` : `No extra copy guidance entered yet.`
  ];

  renderList(els.signalList, signals);
  renderList(els.opportunityList, opps);
  renderList(els.visualList, visuals);
}

function renderList(el, items) {
  el.innerHTML = items.map(v => `<div class="list-item">${esc(v)}</div>`).join('');
}

function onGenerate() {
  readForm();
  state.generatedAds = generateAds();
  renderGeneratedAds();
  els.statusText.textContent = 'Generated 5 new TruthFinder display creatives.';
}

function generateAds() {
  const comp = DATA.competitors.find(c => c.id === state.competitorId) || DATA.competitors[0];
  const variants = [
    'problem-solution',
    'bold-utility',
    'trust-stack',
    'alert-frame',
    'proof-card'
  ];

  return variants.map((variant, i) => {
    const headline = headlineFor(variant, i);
    const body = bodyFor(variant, comp, i);
    const kicker = kickerFor(variant, i);
    const meta = `${state.trend} • ${comp.name} reference • ${variant}`;
    return {
      id: `gen-${Date.now()}-${i}`,
      sourceLabel: 'Generated TruthFinder creative',
      kicker,
      headline,
      body,
      cta: state.cta,
      meta,
      editable: true
    };
  });
}

function headlineFor(variant, i) {
  const shortUse = shortUseCase(state.useCase);
  const map = {
    'problem-solution': [
      `${state.hook}\nMore context first.`,
      `Before ${shortUse},\nknow more.`,
      `A smarter step before\n${shortUse}.`
    ],
    'bold-utility': [
      `Search names,\nnumbers, and more.`,
      `${capitalize(shortUse)}\nstarts with context.`,
      `Search first.\nDecide better.`
    ],
    'trust-stack': [
      `Know who you’re\ndealing with.`,
      `More confidence for\n${shortUse}.`,
      `Get more context\nbefore you move.`
    ],
    'alert-frame': [
      `Pause. Search.\nThen decide.`,
      `Before you trust,\nknow more.`,
      `${capitalize(shortUse)}\ncan change quickly.`
    ],
    'proof-card': [
      `A quick search beats\nregret later.`,
      `${state.hook.replace(/\.$/, '')}\nNow make it visual.`,
      `More clarity for\n${shortUse}.`
    ]
  };
  return map[variant][i % 3];
}

function bodyFor(variant, comp, i) {
  const guidance = state.copyGuidance ? ` ${sentence(state.copyGuidance)}` : '';
  const use = state.useCase.toLowerCase();
  const base = {
    'problem-solution': `Use TruthFinder before ${use} moments turn into bad decisions.`,
    'bold-utility': `A cleaner, more premium utility-led message than most category ads currently show.`,
    'trust-stack': `Built around ${state.angle.toLowerCase()} so the creative feels useful, confident, and practical.`,
    'alert-frame': `Fast, scroll-stopping static creative for situations where people want clarity right now.`,
    'proof-card': `Keeps the TruthFinder brand premium while borrowing broad category learning from ${comp.name}.`
  }[variant];
  return `${base}${guidance}`;
}

function kickerFor(variant, i) {
  return {
    'problem-solution': state.useCase,
    'bold-utility': 'TruthFinder search',
    'trust-stack': state.angle,
    'alert-frame': `Variation ${i + 1}`,
    'proof-card': state.trend
  }[variant];
}

function renderGeneratedAds() {
  if (!state.generatedAds.length) {
    els.adsGrid.innerHTML = '<div class="empty">No ads generated yet.</div>';
    return;
  }

  els.adsGrid.innerHTML = state.generatedAds.map(ad => renderAdCard(ad)).join('');
  bindGeneratedEditors();
}

function renderAdCard(ad) {
  return `
    <div class="ad-card">
      <div class="ad-preview">
        <div class="ad-layer">
          <div class="brand-lock">
            <div class="brand-mark">TF</div>
            <div>
              <div style="font-weight:800;">TruthFinder</div>
              <div style="font-size:12px;color:rgba(237,243,248,.72);">${esc(ad.sourceLabel)}</div>
            </div>
          </div>
          <div class="ad-kicker">${esc(ad.kicker)}</div>
          <div class="ad-headline">${esc(ad.headline)}</div>
          <div class="ad-body">${esc(ad.body)}</div>
        </div>
        <div class="ad-layer ad-bottom">
          <div class="ad-meta">
            <div>${esc(ad.meta)}</div>
          </div>
          <div class="ad-cta">${esc(ad.cta)}</div>
        </div>
      </div>
      ${ad.editable ? `
        <div class="ad-editor">
          <div class="field" style="margin-bottom:0;"><label>Headline</label><textarea data-id="${escAttr(ad.id)}" data-field="headline">${esc(ad.headline)}</textarea></div>
          <div class="field" style="margin-bottom:0;"><label>Body</label><textarea data-id="${escAttr(ad.id)}" data-field="body">${esc(ad.body)}</textarea></div>
          <div class="row-2">
            <div class="field" style="margin-bottom:0;"><label>Kicker</label><input data-id="${escAttr(ad.id)}" data-field="kicker" value="${escAttr(ad.kicker)}"></div>
            <div class="field" style="margin-bottom:0;"><label>CTA</label><input data-id="${escAttr(ad.id)}" data-field="cta" value="${escAttr(ad.cta)}"></div>
          </div>
        </div>` : ''}
    </div>
  `;
}

function bindGeneratedEditors() {
  els.adsGrid.querySelectorAll('[data-id][data-field]').forEach(input => {
    input.addEventListener('input', e => {
      const id = e.target.getAttribute('data-id');
      const field = e.target.getAttribute('data-field');
      const ad = state.generatedAds.find(x => x.id === id);
      if (!ad) return;
      ad[field] = e.target.value;
      renderGeneratedAds();
    });
  });
}

function resetForm() {
  state.angle = DATA.angles[0];
  state.hook = DATA.hooks[0];
  state.useCase = DATA.useCases[0];
  state.trend = DATA.trends[0];
  state.cta = DATA.ctas[0];
  state.competitorId = 'truthfinder';
  state.copyGuidance = '';
  state.notes = '';
  fillSelect(els.angleSelect, DATA.angles, state.angle);
  fillSelect(els.hookSelect, DATA.hooks, state.hook);
  fillSelect(els.useCaseSelect, DATA.useCases, state.useCase);
  fillSelect(els.trendSelect, DATA.trends, state.trend);
  fillSelect(els.ctaSelect, DATA.ctas, state.cta);
  fillSelect(els.competitorSelect, DATA.competitors.map(c => c.name), 'TruthFinder');
  els.copyInput.value = '';
  els.notesInput.value = '';
  renderInsights();
  state.generatedAds = generateAds();
  renderGeneratedAds();
  els.statusText.textContent = 'Reset complete. 5 ads regenerated from the default brief.';
}

function loadDefaults() {
  state.angle = 'Facebook Marketplace trust check';
  state.hook = 'Before you buy, check first.';
  state.useCase = 'Seller or buyer verification';
  state.trend = 'Dark safety dashboard';
  state.cta = 'Search Now';
  state.competitorId = 'beenverified';
  state.copyGuidance = 'Keep the tone premium, concise, and practical.';
  state.notes = 'BeenVerified often leans utility-first. TruthFinder should feel cleaner and more premium.';
  fillSelect(els.angleSelect, DATA.angles, state.angle);
  fillSelect(els.hookSelect, DATA.hooks, state.hook);
  fillSelect(els.useCaseSelect, DATA.useCases, state.useCase);
  fillSelect(els.trendSelect, DATA.trends, state.trend);
  fillSelect(els.ctaSelect, DATA.ctas, state.cta);
  fillSelect(els.competitorSelect, DATA.competitors.map(c => c.name), 'BeenVerified');
  els.copyInput.value = state.copyGuidance;
  els.notesInput.value = state.notes;
  renderInsights();
  state.generatedAds = generateAds();
  renderGeneratedAds();
  els.statusText.textContent = 'Default Marketplace brief loaded and 5 ads generated.';
}

function shortUseCase(v) {
  return String(v || 'this moment').replace(/facebook /ig, '').replace(/seller or buyer /ig, '').toLowerCase();
}
function sentence(v) { return v ? capitalize(String(v).replace(/[.\s]+$/,'')) + '.' : ''; }
function capitalize(v) { return v ? v.charAt(0).toUpperCase() + v.slice(1) : ''; }
function esc(v='') { return String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function escAttr(v='') { return esc(v).replace(/`/g,'&#96;'); }
